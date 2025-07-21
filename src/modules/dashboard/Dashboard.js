import React from "react";
import CosmicCard from "../../components/CosmicCard";
import { PieChart, Pie, Cell, ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip } from "recharts";

const Dashboard = () => {
  const clients = [
    { name: "Alice Sharma", dob: "1992-05-12", chartType: "Natal" },
    { name: "Ravi Patel", dob: "1985-09-30", chartType: "Marriage Age" },
    { name: "Meera Gupta", dob: "2000-11-05", chartType: "Compatibility" },
  ];

  const chartMetrics = [
    { label: "Total Charts", value: 124 },
    { label: "Avg Marriage Age Prediction", value: "27.5 yrs" },
    { label: "Compatibility Reports", value: 85 },
    { label: "Feedback Received", value: 43 },
  ];

  const pieData = [
    { name: "Marriage Age", value: 40 },
    { name: "Compatibility", value: 30 },
    { name: "Transit Reports", value: 20 },
    { name: "Other", value: 10 },
  ];

  const COLORS = ["#F5A623", "#FFD700", "#FFA500", "#FFCC80"];

  const activityData = [
    { time: "10 AM", apiCalls: 20 },
    { time: "11 AM", apiCalls: 35 },
    { time: "12 PM", apiCalls: 30 },
    { time: "1 PM", apiCalls: 50 },
    { time: "2 PM", apiCalls: 40 },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#2B3990] to-[#454FBF] text-white p-6">
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold text-[#F5A623] tracking-wide drop-shadow-lg">
          🪐 Astrology AI Dashboard 🪐
        </h1>
        <p className="text-lg opacity-90 mt-2">Overview of client charts, reports, and system metrics</p>
      </header>

      <div className="grid md:grid-cols-2 gap-6 max-w-6xl mx-auto">
        <CosmicCard>
          <h2 className="text-2xl font-bold text-[#F5A623] mb-4">Recent Clients</h2>
          <ul className="space-y-3">
            {clients.map((client, index) => (
              <li key={index} className="flex justify-between border-b border-white/20 pb-2">
                <span>{client.name} ({client.dob})</span>
                <span>{client.chartType}</span>
              </li>
            ))}
          </ul>
        </CosmicCard>

        <CosmicCard>
          <h2 className="text-2xl font-bold text-[#F5A623] mb-4">Chart Metrics</h2>
          <ul className="space-y-3">
            {chartMetrics.map((metric, idx) => (
              <li key={idx} className="flex justify-between border-b border-white/20 pb-2">
                <span>{metric.label}</span>
                <span>{metric.value}</span>
              </li>
            ))}
          </ul>
        </CosmicCard>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mt-8 max-w-6xl mx-auto">
        <CosmicCard>
          <h2 className="text-xl text-[#F5A623] mb-4 font-bold">Chart Type Distribution</h2>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={80}
                fill="#F5A623"
                paddingAngle={5}
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </CosmicCard>

        <CosmicCard>
          <h2 className="text-xl text-[#F5A623] mb-4 font-bold">API Calls Activity</h2>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={activityData}>
              <XAxis dataKey="time" stroke="#FFFFFF" />
              <YAxis stroke="#FFFFFF" />
              <Tooltip />
              <Line type="monotone" dataKey="apiCalls" stroke="#F5A623" strokeWidth={3} dot={{ fill: "#FFD700" }} />
            </LineChart>
          </ResponsiveContainer>
        </CosmicCard>
      </div>
    </div>
  );
};

export default Dashboard;
