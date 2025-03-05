import React, { useState } from 'react';
import { View, Text, StyleSheet, Switch, FlatList, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import styled from 'styled-components/native';

// TODO: Import Zustand
// import { create } from 'zustand';

// Types
interface Medication {
  id: number;
  name: string;
  dosage: string;
  frequency: string;
}

interface User {
  id: number;
  name: string;
  email: string;
  isLoggedIn: boolean;
}

interface SettingsState {
  darkMode: boolean;
  notificationsEnabled: boolean;
}

// TODO: Create Zustand stores
// 1. Create a settings store with theme and notification preferences
// 2. Create a user store for authentication state
// 3. Create a medication store for managing medications

// Mock data
const mockMedications: Medication[] = [
  { id: 1, name: 'Amoxicillin', dosage: '500mg', frequency: '3x daily' },
  { id: 2, name: 'Lisinopril', dosage: '10mg', frequency: '1x daily' },
  { id: 3, name: 'Metformin', dosage: '1000mg', frequency: '2x daily' },
];

// App Component
export default function App() {
  // TODO: Replace with Zustand store
  const [darkMode, setDarkMode] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const [medications, setMedications] = useState<Medication[]>(mockMedications);

  // TODO: Replace with Zustand actions
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const toggleNotifications = () => {
    setNotificationsEnabled(!notificationsEnabled);
  };

  const login = () => {
    setUser({
      id: 1,
      name: 'John Doe',
      email: 'john.doe@example.com',
      isLoggedIn: true,
    });
  };

  const logout = () => {
    setUser(null);
  };

  const addMedication = () => {
    const newMedication: Medication = {
      id: Date.now(),
      name: 'New Medication',
      dosage: '100mg',
      frequency: '1x daily',
    };
    setMedications([...medications, newMedication]);
  };

  const removeMedication = (id: number) => {
    setMedications(medications.filter(med => med.id !== id));
  };

  return (
    <Container darkMode={darkMode}>
      <StatusBar style={darkMode ? 'light' : 'dark'} />
      
      <Section>
        <SectionTitle darkMode={darkMode}>Settings</SectionTitle>
        <SettingRow>
          <SettingLabel darkMode={darkMode}>Dark Mode</SettingLabel>
          <Switch
            value={darkMode}
            onValueChange={toggleDarkMode}
            trackColor={{ false: '#767577', true: '#81b0ff' }}
            thumbColor={darkMode ? '#f5dd4b' : '#f4f3f4'}
          />
        </SettingRow>
        <SettingRow>
          <SettingLabel darkMode={darkMode}>Notifications</SettingLabel>
          <Switch
            value={notificationsEnabled}
            onValueChange={toggleNotifications}
            trackColor={{ false: '#767577', true: '#81b0ff' }}
            thumbColor={notificationsEnabled ? '#f5dd4b' : '#f4f3f4'}
          />
        </SettingRow>
      </Section>

      <Section>
        <SectionTitle darkMode={darkMode}>User</SectionTitle>
        {user ? (
          <>
            <UserInfo darkMode={darkMode}>
              <Text style={{ color: darkMode ? 'white' : 'black' }}>Name: {user.name}</Text>
              <Text style={{ color: darkMode ? 'white' : 'black' }}>Email: {user.email}</Text>
            </UserInfo>
            <Button onPress={logout}>
              <ButtonText>Logout</ButtonText>
            </Button>
          </>
        ) : (
          <Button onPress={login}>
            <ButtonText>Login</ButtonText>
          </Button>
        )}
      </Section>

      <Section>
        <SectionTitle darkMode={darkMode}>Medications</SectionTitle>
        <Button onPress={addMedication}>
          <ButtonText>Add Medication</ButtonText>
        </Button>
        <MedicationList>
          {medications.map(medication => (
            <MedicationItem key={medication.id} darkMode={darkMode}>
              <MedicationName darkMode={darkMode}>{medication.name}</MedicationName>
              <MedicationDetail darkMode={darkMode}>Dosage: {medication.dosage}</MedicationDetail>
              <MedicationDetail darkMode={darkMode}>Frequency: {medication.frequency}</MedicationDetail>
              <RemoveButton onPress={() => removeMedication(medication.id)}>
                <RemoveButtonText>Remove</RemoveButtonText>
              </RemoveButton>
            </MedicationItem>
          ))}
        </MedicationList>
      </Section>
    </Container>
  );
}

// Styled components
const Container = styled.ScrollView<{ darkMode: boolean }>`
  flex: 1;
  background-color: ${props => props.darkMode ? '#121212' : '#f5f5f5'};
  padding: 20px;
`;

const Section = styled.View`
  margin-bottom: 20px;
`;

const SectionTitle = styled.Text<{ darkMode: boolean }>`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 10px;
  color: ${props => props.darkMode ? 'white' : 'black'};
`;

const SettingRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
`;

const SettingLabel = styled.Text<{ darkMode: boolean }>`
  font-size: 16px;
  color: ${props => props.darkMode ? 'white' : 'black'};
`;

const UserInfo = styled.View<{ darkMode: boolean }>`
  background-color: ${props => props.darkMode ? '#333' : 'white'};
  padding: 10px;
  border-radius: 5px;
  margin-bottom: 10px;
`;

const Button = styled.TouchableOpacity`
  background-color: #0066cc;
  padding: 10px;
  border-radius: 5px;
  align-items: center;
  margin-bottom: 10px;
`;

const ButtonText = styled.Text`
  color: white;
  font-weight: bold;
`;

const MedicationList = styled.View`
  margin-top: 10px;
`;

const MedicationItem = styled.View<{ darkMode: boolean }>`
  background-color: ${props => props.darkMode ? '#333' : 'white'};
  padding: 15px;
  border-radius: 5px;
  margin-bottom: 10px;
`;

const MedicationName = styled.Text<{ darkMode: boolean }>`
  font-size: 18px;
  font-weight: bold;
  color: ${props => props.darkMode ? 'white' : 'black'};
  margin-bottom: 5px;
`;

const MedicationDetail = styled.Text<{ darkMode: boolean }>`
  font-size: 14px;
  color: ${props => props.darkMode ? '#ccc' : '#666'};
  margin-bottom: 3px;
`;

const RemoveButton = styled.TouchableOpacity`
  background-color: #ff3b30;
  padding: 8px;
  border-radius: 5px;
  align-items: center;
  margin-top: 10px;
`;

const RemoveButtonText = styled.Text`
  color: white;
  font-weight: bold;
`; 