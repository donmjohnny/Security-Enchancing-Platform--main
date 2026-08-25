import React from 'react';
import { StyleSheet, TouchableOpacity, Text, ViewStyle, StyleProp } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Theme } from '../constants/Theme';

interface PillButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'ghost' | 'danger';
  size?: 'small' | 'medium' | 'large';
  style?: StyleProp<ViewStyle>;
  icon?: React.ReactNode;
  disabled?: boolean;
}

export default function PillButton({
  title,
  onPress,
  variant = 'primary',
  size = 'medium',
  style,
  icon,
  disabled = false,
}: PillButtonProps) {
  const sizeStyles = {
    small: { paddingVertical: 10, paddingHorizontal: 20, fontSize: 13 },
    medium: { paddingVertical: 16, paddingHorizontal: 32, fontSize: 16 },
    large: { paddingVertical: 20, paddingHorizontal: 40, fontSize: 18 },
  };

  if (variant === 'primary') {
    return (
      <TouchableOpacity
        activeOpacity={0.85}
        onPress={onPress}
        disabled={disabled}
        style={[disabled && styles.disabled, style]}
      >
        <LinearGradient
          colors={[Theme.colors.primaryGradientStart, Theme.colors.primaryGradientEnd]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={[
            styles.button,
            {
              paddingVertical: sizeStyles[size].paddingVertical,
              paddingHorizontal: sizeStyles[size].paddingHorizontal,
            },
            Theme.shadow.ambient,
          ]}
        >
          {icon && icon}
          <Text
            style={[
              styles.primaryText,
              { fontSize: sizeStyles[size].fontSize },
              icon ? { marginLeft: 8 } : null,
            ]}
          >
            {title}
          </Text>
        </LinearGradient>
      </TouchableOpacity>
    );
  }

  if (variant === 'danger') {
    return (
      <TouchableOpacity
        activeOpacity={0.85}
        onPress={onPress}
        disabled={disabled}
        style={[
          styles.button,
          styles.dangerButton,
          {
            paddingVertical: sizeStyles[size].paddingVertical,
            paddingHorizontal: sizeStyles[size].paddingHorizontal,
          },
          disabled && styles.disabled,
          style,
        ]}
      >
        {icon && icon}
        <Text
          style={[
            styles.dangerText,
            { fontSize: sizeStyles[size].fontSize },
            icon ? { marginLeft: 8 } : null,
          ]}
        >
          {title}
        </Text>
      </TouchableOpacity>
    );
  }

  // Ghost variant
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onPress}
      disabled={disabled}
      style={[
        styles.button,
        styles.ghostButton,
        {
          paddingVertical: sizeStyles[size].paddingVertical,
          paddingHorizontal: sizeStyles[size].paddingHorizontal,
        },
        disabled && styles.disabled,
        style,
      ]}
    >
      {icon && icon}
      <Text
        style={[
          styles.ghostText,
          { fontSize: sizeStyles[size].fontSize },
          icon ? { marginLeft: 8 } : null,
        ]}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: Theme.borderRadius.full,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryText: {
    color: Theme.colors.onPrimary,
    fontFamily: 'Sora_600SemiBold',
    fontWeight: '600',
    letterSpacing: 0.3,
  },
  ghostButton: {
    backgroundColor: 'transparent',
    borderWidth: 1.5,
    borderColor: Theme.colors.primaryLight,
  },
  ghostText: {
    color: Theme.colors.primary,
    fontFamily: 'Sora_600SemiBold',
    fontWeight: '600',
  },
  dangerButton: {
    backgroundColor: Theme.colors.critical,
  },
  dangerText: {
    color: Theme.colors.white,
    fontFamily: 'Sora_600SemiBold',
    fontWeight: '600',
  },
  disabled: {
    opacity: 0.5,
  },
});
