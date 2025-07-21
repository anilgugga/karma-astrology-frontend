import React from "react";
import { useChart } from "@/context/ChartContext";
import NorthIndianChart from "@/components/charts/NorthIndianChart";
import SouthIndianChart from "@/components/charts/SouthIndianChart";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";

const BirthChart = () => {
  const { chartData } = useChart();

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#2B3990] to-[#454FBF] text-white p-6">
      <header className="text-center mb-10">
        <h1 className="text-4xl font-bold text-[#F5A623] tracking-wide drop-shadow-lg">
          ✨ Your Birth Chart ✨
        </h1>
        <p className="text-lg opacity-90 mt-2">Explore your planetary positions and houses</p>
      </header>

      <Tabs defaultValue="north" className="max-w-5xl mx-auto">
        <TabsList className="mb-6 flex justify-center gap-4 bg-[#454FBF] p-2 rounded-lg shadow-lg">
          <TabsTrigger value="north" className="text-white hover:text-[#F5A623]">North Indian Chart</TabsTrigger>
          <TabsTrigger value="south" className="text-white hover:text-[#F5A623]">South Indian Chart</TabsTrigger>
          <TabsTrigger value="data" className="text-white hover:text-[#F5A623]">Chart Data</TabsTrigger>
        </TabsList>

        <TabsContent value="north">
          <Card className="p-4 bg-[#2B3990] border-2 border-[#F5A623] rounded-xl shadow-xl">
            <NorthIndianChart
              houses={houses}
              planets={planets}
              onPlanetClick={handlePlanetClick}
              showDegrees={true}
            />
          </Card>
        </TabsContent>

        <TabsContent value="south">
          <Card className="p-4 bg-[#2B3990] border-2 border-[#F5A623] rounded-xl shadow-xl">
            <SouthIndianChart
              houses={houses}
              planets={planets}
              onPlanetClick={handlePlanetClick}
              showDegrees={true}
            />
          </Card>
        </TabsContent>

        <TabsContent value="data">
          <Card className="p-6 bg-[#454FBF] border-2 border-[#F5A623] rounded-xl shadow-xl">
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
            <ul className="grid grid-cols-2 gap-3">
              {houses.map((house) => (
                <li key={house.number} className="bg-[#2B3990] p-3 rounded-lg border border-white/20">
                  <strong>House {house.number}</strong>: {house.sign.name} ({house.sign.symbol})
                </li>
              ))}
            </ul>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default BirthChart;
