import React, { useState, useRef, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  FlatList,
  ViewToken,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withDelay,
  withRepeat,
  Easing,
  interpolate,
  FadeIn,
  FadeInUp,
  FadeInDown,
} from 'react-native-reanimated';
import Svg, { Circle, Defs, RadialGradient, Stop, Line } from 'react-native-svg';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Theme } from '@/src/constants/Theme';
import { useAppStore } from '@/src/store/useAppStore';
import GradientBackground from '@/src/components/GradientBackground';
import GlassCard from '@/src/components/GlassCard';
import PillButton from '@/src/components/PillButton';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

interface FeatureCard {
  id: string;
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  description: string;
}

const FEATURES: FeatureCard[] = [
  {
    id: '1',
    icon: 'layers-outline',
    title: 'Unified Monitoring',
    description: 'Connect cameras, doors, sensors and security systems in one environment.',
  },
  {
    id: '2',
    icon: 'scan-outline',
    title: 'Intelligent Threat Detection',
    description: 'Identify suspicious activity and abnormal behavior using intelligent analysis.',
  },
  {
    id: '3',
    icon: 'notifications-outline',
    title: 'Instant Alerts',
    description: 'Receive prioritized alerts when potential threats are detected.',
  },
  {
    id: '4',
    icon: 'analytics-outline',
    title: 'Security Intelligence',
    description: 'Understand what is happening across your environment through real-time security insights.',
  },
];

export default function OnboardingScreen() {
  const [step, setStep] = useState<'welcome' | 'features'>('welcome');
  const [activeFeature, setActiveFeature] = useState(0);
  const router = useRouter();
  const completeOnboarding = useAppStore((s) => s.completeOnboarding);

  const handleGetStarted = () => {
    setStep('features');
  };

  const handleEnterSecurityCenter = () => {
    completeOnboarding();
    router.replace('/');
  };

  if (step === 'welcome') {
    return <WelcomeStep onGetStarted={handleGetStarted} />;
  }

  return (
    <FeaturesStep
      activeFeature={activeFeature}
      setActiveFeature={setActiveFeature}
      onEnter={handleEnterSecurityCenter}
    />
  );
}

// ─── Welcome Step ───────────────────────────────────────

function WelcomeStep({ onGetStarted }: { onGetStarted: () => void }) {
  const coreSize = 200;

  return (
    <GradientBackground>
      <View style={styles.welcomeContainer}>
        {/* Top spacing */}
        <View style={styles.welcomeTop}>
          <Animated.Text
            entering={FadeInDown.delay(200).duration(700)}
            style={styles.brandName}
          >
            SENTINEL
          </Animated.Text>
          <Animated.Text
            entering={FadeInDown.delay(400).duration(700)}
            style={styles.tagline}
          >
            Intelligent Security. One Unified Platform.
          </Animated.Text>
        </View>

        {/* Central security visual */}
        <Animated.View
          entering={FadeIn.delay(600).duration(1000)}
          style={styles.welcomeVisual}
        >
          <SecurityVisual size={coreSize} />
        </Animated.View>

        {/* Description */}
        <Animated.Text
          entering={FadeInUp.delay(800).duration(700)}
          style={styles.welcomeDescription}
        >
          Monitor, detect, analyze and respond to security threats across your entire environment from one intelligent platform.
        </Animated.Text>

        {/* Button */}
        <Animated.View
          entering={FadeInUp.delay(1000).duration(700)}
          style={styles.welcomeButton}
        >
          <PillButton
            title="Get Started  →"
            onPress={onGetStarted}
            size="large"
          />
        </Animated.View>
      </View>
    </GradientBackground>
  );
}

// ─── Security Visual (SVG Shield) ──────────────────────

function SecurityVisual({ size }: { size: number }) {
  const pulse = useSharedValue(0);

  useEffect(() => {
    pulse.value = withRepeat(
      withTiming(1, { duration: 2500, easing: Easing.inOut(Easing.ease) }),
      -1,
      true
    );
  }, []);

  const pulseStyle = useAnimatedStyle(() => ({
    opacity: interpolate(pulse.value, [0, 1], [0.5, 1]),
    transform: [{ scale: interpolate(pulse.value, [0, 1], [0.95, 1.05]) }],
  }));

  const center = size / 2;

  return (
    <View style={{ width: size + 40, height: size + 40, alignItems: 'center', justifyContent: 'center' }}>
      <Animated.View style={pulseStyle}>
        <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
          <Defs>
            <RadialGradient id="shieldGrad" cx="50%" cy="50%" r="50%">
              <Stop offset="0%" stopColor={Theme.colors.primaryLight} stopOpacity="0.3" />
              <Stop offset="60%" stopColor={Theme.colors.primaryLight} stopOpacity="0.1" />
              <Stop offset="100%" stopColor={Theme.colors.surfaceContainerLow} stopOpacity="0.05" />
            </RadialGradient>
          </Defs>

          {/* Outer glow ring */}
          <Circle cx={center} cy={center} r={size / 2 - 4} fill="url(#shieldGrad)" />

          {/* Rings */}
          <Circle cx={center} cy={center} r={size / 2 - 10} fill="none" stroke={Theme.colors.primaryLight} strokeWidth={0.5} opacity={0.4} />
          <Circle cx={center} cy={center} r={size / 2 - 30} fill="none" stroke={Theme.colors.primaryLight} strokeWidth={0.5} opacity={0.3} />
          <Circle cx={center} cy={center} r={size / 2 - 50} fill="none" stroke={Theme.colors.primaryLight} strokeWidth={0.5} opacity={0.2} />

          {/* Center circle */}
          <Circle cx={center} cy={center} r={size / 2 - 65} fill="rgba(255,255,255,0.85)" stroke={Theme.colors.glassBorder} strokeWidth={1} />
        </Svg>
      </Animated.View>

      {/* Shield icon */}
      <View style={[styles.shieldIcon, { width: size - 130, height: size - 130 }]}>
        <Ionicons name="shield-checkmark" size={48} color={Theme.colors.primary} />
      </View>
    </View>
  );
}

// ─── Features Step ──────────────────────────────────────

function FeaturesStep({
  activeFeature,
  setActiveFeature,
  onEnter,
}: {
  activeFeature: number;
  setActiveFeature: (i: number) => void;
  onEnter: () => void;
}) {
  const flatListRef = useRef<FlatList>(null);

  const onViewableItemsChanged = useRef(
    ({ viewableItems }: { viewableItems: ViewToken[] }) => {
      if (viewableItems.length > 0 && viewableItems[0].index !== null) {
        setActiveFeature(viewableItems[0].index);
      }
    }
  ).current;

  return (
    <GradientBackground>
      <View style={styles.featuresContainer}>
        {/* Header */}
        <Animated.View entering={FadeInDown.delay(100).duration(600)} style={styles.featuresHeader}>
          <Text style={styles.featuresTitle}>Discover Sentinel</Text>
          <Text style={styles.featuresSubtitle}>Everything you need to protect your environment</Text>
        </Animated.View>

        {/* Feature Cards - Horizontal Scroll */}
        <Animated.View entering={FadeIn.delay(300).duration(800)} style={styles.carouselContainer}>
          <FlatList
            ref={flatListRef}
            data={FEATURES}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onViewableItemsChanged={onViewableItemsChanged}
            viewabilityConfig={{ itemVisiblePercentThreshold: 50 }}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.carouselContent}
            renderItem={({ item, index }) => (
              <FeatureCardItem feature={item} index={index} />
            )}
          />
        </Animated.View>

        {/* Page indicators */}
        <View style={styles.indicators}>
          {FEATURES.map((_, i) => (
            <View
              key={i}
              style={[
                styles.indicator,
                activeFeature === i && styles.indicatorActive,
              ]}
            />
          ))}
        </View>

        {/* Enter button */}
        <Animated.View entering={FadeInUp.delay(500).duration(600)} style={styles.enterButton}>
          <PillButton
            title="Enter Security Center  →"
            onPress={onEnter}
            size="large"
          />
        </Animated.View>
      </View>
    </GradientBackground>
  );
}

function FeatureCardItem({ feature, index }: { feature: FeatureCard; index: number }) {
  return (
    <View style={styles.featureCardWrapper}>
      <GlassCard variant="elevated" style={styles.featureCard}>
        <View style={styles.featureIconWrapper}>
          <Ionicons name={feature.icon} size={32} color={Theme.colors.primary} />
        </View>
        <Text style={styles.featureTitle}>{feature.title}</Text>
        <Text style={styles.featureDescription}>{feature.description}</Text>
      </GlassCard>
    </View>
  );
}

// ─── Styles ─────────────────────────────────────────────

const styles = StyleSheet.create({
  // Welcome
  welcomeContainer: {
    flex: 1,
    justifyContent: 'space-between',
    paddingTop: SCREEN_HEIGHT * 0.1,
    paddingBottom: SCREEN_HEIGHT * 0.06,
    paddingHorizontal: Theme.spacing.containerMargin,
  },
  welcomeTop: {
    alignItems: 'center',
  },
  brandName: {
    fontFamily: 'Sora_700Bold',
    fontSize: 44,
    fontWeight: '700',
    color: Theme.colors.primary,
    letterSpacing: 6,
    textAlign: 'center',
  },
  tagline: {
    fontFamily: 'Sora_400Regular',
    fontSize: 16,
    color: Theme.colors.onSurfaceVariant,
    marginTop: 12,
    textAlign: 'center',
  },
  welcomeVisual: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  shieldIcon: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  welcomeDescription: {
    fontFamily: 'Sora_400Regular',
    fontSize: 15,
    lineHeight: 24,
    color: Theme.colors.textCaption,
    textAlign: 'center',
    paddingHorizontal: Theme.spacing.l,
    marginBottom: Theme.spacing.xl,
  },
  welcomeButton: {
    alignItems: 'center',
  },

  // Features
  featuresContainer: {
    flex: 1,
    paddingTop: SCREEN_HEIGHT * 0.08,
    paddingBottom: SCREEN_HEIGHT * 0.06,
  },
  featuresHeader: {
    paddingHorizontal: Theme.spacing.containerMargin,
    marginBottom: Theme.spacing.xl,
  },
  featuresTitle: {
    fontFamily: 'Sora_700Bold',
    fontSize: 28,
    fontWeight: '700',
    color: Theme.colors.onSurface,
  },
  featuresSubtitle: {
    fontFamily: 'Sora_400Regular',
    fontSize: 15,
    color: Theme.colors.textCaption,
    marginTop: 8,
  },
  carouselContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  carouselContent: {
    paddingHorizontal: (SCREEN_WIDTH - (SCREEN_WIDTH - 80)) / 2,
  },
  featureCardWrapper: {
    width: SCREEN_WIDTH - 80,
    paddingHorizontal: 10,
    justifyContent: 'center',
  },
  featureCard: {
    padding: Theme.spacing.xl,
    minHeight: 280,
    justifyContent: 'center',
    alignItems: 'center',
  },
  featureIconWrapper: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: Theme.colors.primaryLight + '18',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Theme.spacing.l,
  },
  featureTitle: {
    fontFamily: 'Sora_600SemiBold',
    fontSize: 22,
    fontWeight: '600',
    color: Theme.colors.onSurface,
    textAlign: 'center',
    marginBottom: Theme.spacing.m,
  },
  featureDescription: {
    fontFamily: 'Sora_400Regular',
    fontSize: 15,
    lineHeight: 24,
    color: Theme.colors.textCaption,
    textAlign: 'center',
  },
  indicators: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: Theme.spacing.l,
    marginBottom: Theme.spacing.xl,
  },
  indicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Theme.colors.outlineVariant,
    marginHorizontal: 4,
  },
  indicatorActive: {
    backgroundColor: Theme.colors.primary,
    width: 24,
  },
  enterButton: {
    paddingHorizontal: Theme.spacing.containerMargin,
    alignItems: 'center',
  },
});
