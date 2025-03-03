# Exercise: Animated Medication Tracker

## Objective
Create an animated medication tracking interface that uses animations and transitions to enhance the user experience.

**Difficulty Level**: Intermediate to Advanced
**Estimated Time**: 90-120 minutes

## Prerequisites
- Completion of Section 1: React Native Core Components
- Completion of Section 2: Styling Fundamentals
- Basic understanding of React's `useState` and `useEffect` hooks

## Exercise Description

In this exercise, you'll enhance a medication tracking app with purposeful animations that improve user engagement and provide visual feedback. You'll implement various types of animations including fade-ins, slide-ins, progress indicators, and gesture-based interactions.

## Requirements

### 1. Animated Onboarding
- Create a simple onboarding sequence with animated transitions between screens
- Include at least 3 screens with different animations

### 2. Medication List with Animated Items
- Implement a list of medications that animate when they appear
- Add swipe-to-delete functionality with animated feedback

### 3. Medication Reminder Animation
- Create an animated notification that appears when it's time to take medication
- Include attention-grabbing animations that aren't overly distractive

### 4. Interactive Medication Dosage Tracker
- Implement a circular progress indicator that animates as medication is taken
- Add gesture controls that allow users to mark medication as taken

### 5. Transition Animations
- Create smooth transitions between different screens or states in the app
- Implement shared element transitions when moving to a detail view

## Setup Instructions

1. Create a new React Native project or use Expo Snack for this exercise:
```bash
npx react-native init AnimatedMedicationTracker
# or
expo init AnimatedMedicationTracker
```

2. Install necessary dependencies:
```bash
npm install react-native-reanimated react-native-gesture-handler
# or
yarn add react-native-reanimated react-native-gesture-handler
```

3. Set up the basic structure for your application with the following components:
   - `App.js`: Main component that manages navigation
   - `OnboardingScreens.js`: Component for the onboarding sequence
   - `MedicationList.js`: Component for displaying the list of medications
   - `MedicationReminder.js`: Component for medication reminders
   - `DosageTracker.js`: Component for tracking medication dosage

## Implementation Steps

### Step 1: Create the Onboarding Animation Sequence

First, let's implement a simple animated onboarding sequence:

```jsx
// components/OnboardingScreens.js
import React, { useState, useEffect, useRef } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Animated, 
  Dimensions, 
  TouchableOpacity 
} from 'react-native';

const { width } = Dimensions.get('window');

const screens = [
  {
    title: "Track Your Medications",
    description: "Keep a record of all your medications in one place",
    color: "#3498db"
  },
  {
    title: "Never Miss a Dose",
    description: "Get reminders when it's time to take your medication",
    color: "#2ecc71"
  },
  {
    title: "Monitor Your Progress",
    description: "See how well you're sticking to your medication schedule",
    color: "#9b59b6"
  }
];

const OnboardingScreens = ({ onComplete }) => {
  const [activeScreen, setActiveScreen] = useState(0);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(width)).current;
  
  // Handle screen transitions
  useEffect(() => {
    // Reset animations
    fadeAnim.setValue(0);
    slideAnim.setValue(width);
    
    // Start new animations
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.spring(slideAnim, {
        toValue: 0,
        friction: 8,
        tension: 40,
        useNativeDriver: true,
      }),
    ]).start();
  }, [activeScreen]);
  
  // Move to the next screen or complete onboarding
  const handleNext = () => {
    if (activeScreen < screens.length - 1) {
      setActiveScreen(activeScreen + 1);
    } else {
      onComplete();
    }
  };
  
  const currentScreen = screens[activeScreen];
  
  return (
    <View style={[styles.container, { backgroundColor: currentScreen.color }]}>
      <Animated.View 
        style={[
          styles.contentContainer,
          { 
            opacity: fadeAnim,
            transform: [{ translateX: slideAnim }] 
          }
        ]}
      >
        <Text style={styles.title}>{currentScreen.title}</Text>
        <Text style={styles.description}>{currentScreen.description}</Text>
      </Animated.View>
      
      <View style={styles.paginationContainer}>
        {screens.map((_, index) => (
          <View 
            key={index} 
            style={[
              styles.paginationDot,
              index === activeScreen && styles.activeDot
            ]} 
          />
        ))}
      </View>
      
      <TouchableOpacity 
        style={styles.nextButton} 
        onPress={handleNext}
      >
        <Text style={styles.nextButtonText}>
          {activeScreen < screens.length - 1 ? "Next" : "Get Started"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  contentContainer: {
    alignItems: 'center',
    marginBottom: 50,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 20,
    textAlign: 'center',
  },
  description: {
    fontSize: 18,
    color: 'white',
    textAlign: 'center',
    paddingHorizontal: 30,
    opacity: 0.8,
  },
  paginationContainer: {
    flexDirection: 'row',
    marginBottom: 50,
  },
  paginationDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: 'rgba(255,255,255,0.4)',
    marginHorizontal: 8,
  },
  activeDot: {
    backgroundColor: 'white',
    width: 20,
  },
  nextButton: {
    backgroundColor: 'white',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 30,
  },
  nextButtonText: {
    color: '#333',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default OnboardingScreens;
```

### Step 2: Implement an Animated Medication List

Now, let's create a medication list with animated items:

```jsx
// components/MedicationList.js
import React, { useRef, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Animated,
  TouchableOpacity,
  PanResponder
} from 'react-native';

// Sample medication data
const MEDICATIONS = [
  { id: '1', name: 'Amoxicillin', dosage: '500mg', schedule: 'Every 8 hours' },
  { id: '2', name: 'Lisinopril', dosage: '10mg', schedule: 'Once daily' },
  { id: '3', name: 'Ibuprofen', dosage: '400mg', schedule: 'As needed' },
  { id: '4', name: 'Metformin', dosage: '1000mg', schedule: 'With meals' },
  { id: '5', name: 'Simvastatin', dosage: '20mg', schedule: 'At bedtime' },
];

const MedicationItem = ({ item, index, onDelete }) => {
  // Animation values
  const opacity = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(50)).current;
  const swipeAnim = useRef(new Animated.Value(0)).current;
  
  // Create swipe gesture handler
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (evt, gestureState) => {
        // Only allow swiping left
        if (gestureState.dx < 0) {
          swipeAnim.setValue(gestureState.dx);
        }
      },
      onPanResponderRelease: (evt, gestureState) => {
        // If swiped far enough to the left, delete the item
        if (gestureState.dx < -120) {
          Animated.timing(swipeAnim, {
            toValue: -500,
            duration: 300,
            useNativeDriver: true,
          }).start(() => onDelete(item.id));
        } else {
          // Reset position
          Animated.spring(swipeAnim, {
            toValue: 0,
            friction: 5,
            useNativeDriver: true,
          }).start();
        }
      },
    })
  ).current;
  
  // Animate item appearing when component mounts
  useEffect(() => {
    // Stagger the animation based on index
    const delay = index * 150;
    
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 500,
        delay,
        useNativeDriver: true,
      }),
      Animated.timing(translateY, {
        toValue: 0,
        duration: 500,
        delay,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);
  
  // Calculate background color based on swipe distance
  const backgroundColor = swipeAnim.interpolate({
    inputRange: [-200, 0],
    outputRange: ['rgba(231,76,60,0.2)', 'white'],
    extrapolate: 'clamp',
  });
  
  return (
    <Animated.View
      style={[
        styles.itemContainer,
        {
          opacity,
          transform: [
            { translateY },
            { translateX: swipeAnim }
          ],
          backgroundColor,
        },
      ]}
      {...panResponder.panHandlers}
    >
      <View style={styles.itemContent}>
        <Text style={styles.medicationName}>{item.name}</Text>
        <Text style={styles.medicationDetails}>{item.dosage} • {item.schedule}</Text>
      </View>
      
      {/* Delete hint shown during swipe */}
      <Animated.View
        style={[
          styles.deleteIndicator,
          {
            opacity: swipeAnim.interpolate({
              inputRange: [-120, -30],
              outputRange: [1, 0],
              extrapolate: 'clamp',
            }),
          },
        ]}
      >
        <Text style={styles.deleteText}>Delete</Text>
      </Animated.View>
    </Animated.View>
  );
};

const MedicationList = () => {
  const [medications, setMedications] = React.useState(MEDICATIONS);
  
  const handleDelete = (id) => {
    setMedications(medications.filter(med => med.id !== id));
  };
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Medications</Text>
      
      <FlatList
        data={medications}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => (
          <MedicationItem 
            item={item} 
            index={index}
            onDelete={handleDelete}
          />
        )}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    margin: 20,
    marginBottom: 10,
  },
  listContent: {
    padding: 16,
  },
  itemContainer: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 12,
    marginBottom: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    overflow: 'hidden',
  },
  itemContent: {
    flex: 1,
  },
  medicationName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  medicationDetails: {
    fontSize: 14,
    color: '#666',
  },
  deleteIndicator: {
    position: 'absolute',
    right: 16,
    top: 0,
    bottom: 0,
    justifyContent: 'center',
  },
  deleteText: {
    color: '#e74c3c',
    fontWeight: 'bold',
  },
});

export default MedicationList;
```

### Step 3: Create an Animated Medication Reminder

Let's create an animated reminder notification:

```jsx
// components/MedicationReminder.js
import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  TouchableOpacity,
  Easing,
  Vibration,
} from 'react-native';

const MedicationReminder = ({ medication, onTake, onDismiss }) => {
  // Animation references
  const slideAnim = useRef(new Animated.Value(-300)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;
  
  // Initialize component
  useEffect(() => {
    // Sliding entrance animation
    Animated.spring(slideAnim, {
      toValue: 0,
      friction: 6,
      tension: 80,
      useNativeDriver: true,
    }).start();
    
    // Pulsing animation for emphasis
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.05,
          duration: 500,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 500,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    ).start();
    
    // Vibrate phone for notification
    Vibration.vibrate([0, 500, 200, 500]);
    
    // Set timeout to auto-dismiss after 10 seconds
    const timeout = setTimeout(() => {
      handleDismiss();
    }, 10000);
    
    return () => {
      clearTimeout(timeout);
      pulseAnim.stopAnimation();
    };
  }, []);
  
  // Handle take medication action
  const handleTake = () => {
    // Exit animation
    Animated.timing(slideAnim, {
      toValue: 400, // Slide to the bottom
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      if (onTake) onTake(medication.id);
    });
  };
  
  // Handle dismiss reminder
  const handleDismiss = () => {
    // Exit animation
    Animated.timing(slideAnim, {
      toValue: -300, // Slide back up
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      if (onDismiss) onDismiss(medication.id);
    });
  };
  
  return (
    <Animated.View
      style={[
        styles.container,
        {
          transform: [
            { translateY: slideAnim },
            { scale: pulseAnim },
          ],
        },
      ]}
    >
      <View style={styles.contentContainer}>
        <View style={styles.iconContainer}>
          <Text style={styles.icon}>💊</Text>
        </View>
        
        <View style={styles.textContainer}>
          <Text style={styles.title}>Time to take your medication</Text>
          <Text style={styles.medicationName}>{medication.name}</Text>
          <Text style={styles.dosage}>{medication.dosage}</Text>
        </View>
      </View>
      
      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={[styles.button, styles.dismissButton]} 
          onPress={handleDismiss}
        >
          <Text style={styles.dismissButtonText}>Dismiss</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.button, styles.takeButton]} 
          onPress={handleTake}
        >
          <Text style={styles.takeButtonText}>Take Now</Text>
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 50,
    left: 20,
    right: 20,
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  contentContainer: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#f0f8ff',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  icon: {
    fontSize: 24,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  medicationName: {
    fontSize: 18,
    marginBottom: 2,
  },
  dosage: {
    fontSize: 14,
    color: '#666',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  button: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginLeft: 12,
  },
  dismissButton: {
    backgroundColor: '#f1f2f6',
  },
  dismissButtonText: {
    color: '#666',
  },
  takeButton: {
    backgroundColor: '#3498db',
  },
  takeButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default MedicationReminder;
```

### Step 4: Implement a Dosage Tracker with Gesture Controls

Now, let's create an interactive circular progress indicator for tracking medication dosage:

```jsx
// components/DosageTracker.js
import React, { useRef, useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  PanResponder,
  Dimensions,
} from 'react-native';

const { width } = Dimensions.get('window');
const CIRCLE_SIZE = width * 0.7;
const CIRCLE_RADIUS = CIRCLE_SIZE / 2;
const STROKE_WIDTH = 20;
const CIRCLE_CIRCUMFERENCE = 2 * Math.PI * (CIRCLE_RADIUS - STROKE_WIDTH / 2);

const DosageTracker = ({ medication, onDosageUpdate }) => {
  // Track progress percentage (0-100)
  const [progress, setProgress] = useState(0);
  
  // Animation values
  const progressAnim = useRef(new Animated.Value(0)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;
  
  // Pan gesture responder
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (evt, gestureState) => {
        // Calculate angle based on touch position
        const { moveX, moveY } = gestureState;
        const centerX = width / 2;
        const centerY = CIRCLE_SIZE / 2 + 50; // Adjust for container position
        
        // Calculate angle in radians
        const angle = Math.atan2(moveY - centerY, moveX - centerX);
        
        // Convert to degrees and adjust for UI
        let degrees = (angle * 180) / Math.PI + 90;
        if (degrees < 0) degrees += 360;
        
        // Convert to progress percentage (0-100)
        const newProgress = Math.min(100, Math.max(0, Math.round(degrees / 3.6)));
        
        // Update values
        setProgress(newProgress);
        progressAnim.setValue(newProgress / 100);
        rotateAnim.setValue(degrees);
      },
      onPanResponderRelease: () => {
        // Notify parent component of dosage update
        if (onDosageUpdate) {
          onDosageUpdate(medication.id, progress);
        }
        
        // Animate to the nearest 25% increment
        const snapTo = Math.round(progress / 25) * 25;
        
        Animated.parallel([
          Animated.spring(progressAnim, {
            toValue: snapTo / 100,
            friction: 5,
            useNativeDriver: false,
          }),
          Animated.spring(rotateAnim, {
            toValue: snapTo * 3.6,
            friction: 5,
            useNativeDriver: false,
          }),
        ]).start(() => {
          setProgress(snapTo);
        });
      },
    })
  ).current;
  
  // Calculate the stroke dash offset based on progress
  const strokeDashoffset = progressAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [CIRCLE_CIRCUMFERENCE, 0],
  });
  
  // Calculate the rotation of the tracker thumb
  const rotation = rotateAnim.interpolate({
    inputRange: [0, 360],
    outputRange: ['0deg', '360deg'],
  });
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{medication.name} Dosage</Text>
      <Text style={styles.dosage}>{medication.dosage}</Text>
      
      <View style={styles.progressContainer} {...panResponder.panHandlers}>
        {/* Background Circle */}
        <View style={styles.backgroundCircle}>
          {/* Progress Arc */}
          <Animated.View
            style={[
              styles.progressCircle,
              {
                strokeDashoffset,
              },
            ]}
          />
          
          {/* Progress Percentage */}
          <View style={styles.percentageContainer}>
            <Text style={styles.percentageText}>{progress}%</Text>
            <Text style={styles.takenText}>Taken</Text>
          </View>
          
          {/* Drag Handle */}
          <Animated.View
            style={[
              styles.handle,
              {
                transform: [
                  { translateX: CIRCLE_RADIUS - STROKE_WIDTH / 2 },
                  { rotate: rotation },
                  { translateX: -(CIRCLE_RADIUS - STROKE_WIDTH / 2) },
                ],
              },
            ]}
          />
        </View>
      </View>
      
      <Text style={styles.instructions}>
        Drag around the circle to track your dosage
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: 'white',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  dosage: {
    fontSize: 18,
    marginBottom: 30,
    color: '#666',
  },
  progressContainer: {
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backgroundCircle: {
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
    borderRadius: CIRCLE_RADIUS,
    borderWidth: STROKE_WIDTH,
    borderColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressCircle: {
    position: 'absolute',
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
    borderRadius: CIRCLE_RADIUS,
    borderWidth: STROKE_WIDTH,
    borderColor: '#3498db',
    borderTopColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: 'transparent',
    transform: [{ rotate: '-90deg' }],
    strokeDasharray: CIRCLE_CIRCUMFERENCE,
  },
  percentageContainer: {
    alignItems: 'center',
  },
  percentageText: {
    fontSize: 36,
    fontWeight: 'bold',
  },
  takenText: {
    fontSize: 16,
    color: '#666',
  },
  handle: {
    position: 'absolute',
    top: -10,
    left: CIRCLE_RADIUS - 10,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#3498db',
    borderWidth: 3,
    borderColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
  },
  instructions: {
    marginTop: 30,
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
});

export default DosageTracker;
```

### Step 5: Combine Everything into a Main App Component

Finally, let's create an App component that puts everything together:

```jsx
// App.js
import React, { useState, useEffect } from 'react';
import { 
  SafeAreaView, 
  StyleSheet, 
  View, 
  Text, 
  TouchableOpacity,
  Animated,
} from 'react-native';

import OnboardingScreens from './components/OnboardingScreens';
import MedicationList from './components/MedicationList';
import MedicationReminder from './components/MedicationReminder';
import DosageTracker from './components/DosageTracker';

// Sample medication
const SAMPLE_MEDICATION = {
  id: '1',
  name: 'Amoxicillin',
  dosage: '500mg',
  schedule: 'Every 8 hours',
};

const App = () => {
  // App state
  const [showOnboarding, setShowOnboarding] = useState(true);
  const [currentScreen, setCurrentScreen] = useState('list');
  const [showReminder, setShowReminder] = useState(false);
  
  // Animation value for screen transitions
  const slideAnim = React.useRef(new Animated.Value(0)).current;
  
  // Show reminder after a delay
  useEffect(() => {
    if (!showOnboarding) {
      const timeout = setTimeout(() => {
        setShowReminder(true);
      }, 5000);
      
      return () => clearTimeout(timeout);
    }
  }, [showOnboarding]);
  
  // Handle screen transitions
  const navigateTo = (screen) => {
    // Determine the direction to slide
    const direction = screen === 'list' ? -1 : 1;
    
    // Animate to the new screen
    Animated.timing(slideAnim, {
      toValue: direction,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      // Reset animation and update current screen
      slideAnim.setValue(0);
      setCurrentScreen(screen);
    });
  };
  
  // Handle reminder actions
  const handleTakeMedication = () => {
    setShowReminder(false);
    // Navigate to dosage tracker
    navigateTo('tracker');
  };
  
  const handleDismissReminder = () => {
    setShowReminder(false);
  };
  
  // Render onboarding if needed
  if (showOnboarding) {
    return (
      <OnboardingScreens 
        onComplete={() => setShowOnboarding(false)} 
      />
    );
  }
  
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Medication Tracker</Text>
      </View>
      
      <View style={styles.content}>
        {currentScreen === 'list' && (
          <MedicationList />
        )}
        
        {currentScreen === 'tracker' && (
          <DosageTracker 
            medication={SAMPLE_MEDICATION}
            onDosageUpdate={(id, progress) => {
              console.log(`Medication ${id} dosage updated: ${progress}%`);
            }}
          />
        )}
      </View>
      
      <View style={styles.footer}>
        <TouchableOpacity 
          style={[
            styles.navButton,
            currentScreen === 'list' && styles.activeNavButton,
          ]} 
          onPress={() => navigateTo('list')}
        >
          <Text style={styles.navButtonText}>Medications</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[
            styles.navButton,
            currentScreen === 'tracker' && styles.activeNavButton,
          ]} 
          onPress={() => navigateTo('tracker')}
        >
          <Text style={styles.navButtonText}>Dosage</Text>
        </TouchableOpacity>
      </View>
      
      {showReminder && (
        <MedicationReminder 
          medication={SAMPLE_MEDICATION}
          onTake={handleTakeMedication}
          onDismiss={handleDismissReminder}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
  },
  footer: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  navButton: {
    flex: 1,
    paddingVertical: 16,
    alignItems: 'center',
  },
  activeNavButton: {
    borderTopWidth: 3,
    borderTopColor: '#3498db',
  },
  navButtonText: {
    fontSize: 16,
    color: '#666',
    fontWeight: '500',
  },
});

export default App;
```

## Testing

To thoroughly test your animations:

1. Test on real devices when possible - animations can perform differently on emulators
2. Test with debug mode both on and off (`Dev Menu > Debug JS Remotely`)
3. Check how animations perform with slower devices (you can simulate this in dev settings)
4. Verify that gestures feel natural and responsive
5. Ensure animations complete properly even when interrupted
6. Test that animations respect the user's "Reduce Motion" accessibility setting if implemented

## Bonus Challenges

If you finish early or want to enhance your implementation:

1. **Shared Element Transitions**: Implement shared element transitions between the medication list and detail views
2. **Lottie Animations**: Add more complex animations using Lottie
3. **Haptic Feedback**: Add haptic feedback to accompany animations for important actions
4. **Theme Transitions**: Animate transitions between light and dark themes
5. **Custom Animation Drivers**: Implement custom animation drivers for more complex animations
6. **Animated Charts**: Create animated medication adherence charts that fill in over time
7. **3D Animations**: Use perspective transforms to create 3D card flip animations

## Submission Guidelines

Submit your completed exercise with:

1. A screen recording showing all animations in action
2. Code files for all components
3. A brief explanation of:
   - What animations you implemented
   - Why you chose those specific animations
   - Any challenges you encountered and how you solved them
4. If you completed any bonus challenges, include details about your implementation

## Helpful Resources

- [React Native Animated API Documentation](https://reactnative.dev/docs/animated)
- [PanResponder Documentation](https://reactnative.dev/docs/panresponder)
- [React Native Gesture Handler](https://docs.swmansion.com/react-native-gesture-handler/)
- [React Native Reanimated](https://docs.swmansion.com/react-native-reanimated/)
- [Lottie for React Native](https://github.com/lottie-react-native/lottie-react-native)
- [Animations in React Native: The Ultimate Guide](https://medium.com/react-native-training/react-native-animations-using-the-animated-api-ebe8e0669fae) 