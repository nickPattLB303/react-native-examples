/**
 * @fileoverview A reusable card component for displaying medication information
 * @author React Native Training Course
 */

import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Platform } from 'react-native';

/**
 * MedicationCard component for displaying detailed medication information
 * including name, dosage, refill status and prescription details.
 * 
 * @param {Object} props - Component props
 * @param {Object} props.medication - Medication object containing details
 * @param {string} props.medication.name - Name of the medication
 * @param {string} props.medication.dosage - Dosage information (e.g., "20mg")
 * @param {string} props.medication.instructions - Administration instructions
 * @param {number} props.medication.refillsRemaining - Number of refills remaining
 * @param {Function} props.onPrescribe - Callback when prescribe button is pressed
 * @param {Function} props.onRefill - Callback when refill button is pressed
 * @returns {React.ReactElement} The rendered component
 */
const MedicationCard = ({ 
  medication, 
  onPrescribe, 
  onRefill 
}) => {
  const [expanded, setExpanded] = useState(false);
  
  // Toggle expanded state
  const toggleDetails = () => {
    setExpanded(!expanded);
  };
  
  // Platform-specific styling adjustments
  // iOS: Uses rounded corners and shadows
  // Android: Uses material design elevation and sharper corners
  const cardStyle = Platform.OS === 'ios' 
    ? { ...styles.card, ...styles.iosShadow } 
    : { ...styles.card, ...styles.androidElevation };
  
  /**
   * Determines if a refill is needed based on remaining refills
   * @returns {boolean} True if refill is needed (less than 2 remaining)
   */
  const needsRefill = () => {
    return medication.refillsRemaining < 2;
  };
  
  /**
   * Handles dispensing the medication
   * This shows how to properly document a healthcare-related action
   */
  const handleDispense = () => {
    onPrescribe(medication);
  };

  return (
    <TouchableOpacity 
      style={cardStyle} 
      onPress={toggleDetails}
      activeOpacity={0.8}
    >
      <View style={styles.header}>
        <Text style={styles.title}>{medication.name}</Text>
        <Text style={styles.dosage}>{medication.dosage}</Text>
      </View>
      
      {expanded && (
        <View style={styles.details}>
          <Text style={styles.instructions}>
            Instructions: {medication.instructions}
          </Text>
          <Text style={styles.refillStatus}>
            Refills remaining: {medication.refillsRemaining}
          </Text>
          
          {/* Platform-specific prescription label */}
          {Platform.select({
            // iOS: Uses text-based label
            ios: (
              <Text style={styles.prescriptionLabel}>
                Prescription Details
              </Text>
            ),
            // Android: Uses icon with text
            android: (
              <View style={styles.prescriptionRow}>
                <Text style={styles.prescriptionLabel}>
                  Prescription Details
                </Text>
              </View>
            ),
            // Default case for other platforms
            default: (
              <Text style={styles.prescriptionLabel}>
                Prescription Details
              </Text>
            )
          })}
        </View>
      )}
      
      <View style={styles.actions}>
        <TouchableOpacity 
          style={styles.actionButton} 
          onPress={handleDispense}
        >
          <Text style={styles.actionText}>Prescribe</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[
            styles.actionButton, 
            needsRefill() && styles.refillNeeded
          ]} 
          onPress={() => onRefill(medication)}
        >
          <Text style={styles.actionText}>Refill</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

// Styles with pharmacy-themed color scheme
const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  // iOS-specific shadow styling
  iosShadow: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  // Android-specific elevation styling
  androidElevation: {
    elevation: 4,
    borderRadius: 4,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2e7d32', // Pharmacy green
  },
  dosage: {
    fontSize: 16,
    color: '#546e7a', // Muted blue-gray
    fontWeight: '500',
  },
  details: {
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  instructions: {
    fontSize: 14,
    marginBottom: 8,
    color: '#424242',
  },
  refillStatus: {
    fontSize: 14,
    color: '#424242',
    marginBottom: 8,
  },
  prescriptionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  prescriptionLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#0277bd', // Pharmacy blue
    marginTop: 4,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 16,
  },
  actionButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 4,
    backgroundColor: '#2e7d32', // Pharmacy green
    marginLeft: 8,
  },
  actionText: {
    color: '#fff',
    fontWeight: '500',
  },
  refillNeeded: {
    backgroundColor: '#c62828', // Alert red
  },
});

export default MedicationCard;