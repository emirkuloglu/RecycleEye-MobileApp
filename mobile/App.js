import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { useCameraPermissions } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';

import { HomeScreen, CameraScreen, ResultScreen } from './src/components';
import { useDetection, useAnimations, useRealtimeDetection } from './src/hooks';
import { commonStyles, homeStyles } from './src/styles';


export default function App() {
  // Kamera izni
  const [permission, requestPermission] = useCameraPermissions();
  
  // State yönetimi
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);
  const cameraRef = useRef(null);

  // Özel hook'lar
  const { detections, imageSize, isLoading, runDetection, resetDetections } = useDetection();
  const { 
    realtimeDetections, 
    imageSize: realtimeImageSize, 
    isDetecting, 
    stopRealtimeDetection 
  } = useRealtimeDetection(cameraRef, isCameraActive);
  
  // Animasyonlar
  const animations = useAnimations(
    isDetecting, 
    isLoading, 
    isCameraActive, 
    capturedImage && detections.length > 0
  );

  // Fotoğraf çekme
  const takePicture = async () => {
    if (!cameraRef.current) return;
    
    try {
      stopRealtimeDetection();
      
      await new Promise(resolve => setTimeout(resolve, 300));

      const photo = await cameraRef.current.takePictureAsync({
        quality: 0.8,
        base64: true,
        skipProcessing: false,
      });

      if (photo?.uri) {
        setCapturedImage(photo.uri);
        setIsCameraActive(false);
        await runDetection(photo.base64);
      } else {
        throw new Error('Fotoğraf alınamadı');
      }
    } catch (error) {
      console.error('Take picture error:', error);
      Alert.alert('Hata', 'Fotoğraf çekilemedi. Lütfen tekrar deneyin.');
    }
  };

  // Galeriden görüntü seçme
  const pickImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({ 
        mediaTypes: ['images'], 
        quality: 0.8, 
        base64: true 
      });
      
      if (!result.canceled && result.assets[0]) {
        setCapturedImage(result.assets[0].uri);
        await runDetection(result.assets[0].base64);
      }
    } catch (error) {
      Alert.alert('Hata', 'Görüntü seçilemedi');
    }
  };

  // State sıfırlama
  const resetState = () => {
    setCapturedImage(null);
    resetDetections();
    setIsCameraActive(false);
    stopRealtimeDetection();
  };

  // İzin kontrolü
  if (!permission) {
    return (
      <View style={commonStyles.center}>
        <ActivityIndicator size="large" color="#2E7D32" />
      </View>
    );
  }

  if (!permission.granted) {
    return (
      <View style={commonStyles.center}>
        <Text style={homeStyles.permText}>Kamera izni gerekli</Text>
        <TouchableOpacity style={homeStyles.btn} onPress={requestPermission}>
          <Text style={homeStyles.btnText}>İzin Ver</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // Ekran yönetimi
  if (isCameraActive) {
    return (
      <CameraScreen
        cameraRef={cameraRef}
        realtimeDetections={realtimeDetections}
        imageSize={realtimeImageSize}
        isDetecting={isDetecting}
        isLoading={isLoading}
        onTakePicture={takePicture}
        onCancel={resetState}
        {...animations}
      />
    );
  }

  if (capturedImage) {
    return (
      <ResultScreen
        capturedImage={capturedImage}
        detections={detections}
        imageSize={imageSize}
        onNewAnalysis={resetState}
        fadeInAnim={animations.fadeInAnim}
        slideUpAnim={animations.slideUpAnim}
      />
    );
  }

  return (
    <HomeScreen 
      onOpenCamera={() => setIsCameraActive(true)} 
      onPickImage={pickImage}
    />
  );
}