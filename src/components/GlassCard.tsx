import React from 'react';
import { StyleSheet, ViewStyle, StyleProp } from 'react-native';
import { BlurView } from 'expo-blur';
import { Theme } from '../constants/Theme';

interface GlassCardProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  variant?: 'default' | 'elevated' | 'subtle' | 'strong';
  borderRadius?: number;
}

export default function GlassCard({
  children,
  style,
  variant = 'default',
  borderRadius,
}: GlassCardProps) {
  const variantStyles: Record<string, ViewStyle> = {
    default: {
      backgroundColor: 'rgba(255, 255, 255, 0.15)',
      borderColor: 'rgba(255, 255, 255, 0.3)',
      borderWidth: 1,
      ...Theme.shadow.card,
    },
    elevated: {
      backgroundColor: 'rgba(255, 255, 255, 0.25)',
      borderColor: 'rgba(255, 255, 255, 0.4)',
      borderWidth: 1,
      ...Theme.shadow.ambient,
    },
    subtle: {
      backgroundColor: 'rgba(255, 255, 255, 0.05)',
      borderColor: 'rgba(255, 255, 255, 0.2)',
      borderWidth: 1,
      ...Theme.shadow.subtle,
    },
    strong: {
      backgroundColor: 'rgba(255, 255, 255, 0.3)',
      borderColor: 'rgba(255, 255, 255, 0.5)',
      borderWidth: 1,
      ...Theme.shadow.neuOuterDark,
    },
  };

  const getIntensity = () => {
    switch(variant) {
      case 'subtle': return 50;
      case 'strong': return 100;
      case 'elevated': return 80;
      default: return 70;
    }
  }

  return (
    <BlurView
      intensity={getIntensity()}
      tint="light"
      style={[
        styles.card,
        variantStyles[variant],
        borderRadius !== undefined && { borderRadius },
        style,
      ]}
    >
      {children}
    </BlurView>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: Theme.borderRadius.xl,
    padding: Theme.spacing.l,
    overflow: 'hidden',
  },
});
