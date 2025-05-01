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
import { VideoPlayer } from '@/components/VideoPlayer';
import { VIDEOS } from '@/constants/MockData';
import { Card } from '@/components/Card';
import Animated, { FadeIn, FadeInDown } from 'react-native-reanimated';

export default function VideosScreen() {
  const [selectedVideo, setSelectedVideo] = useState(VIDEOS[0]);

  const handleVideoSelect = (video: typeof VIDEOS[0]) => {
    setSelectedVideo(video);
  };

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Animated.View 
          style={styles.featuredVideoContainer}
          entering={FadeIn.duration(600)}
        >
          <Text style={styles.featuredTitle}>Now Playing</Text>
          <Text style={styles.videoTitle}>{selectedVideo.title}</Text>
          
          <VideoPlayer
            source={{ uri: selectedVideo.uri }}
            posterSource={{ uri: selectedVideo.poster }}
            style={styles.videoPlayer}
          />
        </Animated.View>

        <Animated.View entering={FadeInDown.duration(600).delay(200)}>
          <Text style={styles.sectionTitle}>Video Library</Text>

          <View style={styles.videoList}>
            {VIDEOS.map((video, index) => (
              <TouchableOpacity
                key={video.id}
                style={[
                  styles.videoItem,
                  selectedVideo.id === video.id && styles.selectedVideoItem,
                ]}
                onPress={() => handleVideoSelect(video)}
                activeOpacity={0.8}
              >
                <View style={styles.thumbnailContainer}>
                  <View style={styles.thumbnail}>
                    {video.poster && (
                      <Animated.Image
                        source={{ uri: video.poster }}
                        style={styles.thumbnailImage}
                        entering={FadeIn.duration(600).delay(300 + index * 100)}
                      />
                    )}
                    <View style={styles.playIconOverlay}>
                      <View style={styles.playIcon} />
                    </View>
                  </View>
                </View>
                <Text
                  style={[
                    styles.videoItemTitle,
                    selectedVideo.id === video.id && styles.selectedVideoItemTitle,
                  ]}
                  numberOfLines={2}
                >
                  {video.title}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </Animated.View>

        <Animated.View entering={FadeInDown.duration(600).delay(600)}>
          <Card
            title="About Our Videos"
            style={styles.infoCard}
          >
            <Text style={styles.infoText}>
              Our video collection features high-quality content that demonstrates
              our products and services. Tap on any thumbnail to watch.
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
  },
  featuredVideoContainer: {
    marginBottom: 24,
  },
  featuredTitle: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 4,
  },
  videoTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    color: '#1F2937',
    marginBottom: 12,
  },
  videoPlayer: {
    width: '100%',
    borderRadius: 12,
    overflow: 'hidden',
  },
  sectionTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    color: '#1F2937',
    marginBottom: 16,
  },
  videoList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  videoItem: {
    width: '48%',
    marginBottom: 16,
  },
  selectedVideoItem: {
    opacity: 0.7,
  },
  thumbnailContainer: {
    marginBottom: 8,
  },
  thumbnail: {
    width: '100%',
    aspectRatio: 16 / 9,
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: '#E5E7EB',
    position: 'relative',
  },
  thumbnailImage: {
    width: '100%',
    height: '100%',
  },
  playIconOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
  },
  playIcon: {
    width: 0,
    height: 0,
    borderStyle: 'solid',
    borderLeftWidth: 12,
    borderRightWidth: 0,
    borderBottomWidth: 8,
    borderTopWidth: 8,
    borderLeftColor: '#FFFFFF',
    borderRightColor: 'transparent',
    borderBottomColor: 'transparent',
    borderTopColor: 'transparent',
    marginLeft: 4,
  },
  videoItemTitle: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#1F2937',
  },
  selectedVideoItemTitle: {
    color: '#0A84FF',
  },
  infoCard: {
    marginBottom: 24,
  },
  infoText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#4B5563',
    lineHeight: 21,
  },
});