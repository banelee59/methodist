import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  FlatList,
  SafeAreaView,
  TextInput,
} from 'react-native';
import { Feather } from '@expo/vector-icons';

type IconType = 'map-pin' | 'users' | 'calendar' | 'square';

interface HymnItem {
  id: string;
  title: string;
  artist: string;
  subtitle?: string;
  image: string;
  icon: IconType;
  rating?: string;
  number?: string;
  type: string;
}

interface Tab {
  id: string;
  label: string;
  active: boolean;
}

const hymnsData: HymnItem[] = [
  {
    id: '1',
    title: 'Morning Devotions',
    artist: 'Erookoh Handen',
    subtitle: 'Tty lollus',
    image: 'https://via.placeholder.com/80',
    icon: 'map-pin',
    rating: '4',
    type: 'featured',
  },
  {
    id: '2',
    title: 'Joursteme',
    artist: 'Rfromam Parilists',
    subtitle: 'Lalin',
    number: '2',
    image: 'https://via.placeholder.com/80',
    icon: 'users',
    type: 'featured',
  },
  {
    id: '3',
    title: 'Hyms',
    artist: 'Buttii Cuilds',
    number: '6',
    image: 'https://via.placeholder.com/80',
    icon: 'calendar',
    type: 'featured',
  },
  {
    id: '4',
    title: 'Hymns',
    artist: 'Artist Name',
    number: '',
    image: 'https://via.placeholder.com/80',
    icon: 'square',
    type: 'featured',
  },
];

const tabs: Tab[] = [
  { id: 'angin', label: 'Angin', active: true },
  { id: 'dose', label: 'Dose', active: true },
  { id: 'elvenese', label: 'Elvenese', active: true },
];

export default function MethodistMusicScreen() {
  const [activeTab, setActiveTab] = useState<string>('angin');
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [searchText, setSearchText] = useState<string>('');

  // Filter hymns based on search text
  const filteredHymns = useMemo(() => {
    if (!searchText.trim()) {
      return hymnsData;
    }

    const searchLower = searchText.toLowerCase().trim();
    
    return hymnsData.filter((hymn) => {
      // Search by title
      const titleMatch = hymn.title.toLowerCase().includes(searchLower);
      
      // Search by artist
      const artistMatch = hymn.artist.toLowerCase().includes(searchLower);
      
      // Search by subtitle
      const subtitleMatch = hymn.subtitle?.toLowerCase().includes(searchLower);
      
      // Search by number (exact match or partial match)
      const numberMatch = hymn.number?.includes(searchText.trim());
      
      return titleMatch || artistMatch || subtitleMatch || numberMatch;
    });
  }, [searchText]);

  const renderIcon = (iconType: IconType): JSX.Element => {
    const colors: Record<IconType, string> = {
      'map-pin': '#666',
      users: '#E7542E',
      calendar: '#337ab7',
      square: '#666',
    };
    return <Feather name={iconType} size={20} color={colors[iconType]} />;
  };

  const renderItem = ({ item }: { item: HymnItem }) => (
    <View style={styles.card}>
      {/* Local Logo Image */}
      <Image
        source={require('@/assets/images/logo.jpeg')}
        style={styles.logo}
        resizeMode="contain"
      />

      {/* Remote hymn image */}
      <Image source={{ uri: item.image }} style={styles.image} />

      <View style={styles.cardText}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.artist}>{item.artist}</Text>
        {item.subtitle && <Text style={styles.subtitle}>{item.subtitle}</Text>}
        {item.rating && (
          <View style={styles.metaRow}>
            <Text style={styles.rating}>Rating: {item.rating}</Text>
            <Text style={styles.metaText}>1.1 | tome</Text>
          </View>
        )}
        {item.number && (
          <View style={styles.metaRow}>
            <Text style={styles.rating}>#{item.number}</Text>
          </View>
        )}
      </View>
      <View>{renderIcon(item.icon)}</View>
    </View>
  );

  const clearSearch = () => {
    setSearchText('');
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => setMenuOpen(!menuOpen)}>
          <Feather name="menu" size={24} color="#333" />
        </TouchableOpacity>
        <View style={{ alignItems: 'center' }}>
          <Text style={styles.headerTitle}>Methodist</Text>
          <Text style={styles.headerSubtitle}>Counties</Text>
        </View>
        <Text style={styles.plusSign}>+</Text>
      </View>

      {/* Hamburger menu options */}
      {menuOpen && (
        <View style={styles.menuOptions}>
          <TouchableOpacity style={styles.menuItem} onPress={() => alert('Home pressed')}>
            <Text style={styles.menuText}>Home</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem} onPress={() => alert('Favorites pressed')}>
            <Text style={styles.menuText}>Favorites</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem} onPress={() => alert('Settings pressed')}>
            <Text style={styles.menuText}>Library</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem} onPress={() => setMenuOpen(false)}>
            <Text style={[styles.menuText, { color: '#E7542E' }]}>Close Menu</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Feather name="search" size={20} color="#999" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search hymns by name or number..."
            placeholderTextColor="#999"
            value={searchText}
            onChangeText={setSearchText}
            autoCapitalize="none"
            autoCorrect={false}
          />
          {searchText.length > 0 && (
            <TouchableOpacity onPress={clearSearch} style={styles.clearButton}>
              <Feather name="x" size={18} color="#999" />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Unified Tabs - Modified to match the design in the image */}
      <View style={styles.tabsContainer}>
        <View style={styles.tabsWrapper}>
          {tabs.map((tab, index) => (
            <TouchableOpacity
              key={tab.id}
              onPress={() => setActiveTab(tab.id)}
              style={[
                styles.unifiedTab,
                index === 0 && styles.tabFirst,
                index === tabs.length - 1 && styles.tabLast,
                activeTab === tab.id && styles.activeUnifiedTab,
              ]}
            >
              <Text style={[styles.tabText, activeTab === tab.id && styles.activeTabText]}>
                {tab.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Music Header */}
      <View style={styles.musicHeader}>
        <View style={styles.musicLeft}>
          <View style={styles.musicIcon}>
            <Text style={styles.musicIconText}>∆</Text>
          </View>
          <View>
            <Text style={styles.musicTitle}>Music</Text>
            <Text style={styles.musicSubtitle}>Codliver, Devevbsar...</Text>
          </View>
        </View>
        <View style={styles.musicRight}>
          <Feather name="heart" size={20} color="#E7542E" />
          <Feather name="more-vertical" size={20} color="#999" />
        </View>
      </View>

      {/* Rating Row */}
      <View style={styles.ratingRow}>
        <Text style={styles.rating}>4</Text>
        <Text style={styles.metaText}>1.1 | tome</Text>
      </View>

      {/* Hymn List */}
      <ScrollView style={styles.list}>
        <View style={styles.sectionTitleContainer}>
          <Text style={styles.sectionTitle}>Featured</Text>
          {searchText.trim() && (
            <Text style={styles.searchResultsText}>
              {filteredHymns.length} result{filteredHymns.length !== 1 ? 's' : ''} found
            </Text>
          )}
        </View>
        
        {filteredHymns.length > 0 ? (
          <FlatList
            data={filteredHymns}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
            scrollEnabled={false}
          />
        ) : (
          <View style={styles.noResultsContainer}>
            <Feather name="search" size={48} color="#ccc" />
            <Text style={styles.noResultsText}>No hymns found</Text>
            <Text style={styles.noResultsSubtext}>
              Try searching with a different name or number
            </Text>
          </View>
        )}
        <View style={{ height: 120 }} />
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem}>
          <Feather name="skip-back" size={20} color="#555" />
          <Text style={styles.navLabel}>Previous</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.playButton}>
          <Feather name="play" size={20} color="#fff" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem}>
          <Feather name="skip-forward" size={20} color="#555" />
          <Text style={styles.navLabel}>Next</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF6F0' },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    paddingTop: 40,
    marginBottom: 16,
  },
  headerTitle: { fontSize: 20, fontWeight: 'bold', color: '#222' },
  headerSubtitle: { fontSize: 12, color: '#999' },
  plusSign: { fontSize: 28, color: '#333' },

  menuOptions: {
    backgroundColor: '#fff',
    position: 'absolute',
    top: 80,
    left: 20,
    width: 150,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    elevation: 5,
    zIndex: 100,
  },
  menuItem: {
    padding: 15,
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
  },
  menuText: {
    fontSize: 16,
    color: '#333',
  },

  // Search Bar Styles
  searchContainer: {
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 25,
    paddingHorizontal: 16,
    paddingVertical: 12,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 2,
  },
  searchIcon: {
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    paddingVertical: 0,
  },
  clearButton: {
    padding: 4,
  },

  // Modified tab styles to create unified tabs in a single container
  tabsContainer: {
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  tabsWrapper: {
    flexDirection: 'row',
    backgroundColor: '#F5F5F5',
    borderRadius: 30,
    overflow: 'hidden',
  },
  unifiedTab: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabFirst: {
    borderTopLeftRadius: 30,
    borderBottomLeftRadius: 30,
  },
  tabLast: {
    borderTopRightRadius: 30,
    borderBottomRightRadius: 30,
  },
  activeUnifiedTab: {
    backgroundColor: '#E7542E',
  },
  tabText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
  },
  activeTabText: {
    color: '#fff',
  },

  musicHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginTop: 36,
  },
  musicLeft: { flexDirection: 'row', alignItems: 'center' },
  musicIcon: {
    backgroundColor: '#E7542E',
    width: 48,
    height: 48,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  musicIconText: { color: '#fff', fontSize: 20, fontWeight: 'bold' },
  musicTitle: { fontSize: 18, fontWeight: 'bold', color: '#222' },
  musicSubtitle: { fontSize: 12, color: '#888' },
  musicRight: { flexDirection: 'row', gap: 12 },

  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 12,
    paddingHorizontal: 20,
  },
  rating: { fontSize: 12, color: '#E7542E', marginRight: 6 },
  metaText: { fontSize: 12, color: '#999' },

  sectionTitleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#222',
  },
  searchResultsText: {
    fontSize: 14,
    color: '#E7542E',
    fontWeight: '500',
  },

  list: { paddingHorizontal: 0 },

  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    marginHorizontal: 20,
    marginBottom: 16,
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 2,
  },
  logo: {
    width: 32,
    height: 32,
    borderRadius: 6,
    marginRight: 8,
  },
  image: {
    width: 64,
    height: 64,
    borderRadius: 8,
    marginRight: 12,
  },
  cardText: { flex: 1 },
  title: { fontWeight: 'bold', fontSize: 16, color: '#222' },
  artist: { fontSize: 14, color: '#777' },
  subtitle: { fontSize: 12, color: '#bbb' },
  metaRow: { flexDirection: 'row', alignItems: 'center', marginTop: 4 },

  // No Results Styles
  noResultsContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
    paddingHorizontal: 20,
  },
  noResultsText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#666',
    marginTop: 16,
    marginBottom: 8,
  },
  noResultsSubtext: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
  },

  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 16,
    backgroundColor: '#fff',
    borderTopColor: '#eee',
    borderTopWidth: 1,
  },
  navItem: { alignItems: 'center' },
  navLabel: { fontSize: 12, color: '#555', marginTop: 4 },
  playButton: {
    backgroundColor: '#E7542E',
    padding: 16,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
});