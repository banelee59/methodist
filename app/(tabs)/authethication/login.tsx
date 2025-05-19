import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Modal,
  TextInput,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as Progress from 'react-native-progress';
import { Ionicons } from '@expo/vector-icons';

export default function HomeScreen() {
  const [showLoginMenu, setShowLoginMenu] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const totalDays = 365;
  const currentDay = 120;
  const chaptersRead = 120;
  const timeSpent = '3h 45m';
  const progress = currentDay / totalDays;
  const daysRemaining = totalDays - currentDay;

  const verseText =
    'For I know the plans I have for you, declares the Lord, plans to prosper you and not to harm you, plans to give you hope and a future.';
  const verseRef = 'Jeremiah 29:11';

  const hymnLyrics = `Amazing grace! how sweet the sound
That saved a wretch like me!
I once was lost, but now am found,
Was blind, but now I see.`;

  const handleLogin = () => {
    console.log('Logging in with:', email, password);
    setShowLoginModal(false);
    setEmail('');
    setPassword('');
  };

  const handleSignup = () => {
    console.log('Signing up with:', email, password);
    setShowSignupModal(false);
    setEmail('');
    setPassword('');
  };

  return (
    <SafeAreaView style={styles.screen} edges={['top']}>
      <ScrollView>
        {/* Header */}
        <View style={styles.headerContainer}>
          <View style={styles.headerTopRow}>
            <Text style={styles.headerTitle}>Dashboard</Text>
            <View style={styles.iconRow}>
              <TouchableOpacity onPress={() => console.log('Notifications')}>
                <Ionicons
                  name="notifications-outline"
                  size={24}
                  color="#fff"
                  style={styles.icon}
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setShowLoginMenu((prev) => !prev)}>
                <Ionicons
                  name="person-circle-outline"
                  size={26}
                  color="#fff"
                  style={styles.icon}
                />
              </TouchableOpacity>
            </View>
          </View>
          <Text style={styles.headerSubtitle}>Through the Bible in a Year</Text>
          <Text style={styles.headerSubtitle}>
            Day {currentDay} of {totalDays}
          </Text>

          {/* Login Menu */}
          {showLoginMenu && (
            <View style={styles.loginMenu}>
              <TouchableOpacity onPress={() => { setShowLoginModal(true); setShowLoginMenu(false); }}>
                <Text style={styles.loginMenuItem}>Login</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => { setShowSignupModal(true); setShowLoginMenu(false); }}>
                <Text style={styles.loginMenuItem}>Sign Up</Text>
              </TouchableOpacity>
            </View>
          )}
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
          <Text style={styles.progressText}>{Math.round(progress * 100)}% completed</Text>

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
      </ScrollView>

      {/* Login Modal */}
      <Modal visible={showLoginModal} animationType="slide" transparent>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Login</Text>
            <TextInput
              style={styles.input}
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            <TextInput
              style={styles.input}
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
            <TouchableOpacity style={styles.button} onPress={handleLogin}>
              <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setShowLoginModal(false)}>
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Signup Modal */}
      <Modal visible={showSignupModal} animationType="slide" transparent>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Sign Up</Text>
            <TextInput
              style={styles.input}
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            <TextInput
              style={styles.input}
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
            <TouchableOpacity style={styles.button} onPress={handleSignup}>
              <Text style={styles.buttonText}>Sign Up</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setShowSignupModal(false)}>
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
  },
  icon: {
    marginLeft: 16,
  },
  headerSubtitle: {
    color: '#fff',
    fontSize: 14,
    marginTop: 4,
  },
  loginMenu: {
    backgroundColor: '#fff',
    position: 'absolute',
    top: 60,
    right: 20,
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    zIndex: 10,
  },
  loginMenuItem: {
    paddingVertical: 8,
    fontSize: 14,
    color: '#E83C2F',
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
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    padding: 20,
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 24,
    borderRadius: 12,
    elevation: 10,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#E83C2F',
    marginBottom: 16,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 8,
    marginBottom: 12,
  },
  button: {
    backgroundColor: '#E83C2F',
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 4,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  cancelText: {
    marginTop: 12,
    textAlign: 'center',
    color: '#E83C2F',
  },
});
