/**
 * @fileoverview Basic Pharmacy UI Layout Exercise - Completed Example
 * @author React Native Training Course
 * @created 2023-07-01
 */

import React, { useState } from 'react';
import { View, Text, Image, ScrollView, Pressable, StyleSheet, SafeAreaView, PressableProps } from 'react-native';

/**
 * Interface for medication data
 */
interface Medication {
  id: string;
  name: string;
  dosage: string;
  form: string;
  manufacturer: string;
  imageUrl: string;
  description: string;
  directions: string;
  sideEffects: string;
  price: string;
}

/**
 * Sample medication data
 */
const medicationData: Medication = {
  id: '123',
  name: 'Amoxicillin',
  dosage: '500mg',
  form: 'Capsule',
  manufacturer: 'Pharmacy Inc.',
  imageUrl: 'https://i.imgur.com/7I9Was5.png',
  description: 'Amoxicillin is a penicillin antibiotic that fights bacteria. It is used to treat many different types of infection caused by bacteria, such as tonsillitis, bronchitis, pneumonia, and infections of the ear, nose, throat, skin, or urinary tract.',
  directions: 'Take one capsule by mouth three times daily, with or without food.',
  sideEffects: 'Diarrhea, nausea, vomiting, headache, rash.',
  price: '$12.99',
};

/**
 * MedicationDetailScreen Component
 * 
 * This component displays detailed information about a medication including
 * the name, image, basic details, description, and an add to cart button.
 * 
 * @returns {JSX.Element} A component that displays medication details
 */
const MedicationDetailScreen: React.FC = () => {
  // State to track if medication is added to cart
  const [isAddedToCart, setIsAddedToCart] = useState<boolean>(false);
  
  /**
   * Handles the "Add to Cart" button press
   * Updates the isAddedToCart state
   */
  const handleAddToCart = (): void => {
    setIsAddedToCart(true);
  };
  
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.container}>
          {/* Header with medication name */}
          <Text style={styles.header}>{medicationData.name}</Text>
          
          {/* Medication image */}
          <Image 
            source={{ uri: medicationData.imageUrl }} 
            style={styles.image}
            resizeMode="contain"
          />
          
          {/* Basic details section */}
          <View style={styles.detailsContainer}>
            <Text style={styles.detailsHeader}>Details</Text>
            <View style={styles.detailsRow}>
              <Text style={styles.detailsLabel}>Dosage:</Text>
              <Text style={styles.detailsValue}>{medicationData.dosage}</Text>
            </View>
            <View style={styles.detailsRow}>
              <Text style={styles.detailsLabel}>Form:</Text>
              <Text style={styles.detailsValue}>{medicationData.form}</Text>
            </View>
            <View style={styles.detailsRow}>
              <Text style={styles.detailsLabel}>Manufacturer:</Text>
              <Text style={styles.detailsValue}>{medicationData.manufacturer}</Text>
            </View>
            <View style={styles.detailsRow}>
              <Text style={styles.detailsLabel}>Price:</Text>
              <Text style={styles.detailsValue}>{medicationData.price}</Text>
            </View>
          </View>
          
          {/* Description section */}
          <View style={styles.section}>
            <Text style={styles.sectionHeader}>Description</Text>
            <Text style={styles.sectionText}>{medicationData.description}</Text>
          </View>
          
          {/* Directions section */}
          <View style={styles.section}>
            <Text style={styles.sectionHeader}>Directions for Use</Text>
            <Text style={styles.sectionText}>{medicationData.directions}</Text>
          </View>
          
          {/* Side effects section */}
          <View style={styles.section}>
            <Text style={styles.sectionHeader}>Side Effects</Text>
            <Text style={styles.sectionText}>{medicationData.sideEffects}</Text>
          </View>
          
          {/* Add to cart button */}
          <Pressable 
            style={[
              styles.button, 
              isAddedToCart ? styles.buttonDisabled : styles.buttonEnabled
            ]}
            onPress={handleAddToCart}
            disabled={isAddedToCart}
          >
            <Text style={styles.buttonText}>
              {isAddedToCart ? 'Added to Cart' : 'Add to Cart'}
            </Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

/**
 * Styles for the MedicationDetailScreen component
 */
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollView: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
    textAlign: 'center',
  },
  image: {
    width: '100%',
    height: 200,
    marginBottom: 24,
    borderRadius: 8,
    backgroundColor: '#f9f9f9',
  },
  detailsContainer: {
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    padding: 16,
    marginBottom: 24,
  },
  detailsHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#333',
  },
  detailsRow: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  detailsLabel: {
    flex: 1,
    fontWeight: '600',
    color: '#555',
  },
  detailsValue: {
    flex: 2,
    color: '#333',
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  sectionText: {
    fontSize: 16,
    lineHeight: 24,
    color: '#444',
  },
  button: {
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 32,
  },
  buttonEnabled: {
    backgroundColor: '#007AFF',
  },
  buttonDisabled: {
    backgroundColor: '#4CAF50',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

/**
 * Main App Component
 * @returns {JSX.Element} The main app component
 */
const App: React.FC = () => {
  return <MedicationDetailScreen />;
}

export default App;