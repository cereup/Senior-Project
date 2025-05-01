import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export type ScheduleEvent = {
  id: string;
  title: string;
  time: string;
  location?: string;
  type?: 'meeting' | 'appointment' | 'personal' | 'other';
};

interface ScheduleItemProps {
  event: ScheduleEvent;
  onPress?: (event: ScheduleEvent) => void;
}

export function ScheduleItem({ event, onPress }: ScheduleItemProps) {
  const getTypeColor = (type?: string) => {
    switch (type) {
      case 'meeting':
        return '#4F46E5'; // Indigo
      case 'appointment':
        return '#0EA5E9'; // Sky
      case 'personal':
        return '#10B981'; // Emerald
      default:
        return '#9CA3AF'; // Gray
    }
  };

  const typeColor = getTypeColor(event.type);
  
  return (
    <TouchableOpacity 
      style={styles.container}
      onPress={() => onPress && onPress(event)}
      activeOpacity={onPress ? 0.7 : 1}
    >
      <View style={[styles.colorBand, { backgroundColor: typeColor }]} />
      <View style={styles.content}>
        <Text style={styles.time}>{event.time}</Text>
        <Text style={styles.title}>{event.title}</Text>
        {event.location && (
          <Text style={styles.location}>{event.location}</Text>
        )}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginBottom: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 1,
  },
  colorBand: {
    width: 6,
    backgroundColor: '#4F46E5',
  },
  content: {
    flex: 1,
    padding: 12,
  },
  time: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6B7280',
    marginBottom: 4,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 4,
  },
  location: {
    fontSize: 14,
    color: '#6B7280',
  },
});