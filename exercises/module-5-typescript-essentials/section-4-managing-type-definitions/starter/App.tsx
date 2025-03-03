import React, { useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  TouchableOpacity, 
  SafeAreaView, 
  ScrollView 
} from 'react-native';

// This is a mock of an external library that we'll use in our app
// In a real scenario, this would be imported from a package
const medicationBarcodeScanner = {
  scanBarcode: (options: unknown) => {
    // This simulates a real scanner returning data after scanning
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          data: {
            code: 'NDC:12345-678-90',
            type: 'NDC',
            medication: {
              id: 'med123',
              name: 'Lisinopril',
              dosage: '10mg',
              form: 'tablet',
              manufacturer: 'PharmaCorp',
              expiryDate: '2025-12-31'
            }
          }
        });
      }, 1000);
    });
  },
  isScannerAvailable: () => true,
  configureScannerSettings: (settings: unknown) => {
    console.log('Scanner settings configured', settings);
    return true;
  }
};

// ToDo: Create type definitions for the barcode scanner library

// ToDo: Implement module augmentation to add pharmacy-specific functionality

// ToDo: Create a custom hook with proper TypeScript definitions to use the scanner

export default function App() {
  // ToDo: Use proper TypeScript typing for state
  const [scanResult, setScanResult] = useState(null);
  const [isScanning, setIsScanning] = useState(false);
  const [error, setError] = useState(null);

  // ToDo: Add proper TypeScript typing to this function
  const handleScan = async () => {
    try {
      setIsScanning(true);
      setError(null);
      
      // Calling the scanner without proper type definitions
      const result = await medicationBarcodeScanner.scanBarcode({
        scanType: 'medication',
        timeout: 30
      });
      
      setScanResult(result);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsScanning(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Medication Barcode Scanner</Text>
      
      <TouchableOpacity 
        style={styles.scanButton} 
        onPress={handleScan}
        disabled={isScanning}
      >
        <Text style={styles.scanButtonText}>
          {isScanning ? 'Scanning...' : 'Scan Medication Barcode'}
        </Text>
      </TouchableOpacity>

      <ScrollView style={styles.resultContainer}>
        {error && (
          <Text style={styles.errorText}>Error: {error}</Text>
        )}
        
        {scanResult && (
          <View>
            <Text style={styles.resultTitle}>Scan Result:</Text>
            <Text style={styles.resultText}>
              {JSON.stringify(scanResult, null, 2)}
            </Text>
          </View>
        )}
      </ScrollView>
      
      <Text style={styles.instructions}>
        Complete the ToDo items to properly integrate the barcode scanner with TypeScript!
      </Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#0066cc',
    textAlign: 'center',
  },
  scanButton: {
    backgroundColor: '#0066cc',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
  },
  scanButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  resultContainer: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    marginBottom: 20,
  },
  resultTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  resultText: {
    fontSize: 14,
    fontFamily: 'monospace',
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
  instructions: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 10,
  },
}); 