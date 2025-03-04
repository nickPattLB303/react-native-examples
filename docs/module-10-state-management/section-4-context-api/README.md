# Section 4: Context API

## Overview

The Context API is a built-in feature of React that allows you to share state between components without prop drilling. It provides a way to pass data through the component tree without having to pass props down manually at every level. This section covers how to implement and use the Context API effectively in your medication tracking application.

## Learning Objectives

By the end of this section, you will be able to:

- Understand the purpose and use cases of the Context API
- Create and use context providers and consumers
- Implement state management with Context and useReducer
- Optimize context performance to prevent unnecessary re-renders
- Structure context for maintainability and scalability
- Use TypeScript with Context for type safety
- Combine Context with other state management solutions
- Apply best practices for using Context in React Native applications

## Introduction to Context API

The Context API is a built-in feature of React that provides a way to share values like themes, user data, or any other global state between components without explicitly passing props through every level of the component tree.

### Key Concepts

- **Context**: An object that contains the shared state
- **Provider**: A component that provides the context value to its children
- **Consumer**: A component that consumes the context value
- **useContext**: A hook that allows functional components to consume context

### When to Use Context

Context is ideal for:

- Sharing global state that many components need (e.g., theme, user authentication)
- Avoiding prop drilling through multiple levels of components
- Managing UI-related state that affects multiple components
- Implementing simple state management without external libraries

## Creating and Using Context

### Basic Context

Create a simple context for theme settings:

```typescript
// contexts/ThemeContext.tsx
import React, { createContext, useState, ReactNode } from 'react';

// Define the shape of the context
type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

// Create the context with a default value
export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Create a provider component
interface ThemeProviderProps {
  children: ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>('light');
  
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };
  
  // The value that will be provided to consumers
  const value = {
    theme,
    toggleTheme,
  };
  
  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

// Create a custom hook for consuming the context
export function useTheme() {
  const context = React.useContext(ThemeContext);
  
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  
  return context;
}
```

### Using the Context in Components

```typescript
// App.tsx
import React from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import RootNavigator from './navigation/RootNavigator';

export default function App() {
  return (
    <ThemeProvider>
      <RootNavigator />
    </ThemeProvider>
  );
}

// components/ThemedButton.tsx
import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useTheme } from '../contexts/ThemeContext';

interface ThemedButtonProps {
  title: string;
  onPress: () => void;
}

export default function ThemedButton({ title, onPress }: ThemedButtonProps) {
  const { theme } = useTheme();
  
  const buttonStyle = {
    backgroundColor: theme === 'light' ? '#007AFF' : '#0A84FF',
  };
  
  const textStyle = {
    color: theme === 'light' ? '#FFFFFF' : '#F2F2F7',
  };
  
  return (
    <TouchableOpacity
      style={[styles.button, buttonStyle]}
      onPress={onPress}
    >
      <Text style={[styles.text, textStyle]}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});
```

## Context with useReducer

For more complex state management, combine Context with useReducer:

```typescript
// contexts/AuthContext.tsx
import React, { createContext, useReducer, useContext, ReactNode } from 'react';
import { User } from '../types';

// Define the state shape
interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: Error | null;
}

// Define the action types
type AuthAction =
  | { type: 'LOGIN_REQUEST' }
  | { type: 'LOGIN_SUCCESS'; payload: User }
  | { type: 'LOGIN_FAILURE'; payload: Error }
  | { type: 'LOGOUT' };

// Define the context shape
interface AuthContextType {
  state: AuthState;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

// Create the context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Create the reducer
function authReducer(state: AuthState, action: AuthAction): AuthState {
  switch (action.type) {
    case 'LOGIN_REQUEST':
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      };
    case 'LOGIN_FAILURE':
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: action.payload,
      };
    case 'LOGOUT':
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,
      };
    default:
      return state;
  }
}

// Create the provider
interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
    isAuthenticated: false,
    isLoading: false,
    error: null,
  });
  
  // Define the actions
  const login = async (email: string, password: string) => {
    dispatch({ type: 'LOGIN_REQUEST' });
    
    try {
      // Call your authentication API
      const response = await fetch('https://api.example.com/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      
      if (!response.ok) {
        throw new Error('Authentication failed');
      }
      
      const user = await response.json();
      dispatch({ type: 'LOGIN_SUCCESS', payload: user });
    } catch (error) {
      dispatch({ type: 'LOGIN_FAILURE', payload: error as Error });
    }
  };
  
  const logout = () => {
    dispatch({ type: 'LOGOUT' });
  };
  
  // Create the context value
  const value = {
    state,
    login,
    logout,
  };
  
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

// Create a custom hook for consuming the context
export function useAuth() {
  const context = useContext(AuthContext);
  
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  
  return context;
}
```

### Using the Auth Context

```typescript
// screens/LoginScreen.tsx
import React, { useState } from 'react';
import { View, TextInput, Button, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { useAuth } from '../contexts/AuthContext';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { state, login } = useAuth();
  
  const handleLogin = () => {
    login(email, password);
  };
  
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      {state.error && (
        <Text style={styles.error}>{state.error.message}</Text>
      )}
      {state.isLoading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <Button title="Login" onPress={handleLogin} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
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
    marginBottom: 12,
  },
});
```

## Optimizing Context Performance

### Splitting Context

Split context into smaller, more focused contexts to prevent unnecessary re-renders:

```typescript
// contexts/UserContext.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { User } from '../types';

interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  
  return context;
}

// contexts/AuthStatusContext.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface AuthStatusContextType {
  isAuthenticated: boolean;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
}

const AuthStatusContext = createContext<AuthStatusContextType | undefined>(undefined);

export function AuthStatusProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  return (
    <AuthStatusContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
      {children}
    </AuthStatusContext.Provider>
  );
}

export function useAuthStatus() {
  const context = useContext(AuthStatusContext);
  
  if (context === undefined) {
    throw new Error('useAuthStatus must be used within an AuthStatusProvider');
  }
  
  return context;
}
```

### Memoization

Use memoization to prevent unnecessary re-renders:

```typescript
// contexts/ThemeContext.tsx
import React, { createContext, useState, useMemo, ReactNode } from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>('light');
  
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };
  
  // Memoize the context value to prevent unnecessary re-renders
  const value = useMemo(
    () => ({
      theme,
      toggleTheme,
    }),
    [theme]
  );
  
  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}
```

### Context Selectors

Implement a selector pattern to consume only the needed parts of context:

```typescript
// contexts/AppContext.tsx
import React, { createContext, useReducer, useContext, ReactNode } from 'react';

interface AppState {
  theme: 'light' | 'dark';
  language: 'en' | 'es' | 'fr';
  notifications: boolean;
  fontSize: 'small' | 'medium' | 'large';
}

type AppAction =
  | { type: 'SET_THEME'; payload: 'light' | 'dark' }
  | { type: 'SET_LANGUAGE'; payload: 'en' | 'es' | 'fr' }
  | { type: 'TOGGLE_NOTIFICATIONS' }
  | { type: 'SET_FONT_SIZE'; payload: 'small' | 'medium' | 'large' };

const AppContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
} | undefined>(undefined);

function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'SET_THEME':
      return { ...state, theme: action.payload };
    case 'SET_LANGUAGE':
      return { ...state, language: action.payload };
    case 'TOGGLE_NOTIFICATIONS':
      return { ...state, notifications: !state.notifications };
    case 'SET_FONT_SIZE':
      return { ...state, fontSize: action.payload };
    default:
      return state;
  }
}

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, {
    theme: 'light',
    language: 'en',
    notifications: true,
    fontSize: 'medium',
  });
  
  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}

// Custom hooks for selecting specific parts of the context
export function useAppTheme() {
  const context = useContext(AppContext);
  
  if (context === undefined) {
    throw new Error('useAppTheme must be used within an AppProvider');
  }
  
  return {
    theme: context.state.theme,
    setTheme: (theme: 'light' | 'dark') => {
      context.dispatch({ type: 'SET_THEME', payload: theme });
    },
  };
}

export function useAppLanguage() {
  const context = useContext(AppContext);
  
  if (context === undefined) {
    throw new Error('useAppLanguage must be used within an AppProvider');
  }
  
  return {
    language: context.state.language,
    setLanguage: (language: 'en' | 'es' | 'fr') => {
      context.dispatch({ type: 'SET_LANGUAGE', payload: language });
    },
  };
}

export function useAppNotifications() {
  const context = useContext(AppContext);
  
  if (context === undefined) {
    throw new Error('useAppNotifications must be used within an AppProvider');
  }
  
  return {
    notifications: context.state.notifications,
    toggleNotifications: () => {
      context.dispatch({ type: 'TOGGLE_NOTIFICATIONS' });
    },
  };
}
```

## Context with TypeScript

### Type-Safe Context

Create type-safe context with TypeScript:

```typescript
// contexts/MedicationContext.tsx
import React, { createContext, useReducer, useContext, ReactNode } from 'react';
import { Medication } from '../types';

// Define the state shape
interface MedicationState {
  medications: Medication[];
  selectedMedicationId: string | null;
  isLoading: boolean;
  error: Error | null;
}

// Define the action types
type MedicationAction =
  | { type: 'FETCH_MEDICATIONS_REQUEST' }
  | { type: 'FETCH_MEDICATIONS_SUCCESS'; payload: Medication[] }
  | { type: 'FETCH_MEDICATIONS_FAILURE'; payload: Error }
  | { type: 'SELECT_MEDICATION'; payload: string }
  | { type: 'ADD_MEDICATION'; payload: Medication }
  | { type: 'UPDATE_MEDICATION'; payload: Medication }
  | { type: 'DELETE_MEDICATION'; payload: string };

// Define the context shape
interface MedicationContextType {
  state: MedicationState;
  dispatch: React.Dispatch<MedicationAction>;
  fetchMedications: () => Promise<void>;
  selectMedication: (id: string) => void;
  addMedication: (medication: Omit<Medication, 'id'>) => Promise<void>;
  updateMedication: (medication: Medication) => Promise<void>;
  deleteMedication: (id: string) => Promise<void>;
}

// Create the context
const MedicationContext = createContext<MedicationContextType | undefined>(undefined);

// Create the reducer
function medicationReducer(state: MedicationState, action: MedicationAction): MedicationState {
  switch (action.type) {
    case 'FETCH_MEDICATIONS_REQUEST':
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case 'FETCH_MEDICATIONS_SUCCESS':
      return {
        ...state,
        medications: action.payload,
        isLoading: false,
        error: null,
      };
    case 'FETCH_MEDICATIONS_FAILURE':
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    case 'SELECT_MEDICATION':
      return {
        ...state,
        selectedMedicationId: action.payload,
      };
    case 'ADD_MEDICATION':
      return {
        ...state,
        medications: [...state.medications, action.payload],
      };
    case 'UPDATE_MEDICATION':
      return {
        ...state,
        medications: state.medications.map((med) =>
          med.id === action.payload.id ? action.payload : med
        ),
      };
    case 'DELETE_MEDICATION':
      return {
        ...state,
        medications: state.medications.filter((med) => med.id !== action.payload),
        selectedMedicationId:
          state.selectedMedicationId === action.payload
            ? null
            : state.selectedMedicationId,
      };
    default:
      return state;
  }
}

// Create the provider
interface MedicationProviderProps {
  children: ReactNode;
}

export function MedicationProvider({ children }: MedicationProviderProps) {
  const [state, dispatch] = useReducer(medicationReducer, {
    medications: [],
    selectedMedicationId: null,
    isLoading: false,
    error: null,
  });
  
  // Define the actions
  const fetchMedications = async () => {
    dispatch({ type: 'FETCH_MEDICATIONS_REQUEST' });
    
    try {
      // Call your API
      const response = await fetch('https://api.example.com/medications');
      
      if (!response.ok) {
        throw new Error('Failed to fetch medications');
      }
      
      const medications = await response.json();
      dispatch({ type: 'FETCH_MEDICATIONS_SUCCESS', payload: medications });
    } catch (error) {
      dispatch({ type: 'FETCH_MEDICATIONS_FAILURE', payload: error as Error });
    }
  };
  
  const selectMedication = (id: string) => {
    dispatch({ type: 'SELECT_MEDICATION', payload: id });
  };
  
  const addMedication = async (medication: Omit<Medication, 'id'>) => {
    try {
      // Call your API
      const response = await fetch('https://api.example.com/medications', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(medication),
      });
      
      if (!response.ok) {
        throw new Error('Failed to add medication');
      }
      
      const newMedication = await response.json();
      dispatch({ type: 'ADD_MEDICATION', payload: newMedication });
    } catch (error) {
      console.error('Error adding medication:', error);
    }
  };
  
  const updateMedication = async (medication: Medication) => {
    try {
      // Call your API
      const response = await fetch(`https://api.example.com/medications/${medication.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(medication),
      });
      
      if (!response.ok) {
        throw new Error('Failed to update medication');
      }
      
      const updatedMedication = await response.json();
      dispatch({ type: 'UPDATE_MEDICATION', payload: updatedMedication });
    } catch (error) {
      console.error('Error updating medication:', error);
    }
  };
  
  const deleteMedication = async (id: string) => {
    try {
      // Call your API
      const response = await fetch(`https://api.example.com/medications/${id}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) {
        throw new Error('Failed to delete medication');
      }
      
      dispatch({ type: 'DELETE_MEDICATION', payload: id });
    } catch (error) {
      console.error('Error deleting medication:', error);
    }
  };
  
  // Create the context value
  const value = {
    state,
    dispatch,
    fetchMedications,
    selectMedication,
    addMedication,
    updateMedication,
    deleteMedication,
  };
  
  return (
    <MedicationContext.Provider value={value}>
      {children}
    </MedicationContext.Provider>
  );
}

// Create a custom hook for consuming the context
export function useMedication() {
  const context = useContext(MedicationContext);
  
  if (context === undefined) {
    throw new Error('useMedication must be used within a MedicationProvider');
  }
  
  return context;
}
```

## Combining Context with Other State Management Solutions

### Context with React Query

Use Context to provide React Query client:

```typescript
// contexts/QueryContext.tsx
import React, { ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

interface QueryProviderProps {
  children: ReactNode;
}

export function QueryProvider({ children }: QueryProviderProps) {
  const [queryClient] = React.useState(() => new QueryClient());
  
  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
}
```

### Context with Zustand

Use Context for UI state and Zustand for global state:

```typescript
// App.tsx
import React from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import { AuthProvider } from './contexts/AuthContext';
import { QueryProvider } from './contexts/QueryContext';
import RootNavigator from './navigation/RootNavigator';

export default function App() {
  return (
    <QueryProvider>
      <AuthProvider>
        <ThemeProvider>
          <RootNavigator />
        </ThemeProvider>
      </AuthProvider>
    </QueryProvider>
  );
}
```

## Context for Specific Use Cases

### Theme Context

```typescript
// contexts/ThemeContext.tsx
import React, { createContext, useContext, useState, useMemo, ReactNode } from 'react';
import { colors } from '../styles/colors';

type ThemeMode = 'light' | 'dark';

interface ThemeColors {
  primary: string;
  secondary: string;
  background: string;
  card: string;
  text: string;
  border: string;
  notification: string;
}

interface ThemeContextType {
  mode: ThemeMode;
  colors: ThemeColors;
  toggleTheme: () => void;
}

const lightColors: ThemeColors = {
  primary: colors.blue[500],
  secondary: colors.purple[500],
  background: colors.gray[50],
  card: colors.white,
  text: colors.gray[900],
  border: colors.gray[200],
  notification: colors.red[500],
};

const darkColors: ThemeColors = {
  primary: colors.blue[400],
  secondary: colors.purple[400],
  background: colors.gray[900],
  card: colors.gray[800],
  text: colors.gray[50],
  border: colors.gray[700],
  notification: colors.red[400],
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<ThemeMode>('light');
  
  const toggleTheme = () => {
    setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  };
  
  const themeColors = mode === 'light' ? lightColors : darkColors;
  
  const value = useMemo(
    () => ({
      mode,
      colors: themeColors,
      toggleTheme,
    }),
    [mode, themeColors]
  );
  
  return (
    <ThemeContext.Provider value={value}>
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

### Authentication Context

```typescript
// contexts/AuthContext.tsx
import React, { createContext, useReducer, useContext, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { User } from '../types';

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: Error | null;
}

type AuthAction =
  | { type: 'RESTORE_TOKEN'; payload: string | null }
  | { type: 'RESTORE_USER'; payload: User | null }
  | { type: 'LOGIN_REQUEST' }
  | { type: 'LOGIN_SUCCESS'; payload: { user: User; token: string } }
  | { type: 'LOGIN_FAILURE'; payload: Error }
  | { type: 'LOGOUT' };

interface AuthContextType {
  state: AuthState;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

function authReducer(state: AuthState, action: AuthAction): AuthState {
  switch (action.type) {
    case 'RESTORE_TOKEN':
      return {
        ...state,
        token: action.payload,
        isLoading: false,
      };
    case 'RESTORE_USER':
      return {
        ...state,
        user: action.payload,
        isAuthenticated: !!action.payload,
        isLoading: false,
      };
    case 'LOGIN_REQUEST':
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      };
    case 'LOGIN_FAILURE':
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    case 'LOGOUT':
      return {
        ...state,
        user: null,
        token: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,
      };
    default:
      return state;
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
    token: null,
    isAuthenticated: false,
    isLoading: true,
    error: null,
  });
  
  // Load token and user from storage on mount
  useEffect(() => {
    const bootstrapAsync = async () => {
      try {
        const token = await AsyncStorage.getItem('userToken');
        dispatch({ type: 'RESTORE_TOKEN', payload: token });
        
        if (token) {
          const userJson = await AsyncStorage.getItem('user');
          const user = userJson ? JSON.parse(userJson) : null;
          dispatch({ type: 'RESTORE_USER', payload: user });
        }
      } catch (e) {
        console.error('Failed to load auth state:', e);
      }
    };
    
    bootstrapAsync();
  }, []);
  
  const login = async (email: string, password: string) => {
    dispatch({ type: 'LOGIN_REQUEST' });
    
    try {
      // Call your authentication API
      const response = await fetch('https://api.example.com/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      
      if (!response.ok) {
        throw new Error('Authentication failed');
      }
      
      const data = await response.json();
      
      // Store token and user in storage
      await AsyncStorage.setItem('userToken', data.token);
      await AsyncStorage.setItem('user', JSON.stringify(data.user));
      
      dispatch({
        type: 'LOGIN_SUCCESS',
        payload: { user: data.user, token: data.token },
      });
    } catch (error) {
      dispatch({ type: 'LOGIN_FAILURE', payload: error as Error });
    }
  };
  
  const logout = async () => {
    // Remove token and user from storage
    await AsyncStorage.removeItem('userToken');
    await AsyncStorage.removeItem('user');
    
    dispatch({ type: 'LOGOUT' });
  };
  
  const value = {
    state,
    login,
    logout,
  };
  
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  
  return context;
}
```

## Best Practices

1. **Keep context focused**: Create separate contexts for different domains
2. **Use memoization**: Memoize context values to prevent unnecessary re-renders
3. **Split contexts**: Split large contexts into smaller ones to prevent unnecessary re-renders
4. **Use custom hooks**: Create custom hooks for consuming context
5. **Combine with useReducer**: Use useReducer for complex state logic
6. **Provide default values**: Always provide meaningful default values for contexts
7. **Error handling**: Add error handling for context consumers
8. **TypeScript integration**: Use TypeScript for type safety
9. **Performance optimization**: Be mindful of re-renders caused by context changes
10. **Testing**: Make context providers easy to mock for testing

## Exercise: Implementing Context API

Implement the Context API in a medication tracking application:

1. Create a theme context for light/dark mode
2. Create an authentication context for user authentication
3. Create a medication context for managing medications
4. Optimize performance with memoization and context splitting
5. Add TypeScript types for all contexts
6. Combine Context API with React Query for server state
7. Implement persistence for authentication state

## Next Steps

In the next section, we'll explore local storage options in React Native, including AsyncStorage, SecureStore, FileSystem, and SQLite.

## Additional Resources

- [React Context Documentation](https://reactjs.org/docs/context.html)
- [TypeScript with React Context](https://react-typescript-cheatsheet.netlify.app/docs/basic/getting-started/context/)
- [Performance Optimization with Context](https://reactjs.org/docs/context.html#caveats)
- [useReducer Documentation](https://reactjs.org/docs/hooks-reference.html#usereducer)
- [Context API Best Practices](https://kentcdodds.com/blog/how-to-use-react-context-effectively)
