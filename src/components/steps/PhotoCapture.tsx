// Folder: src/components/steps/PhotoCapture.tsx
import React, { useRef, useState, useEffect } from 'react';

interface PhotoCaptureProps {
  onNext: () => void;
  setPhoto: (photo: File) => void;
}

const PhotoCapture: React.FC<PhotoCaptureProps> = ({ onNext, setPhoto }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [hasCamera, setHasCamera] = useState(false);

  useEffect(() => {
    startCamera();
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'environment' } // Back camera on mobile
      });
      setStream(mediaStream);
      setHasCamera(true);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch (err) {
      console.error('Camera access denied:', err);
      setHasCamera(false);
    }
  };

  const capturePhoto = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    
    if (!video || !canvas) return;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.drawImage(video, 0, 0);
    
    canvas.toBlob((blob) => {
      if (blob) {
        const file = new File([blob], 'cargo-photo.jpg', { type: 'image/jpeg' });
        setPhoto(file);
        onNext();
      }
    }, 'image/jpeg', 0.9);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPhoto(file);
      onNext();
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 text-center">
      <h2 className="text-xl font-bold mb-4">Capture Cargo Photo</h2>
      
      {hasCamera ? (
        <div className="space-y-4">
          <video 
            ref={videoRef} 
            autoPlay 
            playsInline 
            muted
            className="w-full rounded border border-gray-600"
          />
          <button 
            onClick={capturePhoto}
            className="w-full px-4 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-semibold"
          >
            📸 Capture Photo
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="p-8 border-2 border-dashed border-gray-600 rounded-lg">
            <p className="text-gray-400 mb-4">Camera not available</p>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileSelect}
              className="hidden"
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded"
            >
              📁 Select Photo from Gallery
            </button>
          </div>
        </div>
      )}
      
      <canvas ref={canvasRef} className="hidden" />
      
      {hasCamera && (
        <button
          onClick={() => fileInputRef.current?.click()}
          className="mt-2 text-blue-400 hover:text-blue-300 underline"
        >
          Or select from gallery
        </button>
      )}
      
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        className="hidden"
      />
    </div>
  );
};

export default PhotoCapture;
