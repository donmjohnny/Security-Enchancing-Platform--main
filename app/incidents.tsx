import React, { useState } from 'react';
import { StyleSheet, View, Text, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import { Theme } from '@/src/constants/Theme';
import { INCIDENTS, Incident } from '@/src/constants/mockData';
import GradientBackground from '@/src/components/GradientBackground';
import GlassCard from '@/src/components/GlassCard';
import ScreenHeader from '@/src/components/ScreenHeader';
import PillButton from '@/src/components/PillButton';

const statusColors: Record<string, string> = {
  investigating: Theme.colors.attention,
  assigned: Theme.colors.secondary,
  resolved: Theme.colors.secure,
  closed: Theme.colors.textCaption,
};

export default function IncidentsScreen() {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  return (
    <GradientBackground>
      <SafeAreaView style={styles.container}>
        <ScreenHeader title="INCIDENT CENTER" subtitle={`${INCIDENTS.length} Cases`} />

        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          {/* Summary */}
          <Animated.View entering={FadeInDown.delay(100).duration(500)} style={styles.summaryRow}>
            <GlassCard style={styles.summaryCard}>
              <Ionicons name="search-outline" size={20} color={Theme.colors.attention} />
              <Text style={styles.summaryNumber}>
                {INCIDENTS.filter(i => i.status === 'investigating').length}
              </Text>
              <Text style={styles.summaryLabel}>Investigating</Text>
            </GlassCard>
            <GlassCard style={styles.summaryCard}>
              <Ionicons name="person-outline" size={20} color={Theme.colors.secondary} />
              <Text style={styles.summaryNumber}>
                {INCIDENTS.filter(i => i.status === 'assigned').length}
              </Text>
              <Text style={styles.summaryLabel}>Assigned</Text>
            </GlassCard>
            <GlassCard style={styles.summaryCard}>
              <Ionicons name="checkmark-circle-outline" size={20} color={Theme.colors.secure} />
              <Text style={styles.summaryNumber}>
                {INCIDENTS.filter(i => i.status === 'resolved').length}
              </Text>
              <Text style={styles.summaryLabel}>Resolved</Text>
            </GlassCard>
          </Animated.View>

          {/* Incident Cards */}
          {INCIDENTS.map((incident, index) => (
            <Animated.View
              key={incident.id}
              entering={FadeInUp.delay(200 + index * 80).duration(400)}
            >
              <IncidentCard
                incident={incident}
                expanded={expandedId === incident.id}
                onToggle={() => setExpandedId(expandedId === incident.id ? null : incident.id)}
              />
            </Animated.View>
          ))}
        </ScrollView>
      </SafeAreaView>
    </GradientBackground>
  );
}

function IncidentCard({
  incident, expanded, onToggle,
}: {
  incident: Incident; expanded: boolean; onToggle: () => void;
}) {
  const color = statusColors[incident.status];

  return (
    <TouchableOpacity activeOpacity={0.9} onPress={onToggle}>
      <GlassCard variant="elevated" style={[styles.incidentCard, { borderLeftWidth: 3, borderLeftColor: color }]}>
        {/* Header */}
        <View style={styles.incidentHeader}>
          <View style={styles.incidentHeaderLeft}>
            <Text style={styles.incidentNumber}>{incident.number}</Text>
            <View style={[styles.statusBadge, { backgroundColor: color + '15' }]}>
              <Text style={[styles.statusText, { color }]}>
                {incident.status.charAt(0).toUpperCase() + incident.status.slice(1)}
              </Text>
            </View>
          </View>
          <Ionicons name={expanded ? 'chevron-up' : 'chevron-down'} size={18} color={Theme.colors.textCaption} />
        </View>

        <Text style={styles.incidentTitle}>{incident.title}</Text>

        {/* Sources */}
        <View style={styles.sourcesRow}>
          {incident.sources.map((source, i) => (
            <View key={i} style={styles.sourceChip}>
              <Text style={styles.sourceText}>{source}</Text>
            </View>
          ))}
        </View>

        {/* Expanded content */}
        {expanded && (
          <View style={styles.expandedContent}>
            {/* Timeline */}
            <Text style={styles.timelineTitle}>Event Timeline</Text>
            {incident.timeline.map((entry, i) => (
              <View key={i} style={styles.timelineEntry}>
                <View style={styles.timelineLeft}>
                  <View style={styles.timelineDot} />
                  {i < incident.timeline.length - 1 && <View style={styles.timelineLine} />}
                </View>
                <View style={styles.timelineContent}>
                  <Text style={styles.timelineTime}>{entry.time}</Text>
                  <Text style={styles.timelineEvent}>{entry.event}</Text>
                </View>
              </View>
            ))}

            {/* Actions */}
            <View style={styles.actionRow}>
              <PillButton title="Investigate" onPress={() => {}} size="small" />
              <PillButton title="Assign" onPress={() => {}} size="small" variant="ghost" />
              <PillButton title="Resolve" onPress={() => {}} size="small" variant="ghost" />
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

  summaryRow: { flexDirection: 'row', gap: Theme.spacing.s, marginBottom: Theme.spacing.l },
  summaryCard: { flex: 1, alignItems: 'center', padding: Theme.spacing.m, gap: 6 },
  summaryNumber: { fontFamily: 'Sora_700Bold', fontSize: 22, fontWeight: '700', color: Theme.colors.onSurface },
  summaryLabel: { fontFamily: 'Sora_400Regular', fontSize: 10, color: Theme.colors.textCaption },

  incidentCard: { padding: Theme.spacing.m, marginBottom: Theme.spacing.m },
  incidentHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  incidentHeaderLeft: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  incidentNumber: { fontFamily: 'Sora_700Bold', fontSize: 14, fontWeight: '700', color: Theme.colors.primary },
  statusBadge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: Theme.borderRadius.full },
  statusText: { fontFamily: 'Sora_600SemiBold', fontSize: 11, fontWeight: '600' },
  incidentTitle: { fontFamily: 'Sora_600SemiBold', fontSize: 16, fontWeight: '600', color: Theme.colors.onSurface, marginBottom: 10 },

  sourcesRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 6 },
  sourceChip: { paddingHorizontal: 10, paddingVertical: 5, borderRadius: Theme.borderRadius.full, backgroundColor: Theme.colors.surfaceContainerHigh },
  sourceText: { fontFamily: 'Sora_400Regular', fontSize: 11, color: Theme.colors.onSurfaceVariant },

  expandedContent: { marginTop: Theme.spacing.m, paddingTop: Theme.spacing.m, borderTopWidth: 1, borderTopColor: Theme.colors.surfaceContainerHigh },
  timelineTitle: { fontFamily: 'Sora_600SemiBold', fontSize: 13, fontWeight: '600', color: Theme.colors.onSurface, marginBottom: Theme.spacing.s },

  timelineEntry: { flexDirection: 'row', minHeight: 44 },
  timelineLeft: { width: 20, alignItems: 'center', paddingTop: 6 },
  timelineDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: Theme.colors.primaryLight },
  timelineLine: { width: 1.5, flex: 1, backgroundColor: Theme.colors.outlineVariant, marginTop: 2 },
  timelineContent: { flex: 1, paddingLeft: 10, paddingBottom: 12 },
  timelineTime: { fontFamily: 'Sora_600SemiBold', fontSize: 12, fontWeight: '600', color: Theme.colors.primary },
  timelineEvent: { fontFamily: 'Sora_400Regular', fontSize: 13, color: Theme.colors.onSurface, marginTop: 2, lineHeight: 20 },

  actionRow: { flexDirection: 'row', gap: Theme.spacing.s, marginTop: Theme.spacing.m },
});
