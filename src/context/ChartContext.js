import React, { createContext, useContext, useState } from 'react';

const ChartContext = createContext();

export const ChartProvider = ({ children }) => {
  const [chartData, setChartData] = useState(null);
  return (
    <ChartContext.Provider value={{ chartData, setChartData }}>
      {children}
    </ChartContext.Provider>
  );
};

export const useChart = () => useContext(ChartContext);
