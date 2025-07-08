// src/components/CargoCaptureFlow.tsx
import React, { useState } from 'react';
import PhotoCapture from './steps/PhotoCapture';
import CargoForm from './steps/CargoForm';
import QRPreview from './steps/QRPreview';
import FinalImage from './steps/FinalImage';

interface CargoData {
  id: string;
  description: string;
  length: string;
  width: string;
  height: string;
  unit: string;
  weight: string;
  weightUnit: string;
  notes: string;
}

const CargoCaptureFlow: React.FC = () => {
  const [step, setStep] = useState(0);
  const [photo, setPhoto] = useState<File | null>(null);
  const [cargoData, setCargoData] = useState<CargoData | null>(null);
  const [qrData, setQrData] = useState<string>('');

  const next = () => setStep(step + 1);
  const back = () => setStep(step - 1);

  const steps = ['Photo', 'Details', 'QR Code', 'Final'];

  return (
    <div className="max-w-2xl mx-auto">
      {/* Progress indicator */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-2">
          {steps.map((stepName, index) => (
            <div key={index} className="flex items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                index <= step ? 'bg-orange-500 text-white' : 'bg-gray-600 text-gray-300'
              }`}>
                {index + 1}
              </div>
              <span className={`ml-2 text-sm ${
                index <= step ? 'text-orange-400' : 'text-gray-400'
              }`}>
                {stepName}
              </span>
              {index < steps.length - 1 && (
                <div className={`w-8 h-0.5 mx-4 ${
                  index < step ? 'bg-orange-500' : 'bg-gray-600'
                }`} />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Step components */}
      {step === 0 && <PhotoCapture onNext={next} setPhoto={setPhoto} />}
      {step === 1 && <CargoForm onNext={next} onBack={back} setCargoData={setCargoData} />}
      {step === 2 && <QRPreview cargoData={cargoData} setQrData={setQrData} onNext={next} onBack={back} />}
      {step === 3 && <FinalImage photo={photo} cargoData={cargoData} qrData={qrData} onBack={back} />}
    </div>
  );
};

export default CargoCaptureFlow;
