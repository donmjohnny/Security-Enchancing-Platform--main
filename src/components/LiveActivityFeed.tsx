import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import { Theme } from '../constants/Theme';
import type { ActivityEvent } from '../constants/mockData';

interface LiveActivityFeedProps {
  events: ActivityEvent[];
}

const iconMap: Record<string, keyof typeof Ionicons.glyphMap> = {
  'door-open': 'log-in-outline',
  'camera': 'videocam-outline',
  'wifi': 'wifi-outline',
  'alert-circle': 'alert-circle-outline',
  'shield-check': 'shield-checkmark-outline',
};

const typeColorMap: Record<string, string> = {
  access: Theme.colors.secondary,
  camera: Theme.colors.primary,
  network: Theme.colors.secure,
  sensor: Theme.colors.tertiary,
  alert: Theme.colors.attention,
};

export default function LiveActivityFeed({ events }: LiveActivityFeedProps) {
  const [expanded, setExpanded] = useState(false);
  const height = useSharedValue(0);

  const displayEvents = expanded ? events : events.slice(0, 3);

  useEffect(() => {
    height.value = withTiming(expanded ? 1 : 0, {
      duration: 300,
      easing: Easing.inOut(Easing.ease),
    });
  }, [expanded]);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.header}
        onPress={() => setExpanded(!expanded)}
        activeOpacity={0.7}
      >
        <View style={styles.headerLeft}>
          <View style={styles.liveDot} />
          <Text style={styles.headerTitle}>Live Activity</Text>
        </View>
        <Ionicons
          name={expanded ? 'chevron-up' : 'chevron-down'}
          size={18}
          color={Theme.colors.textCaption}
        />
      </TouchableOpacity>

      <View style={styles.eventsList}>
        {displayEvents.map((event, index) => (
          <View key={event.id} style={styles.eventRow}>
            <View
              style={[
                styles.eventIcon,
                { backgroundColor: (typeColorMap[event.type] || Theme.colors.primary) + '12' },
              ]}
            >
              <Ionicons
                name={iconMap[event.icon] || 'ellipse-outline'}
                size={16}
                color={typeColorMap[event.type] || Theme.colors.primary}
              />
            </View>
            <View style={styles.eventContent}>
              <Text style={styles.eventLocation}>{event.location}</Text>
              <Text style={styles.eventDescription}>{event.description}</Text>
            </View>
            <Text style={styles.eventTime}>{event.time}</Text>
          </View>
        ))}
      </View>

      {events.length > 3 && (
        <TouchableOpacity
          onPress={() => setExpanded(!expanded)}
          style={styles.expandButton}
          activeOpacity={0.7}
        >
          <Text style={styles.expandText}>
            {expanded ? 'Show less' : `Show ${events.length - 3} more`}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Theme.colors.glassWhite,
    borderRadius: Theme.borderRadius.xl,
    borderWidth: 1,
    borderColor: Theme.colors.glassBorder,
    padding: Theme.spacing.m,
    ...Theme.shadow.card,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: Theme.spacing.m,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  liveDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Theme.colors.secure,
    marginRight: 8,
  },
  headerTitle: {
    fontFamily: 'Sora_600SemiBold',
    fontSize: 14,
    fontWeight: '600',
    color: Theme.colors.onSurface,
  },
  eventsList: {},
  eventRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: Theme.colors.surfaceContainerHigh,
  },
  eventIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  eventContent: {
    flex: 1,
  },
  eventLocation: {
    fontFamily: 'Sora_600SemiBold',
    fontSize: 13,
    fontWeight: '600',
    color: Theme.colors.onSurface,
  },
  eventDescription: {
    fontFamily: 'Sora_400Regular',
    fontSize: 11,
    color: Theme.colors.textCaption,
    marginTop: 1,
  },
  eventTime: {
    fontFamily: 'Sora_400Regular',
    fontSize: 11,
    color: Theme.colors.textCaption,
    marginLeft: 8,
  },
  expandButton: {
    alignItems: 'center',
    paddingTop: 10,
  },
  expandText: {
    fontFamily: 'Sora_500Medium',
    fontSize: 12,
    color: Theme.colors.primary,
  },
});
