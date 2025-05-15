/**
 * @fileoverview Exercise 4: Responsive Design Complete - Responsive Medication Dashboard
 * @author React Native Training Course
 * @created 2023-05-01
 */

import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  ScrollView, 
  StyleSheet, 
  Dimensions, 
  useWindowDimensions,
  SafeAreaView,
  StatusBar,
  Platform 
} from 'react-native';

// Get window width and height
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

/**
 * Responsive medication dashboard component
 * @returns {React.ReactElement} Medication dashboard component
 */
export default function MedicationDashboard() {
  const { width, height } = useWindowDimensions();
  const [orientation, setOrientation] = useState('portrait');
  
  // Determine if the device is in portrait or landscape mode
  useEffect(() => {
    setOrientation(width < height ? 'portrait' : 'landscape');
  }, [width, height]);

  const isTablet = width >= 768;
  
  const medications = [
    { id: '1', name: 'Amoxicillin', dosage: '500mg', schedule: '8:00 AM, 4:00 PM, 12:00 AM', instructions: 'Take with food' },
    { id: '2', name: 'Lisinopril', dosage: '10mg', schedule: '9:00 AM', instructions: 'Take on an empty stomach' },
    { id: '3', name: 'Metformin', dosage: '1000mg', schedule: '9:00 AM, 9:00 PM', instructions: 'Take with meals' },
    { id: '4', name: 'Simvastatin', dosage: '20mg', schedule: '9:00 PM', instructions: 'Take in the evening' },
    { id: '5', name: 'Losartan', dosage: '50mg', schedule: '8:00 AM', instructions: 'Take as directed' }
  ];

  const upcomingDoses = [
    { id: '1', medication: 'Amoxicillin', time: '4:00 PM', taken: false },
    { id: '2', medication: 'Lisinopril', time: '9:00 AM', taken: true },
    { id: '3', medication: 'Metformin', time: '9:00 AM', taken: true },
    { id: '4', medication: 'Metformin', time: '9:00 PM', taken: false },
  ];

  // Responsive styles based on device size and orientation
  const responsiveStyles = StyleSheet.create({
    container: {
      flex: 1,
      padding: isTablet ? 24 : 16,
      paddingTop: Platform.OS === 'ios' ? 0 : StatusBar.currentHeight,
    },
    title: {
      fontSize: isTablet ? 32 : 24,
      fontWeight: 'bold',
      marginBottom: isTablet ? 24 : 16,
      marginTop: isTablet ? 40 : 20,
    },
    sectionTitle: {
      fontSize: isTablet ? 22 : 18,
      fontWeight: 'bold',
      marginBottom: 10,
    },
    content: {
      flexDirection: orientation === 'landscape' || isTablet ? 'row' : 'column',
      flex: 1,
    },
    upcomingContainer: {
      flex: 1,
      marginRight: orientation === 'landscape' || isTablet ? 10 : 0,
      marginBottom: orientation === 'portrait' && !isTablet ? 20 : 0,
    },
    medicationsContainer: {
      flex: orientation === 'landscape' || isTablet ? 2 : 1,
    },
    upcomingDosesList: {
      flexDirection: isTablet && orientation === 'portrait' ? 'row' : 'column',
      flexWrap: isTablet && orientation === 'portrait' ? 'wrap' : 'nowrap',
    },
    doseCard: {
      backgroundColor: 'white',
      padding: isTablet ? 18 : 15,
      borderRadius: 8,
      marginBottom: 10,
      marginRight: isTablet && orientation === 'portrait' ? 10 : 0,
      width: isTablet && orientation === 'portrait' ? width / 2 - 30 : '100%',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.1,
      shadowRadius: 2,
      elevation: 1,
    },
    medicationsList: {
      flexDirection: isTablet && orientation === 'portrait' ? 'row' : 'column',
      flexWrap: isTablet && orientation === 'portrait' ? 'wrap' : 'nowrap',
    },
    medicationCard: {
      backgroundColor: 'white',
      padding: isTablet ? 18 : 15,
      borderRadius: 8,
      marginBottom: 10,
      marginRight: isTablet && orientation === 'portrait' ? 10 : 0,
      width: isTablet && orientation === 'portrait' ? width / 2 - 30 : '100%',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.1,
      shadowRadius: 2,
      elevation: 1,
    },
    doseMedication: {
      fontSize: isTablet ? 18 : 16,
      fontWeight: 'bold',
    },
    doseTime: {
      fontSize: isTablet ? 16 : 14,
      color: '#666',
    },
    doseStatus: {
      fontSize: isTablet ? 16 : 14,
      marginTop: 5,
    },
    medicationName: {
      fontSize: isTablet ? 20 : 18,
      fontWeight: 'bold',
      marginBottom: 5,
    },
    medicationDosage: {
      fontSize: isTablet ? 18 : 16,
    },
    medicationSchedule: {
      fontSize: isTablet ? 16 : 14,
      color: '#666',
      marginTop: 5,
    },
    medicationInstructions: {
      fontSize: isTablet ? 16 : 14,
      color: '#666',
      marginTop: 5,
      fontStyle: 'italic',
    },
  });

  return (
    <SafeAreaView style={responsiveStyles.container}>
      <Text style={responsiveStyles.title}>Medication Dashboard</Text>
      
      <View style={responsiveStyles.content}>
        <View style={responsiveStyles.upcomingContainer}>
          <Text style={responsiveStyles.sectionTitle}>Upcoming Doses</Text>
          <ScrollView>
            <View style={responsiveStyles.upcomingDosesList}>
              {upcomingDoses.map(dose => (
                <View key={dose.id} style={responsiveStyles.doseCard}>
                  <Text style={responsiveStyles.doseMedication}>{dose.medication}</Text>
                  <Text style={responsiveStyles.doseTime}>{dose.time}</Text>
                  <Text style={responsiveStyles.doseStatus}>
                    {dose.taken ? 'Taken' : 'Upcoming'}
                  </Text>
                </View>
              ))}
            </View>
          </ScrollView>
        </View>
        
        <View style={responsiveStyles.medicationsContainer}>
          <Text style={responsiveStyles.sectionTitle}>My Medications</Text>
          <ScrollView>
            <View style={responsiveStyles.medicationsList}>
              {medications.map(med => (
                <View key={med.id} style={responsiveStyles.medicationCard}>
                  <Text style={responsiveStyles.medicationName}>{med.name}</Text>
                  <Text style={responsiveStyles.medicationDosage}>{med.dosage}</Text>
                  <Text style={responsiveStyles.medicationSchedule}>{med.schedule}</Text>
                  <Text style={responsiveStyles.medicationInstructions}>{med.instructions}</Text>
                </View>
              ))}
            </View>
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
}

/**
 * App component that demonstrates the MedicationDashboard
 * @returns {React.ReactElement} App component
 */
export function App() {
  return <MedicationDashboard />;
} 