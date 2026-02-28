import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, ActivityIndicator, Animated } from 'react-native';
import { CameraView } from 'expo-camera';
import { LinearGradient } from 'expo-linear-gradient';
import { SCREEN_HEIGHT, CLASS_COLORS, CLASS_LABELS, CLASS_EMOJIS } from '../../constants';
import { cameraStyles } from '../../styles';
import { shadeColor, calculateRealtimeBoxes } from '../../utils';
import { BoundingBox } from '../BoundingBox';

/**
 * Kamera ekranı bileşeni
 */
export const CameraScreen = ({
  cameraRef,
  realtimeDetections,
  imageSize,
  isDetecting,
  isLoading,
  onTakePicture,
  onCancel,
  scanLineAnim,
  glowAnim,
  pulseAnim,
}) => {
  const scanTranslateY = scanLineAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, SCREEN_HEIGHT - 200],
  });

  // Gerçek zamanlı tespit kutularını hesapla
  const detectionsWithBoxes = calculateRealtimeBoxes(realtimeDetections, imageSize);

  return (
    <View style={cameraStyles.camContainer}>
      <CameraView ref={cameraRef} style={cameraStyles.camera} facing="back">
        {/* Animated Scan Line */}
        <Animated.View style={[cameraStyles.scanLine, { transform: [{ translateY: scanTranslateY }] }]}>
          <LinearGradient
            colors={['transparent', 'rgba(46, 204, 113, 0.6)', 'transparent']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={cameraStyles.scanLineGradient}
          />
        </Animated.View>

        {/* Detection Boxes Overlay */}
        <View style={cameraStyles.overlay}>
          {detectionsWithBoxes.map((det, i) => (
            <BoundingBox key={i} detection={det} displayBox={det.displayBox} />
          ))}
        </View>

        {/* Status Badge */}
        <View style={cameraStyles.statusContainer}>
          {isDetecting ? (
            <Animated.View style={[cameraStyles.statusBadge, cameraStyles.statusScanning, { opacity: glowAnim }]}>
              <Animated.View style={[cameraStyles.statusDot, cameraStyles.dotActive, { transform: [{ scale: pulseAnim }] }]} />
              <Text style={cameraStyles.statusText}>Taranıyor...</Text>
            </Animated.View>
          ) : (
            <View style={[cameraStyles.statusBadge, cameraStyles.statusReady]}>
              <View style={[cameraStyles.statusDot, cameraStyles.dotReady]} />
              <Text style={cameraStyles.statusText}>Hazır</Text>
            </View>
          )}
        </View>

        {/* Detection Count Badge */}
        {realtimeDetections.length > 0 && (
          <View style={cameraStyles.badge}>
            <LinearGradient
              colors={['#27AE60', '#1B5E20']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={cameraStyles.badgeGradient}
            >
              <Text style={cameraStyles.badgeText}>🎯 {realtimeDetections.length} nesne tespit edildi</Text>
            </LinearGradient>
          </View>
        )}
      </CameraView>

      {/* Realtime Detection Pills */}
      {realtimeDetections.length > 0 && (
        <View style={cameraStyles.detListContainer}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={cameraStyles.detListContent}>
            {realtimeDetections.map((d, i) => (
              <LinearGradient
                key={i}
                colors={[CLASS_COLORS[d.class_name], shadeColor(CLASS_COLORS[d.class_name], -20)]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={cameraStyles.detItem}
              >
                <Text style={cameraStyles.detEmoji}>{CLASS_EMOJIS[d.class_name]}</Text>
                <View style={cameraStyles.detInfo}>
                  <Text style={cameraStyles.detName}>{CLASS_LABELS[d.class_name]}</Text>
                  <Text style={cameraStyles.detConf}>{Math.round(d.confidence * 100)}%</Text>
                </View>
              </LinearGradient>
            ))}
          </ScrollView>
        </View>
      )}

      {/* Camera Controls */}
      <LinearGradient
        colors={['transparent', 'rgba(0,0,0,0.8)', 'rgba(0,0,0,0.95)']}
        style={cameraStyles.controls}
      >
        <TouchableOpacity style={cameraStyles.controlBtn} onPress={onCancel}>
          <View style={cameraStyles.controlBtnInner}>
            <Text style={cameraStyles.controlBtnIcon}>✕</Text>
          </View>
          <Text style={cameraStyles.controlBtnLabel}>İptal</Text>
        </TouchableOpacity>

        <TouchableOpacity style={cameraStyles.captureBtn} onPress={onTakePicture} disabled={isLoading}>
          <View style={cameraStyles.captureBtnOuter}>
            {isLoading ? (
              <ActivityIndicator color="#1B5E20" size="large" />
            ) : (
              <View style={cameraStyles.captureBtnInner}>
                <View style={cameraStyles.captureBtnCore} />
              </View>
            )}
          </View>
        </TouchableOpacity>

        <View style={cameraStyles.controlBtn}>
          <View style={[cameraStyles.controlBtnInner, { opacity: 0 }]} />
        </View>
      </LinearGradient>
    </View>
  );
};
