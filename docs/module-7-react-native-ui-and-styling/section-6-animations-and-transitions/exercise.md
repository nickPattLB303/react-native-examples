# Exercise: Animations for Medication Tracker App

## Objective
Enhance a medication tracking app with animations to improve user experience and visual feedback.

## Duration
30 minutes for main challenge, additional time for bonus tasks

## Exercise Description

In this exercise, you'll implement animations for a medication tracking app to create a more engaging and polished user experience. You'll use React Native's Animated API to create smooth, interactive animations.

### MAIN CHALLENGE (30 minutes)

For the main challenge, focus on implementing two essential animations:

1. A fade-in animation for medication cards
2. A button press animation using scale transform

### Setup

Create a new React Native project using Expo or React Native CLI:

```jsx
import React, { useState, useRef } from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
} from 'react-native';

// Sample medication data
const medications = [
  { id: '1', name: 'Lisinopril', dosage: '10mg', schedule: 'Once daily', taken: false },
  { id: '2', name: 'Metformin', dosage: '500mg', schedule: 'Twice daily', taken: false },
  { id: '3', name: 'Atorvastatin', dosage: '20mg', schedule: 'Once daily at bedtime', taken: false },
];

const App = () => {
  const [meds, setMeds] = useState(medications);
  
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>My Medications</Text>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Medication cards will go here */}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f8fa',
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
    color: '#2c3e50',
  },
  scrollContainer: {
    padding: 16,
  },
});

export default App;
```

### Implementation Tasks

#### Task 1: Create Animated Medication Card Component

First, create a component for medication cards that fades in when mounted:

```jsx
const MedicationCard = ({ medication, onPress }) => {
  // Create an animated value for opacity
  const opacity = useRef(new Animated.Value(0)).current;
  
  // Start the animation when the component mounts
  React.useEffect(() => {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, []);
  
  return (
    <Animated.View 
      style={[
        styles.card,
        { opacity }
      ]}
    >
      <View style={styles.cardContent}>
        <View>
          <Text style={styles.medicationName}>{medication.name}</Text>
          <Text style={styles.medicationDosage}>{medication.dosage}</Text>
          <Text style={styles.medicationSchedule}>{medication.schedule}</Text>
        </View>
        
        <AnimatedButton
          onPress={() => onPress(medication.id)}
          title={medication.taken ? "Taken" : "Take"}
          style={{ 
            backgroundColor: medication.taken ? '#2ecc71' : '#3498db' 
          }}
        />
      </View>
    </Animated.View>
  );
};

// Add these styles to your StyleSheet:
const styles = StyleSheet.create({
  // ... existing styles
  
  card: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    // Shadow for iOS
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    // Shadow for Android
    elevation: 3,
  },
  cardContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  medicationName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 4,
  },
  medicationDosage: {
    fontSize: 16,
    color: '#34495e',
    marginBottom: 4,
  },
  medicationSchedule: {
    fontSize: 14,
    color: '#7f8c8d',
  },
});
```

#### Task 2: Create Animated Button Component

Now, create a button that scales when pressed:

```jsx
const AnimatedButton = ({ onPress, title, style }) => {
  // Create an animated value for the scale
  const scale = useRef(new Animated.Value(1)).current;
  
  // Function to handle button press animation
  const handlePressIn = () => {
    Animated.spring(scale, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };
  
  // Function to handle button release animation
  const handlePressOut = () => {
    Animated.spring(scale, {
      toValue: 1,
      friction: 4,
      tension: 40,
      useNativeDriver: true,
    }).start();
  };
  
  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
    >
      <Animated.View 
        style={[
          styles.button,
          style,
          { transform: [{ scale }] }
        ]}
      >
        <Text style={styles.buttonText}>{title}</Text>
      </Animated.View>
    </TouchableOpacity>
  );
};

// Add these styles to your StyleSheet:
const styles = StyleSheet.create({
  // ... existing styles
  
  button: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: '#3498db',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
  },
});
```

#### Task 3: Use the Components in the App

Now, update the main App component to use these animated components:

```jsx
const App = () => {
  const [meds, setMeds] = useState(medications);
  
  // Function to toggle the 'taken' status
  const toggleMedication = (id) => {
    setMeds(
      meds.map(med => 
        med.id === id ? { ...med, taken: !med.taken } : med
      )
    );
  };
  
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>My Medications</Text>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {meds.map((medication) => (
          <MedicationCard
            key={medication.id}
            medication={medication}
            onPress={toggleMedication}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};
```

## BONUS CHALLENGES (if you finish early)

If you complete the main challenge and have time, try implementing these additional animations:

### Bonus Task 1: Staggered List Animation

Make the medication cards appear one after another with a staggered animation:

```jsx
const App = () => {
  const [meds, setMeds] = useState(medications);
  
  // Create an array of animated values for each medication
  const fadeAnims = useRef(meds.map(() => new Animated.Value(0))).current;
  
  // Start the staggered animation when the component mounts
  useEffect(() => {
    Animated.stagger(
      100, // Stagger offset (delay between animations)
      fadeAnims.map(anim => 
        Animated.timing(anim, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        })
      )
    ).start();
  }, []);
  
  // Function to toggle the 'taken' status
  const toggleMedication = (id) => {
    setMeds(
      meds.map(med => 
        med.id === id ? { ...med, taken: !med.taken } : med
      )
    );
  };
  
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>My Medications</Text>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {meds.map((medication, index) => (
          <Animated.View key={medication.id} style={{ opacity: fadeAnims[index] }}>
            <MedicationCard
              medication={medication}
              onPress={toggleMedication}
            />
          </Animated.View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

// Update the MedicationCard component to not handle its own opacity animation
const MedicationCard = ({ medication, onPress }) => {
  return (
    <View style={styles.card}>
      <View style={styles.cardContent}>
        <View>
          <Text style={styles.medicationName}>{medication.name}</Text>
          <Text style={styles.medicationDosage}>{medication.dosage}</Text>
          <Text style={styles.medicationSchedule}>{medication.schedule}</Text>
        </View>
        
        <AnimatedButton
          onPress={() => onPress(medication.id)}
          title={medication.taken ? "Taken" : "Take"}
          style={{ 
            backgroundColor: medication.taken ? '#2ecc71' : '#3498db' 
          }}
        />
      </View>
    </View>
  );
};
```

### Bonus Task 2: Swipe to Delete Animation

Add a swipe-to-delete animation for medications:

```jsx
import { PanResponder, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');
const SWIPE_THRESHOLD = width * 0.3;

const SwipeableCard = ({ children, onSwipe }) => {
  const pan = useRef(new Animated.Value(0)).current;
  
  const panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: (_, gestureState) => {
      return Math.abs(gestureState.dx) > 10;
    },
    onPanResponderMove: (_, gestureState) => {
      // Only allow swiping left (negative dx)
      if (gestureState.dx < 0) {
        pan.setValue(gestureState.dx);
      }
    },
    onPanResponderRelease: (_, gestureState) => {
      if (gestureState.dx < -SWIPE_THRESHOLD) {
        // Swipe threshold met, trigger delete animation
        Animated.timing(pan, {
          toValue: -width,
          duration: 250,
          useNativeDriver: true,
        }).start(() => {
          // Call the callback after animation completes
          onSwipe();
        });
      } else {
        // Reset position
        Animated.spring(pan, {
          toValue: 0,
          friction: 5,
          useNativeDriver: true,
        }).start();
      }
    },
  });
  
  return (
    <Animated.View
      style={{
        transform: [{ translateX: pan }],
      }}
      {...panResponder.panHandlers}
    >
      {children}
    </Animated.View>
  );
};

// Usage in the App component:
const App = () => {
  // ... existing code
  
  const deleteMedication = (id) => {
    setMeds(meds.filter(med => med.id !== id));
  };
  
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>My Medications</Text>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {meds.map((medication) => (
          <SwipeableCard
            key={medication.id}
            onSwipe={() => deleteMedication(medication.id)}
          >
            <MedicationCard
              medication={medication}
              onPress={toggleMedication}
            />
          </SwipeableCard>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};
```

### Bonus Task 3: Status Change Animation

Add a visual animation when a medication's status changes from "Take" to "Taken":

```jsx
const MedicationCard = ({ medication, onPress }) => {
  // Create an animated value for the background color
  const colorAnim = useRef(new Animated.Value(0)).current;
  
  // Update animation when medication.taken changes
  useEffect(() => {
    Animated.timing(colorAnim, {
      toValue: medication.taken ? 1 : 0,
      duration: 300,
      useNativeDriver: false, // Note: backgroundColor changes require useNativeDriver: false
    }).start();
  }, [medication.taken]);
  
  // Interpolate the animated value to backgroundColor
  const backgroundColor = colorAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['#ffffff', '#e6f7ff']
  });
  
  return (
    <Animated.View 
      style={[
        styles.card,
        { backgroundColor }
      ]}
    >
      <View style={styles.cardContent}>
        <View>
          <Text style={styles.medicationName}>{medication.name}</Text>
          <Text style={styles.medicationDosage}>{medication.dosage}</Text>
          <Text style={styles.medicationSchedule}>{medication.schedule}</Text>
        </View>
        
        <AnimatedButton
          onPress={() => onPress(medication.id)}
          title={medication.taken ? "Taken" : "Take"}
          style={{ 
            backgroundColor: medication.taken ? '#2ecc71' : '#3498db' 
          }}
        />
      </View>
    </Animated.View>
  );
};
```

## Submission Guidelines

When you've completed the exercise, take a short video or animated GIF of your application showing the animations in action. Include explanations of:

1. Which animations you implemented
2. How each animation enhances the user experience
3. Any performance considerations you took into account

## Helpful Resources

- [React Native Animated API Documentation](https://reactnative.dev/docs/animated)
- [React Native PanResponder Documentation](https://reactnative.dev/docs/panresponder)
- [React Native Gesture Handler](https://docs.swmansion.com/react-native-gesture-handler/docs/)
- [Reanimated 2 Documentation](https://docs.swmansion.com/react-native-reanimated/) 