# Section 3: TypeScript with React Native

## Learning Objectives
After completing this section, you will be able to:
- Set up a new React Native project with TypeScript support
- Convert existing JavaScript React Native code to TypeScript
- Type React Native component props and state correctly
- Use TypeScript with React Native's core components and APIs
- Implement type-safe event handlers and callbacks
- Create reusable, type-safe custom hooks
- Apply TypeScript to navigation and route parameters

**Prerequisite Knowledge**: Basic TypeScript and React Native fundamentals
**Estimated Time**: 45-60 minutes

## Section Overview
This section focuses on the practical application of TypeScript in React Native development. You'll learn how to integrate TypeScript into your React Native projects, type React Native-specific code patterns, and leverage TypeScript to create more robust applications. We'll cover common patterns and challenges when using TypeScript with React Native components, APIs, and navigation.

## Key Concepts

### Setting Up TypeScript in React Native
React Native provides built-in TypeScript template support:

```bash
# Create a new React Native project with TypeScript
npx react-native init PharmacyApp --template react-native-template-typescript

# For Expo projects
expo init PharmacyApp -t expo-template-blank-typescript
```

The TypeScript configuration for React Native typically includes:

```json
// tsconfig.json
{
  "compilerOptions": {
    "allowJs": true,
    "allowSyntheticDefaultImports": true,
    "esModuleInterop": true,
    "isolatedModules": true,
    "jsx": "react-native",
    "lib": ["es2017"],
    "moduleResolution": "node",
    "noEmit": true,
    "strict": true,
    "target": "esnext"
  },
  "exclude": [
    "node_modules",
    "babel.config.js",
    "metro.config.js",
    "jest.config.js"
  ]
}
```

### Typing React Native Components

```tsx
import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

// Define props interface
interface MedicationItemProps {
  id: number;
  name: string;
  dosage: string;
  frequency: string;
  onPress: (id: number) => void;
}

// Functional component with typed props
const MedicationItem: React.FC<MedicationItemProps> = ({ 
  id, 
  name, 
  dosage, 
  frequency, 
  onPress 
}) => {
  // Component implementation
  return (
    <TouchableOpacity style={styles.container} onPress={() => onPress(id)}>
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.details}>{dosage}, {frequency}</Text>
    </TouchableOpacity>
  );
};

// StyleSheet with TypeScript
const styles = StyleSheet.create({
  container: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee'
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

export default MedicationItem;
```

### Working with State and Hooks in TypeScript

```tsx
import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';

// Define types for medication data
interface Medication {
  id: number;
  name: string;
  dosage: string;
  frequency: string;
}

// Component with typed state
const MedicationList: React.FC = () => {
  // Type inference works automatically for primitive types
  const [isLoading, setIsLoading] = useState(true);
  
  // Explicit type for complex state
  const [medications, setMedications] = useState<Medication[]>([]);
  
  // Optional state with null
  const [selectedMedication, setSelectedMedication] = useState<Medication | null>(null);
  
  // Type for error state
  const [error, setError] = useState<Error | null>(null);
  
  // Effect to fetch medications
  useEffect(() => {
    const fetchMedications = async () => {
      try {
        // API call implementation
        setMedications(/* fetched data */);
        setIsLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Unknown error'));
        setIsLoading(false);
      }
    };
    
    fetchMedications();
  }, []);
  
  // Render component
  return (
    <View>
      {isLoading ? (
        <ActivityIndicator size="large" color="#0066cc" />
      ) : error ? (
        <Text>Error: {error.message}</Text>
      ) : (
        // Render medication list
      )}
    </View>
  );
};

export default MedicationList;
```

### Custom Hooks with TypeScript

```tsx
import { useState, useEffect } from 'react';

// Define return type for the hook
interface UseMedicationsResult {
  medications: Medication[];
  isLoading: boolean;
  error: Error | null;
  refreshMedications: () => Promise<void>;
}

// Custom hook with defined input and output types
export function useMedications(patientId: number): UseMedicationsResult {
  const [medications, setMedications] = useState<Medication[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  
  // Function to fetch medications
  const fetchMedications = async () => {
    setIsLoading(true);
    try {
      // API call implementation
      const response = await fetch(`/api/patients/${patientId}/medications`);
      if (!response.ok) {
        throw new Error('Failed to fetch medications');
      }
      const data = await response.json();
      setMedications(data);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Unknown error'));
    } finally {
      setIsLoading(false);
    }
  };
  
  // Initial fetch
  useEffect(() => {
    fetchMedications();
  }, [patientId]);
  
  // Return typed result
  return {
    medications,
    isLoading,
    error,
    refreshMedications: fetchMedications
  };
}
```

### Typed Navigation Parameters

```tsx
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

// Define the navigation parameter types
type RootStackParamList = {
  Home: undefined;
  MedicationList: { patientId: number };
  MedicationDetails: { medicationId: number; editable?: boolean };
  AddMedication: { patientId: number } | undefined;
};

// Type for the navigation prop
type MedicationDetailsNavigationProp = StackNavigationProp<
  RootStackParamList,
  'MedicationDetails'
>;

// Type for the route prop
type MedicationDetailsRouteProp = RouteProp<
  RootStackParamList,
  'MedicationDetails'
>;

// Component props including navigation and route
interface MedicationDetailsProps {
  navigation: MedicationDetailsNavigationProp;
  route: MedicationDetailsRouteProp;
}

// Component with typed navigation
const MedicationDetails: React.FC<MedicationDetailsProps> = ({ 
  navigation, 
  route 
}) => {
  // Access typed parameters safely
  const { medicationId, editable } = route.params;
  
  // Navigate with correct parameters
  const handleEdit = () => {
    navigation.navigate('AddMedication', { medicationId });
  };
  
  return (
    // Component implementation
  );
};
```

### Typing StyleSheet and Theme Properties

```tsx
import { StyleSheet, TextStyle, ViewStyle, ImageStyle } from 'react-native';

// Define theme interface
interface Theme {
  colors: {
    primary: string;
    secondary: string;
    background: string;
    text: string;
    error: string;
  };
  spacing: {
    small: number;
    medium: number;
    large: number;
  };
  typography: {
    fontSize: {
      small: number;
      medium: number;
      large: number;
    };
    fontWeight: {
      regular: TextStyle['fontWeight'];
      bold: TextStyle['fontWeight'];
    };
  };
}

// Create a typed theme
const theme: Theme = {
  colors: {
    primary: '#0066cc',
    secondary: '#4ecdc4',
    background: '#f8f9fa',
    text: '#333333',
    error: '#ff5252'
  },
  spacing: {
    small: 8,
    medium: 16,
    large: 24
  },
  typography: {
    fontSize: {
      small: 12,
      medium: 16,
      large: 20
    },
    fontWeight: {
      regular: 'normal',
      bold: 'bold'
    }
  }
};

// Interface for component styles
interface MedicationStyles {
  container: ViewStyle;
  header: TextStyle;
  label: TextStyle;
  value: TextStyle;
  image: ImageStyle;
}

// Create typed styles
const styles = StyleSheet.create<MedicationStyles>({
  container: {
    padding: theme.spacing.medium,
    backgroundColor: theme.colors.background
  },
  header: {
    fontSize: theme.typography.fontSize.large,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.primary,
    marginBottom: theme.spacing.small
  },
  label: {
    fontSize: theme.typography.fontSize.small,
    color: '#666'
  },
  value: {
    fontSize: theme.typography.fontSize.medium,
    marginBottom: theme.spacing.medium
  },
  image: {
    width: 100,
    height: 100,
    resizeMode: 'contain'
  }
});
```

## Practice Exercise: Medication Tracker Component
Create a type-safe React Native medication reminder component with the following requirements:

1. Define interfaces for medication reminders and user settings
2. Create a functional component with properly typed props
3. Implement state management with useState and TypeScript
4. Create a custom hook to fetch and manage medication data
5. Add type-safe event handlers for user interactions
6. Implement navigation with typed parameters

## Additional Resources
- [React TypeScript Cheatsheet](https://github.com/typescript-cheatsheets/react)
- [React Native TypeScript Documentation](https://reactnative.dev/docs/typescript)
- [React Navigation TypeScript Documentation](https://reactnavigation.org/docs/typescript/)

> 🔍 **Instructor Note**: When teaching this section, emphasize how TypeScript creates a better development experience with React Native. Show examples of common errors that TypeScript prevents, particularly when dealing with component props and navigation parameters.

> 🚀 **Self-Led Learners**: Start by converting simple React Native components to TypeScript, then gradually work your way up to more complex patterns like custom hooks and navigation. Pay special attention to type errors and learn from them.

> 🔄 **For Android Developers**: The way TypeScript works with React Native components is somewhat analogous to how you'd define interfaces for Android components. Focus on the similarities in design patterns.

> 🔄 **For iOS Developers**: If you're familiar with Swift's type system and UIKit, the pattern of defining types for component props is similar to how you'd define protocols and properties in Swift. Think of React component props as similar to initializer parameters in Swift. 