import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
  Platform,
  Animated,
} from 'react-native';
import { BlurView } from 'expo-blur';
import {
  Ionicons,
  MaterialCommunityIcons,
  Feather,
} from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Theme } from '@/src/constants/Theme';
import GradientBackground from '@/src/components/GradientBackground';
import GlassCard from '@/src/components/GlassCard';

const { width } = Dimensions.get('window');
const PADDING = 20;

// INCREASED SIZES to fit more space as requested
const RADIAL_SIZE = Math.min(width - 20, 380); 

// Scale up the individual mini cards and the center piece
const ITEM_SIZE = Math.min(68, RADIAL_SIZE * 0.22); 
const CENTER_SIZE = Math.min(150, RADIAL_SIZE * 0.42); 

const RADIUS = (RADIAL_SIZE - ITEM_SIZE) / 2;
const CENTER_X = RADIAL_SIZE / 2;
const CENTER_Y = RADIAL_SIZE / 2;

// Utility to position radial items around the circle
const getPos = (angleDeg: number) => {
  const angleRad = (angleDeg * Math.PI) / 180;
  const x = CENTER_X + RADIUS * Math.cos(angleRad) - ITEM_SIZE / 2;
  const y = CENTER_Y + RADIUS * Math.sin(angleRad) - ITEM_SIZE / 2;
  return { left: x, top: y };
};

const RadialItem = ({ angle, icon, label, dotColor, href }: any) => {
  const router = useRouter();
  const pos = getPos(angle);
  
  return (
    <TouchableOpacity 
      activeOpacity={0.8} 
      style={[styles.radialItemWrapper, pos]}
      onPress={() => router.push(href)}
    >
      <BlurView intensity={70} tint="light" style={styles.radialItem}>
        {dotColor && <View style={[styles.miniDot, { backgroundColor: dotColor }]} />}
        <View style={styles.iconContainer}>{icon}</View>
        <Text style={styles.miniLabel}>{label}</Text>
      </BlurView>
    </TouchableOpacity>
  );
};

type StatProps = {
  icon: React.ReactNode;
  value: string;
  label: string;
  sub: string;
  subColor: string;
};

const Stat = ({ icon, value, label, sub, subColor }: StatProps) => (
  <View style={styles.statItem}>
    <View style={styles.statIconWrap}>{icon}</View>
    <Text style={styles.statLabel}>{label}</Text>
    <Text style={styles.statValue}>{value}</Text>
    <Text style={[styles.statSub, { color: subColor }]}>{sub}</Text>
  </View>
);

const AnimatedBlurView = Animated.createAnimatedComponent(BlurView);

export default function GuardianDashboard() {
  const router = useRouter();
  const blinkAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(blinkAnim, {
          toValue: 0.3,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(blinkAnim, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        })
      ])
    ).start();
  }, [blinkAnim]);

  return (
    <GradientBackground>
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Header Row */}
          <View style={styles.headerRow}>
            <View style={styles.headerLeft}>
              <Text style={styles.welcomeText}>Welcome back,</Text>
              <View style={styles.nameRow}>
                <Text style={styles.nameText}>Guardian</Text>
                <View style={styles.nameBadge}>
                  <Ionicons name="shield-checkmark" size={10} color="#fff" />
                </View>
              </View>
              <View style={styles.subtitleRow}>
                <View style={styles.subtitleBar} />
                <Text style={styles.subtitleText}>
                  Your system is secure{'\n'}and protected.
                </Text>
              </View>
            </View>

            <GlassCard variant="elevated" style={styles.statusCard} borderRadius={16}>
              <BlurView intensity={60} tint="light" style={styles.statusIconWrap}>
                <Ionicons name="shield-checkmark" size={14} color="#6A7BFF" />
              </BlurView>
              <View style={{ marginLeft: 8 }}>
                <Text style={styles.statusLabel}>System Status</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Text style={styles.statusValue}>SECURE</Text>
                  <View style={styles.liveDot} />
                </View>
              </View>
            </GlassCard>
          </View>

          {/* Radial Grid UI */}
          <View style={styles.radialContainer}>
            {/* 3D Glass circular track connecting the nodes */}
            <BlurView intensity={20} tint="light" style={styles.dashedTrack} />

            {/* Center SOS Component with Blinking */}
            <TouchableOpacity 
              activeOpacity={0.8} 
              style={[styles.centerWrap]}
              onPress={() => router.push('/emergency')}
            >
              <AnimatedBlurView 
                intensity={40} 
                tint="light" 
                style={[styles.centerRingOuter, { opacity: blinkAnim }]}
              >
                <View style={styles.centerRingMid}>
                  <View style={styles.centerRingInner}>
                    <View style={styles.centerCircle}>
                      <BlurView
                        intensity={80}
                        tint="light"
                        style={styles.centerShield}
                      >
                        <Ionicons name="warning" size={28} color="#D82C4E" />
                      </BlurView>
                      <Text style={styles.sosText}>SOS</Text>
                      <Text style={styles.sosSub}>Emergency</Text>
                    </View>
                  </View>
                </View>
              </AnimatedBlurView>
            </TouchableOpacity>

            {/* Circular Nodes linked to pages */}
            <RadialItem
              href="/intelligence"
              angle={-90}
              label="Scan"
              dotColor="#5D73E6"
              icon={<MaterialCommunityIcons name="radar" size={24} color="#5D73E6" />}
            />
            <RadialItem
              href="/cameras"
              angle={-45}
              label="Cameras"
              icon={<MaterialCommunityIcons name="cctv" size={24} color="#4B5563" />}
            />
            <RadialItem
              href="/cyber"
              angle={0}
              label="Network"
              dotColor="#5D73E6"
              icon={<Ionicons name="wifi" size={24} color="#5D73E6" />}
            />
            <RadialItem
              href="/alerts"
              angle={45}
              label="Alerts"
              dotColor="#D82C4E"
              icon={<Ionicons name="notifications" size={24} color="#6042C7" />}
            />
            <RadialItem
              href="/doors"
              angle={90}
              label="Doors"
              icon={<MaterialCommunityIcons name="door" size={24} color="#5D73E6" />}
            />
            <RadialItem
              href="/threats"
              angle={135}
              label="Threats"
              dotColor="#D82C4E"
              icon={<Feather name="crosshair" size={24} color="#5D73E6" />}
            />
            <RadialItem
              href="/incidents"
              angle={180}
              label="Incidents"
              dotColor="#F97316"
              icon={
                <MaterialCommunityIcons
                  name="clipboard-alert-outline"
                  size={24}
                  color="#6042C7"
                />
              }
            />
            <RadialItem
              href="/map"
              angle={-135}
              label="Zones"
              dotColor="#5D73E6"
              icon={<Feather name="map-pin" size={24} color="#5D73E6" />}
            />
          </View>

          {/* Bottom Elements Pushed Down */}
          <View style={styles.bottomSection}>
            {/* Operational Banner */}
            <GlassCard style={styles.opBanner} variant="subtle" borderRadius={18}>
              <BlurView
                intensity={60}
                tint="light"
                style={styles.opIconWrap}
              >
                <Ionicons name="shield-checkmark" size={16} color="#22C55E" />
              </BlurView>
              <View style={{ flex: 1, marginLeft: 10 }}>
                <Text style={styles.opTitle}>All systems operational</Text>
                <Text style={styles.opSub}>Everything is running smoothly</Text>
              </View>
              <TouchableOpacity activeOpacity={0.8}>
                <BlurView
                  intensity={60}
                  tint="light"
                  style={styles.viewDetailsBtn}
                >
                  <Text style={styles.viewDetailsText}>View Details</Text>
                  <Ionicons name="chevron-forward" size={12} color="#3C4BB2" />
                </BlurView>
              </TouchableOpacity>
            </GlassCard>

            {/* Stats Row */}
            <GlassCard style={styles.statsCard} variant="subtle" borderRadius={18}>
              <Stat
                icon={<Feather name="monitor" size={16} color="#5D73E6" />}
                value="128"
                label="Protected"
                sub="Online"
                subColor="#22C55E"
              />
              <Stat
                icon={<Ionicons name="notifications" size={16} color="#F97316" />}
                value="03"
                label="Alerts"
                sub="Low Priority"
                subColor="#F97316"
              />
              <Stat
                icon={<Ionicons name="shield-checkmark" size={16} color="#6042C7" />}
                value="24"
                label="Blocked"
                sub="Today"
                subColor="#5D73E6"
              />
              <Stat
                icon={<Feather name="clock" size={16} color="#14B8A6" />}
                value="99.9%"
                label="Uptime"
                sub="This Month"
                subColor="#14B8A6"
              />
            </GlassCard>
          </View>
        </ScrollView>
      </SafeAreaView>
    </GradientBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: PADDING,
    paddingBottom: 40,
    paddingTop: Platform.OS === 'android' ? 60 : 30,
    flexGrow: 1, // Ensures ScrollView takes full height
  },
  bottomSection: {
    marginTop: 'auto', // Pushes elements to bottom
  },

  // Header
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 40,
  },
  headerLeft: {
    flex: 1,
  },
  welcomeText: {
    fontSize: 12,
    color: '#6B7A99',
    fontWeight: '500',
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
  },
  nameText: {
    fontSize: 24,
    fontWeight: '800',
    color: '#343B7A',
    letterSpacing: -0.5,
  },
  nameBadge: {
    marginLeft: 6,
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: '#6A7BFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  subtitleRow: {
    flexDirection: 'row',
    marginTop: 6,
  },
  subtitleBar: {
    width: 3,
    borderRadius: 2,
    backgroundColor: '#6A7BFF',
    marginRight: 8,
  },
  subtitleText: {
    fontSize: 10,
    color: '#6B7A99',
    lineHeight: 14,
  },

  // Status Card
  statusCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    paddingRight: 12,
  },
  statusIconWrap: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: 'rgba(106, 123, 255, 0.15)',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(106, 123, 255, 0.3)',
  },
  statusLabel: {
    fontSize: 9,
    color: '#6B7A99',
    marginBottom: 2,
  },
  statusValue: {
    fontSize: 12,
    fontWeight: '800',
    color: '#1DAF61', 
    marginRight: 6,
  },
  liveDot: {
    width: 5,
    height: 5,
    borderRadius: 2.5,
    backgroundColor: '#1DAF61',
  },

  // Radial Area
  radialContainer: {
    width: RADIAL_SIZE,
    height: RADIAL_SIZE,
    alignSelf: 'center',
    marginBottom: 40,
  },
  dashedTrack: {
    position: 'absolute',
    top: ITEM_SIZE / 2,
    left: ITEM_SIZE / 2,
    width: RADIUS * 2,
    height: RADIUS * 2,
    borderRadius: RADIUS,
    borderWidth: 1.5,
    borderColor: 'rgba(255, 255, 255, 0.5)',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    shadowColor: '#fff',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 8,
  },
  radialItemWrapper: {
    position: 'absolute',
    width: ITEM_SIZE,
    height: ITEM_SIZE,
    borderRadius: 16, // slightly rounder for card look
    shadowColor: '#DCDCE6',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.35,
    shadowRadius: 12,
    elevation: 8,
  },
  radialItem: {
    width: '100%',
    height: '100%',
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.4)',
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    paddingTop: 4, // Add padding for card look
  },
  miniDot: {
    position: 'absolute',
    top: 6,
    right: 6,
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  iconContainer: {
    marginBottom: 4,
  },
  miniLabel: {
    fontSize: 9,
    fontWeight: '700',
    color: '#1F2937',
  },

  // Center Target
  centerWrap: {
    position: 'absolute',
    top: CENTER_Y - CENTER_SIZE / 2,
    left: CENTER_X - CENTER_SIZE / 2,
    width: CENTER_SIZE,
    height: CENTER_SIZE,
    alignItems: 'center',
    justifyContent: 'center',
  },
  centerRingOuter: {
    width: '100%',
    height: '100%',
    borderRadius: CENTER_SIZE / 2,
    alignItems: 'center',
    justifyContent: 'center',
    shadowOpacity: 0.3,
    shadowColor: '#FFB3C1',
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.4)',
    backgroundColor: '#FFFFFF',
  },
  centerRingMid: {
    width: '82%',
    height: '82%',
    borderRadius: (CENTER_SIZE * 0.82) / 2,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.4)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  centerRingInner: {
    width: '78%',
    height: '78%',
    borderRadius: (CENTER_SIZE * 0.78) / 2,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#D82C4E',
    shadowOpacity: 0.2,
    shadowRadius: 15,
    elevation: 5,
  },
  centerCircle: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  centerShield: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 6,
    overflow: 'hidden',
    backgroundColor: '#FFFFFF',
    borderWidth: 2, // Dotted border for the SOS button itself
    borderStyle: 'dotted',
    borderColor: 'rgba(216, 44, 78, 0.5)',
  },
  sosText: {
    fontSize: 18,
    fontWeight: '800',
    color: '#D82C4E',
    letterSpacing: 2,
  },
  sosSub: {
    fontSize: 9,
    fontWeight: '700',
    color: '#FF6B6B',
    marginTop: 2,
  },

  // Operational Banner
  opBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    marginBottom: 16,
  },
  opIconWrap: {
    width: 34,
    height: 34,
    borderRadius: 17,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    backgroundColor: 'rgba(34, 197, 94, 0.15)',
    borderWidth: 1,
    borderColor: 'rgba(34, 197, 94, 0.3)',
  },
  opTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: '#111827',
  },
  opSub: {
    fontSize: 10,
    color: '#6B7A99',
    marginTop: 2,
  },
  viewDetailsBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    paddingVertical: 5,
    paddingHorizontal: 10,
    overflow: 'hidden',
    backgroundColor: 'rgba(60, 75, 178, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(60, 75, 178, 0.2)',
  },

  // Stats Card
  statsCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 14,
    paddingHorizontal: 8,
  },
  statItem: {
    alignItems: 'center',
    width: '25%',
  },
  statIconWrap: {
    marginBottom: 6,
  },
  statLabel: {
    fontSize: 8,
    color: '#6B7A99',
    textAlign: 'center',
    marginBottom: 4,
    height: 20, 
  },
  statValue: {
    fontSize: 14,
    fontWeight: '800',
    color: '#111827',
  },
  statSub: {
    fontSize: 8,
    fontWeight: '700',
    marginTop: 2,
  },
});
