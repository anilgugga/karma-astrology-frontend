import React, { useState, useEffect } from 'react';
import { ChevronDown, ChevronUp, Search, Filter, Download, RefreshCw } from 'lucide-react';

const CoreChart10 = () => {
  const [expandedSections, setExpandedSections] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isLoading, setIsLoading] = useState(false);

  // Complete core chart data structure
  const coreChartData = {
    "Fundamental Principles": {
      color: "bg-blue-600",
      items: [
        { name: "Universal Laws", description: "Natural laws governing all existence", priority: "Critical" },
        { name: "Consciousness Mechanics", description: "How awareness operates across dimensions", priority: "Critical" },
        { name: "Energy Dynamics", description: "Flow and transformation of universal energy", priority: "High" },
        { name: "Dimensional Interface", description: "Interaction between different planes of existence", priority: "High" },
        { name: "Quantum Coherence", description: "Maintaining unity across all levels", priority: "Medium" }
      ]
    },
    "Cosmic Architecture": {
      color: "bg-purple-600",
      items: [
        { name: "Multiversal Structure", description: "Organization of infinite realities", priority: "Critical" },
        { name: "Dimensional Layers", description: "Hierarchical planes of existence", priority: "Critical" },
        { name: "Timeline Networks", description: "Interconnected temporal flows", priority: "High" },
        { name: "Reality Anchors", description: "Stabilizing points in spacetime", priority: "High" },
        { name: "Cosmic Resonance", description: "Harmonic patterns across dimensions", priority: "Medium" }
      ]
    },
    "Consciousness Evolution": {
      color: "bg-green-600",
      items: [
        { name: "Awareness Expansion", description: "Growth of conscious perception", priority: "Critical" },
        { name: "Spiritual Ascension", description: "Evolution to higher states", priority: "Critical" },
        { name: "Collective Awakening", description: "Unified consciousness development", priority: "High" },
        { name: "Dimensional Perception", description: "Ability to perceive multiple realities", priority: "High" },
        { name: "Unity Consciousness", description: "Recognition of fundamental oneness", priority: "Medium" }
      ]
    },
    "Temporal Mechanics": {
      color: "bg-yellow-600",
      items: [
        { name: "Time Flow Dynamics", description: "How time moves across dimensions", priority: "Critical" },
        { name: "Causal Relationships", description: "Cause and effect across timelines", priority: "Critical" },
        { name: "Temporal Paradoxes", description: "Resolution of time contradictions", priority: "High" },
        { name: "Future Probability", description: "Potential timeline outcomes", priority: "High" },
        { name: "Past Integration", description: "Healing and completing past events", priority: "Medium" }
      ]
    },
    "Energy Systems": {
      color: "bg-red-600",
      items: [
        { name: "Source Energy", description: "Prime creative force of existence", priority: "Critical" },
        { name: "Vibrational Frequencies", description: "Energetic signatures of all things", priority: "Critical" },
        { name: "Chakra Networks", description: "Energy centers and their connections", priority: "High" },
        { name: "Auric Fields", description: "Energetic boundaries and protection", priority: "High" },
        { name: "Elemental Forces", description: "Basic energy types and their properties", priority: "Medium" }
      ]
    },
    "Manifestation Protocols": {
      color: "bg-indigo-600",
      items: [
        { name: "Intention Setting", description: "Focused will and clear purpose", priority: "Critical" },
        { name: "Reality Shaping", description: "Conscious creation of experience", priority: "Critical" },
        { name: "Synchronicity Alignment", description: "Harmonizing with universal flow", priority: "High" },
        { name: "Abundance Principles", description: "Laws of prosperity and flow", priority: "High" },
        { name: "Manifestation Timing", description: "When and how things materialize", priority: "Medium" }
      ]
    },
    "Healing Modalities": {
      color: "bg-pink-600",
      items: [
        { name: "Energetic Healing", description: "Restoration through energy work", priority: "Critical" },
        { name: "Soul Retrieval", description: "Recovering fragmented aspects", priority: "Critical" },
        { name: "Karma Clearing", description: "Resolution of past-life patterns", priority: "High" },
        { name: "Ancestral Healing", description: "Healing family lineage patterns", priority: "High" },
        { name: "Dimensional Healing", description: "Healing across multiple realities", priority: "Medium" }
      ]
    },
    "Communication Systems": {
      color: "bg-teal-600",
      items: [
        { name: "Telepathic Networks", description: "Mind-to-mind communication", priority: "Critical" },
        { name: "Channeling Protocols", description: "Receiving higher dimensional guidance", priority: "Critical" },
        { name: "Symbolic Language", description: "Universal symbols and meanings", priority: "High" },
        { name: "Emotional Resonance", description: "Feeling-based communication", priority: "High" },
        { name: "Intuitive Guidance", description: "Inner knowing and wisdom", priority: "Medium" }
      ]
    },
    "Protection Mechanisms": {
      color: "bg-orange-600",
      items: [
        { name: "Energetic Shields", description: "Protective barriers and boundaries", priority: "Critical" },
        { name: "Spiritual Armor", description: "Higher-level protection systems", priority: "Critical" },
        { name: "Clearing Techniques", description: "Removing negative influences", priority: "High" },
        { name: "Grounding Methods", description: "Staying connected to Earth energy", priority: "High" },
        { name: "Banishing Rituals", description: "Removing unwanted entities", priority: "Medium" }
      ]
    },
    "Integration Processes": {
      color: "bg-gray-600",
      items: [
        { name: "Shadow Work", description: "Integrating rejected aspects", priority: "Critical" },
        { name: "Inner Child Healing", description: "Healing childhood wounds", priority: "Critical" },
        { name: "Higher Self Connection", description: "Aligning with divine nature", priority: "High" },
        { name: "Ego Transcendence", description: "Moving beyond limited identity", priority: "High" },
        { name: "Wholeness Achievement", description: "Becoming complete and unified", priority: "Medium" }
      ]
    }
  };

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const filteredData = () => {
    const filtered = {};
    Object.keys(coreChartData).forEach(category => {
      if (selectedCategory === 'all' || selectedCategory === category) {
        const filteredItems = coreChartData[category].items.filter(item =>
          item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.description.toLowerCase().includes(searchTerm.toLowerCase())
        );
        if (filteredItems.length > 0) {
          filtered[category] = {
            ...coreChartData[category],
            items: filteredItems
          };
        }
      }
    });
    return filtered;
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'Critical': return 'text-red-600 bg-red-50';
      case 'High': return 'text-yellow-600 bg-yellow-50';
      case 'Medium': return 'text-green-600 bg-green-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const handleRefresh = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setExpandedSections({});
      setSearchTerm('');
      setSelectedCategory('all');
    }, 1000);
  };

  const handleExport = () => {
    const dataStr = JSON.stringify(coreChartData, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    const exportFileDefaultName = 'core_chart_data.json';
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  const totalItems = Object.values(coreChartData).reduce((sum, category) => sum + category.items.length, 0);
  const filteredItems = Object.values(filteredData()).reduce((sum, category) => sum + category.items.length, 0);

  return (
    <div className="max-w-6xl mx-auto p-6 bg-gradient-to-br from-indigo-50 to-purple-50 min-h-screen">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-4xl font-bold text-gray-800 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Core Chart - Complete System
          </h1>
          <div className="flex gap-2">
            <button
              onClick={handleRefresh}
              disabled={isLoading}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
            >
              <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
              Refresh
            </button>
            <button
              onClick={handleExport}
              className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
            >
              <Download className="w-4 h-4" />
              Export
            </button>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search items..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>
            <div className="relative">
              <Filter className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent appearance-none bg-white"
              >
                <option value="all">All Categories</option>
                {Object.keys(coreChartData).map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
          </div>
          
          <div className="flex items-center justify-between text-sm text-gray-600">
            <span>Showing {filteredItems} of {totalItems} items</span>
            <span>10 Categories • Complete System</span>
          </div>
        </div>
      </div>

      <div className="grid gap-6">
        {Object.entries(filteredData()).map(([category, data]) => (
          <div key={category} className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div
              className={`${data.color} p-4 cursor-pointer transition-all duration-200 hover:opacity-90`}
              onClick={() => toggleSection(category)}
            >
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-white">{category}</h2>
                <div className="flex items-center gap-2">
                  <span className="bg-white/20 text-white px-2 py-1 rounded-full text-sm">
                    {data.items.length} items
                  </span>
                  {expandedSections[category] ? 
                    <ChevronUp className="w-5 h-5 text-white" /> : 
                    <ChevronDown className="w-5 h-5 text-white" />
                  }
                </div>
              </div>
            </div>
            
            {expandedSections[category] && (
              <div className="p-4">
                <div className="grid gap-3">
                  {data.items.map((item, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow duration-200">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold text-gray-800">{item.name}</h3>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(item.priority)}`}>
                          {item.priority}
                        </span>
                      </div>
                      <p className="text-gray-600 text-sm">{item.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-8 bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">System Overview</h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">{totalItems}</div>
            <div className="text-sm text-gray-600">Total Items</div>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <div className="text-2xl font-bold text-green-600">10</div>
            <div className="text-sm text-gray-600">Categories</div>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg">
            <div className="text-2xl font-bold text-purple-600">100%</div>
            <div className="text-sm text-gray-600">Complete</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoreChart10;