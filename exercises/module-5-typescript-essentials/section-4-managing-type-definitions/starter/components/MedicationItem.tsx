import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

// TODO: Create proper prop types for this component
// Hint: Create interfaces in a separate types directory and import them here
const MedicationItem = ({ medication, status }) => {
  const getStatusStyle = () => {
    switch (status) {
      case 'out-of-stock':
        return styles.outOfStock;
      case 'low-stock':
        return styles.lowStock;
      case 'in-stock':
        return styles.inStock;
      default:
        return {};
    }
  };

  const formatExpiryDate = (date) => {
    if (!date) return 'Unknown';
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <View style={[styles.container, getStatusStyle()]}>
      <View style={styles.header}>
        <Text style={styles.name}>{medication.name}</Text>
        <Text style={styles.dosage}>{medication.dosage}</Text>
      </View>
      
      <View style={styles.detailsRow}>
        <Text style={styles.label}>Manufacturer:</Text>
        <Text style={styles.value}>{medication.manufacturer}</Text>
      </View>
      
      <View style={styles.detailsRow}>
        <Text style={styles.label}>Barcode:</Text>
        <Text style={styles.value}>{medication.barcode}</Text>
      </View>
      
      <View style={styles.detailsRow}>
        <Text style={styles.label}>Expiry Date:</Text>
        <Text style={styles.value}>{formatExpiryDate(medication.expiryDate)}</Text>
      </View>
      
      <View style={styles.footer}>
        <Text style={styles.stockLabel}>Stock:</Text>
        <View style={styles.stockIndicator}>
          <Text style={styles.stockValue}>{medication.stock}</Text>
        </View>
        <Text style={styles.reorderPoint}>
          Reorder at: {medication.reorderPoint}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    paddingBottom: 8,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  dosage: {
    fontSize: 16,
    color: '#555',
    fontWeight: '500',
  },
  detailsRow: {
    flexDirection: 'row',
    marginBottom: 6,
  },
  label: {
    width: 100,
    fontWeight: '500',
    color: '#666',
  },
  value: {
    flex: 1,
    color: '#333',
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  stockLabel: {
    fontWeight: 'bold',
    color: '#555',
  },
  stockIndicator: {
    backgroundColor: '#e0e0e0',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 2,
    marginHorizontal: 8,
  },
  stockValue: {
    fontWeight: 'bold',
    color: '#333',
  },
  reorderPoint: {
    fontSize: 12,
    color: '#777',
    marginLeft: 'auto',
  },
  inStock: {
    borderLeftWidth: 4,
    borderLeftColor: '#66bb6a',
  },
  lowStock: {
    borderLeftWidth: 4,
    borderLeftColor: '#ffa726',
  },
  outOfStock: {
    borderLeftWidth: 4,
    borderLeftColor: '#ef5350',
  },
});

export default MedicationItem; 