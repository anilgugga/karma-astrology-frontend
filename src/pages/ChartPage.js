// src/pages/ChartPage.js
import React, { useState, useEffect, useRef } from "react";

const ChartPage = () => {
  const canvasRef = useRef(null);
  const [selectedPlanet, setSelectedPlanet] = useState(null);
  const [showAspects, setShowAspects] = useState(true);
  const [chartType, setChartType] = useState("north_indian");

  // 🔸 Sample chartData — replace with real API or calculator data later
  const chartData = {
    planetPositions: {
      SUN: {
        zodiacPosition: { sign: { name: "Taurus" }, degreeInSign: 15 },
        house: 1,
        dignity: { dignity: "Neutral", strength: 50 },
      },
      MOON: {
        zodiacPosition: { sign: { name: "Cancer" }, degreeInSign: 0 },
        house: 4,
        dignity: { dignity: "Own Sign", strength: 100 },
      },
    },
    aspects: [
      {
        planet1: "SUN",
        planet2: "MOON",
        aspect: "Trine",
        orb: 2.3,
        influence: { nature: "Harmonious", strength: 0.8 },
      },
    ],
    houses: [
      { house: 1, sign: { symbol: "♈", name: "Aries" } },
      { house: 2, sign: { symbol: "♉", name: "Taurus" } },
      { house: 3, sign: { symbol: "♊", name: "Gemini" } },
      { house: 4, sign: { symbol: "♋", name: "Cancer" } },
      { house: 5, sign: { symbol: "♌", name: "Leo" } },
      { house: 6, sign: { symbol: "♍", name: "Virgo" } },
      { house: 7, sign: { symbol: "♎", name: "Libra" } },
      { house: 8, sign: { symbol: "♏", name: "Scorpio" } },
      { house: 9, sign: { symbol: "♐", name: "Sagittarius" } },
      { house: 10, sign: { symbol: "♑", name: "Capricorn" } },
      { house: 11, sign: { symbol: "♒", name: "Aquarius" } },
      { house: 12, sign: { symbol: "♓", name: "Pisces" } },
    ],
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    ctx.fillStyle = "#0f172a";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#ffffff";
    ctx.font = "20px Arial";
    ctx.fillText("Chart Rendered Here", 180, 300);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-deepblue to-black text-white font-cosmic">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-10 space-y-10">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl font-bold">Birth Chart Analysis</h1>
          <p className="text-gray-300 mt-2">Interactive planetary insights</p>
        </div>

        {/* Controls */}
        <div className="flex flex-wrap justify-center gap-4">
          <button
            className={`px-4 py-2 rounded text-sm ${
              showAspects ? "bg-blue-600" : "bg-slate-600"
            }`}
            onClick={() => setShowAspects(!showAspects)}
          >
            {showAspects ? "Hide Aspects" : "Show Aspects"}
          </button>
          <select
            value={chartType}
            onChange={(e) => setChartType(e.target.value)}
            className="bg-slate-700 px-4 py-2 rounded text-sm"
          >
            <option value="north_indian">North Indian</option>
            <option value="south_indian">South Indian</option>
            <option value="western">Western</option>
          </select>
        </div>

        {/* Chart Canvas */}
        <div className="flex justify-center">
          <canvas
            ref={canvasRef}
            width={600}
            height={600}
            className="border border-slate-700 rounded-lg"
            onClick={() => setSelectedPlanet(null)}
          />
        </div>

        {/* Planetary Strengths */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">Planetary Strengths</h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
            {Object.entries(chartData.planetPositions).map(([planet, data]) => (
              <div key={planet} className="bg-slate-800 p-4 rounded-lg">
                <div className="flex justify-between mb-2">
                  <span>{planet}</span>
                  <span className="text-sm text-gray-400">{data.dignity.dignity}</span>
                </div>
                <div className="w-full h-2 bg-slate-600 rounded">
                  <div
                    className={`h-2 rounded ${
                      data.dignity.strength > 80
                        ? "bg-green-500"
                        : data.dignity.strength > 50
                        ? "bg-yellow-400"
                        : "bg-red-500"
                    }`}
                    style={{ width: `${data.dignity.strength}%` }}
                  ></div>
                </div>
                <p className="text-sm text-gray-400 mt-1">{data.dignity.strength}% strength</p>
              </div>
            ))}
          </div>
        </section>

        {/* Aspects */}
        {chartData.aspects?.length > 0 && (
          <section>
            <h2 className="text-2xl font-semibold mb-4">Aspects</h2>
            <div className="space-y-2">
              {chartData.aspects.map((aspect, idx) => (
                <div
                  key={idx}
                  className={`bg-slate-800 p-3 rounded flex justify-between items-center ${
                    aspect.influence.nature === "Harmonious"
                      ? "border-l-4 border-green-500"
                      : "border-l-4 border-red-500"
                  }`}
                >
                  <div>
                    <p>
                      {aspect.planet1} {aspect.aspect} {aspect.planet2}
                    </p>
                    <p className="text-xs text-gray-400">
                      Orb: {aspect.orb}° | Strength: {aspect.influence.strength * 100}%
                    </p>
                  </div>
                  <span className="text-sm px-2 py-1 rounded bg-slate-700 text-gray-300">
                    {aspect.influence.nature}
                  </span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Houses */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">Houses</h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
            {chartData.houses.map((house) => (
              <div
                key={house.house}
                className="bg-slate-800 p-4 rounded-lg flex items-center justify-between"
              >
                <div>
                  <p className="font-medium">House {house.house}</p>
                  <p className="text-sm text-gray-400">{house.sign.name}</p>
                </div>
                <div className="text-2xl">{house.sign.symbol}</div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default ChartPage;
