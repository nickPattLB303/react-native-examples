/**
 * Pharmacy Inventory System - TypeScript Type Definitions Exercise
 * 
 * This is the starter code for the exercise. Your goal is to implement
 * proper type definitions for the components, APIs, and third-party libraries.
 */
import React, { useState, useEffect } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  SafeAreaView, 
  FlatList, 
  TouchableOpacity 
} from 'react-native';
import MedicationItem from './components/MedicationItem';
import ScannerButton from './components/ScannerButton';
import { fetchMedications, updateInventory } from './api/inventoryApi';

// TODO: Create a types directory and add organized type definitions
// See TODOs throughout the code for specific type requirements

// TODO: Define interfaces for Medication, InventoryItem, and ScanResult

// Simulated data - will be replaced with API calls
const MEDICATIONS = [
  {
    id: "med-001",
    name: "Lisinopril",
    dosage: "10mg",
    manufacturer: "Pfizer",
    expiryDate: new Date("2024-12-31"),
    stock: 45,
    reorderPoint: 10,
    barcode: "7312345678901"
  },
  {
    id: "med-002",
    name: "Metformin",
    dosage: "500mg",
    manufacturer: "Merck",
    expiryDate: new Date("2024-10-15"),
    stock: 12,
    reorderPoint: 15,
    barcode: "7312345678902"
  },
  {
    id: "med-003",
    name: "Amlodipine",
    dosage: "5mg",
    manufacturer: "Novartis",
    expiryDate: new Date("2025-02-28"),
    stock: 30,
    reorderPoint: 10,
    barcode: "7312345678903"
  }
];

export default function App() {
  // TODO: Add proper types to state variables
  const [medications, setMedications] = useState(MEDICATIONS);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [lastScanned, setLastScanned] = useState(null);

  useEffect(() => {
    loadMedications();
  }, []);

  async function loadMedications() {
    try {
      setLoading(true);
      // TODO: Add proper typings to API response
      const data = await fetchMedications();
      setMedications(data.length > 0 ? data : MEDICATIONS);
      setError(null);
    } catch (err) {
      setError("Failed to load medications");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  // Simulated barcode scanning functionality
  // TODO: Add typing for the scanner library
  const handleScan = async () => {
    try {
      setLoading(true);
      
      // Simulating scanner library usage
      // TODO: Use your type declarations for the scanner
      const scanResult = await scanBarcode({
        cameraType: "back",
        scanMode: "pharmaceutical"
      });
      
      setLastScanned(scanResult);
      
      // Update inventory based on scan
      if (scanResult && scanResult.barcode) {
        const found = medications.find(med => med.barcode === scanResult.barcode);
        if (found) {
          // Simulate inventory update
          const updatedMedications = medications.map(med => 
            med.id === found.id 
              ? { ...med, stock: med.stock + 1 } 
              : med
          );
          setMedications(updatedMedications);
          
          // TODO: Type the API call response
          await updateInventory(found.id, { stock: found.stock + 1 });
        }
      }
    } catch (err) {
      setError("Scan failed");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // TODO: Add proper return type annotation
  const getMedicationStatus = (medication) => {
    if (medication.stock <= 0) {
      return "out-of-stock";
    } else if (medication.stock < medication.reorderPoint) {
      return "low-stock";
    } else {
      return "in-stock";
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Pharmacy Inventory System</Text>
      
      {loading && <Text style={styles.loading}>Loading...</Text>}
      {error && <Text style={styles.error}>{error}</Text>}
      
      <View style={styles.scanSection}>
        <ScannerButton onPress={handleScan} isLoading={loading} />
        {lastScanned && (
          <View style={styles.scanResult}>
            <Text>Last scanned: {lastScanned.barcode}</Text>
            <Text>Medication: {lastScanned.name || "Unknown"}</Text>
          </View>
        )}
      </View>
      
      <Text style={styles.sectionTitle}>Inventory Items</Text>
      <FlatList
        data={medications}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <MedicationItem 
            medication={item} 
            status={getMedicationStatus(item)}
          />
        )}
        ListEmptyComponent={
          <Text style={styles.emptyList}>No medications found</Text>
        }
      />
    </SafeAreaView>
  );
}

// External function to simulate a barcode scanner library
// TODO: Create proper type declarations for this in a .d.ts file
function scanBarcode(options) {
  return new Promise((resolve) => {
    // Simulate scanning
    setTimeout(() => {
      // Return a random medication from our list
      const randomIndex = Math.floor(Math.random() * MEDICATIONS.length);
      const med = MEDICATIONS[randomIndex];
      
      resolve({
        barcode: med.barcode,
        format: "EAN-13",
        name: med.name,
        timestamp: new Date().toISOString()
      });
    }, 1500);
  });
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 16,
    marginBottom: 8,
    color: '#555',
  },
  loading: {
    padding: 8,
    backgroundColor: '#e3f2fd',
    color: '#0d47a1',
    borderRadius: 4,
    marginBottom: 12,
  },
  error: {
    padding: 8,
    backgroundColor: '#ffebee',
    color: '#c62828',
    borderRadius: 4,
    marginBottom: 12,
  },
  scanSection: {
    marginVertical: 16,
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  scanResult: {
    marginTop: 12,
    padding: 8,
    backgroundColor: '#e8f5e9',
    borderRadius: 4,
  },
  emptyList: {
    padding: 20,
    textAlign: 'center',
    color: '#757575',
    fontStyle: 'italic',
  },
}); 