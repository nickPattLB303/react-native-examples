# Exercise: Pharmacy App Layouts with Flexbox

## Objective
Apply Flexbox concepts to create common UI layouts used in pharmacy applications.

## Duration
45-60 minutes

## Exercise Description

In this exercise, you'll practice implementing various layouts using Flexbox in React Native. You'll create several common UI patterns found in pharmacy applications, focusing on proper component arrangement and spacing.

### Requirements

You will implement four different layout patterns:
1. A medication list item with multiple sections
2. A dashboard grid of medication categories
3. A split-screen medication details view
4. A prescription form with proper label and input alignment

### Setup

Create a new React Native project or use a sandbox environment like Expo Snack (https://snack.expo.dev/).

```jsx
import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, TextInput } from 'react-native';

const FlexboxExercise = () => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Flexbox Exercise</Text>
      
      {/* Your implementations will go here */}
      
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
  },
});

export default FlexboxExercise;
```

### Implementation Tasks

#### Task 1: Medication List Item

Create a list item component that displays medication information with the following layout:
- An image on the left
- Medication name and description in the middle
- Status indicator and action button on the right

```jsx
const MedicationListItem = () => {
  return (
    <View style={listItemStyles.container}>
      {/* Implement the list item layout here */}
      {/* Use proper flexbox properties to align items */}
    </View>
  );
};

const listItemStyles = StyleSheet.create({
  container: {
    // Add your styles here
  },
  // Add more styles as needed
});
```

Expected result:
```
+------------------------------------------------+
| [Image]  Lisinopril 10mg              [ACTIVE] |
|          Take once daily with water    [Refill]|
+------------------------------------------------+
```

#### Task 2: Medication Categories Grid

Create a grid layout for medication categories with:
- 2 columns of equal width
- Centered content within each grid item
- Proper spacing between items

```jsx
const MedicationCategoriesGrid = () => {
  const categories = [
    { id: '1', name: 'Heart Medications', icon: '❤️' },
    { id: '2', name: 'Pain Relief', icon: '💊' },
    { id: '3', name: 'Antibiotics', icon: '🦠' },
    { id: '4', name: 'Allergy Relief', icon: '🤧' },
  ];

  return (
    <View style={gridStyles.container}>
      {/* Implement the grid layout here */}
      {/* Use flexDirection and flexWrap appropriately */}
    </View>
  );
};

const gridStyles = StyleSheet.create({
  container: {
    // Add your styles here
  },
  // Add more styles as needed
});
```

Expected result:
```
+----------------+----------------+
|      ❤️        |       💊       |
| Heart Medicines|   Pain Relief  |
+----------------+----------------+
|      🦠        |       🤧       |
|   Antibiotics  | Allergy Relief |
+----------------+----------------+
```

#### Task 3: Split Screen Medication Details

Create a split-screen layout that:
- Divides the screen into top and bottom sections
- Top section (1/3 of height) shows the medication image and name
- Bottom section (2/3 of height) shows details in a scrollable area

```jsx
const MedicationDetailsSplit = () => {
  return (
    <View style={splitStyles.container}>
      {/* Implement the split screen layout here */}
      {/* Use flex proportions to divide the screen */}
    </View>
  );
};

const splitStyles = StyleSheet.create({
  container: {
    // Add your styles here
  },
  // Add more styles as needed
});
```

Expected result:
```
+------------------------------------------------+
|                                                |
|               [Medication Image]               |
|                  Lisinopril                    |
|                                                |
+------------------------------------------------+
|                                                |
|  Description:                                  |
|  Used to treat high blood pressure and...      |
|                                                |
|  Dosage:                                       |
|  Take 1 tablet once daily.                     |
|                                                |
|  Side Effects:                                 |
|  May cause dizziness, headache, or...          |
|                                                |
+------------------------------------------------+
```

#### Task 4: Prescription Form

Create a form layout with:
- Labels aligned on the left
- Inputs taking the majority of the space
- Consistent spacing between form rows

```jsx
const PrescriptionForm = () => {
  return (
    <View style={formStyles.container}>
      {/* Implement the form layout here */}
      {/* Align labels and inputs properly */}
    </View>
  );
};

const formStyles = StyleSheet.create({
  container: {
    // Add your styles here
  },
  // Add more styles as needed
});
```

Expected result:
```
+------------------------------------------------+
| Medication:  [                            ]    |
|                                                |
| Dosage:      [                            ]    |
|                                                |
| Frequency:   [                            ]    |
|                                                |
| Duration:    [                            ]    |
|                                                |
|                    [Submit]                    |
+------------------------------------------------+
```

### Completion

After implementing all four layouts, integrate them into the main component:

```jsx
const FlexboxExercise = () => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Flexbox Exercise</Text>
      
      <Text style={styles.sectionTitle}>1. Medication List Item</Text>
      <MedicationListItem />
      
      <Text style={styles.sectionTitle}>2. Medication Categories Grid</Text>
      <MedicationCategoriesGrid />
      
      <Text style={styles.sectionTitle}>3. Split Screen Details</Text>
      <MedicationDetailsSplit />
      
      <Text style={styles.sectionTitle}>4. Prescription Form</Text>
      <PrescriptionForm />
    </ScrollView>
  );
};

// Add this to your styles
const styles = StyleSheet.create({
  // ... existing styles
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 24,
    marginBottom: 12,
  },
});
```

## Sample Solutions

Here are sample solutions for each task:

### Task 1: Medication List Item Solution

```jsx
const MedicationListItem = () => {
  return (
    <View style={listItemStyles.container}>
      <Image 
        source={{ uri: 'https://via.placeholder.com/50' }} 
        style={listItemStyles.image} 
      />
      <View style={listItemStyles.infoContainer}>
        <Text style={listItemStyles.title}>Lisinopril 10mg</Text>
        <Text style={listItemStyles.description}>Take once daily with water</Text>
      </View>
      <View style={listItemStyles.actionContainer}>
        <View style={listItemStyles.statusBadge}>
          <Text style={listItemStyles.statusText}>ACTIVE</Text>
        </View>
        <TouchableOpacity style={listItemStyles.button}>
          <Text style={listItemStyles.buttonText}>Refill</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const listItemStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 12,
    marginVertical: 8,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.5,
    elevation: 2,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
  },
  infoContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    color: '#666',
  },
  actionContainer: {
    alignItems: 'flex-end',
  },
  statusBadge: {
    backgroundColor: '#4CAF50',
    paddingVertical: 2,
    paddingHorizontal: 6,
    borderRadius: 4,
    marginBottom: 6,
  },
  statusText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#2196F3',
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 4,
  },
  buttonText: {
    color: 'white',
    fontSize: 12,
  },
});
```

### Task 2: Medication Categories Grid Solution

```jsx
const MedicationCategoriesGrid = () => {
  const categories = [
    { id: '1', name: 'Heart Medications', icon: '❤️' },
    { id: '2', name: 'Pain Relief', icon: '💊' },
    { id: '3', name: 'Antibiotics', icon: '🦠' },
    { id: '4', name: 'Allergy Relief', icon: '🤧' },
  ];

  return (
    <View style={gridStyles.container}>
      {categories.map(category => (
        <View key={category.id} style={gridStyles.gridItem}>
          <Text style={gridStyles.icon}>{category.icon}</Text>
          <Text style={gridStyles.name}>{category.name}</Text>
        </View>
      ))}
    </View>
  );
};

const gridStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -8, // Compensate for gridItem margin
  },
  gridItem: {
    width: '50%', // Two columns
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
    boxSizing: 'border-box',
  },
  icon: {
    fontSize: 32,
    marginBottom: 8,
  },
  name: {
    textAlign: 'center',
    fontWeight: '500',
  },
});
```

### Task 3: Split Screen Medication Details Solution

```jsx
const MedicationDetailsSplit = () => {
  return (
    <View style={splitStyles.container}>
      <View style={splitStyles.topSection}>
        <Image 
          source={{ uri: 'https://via.placeholder.com/120' }} 
          style={splitStyles.image} 
        />
        <Text style={splitStyles.title}>Lisinopril</Text>
      </View>
      
      <View style={splitStyles.bottomSection}>
        <ScrollView>
          <Text style={splitStyles.sectionTitle}>Description:</Text>
          <Text style={splitStyles.sectionContent}>
            Used to treat high blood pressure and heart failure. It helps to prevent future heart attacks and strokes.
          </Text>
          
          <Text style={splitStyles.sectionTitle}>Dosage:</Text>
          <Text style={splitStyles.sectionContent}>
            Take 1 tablet once daily.
          </Text>
          
          <Text style={splitStyles.sectionTitle}>Side Effects:</Text>
          <Text style={splitStyles.sectionContent}>
            May cause dizziness, headache, or dry cough. Contact your doctor if you experience swelling of the face, lips, or throat.
          </Text>
        </ScrollView>
      </View>
    </View>
  );
};

const splitStyles = StyleSheet.create({
  container: {
    height: 500, // Fixed height for demo purposes
    backgroundColor: 'white',
    borderRadius: 8,
    overflow: 'hidden',
    marginVertical: 16,
  },
  topSection: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  image: {
    width: 120,
    height: 120,
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  bottomSection: {
    flex: 2,
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 8,
  },
  sectionContent: {
    fontSize: 16,
    lineHeight: 24,
    color: '#333',
  },
});
```

### Task 4: Prescription Form Solution

```jsx
const PrescriptionForm = () => {
  return (
    <View style={formStyles.container}>
      <View style={formStyles.formRow}>
        <Text style={formStyles.label}>Medication:</Text>
        <TextInput 
          style={formStyles.input} 
          placeholder="Enter medication name"
        />
      </View>
      
      <View style={formStyles.formRow}>
        <Text style={formStyles.label}>Dosage:</Text>
        <TextInput 
          style={formStyles.input} 
          placeholder="Enter dosage"
        />
      </View>
      
      <View style={formStyles.formRow}>
        <Text style={formStyles.label}>Frequency:</Text>
        <TextInput 
          style={formStyles.input} 
          placeholder="How often to take"
        />
      </View>
      
      <View style={formStyles.formRow}>
        <Text style={formStyles.label}>Duration:</Text>
        <TextInput 
          style={formStyles.input} 
          placeholder="How long to take"
        />
      </View>
      
      <TouchableOpacity style={formStyles.submitButton}>
        <Text style={formStyles.submitButtonText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

const formStyles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    marginVertical: 8,
  },
  formRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  label: {
    width: 100,
    fontSize: 16,
    fontWeight: '500',
  },
  input: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
    paddingHorizontal: 8,
  },
  submitButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 4,
    padding: 12,
    alignItems: 'center',
    marginTop: 8,
  },
  submitButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
```

## Bonus Challenges

1. **Responsive Layout**: Modify your layouts to respond to different screen sizes using the Dimensions API
   ```jsx
   import { Dimensions } from 'react-native';
   const windowWidth = Dimensions.get('window').width;
   ```

2. **Platform-Specific Styling**: Add platform-specific styles for iOS and Android
   ```jsx
   import { Platform } from 'react-native';
   const platformStyles = {
     shadow: Platform.OS === 'ios' 
       ? { shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.2, shadowRadius: 2 }
       : { elevation: 2 }
   }
   ```

3. **Dynamic Grid Columns**: Make the grid show more columns on larger screens
   ```jsx
   const numColumns = windowWidth > 600 ? 3 : 2; // Tablet vs phone
   ```

4. **Animated Expandable Section**: Add an expandable section to one of your layouts using animation and flexbox

## Submission

Take screenshots of each completed layout on both iOS and Android simulators if possible. Submit these along with your code.

## Helpful Resources

- [Flexbox Cheatsheet for React Native](https://reactnative.dev/docs/flexbox)
- [Layout Props Documentation](https://reactnative.dev/docs/layout-props)
- [React Native Dimensions API](https://reactnative.dev/docs/dimensions) 