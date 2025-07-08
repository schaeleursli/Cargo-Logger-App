// Folder: src/components/steps/QRPreview.tsx
import React, { useEffect, useState } from 'react';
import QRCode from 'qrcode';
import pako from 'pako';
import base45 from 'base45-js';

const QRPreview = ({ cargoData, setQrData, onNext, onBack }: any) => {
  const [qrUrl, setQrUrl] = useState('');
  useEffect(() => {
    const encode = async () => {
      try {
        const compressed = pako.deflate(JSON.stringify(cargoData));
        const encoded = base45.encode(compressed);
        const url = await QRCode.toDataURL(encoded);
        setQrData(encoded);
        setQrUrl(url);
      } catch (err) {
        console.error(err);
      }
    };
    if (cargoData) encode();
  }, [cargoData]);

  return (
    <div className="text-center mt-8">
      <h2 className="text-xl font-bold mb-4">Generated QR Code</h2>
      {qrUrl ? <img src={qrUrl} alt="QR Code" className="mx-auto" /> : <p>Generating...</p>}
      <div className="flex justify-center gap-4 mt-4">
        <button onClick={onBack} className="px-4 py-2 bg-gray-600 text-white rounded">Back</button>
        <button onClick={onNext} className="px-4 py-2 bg-green-600 text-white rounded">Next</button>
      </div>
    </div>
  );
};
export default QRPreview;
