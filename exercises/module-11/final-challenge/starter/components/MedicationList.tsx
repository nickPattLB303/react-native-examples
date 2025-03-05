/**
 * @fileoverview Medication list component for the Health Tracker app
 * @author React Native Training Team
 * @created 2023-07-01
 */

import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { Medication } from '../types';

interface MedicationListProps {
  medications: Medication[];
  expandedId: string | null;
  onExpand: (id: string | null) => void;
}

// BUG: This component has multiple performance issues
const MedicationList: React.FC<MedicationListProps> = ({ medications, expandedId, onExpand }) => {
  // BUG: Unnecessary state for derived data
  const [filteredMedications, setFilteredMedications] = useState<Medication[]>(medications);
  const [searchQuery, setSearchQuery] = useState('');
  const [renderCount, setRenderCount] = useState(0);
  
  // BUG: Track render count inefficiently
  useEffect(() => {
    // Update render count on every render
    setRenderCount(prev => prev + 1);
  });
  
  // BUG: This effect runs unnecessarily on every render of its parent
  useEffect(() => {
    setFilteredMedications(medications);
  }, [medications]);
  
  // BUG: This effect creates a costly filter operation on every search input change
  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredMedications(medications);
      return;
    }
    
    // BUG: Inefficient filtering
    const filtered = medications.filter(med => {
      // BUG: Inefficient string operations
      const searchLower = searchQuery.toLowerCase();
      const nameMatch = med.name.toLowerCase().includes(searchLower);
      const purposeMatch = med.purpose.toLowerCase().includes(searchLower);
      const dosageMatch = med.dosage.toLowerCase().includes(searchLower);
      
      // BUG: Could be simplified
      return nameMatch || purposeMatch || dosageMatch;
    });
    
    setFilteredMedications(filtered);
    
    // BUG: Excessive logging
    console.log(`Filtered medications: ${filtered.length} results for query "${searchQuery}"`);
  }, [searchQuery, medications]);
  
  // BUG: Creating a new function on every render
  const handleSearch = (text: string) => {
    setSearchQuery(text);
    
    // BUG: Redundant console log
    console.log(`Searching for: ${text}`);
  };
  
  // BUG: Creating a new function on every render
  const handleMedicationPress = (id: string) => {
    // BUG: Inefficient toggle logic
    if (expandedId === id) {
      onExpand(null);
    } else {
      onExpand(id);
      
      // BUG: Creating large array on every press unnecessarily
      const unusedArray = new Array(1000).fill(`${id}-details`);
      console.log(`Expanded medication: ${id}`);
    }
  };
  
  // BUG: Creating a new function on every render
  const renderMedicationItem = ({ item }: { item: Medication }) => {
    const isExpanded = expandedId === item.id;
    
    // BUG: Inefficient calculation on every render
    const daysUntilExpiry = () => {
      const today = new Date();
      const expiryDate = new Date(item.expiryDate);
      const diffTime = expiryDate.getTime() - today.getTime();
      return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    };
    
    // BUG: More inefficient calculations in render
    const expiryStatus = daysUntilExpiry() <= 30 
      ? 'Expiring Soon' 
      : daysUntilExpiry() <= 0 
        ? 'Expired' 
        : 'Valid';
    
    return (
      <TouchableOpacity 
        style={[
          styles.medicationItem, 
          item.isLowStock && styles.lowStockItem
        ]} 
        onPress={() => handleMedicationPress(item.id)}
      >
        <View style={styles.medicationHeader}>
          <Text style={styles.medicationName}>{item.name}</Text>
          <Text style={styles.medicationDosage}>{item.dosage}</Text>
        </View>
        
        <View style={styles.medicationDetails}>
          <Text style={styles.medicationPurpose}>{item.purpose}</Text>
          <Text style={styles.medicationRefills}>
            Refills: {item.refillsRemaining}
          </Text>
        </View>
        
        {isExpanded && (
          <View style={styles.expandedContent}>
            <Text style={styles.expandedTitle}>Additional Details</Text>
            
            <View style={styles.expandedRow}>
              <Text style={styles.expandedLabel}>Instructions:</Text>
              <Text style={styles.expandedValue}>{item.instructions}</Text>
            </View>
            
            <View style={styles.expandedRow}>
              <Text style={styles.expandedLabel}>Last Refill:</Text>
              <Text style={styles.expandedValue}>{item.lastRefillDate}</Text>
            </View>
            
            <View style={styles.expandedRow}>
              <Text style={styles.expandedLabel}>Expiry Date:</Text>
              <Text style={[
                styles.expandedValue,
                expiryStatus === 'Expired' && styles.expiredText,
                expiryStatus === 'Expiring Soon' && styles.expiringSoonText
              ]}>
                {item.expiryDate} ({expiryStatus}, {daysUntilExpiry()} days)
              </Text>
            </View>
            
            <View style={styles.expandedRow}>
              <Text style={styles.expandedLabel}>Side Effects:</Text>
              <Text style={styles.expandedValue}>
                {item.sideEffects.join(', ')}
              </Text>
            </View>
            
            <View style={styles.expandedRow}>
              <Text style={styles.expandedLabel}>Interactions:</Text>
              <Text style={styles.expandedValue}>
                {item.interactions.join(', ')}
              </Text>
            </View>
          </View>
        )}
      </TouchableOpacity>
    );
  };
  
  // BUG: Missing key extractor optimization
  
  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search medications..."
          value={searchQuery}
          onChangeText={handleSearch}
        />
        <Text style={styles.renderCount}>Renders: {renderCount}</Text>
      </View>
      
      <FlatList
        data={filteredMedications}
        renderItem={renderMedicationItem}
        // BUG: Missing key extractor
        contentContainerStyle={styles.listContent}
        // BUG: Missing performance optimizations
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchContainer: {
    padding: 10,
    backgroundColor: '#f5f5f5',
    borderRadius: 5,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  searchInput: {
    flex: 1,
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    backgroundColor: 'white',
  },
  renderCount: {
    marginLeft: 10,
    fontSize: 12,
    color: '#666',
  },
  listContent: {
    paddingBottom: 20,
  },
  medicationItem: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 5,
    marginBottom: 10,
    borderLeftWidth: 5,
    borderLeftColor: '#4a6da7',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  lowStockItem: {
    borderLeftColor: '#e74c3c',
  },
  medicationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  medicationName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  medicationDosage: {
    fontSize: 14,
    color: '#666',
  },
  medicationDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  medicationPurpose: {
    fontSize: 14,
    color: '#666',
    flex: 1,
  },
  medicationRefills: {
    fontSize: 14,
    color: '#666',
  },
  expandedContent: {
    marginTop: 10,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  expandedTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  expandedRow: {
    marginBottom: 5,
  },
  expandedLabel: {
    fontSize: 13,
    color: '#666',
    fontWeight: '500',
  },
  expandedValue: {
    fontSize: 13,
    color: '#333',
  },
  expiredText: {
    color: '#e74c3c',
  },
  expiringSoonText: {
    color: '#f39c12',
  },
});

export default MedicationList; 