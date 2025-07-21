import React, { useState } from 'react';

import BirthInputForm from '../birthInputForm/BirthInputForm';
import BirthChart from '../astrologyCalculators/birthChart/BirthChart';
import DhanaYoga from '../astrologyCalculators/dhanaYoga/DhanaYoga';
import CompatibilityForm from '../astrologyCalculators/compatibility/Compatibility';
import IndianChartRenderers from '../indianChartRenderers/IndianChartRenderers';
import CoreChartEngine from '../coreChartEngine/CoreChartEngine';
import ChartEngineUI from '../chartEngineUI/ChartEngineUI';

// 🔁 Comment these out if they do not exist
// import RelationshipReflectionForm from '../astrologyCalculators/compatibility/RelationshipReflectionForm';
// import PredictMarriageAgeForm from '../astrologyCalculators/compatibility/PredictMarriageAgeForm';

export default function UnifiedApp() {
  const [activeTab, setActiveTab] = useState('input');

  const tabs = [
    { id: 'input', label: 'Birth Input', component: <BirthInputForm /> },
    { id: 'birth-chart', label: 'Birth Chart', component: <BirthChart /> },
    // { id: 'marriage-age', label: 'Marriage Age', component: <PredictMarriageAgeForm /> },
    // { id: 'reflection', label: 'Relationship Reflection', component: <RelationshipReflectionForm /> },
    { id: 'compatibility', label: 'Compatibility', component: <CompatibilityForm /> },
    { id: 'dhana', label: 'Dhana Yoga', component: <DhanaYoga /> },
    { id: 'core-chart', label: 'Core Chart Engine', component: <CoreChartEngine /> },
    { id: 'renderers', label: 'Indian Chart Renderers', component: <IndianChartRenderers /> },
    { id: 'chart-ui', label: 'Chart Engine UI', component: <ChartEngineUI /> },
  ];

  const current = tabs.find(tab => tab.id === activeTab);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4 text-purple-800">Unified Astrology App</h1>

      <div className="flex flex-wrap gap-3 mb-6">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 rounded ${
              activeTab === tab.id
                ? 'bg-purple-700 text-white'
                : 'bg-gray-200 text-gray-800 hover:bg-purple-200'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="bg-white rounded shadow p-6">
        {current?.component || <p>No component found for this tab.</p>}
      </div>
    </div>
  );
}
