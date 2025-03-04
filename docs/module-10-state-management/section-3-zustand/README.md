# Section 3: Zustand

## Overview

Zustand is a small, fast, and scalable state management library for React and React Native applications. It provides a simple yet powerful API for managing global state without the boilerplate typically associated with other state management solutions. This section covers how to implement and use Zustand effectively in your medication tracking application.

## Learning Objectives

By the end of this section, you will be able to:

- Set up Zustand in a React Native application
- Create and manage global state stores
- Implement actions and derived state
- Combine multiple stores for complex applications
- Persist state with storage adapters
- Optimize performance with selectors
- Use middleware for logging and debugging
- Implement TypeScript with Zustand for type safety

## Introduction to Zustand

Zustand (German for "state") is a minimalist state management library that uses a simple hook-based API. It was created to address the complexity and boilerplate associated with other state management solutions like Redux.

### Key Features

- **Simple API**: Minimal boilerplate and straightforward API
- **Hook-based**: Uses React hooks for accessing state
- **No providers needed**: No need to wrap your app in providers
- **Middleware support**: Extensible with middleware
- **TypeScript support**: Full TypeScript support
- **Small bundle size**: Lightweight with minimal impact on bundle size
- **Selective updates**: Components only re-render when their specific slice of state changes
- **Persistence**: Built-in support for persisting state

### When to Use Zustand

Zustand is ideal for:

- Managing global client-side state
- Sharing state between components
- Implementing complex state logic
- Situations where Context API would cause too many re-renders
- Applications that need a lightweight state management solution

## Setting Up Zustand

### Installation

To add Zustand to your React Native project:

```bash
npm install zustand
# or
yarn add zustand
```

### Creating a Basic Store

Create a store using the `create` function:

```typescript
// stores/useCounterStore.ts
import { create } from 'zustand';

interface CounterState {
  count: number;
  increment: () => void;
  decrement: () => void;
  reset: () => void;
}

const useCounterStore = create<CounterState>((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
  decrement: () => set((state) => ({ count: state.count - 1 })),
  reset: () => set({ count: 0 }),
}));

export default useCounterStore;
```

### Using the Store in Components

Use the store in your components with the hook:

```typescript
// components/Counter.tsx
import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import useCounterStore from '../stores/useCounterStore';

export default function Counter() {
  // Get only what you need from the store
  const { count, increment, decrement, reset } = useCounterStore();
  
  return (
    <View style={styles.container}>
      <Text style={styles.count}>Count: {count}</Text>
      <View style={styles.buttonContainer}>
        <Button title="Increment" onPress={increment} />
        <Button title="Decrement" onPress={decrement} />
        <Button title="Reset" onPress={reset} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    alignItems: 'center',
  },
  count: {
    fontSize: 24,
    marginBottom: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
});
```

## Advanced Store Patterns

### Async Actions

Implement asynchronous actions in your store:

```typescript
// stores/useMedicationStore.ts
import { create } from 'zustand';
import { fetchMedications, addMedication, updateMedication, deleteMedication } from '../api/medications';
import { Medication } from '../types';

interface MedicationState {
  medications: Medication[];
  isLoading: boolean;
  error: Error | null;
  
  // Actions
  fetchMedications: () => Promise<void>;
  addMedication: (medication: Omit<Medication, 'id'>) => Promise<void>;
  updateMedication: (medication: Medication) => Promise<void>;
  deleteMedication: (id: string) => Promise<void>;
}

const useMedicationStore = create<MedicationState>((set, get) => ({
  medications: [],
  isLoading: false,
  error: null,
  
  fetchMedications: async () => {
    set({ isLoading: true, error: null });
    try {
      const medications = await fetchMedications();
      set({ medications, isLoading: false });
    } catch (error) {
      set({ error: error as Error, isLoading: false });
    }
  },
  
  addMedication: async (medication) => {
    set({ isLoading: true, error: null });
    try {
      const newMedication = await addMedication(medication);
      set((state) => ({
        medications: [...state.medications, newMedication],
        isLoading: false,
      }));
    } catch (error) {
      set({ error: error as Error, isLoading: false });
    }
  },
  
  updateMedication: async (medication) => {
    set({ isLoading: true, error: null });
    try {
      const updatedMedication = await updateMedication(medication);
      set((state) => ({
        medications: state.medications.map((med) =>
          med.id === medication.id ? updatedMedication : med
        ),
        isLoading: false,
      }));
    } catch (error) {
      set({ error: error as Error, isLoading: false });
    }
  },
  
  deleteMedication: async (id) => {
    set({ isLoading: true, error: null });
    try {
      await deleteMedication(id);
      set((state) => ({
        medications: state.medications.filter((med) => med.id !== id),
        isLoading: false,
      }));
    } catch (error) {
      set({ error: error as Error, isLoading: false });
    }
  },
}));

export default useMedicationStore;
```

### Computed Values with Getters

Use the `get` function to access the current state and compute derived values:

```typescript
// stores/useCartStore.ts
import { create } from 'zustand';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  
  // Derived state
  totalItems: number;
  totalPrice: number;
  
  // Actions
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
}

const useCartStore = create<CartState>((set, get) => ({
  items: [],
  
  // Derived state using getters
  get totalItems() {
    return get().items.reduce((total, item) => total + item.quantity, 0);
  },
  
  get totalPrice() {
    return get().items.reduce((total, item) => total + item.price * item.quantity, 0);
  },
  
  // Actions
  addItem: (item) => {
    set((state) => {
      const existingItem = state.items.find((i) => i.id === item.id);
      
      if (existingItem) {
        // Update existing item
        return {
          items: state.items.map((i) =>
            i.id === item.id
              ? { ...i, quantity: i.quantity + item.quantity }
              : i
          ),
        };
      } else {
        // Add new item
        return {
          items: [...state.items, item],
        };
      }
    });
  },
  
  removeItem: (id) => {
    set((state) => ({
      items: state.items.filter((item) => item.id !== id),
    }));
  },
  
  updateQuantity: (id, quantity) => {
    set((state) => ({
      items: state.items.map((item) =>
        item.id === id ? { ...item, quantity } : item
      ),
    }));
  },
  
  clearCart: () => {
    set({ items: [] });
  },
}));

export default useCartStore;
```

### Slices for Organizing Complex State

For complex stores, you can organize state into slices:

```typescript
// stores/useAppStore.ts
import { create } from 'zustand';
import { Medication, Prescription, User } from '../types';

// Define slices
interface UserSlice {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

interface MedicationSlice {
  medications: Medication[];
  fetchMedications: () => Promise<void>;
  addMedication: (medication: Omit<Medication, 'id'>) => Promise<void>;
}

interface PrescriptionSlice {
  prescriptions: Prescription[];
  fetchPrescriptions: () => Promise<void>;
  addPrescription: (prescription: Omit<Prescription, 'id'>) => Promise<void>;
}

// Combine slices
interface AppState extends UserSlice, MedicationSlice, PrescriptionSlice {}

// Create user slice
const createUserSlice = (set, get) => ({
  user: null,
  isAuthenticated: false,
  
  login: async (email, password) => {
    // Implementation
  },
  
  logout: () => {
    set({ user: null, isAuthenticated: false });
  },
});

// Create medication slice
const createMedicationSlice = (set, get) => ({
  medications: [],
  
  fetchMedications: async () => {
    // Implementation
  },
  
  addMedication: async (medication) => {
    // Implementation
  },
});

// Create prescription slice
const createPrescriptionSlice = (set, get) => ({
  prescriptions: [],
  
  fetchPrescriptions: async () => {
    // Implementation
  },
  
  addPrescription: async (prescription) => {
    // Implementation
  },
});

// Create combined store
const useAppStore = create<AppState>((set, get) => ({
  ...createUserSlice(set, get),
  ...createMedicationSlice(set, get),
  ...createPrescriptionSlice(set, get),
}));

export default useAppStore;
```

## Optimizing Performance

### Selectors

Use selectors to prevent unnecessary re-renders:

```typescript
// Using selectors in components
import useAppStore from '../stores/useAppStore';

// This component will only re-render when medications change
function MedicationsList() {
  const medications = useAppStore((state) => state.medications);
  
  return (
    // Component implementation
  );
}

// This component will only re-render when the user changes
function UserProfile() {
  const user = useAppStore((state) => state.user);
  
  return (
    // Component implementation
  );
}
```

### Shallow Equality

Use shallow equality to compare objects:

```typescript
import { shallow } from 'zustand/shallow';
import useAppStore from '../stores/useAppStore';

function UserInfo() {
  // This will only re-render when either user.name or user.email changes
  const { name, email } = useAppStore(
    (state) => ({
      name: state.user?.name,
      email: state.user?.email,
    }),
    shallow
  );
  
  return (
    // Component implementation
  );
}
```

## Persistence

### Persisting State

Use the `persist` middleware to persist state:

```typescript
// stores/useSettingsStore.ts
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface SettingsState {
  theme: 'light' | 'dark';
  notifications: boolean;
  fontSize: 'small' | 'medium' | 'large';
  
  // Actions
  setTheme: (theme: 'light' | 'dark') => void;
  toggleNotifications: () => void;
  setFontSize: (size: 'small' | 'medium' | 'large') => void;
}

const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      theme: 'light',
      notifications: true,
      fontSize: 'medium',
      
      setTheme: (theme) => set({ theme }),
      toggleNotifications: () => set((state) => ({ notifications: !state.notifications })),
      setFontSize: (fontSize) => set({ fontSize }),
    }),
    {
      name: 'settings-storage', // unique name
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);

export default useSettingsStore;
```

### Hydration

Handle hydration state to prevent rendering before state is loaded:

```typescript
// components/SettingsScreen.tsx
import React from 'react';
import { View, Text, Switch, ActivityIndicator, StyleSheet } from 'react-native';
import useSettingsStore from '../stores/useSettingsStore';

export default function SettingsScreen() {
  const { theme, notifications, toggleNotifications, setTheme } = useSettingsStore();
  const isHydrated = useSettingsStore.persist.hasHydrated();
  
  if (!isHydrated) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" />
        <Text>Loading settings...</Text>
      </View>
    );
  }
  
  return (
    <View style={styles.container}>
      <View style={styles.setting}>
        <Text>Dark Mode</Text>
        <Switch
          value={theme === 'dark'}
          onValueChange={(value) => setTheme(value ? 'dark' : 'light')}
        />
      </View>
      <View style={styles.setting}>
        <Text>Notifications</Text>
        <Switch
          value={notifications}
          onValueChange={toggleNotifications}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  setting: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
});
```

## Middleware

### Custom Middleware

Create custom middleware for logging, validation, etc.:

```typescript
// middleware/logger.ts
const logger = (config) => (set, get, api) => 
  config(
    (...args) => {
      console.log('  applying', args);
      set(...args);
      console.log('  new state', get());
    },
    get,
    api
  );

// Use middleware
import { create } from 'zustand';
import { logger } from './middleware/logger';

const useStore = create(
  logger(
    (set, get) => ({
      // Your store implementation
    })
  )
);
```

### Combining Middleware

Combine multiple middleware:

```typescript
// stores/useAuthStore.ts
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { logger } from './middleware/logger';
import { devtools } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface AuthState {
  token: string | null;
  user: User | null;
  isAuthenticated: boolean;
  
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const useAuthStore = create<AuthState>()(
  devtools(
    persist(
      logger(
        (set) => ({
          token: null,
          user: null,
          isAuthenticated: false,
          
          login: async (email, password) => {
            // Implementation
          },
          
          logout: () => {
            set({ token: null, user: null, isAuthenticated: false });
          },
        })
      ),
      {
        name: 'auth-storage',
        storage: createJSONStorage(() => AsyncStorage),
      }
    )
  )
);

export default useAuthStore;
```

## TypeScript Integration

### Type-Safe Stores

Create type-safe stores with TypeScript:

```typescript
// types/index.ts
export interface Medication {
  id: string;
  name: string;
  dosage: string;
  frequency: string;
  instructions: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
}

// stores/useMedicationStore.ts
import { create } from 'zustand';
import { Medication } from '../types';

interface MedicationState {
  medications: Medication[];
  selectedMedicationId: string | null;
  isLoading: boolean;
  error: Error | null;
  
  // Actions
  fetchMedications: () => Promise<void>;
  selectMedication: (id: string) => void;
  addMedication: (medication: Omit<Medication, 'id'>) => Promise<void>;
  updateMedication: (medication: Medication) => Promise<void>;
  deleteMedication: (id: string) => Promise<void>;
}

const useMedicationStore = create<MedicationState>((set, get) => ({
  medications: [],
  selectedMedicationId: null,
  isLoading: false,
  error: null,
  
  fetchMedications: async () => {
    // Implementation
  },
  
  selectMedication: (id) => {
    set({ selectedMedicationId: id });
  },
  
  addMedication: async (medication) => {
    // Implementation
  },
  
  updateMedication: async (medication) => {
    // Implementation
  },
  
  deleteMedication: async (id) => {
    // Implementation
  },
}));

export default useMedicationStore;
```

### Type-Safe Selectors

Create type-safe selectors:

```typescript
// selectors/medicationSelectors.ts
import { Medication } from '../types';
import useMedicationStore from '../stores/useMedicationStore';

export const useSelectedMedication = (): Medication | undefined => {
  const { medications, selectedMedicationId } = useMedicationStore(
    (state) => ({
      medications: state.medications,
      selectedMedicationId: state.selectedMedicationId,
    })
  );
  
  return medications.find((med) => med.id === selectedMedicationId);
};

export const useMedicationsByFrequency = (frequency: string): Medication[] => {
  return useMedicationStore(
    (state) => state.medications.filter((med) => med.frequency === frequency)
  );
};
```

## Integrating with React Query

Zustand works well with React Query for a complete state management solution:

```typescript
// stores/useAppStore.ts
import { create } from 'zustand';
import { QueryClient } from '@tanstack/react-query';

interface AppState {
  queryClient: QueryClient;
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

const useAppStore = create<AppState>((set) => ({
  queryClient: new QueryClient(),
  theme: 'light',
  toggleTheme: () => set((state) => ({ theme: state.theme === 'light' ? 'dark' : 'light' })),
}));

export default useAppStore;

// App.tsx
import React from 'react';
import { QueryClientProvider } from '@tanstack/react-query';
import useAppStore from './stores/useAppStore';
import RootNavigator from './navigation/RootNavigator';

export default function App() {
  const { queryClient, theme } = useAppStore();
  
  return (
    <QueryClientProvider client={queryClient}>
      <RootNavigator theme={theme} />
    </QueryClientProvider>
  );
}
```

## Best Practices

1. **Keep stores focused**: Create separate stores for different domains
2. **Use selectors**: Access only the state you need to prevent unnecessary re-renders
3. **Normalize state**: Avoid deeply nested state structures
4. **Use TypeScript**: Define clear types for your state and actions
5. **Implement error handling**: Handle errors in async actions
6. **Use middleware**: Add middleware for logging, persistence, etc.
7. **Test your stores**: Write tests for your store logic
8. **Document your stores**: Add comments to explain complex logic

## Exercise: Implementing Zustand

Implement Zustand in a medication tracking application:

1. Create a settings store with theme and notification preferences
2. Create a user store for authentication state
3. Create a medication store for managing medications
4. Implement persistence for settings and authentication
5. Use selectors to optimize component rendering
6. Add TypeScript types for all stores
7. Integrate with React Query for server state

## Next Steps

In the next section, we'll explore the Context API, a built-in React feature for sharing state between components.

## Additional Resources

- [Zustand Documentation](https://zustand.docs.pmnd.rs/getting-started/introduction)
- [Zustand GitHub Repository](https://github.com/pmndrs/zustand)
- [Zustand with TypeScript](https://zustand.docs.pmnd.rs/guides/typescript)
- [Zustand Middleware](https://zustand.docs.pmnd.rs/guides/middleware)
- [Zustand Persistence](https://zustand.docs.pmnd.rs/integrations/persisting-store-data)
