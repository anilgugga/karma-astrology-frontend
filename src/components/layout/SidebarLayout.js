import React from "react";

const SidebarLayout = ({ children }) => {
  return (
    <div className="flex min-h-screen bg-gradient-to-br from-[#2B3990] to-[#454FBF] text-white">
      <aside className="w-64 bg-[#2B3990] p-6 border-r border-[#F5A623]">
        <h2 className="text-2xl font-bold text-[#F5A623] mb-6">Karma Astrology</h2>
        <nav className="space-y-4">
          <a href="/dashboard" className="block hover:text-[#F5A623]">Dashboard</a>
          <a href="/birth-chart" className="block hover:text-[#F5A623]">Birth Chart</a>
          <a href="/compatibility" className="block hover:text-[#F5A623]">Compatibility</a>
        </nav>
      </aside>

      <main className="flex-1 p-8 overflow-y-auto">
        {children}
      </main>
    </div>
  );
};

export default SidebarLayout;
