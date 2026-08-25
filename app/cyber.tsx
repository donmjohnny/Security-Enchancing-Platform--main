import React from 'react';
import { StyleSheet, View, Text, ScrollView, SafeAreaView, Dimensions } from 'react-native';
import Animated, { FadeIn, FadeInUp } from 'react-native-reanimated';
import Svg, { Circle, Line, Text as SvgText } from 'react-native-svg';
import { Ionicons } from '@expo/vector-icons';
import { Theme } from '@/src/constants/Theme';
import { NETWORK_DEVICES } from '@/src/constants/mockData';
import GradientBackground from '@/src/components/GradientBackground';
import GlassCard from '@/src/components/GlassCard';
import ScreenHeader from '@/src/components/ScreenHeader';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const typeIcons: Record<string, keyof typeof Ionicons.glyphMap> = {
  router: 'git-network-outline',
  firewall: 'shield-outline',
  switch: 'swap-horizontal-outline',
  server: 'server-outline',
  endpoint: 'desktop-outline',
};

const statusColors: Record<string, string> = {
  online: Theme.colors.secure,
  offline: Theme.colors.critical,
  warning: Theme.colors.attention,
};

export default function CyberScreen() {
  const onlineCount = NETWORK_DEVICES.filter(d => d.status === 'online').length;
  const warningCount = NETWORK_DEVICES.filter(d => d.status === 'warning').length;

  return (
    <GradientBackground>
      <SafeAreaView style={styles.container}>
        <ScreenHeader title="NETWORK SECURITY" subtitle="Cyber Defense" />

        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          {/* Network Status */}
          <Animated.View entering={FadeIn.delay(100).duration(500)} style={styles.statusRow}>
            <GlassCard variant="elevated" style={styles.statusMain}>
              <View style={styles.shieldContainer}>
                <Ionicons name="shield-checkmark" size={32} color={Theme.colors.secure} />
              </View>
              <Text style={styles.statusLabel}>Network Status</Text>
              <Text style={[styles.statusValue, { color: Theme.colors.secure }]}>SECURE</Text>
            </GlassCard>
          </Animated.View>

          {/* Metrics */}
          <Animated.View entering={FadeInUp.delay(200).duration(500)} style={styles.metricsRow}>
            <GlassCard style={styles.metricCard}>
              <Text style={styles.metricNumber}>{NETWORK_DEVICES.length}</Text>
              <Text style={styles.metricLabel}>Devices</Text>
            </GlassCard>
            <GlassCard style={styles.metricCard}>
              <Text style={[styles.metricNumber, { color: Theme.colors.secure }]}>{onlineCount}</Text>
              <Text style={styles.metricLabel}>Online</Text>
            </GlassCard>
            <GlassCard style={styles.metricCard}>
              <Text style={[styles.metricNumber, { color: Theme.colors.attention }]}>{warningCount}</Text>
              <Text style={styles.metricLabel}>Anomalies</Text>
            </GlassCard>
            <GlassCard style={styles.metricCard}>
              <Text style={[styles.metricNumber, { color: Theme.colors.secure }]}>0</Text>
              <Text style={styles.metricLabel}>Threats</Text>
            </GlassCard>
          </Animated.View>

          {/* Network Topology */}
          <Animated.View entering={FadeInUp.delay(300).duration(500)}>
            <Text style={styles.sectionTitle}>Network Topology</Text>
            <GlassCard variant="elevated" style={styles.topoCard}>
              <NetworkTopology />
            </GlassCard>
          </Animated.View>

          {/* Device List */}
          <Animated.View entering={FadeInUp.delay(400).duration(500)}>
            <Text style={styles.sectionTitle}>Network Devices</Text>
            {NETWORK_DEVICES.map((device, index) => (
              <GlassCard key={device.id} style={styles.deviceCard}>
                <View style={styles.deviceLeft}>
                  <View style={[styles.deviceIcon, { backgroundColor: statusColors[device.status] + '15' }]}>
                    <Ionicons name={typeIcons[device.type] || 'help-outline'} size={20} color={statusColors[device.status]} />
                  </View>
                  <View style={styles.deviceInfo}>
                    <Text style={styles.deviceName}>{device.name}</Text>
                    <Text style={styles.deviceIp}>{device.ip}</Text>
                  </View>
                </View>
                <View style={[styles.deviceStatus, { backgroundColor: statusColors[device.status] + '15' }]}>
                  <View style={[styles.deviceDot, { backgroundColor: statusColors[device.status] }]} />
                  <Text style={[styles.deviceStatusText, { color: statusColors[device.status] }]}>
                    {device.status.charAt(0).toUpperCase() + device.status.slice(1)}
                  </Text>
                </View>
              </GlassCard>
            ))}
          </Animated.View>
        </ScrollView>
      </SafeAreaView>
    </GradientBackground>
  );
}

function NetworkTopology() {
  const w = SCREEN_WIDTH - Theme.spacing.containerMargin * 2 - Theme.spacing.l * 2;
  const h = 180;

  const nodes = [
    { x: w * 0.1, y: h * 0.5, label: 'Internet', icon: '🌐' },
    { x: w * 0.3, y: h * 0.5, label: 'Firewall', icon: '🛡' },
    { x: w * 0.5, y: h * 0.3, label: 'Switch 1', icon: '🔀' },
    { x: w * 0.5, y: h * 0.7, label: 'Switch 2', icon: '🔀' },
    { x: w * 0.7, y: h * 0.2, label: 'Server', icon: '🖥' },
    { x: w * 0.7, y: h * 0.5, label: 'Server', icon: '🖥' },
    { x: w * 0.9, y: h * 0.5, label: 'Devices', icon: '💻' },
    { x: w * 0.7, y: h * 0.8, label: 'Endpoint', icon: '⚠️' },
  ];

  const connections = [
    [0, 1], [1, 2], [1, 3], [2, 4], [2, 5], [3, 5], [3, 7], [5, 6],
  ];

  return (
    <View style={{ width: w, height: h }}>
      <Svg width={w} height={h}>
        {connections.map(([from, to], i) => (
          <Line
            key={i}
            x1={nodes[from].x} y1={nodes[from].y}
            x2={nodes[to].x} y2={nodes[to].y}
            stroke={to === 7 ? Theme.colors.attention : Theme.colors.outlineVariant}
            strokeWidth={1.5}
            opacity={0.5}
            strokeDasharray={to === 7 ? "4,4" : undefined}
          />
        ))}
        {nodes.map((node, i) => (
          <React.Fragment key={i}>
            <Circle
              cx={node.x} cy={node.y} r={16}
              fill={i === 7 ? Theme.colors.attentionLight : Theme.colors.glassWhite}
              stroke={i === 7 ? Theme.colors.attention : Theme.colors.outlineVariant}
              strokeWidth={1}
            />
            <SvgText
              x={node.x} y={node.y + 4}
              fontSize={12} textAnchor="middle"
              fill={Theme.colors.onSurface}
            >
              {node.icon}
            </SvgText>
            <SvgText
              x={node.x} y={node.y + 30}
              fontSize={9} textAnchor="middle"
              fill={Theme.colors.textCaption}
              fontFamily="Sora_400Regular"
            >
              {node.label}
            </SvgText>
          </React.Fragment>
        ))}
      </Svg>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollContent: { paddingHorizontal: Theme.spacing.containerMargin, paddingBottom: 40 },

  statusRow: { marginBottom: Theme.spacing.l },
  statusMain: { alignItems: 'center', padding: Theme.spacing.xl },
  shieldContainer: { width: 64, height: 64, borderRadius: 32, backgroundColor: Theme.colors.secureLight, alignItems: 'center', justifyContent: 'center', marginBottom: 12 },
  statusLabel: { fontFamily: 'Sora_400Regular', fontSize: 13, color: Theme.colors.textCaption },
  statusValue: { fontFamily: 'Sora_700Bold', fontSize: 18, fontWeight: '700', letterSpacing: 3, marginTop: 4 },

  metricsRow: { flexDirection: 'row', gap: Theme.spacing.s, marginBottom: Theme.spacing.l, flexWrap: 'wrap' },
  metricCard: { flex: 1, minWidth: '22%', alignItems: 'center', padding: Theme.spacing.m },
  metricNumber: { fontFamily: 'Sora_700Bold', fontSize: 22, fontWeight: '700', color: Theme.colors.onSurface },
  metricLabel: { fontFamily: 'Sora_400Regular', fontSize: 11, color: Theme.colors.textCaption, marginTop: 4 },

  sectionTitle: { fontFamily: 'Sora_600SemiBold', fontSize: 16, fontWeight: '600', color: Theme.colors.onSurface, marginBottom: Theme.spacing.s, marginTop: Theme.spacing.m },
  topoCard: { padding: Theme.spacing.l, alignItems: 'center', marginBottom: Theme.spacing.m },

  deviceCard: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: Theme.spacing.m, marginBottom: Theme.spacing.s },
  deviceLeft: { flexDirection: 'row', alignItems: 'center', flex: 1 },
  deviceIcon: { width: 40, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center', marginRight: 12 },
  deviceInfo: {},
  deviceName: { fontFamily: 'Sora_600SemiBold', fontSize: 14, fontWeight: '600', color: Theme.colors.onSurface },
  deviceIp: { fontFamily: 'Sora_400Regular', fontSize: 12, color: Theme.colors.textCaption, marginTop: 2 },
  deviceStatus: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 10, paddingVertical: 5, borderRadius: Theme.borderRadius.full, gap: 5 },
  deviceDot: { width: 6, height: 6, borderRadius: 3 },
  deviceStatusText: { fontFamily: 'Sora_600SemiBold', fontSize: 11, fontWeight: '600' },
});
