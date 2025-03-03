import React from 'react';
import { 
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator
} from 'react-native';

// TODO: Create proper prop interface for this component
const ScannerButton = ({ onPress, isLoading }) => {
  return (
    <TouchableOpacity 
      style={styles.button}
      onPress={onPress}
      disabled={isLoading}
    >
      {isLoading ? (
        <ActivityIndicator color="#ffffff" />
      ) : (
        <Text style={styles.buttonText}>Scan Medication</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#2196f3',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  }
});

export default ScannerButton; 