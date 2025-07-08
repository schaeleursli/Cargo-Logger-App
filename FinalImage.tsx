// Folder: src/components/steps/FinalImage.tsx
import React, { useEffect, useRef } from 'react';
import QRCode from 'qrcode';
import piexif from 'piexifjs';

const FinalImage = ({ photo, cargoData, qrData, onBack }: any) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    if (!photo || !qrData) return;
    const img = new Image();
    img.onload = async () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      ctx.drawImage(img, 0, 0);
      const qrUrl = await QRCode.toDataURL(qrData);
      const qrImg = new Image();
      qrImg.onload = () => {
        const size = Math.min(img.width, img.height) * 0.25;
        ctx.drawImage(qrImg, img.width - size - 20, img.height - size - 20, size, size);
        ctx.font = 'bold 24px sans-serif';
        ctx.fillStyle = 'white';
        ctx.fillText(`ID: ${cargoData.id}`, 20, img.height - 30);
      };
      qrImg.src = qrUrl;
    };
    img.src = URL.createObjectURL(photo);
  }, [photo, qrData]);

  const handleSave = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dataUrl = canvas.toDataURL('image/jpeg');
    const binary = atob(dataUrl.split(',')[1]);
    const exifObj = { '0th': {}, Exif: {}, GPS: {}, Interop: {}, '1st': {}, thumbnail: null };
    const userComment = JSON.stringify({ ...cargoData, qr: qrData });
    exifObj.Exif[piexif.TagNames.Exif.UserComment] = piexif.Util.stringToBytes(userComment);
    const exifBytes = piexif.dump(exifObj);
    const newDataUrl = piexif.insert(exifBytes, dataUrl);
    const link = document.createElement('a');
    link.download = `cargo-${cargoData.id}.jpg`;
    link.href = newDataUrl;
    link.click();
  };

  return (
    <div className="text-center mt-8">
      <h2 className="text-xl font-bold mb-4">Final Image with QR</h2>
      <canvas ref={canvasRef} className="mx-auto border border-white rounded max-w-full" />
      <div className="mt-4">
        <button onClick={onBack} className="px-4 py-2 bg-gray-600 text-white rounded">Back</button>
        <button onClick={handleSave} className="px-4 py-2 bg-blue-600 text-white rounded ml-4">Save Image with Metadata</button>
      </div>
    </div>
  );
};
export default FinalImage;
