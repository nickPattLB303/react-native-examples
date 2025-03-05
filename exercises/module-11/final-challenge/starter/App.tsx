/**
 * @fileoverview Main application entry point for the Health Tracker app
 * @author React Native Training Team
 * @created 2023-07-01
 */

import React, { useState, useEffect } from 'react';
import { 
  SafeAreaView, 
  StyleSheet, 
  Text, 
  View, 
  ActivityIndicator,
  Button,
  ScrollView,
  Alert
} from 'react-native';
import { 
  fetchMedications, 
  fetchVitalReadings, 
  fetchAppointments, 
  fetchUserProfile 
} from './api/healthApi';
import { Medication, VitalReading, Appointment, UserProfile } from './types';
import Header from './components/Header';
import MedicationList from './components/MedicationList';
import VitalsList from './components/VitalsList';
import AppointmentList from './components/AppointmentList';
import ProfileSummary from './components/ProfileSummary';

// BUG: No cleanup for these global event listeners
document?.addEventListener('visibilitychange', () => {
  console.log('Visibility changed');
});

// BUG: Large array that keeps growing
const appLogs: string[] = [];
const logAppEvent = (event: string) => {
  appLogs.push(`${new Date().toISOString()} - ${event}`);
  // BUG: This creates a copy of the array each time
  appLogs.slice();
  
  // BUG: This creates a large string that's never used
  const allLogs = appLogs.join('\n');
  console.log(`Logged event: ${event} (total logs: ${appLogs.length})`);
};

// BUG: Global timers never get cleaned up
setInterval(() => {
  logAppEvent('App heartbeat');
}, 10000);

// BUG: This App component has multiple performance issues
const App = () => {
  // BUG: Excessive state that triggers too many re-renders
  const [medications, setMedications] = useState<Medication[]>([]);
  const [vitalReadings, setVitalReadings] = useState<VitalReading[]>([]);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<string>('medications');
  
  // BUG: These states change frequently and cause re-renders
  const [lastUpdated, setLastUpdated] = useState<string>('');
  const [refreshCount, setRefreshCount] = useState<number>(0);
  const [expandedMedication, setExpandedMedication] = useState<string | null>(null);
  
  // BUG: Using multiple useEffect hooks inefficiently
  useEffect(() => {
    logAppEvent('App mounted');
    loadInitialData();
    
    // BUG: No cleanup function
  }, []);
  
  // BUG: This useEffect runs on every refresh unnecessarily
  useEffect(() => {
    if (refreshCount > 0) {
      logAppEvent(`Refreshed data count: ${refreshCount}`);
    }
  });
  
  // BUG: This useEffect creates closure over state
  useEffect(() => {
    const timer = setInterval(() => {
      // BUG: This creates a closure over the medications state
      // and won't update when medications changes
      console.log(`Current medication count: ${medications.length}`);
      
      // BUG: Expensive calculation on every interval
      if (medications.length > 0) {
        const totalRefills = medications.reduce((total, med) => total + med.refillsRemaining, 0);
        console.log(`Total refills available: ${totalRefills}`);
      }
    }, 5000);
    
    // BUG: Missing cleanup
  }, []);
  
  // BUG: Inefficient data loading without error handling
  const loadInitialData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // BUG: These API calls could be done in parallel
      const medsData = await fetchMedications();
      logAppEvent(`Loaded ${medsData.length} medications`);
      setMedications(medsData);
      
      const vitalsData = await fetchVitalReadings();
      logAppEvent(`Loaded ${vitalsData.length} vital readings`);
      setVitalReadings(vitalsData);
      
      const apptsData = await fetchAppointments();
      logAppEvent(`Loaded ${apptsData.length} appointments`);
      setAppointments(apptsData);
      
      const profileData = await fetchUserProfile();
      logAppEvent(`Loaded user profile for ${profileData.name}`);
      setUserProfile(profileData);
      
      setLastUpdated(new Date().toISOString());
    } catch (err: any) {
      console.error('Failed to load data:', err);
      setError(err.message || 'Failed to load data');
      
      // BUG: Alert without proper fallback
      Alert.alert('Error', err.message || 'An unknown error occurred');
    } finally {
      setLoading(false);
    }
  };
  
  // BUG: This function creates a new function on every render
  const handleRefresh = () => {
    setRefreshCount(refreshCount + 1);
    loadInitialData();
    
    // BUG: Creates a large array on each call without using it
    const unusedArray = new Array(10000).fill('x');
    console.log(`Refreshing data... (refresh count: ${refreshCount + 1})`);
  };
  
  // BUG: This function recalculates on every render
  const calculateTotalMedications = () => {
    console.log('Calculating total medications...');
    return medications.reduce((total, med) => total + 1, 0);
  };
  
  // BUG: This function recalculates on every render and is inefficient
  const calculateLowStockMedications = () => {
    console.log('Calculating low stock medications...');
    // BUG: This filter runs on every render
    const lowStock = medications.filter(med => med.isLowStock);
    return lowStock.length;
  };
  
  // BUG: This function has a complex calculation that runs on every render
  const calculateAbnormalVitals = () => {
    console.log('Calculating abnormal vitals...');
    // BUG: This filter and map run on every render
    const abnormal = vitalReadings.filter(reading => !reading.isNormal);
    
    // BUG: Unnecessarily complex calculation
    const abnormalStats = abnormal.map(reading => ({
      id: reading.id,
      type: reading.type,
      value: reading.value,
      deviation: reading.type === 'Blood Pressure' 
        ? Math.abs(reading.value - 120) 
        : reading.type === 'Heart Rate'
          ? Math.abs(reading.value - 70)
          : 0
    }));
    
    return abnormalStats.length;
  };
  
  // BUG: This function creates a new function on every render
  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    
    // BUG: This logs with computed props on each tab change, forcing recalculation
    logAppEvent(`Switched to ${tab} tab. Stats: ${calculateTotalMedications()} medications, ${calculateAbnormalVitals()} abnormal vitals`);
  };
  
  // Calculate these values on every render (inefficient)
  const totalMedications = calculateTotalMedications();
  const lowStockCount = calculateLowStockMedications();
  const abnormalVitalsCount = calculateAbnormalVitals();
  
  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <Header title="Health Tracker" />
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#0066cc" />
          <Text style={styles.loadingText}>Loading health data...</Text>
        </View>
      </SafeAreaView>
    );
  }
  
  if (error) {
    return (
      <SafeAreaView style={styles.container}>
        <Header title="Health Tracker" />
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Error: {error}</Text>
          <Button title="Retry" onPress={handleRefresh} />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Health Tracker" />
      
      {userProfile && (
        <ProfileSummary profile={userProfile} />
      )}
      
      <View style={styles.statsContainer}>
        <Text style={styles.statsText}>Medications: {totalMedications} (Low: {lowStockCount})</Text>
        <Text style={styles.statsText}>Abnormal Vitals: {abnormalVitalsCount}</Text>
        <Text style={styles.statsText}>Upcoming Appointments: {appointments.length}</Text>
      </View>
      
      <View style={styles.tabsContainer}>
        <Button 
          title="Medications" 
          onPress={() => handleTabChange('medications')} 
          color={activeTab === 'medications' ? '#0066cc' : '#666666'} 
        />
        <Button 
          title="Vitals" 
          onPress={() => handleTabChange('vitals')} 
          color={activeTab === 'vitals' ? '#0066cc' : '#666666'} 
        />
        <Button 
          title="Appointments" 
          onPress={() => handleTabChange('appointments')} 
          color={activeTab === 'appointments' ? '#0066cc' : '#666666'} 
        />
      </View>
      
      <ScrollView style={styles.contentContainer}>
        {activeTab === 'medications' && (
          <MedicationList 
            medications={medications} 
            expandedId={expandedMedication}
            onExpand={setExpandedMedication}
          />
        )}
        
        {activeTab === 'vitals' && (
          <VitalsList vitalReadings={vitalReadings} />
        )}
        
        {activeTab === 'appointments' && (
          <AppointmentList appointments={appointments} />
        )}
      </ScrollView>
      
      <View style={styles.footerContainer}>
        <Button title="Refresh Data" onPress={handleRefresh} />
        <Text style={styles.updatedText}>
          Last updated: {new Date(lastUpdated).toLocaleTimeString()}
        </Text>
        <Text style={styles.countText}>
          Refresh count: {refreshCount}
        </Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#333',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    marginBottom: 20,
    fontSize: 16,
    color: '#cc0000',
    textAlign: 'center',
  },
  statsContainer: {
    backgroundColor: '#E0E0E0',
    padding: 10,
    marginHorizontal: 10,
    marginTop: 10,
    borderRadius: 5,
  },
  statsText: {
    fontSize: 14,
    color: '#333',
    marginBottom: 5,
  },
  tabsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 10,
    paddingHorizontal: 10,
  },
  contentContainer: {
    flex: 1,
    padding: 10,
  },
  footerContainer: {
    padding: 10,
    backgroundColor: '#E0E0E0',
    alignItems: 'center',
  },
  updatedText: {
    fontSize: 12,
    color: '#666',
    marginTop: 5,
  },
  countText: {
    fontSize: 12,
    color: '#666',
  },
});

export default App; 