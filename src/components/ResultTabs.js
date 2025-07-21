import React, { useState } from "react";
import { motion } from "framer-motion";

import Summary from "./Summary";
import Details from "./Details";
import RelationshipReflectionForm from "./RelationshipReflectionForm";
import { exportToPDF } from "../utils/exportUtils";

// import EmailSender from "./EmailSender"; // ❌ Temporarily disabled

const TABS = ["Summary", "Details", "Relationship Reflection"];

export default function ResultTabs() {
  const [activeTab, setActiveTab] = useState("Summary");

  const renderTabContent = () => {
    switch (activeTab) {
      case "Summary":
        return <Summary />;
      case "Details":
        return <Details />;
      case "Relationship Reflection":
        return <RelationshipReflectionForm />;
      default:
        return null;
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      {/* Tab buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-2 mb-4">
        <div className="flex gap-2">
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-md font-medium transition-all ${
                activeTab === tab
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Export Button */}
        <button
          onClick={() => exportToPDF("tab-content", `${activeTab}.pdf`)}
          className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition"
        >
          Export PDF
        </button>
      </div>

      {/* Tab content area with animation */}
      <motion.div
        id="tab-content"
        key={activeTab}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        transition={{ duration: 0.3 }}
        className="bg-white p-4 rounded-md shadow-md"
      >
        {renderTabContent()}
      </motion.div>

      {/* EmailSender feature disabled for now */}
      {/*
      <div className="mt-6">
        <EmailSender elementId="tab-content" />
      </div>
      */}
    </div>
  );
}
