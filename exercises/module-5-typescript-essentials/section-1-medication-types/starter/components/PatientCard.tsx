import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

// This component uses 'any' type for props
// You'll update this with proper types in your exercise
const PatientCard = ({ patient }: { patient: any }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>Patient Information</Text>
      <View style={styles.infoRow}>
        <Text style={styles.label}>Name:</Text>
        <Text style={styles.value}>{patient.name}</Text>
      </View>
      <View style={styles.infoRow}>
        <Text style={styles.label}>ID:</Text>
        <Text style={styles.value}>{patient.id}</Text>
      </View>
      <View style={styles.infoRow}>
        <Text style={styles.label}>Date of Birth:</Text>
        <Text style={styles.value}>{patient.dateOfBirth.toLocaleDateString()}</Text>
      </View>
      <View style={styles.infoRow}>
        <Text style={styles.label}>Allergies:</Text>
        <Text style={styles.value}>
          {patient.allergies.length ? patient.allergies.join(', ') : 'None'}
        </Text>
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
    width: '30%',
    color: '#555',
  },
  value: {
    flex: 1,
    color: '#333',
  },
});

export default PatientCard; 