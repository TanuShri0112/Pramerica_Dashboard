import React, { useState, useRef, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Camera, X, CheckCircle, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';

const QRCodeScanner = ({ open, onOpenChange, onScan, students = [] }) => {
  const videoRef = useRef(null);
  const [stream, setStream] = useState(null);
  const [scanResult, setScanResult] = useState(null);
  const [isScanning, setIsScanning] = useState(false);

  useEffect(() => {
    if (open && !stream) {
      startCamera();
    } else if (!open && stream) {
      stopCamera();
    }

    return () => {
      if (stream) {
        stopCamera();
      }
    };
  }, [open]);

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' } // Use back camera on mobile
      });
      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch (error) {
      toast.error('Unable to access camera. Please check permissions.');
      console.error('Camera error:', error);
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
  };

  const handleScan = () => {
    // In a real app, you would use a QR code scanning library like jsQR or html5-qrcode
    // This is a mock implementation
    setIsScanning(true);
    
    // Simulate QR scan after a delay
    setTimeout(() => {
      // Mock: Find a random student to mark as present
      if (students.length > 0) {
        const randomStudent = students[Math.floor(Math.random() * students.length)];
        const qrData = `STUDENT-${randomStudent.id}`;
        
        setScanResult({
          studentId: randomStudent.id,
          studentName: randomStudent.name,
          timestamp: new Date().toLocaleTimeString(),
          success: true
        });
        
        toast.success(`QR Code scanned: ${randomStudent.name}`);
        if (onScan) {
          onScan(randomStudent.id, 'present');
        }
      } else {
        setScanResult({
          success: false,
          error: 'No students found'
        });
        toast.error('No students found');
      }
      
      setIsScanning(false);
    }, 1000);
  };

  const handleClose = () => {
    stopCamera();
    setScanResult(null);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Camera className="h-5 w-5" />
            QR Code Attendance Scanner
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {!scanResult ? (
            <>
              <div className="relative bg-black rounded-lg overflow-hidden" style={{ aspectRatio: '1' }}>
                {stream ? (
                  <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-white">
                    <Camera className="h-16 w-16 text-gray-400" />
                  </div>
                )}
                {/* Scanner overlay frame */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="border-4 border-blue-500 rounded-lg w-64 h-64">
                    <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-blue-500"></div>
                    <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-blue-500"></div>
                    <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-blue-500"></div>
                    <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-blue-500"></div>
                  </div>
                </div>
              </div>

              <div className="text-center space-y-2">
                <p className="text-sm text-gray-600">
                  Position the QR code within the frame
                </p>
                <Button
                  onClick={handleScan}
                  disabled={isScanning || !stream}
                  className="w-full"
                >
                  {isScanning ? 'Scanning...' : 'Scan QR Code'}
                </Button>
              </div>
            </>
          ) : (
            <div className="space-y-4">
              {scanResult.success ? (
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <span className="font-semibold text-green-800">Scan Successful</span>
                  </div>
                  <div className="text-sm space-y-1">
                    <p><span className="font-medium">Student:</span> {scanResult.studentName}</p>
                    <p><span className="font-medium">Time:</span> {scanResult.timestamp}</p>
                  </div>
                </div>
              ) : (
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertCircle className="h-5 w-5 text-red-600" />
                    <span className="font-semibold text-red-800">Scan Failed</span>
                  </div>
                  <p className="text-sm text-red-700">{scanResult.error}</p>
                </div>
              )}

              <div className="flex gap-2">
                <Button
                  onClick={() => {
                    setScanResult(null);
                    setIsScanning(false);
                  }}
                  variant="outline"
                  className="flex-1"
                >
                  Scan Another
                </Button>
                <Button onClick={handleClose} className="flex-1">
                  Close
                </Button>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default QRCodeScanner;

