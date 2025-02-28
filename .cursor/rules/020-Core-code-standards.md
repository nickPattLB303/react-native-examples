---
name: "Code Standards and Examples"
version: "1.0"
description: "defines the standards for all code examples, exercises, challenges, and projects in the React Native training course"
priority: "high"
type: "Core"
globs: 
  - "**/*.js"
  - "**/*.jsx"
  - "**/*.ts"
  - "**/*.tsx"
  - "**/*.html"
triggers:
  - file_change
  - file_open
alwaysApply: true
---

# Code Standards and Examples

[README.md](mdc:README.md)
[README.md](mdc:docs/README.md)
[Cursor Rules README](mdc:.cursor/README.md)


## Description
This rule defines the standards for all code examples, exercises, challenges, and projects in the React Native training course.

## Rule
- All code must follow the medication/pharmacy/orders theme:
  - Use relevant variable names (e.g., `medication`, `prescription`, `pharmacy`)
  - Create examples that model real-world pharmacy scenarios
  - Use consistent domain terminology throughout

- All code must include comprehensive JSDoc documentation:
  - File headers with description, author, and date
  - Function documentation with parameters, return values, and examples
  - Class documentation with description and usage examples
  - Component documentation with props and state descriptions

- Platform-specific code must be clearly marked and explained:
  ```javascript
  // iOS-specific implementation
  if (Platform.OS === 'ios') {
    // Implementation with explanation of iOS-specific behavior
  }
  // Android-specific implementation
  else if (Platform.OS === 'android') {
    // Implementation with explanation of Android-specific behavior
  }
  ```

- Exercise and challenge structure:
  - Exercises (15-30 minutes): End of each section
  - Challenges (30-60 minutes): End of each module
  - Capstone project: Final week of training

- Code platform usage:
  - HTML, CSS, JavaScript, React: CodePen
  - React Native: Expo Snack
  - Analysis Exercises: Microsoft Forms
  - Diagramming Exercises: Microsoft Whiteboard
  - Challenges: Pre-made branches in the repository

- React Native setup:
  - Use Expo Go setup as described in Expo documentation
  - Additional tools introduced on a case-by-case basis

## Examples
- Proper JSDoc documentation:
  ```javascript
  /**
   * @fileoverview Component for displaying a list of medications
   * @author Training Course Author
   * @created 2023-05-01
   */

  /**
   * Calculates the dosage based on patient weight and medication concentration
   * @param {number} weight - Patient weight in kg
   * @param {number} concentration - Medication concentration in mg/ml
   * @returns {number} The calculated dosage in ml
   * @example
   * // Returns 2.5
   * calculateDosage(50, 20)
   */
  function calculateDosage(weight, concentration) {
    return weight * 0.001 * concentration;
  }
  ```

- Improper JSDoc documentation:
  ```javascript
  // Function to calculate dosage
  function calculateDosage(weight, concentration) {
    return weight * 0.001 * concentration;
  }
  ```

- Proper themed example:
  ```javascript
  const medications = [
    { id: 1, name: 'Amoxicillin', dosage: '500mg', frequency: '3x daily' },
    { id: 2, name: 'Lisinopril', dosage: '10mg', frequency: '1x daily' },
    { id: 3, name: 'Metformin', dosage: '1000mg', frequency: '2x daily' }
  ];

  function MedicationList({ medications }) {
    return (
      <FlatList
        data={medications}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <MedicationItem 
            name={item.name}
            dosage={item.dosage}
            frequency={item.frequency}
          />
        )}
      />
    );
  }
  ```

- Proper React Native component with JSDoc and platform-specific handling:
  ```javascript
  /**
   * @fileoverview Component for displaying pharmacy inventory with platform-specific UI adaptations
   * @author Training Course Author
   * @created 2023-05-05
   */

  import React, { useState, useEffect } from 'react';
  import { View, Text, FlatList, StyleSheet, Platform } from 'react-native';
  import { fetchInventory } from '../api/pharmacyService';

  /**
   * Component to display the pharmacy inventory with counts and status
   * Adapts UI based on platform-specific design guidelines
   * 
   * @param {Object} props Component properties
   * @param {string} props.pharmacyId Unique identifier for the pharmacy location
   * @param {boolean} props.showLowStock Whether to highlight items with low stock
   * @param {Function} props.onItemSelect Callback when inventory item is selected
   * @returns {React.ReactElement} Pharmacy inventory component
   */
  export default function PharmacyInventory({ pharmacyId, showLowStock, onItemSelect }) {
    const [inventory, setInventory] = useState([]);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
      // Fetch inventory data
      fetchInventory(pharmacyId)
        .then(data => {
          setInventory(data);
          setLoading(false);
        })
        .catch(error => {
          console.error('Failed to load inventory:', error);
          setLoading(false);
        });
    }, [pharmacyId]);

    // Platform-specific rendering for medication items
    const renderMedicationItem = ({ item }) => {
      // iOS-specific implementation
      if (Platform.OS === 'ios') {
        // iOS uses SF Symbols and follows iOS design guidelines
        return (
          <View style={[styles.medicationItem, styles.iosMedicationItem]}>
            <Text style={styles.medicationName}>{item.name}</Text>
            <Text style={styles.dosageText}>{item.dosage}</Text>
            <Text style={item.count < 10 ? styles.lowStockText : styles.stockText}>
              {item.count} in stock
            </Text>
          </View>
        );
      }
      // Android-specific implementation 
      else if (Platform.OS === 'android') {
        // Android uses Material Design components and elevation
        return (
          <View style={[styles.medicationItem, styles.androidMedicationItem]}>
            <Text style={styles.medicationName}>{item.name}</Text>
            <View style={styles.detailsRow}>
              <Text style={styles.dosageText}>{item.dosage}</Text>
              <Text 
                style={[
                  styles.stockBadge,
                  item.count < 10 ? styles.lowStockBadge : styles.normalStockBadge
                ]}
              >
                {item.count}
              </Text>
            </View>
          </View>
        );
      }
      // Web or other platforms
      else {
        return (
          <View style={styles.medicationItem}>
            <Text style={styles.medicationName}>{item.name}</Text>
            <Text style={styles.dosageText}>{item.dosage}</Text>
            <Text>{item.count} in stock</Text>
          </View>
        );
      }
    };

    return (
      <View style={styles.container}>
        <Text style={styles.header}>Pharmacy Inventory</Text>
        {loading ? (
          <Text>Loading inventory...</Text>
        ) : (
          <FlatList
            data={inventory}
            keyExtractor={item => item.id.toString()}
            renderItem={renderMedicationItem}
            contentContainerStyle={styles.listContainer}
          />
        )}
      </View>
    );
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#f5f5f5',
    },
    header: {
      fontSize: 24,
      fontWeight: 'bold',
      padding: 16,
      textAlign: 'center',
    },
    listContainer: {
      padding: 8,
    },
    medicationItem: {
      marginBottom: 12,
      padding: 16,
      backgroundColor: 'white',
      borderRadius: 8,
    },
    // iOS-specific styles
    iosMedicationItem: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.2,
      shadowRadius: 2,
    },
    // Android-specific styles
    androidMedicationItem: {
      elevation: 3,
    },
    medicationName: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 4,
    },
    dosageText: {
      fontSize: 16,
      color: '#666',
    },
    lowStockText: {
      color: 'red',
      fontWeight: 'bold',
    },
    stockText: {
      color: 'green',
    },
    detailsRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: 8,
    },
    stockBadge: {
      paddingHorizontal: 8,
      paddingVertical: 4,
      borderRadius: 12,
      color: 'white',
      fontSize: 12,
      fontWeight: 'bold',
    },
    lowStockBadge: {
      backgroundColor: '#D32F2F',
    },
    normalStockBadge: {
      backgroundColor: '#2E7D32',
    },
  });
  ``` 