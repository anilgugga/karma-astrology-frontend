  const renderTabs = () => (
    <div className="tabs">
      <div className="tab-buttons space-x-2 p-2 border-b bg-gray-100 dark:bg-gray-900">
        <button onClick={() => setActiveTab('chart')} className={activeTab === 'chart' ? 'tab-active' : ''}>Chart</button>
        <button onClick={() => setActiveTab('config')} className={activeTab === 'config' ? 'tab-active' : ''}>Config</button>
        <button onClick={() => setActiveTab('data')} className={activeTab === 'data' ? 'tab-active' : ''}>Data</button>
        <button onClick={() => setActiveTab('mycharts')} className={activeTab === 'mycharts' ? 'tab-active' : ''}>My Charts</button>
      </div>
      <div className="tab-panel p-4">
        {activeTab === 'chart' && renderChart()}
        {activeTab === 'config' && renderConfigPanel()}
        {activeTab === 'data' && renderDataView()}
        {activeTab === 'mycharts' && renderMyCharts()}
      </div>
    </div>
  );

  const renderNotifications = () => (
    <div className="notification-container fixed bottom-4 right-4 space-y-2">
      {notifications.map(n => (
        <div
          key={n.id}
          className={`notification px-4 py-2 rounded shadow-md cursor-pointer notification-${n.type}`}
          onClick={() => removeNotification(n.id)}
        >
          <span>{n.message}</span>
        </div>
      ))}
    </div>
  );

  // ===========================================
  // FINAL RENDER
  // ===========================================
  return (
    <div className="main-app font-sans min-h-screen flex flex-col">
      <header className="app-header bg-blue-600 text-white p-4 shadow">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold">📊 Core Chart System</h1>
          <div>
            <button className="btn-sm" onClick={() => setShowControls(!showControls)}>
              {showControls ? 'Hide Controls' : 'Show Controls'}
            </button>
            <label className="ml-4">
              <input
                type="checkbox"
                checked={showLegend}
                onChange={e => setShowLegend(e.target.checked)}
              />{' '}
              Show Legend
            </label>
          </div>
        </div>
      </header>

      <main className="flex-1 container mx-auto flex">
        {showControls && (
          <aside className="w-1/4 border-r bg-gray-50 dark:bg-gray-900">{renderControls()}</aside>
        )}
        <section className="flex-1">{renderTabs()}</section>
      </main>

      <footer className="app-footer bg-gray-200 dark:bg-gray-800 p-2 text-sm text-gray-700 dark:text-gray-300 text-center">
        Data: {rawData.length} pts | Selected: {selectedPoints.length} | Zoom: {zoomLevel.toFixed(2)}x
        {error && <div className="text-red-500 mt-1">Error: {error}</div>}
      </footer>

      {renderNotifications()}
    </div>
  );
};

export default MainApp;
