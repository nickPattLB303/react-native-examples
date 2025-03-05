/**
 * Home Screen (Medication List)
 * 
 * This screen displays a list of medications.
 * Users can tap on a medication to view its details.
 */

import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  FlatList, 
  TouchableOpacity, 
  Image 
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { FontAwesome } from '@expo/vector-icons';

// Import types and data
import medications from '../data/medications';
import { HomeStackParamList } from '../navigation/HomeStackNavigator';

// Define props type
type HomeScreenProps = NativeStackScreenProps<HomeStackParamList, 'MedicationsList'>;

export default function HomeScreen({ navigation }: HomeScreenProps) {
  return (
    <View style={styles.container}>
      <FlatList
        data={medications}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.medicationCard}
            onPress={() => navigation.navigate('MedicationDetail', { medication: item })}
          >
            <View style={styles.medicationInfo}>
              <Text style={styles.medicationName}>{item.name}</Text>
              <Text style={styles.medicationDosage}>{item.dosage}</Text>
              <Text style={styles.medicationPrice}>${item.price.toFixed(2)}</Text>
              
              <View style={styles.medicationMeta}>
                {item.requiresPrescription ? (
                  <View style={styles.prescriptionTag}>
                    <FontAwesome name="file-text-o" size={12} color="#ffffff" />
                    <Text style={styles.prescriptionTagText}>Rx</Text>
                  </View>
                ) : null}
                
                <Text style={[
                  styles.stockStatus,
                  { color: item.inStock ? '#4caf50' : '#f44336' }
                ]}>
                  {item.inStock ? 'In Stock' : 'Out of Stock'}
                </Text>
              </View>
            </View>
            
            <View style={styles.arrowContainer}>
              <FontAwesome name="chevron-right" size={16} color="#757575" />
            </View>
          </TouchableOpacity>
        )}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  listContent: {
    padding: 16,
  },
  medicationCard: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  medicationInfo: {
    flex: 1,
  },
  medicationName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 4,
  },
  medicationDosage: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 8,
  },
  medicationPrice: {
    fontSize: 16,
    fontWeight: '600',
    color: '#4a8577',
    marginBottom: 8,
  },
  medicationMeta: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  prescriptionTag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ff9800',
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 2,
    marginRight: 8,
  },
  prescriptionTagText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: 'bold',
    marginLeft: 4,
  },
  stockStatus: {
    fontSize: 14,
    fontWeight: '500',
  },
  arrowContainer: {
    justifyContent: 'center',
    paddingLeft: 8,
  },
}); 