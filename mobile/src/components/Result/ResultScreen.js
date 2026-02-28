import React from 'react';
import { View, Text, TouchableOpacity, Image, Animated, SafeAreaView, StatusBar } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { CLASS_COLORS, CLASS_LABELS, CLASS_EMOJIS } from '../../constants';
import { commonStyles, resultStyles } from '../../styles';
import { getConfidenceColor, calculateResultBoxes, calculateResultDisplayDimensions } from '../../utils';
import { BoundingBox } from '../BoundingBox';

/**
 * Sonuç ekranı bileşeni
 */
export const ResultScreen = ({
  capturedImage,
  detections,
  imageSize,
  onNewAnalysis,
  fadeInAnim,
  slideUpAnim,
}) => {
  const { displayWidth, displayHeight } = calculateResultDisplayDimensions(imageSize);
  const detectionsWithBoxes = calculateResultBoxes(detections, imageSize);
  const detectionCount = detections.length;
  const compactMode = detectionCount > 3;

  return (
    <SafeAreaView style={commonStyles.container}>
      <StatusBar barStyle="light-content" />
      <LinearGradient
        colors={['#1B5E20', '#2E7D32', '#388E3C']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={commonStyles.header}
      >
        <Text style={commonStyles.headerTextCompact}>📊 Analiz Sonucu</Text>
      </LinearGradient>

      <View style={resultStyles.resultContainerFull}>
        <Animated.View
          style={[
            resultStyles.resultInner,
            { opacity: fadeInAnim, transform: [{ translateY: slideUpAnim }] },
          ]}
        >
          {/* Image + Summary Row */}
          <View style={resultStyles.topSection}>
            {/* Image Container - contain mode ile tam sığdır */}
            <View
              style={[
                resultStyles.imageBoxCompact,
                { height: displayHeight, width: displayWidth, overflow: 'hidden' },
              ]}
            >
              <Image
                source={{ uri: capturedImage }}
                style={{ width: displayWidth, height: displayHeight, borderRadius: 12 }}
                resizeMode="contain"
              />
              {detectionsWithBoxes.map((det, i) => (
                <BoundingBox key={i} detection={det} displayBox={det.displayBox} isResultScreen />
              ))}
            </View>

            {/* Inline Summary */}
            <View
              style={[
                resultStyles.summaryInline,
                { backgroundColor: detections.length > 0 ? '#E8F5E9' : '#FFEBEE' },
              ]}
            >
              <Text style={resultStyles.summaryIconSmall}>{detections.length > 0 ? '✅' : '❌'}</Text>
              <Text style={resultStyles.summaryTitleSmall}>
                {detections.length > 0 ? `${detections.length} Tespit` : 'Bulunamadı'}
              </Text>
              {detections.length > 0 && (
                <Text style={resultStyles.summarySubSmall}>
                  %{Math.round((detections.reduce((a, b) => a + b.confidence, 0) / detections.length) * 100)} güven
                </Text>
              )}
            </View>
          </View>

          {/* Detection Results - Compact Grid */}
          <View style={resultStyles.resultsSection}>
            {detections.length === 0 ? (
              <View style={resultStyles.emptyResultCompact}>
                <Text style={resultStyles.emptyIconSmall}>🔎</Text>
                <Text style={resultStyles.emptyTextSmall}>Tanınabilir atık bulunamadı</Text>
              </View>
            ) : (
              <View style={compactMode ? resultStyles.resultsGrid : resultStyles.resultsList}>
                {detections.map((d, i) => (
                  <Animated.View
                    key={i}
                    style={[
                      compactMode ? resultStyles.resultItemCompact : resultStyles.resultItemFull,
                      { borderLeftColor: CLASS_COLORS[d.class_name] },
                    ]}
                  >
                    <View
                      style={[
                        resultStyles.resultIconSmall,
                        { backgroundColor: `${CLASS_COLORS[d.class_name]}20` },
                      ]}
                    >
                      <Text style={resultStyles.resultEmojiSmall}>{CLASS_EMOJIS[d.class_name]}</Text>
                    </View>
                    <View style={resultStyles.resultInfoCompact}>
                      <Text style={resultStyles.classNameSmall} numberOfLines={1}>
                        {CLASS_LABELS[d.class_name]}
                      </Text>
                      <View style={resultStyles.confRowCompact}>
                        <View style={resultStyles.confBarSmall}>
                          <View
                            style={[
                              resultStyles.confFillSmall,
                              { width: `${d.confidence * 100}%`, backgroundColor: CLASS_COLORS[d.class_name] },
                            ]}
                          />
                        </View>
                        <Text style={[resultStyles.confTextSmall, { color: getConfidenceColor(d.confidence) }]}>
                          {Math.round(d.confidence * 100)}%
                        </Text>
                      </View>
                    </View>
                  </Animated.View>
                ))}
              </View>
            )}
          </View>

          {/* Action Button - Fixed at bottom */}
          <TouchableOpacity style={resultStyles.newBtnCompact} onPress={onNewAnalysis}>
            <LinearGradient
              colors={['#1B5E20', '#2E7D32']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={resultStyles.newBtnGradientCompact}
            >
              <Text style={resultStyles.newBtnIconSmall}>🔄</Text>
              <Text style={resultStyles.newBtnTextSmall}>Yeni Analiz</Text>
            </LinearGradient>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </SafeAreaView>
  );
};
