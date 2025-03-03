# Section 4: TypeScript with React Native

## Learning Objectives
After completing this section, you will be able to:
- Use TypeScript with React Native components and hooks
- Handle navigation types in React Native
- Work with third-party library types
- Implement type-safe state management

**Prerequisite Knowledge**: Advanced Type Features (Section 3)
**Estimated Time**: 45-60 minutes

## React Native Component Types

### Function Components

```typescript
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface MedicationCardProps {
  name: string;
  dosage: number;
  frequency: string;
  onPress?: () => void;
}

const MedicationCard: React.FC<MedicationCardProps> = ({
  name,
  dosage,
  frequency,
  onPress
}) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.details}>{dosage}mg, {frequency}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold'
  },
  details: {
    fontSize: 14,
    color: '#666'
  }
});

export default MedicationCard;
```

### Class Components

```typescript
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface MedicationListState {
  medications: Medication[];
  loading: boolean;
}

class MedicationList extends Component<{}, MedicationListState> {
  state: MedicationListState = {
    medications: [],
    loading: true
  };

  componentDidMount() {
    this.fetchMedications();
  }

  async fetchMedications() {
    try {
      const response = await fetch('/api/medications');
      const data = await response.json();
      this.setState({ medications: data, loading: false });
    } catch (error) {
      console.error('Error fetching medications:', error);
      this.setState({ loading: false });
    }
  }

  render() {
    if (this.state.loading) {
      return <ActivityIndicator />;
    }

    return (
      <FlatList
        data={this.state.medications}
        renderItem={({ item }) => (
          <MedicationCard
            name={item.name}
            dosage={item.dosage}
            frequency={item.frequency}
          />
        )}
        keyExtractor={item => item.id.toString()}
      />
    );
  }
}
```

## TypeScript with React Hooks

### useState Hook

```typescript
import React, { useState } from 'react';
import { View, TextInput, Button } from 'react-native';

interface MedicationFormProps {
  onSubmit: (medication: Medication) => void;
}

const MedicationForm: React.FC<MedicationFormProps> = ({ onSubmit }) => {
  const [name, setName] = useState<string>('');
  const [dosage, setDosage] = useState<number>(0);
  const [frequency, setFrequency] = useState<string>('');

  const handleSubmit = () => {
    onSubmit({
      id: Date.now(),
      name,
      dosage,
      frequency,
      isActive: true
    });
    // Reset form
    setName('');
    setDosage(0);
    setFrequency('');
  };

  return (
    <View>
      <TextInput
        value={name}
        onChangeText={setName}
        placeholder="Medication name"
      />
      <TextInput
        value={dosage.toString()}
        onChangeText={(text) => setDosage(Number(text))}
        placeholder="Dosage"
        keyboardType="numeric"
      />
      <TextInput
        value={frequency}
        onChangeText={setFrequency}
        placeholder="Frequency"
      />
      <Button title="Add Medication" onPress={handleSubmit} />
    </View>
  );
};
```

### useEffect Hook

```typescript
import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';

interface MedicationDetailsProps {
  medicationId: number;
}

const MedicationDetails: React.FC<MedicationDetailsProps> = ({ medicationId }) => {
  const [medication, setMedication] = useState<Medication | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function fetchMedication() {
      try {
        const response = await fetch(`/api/medications/${medicationId}`);
        const data = await response.json();
        
        if (isMounted) {
          setMedication(data);
        }
      } catch (err) {
        if (isMounted) {
          setError(err instanceof Error ? err.message : 'An error occurred');
        }
      }
    }

    fetchMedication();

    return () => {
      isMounted = false;
    };
  }, [medicationId]);

  if (error) return <Text>Error: {error}</Text>;
  if (!medication) return <Text>Loading...</Text>;

  return (
    <View>
      <Text>{medication.name}</Text>
      <Text>{medication.dosage}mg</Text>
      <Text>{medication.frequency}</Text>
    </View>
  );
};
```

## Navigation Types

### Stack Navigation

```typescript
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

type RootStackParamList = {
  Home: undefined;
  MedicationDetails: { medicationId: number };
  AddMedication: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const AppNavigator: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen 
          name="Home" 
          component={HomeScreen}
          options={{ title: 'Medications' }}
        />
        <Stack.Screen 
          name="MedicationDetails" 
          component={MedicationDetailsScreen}
          options={{ title: 'Medication Details' }}
        />
        <Stack.Screen 
          name="AddMedication" 
          component={AddMedicationScreen}
          options={{ title: 'Add Medication' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
```

### Using Navigation Types

```typescript
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

type MedicationListScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Home'
>;

const MedicationList: React.FC = () => {
  const navigation = useNavigation<MedicationListScreenNavigationProp>();

  const handleMedicationPress = (medicationId: number) => {
    navigation.navigate('MedicationDetails', { medicationId });
  };

  return (
    <FlatList
      data={medications}
      renderItem={({ item }) => (
        <MedicationCard
          name={item.name}
          dosage={item.dosage}
          frequency={item.frequency}
          onPress={() => handleMedicationPress(item.id)}
        />
      )}
      keyExtractor={item => item.id.toString()}
    />
  );
};
```

## Third-Party Library Types

### Installing Type Definitions

```bash
# Install type definitions for common libraries
npm install --save-dev @types/react-native
npm install --save-dev @types/react-navigation
npm install --save-dev @types/react-native-vector-icons
```

### Using Library Types

```typescript
import Icon from 'react-native-vector-icons/MaterialIcons';

interface IconButtonProps {
  name: keyof typeof Icon.glyphMap;
  size: number;
  color: string;
  onPress: () => void;
}

const IconButton: React.FC<IconButtonProps> = ({
  name,
  size,
  color,
  onPress
}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Icon name={name} size={size} color={color} />
    </TouchableOpacity>
  );
};
```

## Type-Safe State Management

### Redux with TypeScript

```typescript
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface MedicationState {
  medications: Medication[];
  loading: boolean;
  error: string | null;
}

const initialState: MedicationState = {
  medications: [],
  loading: false,
  error: null
};

const medicationSlice = createSlice({
  name: 'medications',
  initialState,
  reducers: {
    setMedications: (state, action: PayloadAction<Medication[]>) => {
      state.medications = action.payload;
    },
    addMedication: (state, action: PayloadAction<Medication>) => {
      state.medications.push(action.payload);
    },
    updateMedication: (state, action: PayloadAction<Medication>) => {
      const index = state.medications.findIndex(m => m.id === action.payload.id);
      if (index !== -1) {
        state.medications[index] = action.payload;
      }
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    }
  }
});

export const {
  setMedications,
  addMedication,
  updateMedication,
  setLoading,
  setError
} = medicationSlice.actions;

export default medicationSlice.reducer;
```

### Using Typed Redux

```typescript
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './store';

const MedicationList: React.FC = () => {
  const dispatch = useDispatch();
  const { medications, loading, error } = useSelector(
    (state: RootState) => state.medications
  );

  useEffect(() => {
    dispatch(setLoading(true));
    fetchMedications()
      .then(data => dispatch(setMedications(data)))
      .catch(err => dispatch(setError(err.message)))
      .finally(() => dispatch(setLoading(false)));
  }, [dispatch]);

  if (loading) return <ActivityIndicator />;
  if (error) return <Text>Error: {error}</Text>;

  return (
    <FlatList
      data={medications}
      renderItem={({ item }) => (
        <MedicationCard
          medication={item}
          onPress={() => handleMedicationPress(item.id)}
        />
      )}
      keyExtractor={item => item.id.toString()}
    />
  );
};
```

> 💡 **Deep Dive**: TypeScript's type system helps catch common React Native errors at compile time, such as incorrect prop types, missing required props, and type mismatches in state updates.

## Exercise: Create a Type-Safe Medication Management App

Using Expo Snack, create a complete medication management app that includes:

1. Type-safe navigation using React Navigation
2. Redux state management with TypeScript
3. Type-safe form handling
4. Integration with third-party libraries

**CodePen Link**: [Type-Safe Medication App Exercise](https://codepen.io/your-username/pen/create)

> 🚀 **Self-Led Learners**: After completing the exercise, try adding more features like medication reminders, refill tracking, and prescription scanning with proper TypeScript types.

## Key Takeaways

- TypeScript enhances React Native development with type safety
- Proper typing helps catch errors early in development
- Navigation types ensure correct screen parameters
- Third-party library types improve development experience
- Type-safe state management prevents runtime errors 