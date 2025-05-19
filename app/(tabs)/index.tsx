import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Animated,
  Dimensions,
  Pressable
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as Progress from 'react-native-progress';
import { Ionicons } from '@expo/vector-icons';

const SCREEN_WIDTH = Dimensions.get('window').width;

export default function HomeScreen() {
  const [menuVisible, setMenuVisible] = useState(false);
  const translateX = useState(new Animated.Value(-SCREEN_WIDTH * 0.5))[0];

  const toggleMenu = () => {
    if (menuVisible) {
      Animated.timing(translateX, {
        toValue: -SCREEN_WIDTH * 0.5,
        duration: 300,
        useNativeDriver: true,
      }).start(() => setMenuVisible(false));
    } else {
      setMenuVisible(true);
      Animated.timing(translateX, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  };

  const totalDays = 365;
  const currentDay = 120;
  const chaptersRead = 120;
  const timeSpent = '3h 45m';
  const progress = currentDay / totalDays;
  const daysRemaining = totalDays - currentDay;

  const verseText = "For I know the plans I have for you, declares the Lord, plans to prosper you and not to harm you, plans to give you hope and a future.";
  const verseRef = "Jeremiah 29:11";

  const hymnLyrics = `Amazing grace! how sweet the sound
That saved a wretch like me!
I once was lost, but now am found,
Was blind, but now I see.`;

  return (
    <SafeAreaView style={styles.screen} edges={['top']}>
      {/* Slide-in Drawer Menu */}
      {menuVisible && (
        <Pressable style={styles.overlay} onPress={toggleMenu} />
      )}
      <Animated.View style={[styles.drawerMenu, { transform: [{ translateX }] }]}>
        <Text style={styles.drawerTitle}>Menu</Text>
        <TouchableOpacity style={styles.drawerItem} onPress={() => console.log('Login')}>
          <Text style={styles.drawerText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.drawerItem} onPress={() => console.log('Sign Up')}>
          <Text style={styles.drawerText}>Sign Up</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.drawerItem} onPress={() => console.log('Logout')}>
          <Text style={styles.drawerText}>Logout</Text>
        </TouchableOpacity>
      </Animated.View>

      {/* Header */}
      <View style={styles.headerContainer}>
        <View style={styles.headerTopRow}>
          <TouchableOpacity onPress={toggleMenu}>
            <Ionicons name="menu-outline" size={28} color="#fff" />
          </TouchableOpacity>
          
          <View style={styles.iconRow}>
            <TouchableOpacity onPress={() => console.log('Notifications')}>
              <Ionicons name="notifications-outline" size={24} color="#fff" style={styles.icon} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => console.log('Profile')}>
              <Ionicons name="person-circle-outline" size={26} color="#fff" style={styles.icon} />
            </TouchableOpacity>
          </View>
        </View>
        <Text style={styles.headerSubtitle}>Through the Bible in a Year</Text>
        <Text style={styles.headerSubtitle}>Day {currentDay} of {totalDays}</Text>
      </View>

      {/* Progress Section */}
      <View style={styles.progressContainer}>
        <Progress.Bar
          progress={progress}
          width={null}
          height={8}
          borderRadius={4}
          color="#E83C2F"
          unfilledColor="#E0E0E0"
          borderWidth={0}
        />
        <Text style={styles.progressText}>
          {Math.round(progress * 100)}% completed
        </Text>

        {/* Stats */}
        <View style={styles.statsBar}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{timeSpent}</Text>
            <Text style={styles.statLabel}>Time Spent</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{chaptersRead}</Text>
            <Text style={styles.statLabel}>Chapters</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{daysRemaining}</Text>
            <Text style={styles.statLabel}>Days Left</Text>
          </View>
        </View>
      </View>

      {/* Content */}
      <View style={styles.contentContainer}>
        <Text style={styles.sectionTitle}>Coming Soon</Text>
        <Text style={styles.sectionSubtitle}>Daily Readings • Reminders • Milestones</Text>

        {/* Verse of the Day */}
        <View style={styles.verseContainer}>
          <Text style={styles.verseTitle}>Verse of the Day</Text>
          <Text style={styles.verseText}>"{verseText}"</Text>
          <Text style={styles.verseRef}>— {verseRef}</Text>
        </View>

        {/* Hymn of the Day */}
        <View style={styles.hymnContainer}>
          <Text style={styles.hymnTitle}>Hymn of the Day</Text>
          <Text style={styles.hymnLyrics}>{hymnLyrics}</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#E83C2F',
  },
  headerContainer: {
    backgroundColor: '#E83C2F',
    paddingHorizontal: 20,
    paddingBottom: 20,
    paddingTop: 10,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    position: 'relative',
  },
  headerTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#fff',
  },
  iconRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginLeft: 16,
  },
  headerSubtitle: {
    color: '#fff',
    fontSize: 14,
    marginTop: 4,
  },
  progressContainer: {
    marginTop: 20,
    marginHorizontal: 16,
    alignItems: 'center',
  },
  progressText: {
    marginTop: 8,
    fontSize: 14,
    color: '#ffffff',
  },
  statsBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 16,
    width: '100%',
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  statLabel: {
    fontSize: 12,
    color: '#ffffff',
  },
  contentContainer: {
    flex: 1,
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 16,
    marginTop: 24,
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#E83C2F',
    marginBottom: 4,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: '#6A6A6A',
    marginBottom: 16,
  },
  verseContainer: {
    backgroundColor: '#F5F5F5',
    padding: 16,
    borderRadius: 12,
    marginTop: 8,
    alignItems: 'center',
    width: '100%',
  },
  verseTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#E83C2F',
    marginBottom: 8,
  },
  verseText: {
    fontSize: 14,
    fontStyle: 'italic',
    color: '#333333',
    textAlign: 'center',
    marginBottom: 8,
  },
  verseRef: {
    fontSize: 13,
    color: '#555',
  },
  hymnContainer: {
    backgroundColor: '#F5F5F5',
    padding: 16,
    borderRadius: 12,
    marginTop: 16,
    alignItems: 'center',
    width: '100%',
  },
  hymnTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#E83C2F',
    marginBottom: 8,
  },
  hymnLyrics: {
    fontSize: 14,
    color: '#333',
    textAlign: 'center',
    lineHeight: 22,
  },
  drawerMenu: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    width: SCREEN_WIDTH * 0.5,
    backgroundColor: '#fff',
    paddingTop: 60,
    paddingHorizontal: 16,
    zIndex: 20,
    elevation: 10,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 10,
    shadowOffset: { width: 2, height: 2 },
  },
  overlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.3)',
    zIndex: 10,
  },
  drawerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 24,
    color: '#E83C2F',
  },
  drawerItem: {
    paddingVertical: 12,
  },
  drawerText: {
    fontSize: 16,
    color: '#333',
  },
});
