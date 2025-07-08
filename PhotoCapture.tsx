// Folder: src/components/CargoCaptureFlow.tsx
import React, { useState } from 'react';
import PhotoCapture from './steps/PhotoCapture';
import CargoForm from './steps/CargoForm';
import QRPreview from './steps/QRPreview';
import FinalImage from './steps/FinalImage';

const CargoCaptureFlow = () => {
  const [step, setStep] = useState(0);
  const [photo, setPhoto] = useState<File | null>(null);
  const [cargoData, setCargoData] = useState<any>(null);
  const [qrData, setQrData] = useState<string>('');

  const next = () => setStep(step + 1);
  const back = () => setStep(step - 1);

  return (
    <div>
      {step === 0 && <PhotoCapture onNext={next} setPhoto={setPhoto} />}
      {step === 1 && <CargoForm onNext={next} onBack={back} setCargoData={setCargoData} />}
      {step === 2 && <QRPreview cargoData={cargoData} setQrData={setQrData} onNext={next} onBack={back} />}
      {step === 3 && <FinalImage photo={photo} cargoData={cargoData} qrData={qrData} onBack={back} />}
    </div>
  );
};
export default CargoCaptureFlow;
