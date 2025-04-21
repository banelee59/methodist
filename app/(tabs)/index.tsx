import { StyleSheet, Text } from 'react-native';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.screen} edges={['top']}>
      <View style={styles.mainContainer}>
        <Text style={styles.title}>Dashboard</Text>
        <Text style={styles.subtitle}>Through the Bible in a Year</Text>
        <Text style={styles.subtitle}>365 days</Text>
      </View>

      {/* Rest of your dashboard content below */}
      <View style={styles.contentContainer}>
        {/* Add additional content here */}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#ED1B24', // red from the top
  },
  mainContainer: {
    padding: 20,
    backgroundColor: '#ED1B24',
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    height: 180,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  title: {
    color: '#ffffff',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    color: '#ffffff',
    fontSize: 16,
    marginBottom: 4,
  },
  contentContainer: {
    flex: 1,
    backgroundColor: '#fff', // white below the red rounded area
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 16,
  },
});
