import React, { useState } from 'react';
import { View, Text, StyleSheet, Switch, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import styled from 'styled-components/native';

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
}

// TODO: Create Context for Theme
// Create a ThemeContext that provides dark mode state and toggle function

// TODO: Create Context for Authentication
// Create an AuthContext that provides user state, login, and logout functions

// TODO: Create Context for Medications
// Create a MedicationContext that provides medications state and CRUD functions

// Mock data
const mockMedications: Medication[] = [
  { id: 1, name: 'Amoxicillin', dosage: '500mg', frequency: '3x daily' },
  { id: 2, name: 'Lisinopril', dosage: '10mg', frequency: '1x daily' },
  { id: 3, name: 'Metformin', dosage: '1000mg', frequency: '2x daily' },
];

// App Component
export default function App() {
  // TODO: Replace with Context
  const [darkMode, setDarkMode] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [medications, setMedications] = useState<Medication[]>(mockMedications);

  // TODO: Replace with Context actions
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const login = () => {
    setUser({
      id: 1,
      name: 'John Doe',
      email: 'john.doe@example.com',
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

  // TODO: Wrap the app with Context Providers
  return (
    <Container darkMode={darkMode}>
      <StatusBar style={darkMode ? 'light' : 'dark'} />
      
      <Section>
        <SectionTitle darkMode={darkMode}>Theme</SectionTitle>
        <SettingRow>
          <SettingLabel darkMode={darkMode}>Dark Mode</SettingLabel>
          <Switch
            value={darkMode}
            onValueChange={toggleDarkMode}
            trackColor={{ false: '#767577', true: '#81b0ff' }}
            thumbColor={darkMode ? '#f5dd4b' : '#f4f3f4'}
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