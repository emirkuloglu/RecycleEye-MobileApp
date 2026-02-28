import { useState } from 'react';
import { Alert } from 'react-native';
import { detectObjects } from '../utils';

/**
 * Nesne tespiti için özel hook
 */
export const useDetection = () => {
  const [detections, setDetections] = useState([]);
  const [imageSize, setImageSize] = useState({ width: 0, height: 0 });
  const [isLoading, setIsLoading] = useState(false);

  const runDetection = async (base64Image, isRealtime = false) => {
    try {
      setIsLoading(true);
      const data = await detectObjects(base64Image, isRealtime);
      
      if (data.success) {
        setDetections(data.detections);
        setImageSize(data.image_size);
        return { success: true, detections: data.detections };
      }
      return { success: false };
    } catch (error) {
      if (!isRealtime) {
        Alert.alert('Bağlantı Hatası', 'API bağlantısı kurulamadı');
      }
      setDetections([]);
      return { success: false, error };
    } finally {
      setIsLoading(false);
    }
  };

  const resetDetections = () => {
    setDetections([]);
    setImageSize({ width: 0, height: 0 });
  };

  return {
    detections,
    imageSize,
    isLoading,
    runDetection,
    resetDetections,
  };
};
