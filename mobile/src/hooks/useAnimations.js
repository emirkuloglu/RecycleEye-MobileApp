import { useRef, useEffect } from 'react';
import { Animated, Easing } from 'react-native';

/**
 * Farklı animasyonlar için özel hook
 */
export const useAnimations = (isDetecting, isLoading, isCameraActive, hasResults) => {
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const scanLineAnim = useRef(new Animated.Value(0)).current;
  const glowAnim = useRef(new Animated.Value(0.3)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const fadeInAnim = useRef(new Animated.Value(0)).current;
  const slideUpAnim = useRef(new Animated.Value(50)).current;

  // Pulse efekti - tespit sırasında
  useEffect(() => {
    if (isDetecting) {
      const pulse = Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, { toValue: 1.4, duration: 400, useNativeDriver: true, easing: Easing.ease }),
          Animated.timing(pulseAnim, { toValue: 1, duration: 400, useNativeDriver: true, easing: Easing.ease }),
        ])
      );
      pulse.start();
      return () => pulse.stop();
    }
  }, [isDetecting]);

  // Scan line animasyonu - kamera aktifken
  useEffect(() => {
    if (isCameraActive) {
      const scanAnimation = Animated.loop(
        Animated.sequence([
          Animated.timing(scanLineAnim, { toValue: 1, duration: 2000, useNativeDriver: true, easing: Easing.linear }),
          Animated.timing(scanLineAnim, { toValue: 0, duration: 0, useNativeDriver: true }),
        ])
      );
      scanAnimation.start();

      // Glow efekti
      const glowAnimation = Animated.loop(
        Animated.sequence([
          Animated.timing(glowAnim, { toValue: 0.8, duration: 1500, useNativeDriver: true, easing: Easing.inOut(Easing.ease) }),
          Animated.timing(glowAnim, { toValue: 0.3, duration: 1500, useNativeDriver: true, easing: Easing.inOut(Easing.ease) }),
        ])
      );
      glowAnimation.start();

      return () => {
        scanAnimation.stop();
        glowAnimation.stop();
      };
    }
  }, [isCameraActive]);

  // Loading dönen animasyon
  useEffect(() => {
    if (isLoading) {
      const rotateAnimation = Animated.loop(
        Animated.timing(rotateAnim, { toValue: 1, duration: 1000, useNativeDriver: true, easing: Easing.linear })
      );
      rotateAnimation.start();
      return () => rotateAnimation.stop();
    } else {
      rotateAnim.setValue(0);
    }
  }, [isLoading]);

  // Sonuç kartları animasyonu
  useEffect(() => {
    if (hasResults) {
      fadeInAnim.setValue(0);
      slideUpAnim.setValue(50);

      Animated.parallel([
        Animated.timing(fadeInAnim, { toValue: 1, duration: 500, useNativeDriver: true }),
        Animated.spring(slideUpAnim, { toValue: 0, useNativeDriver: true, damping: 15, stiffness: 100 }),
      ]).start();
    }
  }, [hasResults]);

  return {
    pulseAnim,
    scanLineAnim,
    glowAnim,
    rotateAnim,
    fadeInAnim,
    slideUpAnim,
  };
};
