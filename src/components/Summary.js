import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const data = [
  { category: "Self-Awareness", score: 85 },
  { category: "Empathy", score: 70 },
  { category: "Openness", score: 90 },
  { category: "Trust", score: 75 },
];

export default function Summary() {
  return (
    <div className="bg-white p-4 sm:p-6 rounded-xl shadow-md">
      <h2 className="text-xl font-semibold mb-4">Summary Overview</h2>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="category" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="score" fill="#3b82f6" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
