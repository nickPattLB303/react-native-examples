/**
 * @fileoverview Exercise 7: Animation and Gestures Starter
 * @author React Native Training Course
 * @created 2023-05-01
 */

import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  ScrollView,
  Image,
  SafeAreaView
} from 'react-native';

/**
 * Medication detail screen without animations or gestures
 * @returns {React.ReactElement} Medication detail component
 */
export default function MedicationDetail() {
  const [expanded, setExpanded] = useState(false);
  const [liked, setLiked] = useState(false);
  
  // Medication data
  const medication = {
    id: '1',
    name: 'Amoxicillin',
    dosage: '500mg',
    schedule: '3 times daily',
    imageUrl: 'https://www.drugs.com/images/pills/nlm/006035601.jpg',
    description: 'Amoxicillin is a penicillin antibiotic that fights bacteria. It is used to treat many different types of infection caused by bacteria, such as tonsillitis, bronchitis, pneumonia, and infections of the ear, nose, throat, skin, or urinary tract.',
    sideEffects: [
      'Diarrhea',
      'Stomach upset',
      'Headache',
      'Rash',
      'Nausea',
      'Vomiting'
    ],
    instructions: 'Take this medication by mouth with or without food as directed by your doctor, usually every 8 or 12 hours. The dosage is based on your medical condition and response to treatment.'
  };

  // Toggle expanded state
  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  // Toggle liked state
  const toggleLiked = () => {
    setLiked(!liked);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>{medication.name}</Text>
          <Text style={styles.subtitle}>{medication.dosage} - {medication.schedule}</Text>
        </View>
        
        {/* Image and Actions */}
        <View style={styles.imageContainer}>
          <Image 
            source={{ uri: medication.imageUrl }} 
            style={styles.image} 
            resizeMode="contain"
          />
          
          <View style={styles.actions}>
            <TouchableOpacity 
              style={styles.actionButton} 
              onPress={toggleLiked}
            >
              <Text style={styles.actionButtonText}>
                {liked ? '❤️ Saved' : '🤍 Save'}
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.actionButton}
              onPress={() => console.log('Reminder set')}
            >
              <Text style={styles.actionButtonText}>⏰ Reminder</Text>
            </TouchableOpacity>
          </View>
        </View>
        
        {/* Description */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Description</Text>
          <Text style={styles.sectionText}>
            {expanded 
              ? medication.description 
              : `${medication.description.substring(0, 100)}...`}
          </Text>
          <TouchableOpacity onPress={toggleExpanded}>
            <Text style={styles.readMoreText}>
              {expanded ? 'Read Less' : 'Read More'}
            </Text>
          </TouchableOpacity>
        </View>
        
        {/* Instructions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Instructions</Text>
          <Text style={styles.sectionText}>{medication.instructions}</Text>
        </View>
        
        {/* Side Effects */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Side Effects</Text>
          {medication.sideEffects.map((effect, index) => (
            <View key={index} style={styles.sideEffectItem}>
              <Text style={styles.sideEffectText}>• {effect}</Text>
            </View>
          ))}
        </View>
        
        {/* Action Buttons */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity 
            style={styles.button}
            onPress={() => console.log('Take medication')}
          >
            <Text style={styles.buttonText}>Take Now</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.button, styles.secondaryButton]}
            onPress={() => console.log('Skip dose')}
          >
            <Text style={[styles.buttonText, styles.secondaryButtonText]}>Skip Dose</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

/**
 * App component that demonstrates the MedicationDetail
 * @returns {React.ReactElement} App component
 */
export function App() {
  return <MedicationDetail />;
}

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    padding: 20,
    backgroundColor: '#4A90E2',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  subtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
    marginTop: 4,
  },
  imageContainer: {
    backgroundColor: 'white',
    padding: 20,
    alignItems: 'center',
  },
  image: {
    width: 150,
    height: 150,
  },
  actions: {
    flexDirection: 'row',
    marginTop: 16,
  },
  actionButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#f0f0f0',
    borderRadius: 20,
    marginHorizontal: 8,
  },
  actionButtonText: {
    fontSize: 14,
    color: '#333',
  },
  section: {
    backgroundColor: 'white',
    padding: 20,
    marginTop: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  sectionText: {
    fontSize: 16,
    lineHeight: 24,
    color: '#666',
  },
  readMoreText: {
    color: '#4A90E2',
    marginTop: 8,
    fontWeight: 'bold',
  },
  sideEffectItem: {
    marginBottom: 8,
  },
  sideEffectText: {
    fontSize: 16,
    color: '#666',
  },
  buttonContainer: {
    flexDirection: 'row',
    padding: 20,
    backgroundColor: 'white',
    marginTop: 10,
    marginBottom: 20,
  },
  button: {
    flex: 1,
    backgroundColor: '#4A90E2',
    paddingVertical: 12,
    borderRadius: 4,
    alignItems: 'center',
    marginHorizontal: 8,
  },
  secondaryButton: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#4A90E2',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  secondaryButtonText: {
    color: '#4A90E2',
  },
}); 