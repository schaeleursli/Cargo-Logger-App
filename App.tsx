// src/App.tsx
import React, { useState } from 'react';
import WelcomeScreen from './components/WelcomeScreen';
import CargoCaptureFlow from './components/CargoCaptureFlow';

function App() {
  const [currentView, setCurrentView] = useState<'welcome' | 'capture'>('welcome');

  const startCapture = () => {
    setCurrentView('capture');
  };

  const goHome = () => {
    setCurrentView('welcome');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white">
      <div className="container mx-auto px-4 py-8">
        {currentView === 'welcome' && (
          <WelcomeScreen onStart={startCapture} />
        )}
        
        {currentView === 'capture' && (
          <div>
            <div className="mb-4">
              <button
                onClick={goHome}
                className="flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors"
              >
                ← Back to Home
              </button>
            </div>
            <CargoCaptureFlow />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
