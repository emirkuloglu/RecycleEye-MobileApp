import React from 'react';
import { View, Text } from 'react-native';
import { CLASS_COLORS, CLASS_EMOJIS } from '../constants';
import { cameraStyles, resultStyles } from '../styles';

/**
 * Tespit edilen nesnelerin çevresine çizilen kutu bileşeni
 * @param {Object} detection - Tespit nesnesi (bbox, class_name, confidence)
 * @param {Object} displayBox - Hesaplanmış display koordinatları
 * @param {boolean} isResultScreen - Sonuç ekranında mı
 */
export const BoundingBox = ({ detection, displayBox, isResultScreen = false }) => {
  const color = CLASS_COLORS[detection.class_name] || '#FFF';
  const { left, top, width, height } = displayBox;
  const borderWidth = isResultScreen ? 3 : 3;
  const isNarrow = width < 80;

  const styles = isResultScreen ? resultStyles : cameraStyles;

  return (
    <View
      style={{
        position: 'absolute',
        left,
        top,
        width,
        height,
        borderWidth: borderWidth,
        borderColor: color,
        borderRadius: 4,
        backgroundColor: `${color}15`,
        zIndex: 10,
      }}
    >
      {/* Label */}
      <View
        style={[
          styles.proLabel,
          { backgroundColor: color },
          isNarrow && {
            left: '50%',
            marginLeft: isResultScreen ? -45 : -40,
            minWidth: isResultScreen ? 90 : 80,
            alignItems: 'center',
          },
        ]}
      >
        <Text style={styles.proLabelText} numberOfLines={1}>
          {CLASS_EMOJIS[detection.class_name]} {Math.round(detection.confidence * 100)}%
        </Text>
      </View>
    </View>
  );
};
