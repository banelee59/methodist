import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';



import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors['light'].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            // Use a transparent background on iOS to show the blur effect
            position: 'absolute',
          },
          default: {},
        }),
      }}>

import { Ionicons } from '@expo/vector-icons';

<Tabs.Screen
  name="language"
  options={{
    title: 'Language',
    tabBarIcon: ({ color }) => (
      <Ionicons name="language" size={28} color={color} />
    ),
  }}
/>


      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
        }}
      />


      <Tabs.Screen
          name="music"
          options={{
            title: 'Music',
            tabBarIcon: ({ color }) => (
              <Ionicons name="musical-notes" size={28} color={color} />
            ),
          }}
        />

import { Ionicons } from '@expo/vector-icons';

<Tabs.Screen
  name="settings"
  options={{
    title: 'Settings',
    tabBarIcon: ({ color }) => (
      <Ionicons name="settings-outline" size={28} color={color} />
    ),
  }}
/>



     

      <Tabs.Screen
        name="explore"
        options={{
          title: 'Explore',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="paperplane.fill" color={color} />,
        }}
      />


   
    </Tabs>
  );
}
