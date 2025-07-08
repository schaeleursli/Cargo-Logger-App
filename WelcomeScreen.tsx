
// Folder: src/components/WelcomeScreen.tsx
import React from 'react';
const features = [
  { title: 'Capture Photos', description: 'Take photos of your cargo items', icon: '📷' },
  { title: 'Record Details', description: 'Document dimensions, weight, and info', icon: '📦' },
  { title: 'Track Location', description: 'Add GPS coordinates to data', icon: '📍' },
  { title: 'Generate QR Codes', description: 'Create QR with embedded data', icon: '🔲' },
  { title: 'Save & Share', description: 'Store or share the image + data', icon: '📤' },
];
const WelcomeScreen = ({ onStart }: { onStart: () => void }) => (
  <div className="flex flex-col items-center gap-6">
    <h1 className="text-3xl font-bold mt-8">Cargo Capture</h1>
    <p className="text-sm text-center text-gray-300 max-w-sm">
      Document cargo with photos, details, and embedded QR
    </p>
    <div className="w-full max-w-md space-y-4 mt-4">
      {features.map((f, i) => (
        <div key={i} className="bg-[#141A2A] rounded-xl p-4 flex items-start gap-4">
          <div className="text-2xl">{f.icon}</div>
          <div>
            <h2 className="text-lg font-semibold">{f.title}</h2>
            <p className="text-gray-400 text-sm">{f.description}</p>
          </div>
        </div>
      ))}
    </div>
    <button
      className="mt-6 bg-orange-500 hover:bg-orange-600 px-6 py-3 rounded-full text-lg"
      onClick={onStart}
    >Start New Cargo Entry 📸</button>
  </div>
);
export default WelcomeScreen;