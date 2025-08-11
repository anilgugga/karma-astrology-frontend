import React, { useRef, useState } from "react";
import axios from "axios";
import { useChart } from "../context/ChartContext";
import NorthIndianChart from "../components/charts/NorthIndianChart";
import SouthIndianChart from "../components/charts/SouthIndianChart";
import CosmicCard from "../components/CosmicCard";

const BirthChart = () => {
  const { chartData, chartInput } = useChart();
  const reportRef = useRef();
  const [downloading, setDownloading] = useState(false);
  const [error, setError] = useState("");

  if (!chartData) {
    return (
      <div className="min-h-screen bg-deepblue text-cosmicwhite flex items-center justify-center p-6">
        <div className="bg-cardblue rounded-xl border border-gold shadow-gold-glow p-6 max-w-xl text-center">
          <p className="text-lg">No chart data available. Please generate your chart first.</p>
        </div>
      </div>
    );
  }

  const { planets, ascendant, houses } = chartData;

  const handlePlanetClick = (planet) => {
    alert(`${planet.name} (${planet.symbol}) is in ${planet.sign} at ${planet.degree.toFixed(1)}° in house ${planet.house}`);
  };

  const handleDownloadPDF = async () => {
    setError("");
    setDownloading(true);
    try {
      // Prefer backend-rendered PDF when available
      const response = await axios.post(
        "/birthchart/pdf",
        chartInput || {},
        { responseType: "blob" }
      );

      const blob = new Blob([response.data], { type: "application/pdf" });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "birthchart.pdf";
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      // Fallback to client-side capture if backend PDF fails
      try {
        const html2canvas = (await import("html2canvas")).default;
        const jsPDF = (await import("jspdf")).default;
        const element = reportRef.current;
        const canvas = await html2canvas(element, { scale: 2 });
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF({ orientation: "p", unit: "pt", format: "a4" });
        const pageWidth = pdf.internal.pageSize.getWidth();
        const pageHeight = pdf.internal.pageSize.getHeight();
        const ratio = Math.min(pageWidth / canvas.width, pageHeight / canvas.height);
        const imgWidth = canvas.width * ratio;
        const imgHeight = canvas.height * ratio;
        const x = (pageWidth - imgWidth) / 2;
        const y = 20;
        pdf.addImage(imgData, "PNG", x, y, imgWidth, imgHeight);
        pdf.save("birthchart.pdf");
      } catch (fallbackErr) {
        setError(err.response?.data?.detail || "Failed to generate PDF.");
      }
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div className="min-h-screen bg-deepblue text-cosmicwhite p-6">
      <header className="text-center mb-8">
        <h1 className="text-3xl font-cosmic text-gold">✨ Your Birth Chart ✨</h1>
        <p className="opacity-80">Explore your planetary positions and houses</p>
      </header>

      <div ref={reportRef} className="max-w-5xl mx-auto">
        <div className="grid md:grid-cols-2 gap-6">
          <CosmicCard title="North Indian Chart">
            <NorthIndianChart
              houses={houses}
              planets={planets}
              onPlanetClick={handlePlanetClick}
              showDegrees={true}
            />
          </CosmicCard>

          <CosmicCard title="South Indian Chart">
            <SouthIndianChart
              houses={houses}
              planets={planets}
              onPlanetClick={handlePlanetClick}
              showDegrees={true}
            />
          </CosmicCard>
        </div>

        <CosmicCard title="Chart Data">
          <h2 className="text-xl text-gold font-bold mb-4">Planet Positions</h2>
          <ul className="space-y-2">
            {planets.map((planet) => (
              <li key={planet.name} className="flex justify-between border-b border-white/20 pb-2">
                <span>
                  {planet.name} ({planet.symbol})
                </span>
                <span>
                  {planet.sign} - {planet.degree.toFixed(2)}° (House {planet.house})
                </span>
              </li>
            ))}
          </ul>
          <h2 className="text-xl text-gold font-bold mt-6 mb-2">Ascendant & Houses</h2>
          <p className="mb-4">Ascendant: {ascendant.sign} {ascendant.degree.toFixed(2)}°</p>
          <ul className="grid grid-cols-2 gap-4">
            {houses.map((house, idx) => (
              <li key={idx} className="border-b border-white/20 pb-2">
                <span>
                  House {idx + 1}: {house.sign} {house.degree ? house.degree.toFixed(2) : ""}°
                </span>
              </li>
            ))}
          </ul>
        </CosmicCard>
      </div>

      {error && (
        <div className="max-w-5xl mx-auto mt-4 text-red-400">{error}</div>
      )}

      <div className="flex justify-center space-x-4 mt-8">
        <button
          onClick={handleDownloadPDF}
          disabled={downloading}
          className="bg-gold text-deepblue px-6 py-2 rounded font-bold shadow-gold-glow hover:opacity-90 disabled:opacity-60"
        >
          {downloading ? "Preparing PDF..." : "Download PDF"}
        </button>
      </div>
    </div>
  );
};

export default BirthChart;