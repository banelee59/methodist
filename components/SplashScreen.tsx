import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

// SplashScreenComponent to display while loading
export default function SplashScreenComponent() {
  return (
    <View style={styles.splashContainer}>
      <Image 
        source={require('../assets/images/methodist.jpeg')} // Adjust the path as necessary
        style={styles.splashImage} 
        resizeMode="cover" // Use cover to fill the space while maintaining aspect ratio
      />
      <Text style={styles.splashText}>Loading...</Text>
      {/* You can add your logo or other elements here */}
    </View>
  );
}

const styles = StyleSheet.create({
  splashContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000', // Change to your desired background color
  },
  splashImage: {
    width: '100%', // Set width to 100% to fill the container
    height: '100%', // Set height to 100% to fill the container
    position: 'absolute', // Position absolute to layer behind other elements
  },
  splashText: {
    color: '#fff', // Change to your desired text color
    fontSize: 24,
    zIndex: 1, // Ensure text is above the image
  },
});