import React, { useState, useRef, useEffect } from 'react';
import {
  StyleSheet, View, Text, ScrollView, SafeAreaView,
  TouchableOpacity, TextInput, Modal, Animated, PanResponder,
  KeyboardAvoidingView, Platform, Alert
} from 'react-native';
import * as LocalAuthentication from 'expo-local-authentication';
import Reanimated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { Theme } from '@/src/constants/Theme';
import { DOORS, Door } from '@/src/constants/mockData';
import GradientBackground from '@/src/components/GradientBackground';
import GlassCard from '@/src/components/GlassCard';
import ScreenHeader from '@/src/components/ScreenHeader';
import PillButton from '@/src/components/PillButton';
import { useRouter, Stack } from 'expo-router';

const statusColors: Record<string, string> = {
  secure: Theme.colors.secure,
  locked: Theme.colors.secondary,
  attention: Theme.colors.attention,
  open: Theme.colors.primaryLight,
};

const statusIcons: Record<string, keyof typeof Ionicons.glyphMap> = {
  secure: 'checkmark-circle',
  locked: 'lock-closed',
  attention: 'alert-circle',
  open: 'lock-open',
};

export default function DoorsScreen() {
  const router = useRouter();
  const [selectedDoor, setSelectedDoor] = useState<Door | null>(null);
  const secureCount = DOORS.filter(d => d.status === 'secure' || d.status === 'locked').length;
  const attentionCount = DOORS.filter(d => d.status === 'attention').length;

  if (selectedDoor) {
    return <DoorDetail door={selectedDoor} onClose={() => setSelectedDoor(null)} />;
  }

  return (
    <GradientBackground>
      <Stack.Screen options={{ headerShown: false }} />
      <SafeAreaView style={styles.container}>
        {/* Back Button */}
        <View style={styles.topNav}>
          <TouchableOpacity onPress={() => router.back()}>
            <GlassCard style={styles.backButton} variant="elevated" borderRadius={24}>
              <Ionicons name="arrow-back" size={24} color={Theme.colors.onSurface} />
            </GlassCard>
          </TouchableOpacity>
        </View>

        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          {/* Header with margin top */}
          <View style={styles.headerWrapper}>
            <ScreenHeader title="ACCESS CONTROL" subtitle={`${DOORS.length} Access Points`} showBack={false} />
          </View>

          {/* Big Card containing everything */}
          <GlassCard style={styles.bigCard} variant="elevated">
            {/* Summary */}
            <Reanimated.View entering={FadeInDown.delay(100).duration(500)} style={styles.summaryRow}>
              <View style={styles.summaryCard}>
                <Text style={styles.summaryNumber}>{DOORS.length}</Text>
                <Text style={styles.summaryLabel}>Total</Text>
              </View>
              <View style={styles.summaryCard}>
                <Text style={[styles.summaryNumber, { color: Theme.colors.primary }]}>{secureCount}</Text>
                <Text style={styles.summaryLabel}>Secure</Text>
              </View>
              <View style={styles.summaryCard}>
                <Text style={[styles.summaryNumber, { color: Theme.colors.primary }]}>{attentionCount}</Text>
                <Text style={styles.summaryLabel}>Attention</Text>
              </View>
            </Reanimated.View>

            {/* 2-Column Grid */}
            <View style={styles.gridContainer}>
              {DOORS.map((door, index) => (
                <Reanimated.View
                  key={door.id}
                  entering={FadeInUp.delay(150 + index * 50).duration(400)}
                  style={styles.gridItemWrapper}
                >
                  <TouchableOpacity
                    activeOpacity={0.85}
                    onPress={() => setSelectedDoor(door)}
                    style={{ flex: 1 }}
                  >
                    <View style={styles.gridDoorCard}>
                      <Ionicons
                        name={statusIcons[door.status]}
                        size={24}
                        color={Theme.colors.primary}
                        style={{ marginBottom: 8 }}
                      />
                      <Text style={styles.gridDoorName} numberOfLines={1}>{door.name}</Text>
                      <Text style={styles.gridDoorLocation} numberOfLines={1}>{door.location}</Text>
                    </View>
                  </TouchableOpacity>
                </Reanimated.View>
              ))}
            </View>
          </GlassCard>
        </ScrollView>
      </SafeAreaView>
    </GradientBackground>
  );
}

function SwipeLock({
  isUnlocked,
  onSwipe,
  resetTrigger,
}: {
  isUnlocked: boolean;
  onSwipe: (newState: boolean) => void;
  resetTrigger: boolean;
}) {
  const TRACK_HEIGHT = 280;
  const KNOB_SIZE = 112;
  const PADDING = 10;
  const MAX_TRANSLATE = TRACK_HEIGHT - 8 - PADDING * 2 - KNOB_SIZE; // 140

  const panY = useRef(new Animated.Value(isUnlocked ? 0 : MAX_TRANSLATE)).current;

  useEffect(() => {
    if (!resetTrigger) {
      Animated.spring(panY, {
        toValue: isUnlocked ? 0 : MAX_TRANSLATE,
        useNativeDriver: false,
        friction: 8,
        tension: 40,
      }).start();
    }
  }, [isUnlocked, resetTrigger, panY, MAX_TRANSLATE]);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: (_, gestureState) => {
        let newY = (isUnlocked ? 0 : MAX_TRANSLATE) + gestureState.dy;
        if (newY < 0) newY = 0;
        if (newY > MAX_TRANSLATE) newY = MAX_TRANSLATE;
        panY.setValue(newY);
      },
      onPanResponderRelease: (_, gestureState) => {
        let newY = (isUnlocked ? 0 : MAX_TRANSLATE) + gestureState.dy;
        if (isUnlocked) {
          if (newY > MAX_TRANSLATE * 0.4) {
            onSwipe(false);
          } else {
            Animated.spring(panY, { toValue: 0, useNativeDriver: false }).start();
          }
        } else {
          if (newY < MAX_TRANSLATE * 0.6) {
            onSwipe(true);
          } else {
            Animated.spring(panY, { toValue: MAX_TRANSLATE, useNativeDriver: false }).start();
          }
        }
      },
    })
  ).current;

  return (
    <View style={styles.swipeTrackWrapper}>
      <BlurView intensity={60} tint="light" style={styles.swipeTrack}>
        <Animated.View
          {...panResponder.panHandlers}
          style={[
            styles.swipeKnob,
            { transform: [{ translateY: panY }] },
          ]}
        >
          <Ionicons 
            name={isUnlocked ? 'lock-open-outline' : 'lock-closed-outline'} 
            size={36} 
            color={Theme.colors.primary} 
          />
          <Text style={[styles.knobText, { color: Theme.colors.primary }]}>
            {isUnlocked ? 'OPENED' : 'LOCKED'}
          </Text>
        </Animated.View>
      </BlurView>
    </View>
  );
}

function DoorDetail({ door, onClose }: { door: Door; onClose: () => void }) {
  const [isUnlocked, setIsUnlocked] = useState(door.status === 'open');
  const [authVisible, setAuthVisible] = useState(false);
  const [pendingState, setPendingState] = useState(false);
  
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSwipe = (newState: boolean) => {
    setPendingState(newState);
    setAuthVisible(true);
  };

  const confirmAuth = async () => {
    if (username.length > 0 && password.length > 0) {
      setIsUnlocked(pendingState);
      setAuthVisible(false);
      return;
    }

    try {
      const hasHardware = await LocalAuthentication.hasHardwareAsync();
      if (!hasHardware) {
        Alert.alert('Error', 'No biometric hardware found on this device.');
        return;
      }
      
      const isEnrolled = await LocalAuthentication.isEnrolledAsync();
      if (!isEnrolled) {
        Alert.alert('Error', 'No biometrics enrolled on this device.');
        return;
      }
      
      const result = await LocalAuthentication.authenticateAsync({
        promptMessage: pendingState ? 'Unlock Door' : 'Lock Door',
        fallbackLabel: 'Use Passcode',
        cancelLabel: 'Cancel',
      });
      
      if (result.success) {
        setIsUnlocked(pendingState);
        setAuthVisible(false);
      } else {
        Alert.alert('Authentication Failed', 'Please try again.');
      }
    } catch (e) {
      console.error(e);
      Alert.alert('Error', 'An error occurred during biometric authentication.');
    }
  };

  const cancelAuth = () => {
    setAuthVisible(false);
  };

  return (
    <GradientBackground>
      <SafeAreaView style={styles.detailContainer}>
        <View style={styles.detailHeader}>
          <TouchableOpacity onPress={onClose}>
            <GlassCard style={styles.backButton} variant="elevated" borderRadius={24}>
              <Ionicons name="arrow-back" size={24} color={Theme.colors.onSurface} />
            </GlassCard>
          </TouchableOpacity>
          <View style={{ width: 48 }} />
        </View>

        <View style={styles.centerStage}>
          <Text style={styles.doorTitle}>{door.name.toUpperCase()}</Text>
          <Text style={styles.doorLocationTitle}>{door.location.toUpperCase()}</Text>
          
          <SwipeLock 
            isUnlocked={isUnlocked} 
            onSwipe={handleSwipe} 
            resetTrigger={authVisible} 
          />
        </View>

      </SafeAreaView>

      <Modal visible={authVisible} transparent animationType="fade">
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.modalOverlay}>
          <BlurView intensity={20} tint="dark" style={StyleSheet.absoluteFillObject} />
          
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.sectionTitle}>Authentication Required</Text>
              <TouchableOpacity onPress={cancelAuth}>
                <Ionicons name="close" size={24} color={Theme.colors.onSurface} />
              </TouchableOpacity>
            </View>
            <Text style={styles.modalSubtitle}>
              Verify identity to {pendingState ? 'unlock' : 'lock'} {door.name}
            </Text>
            
            <View style={styles.inputContainer}>
              <Ionicons name="person-outline" size={20} color={Theme.colors.textCaption} />
              <TextInput 
                style={styles.input} 
                placeholder="Username" 
                placeholderTextColor={Theme.colors.textCaption}
                value={username}
                onChangeText={setUsername}
              />
            </View>
            <View style={styles.inputContainer}>
              <Ionicons name="key-outline" size={20} color={Theme.colors.textCaption} />
              <TextInput 
                style={styles.input} 
                placeholder="Password" 
                placeholderTextColor={Theme.colors.textCaption}
                secureTextEntry
                value={password}
                onChangeText={setPassword}
              />
            </View>
            <View style={{ marginTop: 10 }}>
              <PillButton title="Confirm Identity" onPress={confirmAuth} variant="primary" />
            </View>

            <Text style={styles.orText}>OR USE BIOMETRICS</Text>

            <View style={styles.biometricsContainer}>
              <TouchableOpacity style={styles.bioButton} onPress={confirmAuth} activeOpacity={0.7}>
                <Ionicons name="finger-print" size={32} color={Theme.colors.primary} />
                <Text style={styles.bioText}>Fingerprint</Text>
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.bioButton} onPress={confirmAuth} activeOpacity={0.7}>
                <MaterialCommunityIcons name="face-recognition" size={32} color={Theme.colors.primary} />
                <Text style={styles.bioText}>Face Unlock</Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </GradientBackground>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollContent: { paddingBottom: 40 },

  // Summary
  summaryRow: { flexDirection: 'row', gap: Theme.spacing.s, marginBottom: Theme.spacing.l },
  summaryCard: { flex: 1, alignItems: 'center' },
  summaryNumber: { fontFamily: 'Sora_700Bold', fontSize: 24, fontWeight: '700', color: Theme.colors.onSurface },
  summaryLabel: { fontFamily: 'Sora_400Regular', fontSize: 10, color: Theme.colors.textCaption, marginTop: 2 },

  // Big Card Layout
  topNav: {
    paddingHorizontal: Theme.spacing.containerMargin,
    paddingTop: Theme.spacing.m,
  },
  headerWrapper: {
    marginTop: Theme.spacing.l,
    marginBottom: Theme.spacing.m,
    paddingHorizontal: Theme.spacing.containerMargin,
  },
  bigCard: {
    padding: Theme.spacing.m,
    paddingTop: Theme.spacing.l,
    marginHorizontal: Theme.spacing.containerMargin,
    marginBottom: 40,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: Theme.spacing.m,
  },
  gridItemWrapper: {
    width: '48%', // 2 columns
    marginBottom: Theme.spacing.m,
  },
  gridDoorCard: {
    flex: 1,
    borderRadius: Theme.borderRadius.l,
    padding: Theme.spacing.m,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: 'rgba(93, 115, 230, 0.15)', // subtle faded blue edge
    backgroundColor: 'rgba(255, 255, 255, 0.1)', // Glass background
    shadowColor: 'rgba(93, 115, 230, 0.5)', // faded blue in corners/shadow
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  gridDoorName: {
    fontFamily: 'Sora_600SemiBold',
    fontSize: 13,
    color: Theme.colors.onSurface,
    textAlign: 'center',
  },
  gridDoorLocation: {
    fontFamily: 'Sora_400Regular',
    fontSize: 10,
    color: Theme.colors.textCaption,
    marginTop: 4,
    textAlign: 'center',
  },
  gridDoorStatusBadge: {
    marginTop: 10,
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: Theme.borderRadius.full,
  },
  gridDoorStatusText: {
    fontFamily: 'Sora_700Bold',
    fontSize: 8,
    letterSpacing: 1,
  },

  // Detail
  detailContainer: { flex: 1 },
  detailHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: Theme.spacing.containerMargin, paddingVertical: Theme.spacing.m },
  backButton: { width: 48, height: 48, alignItems: 'center', justifyContent: 'center', padding: 0 },
  
  // Swipe Lock UI
  centerStage: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 40,
  },
  doorTitle: {
    fontFamily: 'Sora_700Bold',
    fontSize: 24,
    color: Theme.colors.onSurface,
    letterSpacing: 2,
  },
  doorLocationTitle: {
    fontFamily: 'Sora_400Regular',
    fontSize: 14,
    color: Theme.colors.textCaption,
    letterSpacing: 1,
    marginTop: 8,
  },
  swipeTrackWrapper: {
    alignItems: 'center',
    marginTop: 60,
  },
  swipeTrack: {
    width: 140,
    height: 280,
    borderRadius: 70,
    padding: 10,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.4)',
    overflow: 'hidden',
  },
  swipeKnob: {
    width: 118,
    height: 118,
    borderRadius: 59,
    backgroundColor: 'rgba(255,255,255,0.95)',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
  },
  knobText: {
    fontFamily: 'Sora_700Bold',
    fontSize: 11,
    marginTop: 4,
    letterSpacing: 1,
  },

  // Modal
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: 'rgba(255,255,255,0.95)',
    borderTopLeftRadius: Theme.borderRadius.xl,
    borderTopRightRadius: Theme.borderRadius.xl,
    padding: Theme.spacing.xl,
    paddingBottom: 40,
    gap: Theme.spacing.m,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -10 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 10,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sectionTitle: { fontFamily: 'Sora_600SemiBold', fontSize: 18, fontWeight: '600', color: Theme.colors.onSurface },
  modalSubtitle: {
    fontFamily: 'Sora_400Regular',
    fontSize: 14,
    color: Theme.colors.textCaption,
    marginBottom: Theme.spacing.s,
  },

  // Auth Forms
  inputContainer: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    backgroundColor: 'rgba(0,0,0,0.03)', 
    borderRadius: Theme.borderRadius.m, 
    paddingHorizontal: Theme.spacing.m,
    height: 52,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.05)',
  },
  input: { flex: 1, marginLeft: 10, color: Theme.colors.onSurface, fontFamily: 'Sora_400Regular', fontSize: 15 },
  orText: { textAlign: 'center', color: Theme.colors.textCaption, fontFamily: 'Sora_600SemiBold', fontSize: 12, marginVertical: Theme.spacing.s, letterSpacing: 1 },
  biometricsContainer: { flexDirection: 'row', gap: Theme.spacing.m, justifyContent: 'center' },
  bioButton: { 
    flex: 1, 
    backgroundColor: 'rgba(0,0,0,0.02)', 
    borderRadius: Theme.borderRadius.l, 
    padding: Theme.spacing.l, 
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.05)',
  },
  bioText: { color: Theme.colors.onSurface, fontFamily: 'Sora_600SemiBold', marginTop: Theme.spacing.s, fontSize: 13 },
});
