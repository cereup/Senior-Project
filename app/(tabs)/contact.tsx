import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Modal,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TextField } from '@/components/TextField';
import { Button } from '@/components/Button';
import { Card } from '@/components/Card';
import { CONTACT_TOPICS } from '@/constants/MockData';
import { Mail, Phone, MapPin, Check } from 'lucide-react-native';
import Animated, { FadeIn, FadeInDown } from 'react-native-reanimated';

export default function ContactScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [topic, setTopic] = useState('');
  const [message, setMessage] = useState('');
  const [showTopicModal, setShowTopicModal] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  // Form validation
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [topicError, setTopicError] = useState('');
  const [messageError, setMessageError] = useState('');

  const validateForm = () => {
    let isValid = true;

    // Validate name
    if (!name.trim()) {
      setNameError('Name is required');
      isValid = false;
    } else {
      setNameError('');
    }

    // Validate email
    if (!email.trim()) {
      setEmailError('Email is required');
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError('Please enter a valid email address');
      isValid = false;
    } else {
      setEmailError('');
    }

    // Validate topic
    if (!topic) {
      setTopicError('Please select a topic');
      isValid = false;
    } else {
      setTopicError('');
    }

    // Validate message
    if (!message.trim()) {
      setMessageError('Message is required');
      isValid = false;
    } else if (message.trim().length < 10) {
      setMessageError('Message must be at least 10 characters');
      isValid = false;
    } else {
      setMessageError('');
    }

    return isValid;
  };

  const handleSubmit = () => {
    if (!validateForm()) return;

    setSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setSubmitting(false);
      setSuccess(true);
      
      // Reset form after success
      setTimeout(() => {
        setName('');
        setEmail('');
        setTopic('');
        setMessage('');
        setSuccess(false);
      }, 3000);
    }, 1500);
  };

  const selectTopic = (value: string) => {
    setTopic(value);
    setShowTopicModal(false);
  };

  const renderTopicValue = () => {
    if (!topic) return 'Select a topic';
    const selectedTopic = CONTACT_TOPICS.find(item => item.value === topic);
    return selectedTopic ? selectedTopic.label : 'Select a topic';
  };

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoidingView}
      >
        <ScrollView 
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <Animated.View entering={FadeIn.duration(600)}>
            <Text style={styles.subtitle}>
              We'd love to hear from you. Fill out the form below and we'll get back to you as soon as possible.
            </Text>
          </Animated.View>

          <Animated.View
            style={styles.contactInfo}
            entering={FadeInDown.duration(600).delay(100)}
          >
            <Card>
              <View style={styles.infoItem}>
                <Mail size={20} color="#6B7280" style={styles.infoIcon} />
                <Text style={styles.infoText}>support@example.com</Text>
              </View>
              <View style={styles.infoItem}>
                <Phone size={20} color="#6B7280" style={styles.infoIcon} />
                <Text style={styles.infoText}>(123) 456-7890</Text>
              </View>
              <View style={styles.infoItem}>
                <MapPin size={20} color="#6B7280" style={styles.infoIcon} />
                <Text style={styles.infoText}>123 Business St, City, State 12345</Text>
              </View>
            </Card>
          </Animated.View>

          <Animated.View entering={FadeInDown.duration(600).delay(200)}>
            <Text style={styles.formTitle}>Contact Form</Text>
            
            <TextField
              label="Name"
              placeholder="Enter your name"
              value={name}
              onChangeText={setName}
              error={nameError}
            />
            
            <TextField
              label="Email"
              placeholder="Enter your email address"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              error={emailError}
            />
            
            <View style={styles.topicContainer}>
              <Text style={styles.label}>Topic</Text>
              <TouchableOpacity
                style={[
                  styles.topicSelector,
                  topicError ? styles.inputError : null,
                ]}
                onPress={() => setShowTopicModal(true)}
              >
                <Text
                  style={[
                    styles.topicText,
                    !topic && styles.placeholderText,
                  ]}
                >
                  {renderTopicValue()}
                </Text>
              </TouchableOpacity>
              {topicError ? (
                <Text style={styles.errorText}>{topicError}</Text>
              ) : null}
            </View>
            
            <TextField
              label="Message"
              placeholder="Enter your message"
              value={message}
              onChangeText={setMessage}
              multiline
              numberOfLines={5}
              error={messageError}
            />
            
            <Button
              title="Submit"
              onPress={handleSubmit}
              loading={submitting}
              disabled={submitting}
              style={styles.submitButton}
            />
          </Animated.View>
        </ScrollView>
      </KeyboardAvoidingView>

      {/* Topic Selection Modal */}
      <Modal
        visible={showTopicModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowTopicModal(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setShowTopicModal(false)}
        >
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select a Topic</Text>
            {CONTACT_TOPICS.map((item) => (
              <TouchableOpacity
                key={item.value}
                style={styles.modalItem}
                onPress={() => selectTopic(item.value)}
              >
                <Text style={styles.modalItemText}>{item.label}</Text>
                {topic === item.value && (
                  <Check size={20} color="#0A84FF" />
                )}
              </TouchableOpacity>
            ))}
          </View>
        </TouchableOpacity>
      </Modal>

      {/* Success Modal */}
      <Modal
        visible={success}
        transparent
        animationType="fade"
      >
        <View style={styles.successModalOverlay}>
          <View style={styles.successModalContent}>
            <View style={styles.successIconContainer}>
              <Check size={40} color="#FFFFFF" />
            </View>
            <Text style={styles.successTitle}>Thank You!</Text>
            <Text style={styles.successMessage}>
              Your message has been sent successfully. We'll get back to you soon.
            </Text>
          </View>
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
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 32,
  },
  subtitle: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#6B7280',
    marginTop: 8,
    marginBottom: 16,
    lineHeight: 21,
  },
  contactInfo: {
    marginBottom: 24,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  infoIcon: {
    marginRight: 12,
  },
  infoText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#4B5563',
  },
  formTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    color: '#1F2937',
    marginBottom: 16,
  },
  topicContainer: {
    marginBottom: 16,
  },
  label: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    marginBottom: 8,
    color: '#1A1A1A',
  },
  topicSelector: {
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 12,
    paddingVertical: 12,
    justifyContent: 'center',
  },
  topicText: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#1A1A1A',
  },
  placeholderText: {
    color: '#9CA3AF',
  },
  inputError: {
    borderColor: '#EF4444',
  },
  errorText: {
    fontFamily: 'Inter-Regular',
    color: '#EF4444',
    fontSize: 14,
    marginTop: 4,
  },
  submitButton: {
    marginTop: 8,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    width: '90%',
    maxWidth: 400,
  },
  modalTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    color: '#1F2937',
    marginBottom: 16,
    textAlign: 'center',
  },
  modalItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  modalItemText: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#1F2937',
  },
  successModalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  successModalContent: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 24,
    width: '80%',
    maxWidth: 320,
    alignItems: 'center',
  },
  successIconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#10B981',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  successTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 20,
    color: '#1F2937',
    marginBottom: 8,
  },
  successMessage: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 21,
  },
});