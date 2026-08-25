/**
 * SENTINEL — Neumorphic Luminescence Design System
 *
 * A premium, luminous aesthetic inspired by dawn-light gradients,
 * glassmorphism depth, and organic softness.
 */

export const Theme = {
  colors: {
    // Primary — Purple for focal points
    primary: '#6F53FF',
    primaryLight: '#8B75FF',
    primaryGradientStart: '#6F53FF',
    primaryGradientEnd: '#9B8BFF',
    onPrimary: '#FFFFFF',
    primaryContainer: '#EDE8FF',
    onPrimaryContainer: '#2D2070',

    // Secondary — Soft gray/purple for accents
    secondary: '#8E8E93',
    secondaryLight: '#B0B0B5',
    secondaryContainer: '#F2F2F7',
    onSecondary: '#FFFFFF',
    onSecondaryContainer: '#1C1C1E',

    // Tertiary — Pink for highlights (adapted for red)
    tertiary: '#FF5656',
    tertiaryLight: '#FF8A8A',
    tertiaryContainer: '#FFEBEB',
    onTertiary: '#FFFFFF',

    // Surfaces
    surface: '#F4F4FA',
    surfaceDim: '#EAEAED',
    surfaceBright: '#FFFFFF',
    surfaceContainerLowest: '#FFFFFF',
    surfaceContainerLow: '#F8F8FC',
    surfaceContainer: '#F4F4FA',
    surfaceContainerHigh: '#EAEAF2',
    surfaceContainerHighest: '#DCDCE6',

    // On-surface
    onSurface: '#1C1C1E',
    onSurfaceVariant: '#8E8E93',
    inverseSurface: '#1C1C1E',
    inverseOnSurface: '#F4F4FA',

    // Outline
    outline: '#E5E5EA',
    outlineVariant: '#F2F2F7',

    // Status colors
    secure: '#10C381',
    secureLight: '#D1F4E6',
    attention: '#FFB340',
    attentionLight: '#FFF0D9',
    critical: '#FF5656',
    criticalLight: '#FFEBEB',
    info: '#6F53FF',
    infoLight: '#EDE8FF',

    // Error
    error: '#FF5656',
    onError: '#FFFFFF',
    errorContainer: '#FFEBEB',

    // Utility
    white: '#FFFFFF',
    black: '#000000',
    textBody: '#1C1C1E',
    textCaption: '#8E8E93',
    transparent: 'transparent',

    // Glass
    glassWhite: 'rgba(255, 255, 255, 0.85)',
    glassWhiteLight: 'rgba(255, 255, 255, 0.6)',
    glassWhiteSubtle: 'rgba(255, 255, 255, 0.4)',
    glassBorder: 'rgba(255, 255, 255, 0.6)',
    glassBorderLight: 'rgba(255, 255, 255, 0.3)',

    // Gradient backgrounds
    backgroundGradientStart: '#F4F4FA',
    backgroundGradientMid: '#F9F9FC',
    // Neumorphic
    neuBackground: '#F4F4FA', 
    neuTextDark: '#1C1C1E', 
    neuTextLight: '#8E8E93',
    neuOrange: '#FFB340', 
    neuGreen: '#10C381',
    neuShadowLight: '#FFFFFF',
    neuShadowDark: '#DCDCE6', 
  },

  typography: {
    displayLg: {
      fontFamily: 'Sora_700Bold',
      fontSize: 48,
      fontWeight: '700' as const,
      lineHeight: 56,
      letterSpacing: -0.96,
    },
    headlineLg: {
      fontFamily: 'Sora_600SemiBold',
      fontSize: 32,
      fontWeight: '600' as const,
      lineHeight: 40,
      letterSpacing: -0.32,
    },
    headlineLgMobile: {
      fontFamily: 'Sora_600SemiBold',
      fontSize: 28,
      fontWeight: '600' as const,
      lineHeight: 36,
    },
    headlineMd: {
      fontFamily: 'Sora_600SemiBold',
      fontSize: 24,
      fontWeight: '600' as const,
      lineHeight: 32,
    },
    bodyLg: {
      fontFamily: 'Sora_400Regular',
      fontSize: 18,
      fontWeight: '400' as const,
      lineHeight: 28,
    },
    bodyMd: {
      fontFamily: 'Sora_400Regular',
      fontSize: 16,
      fontWeight: '400' as const,
      lineHeight: 24,
    },
    bodySm: {
      fontFamily: 'Sora_400Regular',
      fontSize: 14,
      fontWeight: '400' as const,
      lineHeight: 20,
    },
    labelMd: {
      fontFamily: 'Sora_600SemiBold',
      fontSize: 14,
      fontWeight: '600' as const,
      lineHeight: 20,
      letterSpacing: 0.28,
    },
    labelSm: {
      fontFamily: 'Sora_500Medium',
      fontSize: 12,
      fontWeight: '500' as const,
      lineHeight: 16,
    },
    labelXs: {
      fontFamily: 'Sora_500Medium',
      fontSize: 10,
      fontWeight: '500' as const,
      lineHeight: 14,
    },
  },

  spacing: {
    xs: 4,
    s: 8,
    m: 16,
    l: 24,
    xl: 32,
    xxl: 48,
    xxxl: 64,
    containerMargin: 24,
    gutter: 24,
    sectionGap: 64,
    elementGap: 16,
  },

  borderRadius: {
    xs: 4,
    s: 8,
    m: 12,
    l: 16,
    xl: 24,
    xxl: 40,
    full: 9999,
  },

  glass: {
    blur: 20,
    blurHeavy: 40,
    backgroundOpacity: 0.85,
    backgroundOpacityLight: 0.6,
    borderOpacity: 0.6,
  },

  shadow: {
    ambient: {
      shadowColor: '#DCDCE6',
      shadowOffset: { width: 0, height: 10 },
      shadowOpacity: 0.4,
      shadowRadius: 20,
      elevation: 8,
    },
    subtle: {
      shadowColor: '#DCDCE6',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.2,
      shadowRadius: 10,
      elevation: 3,
    },
    card: {
      shadowColor: '#DCDCE6',
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.3,
      shadowRadius: 16,
      elevation: 6,
    },
    neuOuterDark: {
      shadowColor: '#DCDCE6',
      shadowOffset: { width: 6, height: 6 },
      shadowOpacity: 0.8,
      shadowRadius: 12,
      elevation: 10,
    },
    neuOuterLight: {
      shadowColor: '#FFFFFF',
      shadowOffset: { width: -6, height: -6 },
      shadowOpacity: 1,
      shadowRadius: 12,
      elevation: 10,
    },
  },
} as const;

export type ThemeColors = typeof Theme.colors;
export type ThemeTypography = typeof Theme.typography;
