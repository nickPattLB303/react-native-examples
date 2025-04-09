# Challenge: Medication List Filter

**Related Topic**: React Native Fundamentals
**Duration**: 30-60 minutes

## Challenge Overview

In this challenge, you'll build a more advanced component that displays a filterable list of medications. This component will allow users to search for specific medications by name and filter them by status. This challenge combines multiple React Native concepts including component composition, state management, and list rendering.

## Learning Objectives

By completing this challenge, you will:
- Implement a complex component structure with nested components
- Use FlatList for efficient list rendering
- Manage component state with useState
- Handle user input with TextInput
- Implement filtering logic for search and categorization
- Apply proper styling and accessibility

## Prerequisites

- Completion of the Basic Component Creation exercise
- Understanding of useState hook
- Familiarity with FlatList component
- Knowledge of JavaScript array methods

## Pharmacy Theme

This challenge creates a core feature of the SpeedyMeds pharmacy application. Patients need to be able to quickly find and filter their medications in an intuitive interface. This medication list filter would be a crucial part of the patient dashboard, allowing them to manage their prescriptions effectively.

## Challenge Requirements

### Functional Requirements

1. Display a list of medications using FlatList
2. Implement a search bar that filters medications by name
3. Add filter buttons for medication status (active/inactive)
4. Display appropriate information for each medication (name, dosage, frequency, status)
5. Show empty state message when no medications match the filters
6. Ensure responsive layout that works on different screen sizes

### Technical Requirements

1. Use TypeScript for all components and functions
2. Implement proper component structure (main container, search, filters, list)
3. Use React Native's built-in components (no third-party libraries)
4. Apply consistent styling with StyleSheet
5. Implement accessibility features for all interactive elements
6. Include proper error handling for data and user interactions

## Mockup

![Medication List Filter Mockup](../images/medication-list-filter-mockup.png)

(Note: Create and place the mockup image in the specified location)

## Sample Data

Use this sample data for your implementation:

```typescript
const SAMPLE_MEDICATIONS = [
  {
    id: '1',
    name: 'Lisinopril',
    dosage: '10mg',
    frequency: 'Once daily',
    status: 'active',
    imageUrl: 'https://example.com/lisinopril.jpg',
  },
  {
    id: '2',
    name: 'Metformin',
    dosage: '500mg',
    frequency: 'Twice daily with meals',
    status: 'active',
    imageUrl: 'https://example.com/metformin.jpg',
  },
  {
    id: '3',
    name: 'Simvastatin',
    dosage: '20mg',
    frequency: 'Once daily at bedtime',
    status: 'active',
    imageUrl: 'https://example.com/simvastatin.jpg',
  },
  {
    id: '4',
    name: 'Albuterol',
    dosage: '90mcg',
    frequency: 'As needed for shortness of breath',
    status: 'active',
    imageUrl: 'https://example.com/albuterol.jpg',
  },
  {
    id: '5',
    name: 'Prednisone',
    dosage: '5mg',
    frequency: 'Daily for 7 days',
    status: 'inactive',
    imageUrl: 'https://example.com/prednisone.jpg',
  },
  {
    id: '6',
    name: 'Ibuprofen',
    dosage: '400mg',
    frequency: 'Every 6 hours as needed for pain',
    status: 'inactive',
    imageUrl: 'https://example.com/ibuprofen.jpg',
  },
  {
    id: '7',
    name: 'Levothyroxine',
    dosage: '50mcg',
    frequency: 'Once daily on empty stomach',
    status: 'active',
    imageUrl: 'https://example.com/levothyroxine.jpg',
  },
  {
    id: '8',
    name: 'Amoxicillin',
    dosage: '500mg',
    frequency: 'Three times daily for 10 days',
    status: 'inactive',
    imageUrl: 'https://example.com/amoxicillin.jpg',
  },
];
```

## Implementation Steps

### 1. Create the Component Structure

Start by creating the main component file and defining the necessary types:

```typescript
// MedicationListFilter.tsx
import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';

// Define medication interface
interface Medication {
  id: string;
  name: string;
  dosage: string;
  frequency: string;
  status: 'active' | 'inactive';
  imageUrl: string;
}

// Main component props
interface MedicationListFilterProps {
  medications: Medication[];
  onSelectMedication?: (medication: Medication) => void;
}
```

### 2. Implement the Main Component

Create the main component with search and filtering state:

```typescript
const MedicationListFilter: React.FC<MedicationListFilterProps> = ({
  medications,
  onSelectMedication,
}) => {
  // State for search and filters
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'inactive'>('all');
  
  // Filter medications based on search and status
  const filteredMedications = useMemo(() => {
    return medications.filter((med) => {
      // Apply search filter
      const matchesSearch = med.name.toLowerCase().includes(searchQuery.toLowerCase());
      
      // Apply status filter
      const matchesStatus = statusFilter === 'all' || med.status === statusFilter;
      
      return matchesSearch && matchesStatus;
    });
  }, [medications, searchQuery, statusFilter]);

  // Render main component
  return (
    <View style={styles.container}>
      {/* Search and filter components will go here */}
      {/* Medication list will go here */}
    </View>
  );
};
```

### 3. Implement the Search Bar

Add the search input component:

```typescript
// Inside the main component return statement
<View style={styles.searchContainer}>
  <TextInput
    style={styles.searchInput}
    placeholder="Search medications..."
    value={searchQuery}
    onChangeText={setSearchQuery}
    accessibilityLabel="Search medications"
    accessibilityHint="Type to search for a medication by name"
  />
</View>
```

### 4. Implement Filter Buttons

Add the status filter buttons:

```typescript
// Inside the main component return statement
<View style={styles.filterContainer}>
  <Text style={styles.filterLabel}>Status:</Text>
  <TouchableOpacity
    style={[
      styles.filterButton,
      statusFilter === 'all' && styles.activeFilterButton,
    ]}
    onPress={() => setStatusFilter('all')}
    accessibilityLabel="Filter by all medications"
    accessibilityRole="button"
    accessibilityState={{ selected: statusFilter === 'all' }}
  >
    <Text style={styles.filterButtonText}>All</Text>
  </TouchableOpacity>
  
  <TouchableOpacity
    style={[
      styles.filterButton,
      statusFilter === 'active' && styles.activeFilterButton,
    ]}
    onPress={() => setStatusFilter('active')}
    accessibilityLabel="Filter by active medications"
    accessibilityRole="button"
    accessibilityState={{ selected: statusFilter === 'active' }}
  >
    <Text style={styles.filterButtonText}>Active</Text>
  </TouchableOpacity>
  
  <TouchableOpacity
    style={[
      styles.filterButton,
      statusFilter === 'inactive' && styles.activeFilterButton,
    ]}
    onPress={() => setStatusFilter('inactive')}
    accessibilityLabel="Filter by inactive medications"
    accessibilityRole="button"
    accessibilityState={{ selected: statusFilter === 'inactive' }}
  >
    <Text style={styles.filterButtonText}>Inactive</Text>
  </TouchableOpacity>
</View>
```

### 5. Implement the Medication List

Add the FlatList to display medications:

```typescript
// Create a separate MedicationItem component
const MedicationItem: React.FC<{
  medication: Medication;
  onPress?: () => void;
}> = ({ medication, onPress }) => (
  <TouchableOpacity
    style={[
      styles.medicationItem,
      medication.status === 'inactive' && styles.inactiveMedicationItem,
    ]}
    onPress={onPress}
    accessibilityLabel={`${medication.name}, ${medication.dosage}, ${medication.frequency}, status: ${medication.status}`}
    accessibilityRole="button"
    accessibilityHint="Tap to view medication details"
  >
    <View style={styles.medicationContent}>
      <Text style={styles.medicationName}>{medication.name}</Text>
      <Text style={styles.medicationDetails}>{medication.dosage} - {medication.frequency}</Text>
      <View style={styles.statusContainer}>
        <View
          style={[
            styles.statusIndicator,
            medication.status === 'active'
              ? styles.activeIndicator
              : styles.inactiveIndicator,
          ]}
        />
        <Text style={styles.statusText}>
          {medication.status === 'active' ? 'Active' : 'Inactive'}
        </Text>
      </View>
    </View>
    {medication.imageUrl && (
      <Image
        source={{ uri: medication.imageUrl }}
        style={styles.medicationImage}
        accessibilityLabel={`Image of ${medication.name}`}
      />
    )}
  </TouchableOpacity>
);

// Add FlatList to main component return
<FlatList
  data={filteredMedications}
  keyExtractor={(item) => item.id}
  renderItem={({ item }) => (
    <MedicationItem
      medication={item}
      onPress={() => onSelectMedication?.(item)}
    />
  )}
  ListEmptyComponent={
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyText}>
        No medications found matching your criteria.
      </Text>
    </View>
  }
  style={styles.list}
  contentContainerStyle={
    filteredMedications.length === 0 ? { flex: 1 } : undefined
  }
/>
```

### 6. Add Styling

Create comprehensive styles for your component:

```typescript
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  searchContainer: {
    padding: 16,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  searchInput: {
    height: 40,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    paddingHorizontal: 12,
    backgroundColor: '#f9f9f9',
  },
  filterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  filterLabel: {
    marginRight: 8,
    fontWeight: '500',
    color: '#555',
  },
  filterButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    marginHorizontal: 4,
    borderRadius: 16,
    backgroundColor: '#f0f0f0',
  },
  activeFilterButton: {
    backgroundColor: '#e6f7ff',
    borderWidth: 1,
    borderColor: '#91caff',
  },
  filterButtonText: {
    color: '#555',
    fontWeight: '500',
  },
  list: {
    flex: 1,
  },
  medicationItem: {
    flexDirection: 'row',
    backgroundColor: 'white',
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  inactiveMedicationItem: {
    backgroundColor: '#f9f9f9',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    opacity: 0.8,
  },
  medicationContent: {
    flex: 1,
  },
  medicationName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  medicationDetails: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },
  activeIndicator: {
    backgroundColor: '#52c41a',
  },
  inactiveIndicator: {
    backgroundColor: '#d9d9d9',
  },
  statusText: {
    fontSize: 12,
    color: '#888',
  },
  medicationImage: {
    width: 60,
    height: 60,
    borderRadius: 4,
    marginLeft: 16,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyText: {
    fontSize: 16,
    color: '#888',
    textAlign: 'center',
  },
});

export default MedicationListFilter;
```

### 7. Implement Usage Example

Create an example usage of your component:

```typescript
// Example usage in App.tsx or another screen
import React from 'react';
import { View, Alert } from 'react-native';
import MedicationListFilter from './components/MedicationListFilter';
import { SAMPLE_MEDICATIONS } from './data/sample-data';

export default function MedicationsScreen() {
  return (
    <View style={{ flex: 1 }}>
      <MedicationListFilter
        medications={SAMPLE_MEDICATIONS}
        onSelectMedication={(medication) => {
          Alert.alert(
            medication.name,
            `Dosage: ${medication.dosage}\nFrequency: ${medication.frequency}`
          );
        }}
      />
    </View>
  );
}
```

## Developer Path Adaptations

### For Native Developers

If you're coming from native iOS or Android development, focus on understanding React Native's component composition model and how it differs from view hierarchies in UIKit or ViewGroup trees in Android. Pay attention to how React's declarative approach handles state changes and UI updates, which is different from the imperative style in native development. Note how FlatList differs from UITableView or RecyclerView in terms of configuration and optimization.

### For Web Developers

If you're coming from web development, focus on the platform-specific aspects of React Native components like FlatList (instead of mapping arrays directly) and TextInput (instead of HTML input). Notice how styles don't cascade and how layout works differently with Flexbox's mobile implementation. Pay attention to performance considerations when rendering lists, which are more critical on mobile devices than in browsers.

## Challenge Extensions

Once you've completed the basic requirements, try these extensions:

1. Add sorting options (alphabetical, by status)
2. Implement medication groups or categories
3. Add animated transitions between filter states
4. Implement pull-to-refresh functionality
5. Add error handling for image loading with fallback images
6. Implement dark mode support for the component

## Testing Your Solution

Test your solution with these scenarios:

1. Search for a medication that exists in the list
2. Search for a medication that doesn't exist
3. Filter by different status options
4. Combine search and filter
5. Test with an empty list of medications
6. Test with a large list of medications (performance)
7. Test accessibility using VoiceOver or TalkBack

## Evaluation Criteria

Your solution will be evaluated based on:

1. Functional completeness: Does it meet all requirements?
2. Code quality: Is the code well-structured and maintainable?
3. TypeScript usage: Are types properly defined and used?
4. Styling: Is the UI visually appealing and responsive?
5. Accessibility: Can the component be used with screen readers?
6. Performance: Does the component handle filtering efficiently?

## Resources

- [FlatList Documentation](https://reactnative.dev/docs/flatlist)
- [TextInput Documentation](https://reactnative.dev/docs/textinput)
- [React useState Hook](https://reactjs.org/docs/hooks-state.html)
- [React useMemo Hook](https://reactjs.org/docs/hooks-reference.html#usememo)
- [Accessibility in React Native](https://reactnative.dev/docs/accessibility)