import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  useWindowDimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Card } from '@/components/Card';
import { Button } from '@/components/Button';
import { router } from 'expo-router';
import { Calendar, Users, Image as ImageIcon, Video, Send, LogOut } from 'lucide-react-native';
import { useAuth } from '@/hooks/useAuth';
import Animated, { FadeIn, FadeInDown } from 'react-native-reanimated';

export default function HomeScreen() {
  const { user, signOut } = useAuth();
  const { width } = useWindowDimensions();
  
  const handleSignOut = () => {
    signOut();
    router.replace('/sign-in');
  };

  const menuItems = [
    {
      title: 'Schedule',
      icon: <Calendar size={24} color="#0A84FF" />,
      route: '/schedule',
      description: 'View your upcoming events',
    },
    {
      title: 'Gallery',
      icon: <ImageIcon size={24} color="#10B981" />,
      route: '/gallery',
      description: 'Browse image collection',
    },
    {
      title: 'Videos',
      icon: <Video size={24} color="#8B5CF6" />,
      route: '/videos',
      description: 'Watch video content',
    },
    {
      title: 'Contact',
      icon: <Send size={24} color="#F97316" />,
      route: '/contact',
      description: 'Get in touch with us',
    },
  ];

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Animated.View 
          style={styles.header}
          entering={FadeIn.duration(600)}
        >
          <View style={styles.profileInfo}>
            <Image
              source={{ uri: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=200' }}
              style={styles.avatar}
            />
            <View style={styles.nameContainer}>
              <Text style={styles.greeting}>Welcome back,</Text>
              <Text style={styles.name}>{user?.name}</Text>
            </View>
          </View>
          
          <TouchableOpacity 
            style={styles.logoutButton} 
            onPress={handleSignOut}
            hitSlop={{ top: 10, right: 10, bottom: 10, left: 10 }}
          >
            <LogOut size={24} color="#6B7280" />
          </TouchableOpacity>
        </Animated.View>

        <Animated.View 
          entering={FadeInDown.duration(600).delay(200)}
          style={styles.heroCard}
        >
          <Image
            source={{ uri: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=800' }}
            style={styles.heroImage}
          />
          <View style={styles.heroContent}>
            <Text style={styles.heroTitle}>Welcome to Your App</Text>
            <Text style={styles.heroSubtitle}>
              Explore all features and stay connected with your team
            </Text>
            <Button
              title="View Schedule"
              onPress={() => router.push('/(tabs)/schedule')}
              variant="primary"
              size="md"
              style={styles.heroButton}
            />
          </View>
        </Animated.View>

        <Animated.Text 
          style={styles.sectionTitle}
          entering={FadeInDown.duration(600).delay(300)}
        >
          Quick Access
        </Animated.Text>

        <View style={styles.menuGrid}>
          {menuItems.map((item, index) => (
            <Animated.View 
              key={item.title}
              style={[
                styles.menuItem,
                { width: (width - 56) / 2 }, // Adjust for 2 columns with margins
              ]}
              entering={FadeInDown.duration(600).delay(400 + index * 100)}
            >
              <TouchableOpacity
                style={styles.menuButton}
                onPress={() => router.push(`/(tabs)${item.route}`)}
              >
                <View style={styles.menuIconContainer}>{item.icon}</View>
                <Text style={styles.menuTitle}>{item.title}</Text>
                <Text style={styles.menuDescription}>{item.description}</Text>
              </TouchableOpacity>
            </Animated.View>
          ))}
        </View>

        <Animated.View
          entering={FadeInDown.duration(600).delay(800)}
        >
          <Card
            title="Did You Know?"
            subtitle="Helpful tips to get the most out of your app"
            style={styles.tipsCard}
          >
            <Text style={styles.tipText}>
              You can schedule events directly from the Schedule tab and get reminders before they start.
            </Text>
          </Card>
        </Animated.View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  scrollContent: {
    padding: 16,
    paddingTop: 8,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 24,
    marginTop: 8,
  },
  profileInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
  },
  nameContainer: {
    justifyContent: 'center',
  },
  greeting: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#6B7280',
  },
  name: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    color: '#1F2937',
  },
  logoutButton: {
    padding: 8,
  },
  heroCard: {
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: '#FFFFFF',
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  heroImage: {
    width: '100%',
    height: 160,
  },
  heroContent: {
    padding: 16,
  },
  heroTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 20,
    color: '#1F2937',
    marginBottom: 8,
  },
  heroSubtitle: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 16,
    lineHeight: 21,
  },
  heroButton: {
    marginTop: 8,
  },
  sectionTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    color: '#1F2937',
    marginBottom: 16,
  },
  menuGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  menuItem: {
    marginBottom: 16,
  },
  menuButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    height: 140,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 1,
  },
  menuIconContainer: {
    marginBottom: 12,
  },
  menuTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#1F2937',
    marginBottom: 4,
  },
  menuDescription: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#6B7280',
  },
  tipsCard: {
    marginBottom: 24,
  },
  tipText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#4B5563',
    lineHeight: 21,
  },
});