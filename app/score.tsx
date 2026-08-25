import React from 'react';
import { StyleSheet, View, Text, ScrollView, SafeAreaView, Dimensions } from 'react-native';
import Animated, { FadeIn, FadeInUp } from 'react-native-reanimated';
import Svg, { Circle } from 'react-native-svg';
import { Ionicons } from '@expo/vector-icons';
import { Theme } from '@/src/constants/Theme';
import { SECURITY_SCORE } from '@/src/constants/mockData';
import GradientBackground from '@/src/components/GradientBackground';
import GlassCard from '@/src/components/GlassCard';
import ScreenHeader from '@/src/components/ScreenHeader';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

interface ScoreCategory {
  label: string;
  value: number;
  icon: keyof typeof Ionicons.glyphMap;
  color: string;
}

const categories: ScoreCategory[] = [
  { label: 'Physical Security', value: SECURITY_SCORE.physical, icon: 'business-outline', color: '#4CAF50' },
  { label: 'Cyber Security', value: SECURITY_SCORE.cyber, icon: 'wifi-outline', color: '#2196F3' },
  { label: 'Access Security', value: SECURITY_SCORE.access, icon: 'key-outline', color: '#FF9800' },
  { label: 'Surveillance', value: SECURITY_SCORE.surveillance, icon: 'videocam-outline', color: '#9C27B0' },
  { label: 'Incident Response', value: SECURITY_SCORE.incidentResponse, icon: 'flash-outline', color: '#F44336' },
];

function CircularScore({
  value,
  max = 100,
  size = 160,
  strokeWidth = 10,
  color,
  label,
  isMain = false,
}: {
  value: number;
  max?: number;
  size?: number;
  strokeWidth?: number;
  color: string;
  label?: string;
  isMain?: boolean;
}) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const progress = value / max;
  const strokeDashoffset = circumference * (1 - progress);

  return (
    <View style={{ alignItems: 'center' }}>
      <View style={{ width: size, height: size, alignItems: 'center', justifyContent: 'center' }}>
        <Svg width={size} height={size}>
          {/* Background track */}
          <Circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={Theme.colors.surfaceContainerHigh}
            strokeWidth={strokeWidth}
          />
          {/* Progress arc */}
          <Circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={color}
            strokeWidth={strokeWidth}
            strokeDasharray={`${circumference}`}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            rotation={-90}
            origin={`${size / 2}, ${size / 2}`}
          />
        </Svg>
        <View style={{ position: 'absolute', alignItems: 'center' }}>
          <Text style={[
            isMain ? styles.mainScoreValue : styles.catScoreValue,
            { color: Theme.colors.onSurface },
          ]}>
            {value}
          </Text>
          {isMain && <Text style={styles.mainScoreMax}>/ {max}</Text>}
        </View>
      </View>
      {label && <Text style={styles.circleLabel}>{label}</Text>}
    </View>
  );
}

export default function ScoreScreen() {
  const overallColor =
    SECURITY_SCORE.overall >= 90
      ? Theme.colors.secure
      : SECURITY_SCORE.overall >= 70
      ? Theme.colors.attention
      : Theme.colors.critical;

  return (
    <GradientBackground>
      <SafeAreaView style={styles.container}>
        <ScreenHeader title="SECURITY SCORE" subtitle="Overall Assessment" />

        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          {/* Main Score */}
          <Animated.View entering={FadeIn.delay(200).duration(800)} style={styles.mainScoreSection}>
            <GlassCard variant="elevated" style={styles.mainCard}>
              <CircularScore
                value={SECURITY_SCORE.overall}
                size={180}
                strokeWidth={12}
                color={overallColor}
                isMain
              />
              <Text style={styles.mainLabel}>Overall Security Score</Text>
              <View style={[styles.ratingBadge, { backgroundColor: overallColor + '18' }]}>
                <Text style={[styles.ratingText, { color: overallColor }]}>
                  {SECURITY_SCORE.overall >= 90 ? 'Excellent' : SECURITY_SCORE.overall >= 70 ? 'Good' : 'Needs Attention'}
                </Text>
              </View>
            </GlassCard>
          </Animated.View>

          {/* Category Scores */}
          <Animated.View entering={FadeInUp.delay(400).duration(500)}>
            <Text style={styles.sectionTitle}>Category Breakdown</Text>
          </Animated.View>

          <View style={styles.categoriesGrid}>
            {categories.map((cat, index) => (
              <Animated.View
                key={cat.label}
                entering={FadeInUp.delay(450 + index * 80).duration(400)}
              >
                <GlassCard style={styles.categoryCard}>
                  <CircularScore
                    value={cat.value}
                    size={80}
                    strokeWidth={6}
                    color={cat.color}
                  />
                  <View style={styles.catInfo}>
                    <View style={[styles.catIconContainer, { backgroundColor: cat.color + '15' }]}>
                      <Ionicons name={cat.icon} size={16} color={cat.color} />
                    </View>
                    <Text style={styles.catLabel}>{cat.label}</Text>
                  </View>
                </GlassCard>
              </Animated.View>
            ))}
          </View>

          {/* Score Details */}
          <Animated.View entering={FadeInUp.delay(800).duration(500)}>
            <Text style={styles.sectionTitle}>Score Details</Text>
            <GlassCard style={styles.detailsCard}>
              {categories.map((cat, i) => (
                <View key={cat.label} style={[styles.detailRow, i < categories.length - 1 && styles.detailBorder]}>
                  <View style={styles.detailLeft}>
                    <View style={[styles.detailDot, { backgroundColor: cat.color }]} />
                    <Text style={styles.detailLabel}>{cat.label}</Text>
                  </View>
                  <View style={styles.detailRight}>
                    <View style={styles.detailBar}>
                      <View
                        style={[
                          styles.detailBarFill,
                          {
                            width: `${cat.value}%`,
                            backgroundColor: cat.color,
                          },
                        ]}
                      />
                    </View>
                    <Text style={styles.detailValue}>{cat.value}</Text>
                  </View>
                </View>
              ))}
            </GlassCard>
          </Animated.View>

          {/* Recommendations */}
          <Animated.View entering={FadeInUp.delay(900).duration(500)}>
            <Text style={styles.sectionTitle}>Recommendations</Text>
            <GlassCard style={styles.recommendCard}>
              <View style={styles.recommendItem}>
                <Ionicons name="arrow-up-circle-outline" size={20} color={Theme.colors.primary} />
                <View style={styles.recommendContent}>
                  <Text style={styles.recommendTitle}>Improve Incident Response</Text>
                  <Text style={styles.recommendText}>
                    Consider running bi-weekly security drills to improve response time.
                  </Text>
                </View>
              </View>
              <View style={[styles.recommendItem, { borderTopWidth: 1, borderTopColor: Theme.colors.surfaceContainerHigh, paddingTop: 14 }]}>
                <Ionicons name="arrow-up-circle-outline" size={20} color={Theme.colors.primary} />
                <View style={styles.recommendContent}>
                  <Text style={styles.recommendTitle}>Enhance Cyber Defense</Text>
                  <Text style={styles.recommendText}>
                    Update endpoint protection on 3 devices that are running outdated signatures.
                  </Text>
                </View>
              </View>
            </GlassCard>
          </Animated.View>
        </ScrollView>
      </SafeAreaView>
    </GradientBackground>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollContent: { paddingHorizontal: Theme.spacing.containerMargin, paddingBottom: 40 },

  mainScoreSection: { marginBottom: Theme.spacing.l },
  mainCard: { alignItems: 'center', padding: Theme.spacing.xl },
  mainScoreValue: { fontFamily: 'Sora_700Bold', fontSize: 42, fontWeight: '700' },
  mainScoreMax: { fontFamily: 'Sora_400Regular', fontSize: 16, color: Theme.colors.textCaption, marginTop: -4 },
  mainLabel: { fontFamily: 'Sora_400Regular', fontSize: 14, color: Theme.colors.textCaption, marginTop: Theme.spacing.m },
  ratingBadge: { paddingHorizontal: 20, paddingVertical: 8, borderRadius: Theme.borderRadius.full, marginTop: Theme.spacing.s },
  ratingText: { fontFamily: 'Sora_600SemiBold', fontSize: 14, fontWeight: '600' },

  sectionTitle: { fontFamily: 'Sora_600SemiBold', fontSize: 16, fontWeight: '600', color: Theme.colors.onSurface, marginBottom: Theme.spacing.s, marginTop: Theme.spacing.m },

  categoriesGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: Theme.spacing.s, marginBottom: Theme.spacing.m },
  categoryCard: { width: (SCREEN_WIDTH - Theme.spacing.containerMargin * 2 - Theme.spacing.s) / 2, alignItems: 'center', padding: Theme.spacing.m },
  catScoreValue: { fontFamily: 'Sora_700Bold', fontSize: 18, fontWeight: '700' },
  catInfo: { flexDirection: 'row', alignItems: 'center', marginTop: 10, gap: 6 },
  catIconContainer: { width: 24, height: 24, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  catLabel: { fontFamily: 'Sora_400Regular', fontSize: 11, color: Theme.colors.textCaption },
  circleLabel: { fontFamily: 'Sora_400Regular', fontSize: 11, color: Theme.colors.textCaption, marginTop: 8 },

  detailsCard: { padding: Theme.spacing.m, marginBottom: Theme.spacing.m },
  detailRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 14 },
  detailBorder: { borderBottomWidth: 1, borderBottomColor: Theme.colors.surfaceContainerHigh },
  detailLeft: { flexDirection: 'row', alignItems: 'center', gap: 10, flex: 1 },
  detailDot: { width: 8, height: 8, borderRadius: 4 },
  detailLabel: { fontFamily: 'Sora_400Regular', fontSize: 14, color: Theme.colors.onSurface },
  detailRight: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  detailBar: { width: 80, height: 6, borderRadius: 3, backgroundColor: Theme.colors.surfaceContainerHigh, overflow: 'hidden' },
  detailBarFill: { height: '100%', borderRadius: 3 },
  detailValue: { fontFamily: 'Sora_700Bold', fontSize: 14, fontWeight: '700', color: Theme.colors.onSurface, width: 28, textAlign: 'right' },

  recommendCard: { padding: Theme.spacing.m },
  recommendItem: { flexDirection: 'row', gap: 12, paddingBottom: 14 },
  recommendContent: { flex: 1 },
  recommendTitle: { fontFamily: 'Sora_600SemiBold', fontSize: 14, fontWeight: '600', color: Theme.colors.onSurface },
  recommendText: { fontFamily: 'Sora_400Regular', fontSize: 13, color: Theme.colors.textCaption, lineHeight: 20, marginTop: 4 },
});
