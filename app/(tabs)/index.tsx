import { Image, StyleSheet, Platform, Text } from 'react-native';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';


export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.mainContainer}>
      <Text style={styles.title}>
        phumlani
      </Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  mainContainer: {
    //backgroundColor: "#808080"
  },
  title: {
    color: "#ffffff"
  }
});
