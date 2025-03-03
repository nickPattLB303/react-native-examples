import React, { useState, useEffect } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  TouchableOpacity, 
  SafeAreaView, 
  ScrollView,
  ActivityIndicator
} from 'react-native';

// Import our types
import type { 
  ScanResult, 
  PharmacyScanResult, 
  ScanOptions 
} from 'medication-barcode-scanner';

// Import our custom hook
import { useBarcodeScanner, ScannerState } from './hooks/useBarcodeScanner';

// This is a mock of an external library that we'll use in our app
// In a real scenario, this would be imported from a package
// We're defining it here so the app works in the exercise
const medicationBarcodeScanner = {
  scanBarcode: (options: ScanOptions) => {
    // This simulates a real scanner returning data after scanning
    return new Promise<ScanResult>((resolve) => {
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

// Make it available globally for our hook to use
(window as any).medicationBarcodeScanner = medicationBarcodeScanner;

/**
 * Component to display a medication scan result
 */
interface ScanResultDisplayProps {
  result: ScanResult | PharmacyScanResult;
}

const ScanResultDisplay: React.FC<ScanResultDisplayProps> = ({ result }) => {
  const medication = result.data.medication;
  
  return (
    <View style={styles.resultCard}>
      <Text style={styles.resultTitle}>Scan Result:</Text>
      
      <View style={styles.resultRow}>
        <Text style={styles.resultLabel}>Barcode:</Text>
        <Text style={styles.resultValue}>{result.data.code}</Text>
      </View>
      
      <View style={styles.resultRow}>
        <Text style={styles.resultLabel}>Type:</Text>
        <Text style={styles.resultValue}>{result.data.type}</Text>
      </View>
      
      <View style={styles.medicationSection}>
        <Text style={styles.sectionTitle}>Medication Details</Text>
        
        <View style={styles.resultRow}>
          <Text style={styles.resultLabel}>Name:</Text>
          <Text style={styles.resultValue}>{medication.name}</Text>
        </View>
        
        <View style={styles.resultRow}>
          <Text style={styles.resultLabel}>Dosage:</Text>
          <Text style={styles.resultValue}>{medication.dosage}</Text>
        </View>
        
        <View style={styles.resultRow}>
          <Text style={styles.resultLabel}>Form:</Text>
          <Text style={styles.resultValue}>{medication.form}</Text>
        </View>
        
        <View style={styles.resultRow}>
          <Text style={styles.resultLabel}>Manufacturer:</Text>
          <Text style={styles.resultValue}>{medication.manufacturer}</Text>
        </View>
        
        {medication.expiryDate && (
          <View style={styles.resultRow}>
            <Text style={styles.resultLabel}>Expires:</Text>
            <Text style={styles.resultValue}>{medication.expiryDate}</Text>
          </View>
        )}
        
        {/* Display pharmacy-specific fields if available */}
        {'isControlled' in medication && medication.isControlled && (
          <View style={[styles.resultRow, styles.controlledMed]}>
            <Text style={styles.resultLabel}>Controlled:</Text>
            <Text style={styles.resultValue}>
              Schedule {medication.schedule || 'Unknown'}
            </Text>
          </View>
        )}
      </View>
    </View>
  );
};

export default function App() {
  // Use our custom hook with TypeScript safety
  const {
    state,
    result,
    error,
    isAvailable,
    startScan,
    reset
  } = useBarcodeScanner({
    autoInitialize: true,
    onScanSuccess: (result) => {
      console.log('Scan successful:', result);
    },
    onScanError: (error) => {
      console.error('Scan error:', error);
    }
  });

  // Handle scan button press
  const handleScan = async (): Promise<void> => {
    // Reset any previous state
    reset();
    
    // Start a new scan with type-safe options
    await startScan({
      scanType: 'medication',
      timeout: 30,
      enableSound: true,
      barcodeTypes: ['NDC', 'RxNorm']
    });
  };

  // Get status message based on scanner state
  const getStatusMessage = (): string => {
    switch (state) {
      case 'idle':
        return 'Ready to scan';
      case 'scanning':
        return 'Scanning...';
      case 'completed':
        return 'Scan completed successfully';
      case 'error':
        return `Error: ${error?.message || 'Unknown error'}`;
      default:
        return '';
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Medication Barcode Scanner</Text>
      
      {!isAvailable && (
        <View style={styles.warningBox}>
          <Text style={styles.warningText}>
            Barcode scanner is not available on this device
          </Text>
        </View>
      )}
      
      <TouchableOpacity 
        style={[
          styles.scanButton,
          state === 'scanning' ? styles.scanningButton : {},
          !isAvailable ? styles.disabledButton : {}
        ]} 
        onPress={handleScan}
        disabled={state === 'scanning' || !isAvailable}
      >
        <Text style={styles.scanButtonText}>
          {state === 'scanning' ? 'Scanning...' : 'Scan Medication Barcode'}
        </Text>
      </TouchableOpacity>
      
      <View style={styles.statusContainer}>
        <Text style={styles.statusText}>{getStatusMessage()}</Text>
        {state === 'scanning' && <ActivityIndicator color="#0066cc" />}
      </View>

      <ScrollView style={styles.resultContainer}>
        {error && (
          <Text style={styles.errorText}>{error.message}</Text>
        )}
        
        {result && <ScanResultDisplay result={result} />}
      </ScrollView>
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
    marginBottom: 16,
  },
  scanningButton: {
    backgroundColor: '#999',
  },
  disabledButton: {
    backgroundColor: '#ccc',
  },
  scanButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    height: 30,
  },
  statusText: {
    fontSize: 16,
    color: '#444',
    marginRight: 8,
  },
  resultContainer: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    marginBottom: 20,
  },
  resultCard: {
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    padding: 16,
    marginBottom: 10,
  },
  resultTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333',
  },
  resultRow: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  resultLabel: {
    width: 120,
    fontSize: 14,
    fontWeight: 'bold',
    color: '#666',
  },
  resultValue: {
    flex: 1,
    fontSize: 14,
    color: '#333',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 8,
    color: '#444',
  },
  medicationSection: {
    marginTop: 16,
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 12,
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
  warningBox: {
    backgroundColor: '#fff3cd',
    borderColor: '#ffeeba',
    borderWidth: 1,
    padding: 12,
    borderRadius: 4,
    marginBottom: 16,
  },
  warningText: {
    color: '#856404',
    textAlign: 'center',
  },
  controlledMed: {
    backgroundColor: '#ffebee',
    padding: 8,
    borderRadius: 4,
    marginTop: 8,
  }
}); 