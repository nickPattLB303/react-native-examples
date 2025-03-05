/**
 * @fileoverview Vitals list component for the Health Tracker app
 * @author React Native Training Team
 * @created 2023-07-01
 */

import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { VitalReading, VitalType } from '../types';

interface VitalsListProps {
  vitalReadings: VitalReading[];
}

// BUG: This component has performance issues
const VitalsList: React.FC<VitalsListProps> = ({ vitalReadings }) => {
  // BUG: Unnecessary states
  const [groupedVitals, setGroupedVitals] = useState<Record<VitalType, VitalReading[]>>({} as Record<VitalType, VitalReading[]>);
  const [activeVitalType, setActiveVitalType] = useState<VitalType | null>(null);
  const [renderCount, setRenderCount] = useState(0);
  
  // BUG: Inefficient tracking of render count
  useEffect(() => {
    setRenderCount(prev => prev + 1);
  });
  
  // BUG: Inefficient grouping that runs on every parent render
  useEffect(() => {
    // BUG: This is a costly operation that runs unnecessarily
    const grouped = vitalReadings.reduce((acc, reading) => {
      if (!acc[reading.type]) {
        acc[reading.type] = [];
      }
      acc[reading.type].push(reading);
      return acc;
    }, {} as Record<VitalType, VitalReading[]>);
    
    setGroupedVitals(grouped);
    
    // Set active vital type if none is selected
    if (!activeVitalType && Object.keys(grouped).length > 0) {
      setActiveVitalType(Object.keys(grouped)[0] as VitalType);
    }
    
    // BUG: Log on every grouping operation
    console.log('Grouped vitals:', Object.keys(grouped).map(type => `${type}: ${grouped[type as VitalType].length} readings`));
  }, [vitalReadings, activeVitalType]);
  
  // BUG: Inefficient rendering without memoization
  const renderVitalItem = ({ item }: { item: VitalReading }) => {
    // BUG: Inefficient calculation on every render
    const getTimeString = () => {
      const date = new Date(item.timestamp);
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };
    
    // BUG: More inefficient calculations
    const getStatusColor = () => {
      if (item.isNormal) {
        return '#27ae60';
      }
      return '#e74c3c';
    };
    
    return (
      <View style={[styles.vitalItem, { borderLeftColor: getStatusColor() }]}>
        <View style={styles.vitalHeader}>
          <Text style={styles.vitalType}>{item.type}</Text>
          <Text style={styles.vitalTime}>{getTimeString()}</Text>
        </View>
        
        <View style={styles.vitalValueContainer}>
          <Text style={styles.vitalValue}>
            {item.value} {item.unit}
          </Text>
          <Text style={[
            styles.vitalStatus,
            { color: getStatusColor() }
          ]}>
            {item.isNormal ? 'Normal' : 'Abnormal'}
          </Text>
        </View>
        
        {item.notes && (
          <Text style={styles.vitalNotes}>{item.notes}</Text>
        )}
      </View>
    );
  };
  
  // BUG: Creating a new function on every render
  const handleVitalTypePress = (type: VitalType) => {
    setActiveVitalType(type);
  };
  
  // BUG: Inefficient calculation without memoization
  const getDisplayedVitals = () => {
    if (!activeVitalType) {
      return [];
    }
    
    // BUG: This sort is run on every render
    return [...(groupedVitals[activeVitalType] || [])].sort((a, b) => {
      return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
    });
  };
  
  // Get displayed vitals on every render
  const displayedVitals = getDisplayedVitals();
  
  return (
    <View style={styles.container}>
      <View style={styles.statsContainer}>
        <Text style={styles.statsText}>
          Total Readings: {vitalReadings.length} | Renders: {renderCount}
        </Text>
      </View>
      
      <View style={styles.typesContainer}>
        {Object.keys(groupedVitals).map((type) => (
          <Text
            key={type}
            style={[
              styles.typeButton,
              activeVitalType === type && styles.activeTypeButton
            ]}
            // BUG: Creating a new function for each button on every render
            onPress={() => handleVitalTypePress(type as VitalType)}
          >
            {type}
          </Text>
        ))}
      </View>
      
      <FlatList
        data={displayedVitals}
        renderItem={renderVitalItem}
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
  statsContainer: {
    padding: 10,
    backgroundColor: '#f5f5f5',
    borderRadius: 5,
    marginBottom: 10,
  },
  statsText: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
  typesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: 10,
  },
  typeButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: '#f5f5f5',
    borderRadius: 20,
    margin: 4,
    fontSize: 12,
    color: '#666',
  },
  activeTypeButton: {
    backgroundColor: '#4a6da7',
    color: 'white',
  },
  listContent: {
    paddingBottom: 20,
  },
  vitalItem: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 5,
    marginBottom: 10,
    borderLeftWidth: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  vitalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  vitalType: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  vitalTime: {
    fontSize: 14,
    color: '#666',
  },
  vitalValueContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  vitalValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  vitalStatus: {
    fontSize: 14,
    fontWeight: '500',
  },
  vitalNotes: {
    marginTop: 10,
    fontSize: 14,
    color: '#666',
    fontStyle: 'italic',
  },
});

export default VitalsList; 