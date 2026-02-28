import { useState, useRef, useEffect } from 'react';
import { DETECTION_INTERVAL } from '../constants';
import { detectObjects } from '../utils';

/**
 * Gerçek zamanlı tespit için özel hook
 */
export const useRealtimeDetection = (cameraRef, isCameraActive) => {
  const [realtimeDetections, setRealtimeDetections] = useState([]);
  const [imageSize, setImageSize] = useState({ width: 0, height: 0 });
  const [isDetecting, setIsDetecting] = useState(false);
  const detectionIntervalRef = useRef(null);
  const isDetectingRef = useRef(false);

  const startRealtimeDetection = () => {
    if (detectionIntervalRef.current) return;
    
    detectionIntervalRef.current = setInterval(async () => {
      if (isDetectingRef.current || !cameraRef.current) return;
      
      try {
        isDetectingRef.current = true;
        setIsDetecting(true);

        const photo = await cameraRef.current.takePictureAsync({
          quality: 0.5,
          base64: true,
          skipProcessing: true,
          shutterSound: false,
        });

        if (!photo || !photo.base64) return;

        const data = await detectObjects(photo.base64, true);
        
        if (data.success) {
          setRealtimeDetections(data.detections);
          setImageSize({ width: photo.width, height: photo.height });
        }
      } catch (error) {
        // Sessizce geç - canlı tespit hatası kritik değil
      } finally {
        isDetectingRef.current = false;
        setIsDetecting(false);
      }
    }, DETECTION_INTERVAL);
  };

  const stopRealtimeDetection = () => {
    if (detectionIntervalRef.current) {
      clearInterval(detectionIntervalRef.current);
      detectionIntervalRef.current = null;
    }
    setRealtimeDetections([]);
    isDetectingRef.current = false;
  };

  useEffect(() => {
    if (isCameraActive) {
      startRealtimeDetection();
    } else {
      stopRealtimeDetection();
    }
    return () => stopRealtimeDetection();
  }, [isCameraActive]);

  return {
    realtimeDetections,
    imageSize,
    isDetecting,
    stopRealtimeDetection,
  };
};
