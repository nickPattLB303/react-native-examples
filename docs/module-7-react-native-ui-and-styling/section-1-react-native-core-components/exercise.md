# Exercise: Pharmacy Component Playground

## Objective
Practice using React Native core components by building a simple medication information card.

## Duration
30 minutes for main challenge, additional time for bonus tasks

## Exercise Description

In this exercise, you'll create a basic medication card component using React Native core components. This will help you get familiar with the fundamental building blocks of React Native UI.

### Requirements

#### MAIN CHALLENGE (30 minutes)
Create a `MedicationCard` component that displays:
1. The medication name (Text)
2. An image of the medication (Image)
3. Dosage information (Text)
4. A button to mark as "Taken" (Button)

### Step 1: Set Up Your Environment

Create a new component file in your React Native project. If you don't have a project set up, you can use Expo Snack (https://snack.expo.dev/) for this exercise.

```jsx
import React, { useState } from 'react';
import { View, Text, Image, Button, StyleSheet } from 'react-native';

const MedicationCard = () => {
  // Your code will go here
};

export default MedicationCard;
```

### Step 2: Create the Basic Structure

Build the basic structure of your component using View containers:

```jsx
const MedicationCard = () => {
  const [taken, setTaken] = useState(false);
  
  return (
    <View style={styles.card}>
      {/* Header section */}
      <View style={styles.header}>
        {/* Image will go here */}
        {/* Name will go here */}
      </View>
      
      {/* Body section */}
      <View style={styles.body}>
        {/* Dosage info will go here */}
      </View>
      
      {/* Footer section */}
      <View style={styles.footer}>
        {/* Button will go here */}
      </View>
    </View>
  );
};
```

### Step 3: Add Content and Functionality

Fill in the component with all required elements:

```jsx
const MedicationCard = () => {
  const [taken, setTaken] = useState(false);
  
  return (
    <View style={styles.card}>
      {/* Header section */}
      <View style={styles.header}>
        <Image 
          source={{ uri: 'https://via.placeholder.com/50' }} 
          style={styles.image} 
        />
        <Text style={styles.title}>Lisinopril 10mg</Text>
      </View>
      
      {/* Body section */}
      <View style={styles.body}>
        <Text style={styles.dosage}>Take 1 tablet once daily</Text>
        <Text style={styles.instructions}>Take with food. Avoid grapefruit.</Text>
      </View>
      
      {/* Footer section */}
      <View style={styles.footer}>
        <Button 
          title={taken ? "Marked as Taken" : "Mark as Taken"} 
          onPress={() => setTaken(!taken)} 
          disabled={taken}
        />
      </View>
    </View>
  );
};
```

### Step 4: Add Styles

Create styles for your component using StyleSheet:

```jsx
const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    margin: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  body: {
    marginBottom: 16,
  },
  dosage: {
    fontSize: 16,
    marginBottom: 4,
  },
  instructions: {
    fontSize: 14,
    color: '#666',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
```

### Step 5: Create a Parent Component for Testing

Create a parent component to render your MedicationCard:

```jsx
import React from 'react';
import { ScrollView, StatusBar, SafeAreaView, StyleSheet } from 'react-native';
import MedicationCard from './MedicationCard';

const App = () => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <ScrollView contentContainerStyle={styles.scrollView}>
        <MedicationCard />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollView: {
    padding: 16,
  },
});

export default App;
```

## BONUS CHALLENGES (if you finish early)

If you finish early or want to further enhance your component:

1. **Add a Reminder Toggle**:
   - Add a toggle to set a reminder (using TouchableOpacity and state)
   - Style it differently when active vs. inactive

2. **Add Platform-Specific Styling**:
   - Use the Platform API to apply different styles or behavior based on iOS or Android

3. **Implement a List of Medications**:
   - Create an array of medication data
   - Use the .map() function to render multiple MedicationCard components

4. **Add Animation**:
   - Add a simple animation when marking a medication as taken

5. **Implement Error Handling**:
   - Add error handling for the image loading
   - Show a placeholder if the image fails to load

## Submission

Take a screenshot of your completed component running in a simulator or on a device. If you added any bonus features, include those in your submission as well.

## Helpful Resources

- [React Native View Documentation](https://reactnative.dev/docs/view)
- [React Native Text Documentation](https://reactnative.dev/docs/text)
- [React Native Image Documentation](https://reactnative.dev/docs/image)
- [React Native Button Documentation](https://reactnative.dev/docs/button)
- [React Native TouchableOpacity Documentation](https://reactnative.dev/docs/touchableopacity) 