import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Theme } from '../constants/Theme';
import NeumorphicView from './NeumorphicView';
import type { SecurityStatus } from '../store/useAppStore';

interface SecurityCoreProps {
  status: SecurityStatus;
  size?: number;
}

export default function SecurityCore({ status, size = 220 }: SecurityCoreProps) {
  const isSecure = status === 'secure';

  const statusConfig = {
    secure: {
      label: 'ARMED',
      subtext: 'All systems protected',
      color: Theme.colors.neuOrange,
      icon: 'shield-checkmark',
    },
    attention: {
      label: 'ATTENTION',
      subtext: 'Check warnings',
      color: Theme.colors.attention,
      icon: 'warning',
    },
    critical: {
      label: 'ALERT',
      subtext: 'Protocol triggered',
      color: Theme.colors.critical,
      icon: 'alert-circle',
    },
  };

  const config = statusConfig[status];

  // Concentric sizes
  const outerRing = size;
  const track = size * 0.85;
  const innerRing = size * 0.65;
  const trackWidth = (outerRing - track) / 2;

  return (
    <View style={[styles.container, { width: size, height: size }]}>
      {/* Outer Raised Ring */}
      <NeumorphicView width={outerRing} height={outerRing} borderRadius={outerRing / 2}>
        <View style={styles.centerContainer}>
          {/* Inner Debossed Track (simulated with shadow inversion or border) */}
          <View
            style={[
              styles.debossTrack,
              {
                width: track,
                height: track,
                borderRadius: track / 2,
              },
            ]}
          >
            {/* Inner Raised Orange Core */}
            <View style={styles.centerContainer}>
              <View
                style={[
                  styles.innerCore,
                  {
                    width: innerRing,
                    height: innerRing,
                    borderRadius: innerRing / 2,
                    backgroundColor: Theme.colors.neuBackground,
                    shadowColor: Theme.colors.neuShadowDark,
                  }
                ]}
              >
                <View style={[styles.orangeButton, { backgroundColor: config.color }]}>
                  <Ionicons name={config.icon as any} size={28} color="#FFFFFF" />
                </View>
                
                <Text style={styles.mainLabel}>{config.label}</Text>
                <Text style={styles.subLabel}>{config.subtext}</Text>
              </View>
            </View>
            
            {/* The orange arc indicator inside the track */}
            {isSecure && (
              <View style={[styles.trackIndicator, { borderColor: config.color }]} />
            )}
          </View>
        </View>
      </NeumorphicView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  centerContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  debossTrack: {
    backgroundColor: '#EAE1DA', // Slightly darker than background for deboss feel
    borderWidth: 2,
    borderColor: '#DFD4CC',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#FFFFFF',
    shadowOffset: { width: -2, height: -2 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
  },
  innerCore: {
    alignItems: 'center',
    justifyContent: 'center',
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 0.8,
    shadowRadius: 8,
    elevation: 6,
    borderWidth: 1,
    borderColor: '#FFF',
  },
  orangeButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
    shadowColor: Theme.colors.neuOrange,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 4,
  },
  mainLabel: {
    fontFamily: 'Sora_700Bold',
    fontSize: 16,
    fontWeight: '700',
    color: Theme.colors.neuTextDark,
    letterSpacing: 2,
    marginBottom: 2,
  },
  subLabel: {
    fontFamily: 'Sora_400Regular',
    fontSize: 10,
    color: Theme.colors.neuTextLight,
  },
  trackIndicator: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    borderRadius: 999,
    borderWidth: 6,
    borderTopColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: 'transparent',
    transform: [{ rotate: '-45deg' }], // Top left curve
  },
});
