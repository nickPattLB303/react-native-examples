/**
 * Medication Detail Screen
 * 
 * This screen displays detailed information about a specific medication.
 * It receives the medication data as a parameter from the HomeScreen.
 */

import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity 
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { FontAwesome } from '@expo/vector-icons';

// Import types
import { HomeStackParamList } from '../navigation/HomeStackNavigator';

// Define props type
type MedicationDetailScreenProps = NativeStackScreenProps<HomeStackParamList, 'MedicationDetail'>;

export default function MedicationDetailScreen({ route }: MedicationDetailScreenProps) {
  // Get the medication data from route.params
  const { medication } = route.params;
  
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.medicationName}>{medication.name}</Text>
        <Text style={styles.medicationDosage}>{medication.dosage}</Text>
        
        <View style={styles.priceContainer}>
          <Text style={styles.priceLabel}>Price:</Text>
          <Text style={styles.price}>${medication.price.toFixed(2)}</Text>
        </View>
        
        <View style={styles.statusContainer}>
          {medication.requiresPrescription && (
            <View style={styles.prescriptionTag}>
              <FontAwesome name="file-text-o" size={14} color="#ffffff" />
              <Text style={styles.prescriptionTagText}>Prescription Required</Text>
            </View>
          )}
          
          <View style={[
            styles.stockTag,
            { backgroundColor: medication.inStock ? '#4caf50' : '#f44336' }
          ]}>
            <FontAwesome 
              name={medication.inStock ? "check" : "times"} 
              size={14} 
              color="#ffffff" 
            />
            <Text style={styles.stockTagText}>
              {medication.inStock ? 'In Stock' : 'Out of Stock'}
            </Text>
          </View>
        </View>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Description</Text>
        <Text style={styles.description}>{medication.description}</Text>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Details</Text>
        
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Manufacturer:</Text>
          <Text style={styles.detailValue}>{medication.manufacturer}</Text>
        </View>
        
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Dosage:</Text>
          <Text style={styles.detailValue}>{medication.dosage}</Text>
        </View>
      </View>
      
      <View style={styles.actionContainer}>
        <TouchableOpacity 
          style={[
            styles.actionButton, 
            !medication.inStock && styles.disabledButton
          ]}
          disabled={!medication.inStock}
          onPress={() => alert('Added to cart!')}
        >
          <FontAwesome name="shopping-cart" size={18} color="#ffffff" />
          <Text style={styles.actionButtonText}>Add to Cart</Text>
        </TouchableOpacity>
        
        {medication.requiresPrescription && (
          <TouchableOpacity 
            style={styles.uploadButton}
            onPress={() => alert('Upload prescription functionality would go here')}
          >
            <FontAwesome name="upload" size={18} color="#4a8577" />
            <Text style={styles.uploadButtonText}>Upload Prescription</Text>
          </TouchableOpacity>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#ffffff',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  medicationName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 4,
  },
  medicationDosage: {
    fontSize: 16,
    color: '#666666',
    marginBottom: 16,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  priceLabel: {
    fontSize: 16,
    color: '#666666',
    marginRight: 8,
  },
  price: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4a8577',
  },
  statusContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  prescriptionTag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ff9800',
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginRight: 8,
    marginBottom: 8,
  },
  prescriptionTagText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '500',
    marginLeft: 6,
  },
  stockTag: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginBottom: 8,
  },
  stockTagText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '500',
    marginLeft: 6,
  },
  section: {
    backgroundColor: '#ffffff',
    padding: 20,
    marginTop: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    color: '#333333',
    lineHeight: 24,
  },
  detailRow: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  detailLabel: {
    fontSize: 16,
    color: '#666666',
    width: 120,
  },
  detailValue: {
    fontSize: 16,
    color: '#333333',
    flex: 1,
  },
  actionContainer: {
    backgroundColor: '#ffffff',
    padding: 20,
    marginTop: 12,
    marginBottom: 30,
  },
  actionButton: {
    backgroundColor: '#4a8577',
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    marginBottom: 12,
  },
  disabledButton: {
    backgroundColor: '#cccccc',
  },
  actionButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  uploadButton: {
    borderWidth: 1,
    borderColor: '#4a8577',
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  uploadButtonText: {
    color: '#4a8577',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
}); 