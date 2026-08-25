import React, { useEffect } from 'react';
import { StyleSheet, View, Text, ScrollView, SafeAreaView, Dimensions } from 'react-native';
import Animated, {
  useSharedValue, useAnimatedStyle, withRepeat, withTiming,
  Easing, interpolate, FadeIn, FadeInUp,
} from 'react-native-reanimated';
import Svg, { Circle, Line } from 'react-native-svg';
import { Ionicons } from '@expo/vector-icons';
import { Theme } from '@/src/constants/Theme';
import { THREAT_EVENTS, SECURITY_SUMMARY } from '@/src/constants/mockData';
import GradientBackground from '@/src/components/GradientBackground';
import GlassCard from '@/src/components/GlassCard';
import ScreenHeader from '@/src/components/ScreenHeader';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export default function ThreatsScreen() {
  return (
    <GradientBackground>
      <SafeAreaView style={styles.container}>
        <ScreenHeader title="THREAT MONITOR" subtitle="Continuous Analysis" />

        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          {/* Radar Visualization */}
          <Animated.View entering={FadeIn.delay(200).duration(800)} style={styles.radarSection}>
            <RadarViz />
          </Animated.View>

          {/* Risk Score + Threat Level */}
          <Animated.View entering={FadeInUp.delay(400).duration(500)} style={styles.metricsRow}>
            <GlassCard variant="elevated" style={styles.metricCard}>
              <Text style={styles.metricLabel}>Risk Score</Text>
              <Text style={styles.metricValue}>{SECURITY_SUMMARY.riskScore}</Text>
              <Text style={styles.metricUnit}>/ 100</Text>
            </GlassCard>
            <GlassCard variant="elevated" style={styles.metricCard}>
              <Text style={styles.metricLabel}>Threat Level</Text>
              <View style={styles.threatBadge}>
                <Text style={styles.threatBadgeText}>LOW</Text>
              </View>
            </GlassCard>
          </Animated.View>

          {/* Analysis Categories */}
          <Animated.View entering={FadeInUp.delay(500).duration(500)}>
            <Text style={styles.sectionTitle}>System Analyzing</Text>
            <GlassCard style={styles.categoriesCard}>
              {[
                { icon: 'log-in-outline', label: 'Access Behavior' },
                { icon: 'videocam-outline', label: 'Camera Activity' },
                { icon: 'wifi-outline', label: 'Network Events' },
                { icon: 'radio-outline', label: 'Sensor Activity' },
                { icon: 'person-outline', label: 'User Behavior' },
                { icon: 'shield-outline', label: 'Security Events' },
              ].map((item, i) => (
                <View key={i} style={[styles.categoryRow, i < 5 && styles.categoryBorder]}>
                  <View style={styles.categoryLeft}>
                    <Ionicons name={item.icon as any} size={18} color={Theme.colors.primary} />
                    <Text style={styles.categoryLabel}>{item.label}</Text>
                  </View>
                  <View style={styles.analyzeIndicator}>
                    <View style={styles.analyzeDot} />
                    <Text style={styles.analyzeText}>Active</Text>
                  </View>
                </View>
              ))}
            </GlassCard>
          </Animated.View>

          {/* Event Timeline */}
          <Animated.View entering={FadeInUp.delay(600).duration(500)}>
            <Text style={styles.sectionTitle}>Detected Events</Text>
            {THREAT_EVENTS.map((event, index) => (
              <View key={event.id} style={styles.timelineItem}>
                <View style={styles.timelineLine}>
                  <View style={[
                    styles.timelineDot,
                    { backgroundColor: event.status === 'cleared' ? Theme.colors.secure : event.status === 'verified' ? Theme.colors.attention : Theme.colors.primaryLight },
                  ]} />
                  {index < THREAT_EVENTS.length - 1 && <View style={styles.timelineConnector} />}
                </View>
                <GlassCard variant="subtle" style={styles.timelineCard}>
                  <View style={styles.timelineHeader}>
                    <Text style={styles.timelineTime}>{event.time}</Text>
                    <View style={[styles.timelineStatus, {
                      backgroundColor: event.status === 'cleared' ? Theme.colors.secureLight : event.status === 'verified' ? Theme.colors.attentionLight : Theme.colors.primaryLight + '30',
                    }]}>
                      <Text style={[styles.timelineStatusText, {
                        color: event.status === 'cleared' ? Theme.colors.secure : event.status === 'verified' ? Theme.colors.attention : Theme.colors.primary,
                      }]}>{event.status.charAt(0).toUpperCase() + event.status.slice(1)}</Text>
                    </View>
                  </View>
                  <Text style={styles.timelineDescription}>{event.description}</Text>
                </GlassCard>
              </View>
            ))}
          </Animated.View>
        </ScrollView>
      </SafeAreaView>
    </GradientBackground>
  );
}

function RadarViz() {
  const sweep = useSharedValue(0);
  const size = Math.min(SCREEN_WIDTH - 80, 220);
  const center = size / 2;

  useEffect(() => {
    sweep.value = withRepeat(
      withTiming(360, { duration: 4000, easing: Easing.linear }),
      -1, false
    );
  }, []);

  const sweepStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${sweep.value}deg` }],
  }));

  return (
    <View style={[styles.radarContainer, { width: size, height: size }]}>
      <Svg width={size} height={size}>
        <Circle cx={center} cy={center} r={center - 4} fill="none" stroke={Theme.colors.outlineVariant} strokeWidth={0.8} opacity={0.4} />
        <Circle cx={center} cy={center} r={center - 30} fill="none" stroke={Theme.colors.outlineVariant} strokeWidth={0.6} opacity={0.3} />
        <Circle cx={center} cy={center} r={center - 56} fill="none" stroke={Theme.colors.outlineVariant} strokeWidth={0.5} opacity={0.25} />
        <Circle cx={center} cy={center} r={6} fill={Theme.colors.primaryLight} opacity={0.6} />
        <Line x1={center} y1={4} x2={center} y2={size - 4} stroke={Theme.colors.outlineVariant} strokeWidth={0.5} opacity={0.2} />
        <Line x1={4} y1={center} x2={size - 4} y2={center} stroke={Theme.colors.outlineVariant} strokeWidth={0.5} opacity={0.2} />
      </Svg>

      {/* Sweep line */}
      <Animated.View style={[styles.sweepContainer, { width: size, height: size }, sweepStyle]}>
        <View style={[styles.sweepLine, { height: center - 4 }]} />
      </Animated.View>

      {/* Center label */}
      <View style={[styles.radarCenter, { width: size, height: size }]}>
        <Ionicons name="scan-outline" size={24} color={Theme.colors.primary} />
        <Text style={styles.radarLabel}>SCANNING</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollContent: { paddingHorizontal: Theme.spacing.containerMargin, paddingBottom: 40 },

  radarSection: { alignItems: 'center', marginBottom: Theme.spacing.xl },
  radarContainer: { alignItems: 'center', justifyContent: 'center' },
  sweepContainer: { position: 'absolute', alignItems: 'center' },
  sweepLine: { width: 2, backgroundColor: Theme.colors.primaryLight, opacity: 0.6, borderRadius: 1 },
  radarCenter: { position: 'absolute', alignItems: 'center', justifyContent: 'center' },
  radarLabel: { fontFamily: 'Sora_600SemiBold', fontSize: 10, fontWeight: '600', color: Theme.colors.primary, letterSpacing: 2, marginTop: 6 },

  metricsRow: { flexDirection: 'row', gap: Theme.spacing.m, marginBottom: Theme.spacing.l },
  metricCard: { flex: 1, alignItems: 'center', padding: Theme.spacing.l },
  metricLabel: { fontFamily: 'Sora_400Regular', fontSize: 12, color: Theme.colors.textCaption },
  metricValue: { fontFamily: 'Sora_700Bold', fontSize: 40, fontWeight: '700', color: Theme.colors.onSurface, marginTop: 4 },
  metricUnit: { fontFamily: 'Sora_400Regular', fontSize: 14, color: Theme.colors.textCaption },
  threatBadge: { marginTop: 8, paddingHorizontal: 20, paddingVertical: 8, borderRadius: Theme.borderRadius.full, backgroundColor: Theme.colors.secureLight },
  threatBadgeText: { fontFamily: 'Sora_700Bold', fontSize: 14, fontWeight: '700', color: Theme.colors.secure, letterSpacing: 2 },

  sectionTitle: { fontFamily: 'Sora_600SemiBold', fontSize: 16, fontWeight: '600', color: Theme.colors.onSurface, marginBottom: Theme.spacing.s, marginTop: Theme.spacing.m },
  categoriesCard: { padding: Theme.spacing.m, marginBottom: Theme.spacing.m },
  categoryRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 12 },
  categoryBorder: { borderBottomWidth: 1, borderBottomColor: Theme.colors.surfaceContainerHigh },
  categoryLeft: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  categoryLabel: { fontFamily: 'Sora_400Regular', fontSize: 14, color: Theme.colors.onSurface },
  analyzeIndicator: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  analyzeDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: Theme.colors.secure },
  analyzeText: { fontFamily: 'Sora_500Medium', fontSize: 12, fontWeight: '500', color: Theme.colors.secure },

  timelineItem: { flexDirection: 'row', marginBottom: 4 },
  timelineLine: { width: 24, alignItems: 'center', paddingTop: 18 },
  timelineDot: { width: 10, height: 10, borderRadius: 5, zIndex: 1 },
  timelineConnector: { width: 1.5, flex: 1, backgroundColor: Theme.colors.outlineVariant, marginTop: -1 },
  timelineCard: { flex: 1, padding: Theme.spacing.m, marginBottom: Theme.spacing.s },
  timelineHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 },
  timelineTime: { fontFamily: 'Sora_600SemiBold', fontSize: 13, fontWeight: '600', color: Theme.colors.primary },
  timelineStatus: { paddingHorizontal: 10, paddingVertical: 3, borderRadius: Theme.borderRadius.full },
  timelineStatusText: { fontFamily: 'Sora_600SemiBold', fontSize: 10, fontWeight: '600' },
  timelineDescription: { fontFamily: 'Sora_400Regular', fontSize: 13, color: Theme.colors.onSurface, lineHeight: 20 },
});
