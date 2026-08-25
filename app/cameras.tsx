import React, { useState } from 'react';
import {
  StyleSheet, View, Text, ScrollView, SafeAreaView,
  TouchableOpacity, Image, Modal, Dimensions,
} from 'react-native';
import Animated, { FadeIn, FadeInUp } from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import { Theme } from '@/src/constants/Theme';
import { CAMERAS, Camera } from '@/src/constants/mockData';
import GradientBackground from '@/src/components/GradientBackground';
import GlassCard from '@/src/components/GlassCard';
import ScreenHeader from '@/src/components/ScreenHeader';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const CARD_WIDTH = (SCREEN_WIDTH - Theme.spacing.containerMargin * 2 - Theme.spacing.s) / 2;

export default function CamerasScreen() {
  const [selectedCamera, setSelectedCamera] = useState<Camera | null>(null);
  const liveCount = CAMERAS.filter(c => c.status === 'live').length;
  const eventCount = CAMERAS.filter(c => c.event && c.event !== 'Area Clear').length;

  return (
    <GradientBackground>
      <SafeAreaView style={styles.container}>
        <ScreenHeader title="SURVEILLANCE" subtitle={`${CAMERAS.length} Cameras`} />

        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          {/* Summary */}
          <Animated.View entering={FadeIn.delay(100).duration(500)} style={styles.summaryRow}>
            <GlassCard style={styles.summaryCard}>
              <View style={[styles.dot, { backgroundColor: Theme.colors.secure }]} />
              <Text style={styles.summaryNumber}>{liveCount}</Text>
              <Text style={styles.summaryLabel}>Live</Text>
            </GlassCard>
            <GlassCard style={styles.summaryCard}>
              <View style={[styles.dot, { backgroundColor: Theme.colors.attention }]} />
              <Text style={styles.summaryNumber}>{eventCount}</Text>
              <Text style={styles.summaryLabel}>Events</Text>
            </GlassCard>
            <GlassCard style={styles.summaryCard}>
              <View style={[styles.dot, { backgroundColor: Theme.colors.critical }]} />
              <Text style={styles.summaryNumber}>{CAMERAS.filter(c => c.status === 'offline').length}</Text>
              <Text style={styles.summaryLabel}>Offline</Text>
            </GlassCard>
          </Animated.View>

          {/* Camera Grid */}
          <View style={styles.cameraGrid}>
            {CAMERAS.map((camera, index) => (
              <Animated.View
                key={camera.id}
                entering={FadeInUp.delay(150 + index * 60).duration(400)}
              >
                <TouchableOpacity
                  activeOpacity={0.85}
                  onPress={() => setSelectedCamera(camera)}
                >
                  <GlassCard style={styles.cameraCard}>
                    {/* Camera Preview */}
                    <View style={styles.previewContainer}>
                      <Image source={{ uri: camera.imageUrl }} style={styles.preview} />
                      <View style={styles.previewOverlay} />

                      {/* LIVE Badge */}
                      {camera.status === 'live' && (
                        <View style={styles.liveBadge}>
                          <View style={styles.liveRedDot} />
                          <Text style={styles.liveText}>LIVE</Text>
                        </View>
                      )}

                      {camera.status === 'offline' && (
                        <View style={styles.offlineBadge}>
                          <Text style={styles.offlineText}>OFFLINE</Text>
                        </View>
                      )}

                      {camera.status === 'recording' && (
                        <View style={styles.recBadge}>
                          <View style={styles.recDot} />
                          <Text style={styles.recText}>REC</Text>
                        </View>
                      )}

                      {/* Event indicator */}
                      {camera.event && camera.event !== 'Area Clear' && (
                        <View style={styles.eventOverlay}>
                          <Ionicons name="scan-outline" size={14} color={Theme.colors.white} />
                          <Text style={styles.eventText}>{camera.event}</Text>
                        </View>
                      )}
                    </View>

                    {/* Camera Info */}
                    <View style={styles.cameraInfo}>
                      <Text style={styles.cameraName}>{camera.name}</Text>
                      <Text style={styles.cameraLocation}>{camera.location}</Text>
                    </View>

                    {/* Health */}
                    {camera.status !== 'offline' && (
                      <View style={styles.healthBar}>
                        <View
                          style={[
                            styles.healthFill,
                            {
                              width: `${camera.health}%`,
                              backgroundColor: camera.health > 90 ? Theme.colors.secure : Theme.colors.attention,
                            },
                          ]}
                        />
                      </View>
                    )}
                  </GlassCard>
                </TouchableOpacity>
              </Animated.View>
            ))}
          </View>
        </ScrollView>

        {/* Camera Detail Modal */}
        <Modal
          visible={selectedCamera !== null}
          animationType="slide"
          presentationStyle="pageSheet"
          onRequestClose={() => setSelectedCamera(null)}
        >
          {selectedCamera && (
            <CameraDetail camera={selectedCamera} onClose={() => setSelectedCamera(null)} />
          )}
        </Modal>
      </SafeAreaView>
    </GradientBackground>
  );
}

function CameraDetail({ camera, onClose }: { camera: Camera; onClose: () => void }) {
  return (
    <GradientBackground>
      <SafeAreaView style={styles.detailContainer}>
        <View style={styles.detailHeader}>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Ionicons name="close" size={24} color={Theme.colors.onSurface} />
          </TouchableOpacity>
          <Text style={styles.detailTitle}>{camera.name} — {camera.location}</Text>
          <View style={{ width: 36 }} />
        </View>

        <ScrollView contentContainerStyle={styles.detailContent}>
          {/* Large preview */}
          <View style={styles.largePreview}>
            <Image source={{ uri: camera.imageUrl }} style={styles.largeImage} />
            <View style={styles.largeOverlay} />
            {camera.status === 'live' && (
              <View style={[styles.liveBadge, { top: 16, left: 16 }]}>
                <View style={styles.liveRedDot} />
                <Text style={styles.liveText}>LIVE</Text>
              </View>
            )}
            <View style={styles.cameraControls}>
              <TouchableOpacity style={styles.controlBtn}>
                <Ionicons name="expand-outline" size={20} color={Theme.colors.white} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.controlBtn}>
                <Ionicons name="recording-outline" size={20} color={Theme.colors.white} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.controlBtn}>
                <Ionicons name="camera-outline" size={20} color={Theme.colors.white} />
              </TouchableOpacity>
            </View>
          </View>

          {/* Detection Status */}
          <View style={styles.detectionRow}>
            <GlassCard style={styles.detectionCard}>
              <Ionicons name="body-outline" size={20} color={camera.hasPerson ? Theme.colors.attention : Theme.colors.secure} />
              <Text style={styles.detectionLabel}>Person</Text>
              <Text style={[styles.detectionStatus, { color: camera.hasPerson ? Theme.colors.attention : Theme.colors.secure }]}>
                {camera.hasPerson ? 'Detected' : 'Clear'}
              </Text>
            </GlassCard>
            <GlassCard style={styles.detectionCard}>
              <Ionicons name="walk-outline" size={20} color={camera.hasMotion ? Theme.colors.attention : Theme.colors.secure} />
              <Text style={styles.detectionLabel}>Motion</Text>
              <Text style={[styles.detectionStatus, { color: camera.hasMotion ? Theme.colors.attention : Theme.colors.secure }]}>
                {camera.hasMotion ? 'Active' : 'None'}
              </Text>
            </GlassCard>
            <GlassCard style={styles.detectionCard}>
              <Ionicons name="pulse-outline" size={20} color={camera.health > 90 ? Theme.colors.secure : Theme.colors.attention} />
              <Text style={styles.detectionLabel}>Health</Text>
              <Text style={[styles.detectionStatus, { color: camera.health > 90 ? Theme.colors.secure : Theme.colors.attention }]}>
                {camera.health}%
              </Text>
            </GlassCard>
          </View>

          {/* Event Log */}
          <Text style={styles.sectionTitle}>Recent Events</Text>
          <GlassCard style={styles.eventLog}>
            {[
              { time: '12:40 PM', event: camera.event || 'No events', icon: 'scan-outline' as const },
              { time: '12:35 PM', event: 'Area Clear', icon: 'checkmark-circle-outline' as const },
              { time: '12:20 PM', event: 'Motion Detected', icon: 'walk-outline' as const },
            ].map((entry, i) => (
              <View key={i} style={[styles.eventLogRow, i < 2 && styles.eventLogBorder]}>
                <Ionicons name={entry.icon} size={16} color={Theme.colors.primary} />
                <Text style={styles.eventLogText}>{entry.event}</Text>
                <Text style={styles.eventLogTime}>{entry.time}</Text>
              </View>
            ))}
          </GlassCard>
        </ScrollView>
      </SafeAreaView>
    </GradientBackground>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollContent: { paddingHorizontal: Theme.spacing.containerMargin, paddingBottom: 40 },

  summaryRow: { flexDirection: 'row', gap: Theme.spacing.s, marginBottom: Theme.spacing.l },
  summaryCard: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', padding: Theme.spacing.m, gap: 8 },
  dot: { width: 8, height: 8, borderRadius: 4 },
  summaryNumber: { fontFamily: 'Sora_700Bold', fontSize: 22, fontWeight: '700', color: Theme.colors.onSurface },
  summaryLabel: { fontFamily: 'Sora_400Regular', fontSize: 12, color: Theme.colors.textCaption },

  cameraGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: Theme.spacing.s },
  cameraCard: { width: CARD_WIDTH, padding: 0, overflow: 'hidden' },

  previewContainer: { width: '100%', height: 110, borderTopLeftRadius: Theme.borderRadius.xl, borderTopRightRadius: Theme.borderRadius.xl, overflow: 'hidden' },
  preview: { width: '100%', height: '100%' },
  previewOverlay: { ...StyleSheet.absoluteFill, backgroundColor: 'rgba(0,0,0,0.15)' },

  liveBadge: { position: 'absolute', top: 8, left: 8, flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)', paddingHorizontal: 8, paddingVertical: 3, borderRadius: Theme.borderRadius.full },
  liveRedDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: '#FF4444', marginRight: 4 },
  liveText: { fontFamily: 'Sora_700Bold', fontSize: 9, fontWeight: '700', color: Theme.colors.white, letterSpacing: 1 },

  offlineBadge: { position: 'absolute', top: 8, left: 8, backgroundColor: 'rgba(0,0,0,0.6)', paddingHorizontal: 8, paddingVertical: 3, borderRadius: Theme.borderRadius.full },
  offlineText: { fontFamily: 'Sora_600SemiBold', fontSize: 9, fontWeight: '600', color: Theme.colors.criticalLight, letterSpacing: 1 },

  recBadge: { position: 'absolute', top: 8, left: 8, flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)', paddingHorizontal: 8, paddingVertical: 3, borderRadius: Theme.borderRadius.full },
  recDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: Theme.colors.critical, marginRight: 4 },
  recText: { fontFamily: 'Sora_700Bold', fontSize: 9, fontWeight: '700', color: Theme.colors.white, letterSpacing: 1 },

  eventOverlay: { position: 'absolute', bottom: 6, left: 6, right: 6, flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(255,152,0,0.8)', paddingHorizontal: 8, paddingVertical: 4, borderRadius: Theme.borderRadius.s, gap: 4 },
  eventText: { fontFamily: 'Sora_500Medium', fontSize: 9, fontWeight: '500', color: Theme.colors.white },

  cameraInfo: { padding: 12 },
  cameraName: { fontFamily: 'Sora_600SemiBold', fontSize: 13, fontWeight: '600', color: Theme.colors.onSurface },
  cameraLocation: { fontFamily: 'Sora_400Regular', fontSize: 11, color: Theme.colors.textCaption, marginTop: 2 },

  healthBar: { height: 3, backgroundColor: Theme.colors.surfaceContainerHigh, borderBottomLeftRadius: Theme.borderRadius.xl, borderBottomRightRadius: Theme.borderRadius.xl, overflow: 'hidden' },
  healthFill: { height: '100%', borderRadius: 2 },

  // Detail
  detailContainer: { flex: 1 },
  detailHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: Theme.spacing.containerMargin, paddingVertical: Theme.spacing.m },
  closeButton: { width: 36, height: 36, borderRadius: 18, backgroundColor: Theme.colors.surfaceContainerHigh, alignItems: 'center', justifyContent: 'center' },
  detailTitle: { fontFamily: 'Sora_600SemiBold', fontSize: 16, fontWeight: '600', color: Theme.colors.onSurface, flex: 1, textAlign: 'center' },
  detailContent: { paddingHorizontal: Theme.spacing.containerMargin, paddingBottom: 40 },

  largePreview: { width: '100%', height: 250, borderRadius: Theme.borderRadius.xl, overflow: 'hidden', marginBottom: Theme.spacing.l },
  largeImage: { width: '100%', height: '100%' },
  largeOverlay: { ...StyleSheet.absoluteFill, backgroundColor: 'rgba(0,0,0,0.1)' },
  cameraControls: { position: 'absolute', bottom: 12, right: 12, flexDirection: 'row', gap: 8 },
  controlBtn: { width: 36, height: 36, borderRadius: 18, backgroundColor: 'rgba(0,0,0,0.4)', alignItems: 'center', justifyContent: 'center' },

  detectionRow: { flexDirection: 'row', gap: Theme.spacing.s, marginBottom: Theme.spacing.l },
  detectionCard: { flex: 1, alignItems: 'center', padding: Theme.spacing.m },
  detectionLabel: { fontFamily: 'Sora_400Regular', fontSize: 11, color: Theme.colors.textCaption, marginTop: 6 },
  detectionStatus: { fontFamily: 'Sora_600SemiBold', fontSize: 13, fontWeight: '600', marginTop: 2 },

  sectionTitle: { fontFamily: 'Sora_600SemiBold', fontSize: 16, fontWeight: '600', color: Theme.colors.onSurface, marginBottom: Theme.spacing.s },
  eventLog: { padding: Theme.spacing.m },
  eventLogRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: 10, gap: 10 },
  eventLogBorder: { borderBottomWidth: 1, borderBottomColor: Theme.colors.surfaceContainerHigh },
  eventLogText: { fontFamily: 'Sora_400Regular', fontSize: 13, color: Theme.colors.onSurface, flex: 1 },
  eventLogTime: { fontFamily: 'Sora_400Regular', fontSize: 11, color: Theme.colors.textCaption },
});
