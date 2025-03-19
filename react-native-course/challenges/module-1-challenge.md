# Challenge: Build a Medication Reminder App

**Duration:** 30-60 minutes  
**Module:** 1 - React Native Fundamentals

## Objective

Apply your understanding of React Native fundamentals by building a simple medication reminder application. This challenge will test your ability to create components, manage basic state, and implement styling in React Native.

## Requirements

### Functionality
- Display a list of medications with their details
- Allow users to mark medications as "taken"
- Show a count of taken and remaining medications
- Implement a simple filter to show all, taken, or remaining medications

### Components
1. **App Container**: The main component that holds the application state
2. **Header**: Displays the app title and medication counts
3. **MedicationList**: Renders the list of medications
4. **MedicationItem**: Displays individual medication details
5. **FilterButtons**: Allows filtering the medication list

### Data Structure
Use the following data structure for medications:

```typescript
interface Medication {
  id: string;
  name: string;
  dosage: string;
  time: string;
  taken: boolean;
}

// Sample data
const initialMedications: Medication[] = [
  {
    id: '1',
    name: 'Lisinopril',
    dosage: '10mg',
    time: '8:00 AM',
    taken: false,
  },
  {
    id: '2',
    name: 'Metformin',
    dosage: '500mg',
    time: '12:00 PM',
    taken: false,
  },
  {
    id: '3',
    name: 'Atorvastatin',
    dosage: '20mg',
    time: '8:00 PM',
    taken: false,
  },
];
```

## Instructions

### 1. Set Up the Project Structure

Create the following files:
- `App.tsx` (main container)
- `components/Header.tsx`
- `components/MedicationList.tsx`
- `components/MedicationItem.tsx`
- `components/FilterButtons.tsx`

### 2. Implement the App Container

The App component should:
- Maintain the list of medications as state
- Track the current filter (all, taken, remaining)
- Provide functions to toggle medication status
- Render the Header, FilterButtons, and MedicationList

```typescript
// App.tsx (partial implementation)
import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import Header from './components/Header';
import FilterButtons from './components/FilterButtons';
import MedicationList from './components/MedicationList';

// Define types and initial data here...

type FilterType = 'all' | 'taken' | 'remaining';

const App = () => {
  const [medications, setMedications] = useState<Medication[]>(initialMedications);
  const [filter, setFilter] = useState<FilterType>('all');
  
  // Implement toggle function
  const toggleMedication = (id: string) => {
    // Your code here
  };
  
  // Calculate counts
  const takenCount = medications.filter(med => med.taken).length;
  const remainingCount = medications.length - takenCount;
  
  // Filter medications based on current filter
  const filteredMedications = medications.filter(med => {
    // Your code here
  });
  
  return (
    <SafeAreaView style={styles.container}>
      <Header takenCount={takenCount} remainingCount={remainingCount} />
      <FilterButtons currentFilter={filter} onFilterChange={setFilter} />
      <MedicationList 
        medications={filteredMedications} 
        onToggle={toggleMedication} 
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
});

export default App;
```

### 3. Implement the Header Component

```typescript
// Header.tsx (partial implementation)
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface HeaderProps {
  takenCount: number;
  remainingCount: number;
}

const Header: React.FC<HeaderProps> = ({ takenCount, remainingCount }) => {
  return (
    <View style={styles.header}>
      <Text style={styles.title}>MediTrack</Text>
      <View style={styles.countsContainer}>
        {/* Implement counts display */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  // Your styles here
});

export default Header;
```

### 4. Implement the FilterButtons Component

```typescript
// FilterButtons.tsx (partial implementation)
import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

type FilterType = 'all' | 'taken' | 'remaining';

interface FilterButtonsProps {
  currentFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
}

const FilterButtons: React.FC<FilterButtonsProps> = ({ 
  currentFilter, 
  onFilterChange 
}) => {
  return (
    <View style={styles.container}>
      {/* Implement filter buttons */}
    </View>
  );
};

const styles = StyleSheet.create({
  // Your styles here
});

export default FilterButtons;
```

### 5. Implement the MedicationList Component

```typescript
// MedicationList.tsx (partial implementation)
import React from 'react';
import { FlatList, StyleSheet } from 'react-native';
import MedicationItem from './MedicationItem';

interface MedicationListProps {
  medications: Medication[];
  onToggle: (id: string) => void;
}

const MedicationList: React.FC<MedicationListProps> = ({ 
  medications, 
  onToggle 
}) => {
  return (
    <FlatList
      data={medications}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <MedicationItem medication={item} onToggle={onToggle} />
      )}
      style={styles.list}
    />
  );
};

const styles = StyleSheet.create({
  // Your styles here
});

export default MedicationList;
```

### 6. Implement the MedicationItem Component

```typescript
// MedicationItem.tsx (partial implementation)
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

interface MedicationItemProps {
  medication: Medication;
  onToggle: (id: string) => void;
}

const MedicationItem: React.FC<MedicationItemProps> = ({ 
  medication, 
  onToggle 
}) => {
  return (
    <TouchableOpacity 
      style={[styles.container, medication.taken && styles.takenContainer]} 
      onPress={() => onToggle(medication.id)}
    >
      {/* Implement medication item UI */}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  // Your styles here
});

export default MedicationItem;
```

## Bonus Challenges

If you complete the main challenge quickly, try these bonus tasks:

1. **Add Time-Based Highlighting**: Highlight medications that are due soon (within the next hour)
2. **Add Persistence**: Use AsyncStorage to save the medication status
3. **Add Swipe Actions**: Implement swipe-to-mark functionality using React Native Gesture Handler
4. **Add Animations**: Add simple animations when marking medications as taken

## Evaluation Criteria

Your solution will be evaluated based on:

1. **Functionality**: Does it meet all the requirements?
2. **Code Quality**: Is the code well-structured and following best practices?
3. **Component Design**: Are components properly separated with clear responsibilities?
4. **TypeScript Usage**: Are types properly defined and used?
5. **Styling**: Is the UI visually appealing and responsive?
6. **Documentation**: Is the code well-documented with JSDoc comments?

## Submission

Create a new Expo Snack with your solution and share the link with your instructor or peers.

## Tips

- Start by implementing the basic structure and data flow
- Focus on functionality first, then improve the styling
- Use TypeScript interfaces to define your data structures
- Test your app with different screen sizes
- Remember to handle edge cases (e.g., empty medication list)

## Learning Path Notes

### Instructor-Led
Instructors should review each participant's solution and provide feedback on component structure and state management approaches.

### Self-Led
After completing the challenge, compare your solution with the reference implementation provided in the course materials.

### Asynchronous
Focus on the aspects most relevant to your current learning goals. If you're primarily interested in UI, spend more time on the styling aspects.

## Additional Resources

- [React Native FlatList Documentation](https://reactnative.dev/docs/flatlist)
- [React State and Lifecycle](https://reactjs.org/docs/state-and-lifecycle.html)
- [TypeScript in React Native](https://reactnative.dev/docs/typescript)
- [React Native Styling Cheat Sheet](https://github.com/vhpoet/react-native-styling-cheat-sheet)
