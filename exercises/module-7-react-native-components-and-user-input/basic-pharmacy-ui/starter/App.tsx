/**
 * @fileoverview Basic Pharmacy UI Layout Exercise - Starter Code
 * @author React Native Training Course
 * @created 2023-07-01
 */

import React, { useState } from 'react';
import { View, Text, Image, ScrollView, Pressable, StyleSheet, SafeAreaView } from 'react-native';

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
 * Sample medication data for the exercise
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
 * This component displays detailed information about a medication.
 * 
 * Exercise Requirements:
 * 1. Create a header with the medication name
 * 2. Display an image of the medication
 * 3. Show basic details (dosage, form, etc.)
 * 4. Include a description section
 * 5. Add a button to add the medication to cart
 * 6. Implement a state variable to track if the item is added to cart
 * 7. When the button is pressed, update the state and change the button text
 * 
 * @returns {JSX.Element} A component that displays medication details
 */
const MedicationDetailScreen: React.FC = () => {
  // TODO: Create a state variable to track if medication is added to cart
  // Hint: Use the useState hook
  
  // TODO: Create a function to handle the "Add to Cart" button press
  // The function should update the state variable
  
  return (
    <SafeAreaView style={styles.safeArea}>
      {/* TODO: Implement a ScrollView to make the content scrollable */}
      <View style={styles.container}>
        {/* TODO: Implement the header with medication name */}
        
        {/* TODO: Display the medication image
            Hint: Use the Image component with the medicationData.imageUrl */}
        
        {/* TODO: Show the basic details (dosage, form, manufacturer)
            Hint: Create a section with multiple Text components */}
        
        {/* TODO: Add the description section */}
        
        {/* TODO: Add directions for use */}
        
        {/* TODO: Implement the "Add to Cart" button
            Hint: Use the Pressable component with onPress handler */}
        
      </View>
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
  container: {
    flex: 1,
    padding: 16,
  },
  // TODO: Add additional styles for your components
  // Consider adding styles for:
  // - header
  // - image
  // - details section
  // - description
  // - button
});

/**
 * Main App Component
 * @returns {JSX.Element} The main app component
 */
const App: React.FC = () => {
  return <MedicationDetailScreen />;
}

export default App;