// main-app.js - Main Application Component
// Part 5 of Core Chart System

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { ChartRenderer } from './chart-renderer.js';
import { DataProcessor } from './data-processor.js';
import { ConfigManager } from './config-manager.js';
import { InteractionHandler } from './interaction-handler.js';

import { predictMarriageAge, predictCompatibility } from '../../utils/apiService';
const MainApp = () => {
  // ===========================================
  // STATE MANAGEMENT
  // ===========================================
  
  // Core data state
  const [rawData, setRawData] = useState([]);

  const [birthDate, setBirthDate] = useState("1990-01-01");
  const [birthDate1, setBirthDate1] = useState("1990-01-01");
  const [birthDate2, setBirthDate2] = useState("1992-02-02");

  const [processedData, setProcessedData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // Chart configuration state
  const [chartConfig, setChartConfig] = useState({
    type: 'line',
    theme: 'default',
    dimensions: { width: 800, height: 400 },
    animation: { enabled: true, duration: 300 },
    responsive: true
  });
  
  // Interaction state
  const [selectedPoints, setSelectedPoints] = useState([]);
  const [hoveredPoint, setHoveredPoint] = useState(null);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [panOffset, setPanOffset] = useState({ x: 0, y: 0 });
  
  // UI state
  const [showControls, setShowControls] = useState(true);
  const [showLegend, setShowLegend] = useState(true);
  const [activeTab, setActiveTab] = useState('chart');
  const [notifications, setNotifications] = useState([]);
  
  // ===========================================
  // MEMOIZED COMPONENTS & PROCESSORS
  // ===========================================
  
  const dataProcessor = useMemo(() => new DataProcessor(), []);
  const configManager = useMemo(() => new ConfigManager(), []);
  const interactionHandler = useMemo(() => new InteractionHandler(), []);
  
  // ===========================================
  // EVENT HANDLERS

  const handleMarriageAgePrediction = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await predictMarriageAge(birthDate);
      const enhanced = await dataProcessor.processData([result], chartConfig);
      setRawData([result]);
      setProcessedData(enhanced);
      addNotification("Marriage age prediction successful", "success");
    } catch (err) {
      setError(err.message);
      addNotification("Marriage age prediction failed: " + err.message, "error");
    } finally {
      setIsLoading(false);
    }
  }, [birthDate, chartConfig]);

  const handleCompatibilityPrediction = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await predictCompatibility(birthDate1, birthDate2);
      const enhanced = await dataProcessor.processData([result], chartConfig);
      setRawData([result]);
      setProcessedData(enhanced);
      addNotification("Compatibility prediction successful", "success");
    } catch (err) {
      setError(err.message);
      addNotification("Compatibility prediction failed: " + err.message, "error");
    } finally {
      setIsLoading(false);
    }
  }, [birthDate1, birthDate2, chartConfig]);

  // ===========================================
  
  // Data handling events
  const handleDataLoad = useCallback(async (newData) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Validate data
      if (!Array.isArray(newData) || newData.length === 0) {
        throw new Error('Invalid data format');
      }
      
      setRawData(newData);
      
      // Process data
      const processed = await dataProcessor.processData(newData, chartConfig);
      setProcessedData(processed);
      
      // Add success notification
      addNotification('Data loaded successfully', 'success');
      
    } catch (err) {
      setError(err.message);
      addNotification(`Error loading data: ${err.message}`, 'error');
    } finally {
      setIsLoading(false);
    }
  }, [dataProcessor, chartConfig]);
  
  // Configuration events
  const handleConfigChange = useCallback((newConfig) => {
    setChartConfig(prevConfig => {
      const updatedConfig = { ...prevConfig, ...newConfig };
      
      // Reprocess data if necessary
      if (rawData.length > 0) {
        dataProcessor.processData(rawData, updatedConfig)
          .then(processed => setProcessedData(processed))
          .catch(err => setError(err.message));
      }
      
      return updatedConfig;
    });
  }, [rawData, dataProcessor]);
  
  // Chart interaction events
  const handlePointClick = useCallback((point, event) => {
    interactionHandler.handlePointClick(point, event, {
      selectedPoints,
      setSelectedPoints,
      multiSelect: event.ctrlKey || event.metaKey
    });
  }, [interactionHandler, selectedPoints]);
  
  const handlePointHover = useCallback((point, event) => {
    interactionHandler.handlePointHover(point, event, {
      setHoveredPoint,
      showTooltip: true
    });
  }, [interactionHandler]);
  
  const handleZoom = useCallback((delta, center) => {
    interactionHandler.handleZoom(delta, center, {
      currentZoom: zoomLevel,
      setZoomLevel,
      minZoom: 0.1,
      maxZoom: 10
    });
  }, [interactionHandler, zoomLevel]);
  
  const handlePan = useCallback((delta) => {
    interactionHandler.handlePan(delta, {
      currentOffset: panOffset,
      setPanOffset,
      zoomLevel
    });
  }, [interactionHandler, panOffset, zoomLevel]);
  
  // UI control events
  const handleExport = useCallback(async (format = 'png') => {
    try {
      setIsLoading(true);
      const exportData = {
        data: processedData,
        config: chartConfig,
        format
      };
      
      // Simulate export process
      await new Promise(resolve => setTimeout(resolve, 1000));
      addNotification(`Chart exported as ${format.toUpperCase()}`, 'success');
      
    } catch (err) {
      addNotification(`Export failed: ${err.message}`, 'error');
    } finally {
      setIsLoading(false);
    }
  }, [processedData, chartConfig]);
  
  const handleReset = useCallback(() => {
    setSelectedPoints([]);
    setHoveredPoint(null);
    setZoomLevel(1);
    setPanOffset({ x: 0, y: 0 });
    setError(null);
    addNotification('Chart reset to default state', 'info');
  }, []);
  
  // ===========================================
  // UTILITY FUNCTIONS
  // ===========================================
  
  const addNotification = useCallback((message, type = 'info') => {
    const notification = {
      id: Date.now(),
      message,
      type,
      timestamp: new Date().toISOString()
    };
    
    setNotifications(prev => [...prev, notification]);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== notification.id));
    }, 5000);
  }, []);
  
  const removeNotification = useCallback((id) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  }, []);
  
  // ===========================================
  // LIFECYCLE EFFECTS
  // ===========================================
  
  // Initialize with sample data
  useEffect(() => {
    const sampleData = [
      { x: 1, y: 10, category: 'A' },
      { x: 2, y: 20, category: 'A' },
      { x: 3, y: 15, category: 'B' },
      { x: 4, y: 25, category: 'B' },
      { x: 5, y: 30, category: 'C' }
    ];
    
    handleDataLoad(sampleData);
  }, [handleDataLoad]);
  
  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.ctrlKey || event.metaKey) {
        switch (event.key) {
          case 'z':
            event.preventDefault();
            handleReset();
            break;
          case 'e':
            event.preventDefault();
            handleExport();
            break;
          case 'l':
            event.preventDefault();
            setShowLegend(prev => !prev);
            break;
          case 'c':
            event.preventDefault();
            setShowControls(prev => !prev);
            break;
        }
      }
    };
    
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [handleReset, handleExport]);
  
  // ===========================================
  // COMPONENT ORCHESTRATION
  // ===========================================
  
  const renderNotifications = () => (
    <div className="notifications">
      {notifications.map(notification => (
        <div 
          key={notification.id}
          className={`notification notification-${notification.type}`}
          onClick={() => removeNotification(notification.id)}
        >
          <span className="notification-message">{notification.message}</span>
          <button className="notification-close">×</button>
        </div>
      ))}
    </div>
  );
  
  const renderControls = () => (
    showControls && (
      <div className="chart-controls">
        <div className="control-group">
          <label>Chart Type:</label>
          <select 
            value={chartConfig.type}
            onChange={(e) => handleConfigChange({ type: e.target.value })}
          >
            <option value="line">Line</option>
            <option value="bar">Bar</option>
            <option value="scatter">Scatter</option>
            <option value="area">Area</option>
          </select>
        </div>
        
        <div className="control-group">
          <label>Theme:</label>
          <select 
            value={chartConfig.theme}
            onChange={(e) => handleConfigChange({ theme: e.target.value })}
          >
            <option value="default">Default</option>
            <option value="dark">Dark</option>
            <option value="light">Light</option>
            <option value="colorful">Colorful</option>
          </select>
        </div>
        
        <div className="control-group">
          <button onClick={() => handleExport('png')}>Export PNG</button>
          <button onClick={() => handleExport('svg')}>Export SVG</button>
          <button onClick={handleReset}>Reset</button>
        </div>
        
        <div className="control-group">
          <label>
            <input 
              type="checkbox"
              checked={showLegend}
              onChange={(e) => setShowLegend(e.target.checked)}
            />
            Show Legend
          </label>
        </div>
      </div>
    )
  );
  
  const renderTabs = () => (
    <div className="tab-container">
      <div className="tab-header">
        <button 
          className={activeTab === 'chart' ? 'tab active' : 'tab'}
          onClick={() => setActiveTab('chart')}
        >
          Chart
        </button>
        <button 
          className={activeTab === 'data' ? 'tab active' : 'tab'}
          onClick={() => setActiveTab('data')}
        >
          Data
        </button>
        <button 
          className={activeTab === 'config' ? 'tab active' : 'tab'}
          onClick={() => setActiveTab('config')}
        >
          Config
        </button>
      </div>
      
      <div className="tab-content">
        {activeTab === 'chart' && renderChartView()}
        {activeTab === 'data' && renderDataView()}
        {activeTab === 'config' && renderConfigView()}
      </div>
    </div>
  );
  
  const renderChartView = () => (
    <div className="chart-container">
      {error && (
        <div className="error-message">
          Error: {error}
        </div>
      )}
      
      {isLoading && (
        <div className="loading-overlay">
          <div className="spinner"></div>
          <span>Loading...</span>
        </div>
      )}
      
      <ChartRenderer
        data={processedData}
        config={chartConfig}
        selectedPoints={selectedPoints}
        hoveredPoint={hoveredPoint}
        zoomLevel={zoomLevel}
        panOffset={panOffset}
        onPointClick={handlePointClick}
        onPointHover={handlePointHover}
        onZoom={handleZoom}
        onPan={handlePan}
        showLegend={showLegend}
      />
    </div>
  );
  
  const renderDataView = () => (
    <div className="data-view">
      <h3>Raw Data ({rawData.length} rows)</h3>
      <div className="data-table">
        <table>
          <thead>
            <tr>
              {rawData.length > 0 && Object.keys(rawData[0]).map(key => (
                <th key={key}>{key}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rawData.slice(0, 10).map((row, index) => (
              <tr key={index}>
                {Object.values(row).map((value, i) => (
                  <td key={i}>{String(value)}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        {rawData.length > 10 && (
          <div className="data-pagination">
            Showing 10 of {rawData.length} rows
          </div>
        )}
      </div>
    </div>
  );
  
  const renderConfigView = () => (
    <div className="config-view">
      <h3>Chart Configuration</h3>
      <pre className="config-json">
        {JSON.stringify(chartConfig, null, 2)}
      </pre>
    </div>
  );
  
  // ===========================================
  // MAIN LAYOUT STRUCTURE
  // ===========================================
  
  return (
    <div className="main-app">

      {/* Prediction Controls */}
      <div className="control-group">
        <label>Marriage Age Prediction - Birth Date:</label>
        <input type="date" value={birthDate} onChange={(e) => setBirthDate(e.target.value)} />
        <button onClick={handleMarriageAgePrediction}>🔮 Predict Marriage Age</button>
      </div>

      <div className="control-group">
        <label>Compatibility Prediction - Birth Date 1:</label>
        <input type="date" value={birthDate1} onChange={(e) => setBirthDate1(e.target.value)} />
        <label>Birth Date 2:</label>
        <input type="date" value={birthDate2} onChange={(e) => setBirthDate2(e.target.value)} />
        <button onClick={handleCompatibilityPrediction}>❤️ Predict Compatibility</button>
      </div>

      <header className="app-header">
        <h1>Core Chart System</h1>
        <div className="header-controls">
          <button 
            className="toggle-controls"
            onClick={() => setShowControls(!showControls)}
          >
            {showControls ? 'Hide' : 'Show'} Controls
          </button>
        </div>
      </header>
      
      <main className="app-main">
        <aside className="sidebar">
          {renderControls()}
        </aside>
        
        <section className="content">
          {renderTabs()}
        </section>
      </main>
      
      <footer className="app-footer">
        <div className="status-bar">
          <span>Data Points: {processedData.length}</span>
          <span>Selected: {selectedPoints.length}</span>
          <span>Zoom: {Math.round(zoomLevel * 100)}%</span>
          {error && <span className="error">Error: {error}</span>}
        </div>
      </footer>
      
      {renderNotifications()}
      
      <style jsx>{`
        .main-app {
          display: flex;
          flex-direction: column;
          height: 100vh;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }
        
        .app-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1rem;
          background: #f8f9fa;
          border-bottom: 1px solid #e9ecef;
        }
        
        .app-main {
          display: flex;
          flex: 1;
          overflow: hidden;
        }
        
        .sidebar {
          width: 300px;
          background: #f8f9fa;
          border-right: 1px solid #e9ecef;
          overflow-y: auto;
        }
        
        .content {
          flex: 1;
          display: flex;
          flex-direction: column;
        }
        
        .chart-controls {
          padding: 1rem;
        }
        
        .control-group {
          margin-bottom: 1rem;
        }
        
        .control-group label {
          display: block;
          margin-bottom: 0.5rem;
          font-weight: 500;
        }
        
        .control-group select,
        .control-group input {
          width: 100%;
          padding: 0.5rem;
          border: 1px solid #ddd;
          border-radius: 4px;
        }
        
        .control-group button {
          margin-right: 0.5rem;
          padding: 0.5rem 1rem;
          background: #007bff;
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
        }
        
        .tab-container {
          display: flex;
          flex-direction: column;
          height: 100%;
        }
        
        .tab-header {
          display: flex;
          background: #f8f9fa;
          border-bottom: 1px solid #e9ecef;
        }
        
        .tab {
          padding: 1rem;
          background: none;
          border: none;
          cursor: pointer;
          border-bottom: 2px solid transparent;
        }
        
        .tab.active {
          border-bottom-color: #007bff;
          background: white;
        }
        
        .tab-content {
          flex: 1;
          overflow: auto;
        }
        
        .chart-container {
          position: relative;
          padding: 1rem;
          height: 100%;
        }
        
        .data-view,
        .config-view {
          padding: 1rem;
        }
        
        .data-table {
          max-height: 400px;
          overflow: auto;
          border: 1px solid #ddd;
          border-radius: 4px;
        }
        
        .data-table table {
          width: 100%;
          border-collapse: collapse;
        }
        
        .data-table th,
        .data-table td {
          padding: 0.5rem;
          border-bottom: 1px solid #eee;
          text-align: left;
        }
        
        .config-json {
          background: #f8f9fa;
          padding: 1rem;
          border-radius: 4px;
          overflow: auto;
        }
        
        .app-footer {
          padding: 0.5rem 1rem;
          background: #f8f9fa;
          border-top: 1px solid #e9ecef;
        }
        
        .status-bar {
          display: flex;
          gap: 1rem;
          font-size: 0.875rem;
        }
        
        .notifications {
          position: fixed;
          top: 1rem;
          right: 1rem;
          z-index: 1000;
        }
        
        .notification {
          background: white;
          border: 1px solid #ddd;
          border-radius: 4px;
          padding: 1rem;
          margin-bottom: 0.5rem;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
          cursor: pointer;
        }
        
        .notification-success {
          border-left: 4px solid #28a745;
        }
        
        .notification-error {
          border-left: 4px solid #dc3545;
        }
        
        .notification-info {
          border-left: 4px solid #17a2b8;
        }
        
        .loading-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(255,255,255,0.8);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          z-index: 100;
        }
        
        .spinner {
          width: 40px;
          height: 40px;
          border: 4px solid #f3f3f3;
          border-top: 4px solid #007bff;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }
        
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        .error-message {
          background: #f8d7da;
          color: #721c24;
          padding: 1rem;
          border-radius: 4px;
          margin-bottom: 1rem;
        }
        
        .error {
          color: #dc3545;
        }
      `}</style>
    </div>
  );
};

export default MainApp;