import { DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import 'react-native-reanimated';
import SplashScreenComponent from '../components/SplashScreen';
import { AuthProvider, useAuth } from '../context/AuthContext';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

// Create a separate component that uses the auth context
function AppNavigator() {
  const { user } = useAuth(); // Now this is inside the AuthProvider

  return (
    <ThemeProvider value={DefaultTheme}>
      {user ? (
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="+not-found" />
        </Stack>
      ) : (
        <Stack>
          <Stack.Screen name="Login" />
          <Stack.Screen name="Register" />
        </Stack>
      )}
      <StatusBar style="light" />
    </ThemeProvider>
  );
}

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });
  
  // State to track if we should show the custom splash screen
  const [showCustomSplash, setShowCustomSplash] = useState(true);

  useEffect(() => {
    const handleSplashScreen = async () => {
      if (loaded) {
        // Hide the default Expo splash screen
        await SplashScreen.hideAsync();
        
        // Show our custom splash screen for 5 seconds
        setTimeout(() => {
          setShowCustomSplash(false);
        }, 5000);
      }
    };
    
    handleSplashScreen();
  }, [loaded]);

  // Show nothing while fonts are loading
  if (!loaded) {
    return null;
  }
  
  // Show our custom splash screen for 5 seconds after fonts are loaded
  if (showCustomSplash) {
    return <SplashScreenComponent />;
  }

  // After 5 seconds, show the main app wrapped in AuthProvider
  return (
    <AuthProvider>
      <AppNavigator />
    </AuthProvider>
  );
}