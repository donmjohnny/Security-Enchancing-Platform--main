import React from 'react';
import { StyleSheet, View, Text, ScrollView, SafeAreaView, Dimensions } from 'react-native';
import Animated, { FadeIn, FadeInUp } from 'react-native-reanimated';
import Svg, { Circle, Path } from 'react-native-svg';
import { Ionicons } from '@expo/vector-icons';
import { Theme } from '@/src/constants/Theme';
import { SECURITY_SUMMARY, SECURITY_SCORE } from '@/src/constants/mockData';
import GradientBackground from '@/src/components/GradientBackground';
import GlassCard from '@/src/components/GlassCard';
import ScreenHeader from '@/src/components/ScreenHeader';

export default function IntelligenceScreen() {
  return (
    <GradientBackground>
      <SafeAreaView style={styles.container}>
        <ScreenHeader title="INTELLIGENCE" subtitle="Security Insights" />

        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          {/* AI Summary Card */}
          <Animated.View entering={FadeIn.delay(100).duration(600)}>
            <GlassCard variant="elevated" style={styles.summaryCard}>
              <View style={styles.summaryHeader}>
                <View style={styles.aiIcon}>
                  <Ionicons name="sparkles" size={20} color={Theme.colors.primary} />
                </View>
                <Text style={styles.summaryTitle}>Security Intelligence</Text>
              </View>
              <Text style={styles.summaryStatus}>Your environment is currently stable.</Text>
              <Text style={styles.summaryText}>{SECURITY_SUMMARY.summary}</Text>
            </GlassCard>
          </Animated.View>

          {/* Key Metrics */}
          <Animated.View entering={FadeInUp.delay(250).duration(500)} style={styles.metricsGrid}>
            <MetricCircle
              value={SECURITY_SUMMARY.riskScore}
              max={100}
              label="Risk Score"
              color={Theme.colors.secure}
              invert
            />
            <MetricCircle
              value={SECURITY_SUMMARY.securityHealth}
              max={100}
              label="Security Health"
              color={Theme.colors.secure}
              suffix="%"
            />
            <MetricCircle
              value={SECURITY_SUMMARY.activeIncidents}
              max={10}
              label="Active Incidents"
              color={Theme.colors.attention}
            />
            <MetricCircle
              value={SECURITY_SUMMARY.systemsOnline}
              max={100}
              label="Systems Online"
              color={Theme.colors.secure}
              suffix="%"
            />
          </Animated.View>

          {/* Security Score Breakdown */}
          <Animated.View entering={FadeInUp.delay(400).duration(500)}>
            <Text style={styles.sectionTitle}>Security Score Breakdown</Text>
            <GlassCard style={styles.breakdownCard}>
              {[
                { label: 'Physical Security', value: SECURITY_SCORE.physical, icon: 'business-outline' },
                { label: 'Cyber Security', value: SECURITY_SCORE.cyber, icon: 'wifi-outline' },
                { label: 'Access Security', value: SECURITY_SCORE.access, icon: 'key-outline' },
                { label: 'Surveillance', value: SECURITY_SCORE.surveillance, icon: 'videocam-outline' },
                { label: 'Incident Response', value: SECURITY_SCORE.incidentResponse, icon: 'flash-outline' },
              ].map((item, i) => (
                <View key={i} style={[styles.breakdownRow, i < 4 && styles.breakdownBorder]}>
                  <View style={styles.breakdownLeft}>
                    <Ionicons name={item.icon as any} size={18} color={Theme.colors.primary} />
                    <Text style={styles.breakdownLabel}>{item.label}</Text>
                  </View>
                  <View style={styles.breakdownRight}>
                    <View style={styles.progressBar}>
                      <View style={[styles.progressFill, {
                        width: `${item.value}%`,
                        backgroundColor: item.value >= 90 ? Theme.colors.secure : item.value >= 80 ? Theme.colors.attention : Theme.colors.critical,
                      }]} />
                    </View>
                    <Text style={styles.breakdownValue}>{item.value}</Text>
                  </View>
                </View>
              ))}
            </GlassCard>
          </Animated.View>

          {/* Overall Score */}
          <Animated.View entering={FadeInUp.delay(500).duration(500)}>
            <GlassCard variant="elevated" style={styles.overallCard}>
              <Text style={styles.overallLabel}>Overall Security Score</Text>
              <View style={styles.overallScoreRow}>
                <Text style={styles.overallScore}>{SECURITY_SCORE.overall}</Text>
                <Text style={styles.overallMax}>/ 100</Text>
              </View>
              <View style={styles.overallBar}>
                <View style={[styles.overallFill, { width: `${SECURITY_SCORE.overall}%` }]} />
              </View>
            </GlassCard>
          </Animated.View>
        </ScrollView>
      </SafeAreaView>
    </GradientBackground>
  );
}

function MetricCircle({
  value, max, label, color, suffix = '', invert = false,
}: {
  value: number; max: number; label: string; color: string; suffix?: string; invert?: boolean;
}) {
  const size = 80;
  const strokeWidth = 6;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const progress = invert ? (max - value) / max : value / max;
  const strokeDashoffset = circumference * (1 - progress);

  return (
    <GlassCard style={styles.metricCircleCard}>
      <View style={{ width: size, height: size, alignItems: 'center', justifyContent: 'center' }}>
        <Svg width={size} height={size}>
          <Circle
            cx={size / 2} cy={size / 2} r={radius}
            fill="none" stroke={Theme.colors.surfaceContainerHigh}
            strokeWidth={strokeWidth}
          />
          <Circle
            cx={size / 2} cy={size / 2} r={radius}
            fill="none" stroke={color}
            strokeWidth={strokeWidth}
            strokeDasharray={`${circumference}`}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            rotation={-90}
            origin={`${size / 2}, ${size / 2}`}
          />
        </Svg>
        <Text style={[styles.circleValue, { position: 'absolute' }]}>{value}{suffix}</Text>
      </View>
      <Text style={styles.circleLabel}>{label}</Text>
    </GlassCard>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollContent: { paddingHorizontal: Theme.spacing.containerMargin, paddingBottom: 40 },

  summaryCard: { padding: Theme.spacing.xl, marginBottom: Theme.spacing.l },
  summaryHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: Theme.spacing.m, gap: 10 },
  aiIcon: { width: 40, height: 40, borderRadius: 20, backgroundColor: Theme.colors.primaryLight + '18', alignItems: 'center', justifyContent: 'center' },
  summaryTitle: { fontFamily: 'Sora_600SemiBold', fontSize: 16, fontWeight: '600', color: Theme.colors.onSurface },
  summaryStatus: { fontFamily: 'Sora_600SemiBold', fontSize: 18, fontWeight: '600', color: Theme.colors.secure, marginBottom: 10 },
  summaryText: { fontFamily: 'Sora_400Regular', fontSize: 14, lineHeight: 22, color: Theme.colors.textBody },

  metricsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: Theme.spacing.s, marginBottom: Theme.spacing.l },
  metricCircleCard: { flex: 1, minWidth: '45%', alignItems: 'center', padding: Theme.spacing.m },
  circleValue: { fontFamily: 'Sora_700Bold', fontSize: 16, fontWeight: '700', color: Theme.colors.onSurface },
  circleLabel: { fontFamily: 'Sora_400Regular', fontSize: 11, color: Theme.colors.textCaption, marginTop: 8, textAlign: 'center' },

  sectionTitle: { fontFamily: 'Sora_600SemiBold', fontSize: 16, fontWeight: '600', color: Theme.colors.onSurface, marginBottom: Theme.spacing.s, marginTop: Theme.spacing.m },

  breakdownCard: { padding: Theme.spacing.m, marginBottom: Theme.spacing.l },
  breakdownRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 14 },
  breakdownBorder: { borderBottomWidth: 1, borderBottomColor: Theme.colors.surfaceContainerHigh },
  breakdownLeft: { flexDirection: 'row', alignItems: 'center', gap: 10, flex: 1 },
  breakdownLabel: { fontFamily: 'Sora_400Regular', fontSize: 14, color: Theme.colors.onSurface },
  breakdownRight: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  progressBar: { width: 80, height: 6, borderRadius: 3, backgroundColor: Theme.colors.surfaceContainerHigh, overflow: 'hidden' },
  progressFill: { height: '100%', borderRadius: 3 },
  breakdownValue: { fontFamily: 'Sora_700Bold', fontSize: 14, fontWeight: '700', color: Theme.colors.onSurface, width: 28, textAlign: 'right' },

  overallCard: { alignItems: 'center', padding: Theme.spacing.xl },
  overallLabel: { fontFamily: 'Sora_400Regular', fontSize: 13, color: Theme.colors.textCaption },
  overallScoreRow: { flexDirection: 'row', alignItems: 'baseline', marginTop: 8, marginBottom: 16 },
  overallScore: { fontFamily: 'Sora_700Bold', fontSize: 48, fontWeight: '700', color: Theme.colors.onSurface },
  overallMax: { fontFamily: 'Sora_400Regular', fontSize: 18, color: Theme.colors.textCaption, marginLeft: 4 },
  overallBar: { width: '100%', height: 8, borderRadius: 4, backgroundColor: Theme.colors.surfaceContainerHigh, overflow: 'hidden' },
  overallFill: { height: '100%', borderRadius: 4, backgroundColor: Theme.colors.secure },
});
