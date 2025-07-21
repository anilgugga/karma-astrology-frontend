import React, { useRef } from "react";
import { useChart } from "../context/ChartContext";
import NorthIndianChart from "../components/charts/NorthIndianChart";
import SouthIndianChart from "../components/charts/SouthIndianChart";
import ResultTabs from "../components/ResultTabs";
import TabPanel from "../components/TabPanel";
import CosmicCard from "../components/CosmicCard";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const BirthChart = () => {
  const { chartData } = useChart();
  const reportRef = useRef();

  if (!chartData) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-[#2B3990] to-[#454FBF] text-white">
        <p className="text-xl opacity-80">No chart data available. Please calculate your chart first.</p>
      </div>
    );
  }

  const { planets, ascendant, houses } = chartData;

  const handlePlanetClick = (planet) => {
    alert(`${planet.name} (${planet.symbol}) is in ${planet.sign} at ${planet.degree.toFixed(1)}° in house ${planet.house}`);
  };

  const handleDownloadPDF = async () => {
    const element = reportRef.current;
    const canvas = await html2canvas(element, { scale: 2 });
    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "px",
      format: [canvas.width, canvas.height],
    });

    pdf.addImage(imgData, "PNG", 0, 0, canvas.width, canvas.height);
    pdf.save("natal_chart_report.pdf");
  };

  const handleShare = async () => {
    const shareData = {
      title: "My Natal Chart",
      text: "Here is my astrology birth chart report.",
      url: window.location.href,
    };

    if (navigator.share) {
      await navigator.share(shareData);
    } else {
      alert("Sharing is not supported on this device.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#2B3990] to-[#454FBF] text-white p-6">
      <header className="text-center mb-10">
        <h1 className="text-4xl font-bold text-[#F5A623] tracking-wide drop-shadow-lg">
          ✨ Your Birth Chart ✨
        </h1>
        <p className="text-lg opacity-90 mt-2">Explore your planetary positions and houses</p>
      </header>

      <div ref={reportRef}>
        <ResultTabs
          tabs={[
            { label: "North Indian Chart", value: "north" },
            { label: "South Indian Chart", value: "south" },
            { label: "Chart Data", value: "data" },
          ]}
        >
          <TabPanel value="north">
            <CosmicCard>
              <NorthIndianChart
                houses={houses}
                planets={planets}
                onPlanetClick={handlePlanetClick}
                showDegrees={true}
              />
            </CosmicCard>
          </TabPanel>

          <TabPanel value="south">
            <CosmicCard>
              <SouthIndianChart
                houses={houses}
                planets={planets}
                onPlanetClick={handlePlanetClick}
                showDegrees={true}
              />
            </CosmicCard>
          </TabPanel>

          <TabPanel value="data">
            <CosmicCard>
              <h2 className="text-2xl text-[#F5A623] font-bold mb-4">Planet Positions</h2>
              <ul className="space-y-2">
                {planets.map((planet) => (
                  <li key={planet.name} className="flex justify-between border-b border-white/20 pb-2">
                    <span>{planet.name} ({planet.symbol})</span>
                    <span>{planet.sign} - {planet.degree.toFixed(2)}° (House {planet.house})</span>
                  </li>
                ))}
              </ul>
              <h2 className="text-2xl text-[#F5A623] font-bold mt-8 mb-4">Ascendant & Houses</h2>
              <p className="mb-4">Ascendant: {ascendant.sign} {ascendant.degree.toFixed(2)}°</p>
              <ul className="grid grid-cols-2 gap-4">
                {houses.map((house, idx) => (
                  <li key={idx} className="border-b border-white/20 pb-2">
                    <span>House {idx + 1}: {house.sign} {house.degree ? house.degree.toFixed(2) : ""}°</span>
                  </li>
                ))}
              </ul>
            </CosmicCard>
          </TabPanel>
        </ResultTabs>
      </div>

      <div className="flex justify-center space-x-4 mt-10">
        <button
          onClick={handleDownloadPDF}
          className="bg-[#F5A623] text-[#2B3990] px-6 py-2 rounded font-bold shadow hover:bg-[#F5A623]/90 transition"
        >
          Download PDF
        </button>
        <button
          onClick={handleShare}
          className="bg-white text-[#2B3990] px-6 py-2 rounded font-bold shadow hover:bg-white/90 transition"
        >
          Share
        </button>
      </div>
    </div>
  );
};

export default BirthChart;