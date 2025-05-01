import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  TouchableOpacity,
  Dimensions,
  Modal,
  Pressable,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { GALLERY_IMAGES } from '@/constants/MockData';
import Animated, { FadeIn, FadeInDown } from 'react-native-reanimated';
import { X } from 'lucide-react-native';

const { width } = Dimensions.get('window');
const numColumns = 2;
const gap = 8;
const itemWidth = (width - 32 - gap * (numColumns - 1)) / numColumns;

export default function GalleryScreen() {
  const [selectedImage, setSelectedImage] = useState<null | {
    uri: string;
    title: string;
  }>(null);

  const handleImagePress = (item: { uri: string; title: string }) => {
    setSelectedImage(item);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <Animated.View entering={FadeIn.duration(600)}>
        <Text style={styles.subtitle}>Explore our collection of images</Text>
      </Animated.View>

      <FlatList
        data={GALLERY_IMAGES}
        keyExtractor={(item) => item.id}
        numColumns={numColumns}
        columnWrapperStyle={styles.columnWrapper}
        renderItem={({ item, index }) => (
          <Animated.View
            entering={FadeInDown.duration(600).delay(100 + index * 100)}
            style={styles.imageContainer}
          >
            <TouchableOpacity
              onPress={() => handleImagePress(item)}
              activeOpacity={0.8}
            >
              <Image
                source={{ uri: item.uri }}
                style={[styles.image, { width: itemWidth, height: itemWidth }]}
              />
              <View style={styles.imageOverlay}>
                <Text style={styles.imageTitle}>{item.title}</Text>
              </View>
            </TouchableOpacity>
          </Animated.View>
        )}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
      />

      <Modal visible={!!selectedImage} transparent animationType="fade">
        <View style={styles.modalContainer}>
          <Pressable style={styles.modalBackground} onPress={closeModal}>
            <View style={styles.modalContent}>
              <Image
                source={{ uri: selectedImage?.uri }}
                style={styles.fullImage}
                resizeMode="contain"
              />
              <TouchableOpacity
                style={styles.closeButton}
                onPress={closeModal}
                hitSlop={{ top: 10, right: 10, bottom: 10, left: 10 }}
              >
                <X color="#FFFFFF" size={24} />
              </TouchableOpacity>
              <View style={styles.modalTitleContainer}>
                <Text style={styles.modalTitle}>{selectedImage?.title}</Text>
              </View>
            </View>
          </Pressable>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  subtitle: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#6B7280',
    marginTop: 8,
    marginBottom: 16,
    paddingHorizontal: 16,
  },
  list: {
    padding: 16,
    paddingTop: 8,
  },
  columnWrapper: {
    justifyContent: 'space-between',
  },
  imageContainer: {
    marginBottom: 16,
    borderRadius: 12,
    overflow: 'hidden',
    position: 'relative',
  },
  image: {
    borderRadius: 12,
  },
  imageOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    justifyContent: 'flex-end',
    padding: 12,
    borderRadius: 12,
  },
  imageTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    color: '#FFFFFF',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalBackground: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  fullImage: {
    width: '100%',
    height: '80%',
  },
  closeButton: {
    position: 'absolute',
    top: 40,
    right: 20,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalTitleContainer: {
    position: 'absolute',
    bottom: 80,
    left: 0,
    right: 0,
    padding: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    color: '#FFFFFF',
    textAlign: 'center',
  },
});