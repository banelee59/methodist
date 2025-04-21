import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

// SplashScreenComponent to display while loading
export default function SplashScreenComponent() {
  return (
    <View style={styles.splashContainer}>
      <Text style={styles.splashText}>Loading...</Text>
      {/* You can add your logo or other elements here */}
    </View>
  );
}

// Styles for the splash screen
const styles = StyleSheet.create({
  splashContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000', // Change to your desired background color
  },
  splashText: {
    color: '#fff', // Change to your desired text color
    fontSize: 24,
    marginTop: 16,
  },
});