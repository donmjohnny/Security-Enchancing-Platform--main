import React from 'react';
import { View, StyleSheet, ViewStyle, StyleProp, DimensionValue } from 'react-native';
import { Theme } from '../constants/Theme';

interface NeumorphicViewProps {
  children?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  borderRadius?: number;
  width?: DimensionValue;
  height?: DimensionValue;
}

export default function NeumorphicView({
  children,
  style,
  borderRadius = 16,
  width,
  height,
}: NeumorphicViewProps) {
  
  return (
    <View style={[styles.container, { width, height }]}>
      {/* Light Shadow Top-Left */}
      <View
        style={[
          StyleSheet.absoluteFill,
          styles.lightShadow,
          { borderRadius },
        ]}
      />
      {/* Dark Shadow Bottom-Right */}
      <View
        style={[
          StyleSheet.absoluteFill,
          styles.darkShadow,
          { borderRadius },
        ]}
      />
      {/* Content Container */}
      <View style={[styles.content, { borderRadius }, style]}>
        {children}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
  },
  lightShadow: {
    backgroundColor: Theme.colors.neuBackground,
    shadowColor: Theme.colors.neuShadowLight,
    shadowOffset: { width: -8, height: -8 },
    shadowOpacity: 1,
    shadowRadius: 16,
    elevation: 8,
  },
  darkShadow: {
    backgroundColor: Theme.colors.neuBackground,
    shadowColor: Theme.colors.neuShadowDark,
    shadowOffset: { width: 8, height: 8 },
    shadowOpacity: 0.85,
    shadowRadius: 16,
    elevation: 8,
  },
  content: {
    flex: 1,
    backgroundColor: Theme.colors.neuBackground,
    overflow: 'hidden',
  },
});
