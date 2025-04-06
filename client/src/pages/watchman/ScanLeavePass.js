import React, { useState, useEffect, useRef } from 'react';
import { Camera, X, CheckCircle2, AlertCircle, User, Hash, Building2, GraduationCap, Calendar } from 'lucide-react';
import { Html5Qrcode } from 'html5-qrcode';

function ScanLeavePass() {
  const [scannedData, setScannedData] = useState(null);
  const [isScanning, setIsScanning] = useState(false);
  const [error, setError] = useState(null);
  const [isVerified, setIsVerified] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);
  const videoRef = useRef(null);
  const streamRef = useRef(null);

  useEffect(() => {
    // Initialize video when component mounts
    if (isScanning && videoRef.current && !streamRef.current) {
      startCamera();
    }
    // Cleanup when component unmounts
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  }, [isScanning]);

  const startCamera = async () => {
    try {
      const constraints = {
        video: {
          facingMode: 'environment',
          width: { ideal: 1920 },
          height: { ideal: 1080 }
        }
      };
      
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        streamRef.current = stream;
        
        // Wait for video to be ready
        await new Promise((resolve) => {
          videoRef.current.onloadedmetadata = () => {
            videoRef.current.play();
            resolve();
          };
        });
      }
      setError(null);
    } catch (err) {
      console.error('Error accessing camera:', err);
      setError('Could not access camera: ' + err.message);
      setIsScanning(false);
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    setIsScanning(false);
    setCapturedImage(null);
  };

  const captureImage = async () => {
    if (!videoRef.current) return;

    try {
      const video = videoRef.current;
      const canvas = document.createElement('canvas');
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      
      const ctx = canvas.getContext('2d');
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      
      const imageData = canvas.toDataURL('image/jpeg', 1.0);
      setCapturedImage(imageData);
      stopCamera();

      // Create a new instance of Html5Qrcode
      const html5Qrcode = new Html5Qrcode("reader");
      
      try {
        // Convert base64 to file
        const file = dataURLtoFile(imageData, 'captured-image.jpeg');
        
        // Scan the image file
        const result = await html5Qrcode.scanFile(file, true);
        console.log("Scanned Result:", result);
        handleSuccess(result);
      } catch (err) {
        console.error('Error scanning barcode:', err);
        setError('Could not detect barcode. Please try again.');
      } finally {
        html5Qrcode.clear();
      }
    } catch (err) {
      console.error('Error capturing image:', err);
      setError('Error capturing image: ' + err.message);
    }
  };

  const startScanning = () => {
    setScannedData(null);
    setError(null);
    setIsVerified(false);
    setCapturedImage(null);
    setIsScanning(true);
  };

  const dataURLtoFile = (dataurl, filename) => {
    let arr = dataurl.split(','),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]),
        n = bstr.length,
        u8arr = new Uint8Array(n);
    while(n--){
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, {type:mime});
  };

  const handleSuccess = (decodedText) => {
    try {
      const rollNumber = decodedText.trim();
      console.log('Extracted roll number:', rollNumber);

      const studentData = {
        rollNumber: rollNumber,
        studentName: "PERALA HEMANTH",
        department: "CSE",
        batch: "2022-2026",
        college: "VNR Vignana Jyothi Institute of Engineering and Technology"
      };
      
      setScannedData(studentData);
      setIsVerified(true);
    } catch (err) {
      console.error('Error processing scan:', err);
      setError('Invalid barcode format');
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Scan Student ID</h1>
      
      <div className="max-w-md mx-auto">
        {!isScanning && !capturedImage ? (
          <div 
            className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-blue-500 transition-colors"
            onClick={startScanning}
          >
            <Camera className="w-12 h-12 text-gray-400 mb-2 mx-auto" />
            <span className="text-gray-600">
              Click to capture student ID card
            </span>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="relative rounded-lg overflow-hidden">
              {isScanning ? (
                <>
                  <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    className="w-full h-auto"
                  />
                  <div className="absolute bottom-4 left-0 right-0 flex justify-center">
                    <button
                      onClick={captureImage}
                      className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition-colors"
                    >
                      Capture Image
                    </button>
                  </div>
                </>
              ) : capturedImage && (
                <img src={capturedImage} alt="Captured ID" className="w-full h-auto" />
              )}
              <button
                onClick={stopCamera}
                className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors z-10"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <p className="text-center text-sm text-gray-600">
              {isScanning ? "Position the ID card and click capture" : "Processing image..."}
            </p>
          </div>
        )}

        {error && (
          <div className="mt-4 p-4 bg-red-50 text-red-700 rounded-lg flex items-center gap-2">
            <AlertCircle className="w-5 h-5" />
            <span>{error}</span>
          </div>
        )}

        {/* Rest of the component (student details display) remains the same */}
        {scannedData && (
          <div className="mt-6 bg-white rounded-lg shadow-lg p-6">
            {/* Existing student details JSX */}
          </div>
        )}
      </div>
    </div>
  );
}

export default ScanLeavePass;