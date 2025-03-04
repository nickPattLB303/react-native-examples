# Exercise: Pharmacy App Layouts with Flexbox

## Objective
Apply Flexbox concepts to create common UI layouts used in pharmacy applications.

## Duration
30 minutes for main challenge, additional time for bonus tasks

## Exercise Description

In this exercise, you'll practice implementing various layouts using Flexbox in React Native. You'll create several common UI patterns found in pharmacy applications, focusing on proper component arrangement and spacing.

### MAIN CHALLENGE (30 minutes)

Implement two essential layouts:
1. A medication list item with multiple sections
2. A medication categories grid

### Setup

Create a new React Native project or use a sandbox environment like Expo Snack (https://snack.expo.dev/).

```jsx
import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';

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
      {/* Left: Image */}
      <Image 
        source={{ uri: 'https://via.placeholder.com/50' }} 
        style={listItemStyles.image} 
      />
      
      {/* Middle: Text content */}
      <View style={listItemStyles.textContainer}>
        <Text style={listItemStyles.title}>Lisinopril 10mg</Text>
        <Text style={listItemStyles.description}>Take once daily with water</Text>
      </View>
      
      {/* Right: Status and button */}
      <View style={listItemStyles.rightContainer}>
        <Text style={listItemStyles.status}>ACTIVE</Text>
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
    padding: 16,
    marginBottom: 16,
    alignItems: 'center',
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 16,
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    color: '#666',
  },
  rightContainer: {
    alignItems: 'flex-end',
  },
  status: {
    color: '#28a745',
    fontWeight: 'bold',
    fontSize: 12,
    marginBottom: 4,
  },
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 4,
  },
  buttonText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
});
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
      {categories.map(category => (
        <View key={category.id} style={gridStyles.item}>
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
    marginHorizontal: -8, // To offset the padding of items
  },
  item: {
    width: '50%',
    padding: 8,
  },
  itemContent: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
    aspectRatio: 1, // Create a square
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

### Completion of Main Challenge

After implementing both layouts, integrate them into the main component:

```jsx
const FlexboxExercise = () => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Flexbox Exercise</Text>
      
      <Text style={styles.sectionTitle}>1. Medication List Item</Text>
      <MedicationListItem />
      
      <Text style={styles.sectionTitle}>2. Medication Categories Grid</Text>
      <MedicationCategoriesGrid />
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
    marginBottom: 16,
  },
});
```

## BONUS CHALLENGES (if you finish early)

If you complete the main tasks and have time, implement these additional layouts:

### Bonus Task 1: Split Screen Medication Details

Create a split-screen layout that:
- Divides the screen into top and bottom sections
- Top section (1/3 of height) shows the medication image and name
- Bottom section (2/3 of height) shows details in a scrollable area

```jsx
const MedicationDetailsSplit = () => {
  return (
    <View style={splitStyles.container}>
      {/* Top section */}
      <View style={splitStyles.topSection}>
        <Image 
          source={{ uri: 'https://via.placeholder.com/100' }} 
          style={splitStyles.image} 
        />
        <Text style={splitStyles.title}>Lisinopril</Text>
      </View>
      
      {/* Bottom section */}
      <View style={splitStyles.bottomSection}>
        <ScrollView style={splitStyles.scrollView}>
          <View style={splitStyles.detailItem}>
            <Text style={splitStyles.detailLabel}>Description:</Text>
            <Text style={splitStyles.detailText}>
              Used to treat high blood pressure and heart failure. It belongs to a class of drugs known as ACE inhibitors.
            </Text>
          </View>
          
          <View style={splitStyles.detailItem}>
            <Text style={splitStyles.detailLabel}>Dosage:</Text>
            <Text style={splitStyles.detailText}>
              Take 1 tablet once daily.
            </Text>
          </View>
          
          <View style={splitStyles.detailItem}>
            <Text style={splitStyles.detailLabel}>Side Effects:</Text>
            <Text style={splitStyles.detailText}>
              May cause dizziness, headache, or cough. Contact your doctor if you experience swelling of face/lips/tongue.
            </Text>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

const splitStyles = StyleSheet.create({
  container: {
    height: 500, // Fixed height for demonstration
    backgroundColor: 'white',
    borderRadius: 8,
    overflow: 'hidden',
  },
  topSection: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  bottomSection: {
    flex: 2,
    padding: 16,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  scrollView: {
    flex: 1,
  },
  detailItem: {
    marginBottom: 16,
  },
  detailLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  detailText: {
    fontSize: 14,
    lineHeight: 20,
    color: '#333',
  },
});
```

### Bonus Task 2: Prescription Form with Flexbox

Create a form layout with:
- Labels aligned on the left
- Inputs taking the majority of the space
- Consistent spacing between form rows

```jsx
const PrescriptionForm = () => {
  return (
    <View style={formStyles.container}>
      <View style={formStyles.formRow}>
        <Text style={formStyles.label}>Medication:</Text>
        <View style={formStyles.inputContainer}>
          <Text style={formStyles.input}>Lisinopril</Text>
        </View>
      </View>
      
      <View style={formStyles.formRow}>
        <Text style={formStyles.label}>Dosage:</Text>
        <View style={formStyles.inputContainer}>
          <Text style={formStyles.input}>10mg</Text>
        </View>
      </View>
      
      <View style={formStyles.formRow}>
        <Text style={formStyles.label}>Frequency:</Text>
        <View style={formStyles.inputContainer}>
          <Text style={formStyles.input}>Once daily</Text>
        </View>
      </View>
      
      <View style={formStyles.formRow}>
        <Text style={formStyles.label}>Duration:</Text>
        <View style={formStyles.inputContainer}>
          <Text style={formStyles.input}>30 days</Text>
        </View>
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
  inputContainer: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    justifyContent: 'center',
    paddingHorizontal: 8,
  },
  input: {
    fontSize: 16,
  },
  submitButton: {
    backgroundColor: '#007bff',
    paddingVertical: 12,
    borderRadius: 4,
    alignItems: 'center',
    marginTop: 8,
  },
  submitButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
```

### Bonus Task 3: Complete the Application

If you've implemented all the layouts, add them to the main component:

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
```

## Submission Guidelines

Take a screenshot of your completed layouts running in a simulator or device. If you completed any bonus challenges, include those as well.

## Helpful Resources

- [React Native Flexbox Layout Guide](https://reactnative.dev/docs/flexbox)
- [Yoga Layout Engine Documentation](https://yogalayout.com/docs/)
- [React Native Layout Props](https://reactnative.dev/docs/layout-props)
- [Visual Guide to Flexbox](https://css-tricks.com/snippets/css/a-guide-to-flexbox/) 