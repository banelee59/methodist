import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const languages = [
  { code: 'en', label: 'English' },
  { code: 'fr', label: 'Sotho' },
  { code: 'es', label: 'Xhosa' },
  { code: 'de', label: 'Zulu' },
];

export default function LanguageSelectionScreen() {
  const [selected, setSelected] = useState('en');
  const insets = useSafeAreaInsets();

  const handleSelect = (code: string) => {
    setSelected(code);
    // TODO: Persist to store or context if needed
  };

  return (
    <View
      style={[
        styles.container,
        { paddingTop: insets.top + 20, paddingBottom: insets.bottom + 20 },
      ]}
    >
      {/* Logo Image */}
      <Image
        source={require('@/assets/images/logo.jpeg')} // Replace with your actual logo path
        style={styles.logo}
        resizeMode="contain"
      />

      <Text style={styles.header}>Select Language</Text>

      <View style={styles.languageList}>
        {languages.map(lang => {
          const isSelected = selected === lang.code;

          return (
            <TouchableOpacity
              key={lang.code}
              onPress={() => handleSelect(lang.code)}
              activeOpacity={0.9}
              style={[
                styles.languageBox,
                isSelected && styles.languageBoxSelected,
              ]}
            >
              <Text
                style={[
                  styles.languageText,
                  isSelected && styles.languageTextSelected,
                ]}
              >
                {lang.label}
              </Text>
              {isSelected && (
                <Ionicons name="checkmark-circle" size={24} color="#2563EB" />
              )}
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB', // Light background
    paddingHorizontal: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 24,
  },
  header: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#111827', // Gray-900
    marginBottom: 40,
  },
  languageList: {
    width: '100%',
  },
  languageBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    borderColor: '#D1D5DB', // Gray-300
    borderWidth: 2,
    borderRadius: 16,
    paddingVertical: 16,
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  languageBoxSelected: {
    backgroundColor: '#EFF6FF', // Blue-50
    borderColor: '#2563EB',     // Blue-600
  },
  languageText: {
    fontSize: 18,
    fontWeight: '500',
    color: '#1F2937', // Gray-800
  },
  languageTextSelected: {
    color: '#2563EB', // Blue-600
    fontWeight: '600',
  },
});
