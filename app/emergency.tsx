import React, { useState } from 'react';
import { StyleSheet, View, Text, SafeAreaView, TouchableOpacity, Vibration } from 'react-native';
import Animated, { FadeIn, FadeInUp, FadeInDown } from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Theme } from '@/src/constants/Theme';
import { useAppStore } from '@/src/store/useAppStore';
import GradientBackground from '@/src/components/GradientBackground';
import GlassCard from '@/src/components/GlassCard';
import PillButton from '@/src/components/PillButton';

export default function EmergencyScreen() {
  const router = useRouter();
  const { emergencyMode, activateEmergencyMode, deactivateEmergencyMode } = useAppStore();
  const [step, setStep] = useState<'confirm' | 'active'>(emergencyMode ? 'active' : 'confirm');

  const handleActivate = () => {
    Vibration.vibrate([0, 200, 100, 200]);
    activateEmergencyMode();
    setStep('active');
  };

  const handleDeactivate = () => {
    deactivateEmergencyMode();
    router.back();
  };

  if (step === 'active') {
    return (
      <View style={styles.activeContainer}>
        <SafeAreaView style={styles.flex}>
          <Animated.View entering={FadeIn.duration(600)} style={styles.activeContent}>
            {/* Pulsing alert */}
            <Animated.View entering={FadeIn.delay(200).duration(800)} style={styles.alertCircle}>
              <Ionicons name="warning" size={48} color={Theme.colors.white} />
            </Animated.View>

            <Text style={styles.activeTitle}>EMERGENCY PROTOCOL</Text>
            <Text style={styles.activeSubtitle}>Security lockdown is active</Text>

            {/* Active Actions */}
            <View style={styles.actionsList}>
              {[
                { icon: 'lock-closed', label: 'All designated doors locked', active: true },
                { icon: 'notifications', label: 'Security personnel notified', active: true },
                { icon: 'videocam', label: 'Affected cameras highlighted', active: true },
                { icon: 'location', label: 'Incident location marked', active: true },
                { icon: 'recording', label: 'Incident recording started', active: true },
              ].map((action, i) => (
                <View key={i} style={styles.actionItem}>
                  <View style={styles.actionIconActive}>
                    <Ionicons name={action.icon as any} size={18} color={Theme.colors.white} />
                  </View>
                  <Text style={styles.actionLabelActive}>{action.label}</Text>
                  <Ionicons name="checkmark-circle" size={20} color={Theme.colors.secureLight} />
                </View>
              ))}
            </View>

            {/* Deactivate */}
            <View style={styles.deactivateSection}>
              <PillButton
                title="Deactivate Emergency Protocol"
                onPress={handleDeactivate}
                variant="ghost"
                size="large"
              />
            </View>
          </Animated.View>
        </SafeAreaView>
      </View>
    );
  }

  return (
    <GradientBackground>
      <SafeAreaView style={styles.flex}>
        <View style={styles.confirmContainer}>
          {/* Close */}
          <Animated.View entering={FadeInDown.duration(400)} style={styles.closeRow}>
            <TouchableOpacity onPress={() => router.back()} style={styles.closeButton}>
              <Ionicons name="close" size={24} color={Theme.colors.onSurface} />
            </TouchableOpacity>
          </Animated.View>

          <Animated.View entering={FadeIn.delay(200).duration(600)} style={styles.confirmContent}>
            {/* Warning Icon */}
            <View style={styles.warningCircle}>
              <Ionicons name="warning-outline" size={44} color={Theme.colors.critical} />
            </View>

            <Text style={styles.confirmTitle}>EMERGENCY PROTOCOL</Text>
            <Text style={styles.confirmSubtitle}>Security lockdown will activate.</Text>

            <Text style={styles.confirmDescription}>
              This will trigger the following actions across your security environment:
            </Text>

            {/* Actions Preview */}
            <GlassCard style={styles.actionsPreview}>
              {[
                { icon: 'lock-closed-outline', label: 'Lock designated doors' },
                { icon: 'notifications-outline', label: 'Notify security personnel' },
                { icon: 'videocam-outline', label: 'Highlight affected cameras' },
                { icon: 'location-outline', label: 'Mark incident location' },
                { icon: 'recording-outline', label: 'Start incident recording' },
                { icon: 'document-text-outline', label: 'Display emergency instructions' },
              ].map((action, i) => (
                <View key={i} style={[styles.previewItem, i < 5 && styles.previewBorder]}>
                  <Ionicons name={action.icon as any} size={18} color={Theme.colors.critical} />
                  <Text style={styles.previewLabel}>{action.label}</Text>
                </View>
              ))}
            </GlassCard>
          </Animated.View>

          {/* Buttons */}
          <Animated.View entering={FadeInUp.delay(400).duration(500)} style={styles.buttonSection}>
            <PillButton
              title="Activate Emergency Protocol"
              onPress={handleActivate}
              variant="danger"
              size="large"
            />
            <TouchableOpacity onPress={() => router.back()} style={styles.cancelLink}>
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
      </SafeAreaView>
    </GradientBackground>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },

  // Confirm
  confirmContainer: { flex: 1, paddingHorizontal: Theme.spacing.containerMargin },
  closeRow: { alignItems: 'flex-start', paddingTop: Theme.spacing.m },
  closeButton: { width: 36, height: 36, borderRadius: 18, backgroundColor: Theme.colors.surfaceContainerHigh, alignItems: 'center', justifyContent: 'center' },
  confirmContent: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingBottom: 40 },
  warningCircle: { width: 90, height: 90, borderRadius: 45, backgroundColor: Theme.colors.criticalLight, alignItems: 'center', justifyContent: 'center', marginBottom: Theme.spacing.l },
  confirmTitle: { fontFamily: 'Sora_700Bold', fontSize: 22, fontWeight: '700', color: Theme.colors.critical, letterSpacing: 2 },
  confirmSubtitle: { fontFamily: 'Sora_400Regular', fontSize: 16, color: Theme.colors.onSurface, marginTop: 8 },
  confirmDescription: { fontFamily: 'Sora_400Regular', fontSize: 14, color: Theme.colors.textCaption, textAlign: 'center', marginTop: Theme.spacing.l, marginBottom: Theme.spacing.m, lineHeight: 22 },
  actionsPreview: { width: '100%', padding: Theme.spacing.m },
  previewItem: { flexDirection: 'row', alignItems: 'center', paddingVertical: 12, gap: 12 },
  previewBorder: { borderBottomWidth: 1, borderBottomColor: Theme.colors.surfaceContainerHigh },
  previewLabel: { fontFamily: 'Sora_400Regular', fontSize: 14, color: Theme.colors.onSurface },
  buttonSection: { alignItems: 'center', paddingBottom: Theme.spacing.xl },
  cancelLink: { marginTop: Theme.spacing.m },
  cancelText: { fontFamily: 'Sora_500Medium', fontSize: 15, color: Theme.colors.textCaption },

  // Active
  activeContainer: { flex: 1, backgroundColor: '#1A0A0A' },
  activeContent: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: Theme.spacing.containerMargin },
  alertCircle: { width: 100, height: 100, borderRadius: 50, backgroundColor: Theme.colors.critical, alignItems: 'center', justifyContent: 'center', marginBottom: Theme.spacing.xl },
  activeTitle: { fontFamily: 'Sora_700Bold', fontSize: 24, fontWeight: '700', color: Theme.colors.criticalLight, letterSpacing: 3 },
  activeSubtitle: { fontFamily: 'Sora_400Regular', fontSize: 14, color: 'rgba(255,255,255,0.6)', marginTop: 8 },
  actionsList: { width: '100%', marginTop: Theme.spacing.xxl },
  actionItem: { flexDirection: 'row', alignItems: 'center', paddingVertical: 14, gap: 14 },
  actionIconActive: { width: 36, height: 36, borderRadius: 18, backgroundColor: 'rgba(255,255,255,0.1)', alignItems: 'center', justifyContent: 'center' },
  actionLabelActive: { fontFamily: 'Sora_400Regular', fontSize: 14, color: 'rgba(255,255,255,0.8)', flex: 1 },
  deactivateSection: { marginTop: Theme.spacing.xxl },
});
