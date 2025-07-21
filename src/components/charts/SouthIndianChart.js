import React from "react";

const SouthIndianChart = ({ houses, planets, onPlanetClick, showDegrees = true }) => {
  const size = 400;
  const cellSize = size / 4;

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="mx-auto">
      <rect width={size} height={size} fill="#2B3990" stroke="#F5A623" strokeWidth="2" rx="16" />
      
      {/* Grid */}
      {[1,2,3].map(i => (
        <line key={"h"+i} x1={0} y1={i * cellSize} x2={size} y2={i * cellSize} stroke="#F5A623" strokeWidth="2" />
      ))}
      {[1,2,3].map(i => (
        <line key={"v"+i} x1={i * cellSize} y1={0} x2={i * cellSize} y2={size} stroke="#F5A623" strokeWidth="2" />
      ))}

      {/* House numbers and signs */}
      {houses.map((house) => {
        const row = Math.floor((house.number - 1) / 4);
        const col = (house.number - 1) % 4;

        const x = col * cellSize + cellSize / 2;
        const y = row * cellSize + cellSize / 2;

        return (
          <text
            key={house.number}
            x={x}
            y={y}
            fill="#FFFFFF"
            fontSize="14"
            textAnchor="middle"
            dominantBaseline="middle"
          >
            {house.number} {house.sign.symbol}
          </text>
        );
      })}

      {/* Planets */}
      {planets.map((planet, index) => {
        const house = houses.find(h => h.number === planet.house);
        const row = Math.floor((house.number - 1) / 4);
        const col = (house.number - 1) % 4;

        const x = col * cellSize + (15 + (index * 15)) % cellSize;
        const y = row * cellSize + 30 + ((index * 15) % (cellSize - 40));

        return (
          <g
            key={planet.name + index}
            onClick={() => onPlanetClick && onPlanetClick(planet)}
            className="cursor-pointer hover:scale-110 transition-transform"
          >
            <circle cx={x} cy={y} r="10" fill="#F5A623" stroke="#FFFFFF" strokeWidth="1" />
            <text x={x} y={y + 4} textAnchor="middle" fill="#2B3990" fontSize="12" fontWeight="bold">
              {planet.symbol}
            </text>
            {showDegrees && (
              <text x={x} y={y + 18} textAnchor="middle" fill="#FFFFFF" fontSize="10">
                {planet.degree.toFixed(0)}°
              </text>
            )}
          </g>
        );
      })}
    </svg>
  );
};

export default SouthIndianChart;
