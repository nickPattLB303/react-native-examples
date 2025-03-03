import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';

// This component uses 'any' type for props
// You'll update this with proper types in your exercise
const MedicationList = ({ medications }: { medications: any[] }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>Medications</Text>
      <FlatList
        data={medications}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.medicationItem}>
            <Text style={styles.medicationName}>{item.name}</Text>
            <View style={styles.infoRow}>
              <Text style={styles.label}>Dosage:</Text>
              <Text style={styles.value}>{item.dosage} {item.unit}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.label}>Side Effects:</Text>
              <Text style={styles.value}>
                {item.sideEffects.length ? item.sideEffects.join(', ') : 'None reported'}
              </Text>
            </View>
          </View>
        )}
        scrollEnabled={false}
        ListEmptyComponent={
          <Text style={styles.emptyMessage}>No medications found</Text>
        }
      />
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
  medicationItem: {
    padding: 12,
    borderWidth: 1,
    borderColor: '#eee',
    borderRadius: 6,
    marginBottom: 10,
  },
  medicationName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 6,
    color: '#2a5ca5',
  },
  infoRow: {
    flexDirection: 'row',
    marginBottom: 4,
  },
  label: {
    fontWeight: 'bold',
    width: '35%',
    color: '#555',
  },
  value: {
    flex: 1,
    color: '#333',
  },
  emptyMessage: {
    fontStyle: 'italic',
    textAlign: 'center',
    marginTop: 20,
    color: '#666',
  },
});

export default MedicationList; 