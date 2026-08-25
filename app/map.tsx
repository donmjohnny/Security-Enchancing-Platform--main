import React, { useState } from 'react';
import { StyleSheet, View, Text, ScrollView, SafeAreaView, Dimensions, TouchableOpacity } from 'react-native';
import Animated, { FadeIn, FadeInUp } from 'react-native-reanimated';
import Svg, { Rect, Line, Circle, Text as SvgText } from 'react-native-svg';
import { Ionicons } from '@expo/vector-icons';
import { Theme } from '@/src/constants/Theme';
import GradientBackground from '@/src/components/GradientBackground';
import GlassCard from '@/src/components/GlassCard';
import ScreenHeader from '@/src/components/ScreenHeader';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const MAP_W = SCREEN_WIDTH - Theme.spacing.containerMargin * 2;
const MAP_H = 420;

interface MapItem {
  id: string;
  type: 'camera' | 'door' | 'sensor' | 'alert';
  x: number;
  y: number;
  label: string;
  status: 'normal' | 'active' | 'alert';
}

const mapItems: MapItem[] = [
  // Cameras
  { id: 'c1', type: 'camera', x: 0.12, y: 0.18, label: 'CAM 01', status: 'active' },
  { id: 'c2', type: 'camera', x: 0.88, y: 0.18, label: 'CAM 02', status: 'normal' },
  { id: 'c3', type: 'camera', x: 0.50, y: 0.42, label: 'CAM 03', status: 'normal' },
  { id: 'c4', type: 'camera', x: 0.88, y: 0.72, label: 'CAM 04', status: 'active' },
  // Doors
  { id: 'd1', type: 'door', x: 0.50, y: 0.10, label: 'Main Entrance', status: 'normal' },
  { id: 'd2', type: 'door', x: 0.20, y: 0.52, label: 'Server Room', status: 'normal' },
  { id: 'd3', type: 'door', x: 0.85, y: 0.45, label: 'Exit A', status: 'alert' },
  { id: 'd4', type: 'door', x: 0.50, y: 0.90, label: 'Rear Exit', status: 'normal' },
  // Sensors
  { id: 's1', type: 'sensor', x: 0.35, y: 0.30, label: 'Motion S1', status: 'normal' },
  { id: 's2', type: 'sensor', x: 0.65, y: 0.60, label: 'Motion S2', status: 'normal' },
  { id: 's3', type: 'sensor', x: 0.30, y: 0.75, label: 'Smoke S1', status: 'normal' },
  // Alerts
  { id: 'a1', type: 'alert', x: 0.78, y: 0.42, label: 'Alert Zone', status: 'alert' },
];

const typeConfig: Record<string, { icon: keyof typeof Ionicons.glyphMap; color: string }> = {
  camera: { icon: 'videocam', color: Theme.colors.secondary },
  door: { icon: 'log-in', color: Theme.colors.primary },
  sensor: { icon: 'radio', color: Theme.colors.tertiary },
  alert: { icon: 'alert-circle', color: Theme.colors.critical },
};

// Building rooms for the floor plan
const rooms = [
  // Main lobby
  { x: 0.08, y: 0.05, w: 0.84, h: 0.22, label: 'Main Lobby', fill: 'rgba(160,196,255,0.08)' },
  // Left wing
  { x: 0.08, y: 0.30, w: 0.38, h: 0.30, label: 'Server Room', fill: 'rgba(149,72,53,0.06)' },
  // Right wing
  { x: 0.54, y: 0.30, w: 0.38, h: 0.30, label: 'Office Area', fill: 'rgba(160,196,255,0.06)' },
  // Conference
  { x: 0.08, y: 0.63, w: 0.38, h: 0.25, label: 'Conference Hall', fill: 'rgba(127,79,107,0.06)' },
  // Corridor
  { x: 0.54, y: 0.63, w: 0.38, h: 0.25, label: 'Storage / Utility', fill: 'rgba(160,196,255,0.05)' },
];

export default function MapScreen() {
  const [selectedItem, setSelectedItem] = useState<MapItem | null>(null);
  const [activeFilter, setActiveFilter] = useState<string | null>(null);

  const filteredItems = activeFilter
    ? mapItems.filter(i => i.type === activeFilter)
    : mapItems;

  return (
    <GradientBackground>
      <SafeAreaView style={styles.container}>
        <ScreenHeader title="SECURITY MAP" subtitle="Building Overview" />

        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          {/* Legend / Filters */}
          <Animated.View entering={FadeIn.delay(100).duration(400)}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterScroll}>
              <View style={styles.filterRow}>
                <TouchableOpacity
                  onPress={() => setActiveFilter(null)}
                  style={[styles.filterChip, !activeFilter && styles.filterChipActive]}
                  activeOpacity={0.8}
                >
                  <Text style={[styles.filterChipText, !activeFilter && styles.filterChipTextActive]}>All</Text>
                </TouchableOpacity>
                {Object.entries(typeConfig).map(([key, conf]) => (
                  <TouchableOpacity
                    key={key}
                    onPress={() => setActiveFilter(activeFilter === key ? null : key)}
                    style={[styles.filterChip, activeFilter === key && styles.filterChipActive]}
                    activeOpacity={0.8}
                  >
                    <Ionicons
                      name={conf.icon}
                      size={14}
                      color={activeFilter === key ? Theme.colors.white : conf.color}
                    />
                    <Text style={[styles.filterChipText, activeFilter === key && styles.filterChipTextActive]}>
                      {key.charAt(0).toUpperCase() + key.slice(1)}s
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </ScrollView>
          </Animated.View>

          {/* Map */}
          <Animated.View entering={FadeIn.delay(300).duration(700)}>
            <GlassCard variant="elevated" style={styles.mapCard}>
              <Svg width={MAP_W - Theme.spacing.l * 2} height={MAP_H} viewBox={`0 0 ${MAP_W - Theme.spacing.l * 2} ${MAP_H}`}>
                {/* Building outline */}
                <Rect
                  x={2} y={2}
                  width={MAP_W - Theme.spacing.l * 2 - 4} height={MAP_H - 4}
                  rx={16} ry={16}
                  fill="none"
                  stroke={Theme.colors.outlineVariant}
                  strokeWidth={1.5}
                  opacity={0.5}
                />

                {/* Rooms */}
                {rooms.map((room, i) => {
                  const rw = MAP_W - Theme.spacing.l * 2;
                  return (
                    <React.Fragment key={i}>
                      <Rect
                        x={room.x * rw} y={room.y * MAP_H}
                        width={room.w * rw} height={room.h * MAP_H}
                        rx={8} ry={8}
                        fill={room.fill}
                        stroke={Theme.colors.outlineVariant}
                        strokeWidth={0.8}
                        opacity={0.7}
                      />
                      <SvgText
                        x={(room.x + room.w / 2) * rw}
                        y={(room.y + room.h / 2) * MAP_H + 4}
                        fontSize={10}
                        fill={Theme.colors.textCaption}
                        textAnchor="middle"
                        opacity={0.6}
                      >
                        {room.label}
                      </SvgText>
                    </React.Fragment>
                  );
                })}

                {/* Grid lines */}
                {[0.25, 0.5, 0.75].map(pos => {
                  const rw = MAP_W - Theme.spacing.l * 2;
                  return (
                    <React.Fragment key={`grid-${pos}`}>
                      <Line x1={pos * rw} y1={8} x2={pos * rw} y2={MAP_H - 8} stroke={Theme.colors.outlineVariant} strokeWidth={0.3} opacity={0.3} strokeDasharray="4,8" />
                      <Line x1={8} y1={pos * MAP_H} x2={rw - 8} y2={pos * MAP_H} stroke={Theme.colors.outlineVariant} strokeWidth={0.3} opacity={0.3} strokeDasharray="4,8" />
                    </React.Fragment>
                  );
                })}

                {/* Map Items */}
                {filteredItems.map(item => {
                  const rw = MAP_W - Theme.spacing.l * 2;
                  const px = item.x * rw;
                  const py = item.y * MAP_H;
                  const conf = typeConfig[item.type];
                  const isAlert = item.status === 'alert';
                  const isActive = item.status === 'active';

                  return (
                    <React.Fragment key={item.id}>
                      {/* Glow ring for alerts */}
                      {isAlert && (
                        <Circle cx={px} cy={py} r={18} fill={Theme.colors.critical + '15'} stroke={Theme.colors.critical} strokeWidth={0.8} opacity={0.6} />
                      )}
                      {isActive && (
                        <Circle cx={px} cy={py} r={16} fill={conf.color + '10'} stroke={conf.color} strokeWidth={0.5} opacity={0.4} />
                      )}
                      {/* Main dot */}
                      <Circle
                        cx={px} cy={py} r={10}
                        fill={isAlert ? Theme.colors.criticalLight : Theme.colors.glassWhite}
                        stroke={isAlert ? Theme.colors.critical : conf.color}
                        strokeWidth={1.5}
                        onPress={() => setSelectedItem(item)}
                      />
                      {/* Inner icon dot */}
                      <Circle
                        cx={px} cy={py} r={4}
                        fill={isAlert ? Theme.colors.critical : conf.color}
                      />
                    </React.Fragment>
                  );
                })}
              </Svg>
            </GlassCard>
          </Animated.View>

          {/* Selected Item Detail */}
          {selectedItem && (
            <Animated.View entering={FadeInUp.duration(300)}>
              <GlassCard variant="elevated" style={styles.detailCard}>
                <View style={styles.detailHeader}>
                  <View style={[styles.detailIcon, { backgroundColor: typeConfig[selectedItem.type].color + '15' }]}>
                    <Ionicons name={typeConfig[selectedItem.type].icon} size={20} color={typeConfig[selectedItem.type].color} />
                  </View>
                  <View style={styles.detailInfo}>
                    <Text style={styles.detailLabel}>{selectedItem.label}</Text>
                    <Text style={styles.detailType}>
                      {selectedItem.type.charAt(0).toUpperCase() + selectedItem.type.slice(1)}
                    </Text>
                  </View>
                  <View style={[styles.detailStatus, {
                    backgroundColor: selectedItem.status === 'alert' ? Theme.colors.criticalLight
                      : selectedItem.status === 'active' ? Theme.colors.attentionLight
                      : Theme.colors.secureLight,
                  }]}>
                    <Text style={[styles.detailStatusText, {
                      color: selectedItem.status === 'alert' ? Theme.colors.critical
                        : selectedItem.status === 'active' ? Theme.colors.attention
                        : Theme.colors.secure,
                    }]}>
                      {selectedItem.status.charAt(0).toUpperCase() + selectedItem.status.slice(1)}
                    </Text>
                  </View>
                </View>
                <TouchableOpacity onPress={() => setSelectedItem(null)} style={styles.detailDismiss}>
                  <Text style={styles.detailDismissText}>Dismiss</Text>
                </TouchableOpacity>
              </GlassCard>
            </Animated.View>
          )}

          {/* Stats Summary */}
          <Animated.View entering={FadeInUp.delay(500).duration(500)} style={styles.statsRow}>
            <GlassCard style={styles.statCard}>
              <Ionicons name="videocam-outline" size={18} color={Theme.colors.secondary} />
              <Text style={styles.statNumber}>{mapItems.filter(i => i.type === 'camera').length}</Text>
              <Text style={styles.statLabel}>Cameras</Text>
            </GlassCard>
            <GlassCard style={styles.statCard}>
              <Ionicons name="log-in-outline" size={18} color={Theme.colors.primary} />
              <Text style={styles.statNumber}>{mapItems.filter(i => i.type === 'door').length}</Text>
              <Text style={styles.statLabel}>Doors</Text>
            </GlassCard>
            <GlassCard style={styles.statCard}>
              <Ionicons name="radio-outline" size={18} color={Theme.colors.tertiary} />
              <Text style={styles.statNumber}>{mapItems.filter(i => i.type === 'sensor').length}</Text>
              <Text style={styles.statLabel}>Sensors</Text>
            </GlassCard>
            <GlassCard style={styles.statCard}>
              <Ionicons name="alert-circle-outline" size={18} color={Theme.colors.critical} />
              <Text style={styles.statNumber}>{mapItems.filter(i => i.status === 'alert').length}</Text>
              <Text style={styles.statLabel}>Alerts</Text>
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

  filterScroll: { marginBottom: Theme.spacing.m },
  filterRow: { flexDirection: 'row', gap: Theme.spacing.s },
  filterChip: {
    flexDirection: 'row', alignItems: 'center', gap: 6,
    paddingHorizontal: 14, paddingVertical: 8,
    borderRadius: Theme.borderRadius.full,
    backgroundColor: Theme.colors.glassWhite,
    borderWidth: 1, borderColor: Theme.colors.glassBorder,
  },
  filterChipActive: { backgroundColor: Theme.colors.primary, borderColor: Theme.colors.primary },
  filterChipText: { fontFamily: 'Sora_500Medium', fontSize: 12, fontWeight: '500', color: Theme.colors.onSurface },
  filterChipTextActive: { color: Theme.colors.white },

  mapCard: { padding: Theme.spacing.l, marginBottom: Theme.spacing.m },

  detailCard: { padding: Theme.spacing.m, marginBottom: Theme.spacing.m },
  detailHeader: { flexDirection: 'row', alignItems: 'center' },
  detailIcon: { width: 40, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center', marginRight: 12 },
  detailInfo: { flex: 1 },
  detailLabel: { fontFamily: 'Sora_600SemiBold', fontSize: 15, fontWeight: '600', color: Theme.colors.onSurface },
  detailType: { fontFamily: 'Sora_400Regular', fontSize: 12, color: Theme.colors.textCaption, marginTop: 2 },
  detailStatus: { paddingHorizontal: 10, paddingVertical: 5, borderRadius: Theme.borderRadius.full },
  detailStatusText: { fontFamily: 'Sora_600SemiBold', fontSize: 11, fontWeight: '600' },
  detailDismiss: { alignItems: 'center', marginTop: 10 },
  detailDismissText: { fontFamily: 'Sora_500Medium', fontSize: 12, color: Theme.colors.textCaption },

  statsRow: { flexDirection: 'row', gap: Theme.spacing.s },
  statCard: { flex: 1, alignItems: 'center', padding: Theme.spacing.m, gap: 4 },
  statNumber: { fontFamily: 'Sora_700Bold', fontSize: 18, fontWeight: '700', color: Theme.colors.onSurface },
  statLabel: { fontFamily: 'Sora_400Regular', fontSize: 10, color: Theme.colors.textCaption },
});
