# Section 2: React Query

## Overview

React Query is a powerful data-fetching and state management library for React applications. It simplifies the process of fetching, caching, synchronizing, and updating server state in your React Native applications. This section covers how to implement and use React Query effectively in your medication tracking application.

## Learning Objectives

By the end of this section, you will be able to:

- Set up React Query in a React Native application
- Implement data fetching with queries
- Manage server state with mutations
- Configure caching and invalidation strategies
- Handle loading and error states
- Implement pagination and infinite scrolling
- Optimize performance with background fetching and prefetching
- Use TypeScript with React Query for type safety

## Introduction to React Query

React Query, now part of the TanStack family of libraries, is designed to solve the challenges of server state management in React applications. It provides a declarative API for fetching, caching, and updating asynchronous data in your React Native applications.

### Key Features

- **Automatic caching**: Caches query results and provides them instantly for subsequent requests
- **Background updates**: Automatically refetches data in the background
- **Stale-while-revalidate**: Shows stale data while fetching fresh data
- **Pagination and infinite scrolling**: Built-in support for paginated and infinite queries
- **Prefetching**: Preload data before it's needed
- **Mutations**: Update server data with optimistic updates
- **Devtools**: Debug your queries and cache
- **TypeScript support**: Full TypeScript support for type-safe queries

### When to Use React Query

React Query is ideal for:

- Fetching data from REST APIs
- Managing server state
- Handling loading and error states
- Implementing real-time updates
- Optimizing data fetching performance

## Setting Up React Query

### Installation

To add React Query to your React Native project:

```bash
npx expo install @tanstack/react-query
# or
yarn add @tanstack/react-query
```

### Basic Setup

Set up React Query by wrapping your application with the `QueryClientProvider`:

```tsx
// App.tsx
import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import RootNavigator from './navigation/RootNavigator';

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      cacheTime: 1000 * 60 * 30, // 30 minutes
      retry: 1,
      refetchOnWindowFocus: false,
      refetchOnReconnect: true,
    },
  },
});

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RootNavigator />
    </QueryClientProvider>
  );
}
```

## Basic Queries

### Creating a Query

The `useQuery` hook is the primary way to fetch data with React Query:

```tsx
// hooks/useMedications.ts
import { useQuery } from '@tanstack/react-query';
import { fetchMedications } from '../api/medications';

export function useMedications() {
  return useQuery({
    queryKey: ['medications'],
    queryFn: fetchMedications,
  });
}
```

### API Functions

Define your API functions separately from your React components:

```tsx
// api/medications.ts
import axios from 'axios';

const API_URL = 'https://api.example.com';

export interface Medication {
  id: string;
  name: string;
  dosage: string;
  frequency: string;
  instructions: string;
}

export async function fetchMedications(): Promise<Medication[]> {
  const response = await axios.get(`${API_URL}/medications`);
  return response.data;
}

export async function fetchMedicationById(id: string): Promise<Medication> {
  const response = await axios.get(`${API_URL}/medications/${id}`);
  return response.data;
}
```

### Using Queries in Components

Use the query hooks in your components:

```tsx
// screens/MedicationsScreen.tsx
import React from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet } from 'react-native';
import { useMedications } from '../hooks/useMedications';
import MedicationItem from '../components/MedicationItem';

export default function MedicationsScreen() {
  const { data, isLoading, isError, error } = useMedications();
  
  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }
  
  if (isError) {
    return (
      <View style={styles.centered}>
        <Text style={styles.error}>Error: {error.message}</Text>
      </View>
    );
  }
  
  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={({ item }) => <MedicationItem medication={item} />}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  error: {
    color: 'red',
    fontSize: 16,
    textAlign: 'center',
    margin: 20,
  },
  list: {
    padding: 16,
  },
});
```

### Query Keys

Query keys are used to identify and manage queries in the cache:

```tsx
// Simple query key
useQuery({ queryKey: ['medications'], queryFn: fetchMedications });

// Query key with parameters
useQuery({ 
  queryKey: ['medication', id], 
  queryFn: () => fetchMedicationById(id) 
});

// Query key with filters
useQuery({ 
  queryKey: ['medications', { status: 'active', sortBy: 'name' }], 
  queryFn: () => fetchMedicationsWithFilters({ status: 'active', sortBy: 'name' }) 
});
```

### Query Functions

Query functions can be defined in various ways:

```tsx
// Direct function reference
useQuery({ queryKey: ['medications'], queryFn: fetchMedications });

// Arrow function
useQuery({ 
  queryKey: ['medication', id], 
  queryFn: () => fetchMedicationById(id) 
});

// Function with query key access
useQuery({ 
  queryKey: ['medication', id], 
  queryFn: ({ queryKey }) => {
    const [_, medicationId] = queryKey;
    return fetchMedicationById(medicationId as string);
  }
});
```

## Query Options

React Query provides many options to customize query behavior:

```tsx
useQuery({
  queryKey: ['medications'],
  queryFn: fetchMedications,
  staleTime: 1000 * 60 * 5, // 5 minutes
  cacheTime: 1000 * 60 * 30, // 30 minutes
  retry: 3,
  retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  refetchOnWindowFocus: true,
  refetchOnMount: true,
  refetchOnReconnect: true,
  refetchInterval: 1000 * 60, // 1 minute
  enabled: isAuthenticated,
  onSuccess: (data) => {
    console.log('Query succeeded:', data);
  },
  onError: (error) => {
    console.error('Query failed:', error);
  },
});
```

### Important Options

- **staleTime**: How long data remains fresh (milliseconds)
- **cacheTime**: How long unused data remains in cache (milliseconds)
- **retry**: Number of retry attempts (or boolean)
- **retryDelay**: Delay between retry attempts (milliseconds or function)
- **refetchOnWindowFocus**: Refetch when window regains focus
- **refetchOnMount**: Refetch when component mounts
- **refetchOnReconnect**: Refetch when network reconnects
- **refetchInterval**: Polling interval (milliseconds)
- **enabled**: Whether the query should run
- **onSuccess**: Callback when query succeeds
- **onError**: Callback when query fails

## Dependent Queries

Sometimes queries depend on the results of other queries:

```tsx
// First query
const { data: user } = useQuery({
  queryKey: ['user'],
  queryFn: fetchUser,
});

// Dependent query
const { data: prescriptions } = useQuery({
  queryKey: ['prescriptions', user?.id],
  queryFn: () => fetchUserPrescriptions(user.id),
  enabled: !!user?.id, // Only run when user.id exists
});
```

## Mutations

Mutations are used to create, update, or delete data:

```tsx
// hooks/useMedicationMutations.ts
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addMedication, updateMedication, deleteMedication } from '../api/medications';
import { Medication } from '../types';

export function useAddMedication() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (newMedication: Omit<Medication, 'id'>) => 
      addMedication(newMedication),
    onSuccess: () => {
      // Invalidate and refetch medications list
      queryClient.invalidateQueries({ queryKey: ['medications'] });
    },
  });
}

export function useUpdateMedication() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (updatedMedication: Medication) => 
      updateMedication(updatedMedication),
    onSuccess: (data) => {
      // Update specific medication in cache
      queryClient.setQueryData(['medication', data.id], data);
      // Invalidate medications list
      queryClient.invalidateQueries({ queryKey: ['medications'] });
    },
  });
}

export function useDeleteMedication() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (id: string) => deleteMedication(id),
    onSuccess: (_, id) => {
      // Remove from cache
      queryClient.removeQueries({ queryKey: ['medication', id] });
      // Invalidate medications list
      queryClient.invalidateQueries({ queryKey: ['medications'] });
    },
  });
}
```

### Using Mutations in Components

```tsx
// screens/AddMedicationScreen.tsx
import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { useAddMedication } from '../hooks/useMedicationMutations';

export default function AddMedicationScreen({ navigation }) {
  const [name, setName] = useState('');
  const [dosage, setDosage] = useState('');
  const [frequency, setFrequency] = useState('');
  const [instructions, setInstructions] = useState('');
  
  const addMutation = useAddMedication();
  
  const handleSubmit = () => {
    addMutation.mutate(
      {
        name,
        dosage,
        frequency,
        instructions,
      },
      {
        onSuccess: () => {
          Alert.alert('Success', 'Medication added successfully');
          navigation.goBack();
        },
        onError: (error) => {
          Alert.alert('Error', `Failed to add medication: ${error.message}`);
        },
      }
    );
  };
  
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Medication Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Dosage"
        value={dosage}
        onChangeText={setDosage}
      />
      <TextInput
        style={styles.input}
        placeholder="Frequency"
        value={frequency}
        onChangeText={setFrequency}
      />
      <TextInput
        style={styles.input}
        placeholder="Instructions"
        value={instructions}
        onChangeText={setInstructions}
        multiline
      />
      <Button
        title={addMutation.isPending ? "Adding..." : "Add Medication"}
        onPress={handleSubmit}
        disabled={addMutation.isPending}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
});
```

### Optimistic Updates

Optimistic updates improve the user experience by updating the UI before the server confirms the change:

```tsx
export function useUpdateMedication() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (updatedMedication: Medication) => 
      updateMedication(updatedMedication),
    
    // Optimistically update the cache
    onMutate: async (newMedication) => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries({ queryKey: ['medication', newMedication.id] });
      
      // Snapshot the previous value
      const previousMedication = queryClient.getQueryData<Medication>(
        ['medication', newMedication.id]
      );
      
      // Optimistically update to the new value
      queryClient.setQueryData(['medication', newMedication.id], newMedication);
      
      // Also update the medications list if it exists in cache
      const previousMedications = queryClient.getQueryData<Medication[]>(['medications']);
      if (previousMedications) {
        queryClient.setQueryData(
          ['medications'],
          previousMedications.map(med => 
            med.id === newMedication.id ? newMedication : med
          )
        );
      }
      
      // Return a context object with the snapshotted value
      return { previousMedication, previousMedications };
    },
    
    // If the mutation fails, use the context returned from onMutate to roll back
    onError: (err, newMedication, context) => {
      if (context?.previousMedication) {
        queryClient.setQueryData(
          ['medication', newMedication.id],
          context.previousMedication
        );
      }
      if (context?.previousMedications) {
        queryClient.setQueryData(['medications'], context.previousMedications);
      }
    },
    
    // Always refetch after error or success
    onSettled: (data) => {
      queryClient.invalidateQueries({ queryKey: ['medication', data?.id] });
      queryClient.invalidateQueries({ queryKey: ['medications'] });
    },
  });
}
```

## Pagination and Infinite Queries

### Pagination

For paginated data:

```tsx
// api/medications.ts
export async function fetchMedicationsPage(page = 0, limit = 10) {
  const response = await axios.get(`${API_URL}/medications`, {
    params: { page, limit },
  });
  return response.data;
}

// hooks/usePaginatedMedications.ts
import { useQuery } from '@tanstack/react-query';
import { fetchMedicationsPage } from '../api/medications';

export function usePaginatedMedications(page = 0) {
  return useQuery({
    queryKey: ['medications', 'page', page],
    queryFn: () => fetchMedicationsPage(page),
    keepPreviousData: true, // Keep previous page data while fetching next page
  });
}

// screens/PaginatedMedicationsScreen.tsx
import React, { useState } from 'react';
import { View, FlatList, Button, ActivityIndicator } from 'react-native';
import { usePaginatedMedications } from '../hooks/usePaginatedMedications';
import MedicationItem from '../components/MedicationItem';

export default function PaginatedMedicationsScreen() {
  const [page, setPage] = useState(0);
  const { data, isLoading, isPreviousData } = usePaginatedMedications(page);
  
  return (
    <View style={{ flex: 1 }}>
      {isLoading ? (
        <ActivityIndicator size="large" />
      ) : (
        <>
          <FlatList
            data={data?.medications}
            renderItem={({ item }) => <MedicationItem medication={item} />}
            keyExtractor={(item) => item.id}
          />
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 16 }}>
            <Button
              title="Previous Page"
              onPress={() => setPage(old => Math.max(old - 1, 0))}
              disabled={page === 0}
            />
            <Button
              title="Next Page"
              onPress={() => setPage(old => old + 1)}
              disabled={isPreviousData || !data?.hasMore}
            />
          </View>
        </>
      )}
    </View>
  );
}
```

### Infinite Queries

For infinite scrolling:

```tsx
// hooks/useInfiniteMedications.ts
import { useInfiniteQuery } from '@tanstack/react-query';
import { fetchMedicationsPage } from '../api/medications';

export function useInfiniteMedications() {
  return useInfiniteQuery({
    queryKey: ['medications', 'infinite'],
    queryFn: ({ pageParam = 0 }) => fetchMedicationsPage(pageParam),
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.hasMore ? allPages.length : undefined;
    },
  });
}

// screens/InfiniteMedicationsScreen.tsx
import React from 'react';
import { View, FlatList, ActivityIndicator, Button } from 'react-native';
import { useInfiniteMedications } from '../hooks/useInfiniteMedications';
import MedicationItem from '../components/MedicationItem';

export default function InfiniteMedicationsScreen() {
  const {
    data,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteMedications();
  
  // Flatten the pages array
  const medications = data?.pages.flatMap(page => page.medications) || [];
  
  return (
    <View style={{ flex: 1 }}>
      {isLoading ? (
        <ActivityIndicator size="large" />
      ) : (
        <FlatList
          data={medications}
          renderItem={({ item }) => <MedicationItem medication={item} />}
          keyExtractor={(item) => item.id}
          onEndReached={() => hasNextPage && fetchNextPage()}
          onEndReachedThreshold={0.5}
          ListFooterComponent={
            isFetchingNextPage ? (
              <ActivityIndicator size="small" />
            ) : hasNextPage ? (
              <Button title="Load More" onPress={() => fetchNextPage()} />
            ) : null
          }
        />
      )}
    </View>
  );
}
```

## Query Invalidation and Refetching

### Invalidating Queries

Invalidate queries to refetch data:

```tsx
const queryClient = useQueryClient();

// Invalidate specific query
queryClient.invalidateQueries({ queryKey: ['medication', id] });

// Invalidate all medication queries
queryClient.invalidateQueries({ queryKey: ['medications'] });

// Invalidate all queries
queryClient.invalidateQueries();
```

### Manual Refetching

Manually refetch queries:

```tsx
const { data, refetch } = useQuery({
  queryKey: ['medications'],
  queryFn: fetchMedications,
});

// Later in your component
<Button title="Refresh" onPress={() => refetch()} />
```

## Prefetching

Prefetch data before it's needed:

```tsx
const queryClient = useQueryClient();

// Prefetch a single medication
const prefetchMedication = async (id) => {
  await queryClient.prefetchQuery({
    queryKey: ['medication', id],
    queryFn: () => fetchMedicationById(id),
  });
};

// In a component
useEffect(() => {
  // Prefetch the next few medications
  for (let i = 1; i <= 3; i++) {
    prefetchMedication(currentId + i);
  }
}, [currentId]);
```

## TypeScript Integration

### Defining Types

```tsx
// types/index.ts
export interface Medication {
  id: string;
  name: string;
  dosage: string;
  frequency: string;
  instructions: string;
  createdAt: string;
  updatedAt: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  page: number;
  limit: number;
  total: number;
  hasMore: boolean;
}
```

### Type-Safe Queries

```tsx
// hooks/useMedications.ts
import { useQuery } from '@tanstack/react-query';
import { fetchMedications } from '../api/medications';
import { Medication } from '../types';

export function useMedications() {
  return useQuery<Medication[], Error>({
    queryKey: ['medications'],
    queryFn: fetchMedications,
  });
}

// hooks/useMedication.ts
import { useQuery } from '@tanstack/react-query';
import { fetchMedicationById } from '../api/medications';
import { Medication } from '../types';

export function useMedication(id: string) {
  return useQuery<Medication, Error>({
    queryKey: ['medication', id],
    queryFn: () => fetchMedicationById(id),
    enabled: !!id,
  });
}
```

### Type-Safe Mutations

```tsx
// hooks/useMedicationMutations.ts
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addMedication, updateMedication, deleteMedication } from '../api/medications';
import { Medication } from '../types';

export function useAddMedication() {
  const queryClient = useQueryClient();
  
  return useMutation<
    Medication,                // Return type
    Error,                     // Error type
    Omit<Medication, 'id'>     // Variables type
  >({
    mutationFn: (newMedication) => addMedication(newMedication),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['medications'] });
    },
  });
}
```

## React Query with React Native Specifics

### Handling Focus and Background States

React Native apps can move between foreground and background states. Configure React Query to handle this:

```tsx
import { AppState, Platform } from 'react-native';
import { focusManager } from '@tanstack/react-query';

// Set up focus handling
function onAppStateChange(status: AppState['currentState']) {
  if (Platform.OS !== 'web') {
    focusManager.setFocused(status === 'active');
  }
}

// Subscribe to app state changes
AppState.addEventListener('change', onAppStateChange);

// Clean up subscription
// AppState.removeEventListener('change', onAppStateChange);
```

### Handling Network Connectivity

React Native apps need to handle network connectivity changes:

```tsx
import NetInfo from '@react-native-community/netinfo';
import { onlineManager } from '@tanstack/react-query';

// Set up online manager
onlineManager.setEventListener(setOnline => {
  return NetInfo.addEventListener(state => {
    setOnline(!!state.isConnected);
  });
});
```

## Best Practices

1. **Organize queries by domain**: Group related queries together
2. **Use custom hooks**: Create custom hooks for each query or mutation
3. **Set appropriate stale times**: Configure stale times based on how frequently data changes
4. **Handle loading and error states**: Always provide feedback to users
5. **Use optimistic updates**: Improve user experience with optimistic updates
6. **Prefetch data**: Prefetch data when possible to improve perceived performance
7. **Invalidate queries selectively**: Only invalidate the queries that need to be refetched
8. **Use TypeScript**: Define types for your queries and mutations

## Exercise: Implementing React Query

Implement React Query in a medication tracking application:

1. Set up React Query in your application
2. Create API functions for fetching medications and prescriptions
3. Implement queries for fetching medications and prescriptions
4. Implement mutations for adding, updating, and deleting medications
5. Add pagination or infinite scrolling for the medications list
6. Implement optimistic updates for mutations
7. Add TypeScript types for all queries and mutations

## Next Steps

In the next section, we'll explore Zustand, a lightweight state management library for managing client-side global state in React Native applications.

## Additional Resources

- [TanStack Query Documentation](https://tanstack.com/query/latest/docs/framework/react/react-native)
- [React Query Patterns](https://tkdodo.eu/blog/practical-react-query)
- [React Query with TypeScript](https://tanstack.com/query/latest/docs/framework/react/typescript)
- [React Query DevTools](https://tanstack.com/query/latest/docs/framework/react/devtools)
- [Optimistic Updates with React Query](https://tanstack.com/query/latest/docs/framework/react/guides/optimistic-updates)
