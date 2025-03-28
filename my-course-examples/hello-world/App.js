import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Constants from 'expo-constants';

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.paragraph}>
        Hello from Markdown! 👋
      </Text>
      <Text style={styles.small}>
        Expo SDK: {Constants.expoVersion}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
   small: {
    fontSize: 12,
    textAlign: 'center',
    color: 'grey',
  }
}); 