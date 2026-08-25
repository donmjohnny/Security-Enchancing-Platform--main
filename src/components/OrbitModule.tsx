import React from 'react';
import { StyleSheet, TouchableOpacity, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Theme } from '../constants/Theme';
import NeumorphicView from './NeumorphicView';

interface OrbitModuleProps {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  onPress: () => void;
  hasActivity?: boolean;
  size?: number;
}

export default function OrbitModule({
  icon,
  label,
  onPress,
  hasActivity = false,
  size = 72, // Make them a bit larger for the squircle look
}: OrbitModuleProps) {
  
  // Icon mapping logic to match the reference image aesthetics
  // Since we use Ionicons, we pick the closest matching solid/outline shapes
  const getIconColor = () => {
    return Theme.colors.neuTextDark; // The brownish/dark orange color in reference
  };

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.7} style={{ width: size, height: size }}>
      <NeumorphicView width={size} height={size} borderRadius={20}>
        <View style={styles.content}>
          <Ionicons name={icon} size={28} color={getIconColor()} style={styles.iconStyle} />
          <Text style={styles.label} numberOfLines={1}>{label}</Text>
          
          {hasActivity && (
            <View style={styles.activityDotContainer}>
              <View style={styles.activityDot} />
            </View>
          )}
        </View>
      </NeumorphicView>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
  },
  iconStyle: {
    marginBottom: 6,
  },
  label: {
    fontFamily: 'Sora_500Medium',
    fontSize: 10,
    color: Theme.colors.neuTextDark,
    textAlign: 'center',
  },
  activityDotContainer: {
    position: 'absolute',
    top: 6,
    right: 6,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: Theme.colors.neuBackground, // Raised effect base
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  activityDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: Theme.colors.neuOrange,
  },
});
