import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Slot, useSegments, router } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import 'react-native-reanimated';
import SplashScreenComponent from '../components/SplashScreen';
import { useColorScheme } from '../hooks/useColorScheme'; // Adjust path as needed
import { AuthProvider, useAuth } from '../context/AuthContext';

SplashScreen.preventAutoHideAsync();

function RootLayoutNav({ colorScheme }: { colorScheme: 'light' | 'dark' }) {
  const { user } = useAuth(); // Remove isLoading if your AuthContext doesn't have it
  const segments = useSegments();
  
  useEffect(() => {
    console.log('User:', user);
    console.log('Segments:', segments);
    
    const inAuthGroup = segments[0] === '(auth)';
    
    if (!user && !inAuthGroup) {
      console.log('Redirecting to login');
      router.replace('/(auth)/login');
    } else if (user && inAuthGroup) {
      console.log('Redirecting to tabs');
      router.replace('/(tabs)');
    }
  }, [user, segments]);

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Slot />
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}

export default function RootLayout() {
  const colorScheme = useColorScheme();
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

  return (
    <AuthProvider>
      <RootLayoutNav colorScheme={colorScheme ?? 'light'} />
    </AuthProvider>
  );
}