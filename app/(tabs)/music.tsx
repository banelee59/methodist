import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  Image,
  TouchableOpacity,
} from 'react-native';
import { Audio } from 'expo-av';

const hymnsData = [
  {
    id: '1',
    title: 'Morning Devotions',
    artist: 'Erookoh Handen',
    image: require('@/assets/images/logo.jpeg'),
    // audio: require('@/assets/audio/morning-devotions.mp3'),
  },
  {
    id: '2',
    title: 'Joursteme',
    artist: 'Rfromam Parilists',
    // image: require('@/assets/images/joursteme.jpg'),
    // audio: require('@/assets/audio/joursteme.mp3'),
  },
  {
    id: '3',
    title: 'Hymns',
    artist: 'Butti Cuulds',
    // image: require('@/assets/images/hymns.jpg'),
    // audio: require('@/assets/audio/hymns.mp3'),
  },
  {
    id: '4',
    title: 'Heavenly Light',
    artist: 'Grace Tones',
    image: require('@/assets/images/logo.jpeg'),
    // audio: require('@/assets/audio/heavenly-light.mp3'),
  },
  {
    id: '5',
    title: 'Sacred Hope',
    artist: 'Melody Faith',
    image: require('@/assets/images/logo.jpeg'),
    // audio: require('@/assets/audio/sacred-hope.mp3'),
  },
  {
    id: '6',
    title: 'Joyful Hearts',
    artist: 'Praise Choir',
    image: require('@/assets/images/logo.jpeg'),
    // audio: require('@/assets/audio/joyful-hearts.mp3'),
  },
  {
    id: '7',
    title: 'Blessed Assurance',
    artist: 'Fanny Crosby',
    image: require('@/assets/images/logo.jpeg'),
    // audio: require('@/assets/audio/blessed-assurance.mp3'),
  },
  {
    id: '8',
    title: 'Rock of Ages',
    artist: 'Augustus Toplady',
    image: require('@/assets/images/logo.jpeg'),
    // audio: require('@/assets/audio/rock-of-ages.mp3'),
  },
  {
    id: '9',
    title: 'It Is Well',
    artist: 'Horatio Spafford',
    image: require('@/assets/images/logo.jpeg'),
    // audio: require('@/assets/audio/it-is-well.mp3'),
  },
  {
    id: '10',
    title: 'Amazing Grace',
    artist: 'John Newton',
    image: require('@/assets/images/logo.jpeg'),
    // audio: require('@/assets/audio/amazing-grace.mp3'),
  },
];

export default function MusicScreen() {
  const [search, setSearch] = useState('');
  const [playingId, setPlayingId] = useState<string | null>(null);
  const soundRef = useRef<Audio.Sound | null>(null);

  const filteredHymns = hymnsData.filter(hymn =>
    hymn.title.toLowerCase().includes(search.toLowerCase())
  );

  const playSound = async (item: any) => {
    if (soundRef.current) {
      await soundRef.current.unloadAsync();
      soundRef.current = null;
    }

    const { sound } = await Audio.Sound.createAsync(item.audio);
    soundRef.current = sound;
    setPlayingId(item.id);
    await sound.playAsync();
  };

  const stopSound = async () => {
    if (soundRef.current) {
      await soundRef.current.stopAsync();
      await soundRef.current.unloadAsync();
      soundRef.current = null;
    }
    setPlayingId(null);
  };

  useEffect(() => {
    return () => {
      stopSound();
    };
  }, []);

  const renderItem = ({ item }: any) => (
    <TouchableOpacity
      style={styles.trackItem}
      onPress={() => (item.id === playingId ? stopSound() : playSound(item))}
    >
      <Image source={item.image} style={styles.trackImage} />
      <View style={styles.trackInfo}>
        <Text style={styles.trackTitle}>{item.title}</Text>
        <Text style={styles.trackArtist}>{item.artist}</Text>
      </View>
      <Text style={styles.playText}>{item.id === playingId ? 'Pause' : 'Play'}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Hymns</Text>
      <TextInput
        style={styles.searchInput}
        placeholder="Search hymns..."
        placeholderTextColor="#999"
        value={search}
        onChangeText={setSearch}
      />
      <FlatList
        data={filteredHymns}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF6F0',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  header: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  searchInput: {
    backgroundColor: '#f1eae6',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
    fontSize: 16,
    marginBottom: 20,
    color: '#333',
  },
  listContent: {
    paddingBottom: 100,
  },
  trackItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 14,
    borderRadius: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 4,
    elevation: 1,
  },
  trackImage: {
    width: 54,
    height: 54,
    borderRadius: 10,
    marginRight: 14,
  },
  trackInfo: {
    flex: 1,
  },
  trackTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#222',
  },
  trackArtist: {
    fontSize: 14,
    color: '#999',
    marginTop: 2,
  },
  playText: {
    fontSize: 14,
    color: '#E7542E',
    fontWeight: 'bold',
  },
});
