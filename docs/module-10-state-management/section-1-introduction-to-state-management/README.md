# Section 1: Introduction to State Management

## Overview

State management is a critical aspect of React Native application development. This section introduces the fundamental concepts of state management, different types of state, and various approaches to managing state in React Native applications.

## Learning Objectives

By the end of this section, you will be able to:

- Understand the concept of state in React Native applications
- Identify different types of state and their appropriate management strategies
- Compare various state management solutions
- Choose the right state management approach for different scenarios
- Implement basic state management using React's built-in features

## What is State?

State in React Native applications refers to any data that can change over time and affects the rendering of components. State is what allows your application to be dynamic and interactive, responding to user actions and external events.

### Characteristics of State

- **Mutable**: State can change over time
- **Persistent**: State can persist across renders
- **Influential**: State affects how components render
- **Hierarchical**: State can be passed down to child components
- **Distributed**: State can exist at different levels of your application

## Types of State

Understanding the different types of state is crucial for choosing the right management approach. State can be categorized in several ways:

### By Scope

#### Local Component State

State that is specific to a single component and doesn't need to be shared with other parts of the application.

**Examples:**
- Form input values
- Toggle states (expanded/collapsed)
- UI state (loading, error, success)

**Management approach:**
- React's `useState` hook
- Component class state

```typescript
import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet } from 'react-native';

function MedicationForm() {
  const [name, setName] = useState('');
  const [dosage, setDosage] = useState('');
  const [isValid, setIsValid] = useState(true);
  
  const validateForm = () => {
    const valid = name.length > 0 && dosage.length > 0;
    setIsValid(valid);
    return valid;
  };
  
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholder="Medication Name"
      />
      <TextInput
        style={styles.input}
        value={dosage}
        onChangeText={setDosage}
        placeholder="Dosage"
        keyboardType="numeric"
      />
      {!isValid && (
        <Text style={styles.error}>Please fill in all fields</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
  error: {
    color: 'red',
    marginTop: 8,
  },
});
```

#### Shared State

State that needs to be accessed or modified by multiple components.

**Examples:**
- User authentication status
- Theme settings
- Shopping cart contents

**Management approaches:**
- Context API
- Zustand
- Redux

```typescript
// Using Context API for theme state
import React, { createContext, useContext, useState } from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('light');
  
  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };
  
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
```

### By Origin

#### Client State

State that originates and is managed on the client side.

**Examples:**
- UI state
- Form state
- Navigation state

**Management approaches:**
- React's built-in state
- Zustand
- Context API

#### Server State

State that originates from a server and needs to be synchronized with the client.

**Examples:**
- API data
- User profile information
- Content that needs to be fetched from a backend

**Management approaches:**
- React Query
- SWR
- Apollo Client (for GraphQL)

```typescript
// Using React Query for server state
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchMedications, addMedication } from '../api/medications';

function useMedications() {
  // Query for fetching medications
  const medicationsQuery = useQuery({
    queryKey: ['medications'],
    queryFn: fetchMedications,
  });
  
  // Query client for invalidation
  const queryClient = useQueryClient();
  
  // Mutation for adding a medication
  const addMedicationMutation = useMutation({
    mutationFn: addMedication,
    onSuccess: () => {
      // Invalidate and refetch medications query
      queryClient.invalidateQueries({ queryKey: ['medications'] });
    },
  });
  
  return {
    medications: medicationsQuery.data || [],
    isLoading: medicationsQuery.isLoading,
    isError: medicationsQuery.isError,
    error: medicationsQuery.error,
    addMedication: addMedicationMutation.mutate,
    isAdding: addMedicationMutation.isPending,
  };
}
```

### By Persistence

#### Ephemeral State

State that exists only during the current session and is lost when the app is closed.

**Examples:**
- Current form values
- UI state (expanded/collapsed sections)
- Navigation state

**Management approaches:**
- React's built-in state
- Context API
- Zustand

#### Persistent State

State that needs to persist across app restarts.

**Examples:**
- User preferences
- Authentication tokens
- Cached data

**Management approaches:**
- AsyncStorage
- SecureStore
- SQLite
- FileSystem

```typescript
// Using AsyncStorage for persistent state
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState, useEffect } from 'react';

function usePersistedState<T>(key: string, initialValue: T) {
  const [state, setState] = useState<T>(initialValue);
  const [isLoading, setIsLoading] = useState(true);
  
  // Load persisted state on mount
  useEffect(() => {
    const loadState = async () => {
      try {
        const savedState = await AsyncStorage.getItem(key);
        if (savedState !== null) {
          setState(JSON.parse(savedState));
        }
      } catch (error) {
        console.error('Error loading state:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadState();
  }, [key]);
  
  // Persist state changes
  const setPersistedState = async (newState: T) => {
    try {
      const serializedState = JSON.stringify(newState);
      await AsyncStorage.setItem(key, serializedState);
      setState(newState);
    } catch (error) {
      console.error('Error saving state:', error);
    }
  };
  
  return [state, setPersistedState, isLoading] as const;
}
```

## State Management Approaches

### React's Built-in State Management

React provides built-in mechanisms for managing state within components.

#### useState Hook

The `useState` hook is the simplest way to add state to a functional component.

```typescript
import React, { useState } from 'react';
import { View, Button, Text } from 'react-native';

function Counter() {
  const [count, setCount] = useState(0);
  
  return (
    <View>
      <Text>Count: {count}</Text>
      <Button title="Increment" onPress={() => setCount(count + 1)} />
      <Button title="Decrement" onPress={() => setCount(count - 1)} />
    </View>
  );
}
```

#### useReducer Hook

The `useReducer` hook is a more powerful alternative to `useState` for complex state logic.

```typescript
import React, { useReducer } from 'react';
import { View, Button, Text } from 'react-native';

type CounterState = { count: number };
type CounterAction = 
  | { type: 'increment'; payload?: number }
  | { type: 'decrement'; payload?: number }
  | { type: 'reset' };

function counterReducer(state: CounterState, action: CounterAction): CounterState {
  switch (action.type) {
    case 'increment':
      return { count: state.count + (action.payload || 1) };
    case 'decrement':
      return { count: state.count - (action.payload || 1) };
    case 'reset':
      return { count: 0 };
    default:
      return state;
  }
}

function Counter() {
  const [state, dispatch] = useReducer(counterReducer, { count: 0 });
  
  return (
    <View>
      <Text>Count: {state.count}</Text>
      <Button title="Increment" onPress={() => dispatch({ type: 'increment' })} />
      <Button title="Increment by 5" onPress={() => dispatch({ type: 'increment', payload: 5 })} />
      <Button title="Decrement" onPress={() => dispatch({ type: 'decrement' })} />
      <Button title="Reset" onPress={() => dispatch({ type: 'reset' })} />
    </View>
  );
}
```

### Context API

React's Context API provides a way to share state between components without prop drilling.

```typescript
import React, { createContext, useContext, useReducer, ReactNode } from 'react';

// Define the shape of the cart state
interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  total: number;
}

// Define the actions
type CartAction =
  | { type: 'ADD_ITEM'; payload: CartItem }
  | { type: 'REMOVE_ITEM'; payload: string }
  | { type: 'UPDATE_QUANTITY'; payload: { id: string; quantity: number } }
  | { type: 'CLEAR_CART' };

// Create the context
interface CartContextType {
  state: CartState;
  dispatch: React.Dispatch<CartAction>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

// Reducer function
function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existingItem = state.items.find(item => item.id === action.payload.id);
      
      if (existingItem) {
        // Update existing item
        const updatedItems = state.items.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: item.quantity + action.payload.quantity }
            : item
        );
        
        return {
          items: updatedItems,
          total: calculateTotal(updatedItems),
        };
      } else {
        // Add new item
        const updatedItems = [...state.items, action.payload];
        
        return {
          items: updatedItems,
          total: calculateTotal(updatedItems),
        };
      }
    }
    
    case 'REMOVE_ITEM': {
      const updatedItems = state.items.filter(item => item.id !== action.payload);
      
      return {
        items: updatedItems,
        total: calculateTotal(updatedItems),
      };
    }
    
    case 'UPDATE_QUANTITY': {
      const updatedItems = state.items.map(item =>
        item.id === action.payload.id
          ? { ...item, quantity: action.payload.quantity }
          : item
      );
      
      return {
        items: updatedItems,
        total: calculateTotal(updatedItems),
      };
    }
    
    case 'CLEAR_CART':
      return {
        items: [],
        total: 0,
      };
      
    default:
      return state;
  }
}

// Helper function to calculate total
function calculateTotal(items: CartItem[]): number {
  return items.reduce((total, item) => total + item.price * item.quantity, 0);
}

// Provider component
export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [], total: 0 });
  
  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
}

// Custom hook to use the cart context
export function useCart() {
  const context = useContext(CartContext);
  
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  
  return context;
}
```

### External State Management Libraries

#### React Query

React Query is specialized for managing server state, with built-in caching, background updates, and more.

```typescript
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useQuery, useMutation } from '@tanstack/react-query';
import { fetchMedications, fetchMedicationById } from '../api/medications';

// Create a client
const queryClient = new QueryClient();

// Wrap your app with the provider
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <YourApp />
    </QueryClientProvider>
  );
}

// Use in components
function MedicationsList() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['medications'],
    queryFn: fetchMedications,
  });
  
  if (isLoading) return <LoadingIndicator />;
  if (error) return <ErrorDisplay error={error} />;
  
  return (
    <FlatList
      data={data}
      renderItem={({ item }) => <MedicationItem medication={item} />}
      keyExtractor={item => item.id}
    />
  );
}

function MedicationDetail({ id }) {
  const { data, isLoading, error } = useQuery({
    queryKey: ['medication', id],
    queryFn: () => fetchMedicationById(id),
  });
  
  // Component implementation
}
```

#### Zustand

Zustand is a small, fast, and scalable state management solution with a simple API.

```typescript
import create from 'zustand';

interface MedicationStore {
  medications: Medication[];
  selectedMedicationId: string | null;
  isLoading: boolean;
  error: Error | null;
  fetchMedications: () => Promise<void>;
  selectMedication: (id: string) => void;
  addMedication: (medication: Medication) => Promise<void>;
}

const useMedicationStore = create<MedicationStore>((set, get) => ({
  medications: [],
  selectedMedicationId: null,
  isLoading: false,
  error: null,
  
  fetchMedications: async () => {
    set({ isLoading: true, error: null });
    try {
      const medications = await api.fetchMedications();
      set({ medications, isLoading: false });
    } catch (error) {
      set({ error, isLoading: false });
    }
  },
  
  selectMedication: (id) => {
    set({ selectedMedicationId: id });
  },
  
  addMedication: async (medication) => {
    set({ isLoading: true, error: null });
    try {
      await api.addMedication(medication);
      const medications = await api.fetchMedications();
      set({ medications, isLoading: false });
    } catch (error) {
      set({ error, isLoading: false });
    }
  },
}));

// Use in components
function MedicationsList() {
  const { medications, isLoading, error, fetchMedications } = useMedicationStore();
  
  useEffect(() => {
    fetchMedications();
  }, []);
  
  // Component implementation
}
```

## Choosing the Right State Management Approach

Selecting the appropriate state management solution depends on several factors:

### Decision Factors

1. **Complexity of state**: Simple state might only need `useState`, while complex state might benefit from `useReducer` or external libraries
2. **Scope of state**: Local state can use React's built-in solutions, while widely shared state might need Context or Zustand
3. **Origin of state**: Server state is best managed with React Query, while client state can use various approaches
4. **Team familiarity**: Consider your team's experience with different solutions
5. **Performance requirements**: Some solutions offer better performance for specific use cases
6. **Bundle size concerns**: External libraries add to your bundle size

### Decision Tree

```
Is it server state (API data)?
├── Yes → Use React Query
└── No → Is it shared across many components?
    ├── Yes → Is it complex with many operations?
    │   ├── Yes → Use Zustand
    │   └── No → Use Context API
    └── No → Is it complex local state?
        ├── Yes → Use useReducer
        └── No → Use useState
```

### State Management Hierarchy

For our medication tracking app, we'll follow this hierarchy:

1. **React Query**: For all server state (API data)
2. **Zustand**: For global client state
3. **Context API**: For theme and other UI-related shared state
4. **useState/useReducer**: For component-local state

## Best Practices

1. **Keep state as local as possible**: Don't use global state for everything
2. **Separate concerns**: Different types of state often need different management approaches
3. **Use TypeScript**: Define clear types for your state and actions
4. **Normalize complex state**: Avoid deeply nested state structures
5. **Minimize state updates**: Batch updates when possible
6. **Consider performance**: Be mindful of re-renders caused by state changes
7. **Document state shape**: Make it clear what your state contains and how it's structured

## Exercise: State Management Analysis

Analyze the state management needs of a medication tracking application:

1. Identify all the different types of state needed
2. Categorize each type of state (local/shared, client/server, ephemeral/persistent)
3. Choose the appropriate state management approach for each type
4. Create a state management plan document

## Next Steps

In the next section, we'll dive deeper into React Query, learning how to effectively manage server state in React Native applications.

## Additional Resources

- [React State Management Guide](https://reactjs.org/docs/hooks-state.html)
- [TanStack Query Documentation](https://tanstack.com/query/latest/docs/framework/react/react-native)
- [Zustand Documentation](https://zustand.docs.pmnd.rs/getting-started/introduction)
- [React Context API Documentation](https://reactjs.org/docs/context.html)
- [State Management in React Native](https://reactnative.dev/docs/state)
