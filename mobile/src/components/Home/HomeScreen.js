import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { CLASS_COLORS, CLASS_LABELS, CLASS_EMOJIS } from '../../constants';
import { commonStyles, homeStyles } from '../../styles';

/**
 * Ana ekran bileşeni
 */
export const HomeScreen = ({ onOpenCamera, onPickImage }) => {
  return (
    <SafeAreaView style={commonStyles.container}>
      <LinearGradient
        colors={['#1B5E20', '#2E7D32', '#388E3C']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={commonStyles.header}
      >
        <Text style={commonStyles.headerText}></Text>
      </LinearGradient>

      <View style={homeStyles.home}>
        <Text style={homeStyles.subtitle1}>♻️</Text>
        <Text style={homeStyles.subtitle2}>RecyclEye</Text>
        <Text style={homeStyles.subtitle}>Akıllı Atık Sınıflandırma</Text>

        <View style={homeStyles.infoCard}>
          <Text style={homeStyles.infoTitle}>Desteklenen Atık Türleri</Text>
          <View style={homeStyles.classGrid}>
            {Object.entries(CLASS_LABELS).map(([key, label]) => (
              <View
                key={key}
                style={[
                  homeStyles.classItem,
                  { borderLeftWidth: 3, borderLeftColor: CLASS_COLORS[key] },
                ]}
              >
                <Text style={homeStyles.classEmoji}>{CLASS_EMOJIS[key]}</Text>
                <Text style={homeStyles.classText}>{label}</Text>
              </View>
            ))}
          </View>
        </View>

        <TouchableOpacity style={homeStyles.primaryBtn} onPress={onOpenCamera}>
          <Text style={homeStyles.primaryBtnText}>📷 Kamera Aç</Text>
        </TouchableOpacity>

        <TouchableOpacity style={homeStyles.secondaryBtn} onPress={onPickImage}>
          <Text style={homeStyles.secondaryBtnText}>🖼️ Galeriden Seç</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
