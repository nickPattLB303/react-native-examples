# State Management (Zustand)

## Overview

This project uses [Zustand](https://zustand.docs.pmnd.rs/) for managing global client-side state. Zustand is chosen for its simplicity, minimal boilerplate, and hook-based API, making it easy to access and update state from any component without needing Context providers.

In this application, Zustand primarily holds the application data (user profile, prescriptions, orders, reminders) *after* it has been fetched and cached by TanStack Query (React Query). Zustand serves as the readily accessible, centralized client-side 'single source of truth' for this data, decoupling UI components from the fetching logic itself.

## Installation

```bash
npm install zustand --save --legacy-peer-deps
```

**Note:** The `--legacy-peer-deps` flag was necessary during setup due to potential peer dependency conflicts. See `SETUP.md` for details.

## Configuration and Usage

### 1. Store Definition (`src/stores/appDataStore.ts`)

A central store is defined to hold the main application data. This involves:

- **Defining the State Interface:** A TypeScript interface (`AppDataState`) outlines the structure of the store, including the data slices (e.g., `userProfile`, `prescriptions`) and any associated state (e.g., `isLoading`, `error`). It also defines the signatures for action functions that modify the state.
  ```typescript
  interface AppDataState {
    userProfile: UserProfile | null;
    prescriptions: Prescription[];
    isLoading: boolean;
    error: Error | null;

    setUserProfile: (profile: UserProfile) => void;
    setPrescriptions: (prescriptions: Prescription[]) => void;
    setLoading: (loading: boolean) => void;
    setError: (error: Error | null) => void;
    // ... other state and actions
  }
  ```
- **Creating the Store:** The `create` function from Zustand is used to initialize the store with its initial state and the implementation of the action functions. Actions use the `set` function provided by Zustand to update the state immutably.
  ```typescript
  import { create } from 'zustand';
  import type { UserProfile } from '../types'; // Import necessary types

  // ... (Interface definition) ...

  const useAppDataStore = create<AppDataState>((set) => ({
    userProfile: null,
    prescriptions: [],
    isLoading: true,
    error: null,

    setUserProfile: (profile) => set({ userProfile: profile, isLoading: false, error: null }),
    setPrescriptions: (prescriptions) => set({ prescriptions: prescriptions, isLoading: false, error: null }),
    setLoading: (loading) => set({ isLoading: loading }),
    setError: (error) => set({ error: error, isLoading: false }),
    // ... initial state and other actions ...
  }));

  export default useAppDataStore;
  ```

### 2. Populating the Store (`src/hooks/useInitializeAppData.ts`)

The Zustand store is primarily populated by the data fetched via TanStack Query. The `useInitializeAppData` hook observes the results from `useQuery` and calls the appropriate Zustand actions (e.g., `setUserProfile`, `setPrescriptions`) within `useEffect` hooks to keep the global state synchronized with the fetched data.

```typescript
// src/hooks/useInitializeAppData.ts
import { useEffect } from 'react';
import useAppDataStore from '../stores/appDataStore';
import { useQuery } from '@tanstack/react-query';
// ... other imports

export const useInitializeAppData = () => {
  const {
    setUserProfile,
    // ... other actions
  } = useAppDataStore();

  const { data: userProfile /* ... */ } = useQuery({ /* ... */ });
  // ... other queries ...

  useEffect(() => {
    if (userProfile) {
      setUserProfile(userProfile); // Update Zustand store on query success
    }
  }, [userProfile, setUserProfile]);

  // ... effects for other data slices and errors ...
};
```

### 3. Accessing State in Components

Components access the global state by importing the store hook (`useAppDataStore`) and using a selector function to extract only the necessary pieces of state. This optimizes re-renders, as the component only subscribes to changes in the selected state slices.

```typescript
// Example in AccountScreen.tsx
import React from 'react';
import { View } from 'react-native';
import { Text, ActivityIndicator } from 'react-native-paper';
import useAppDataStore from '../stores/appDataStore';

const AccountScreen = () => {
  // Select specific state slices needed by this component
  const userProfile = useAppDataStore((state) => state.userProfile);
  const isLoading = useAppDataStore((state) => state.isLoading);
  const error = useAppDataStore((state) => state.error);

  // Alternatively, select multiple slices at once (use shallow for optimization)
  // import { shallow } from 'zustand/shallow';
  // const { userProfile, isLoading, error } = useAppDataStore(
  //   (state) => ({ 
  //     userProfile: state.userProfile,
  //     isLoading: state.isLoading,
  //     error: state.error 
  //   }),
  //   shallow // Important for performance when selecting objects
  // );

  if (isLoading && !userProfile) {
    return <ActivityIndicator />;
  }

  if (error) {
    return <Text>Error: {error.message}</Text>;
  }

  return (
    <View>
      <Text>Member ID: {userProfile?.memberId}</Text>
      {/* Display other profile info */}
    </View>
  );
};

export default AccountScreen;
```

## Key Concepts

- **Hook-Based:** Access state and actions directly through the custom hook (`useAppDataStore`).
- **No Providers:** Unlike Context API, Zustand doesn't require wrapping the app in provider components.
- **Selectors:** Use selector functions to subscribe components only to the state slices they need, preventing unnecessary re-renders.
- **Immutability:** The `set` function handles immutable updates internally.
- **Decoupling:** Zustand decouples state management logic from UI components and data fetching. 