import React, { useState } from 'react';
import { StyleSheet, View, Text, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import { Theme } from '@/src/constants/Theme';
import { ALERTS, SecurityAlert } from '@/src/constants/mockData';
import GradientBackground from '@/src/components/GradientBackground';
import GlassCard from '@/src/components/GlassCard';
import ScreenHeader from '@/src/components/ScreenHeader';
import PillButton from '@/src/components/PillButton';

type SeverityFilter = 'all' | 'critical' | 'high' | 'medium' | 'low';

const severityColors: Record<string, string> = {
  critical: Theme.colors.critical,
  high: Theme.colors.attention,
  medium: '#FFC107',
  low: Theme.colors.info,
};

const severityIcons: Record<string, keyof typeof Ionicons.glyphMap> = {
  critical: 'alert-circle',
  high: 'warning',
  medium: 'information-circle',
  low: 'information',
};

export default function AlertsScreen() {
  const [filter, setFilter] = useState<SeverityFilter>('all');

  const filteredAlerts = filter === 'all'
    ? ALERTS
    : ALERTS.filter(a => a.severity === filter);

  const counts = {
    critical: ALERTS.filter(a => a.severity === 'critical').length,
    high: ALERTS.filter(a => a.severity === 'high').length,
    medium: ALERTS.filter(a => a.severity === 'medium').length,
    low: ALERTS.filter(a => a.severity === 'low').length,
  };

  return (
    <GradientBackground>
      <SafeAreaView style={styles.container}>
        <ScreenHeader title="SECURITY ALERTS" subtitle={`${ALERTS.length} Active`} />

        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          {/* Priority visualization */}
          <Animated.View entering={FadeInDown.delay(100).duration(500)} style={styles.priorityBar}>
            <View style={[styles.prioritySegment, { flex: counts.critical, backgroundColor: severityColors.critical }]} />
            <View style={[styles.prioritySegment, { flex: counts.high, backgroundColor: severityColors.high }]} />
            <View style={[styles.prioritySegment, { flex: counts.medium, backgroundColor: severityColors.medium }]} />
            <View style={[styles.prioritySegment, { flex: counts.low, backgroundColor: severityColors.low }]} />
          </Animated.View>

          {/* Filter Tabs */}
          <Animated.View entering={FadeInDown.delay(150).duration(500)}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterScroll}>
              <View style={styles.filterRow}>
                {(['all', 'critical', 'high', 'medium', 'low'] as SeverityFilter[]).map((f) => (
                  <TouchableOpacity
                    key={f}
                    onPress={() => setFilter(f)}
                    style={[
                      styles.filterTab,
                      filter === f && styles.filterTabActive,
                    ]}
                    activeOpacity={0.8}
                  >
                    {f !== 'all' && (
                      <View style={[styles.filterDot, { backgroundColor: severityColors[f] }]} />
                    )}
                    <Text style={[styles.filterText, filter === f && styles.filterTextActive]}>
                      {f.charAt(0).toUpperCase() + f.slice(1)}
                    </Text>
                    <Text style={[styles.filterCount, filter === f && styles.filterCountActive]}>
                      {f === 'all' ? ALERTS.length : counts[f]}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </ScrollView>
          </Animated.View>

          {/* Alert Cards */}
          {filteredAlerts.map((alert, index) => (
            <Animated.View
              key={alert.id}
              entering={FadeInUp.delay(200 + index * 70).duration(400)}
            >
              <AlertCard alert={alert} />
            </Animated.View>
          ))}

          {filteredAlerts.length === 0 && (
            <View style={styles.emptyState}>
              <Ionicons name="checkmark-circle-outline" size={48} color={Theme.colors.secure} />
              <Text style={styles.emptyTitle}>All Clear</Text>
              <Text style={styles.emptyText}>No {filter} alerts at this time.</Text>
            </View>
          )}
        </ScrollView>
      </SafeAreaView>
    </GradientBackground>
  );
}

function AlertCard({ alert }: { alert: SecurityAlert }) {
  const [expanded, setExpanded] = useState(false);
  const color = severityColors[alert.severity];

  return (
    <TouchableOpacity activeOpacity={0.9} onPress={() => setExpanded(!expanded)}>
      <GlassCard
        variant={alert.severity === 'critical' ? 'elevated' : 'default'}
        style={[
          styles.alertCard,
          alert.severity === 'critical' && { borderLeftWidth: 3, borderLeftColor: color },
        ]}
      >
        <View style={styles.alertHeader}>
          <View style={[styles.alertIcon, { backgroundColor: color + '15' }]}>
            <Ionicons name={severityIcons[alert.severity]} size={22} color={color} />
          </View>
          <View style={styles.alertInfo}>
            <Text style={styles.alertTitle}>{alert.title}</Text>
            <View style={styles.alertMeta}>
              <Ionicons name="location-outline" size={12} color={Theme.colors.textCaption} />
              <Text style={styles.alertMetaText}>{alert.location}</Text>
              <Text style={styles.alertMetaDot}>·</Text>
              <Text style={styles.alertMetaText}>{alert.time}</Text>
            </View>
          </View>
          <View style={[styles.severityBadge, { backgroundColor: color + '18' }]}>
            <Text style={[styles.severityText, { color }]}>
              {alert.severity.toUpperCase()}
            </Text>
          </View>
        </View>

        {expanded && (
          <View style={styles.alertExpanded}>
            <Text style={styles.alertDescription}>{alert.description}</Text>
            <View style={styles.alertSourceRow}>
              <Ionicons name="git-branch-outline" size={14} color={Theme.colors.textCaption} />
              <Text style={styles.alertSource}>Source: {alert.source}</Text>
            </View>
            <View style={styles.alertActions}>
              <PillButton title="Investigate" onPress={() => {}} size="small" />
              <PillButton title="Acknowledge" onPress={() => {}} size="small" variant="ghost" />
            </View>
          </View>
        )}
      </GlassCard>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollContent: { paddingHorizontal: Theme.spacing.containerMargin, paddingBottom: 40 },

  priorityBar: { flexDirection: 'row', height: 6, borderRadius: 3, overflow: 'hidden', marginBottom: Theme.spacing.l, gap: 2 },
  prioritySegment: { borderRadius: 3, minWidth: 4 },

  filterScroll: { marginBottom: Theme.spacing.l },
  filterRow: { flexDirection: 'row', gap: Theme.spacing.s },
  filterTab: {
    flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 10,
    borderRadius: Theme.borderRadius.full, backgroundColor: Theme.colors.glassWhite,
    borderWidth: 1, borderColor: Theme.colors.glassBorder, gap: 6,
  },
  filterTabActive: { backgroundColor: Theme.colors.primary, borderColor: Theme.colors.primary },
  filterDot: { width: 6, height: 6, borderRadius: 3 },
  filterText: { fontFamily: 'Sora_500Medium', fontSize: 13, fontWeight: '500', color: Theme.colors.onSurface },
  filterTextActive: { color: Theme.colors.white },
  filterCount: { fontFamily: 'Sora_600SemiBold', fontSize: 12, fontWeight: '600', color: Theme.colors.textCaption },
  filterCountActive: { color: Theme.colors.white },

  alertCard: { padding: Theme.spacing.m, marginBottom: Theme.spacing.s },
  alertHeader: { flexDirection: 'row', alignItems: 'center' },
  alertIcon: { width: 44, height: 44, borderRadius: 22, alignItems: 'center', justifyContent: 'center', marginRight: 12 },
  alertInfo: { flex: 1 },
  alertTitle: { fontFamily: 'Sora_600SemiBold', fontSize: 14, fontWeight: '600', color: Theme.colors.onSurface },
  alertMeta: { flexDirection: 'row', alignItems: 'center', marginTop: 4, gap: 4 },
  alertMetaText: { fontFamily: 'Sora_400Regular', fontSize: 11, color: Theme.colors.textCaption },
  alertMetaDot: { color: Theme.colors.textCaption, fontSize: 11 },
  severityBadge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: Theme.borderRadius.full },
  severityText: { fontFamily: 'Sora_700Bold', fontSize: 9, fontWeight: '700', letterSpacing: 1 },

  alertExpanded: { marginTop: Theme.spacing.m, paddingTop: Theme.spacing.m, borderTopWidth: 1, borderTopColor: Theme.colors.surfaceContainerHigh },
  alertDescription: { fontFamily: 'Sora_400Regular', fontSize: 13, lineHeight: 20, color: Theme.colors.textBody },
  alertSourceRow: { flexDirection: 'row', alignItems: 'center', marginTop: 10, gap: 6 },
  alertSource: { fontFamily: 'Sora_400Regular', fontSize: 12, color: Theme.colors.textCaption },
  alertActions: { flexDirection: 'row', gap: Theme.spacing.m, marginTop: Theme.spacing.m },

  emptyState: { alignItems: 'center', paddingVertical: Theme.spacing.xxxl },
  emptyTitle: { fontFamily: 'Sora_600SemiBold', fontSize: 20, fontWeight: '600', color: Theme.colors.secure, marginTop: Theme.spacing.m },
  emptyText: { fontFamily: 'Sora_400Regular', fontSize: 14, color: Theme.colors.textCaption, marginTop: 6 },
});
