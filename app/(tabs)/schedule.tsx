import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScheduleItem, ScheduleEvent } from '@/components/ScheduleItem';
import { SCHEDULE_DATA } from '@/constants/MockData';
import { Card } from '@/components/Card';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { Calendar as CalendarIcon, Info } from 'lucide-react-native';

// Group schedule data by day (for mock purposes, all events are shown as today)
const groupedEvents = {
  today: SCHEDULE_DATA,
};

const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

export default function ScheduleScreen() {
  const [selectedEvent, setSelectedEvent] = useState<ScheduleEvent | null>(null);
  const currentDate = new Date();
  const currentDay = currentDate.getDate();
  const currentMonth = months[currentDate.getMonth()];
  const currentYear = currentDate.getFullYear();
  
  // Generate days for the calendar strip
  const calendarDays = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(currentDate.getDate() - 3 + i);
    return {
      date: date.getDate(),
      day: weekDays[date.getDay()],
      isToday: date.getDate() === currentDay && date.getMonth() === currentDate.getMonth(),
    };
  });

  const handleEventPress = (event: ScheduleEvent) => {
    setSelectedEvent(event);
  };

  const closeEventDetails = () => {
    setSelectedEvent(null);
  };

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <Animated.View 
        style={styles.header}
        entering={FadeInDown.duration(600)}
      >
        <Text style={styles.dateText}>
          {currentMonth} {currentDay}, {currentYear}
        </Text>
      </Animated.View>

      <Animated.View 
        entering={FadeInDown.duration(600).delay(100)}
        style={styles.calendarStrip}
      >
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.calendarStripContent}
        >
          {calendarDays.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.dayItem,
                item.isToday && styles.currentDayItem,
              ]}
            >
              <Text
                style={[
                  styles.dayName,
                  item.isToday && styles.currentDayText,
                ]}
              >
                {item.day}
              </Text>
              <Text
                style={[
                  styles.dayNumber,
                  item.isToday && styles.currentDayText,
                ]}
              >
                {item.date}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </Animated.View>

      <View style={styles.content}>
        <FlatList
          data={groupedEvents.today}
          keyExtractor={(item) => item.id}
          renderItem={({ item, index }) => (
            <Animated.View 
              entering={FadeInDown.duration(600).delay(200 + index * 100)}
            >
              <ScheduleItem event={item} onPress={handleEventPress} />
            </Animated.View>
          )}
          ListHeaderComponent={() => (
            <Animated.View entering={FadeInDown.duration(600).delay(200)}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Today's Schedule</Text>
              </View>
            </Animated.View>
          )}
          ListEmptyComponent={() => (
            <Animated.View 
              style={styles.emptyContainer}
              entering={FadeInDown.duration(600).delay(200)}
            >
              <CalendarIcon size={48} color="#9CA3AF" />
              <Text style={styles.emptyText}>No events scheduled for today</Text>
            </Animated.View>
          )}
          ListFooterComponent={() => (
            <Animated.View entering={FadeInDown.duration(600).delay(700)}>
              <Card style={styles.footerCard}>
                <View style={styles.footerContent}>
                  <Info size={20} color="#6B7280" style={styles.footerIcon} />
                  <Text style={styles.footerText}>
                    Tap on any event to view details
                  </Text>
                </View>
              </Card>
            </Animated.View>
          )}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
        />
      </View>

      {selectedEvent && (
        <TouchableOpacity
          style={styles.overlay}
          activeOpacity={1}
          onPress={closeEventDetails}
        >
          <TouchableOpacity
            style={styles.eventDetailCard}
            activeOpacity={1}
            onPress={(e) => e.stopPropagation()}
          >
            <View
              style={[
                styles.eventDetailHeader,
                {
                  backgroundColor:
                    selectedEvent.type === 'meeting'
                      ? '#4F46E5'
                      : selectedEvent.type === 'appointment'
                      ? '#0EA5E9'
                      : selectedEvent.type === 'personal'
                      ? '#10B981'
                      : '#9CA3AF',
                },
              ]}
            >
              <Text style={styles.eventDetailTitle}>{selectedEvent.title}</Text>
              <Text style={styles.eventDetailTime}>{selectedEvent.time}</Text>
            </View>
            <View style={styles.eventDetailContent}>
              {selectedEvent.location && (
                <View style={styles.eventDetailItem}>
                  <Text style={styles.eventDetailLabel}>Location</Text>
                  <Text style={styles.eventDetailValue}>
                    {selectedEvent.location}
                  </Text>
                </View>
              )}
              <View style={styles.eventDetailItem}>
                <Text style={styles.eventDetailLabel}>Type</Text>
                <Text style={styles.eventDetailValue}>
                  {selectedEvent.type
                    ? selectedEvent.type.charAt(0).toUpperCase() +
                      selectedEvent.type.slice(1)
                    : 'Other'}
                </Text>
              </View>
              <View style={styles.eventDetailActions}>
                <TouchableOpacity style={styles.eventDetailButton}>
                  <Text style={styles.eventDetailButtonText}>Edit</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.eventDetailButton}>
                  <Text style={styles.eventDetailButtonText}>Set Reminder</Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableOpacity>
        </TouchableOpacity>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  dateText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    color: '#6B7280',
  },
  calendarStrip: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  calendarStripContent: {
    paddingHorizontal: 16,
  },
  dayItem: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 60,
    height: 70,
    borderRadius: 12,
    marginRight: 8,
  },
  currentDayItem: {
    backgroundColor: '#0A84FF',
  },
  dayName: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 4,
  },
  dayNumber: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 20,
    color: '#1F2937',
  },
  currentDayText: {
    color: '#FFFFFF',
  },
  content: {
    flex: 1,
  },
  list: {
    padding: 16,
  },
  sectionHeader: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    color: '#1F2937',
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 48,
  },
  emptyText: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#6B7280',
    marginTop: 16,
    textAlign: 'center',
  },
  footerCard: {
    marginTop: 16,
    marginBottom: 24,
  },
  footerContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  footerIcon: {
    marginRight: 12,
  },
  footerText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#6B7280',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  eventDetailCard: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    overflow: 'hidden',
  },
  eventDetailHeader: {
    padding: 16,
  },
  eventDetailTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    color: '#FFFFFF',
    marginBottom: 4,
  },
  eventDetailTime: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  eventDetailContent: {
    padding: 16,
  },
  eventDetailItem: {
    marginBottom: 16,
  },
  eventDetailLabel: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 4,
  },
  eventDetailValue: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#1F2937',
  },
  eventDetailActions: {
    flexDirection: 'row',
    marginTop: 16,
  },
  eventDetailButton: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    backgroundColor: '#F3F4F6',
    borderRadius: 8,
    marginRight: 12,
  },
  eventDetailButtonText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#4B5563',
  },
});