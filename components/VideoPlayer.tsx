import React, { useState, useRef } from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Platform,
} from 'react-native';
import { Video, ResizeMode, AVPlaybackStatus } from 'expo-av';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react-native';

interface VideoPlayerProps {
  source: { uri: string };
  posterSource?: { uri: string };
  style?: any;
}

export function VideoPlayer({
  source,
  posterSource,
  style,
}: VideoPlayerProps) {
  const videoRef = useRef<Video>(null);
  const [status, setStatus] = useState<AVPlaybackStatus | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const isPlaying = status?.isLoaded ? status.isPlaying : false;
  const isMuted = status?.isLoaded ? status.isMuted : false;

  const onPlaybackStatusUpdate = (status: AVPlaybackStatus) => {
    setStatus(status);
    if (status.isLoaded && isLoading) {
      setIsLoading(false);
    }
  };

  const handlePlayPause = async () => {
    if (!videoRef.current) return;
    
    if (isPlaying) {
      await videoRef.current.pauseAsync();
    } else {
      await videoRef.current.playAsync();
    }
  };

  const handleMute = async () => {
    if (!videoRef.current || !status?.isLoaded) return;
    
    videoRef.current.setIsMutedAsync(!isMuted);
  };

  return (
    <View style={[styles.container, style]}>
      <Video
        ref={videoRef}
        style={styles.video}
        source={source}
        posterSource={posterSource}
        posterStyle={styles.poster}
        usePoster={!!posterSource}
        resizeMode={ResizeMode.CONTAIN}
        onPlaybackStatusUpdate={onPlaybackStatusUpdate}
        useNativeControls={Platform.OS !== 'web'}
      />
      
      {isLoading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#FFFFFF" />
        </View>
      )}
      
      {!isLoading && Platform.OS === 'web' && (
        <View style={styles.controls}>
          <TouchableOpacity onPress={handlePlayPause} style={styles.controlButton}>
            {isPlaying ? (
              <Pause color="#FFFFFF" size={24} />
            ) : (
              <Play color="#FFFFFF" size={24} />
            )}
          </TouchableOpacity>
          
          <TouchableOpacity onPress={handleMute} style={styles.controlButton}>
            {isMuted ? (
              <VolumeX color="#FFFFFF" size={20} />
            ) : (
              <Volume2 color="#FFFFFF" size={20} />
            )}
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
    borderRadius: 12,
    backgroundColor: '#000000',
    position: 'relative',
    aspectRatio: 16 / 9,
    width: '100%',
  },
  video: {
    width: '100%',
    height: '100%',
  },
  poster: {
    resizeMode: 'contain',
  },
  loadingContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  controls: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    padding: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  controlButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    marginRight: 12,
  },
});