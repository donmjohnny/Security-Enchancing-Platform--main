import React from 'react';
import { StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Theme } from '../constants/Theme';

interface GradientBackgroundProps {
  children: React.ReactNode;
  variant?: 'default' | 'warm' | 'cool';
}

export default function GradientBackground({ children, variant = 'default' }: GradientBackgroundProps) {
  const gradients = {
    default: ['#F3E8FF', '#E0E7FF', '#FCE7F3'],
    warm: ['#FFF0F5', '#FFE4E1', '#FFF8DC'],
    cool: ['#E0F2FE', '#E0E7FF', '#F3E8FF'],
  };

  return (
    <LinearGradient
      colors={gradients[variant] as [string, string, ...string[]]}
      style={styles.gradient}
      start={{ x: 0, y: 0 }}
      end={{ x: 0.5, y: 1 }}
    >
      {children}
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
});
