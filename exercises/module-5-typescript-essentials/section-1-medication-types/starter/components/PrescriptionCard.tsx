import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

// This component uses 'any' type for props
// You'll update this with proper types in your exercise
const PrescriptionCard = ({ prescription }: { prescription: any }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>Prescription Details</Text>
      <View style={styles.infoRow}>
        <Text style={styles.label}>Prescription ID:</Text>
        <Text style={styles.value}>{prescription.id}</Text>
      </View>
      <View style={styles.infoRow}>
        <Text style={styles.label}>Prescribed Date:</Text>
        <Text style={styles.dateValue}>
          {prescription.prescribedDate.toLocaleDateString()}
        </Text>
      </View>
      <View style={styles.infoRow}>
        <Text style={styles.label}>Refills Remaining:</Text>
        <Text style={styles.value}>{prescription.refillsRemaining}</Text>
      </View>
      <View style={styles.infoRow}>
        <Text style={styles.label}>Notes:</Text>
        <Text style={styles.value}>{prescription.notes}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#2a5ca5',
  },
  infoRow: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  label: {
    fontWeight: 'bold',
    width: '40%',
    color: '#555',
  },
  value: {
    flex: 1,
    color: '#333',
  },
  dateValue: {
    flex: 1,
    color: '#5cb85c',
    fontWeight: '500',
  },
});

export default PrescriptionCard; 