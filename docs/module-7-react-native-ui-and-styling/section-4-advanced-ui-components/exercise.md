# Exercise: Building Custom Advanced UI Components

## Objective
Create custom advanced UI components for a pharmaceutical application.

## Duration
30 minutes for main challenge, additional time for bonus tasks

## Exercise Description

In this exercise, you'll build custom advanced UI components that could be used in a medication tracking application. These components will improve the user experience and demonstrate your understanding of React Native UI concepts.

### MAIN CHALLENGE (30 minutes)

For the main challenge, you'll implement two essential components:

1. A custom ProgressPill component that shows medication adherence
2. A MedicationCard component that incorporates the ProgressPill

### Setup

Create a new React Native project using Expo or React Native CLI, or use a sandbox environment like Expo Snack.

```jsx
import React from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView } from 'react-native';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Text style={styles.header}>Advanced UI Components Exercise</Text>
        
        {/* Your components will go here */}
        
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    margin: 20,
  },
});
```

### Component 1: ProgressPill Component

Create a pill-shaped progress indicator that visually shows medication adherence:

```jsx
import React from 'react';
import { View, StyleSheet } from 'react-native';

const ProgressPill = ({ progress, width = 100, height = 16, color = '#4CD964' }) => {
  // Ensure progress is between 0 and 1
  const validProgress = Math.min(Math.max(progress, 0), 1);
  
  return (
    <View style={[styles.container, { width, height }]}>
      <View 
        style={[
          styles.progress, 
          { 
            width: `${validProgress * 100}%`,
            backgroundColor: color
          }
        ]} 
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#E9E9E9',
    borderRadius: 999,
    overflow: 'hidden',
  },
  progress: {
    height: '100%',
    borderRadius: 999,
  },
});

export default ProgressPill;
```

### Component 2: MedicationCard Component

Create a card component that displays medication information and includes the ProgressPill:

```jsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import ProgressPill from './ProgressPill';

const MedicationCard = ({ 
  name, 
  dosage, 
  schedule, 
  adherence // Value between 0 and 1
}) => {
  // Function to determine status text and color based on adherence
  const getStatus = () => {
    if (adherence >= 0.9) return { text: 'Excellent', color: '#4CD964' };
    if (adherence >= 0.7) return { text: 'Good', color: '#34C759' };
    if (adherence >= 0.5) return { text: 'Fair', color: '#FFCC00' };
    return { text: 'Poor', color: '#FF3B30' };
  };
  
  const status = getStatus();
  
  return (
    <View style={styles.card}>
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.details}>{dosage} • {schedule}</Text>
      
      <View style={styles.adherenceContainer}>
        <Text style={styles.adherenceLabel}>Adherence:</Text>
        <View style={styles.adherenceData}>
          <ProgressPill 
            progress={adherence} 
            width={120} 
            color={status.color} 
          />
          <Text style={[styles.adherenceText, { color: status.color }]}>
            {status.text} ({Math.round(adherence * 100)}%)
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  details: {
    fontSize: 14,
    color: '#666',
    marginBottom: 16,
  },
  adherenceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  adherenceLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
  },
  adherenceData: {
    flexDirection: 'column',
    alignItems: 'flex-end',
    gap: 4,
  },
  adherenceText: {
    fontSize: 12,
    fontWeight: '500',
  },
});

export default MedicationCard;
```

### Using the Components

Now, use these components in the main App:

```jsx
import React from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import MedicationCard from './MedicationCard';

export default function App() {
  // Sample medication data
  const medications = [
    { id: '1', name: 'Lisinopril', dosage: '10mg', schedule: 'Once daily', adherence: 0.95 },
    { id: '2', name: 'Metformin', dosage: '500mg', schedule: 'Twice daily', adherence: 0.75 },
    { id: '3', name: 'Ibuprofen', dosage: '200mg', schedule: 'As needed', adherence: 0.5 },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Text style={styles.header}>Medication Tracker</Text>
        
        {medications.map(med => (
          <MedicationCard 
            key={med.id}
            name={med.name}
            dosage={med.dosage}
            schedule={med.schedule}
            adherence={med.adherence}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    margin: 20,
    marginBottom: 30,
  },
});
```

## BONUS CHALLENGES (if you finish early)

If you have additional time, try implementing these components:

### Bonus Component 1: Collapsible Information Panel

Create a collapsible panel for medication information:

```jsx
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated } from 'react-native';

const CollapsiblePanel = ({ title, children }) => {
  const [expanded, setExpanded] = useState(false);
  const [animation] = useState(new Animated.Value(0));
  
  const toggleExpand = () => {
    const toValue = expanded ? 0 : 1;
    
    Animated.timing(animation, {
      toValue,
      duration: 300,
      useNativeDriver: false,
    }).start();
    
    setExpanded(!expanded);
  };
  
  const bodyHeight = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 500], // Adjust based on content
  });
  
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={toggleExpand} style={styles.header}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.icon}>{expanded ? '▲' : '▼'}</Text>
      </TouchableOpacity>
      
      <Animated.View 
        style={[
          styles.content, 
          { height: bodyHeight, opacity: animation }
        ]}
      >
        <View style={styles.innerContent}>
          {children}
        </View>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 8,
    overflow: 'hidden',
    marginHorizontal: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f8f8f8',
  },
  title: {
    fontSize: 16,
    fontWeight: '500',
  },
  icon: {
    fontSize: 12,
  },
  content: {
    overflow: 'hidden',
  },
  innerContent: {
    padding: 16,
  },
});

export default CollapsiblePanel;
```

### Bonus Component 2: Circular Timer

Create a circular timer component for timed medication reminders:

```jsx
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import Svg, { Circle } from 'react-native-svg';

const CircularTimer = ({ 
  duration = 30, // Duration in seconds
  size = 120,
  strokeWidth = 10,
  color = '#007AFF',
  onComplete = () => {}
}) => {
  const [timeLeft, setTimeLeft] = useState(duration);
  const [animation] = useState(new Animated.Value(0));
  
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  
  useEffect(() => {
    // Start the animation
    Animated.timing(animation, {
      toValue: 1,
      duration: duration * 1000,
      useNativeDriver: false,
    }).start(({ finished }) => {
      if (finished) {
        onComplete();
      }
    });
    
    // Set up the timer
    const interval = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    
    // Clean up
    return () => {
      clearInterval(interval);
    };
  }, []);
  
  // Calculate the stroke-dashoffset based on time left
  const strokeDashoffset = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, circumference],
  });
  
  // Format seconds into mm:ss
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };
  
  return (
    <View style={[styles.container, { width: size, height: size }]}>
      <Svg width={size} height={size}>
        {/* Background circle */}
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#E0E0E0"
          strokeWidth={strokeWidth}
          fill="transparent"
        />
        
        {/* Progress circle */}
        <AnimatedCircle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={color}
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
        />
      </Svg>
      
      <View style={styles.textContainer}>
        <Text style={styles.timeText}>{formatTime(timeLeft)}</Text>
      </View>
    </View>
  );
};

// Create an animated version of the Circle component
const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  textContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
  timeText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default CircularTimer;
```

### Bonus Component 3: Dosage Selector

Create a visual dosage selector for different medication forms:

```jsx
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const DosageSelector = ({ 
  options = [0.5, 1, 1.5, 2], 
  initialValue = 1,
  onChange = () => {} 
}) => {
  const [selectedDosage, setSelectedDosage] = useState(initialValue);
  
  const handleSelect = (dosage) => {
    setSelectedDosage(dosage);
    onChange(dosage);
  };
  
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Select Dosage:</Text>
      
      <View style={styles.pillContainer}>
        {options.map(dosage => (
          <TouchableOpacity
            key={dosage}
            style={[
              styles.pill,
              selectedDosage === dosage && styles.selectedPill
            ]}
            onPress={() => handleSelect(dosage)}
          >
            <View style={styles.pillContent}>
              {/* Visual representation of pills */}
              {Array.from({ length: dosage * 2 }).map((_, index) => (
                <View 
                  key={index} 
                  style={[
                    styles.pillUnit,
                    selectedDosage === dosage && styles.selectedPillUnit
                  ]} 
                />
              ))}
            </View>
            <Text 
              style={[
                styles.pillText,
                selectedDosage === dosage && styles.selectedPillText
              ]}
            >
              {dosage} {dosage === 1 ? 'pill' : 'pills'}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 8,
  },
  pillContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  pill: {
    flex: 1,
    marginHorizontal: 4,
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#f0f0f0',
    alignItems: 'center',
  },
  selectedPill: {
    backgroundColor: '#E1F5FE',
    borderColor: '#2196F3',
    borderWidth: 1,
  },
  pillContent: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    marginBottom: 4,
    maxWidth: 50,
  },
  pillUnit: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#A0A0A0',
    margin: 2,
  },
  selectedPillUnit: {
    backgroundColor: '#2196F3',
  },
  pillText: {
    fontSize: 12,
    color: '#606060',
    textAlign: 'center',
  },
  selectedPillText: {
    color: '#2196F3',
    fontWeight: '500',
  },
});

export default DosageSelector;
```

## Submission Guidelines

When you've completed the exercise, take screenshots of your components in action. Include explanations of:

1. How you approached the design and implementation
2. Any challenges you encountered
3. How you handled responsiveness and edge cases

## Helpful Resources

- [React Native Animated API](https://reactnative.dev/docs/animated)
- [Custom Components in React Native](https://reactnative.dev/docs/native-components-android)
- [Color Selection Guidelines for Healthcare Apps](https://www.healthit.gov/playbook/designing-for-accessibility/) 