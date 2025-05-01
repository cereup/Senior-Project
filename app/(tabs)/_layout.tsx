import React from 'react';
import { Tabs } from 'expo-router';
import { Users, Calendar, Image as ImageIcon, Video, Send } from 'lucide-react-native';
import { StyleSheet, View, Platform } from 'react-native';
import { BlurView } from 'expo-blur';
import { useAuth } from '@/hooks/useAuth';

export default function TabLayout() {
  const { user } = useAuth();

  // Redirect to sign-in if no user found
  if (!user) {
    return null;
  }

  return (
    <Tabs
      screenOptions={{
        tabBarStyle: styles.tabBar,
        tabBarActiveTintColor: '#0A84FF',
        tabBarInactiveTintColor: '#9CA3AF',
        tabBarLabelStyle: styles.tabBarLabel,
        headerShown: true,
        headerStyle: styles.header,
        headerTitleStyle: styles.headerTitle,
        ...Platform.select({
          ios: {
            tabBarBackground: () => (
              <BlurView intensity={60} style={StyleSheet.absoluteFill} tint="light" />
            ),
          },
        }),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size }) => (
            <Users size={size} color={color} />
          ),
          headerTitle: 'Welcome',
        }}
      />
      <Tabs.Screen
        name="schedule"
        options={{
          title: 'Schedule',
          tabBarIcon: ({ color, size }) => (
            <Calendar size={size} color={color} />
          ),
          headerTitle: 'Your Schedule',
        }}
      />
      <Tabs.Screen
        name="gallery"
        options={{
          title: 'Gallery',
          tabBarIcon: ({ color, size }) => (
            <ImageIcon size={size} color={color} />
          ),
          headerTitle: 'Media Gallery',
        }}
      />
      <Tabs.Screen
        name="videos"
        options={{
          title: 'Videos',
          tabBarIcon: ({ color, size }) => (
            <Video size={size} color={color} />
          ),
          headerTitle: 'Video Library',
        }}
      />
      <Tabs.Screen
        name="contact"
        options={{
          title: 'Contact',
          tabBarIcon: ({ color, size }) => (
            <Send size={size} color={color} />
          ),
          headerTitle: 'Contact Us',
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    ...Platform.select({
      android: {
        elevation: 8,
        height: 60,
      },
      ios: {
        height: 88,
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
      },
      web: {
        height: 60,
        backgroundColor: '#FFFFFF',
        borderTopWidth: 1,
        borderTopColor: '#E5E7EB',
      },
    }),
  },
  tabBarLabel: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    ...Platform.select({
      android: {
        marginBottom: 4,
      },
    }),
  },
  header: {
    backgroundColor: '#FFFFFF',
    elevation: 0,
    shadowOpacity: 0,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  headerTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    color: '#1F2937',
  },
});