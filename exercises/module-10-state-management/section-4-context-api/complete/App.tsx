import React, { createContext, useContext, useState, useReducer, ReactNode } from 'react';
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

// Theme Context
interface ThemeContextType {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

function ThemeProvider({ children }: { children: ReactNode }) {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(prevMode => !prevMode);
  };

  const value = {
    darkMode,
    toggleDarkMode,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

// Auth Context
interface AuthContextType {
  user: User | null;
  login: () => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

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

  const value = {
    user,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

// Medication Context with useReducer
type MedicationAction = 
  | { type: 'ADD_MEDICATION'; payload: Medication }
  | { type: 'REMOVE_MEDICATION'; payload: number }
  | { type: 'UPDATE_MEDICATION'; payload: Medication };

interface MedicationContextType {
  medications: Medication[];
  addMedication: (medication: Omit<Medication, 'id'>) => void;
  removeMedication: (id: number) => void;
  updateMedication: (medication: Medication) => void;
}

const MedicationContext = createContext<MedicationContextType | undefined>(undefined);

function medicationReducer(state: Medication[], action: MedicationAction): Medication[] {
  switch (action.type) {
    case 'ADD_MEDICATION':
      return [...state, action.payload];
    case 'REMOVE_MEDICATION':
      return state.filter(med => med.id !== action.payload);
    case 'UPDATE_MEDICATION':
      return state.map(med => 
        med.id === action.payload.id ? action.payload : med
      );
    default:
      return state;
  }
}

function MedicationProvider({ children }: { children: ReactNode }) {
  const initialMedications: Medication[] = [
    { id: 1, name: 'Amoxicillin', dosage: '500mg', frequency: '3x daily' },
    { id: 2, name: 'Lisinopril', dosage: '10mg', frequency: '1x daily' },
    { id: 3, name: 'Metformin', dosage: '1000mg', frequency: '2x daily' },
  ];

  const [medications, dispatch] = useReducer(medicationReducer, initialMedications);

  const addMedication = (medication: Omit<Medication, 'id'>) => {
    const newMedication = {
      ...medication,
      id: Date.now(),
    };
    dispatch({ type: 'ADD_MEDICATION', payload: newMedication });
  };

  const removeMedication = (id: number) => {
    dispatch({ type: 'REMOVE_MEDICATION', payload: id });
  };

  const updateMedication = (medication: Medication) => {
    dispatch({ type: 'UPDATE_MEDICATION', payload: medication });
  };

  const value = {
    medications,
    addMedication,
    removeMedication,
    updateMedication,
  };

  return (
    <MedicationContext.Provider value={value}>
      {children}
    </MedicationContext.Provider>
  );
}

function useMedications() {
  const context = useContext(MedicationContext);
  if (context === undefined) {
    throw new Error('useMedications must be used within a MedicationProvider');
  }
  return context;
}

// Theme Section Component
function ThemeSection() {
  const { darkMode, toggleDarkMode } = useTheme();
  
  return (
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
  );
}

// User Section Component
function UserSection() {
  const { user, login, logout } = useAuth();
  const { darkMode } = useTheme();
  
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

// Add Medication Form Component
function AddMedicationForm() {
  const [name, setName] = useState('');
  const [dosage, setDosage] = useState('');
  const [frequency, setFrequency] = useState('');
  const { darkMode } = useTheme();
  const { addMedication } = useMedications();

  const handleAddMedication = () => {
    if (name && dosage && frequency) {
      addMedication({
        name,
        dosage,
        frequency,
      });
      setName('');
      setDosage('');
      setFrequency('');
    }
  };

  return (
    <Section>
      <SectionTitle darkMode={darkMode}>Add Medication</SectionTitle>
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

// Medications Section Component
function MedicationsSection() {
  const { medications, removeMedication } = useMedications();
  const { darkMode } = useTheme();
  
  return (
    <Section>
      <SectionTitle darkMode={darkMode}>Medications</SectionTitle>
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

// Main App Component
function MainApp() {
  const { darkMode } = useTheme();
  
  return (
    <Container darkMode={darkMode}>
      <StatusBar style={darkMode ? 'light' : 'dark'} />
      <ThemeSection />
      <UserSection />
      <AddMedicationForm />
      <MedicationsSection />
    </Container>
  );
}

// App Component with Providers
export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <MedicationProvider>
          <MainApp />
        </MedicationProvider>
      </AuthProvider>
    </ThemeProvider>
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