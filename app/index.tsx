import React, { useEffect, useCallback } from 'react';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import { Redirect, SplashScreen } from 'expo-router';
import { useAuth } from '@/hooks/useAuth';

// Keep the splash screen visible while we check the auth state
SplashScreen.preventAutoHideAsync();

export default function AuthCheck() {
  const { user, isLoading } = useAuth();

  const onLayoutRootView = useCallback(async () => {
    if (!isLoading) {
      await SplashScreen.hideAsync();
    }
  }, [isLoading]);

  useEffect(() => {
    if (!isLoading) {
      SplashScreen.hideAsync();
    }
  }, [isLoading]);

  if (isLoading) {
    return (
      <View style={styles.container} onLayout={onLayoutRootView}>
        <ActivityIndicator size="large" color="#0A84FF" />
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  // If the user is authenticated, redirect to the main app
  // Otherwise, redirect to the sign-in page
  return user ? <Redirect href="/(tabs)" /> : <Redirect href="/sign-in" />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#6B7280',
  },
});