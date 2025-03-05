import React from 'react';
import { View, Text, StyleSheet, Switch, FlatList, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import styled from 'styled-components/native';
import { create } from 'zustand';

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

// Settings Store
interface SettingsState {
  darkMode: boolean;
  notificationsEnabled: boolean;
  toggleDarkMode: () => void;
  toggleNotifications: () => void;
}

const useSettingsStore = create<SettingsState>((set) => ({
  darkMode: false,
  notificationsEnabled: true,
  toggleDarkMode: () => set((state) => ({ darkMode: !state.darkMode })),
  toggleNotifications: () => set((state) => ({ notificationsEnabled: !state.notificationsEnabled })),
}));

// User Store
interface UserState {
  user: User | null;
  login: () => void;
  logout: () => void;
}

const useUserStore = create<UserState>((set) => ({
  user: null,
  login: () => set({
    user: {
      id: 1,
      name: 'John Doe',
      email: 'john.doe@example.com',
      isLoggedIn: true,
    }
  }),
  logout: () => set({ user: null }),
}));

// Medications Store
interface MedicationState {
  medications: Medication[];
  addMedication: (medication?: Partial<Medication>) => void;
  removeMedication: (id: number) => void;
}

const useMedicationStore = create<MedicationState>((set) => ({
  medications: [
    { id: 1, name: 'Amoxicillin', dosage: '500mg', frequency: '3x daily' },
    { id: 2, name: 'Lisinopril', dosage: '10mg', frequency: '1x daily' },
    { id: 3, name: 'Metformin', dosage: '1000mg', frequency: '2x daily' },
  ],
  addMedication: (medication = {}) => set((state) => ({
    medications: [
      ...state.medications,
      {
        id: Date.now(),
        name: medication.name || 'New Medication',
        dosage: medication.dosage || '100mg',
        frequency: medication.frequency || '1x daily',
      },
    ],
  })),
  removeMedication: (id) => set((state) => ({
    medications: state.medications.filter((med) => med.id !== id),
  })),
}));

// Settings Component
function SettingsSection() {
  const { darkMode, notificationsEnabled, toggleDarkMode, toggleNotifications } = useSettingsStore();
  
  return (
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
  );
}

// User Component
function UserSection() {
  const { user, login, logout } = useUserStore();
  const { darkMode } = useSettingsStore();
  
  return (
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
  );
}

// Medications Component
function MedicationsSection() {
  const { medications, addMedication, removeMedication } = useMedicationStore();
  const { darkMode } = useSettingsStore();
  
  return (
    <Section>
      <SectionTitle darkMode={darkMode}>Medications</SectionTitle>
      <Button onPress={() => addMedication()}>
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
  );
}

// Custom Medication Form Component
function AddMedicationForm() {
  const [name, setName] = React.useState('');
  const [dosage, setDosage] = React.useState('');
  const [frequency, setFrequency] = React.useState('');
  const { darkMode } = useSettingsStore();
  const { addMedication } = useMedicationStore();

  const handleAddMedication = () => {
    if (name && dosage && frequency) {
      addMedication({ name, dosage, frequency });
      setName('');
      setDosage('');
      setFrequency('');
    }
  };

  return (
    <Section>
      <SectionTitle darkMode={darkMode}>Add New Medication</SectionTitle>
      <FormInput
        darkMode={darkMode}
        placeholder="Medication Name"
        placeholderTextColor={darkMode ? '#999' : '#ccc'}
        value={name}
        onChangeText={setName}
      />
      <FormInput
        darkMode={darkMode}
        placeholder="Dosage (e.g., 500mg)"
        placeholderTextColor={darkMode ? '#999' : '#ccc'}
        value={dosage}
        onChangeText={setDosage}
      />
      <FormInput
        darkMode={darkMode}
        placeholder="Frequency (e.g., 2x daily)"
        placeholderTextColor={darkMode ? '#999' : '#ccc'}
        value={frequency}
        onChangeText={setFrequency}
      />
      <Button onPress={handleAddMedication}>
        <ButtonText>Add Medication</ButtonText>
      </Button>
    </Section>
  );
}

// App Component
export default function App() {
  // Use the darkMode state from the settings store
  const darkMode = useSettingsStore(state => state.darkMode);

  return (
    <Container darkMode={darkMode}>
      <StatusBar style={darkMode ? 'light' : 'dark'} />
      <SettingsSection />
      <UserSection />
      <AddMedicationForm />
      <MedicationsSection />
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

const FormInput = styled.TextInput<{ darkMode: boolean }>`
  background-color: ${props => props.darkMode ? '#333' : 'white'};
  padding: 10px;
  border-radius: 5px;
  margin-bottom: 10px;
  color: ${props => props.darkMode ? 'white' : 'black'};
`; 