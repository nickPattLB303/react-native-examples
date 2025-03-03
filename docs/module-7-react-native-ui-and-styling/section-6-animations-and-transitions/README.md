# Section 6: Animations and Transitions

## Learning Objectives
After completing this section, you will be able to:
- Implement basic animations using the Animated API
- Create smooth transitions between UI states
- Use interpolation to create complex animation effects
- Apply practical animation patterns to enhance user experience
- Build gesture-based animations with the PanResponder

**Prerequisite Knowledge**: React Native Core Components (Section 1), Styling Fundamentals (Section 2)
**Estimated Time**: 2 hours

## Introduction to Animations in React Native

Animations are a crucial part of creating engaging and intuitive mobile applications. Well-designed animations can guide users through your app, provide feedback on interactions, and make your app feel more polished and responsive. React Native provides several ways to implement animations, from simple transitions to complex gesture-based interactions.

### Why Animations Matter

- **Visual Feedback**: Inform users that their actions have been recognized
- **Focus Attention**: Guide users to important elements of your UI
- **Improve Perceived Performance**: Make waiting times feel shorter
- **Create Delight**: Enhance the overall experience and personality of your app
- **Explain Changes**: Help users understand how UI elements relate to each other

## The Animated API

The primary way to create animations in React Native is through the `Animated` API, which provides a flexible system for defining and controlling animations.

### Basic Animation Example

Here's a simple fade-in animation for a medication reminder card:

```jsx
import React, { useEffect, useRef } from 'react';
import { Animated, View, Text, StyleSheet } from 'react-native';

const MedicationReminder = ({ medication }) => {
  // Create an Animated value for opacity
  const opacity = useRef(new Animated.Value(0)).current;
  
  useEffect(() => {
    // Define and start the animation when component mounts
    Animated.timing(opacity, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true, // Performance optimization
    }).start();
  }, []);
  
  return (
    <Animated.View style={[styles.container, { opacity }]}>
      <Text style={styles.title}>Time to take your medication</Text>
      <Text style={styles.medicationName}>{medication.name}</Text>
      <Text style={styles.dosage}>{medication.dosage}</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
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
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  medicationName: {
    fontSize: 16,
    marginBottom: 4,
  },
  dosage: {
    fontSize: 14,
    color: '#666',
  },
});
```

### Key Animation Types

React Native's `Animated` API provides several types of animations:

#### 1. Timing Animations

Use `Animated.timing()` for animations that happen over a specified duration:

```jsx
Animated.timing(animatedValue, {
  toValue: 1,
  duration: 300, // milliseconds
  easing: Easing.ease, // Optional easing function
  useNativeDriver: true, // Performance optimization
}).start();
```

#### 2. Spring Animations

Use `Animated.spring()` for physics-based animations that simulate spring movement:

```jsx
Animated.spring(animatedValue, {
  toValue: 1,
  friction: 7, // Controls "bounciness"
  tension: 40, // Controls speed
  useNativeDriver: true,
}).start();
```

#### 3. Decay Animations

Use `Animated.decay()` for animations that gradually slow down, like momentum scrolling:

```jsx
Animated.decay(animatedValue, {
  velocity: 0.5, // Initial velocity
  deceleration: 0.997, // Rate of decay
  useNativeDriver: true,
}).start();
```

### Animated Values and Types

The Animated API supports different value types:

- `Animated.Value`: Single value for simple animations
- `Animated.ValueXY`: For 2D animations (position, scale, etc.)
- `Animated.Color`: For color transitions (React Native 0.72+)

### Creating a Pill Swallow Animation

Let's create a more complex animation for a "pill swallowed" confirmation:

```jsx
import React, { useRef, useState } from 'react';
import { Animated, View, Text, TouchableOpacity, StyleSheet, Easing } from 'react-native';

const MedicationTakenConfirmation = () => {
  const [taken, setTaken] = useState(false);
  const pillPosition = useRef(new Animated.ValueXY({ x: 0, y: 0 })).current;
  const pillOpacity = useRef(new Animated.Value(1)).current;
  const checkmarkScale = useRef(new Animated.Value(0)).current;
  
  const takePill = () => {
    // Don't animate again if already taken
    if (taken) return;
    
    setTaken(true);
    
    // Sequence of animations
    Animated.sequence([
      // Move pill down (as if being swallowed)
      Animated.timing(pillPosition, {
        toValue: { x: 0, y: 100 },
        duration: 800,
        easing: Easing.inOut(Easing.ease),
        useNativeDriver: true,
      }),
      // Fade out pill
      Animated.timing(pillOpacity, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
      // Scale up checkmark
      Animated.spring(checkmarkScale, {
        toValue: 1,
        friction: 5,
        tension: 40,
        useNativeDriver: true,
      }),
    ]).start();
  };
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Take your medication</Text>
      
      <TouchableOpacity 
        style={styles.pillButton} 
        onPress={takePill}
        disabled={taken}
      >
        <Animated.View
          style={[
            styles.pill,
            {
              opacity: pillOpacity,
              transform: [
                { translateX: pillPosition.x },
                { translateY: pillPosition.y },
              ],
            },
          ]}
        >
          <Text style={styles.pillText}>PILL</Text>
        </Animated.View>
        
        <Animated.View
          style={[
            styles.checkmark,
            {
              opacity: checkmarkScale, // Using scale as opacity too
              transform: [{ scale: checkmarkScale }],
            },
          ]}
        >
          <Text style={styles.checkmarkText}>✓</Text>
        </Animated.View>
      </TouchableOpacity>
      
      <Text style={styles.instruction}>
        {taken ? 'Medication Taken!' : 'Tap pill to take'}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  pillButton: {
    width: 80,
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pill: {
    width: 60,
    height: 25,
    borderRadius: 15,
    backgroundColor: '#3498db',
    justifyContent: 'center',
    alignItems: 'center',
  },
  pillText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 12,
  },
  checkmark: {
    position: 'absolute',
    backgroundColor: '#2ecc71',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkmarkText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  instruction: {
    marginTop: 20,
    fontSize: 16,
    color: '#555',
  },
});
```

## Interpolation

Interpolation allows you to map an animated value's range to another range, creating more complex animations.

### Basic Interpolation Example

Here's how to use interpolation to change a color based on dosage strength:

```jsx
import React from 'react';
import { Animated, View, Text, StyleSheet } from 'react-native';

const StrengthIndicator = ({ strength }) => {
  // strength should be between 0 and 100
  const animatedValue = new Animated.Value(strength);
  
  // Interpolate strength to a color from green to red
  const backgroundColor = animatedValue.interpolate({
    inputRange: [0, 50, 100],
    outputRange: ['#2ecc71', '#f39c12', '#e74c3c'],
  });
  
  // Interpolate strength to a width
  const width = animatedValue.interpolate({
    inputRange: [0, 100],
    outputRange: ['0%', '100%'],
  });
  
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Strength: {strength}%</Text>
      <View style={styles.track}>
        <Animated.View 
          style={[
            styles.indicator, 
            { width, backgroundColor }
          ]} 
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  track: {
    height: 10,
    backgroundColor: '#eee',
    borderRadius: 5,
    overflow: 'hidden',
  },
  indicator: {
    height: '100%',
  },
});
```

### Complex Interpolation Example

Let's create a circular progress indicator that fills up as time passes:

```jsx
import React, { useEffect, useRef } from 'react';
import { Animated, View, Text, StyleSheet } from 'react-native';
import Svg, { Circle } from 'react-native-svg';

const CircularTimer = ({ duration = 30, onComplete }) => {
  // Animated value for progress
  const progress = useRef(new Animated.Value(0)).current;
  
  useEffect(() => {
    // Start the animation
    Animated.timing(progress, {
      toValue: 1, // 100% progress
      duration: duration * 1000, // Convert duration to milliseconds
      useNativeDriver: true,
    }).start(({ finished }) => {
      if (finished && onComplete) {
        onComplete();
      }
    });
  }, []);
  
  // Interpolate progress to calculate the stroke dash offset
  const circleCircumference = 2 * Math.PI * 40; // Circle with radius 40
  const strokeDashoffset = progress.interpolate({
    inputRange: [0, 1],
    outputRange: [circleCircumference, 0],
  });
  
  // Interpolate progress for timer text
  const timerText = progress.interpolate({
    inputRange: [0, 1],
    outputRange: [duration, 0],
    extrapolate: 'clamp',
  });
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Time until next dose</Text>
      
      <View style={styles.timerContainer}>
        <Svg height="120" width="120" viewBox="0 0 100 100">
          {/* Background Circle */}
          <Circle 
            cx="50" 
            cy="50" 
            r="40" 
            stroke="#e0e0e0" 
            strokeWidth="7" 
            fill="none" 
          />
          
          {/* Animated Progress Circle */}
          <AnimatedCircle 
            cx="50" 
            cy="50" 
            r="40" 
            stroke="#3498db" 
            strokeWidth="7" 
            fill="none" 
            strokeDasharray={circleCircumference} 
            strokeDashoffset={strokeDashoffset} 
            strokeLinecap="round" 
            rotation="-90"
            origin="50, 50"
          />
        </Svg>
        
        <View style={styles.timerTextContainer}>
          <Animated.Text style={styles.timerText}>
            {timerText.interpolate({
              inputRange: [0, duration],
              outputRange: [0, duration],
              extrapolate: 'clamp',
            }).interpolate({
              inputRange: [0, duration],
              outputRange: [0, duration].map(x => Math.round(x).toString()),
            })}
          </Animated.Text>
          <Text style={styles.secondsText}>seconds</Text>
        </View>
      </View>
    </View>
  );
};

// Create an animated version of the Circle component
const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  timerContainer: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  timerTextContainer: {
    position: 'absolute',
    alignItems: 'center',
  },
  timerText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  secondsText: {
    fontSize: 12,
    color: '#666',
  },
});
```

> Note: The above example requires the `react-native-svg` package.

## Animation Composition

The Animated API allows you to compose animations in various ways:

### Parallel Animations

Run multiple animations at the same time:

```jsx
Animated.parallel([
  Animated.timing(opacity, {
    toValue: 1,
    duration: 500,
    useNativeDriver: true,
  }),
  Animated.spring(scale, {
    toValue: 1,
    friction: 4,
    useNativeDriver: true,
  }),
]).start();
```

### Sequence Animations

Run animations one after another:

```jsx
Animated.sequence([
  Animated.timing(opacity, {
    toValue: 1,
    duration: 300,
    useNativeDriver: true,
  }),
  Animated.timing(translateY, {
    toValue: 0,
    duration: 300,
    useNativeDriver: true,
  }),
]).start();
```

### Stagger Animations

Start animations one after another with a delay:

```jsx
Animated.stagger(100, [
  Animated.timing(item1Opacity, {
    toValue: 1,
    useNativeDriver: true,
  }),
  Animated.timing(item2Opacity, {
    toValue: 1,
    useNativeDriver: true,
  }),
  Animated.timing(item3Opacity, {
    toValue: 1,
    useNativeDriver: true,
  }),
]).start();
```

## Practical Animation Patterns

Let's explore some common animation patterns that you can use in your pharmaceutical app:

### 1. Loading Spinner

```jsx
import React, { useEffect, useRef } from 'react';
import { Animated, View, StyleSheet, Easing } from 'react-native';

const LoadingSpinner = () => {
  const rotation = useRef(new Animated.Value(0)).current;
  
  useEffect(() => {
    // Create a looping rotation animation
    Animated.loop(
      Animated.timing(rotation, {
        toValue: 1,
        duration: 1500,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();
  }, []);
  
  // Map 0-1 to 0-360 degrees
  const spin = rotation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });
  
  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.spinner,
          { transform: [{ rotate: spin }] },
        ]}
      >
        <View style={styles.innerCircle} />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  spinner: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 4,
    borderColor: '#3498db',
    borderTopColor: 'rgba(52, 152, 219, 0.5)',
    borderBottomColor: 'rgba(52, 152, 219, 0.8)',
  },
  innerCircle: {
    width: 25,
    height: 25,
    borderRadius: 15,
    backgroundColor: 'white',
    position: 'absolute',
    top: 3.5,
    left: 3.5,
  },
});
```

### 2. Collapsible Section

```jsx
import React, { useState, useRef } from 'react';
import { Animated, View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const CollapsibleSection = ({ title, children }) => {
  const [expanded, setExpanded] = useState(false);
  const animation = useRef(new Animated.Value(0)).current;
  
  const toggleExpand = () => {
    // Toggle expanded state
    setExpanded(!expanded);
    
    // Animate the change
    Animated.timing(animation, {
      toValue: expanded ? 0 : 1,
      duration: 300,
      useNativeDriver: false, // We're animating height which needs JS driver
    }).start();
  };
  
  // Calculate the height for the content container
  const contentHeight = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 200], // Adjust based on your content
  });
  
  // Rotate the arrow icon
  const arrowRotation = animation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
  });
  
  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={styles.header} 
        onPress={toggleExpand}
        activeOpacity={0.8}
      >
        <Text style={styles.title}>{title}</Text>
        <Animated.Text 
          style={[
            styles.arrow, 
            { transform: [{ rotate: arrowRotation }] }
          ]}
        >
          ▼
        </Animated.Text>
      </TouchableOpacity>
      
      <Animated.View style={[styles.content, { height: contentHeight }]}>
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
    marginVertical: 8,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f9f9f9',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  arrow: {
    fontSize: 14,
  },
  content: {
    overflow: 'hidden',
  },
  innerContent: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    padding: 16,
  },
});
```

### 3. Notification Badge

```jsx
import React, { useEffect, useRef } from 'react';
import { Animated, Text, View, StyleSheet } from 'react-native';

const NotificationBadge = ({ count }) => {
  const scale = useRef(new Animated.Value(0)).current;
  
  useEffect(() => {
    // Animate whenever the count changes
    if (count > 0) {
      Animated.sequence([
        Animated.timing(scale, {
          toValue: 1.2,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(scale, {
          toValue: 1,
          duration: 100,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      // Reset scale if count is zero
      scale.setValue(0);
    }
  }, [count]);
  
  // Don't render anything if count is zero
  if (count === 0) return null;
  
  return (
    <Animated.View
      style={[
        styles.badge,
        { transform: [{ scale }] },
      ]}
    >
      <Text style={styles.text}>
        {count > 99 ? '99+' : count}
      </Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  badge: {
    minWidth: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#e74c3c',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: -5,
    right: -5,
    paddingHorizontal: 4,
  },
  text: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
});
```

## Gesture-Based Animations with PanResponder

React Native's `PanResponder` system allows you to create gesture-based animations.

### Draggable Medication Schedule

Here's an example of a draggable card for rescheduling medications:

```jsx
import React, { useRef, useState } from 'react';
import { Animated, PanResponder, View, Text, StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const DraggableMedicationTime = ({ medication, onTimeChange }) => {
  // Track position of the card
  const pan = useRef(new Animated.ValueXY()).current;
  
  // Track which time slot the card is in
  const [timeSlot, setTimeSlot] = useState(medication.timeSlot);
  
  // Define time slots
  const timeSlots = ['Morning', 'Afternoon', 'Evening', 'Night'];
  
  // Calculate the width of each time slot
  const slotWidth = width / timeSlots.length;
  
  // Create PanResponder for handling drag gestures
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: Animated.event(
        [null, { dx: pan.x, dy: pan.y }],
        { useNativeDriver: false }
      ),
      onPanResponderRelease: (e, gesture) => {
        // Calculate which slot we're in based on drag position
        const newSlotIndex = Math.max(
          0,
          Math.min(
            timeSlots.length - 1,
            Math.floor((gesture.moveX / width) * timeSlots.length)
          )
        );
        
        const newSlot = timeSlots[newSlotIndex];
        
        // Update the time slot if it changed
        if (newSlot !== timeSlot) {
          setTimeSlot(newSlot);
          if (onTimeChange) {
            onTimeChange(medication.id, newSlot);
          }
        }
        
        // Animate card to the center of its new slot
        Animated.spring(pan, {
          toValue: { 
            x: (newSlotIndex * slotWidth) + (slotWidth / 2) - 75,  // 75 is half the card width
            y: 0 
          },
          friction: 5,
          useNativeDriver: true,
        }).start();
      },
    })
  ).current;
  
  // Calculate initial position based on time slot
  const initialSlotIndex = timeSlots.indexOf(timeSlot);
  const initialX = (initialSlotIndex * slotWidth) + (slotWidth / 2) - 75;
  
  // Set initial position
  useEffect(() => {
    pan.setValue({ x: initialX, y: 0 });
  }, []);
  
  return (
    <View style={styles.container}>
      {/* Time slot indicators */}
      <View style={styles.timeSlots}>
        {timeSlots.map((slot, index) => (
          <View 
            key={slot} 
            style={[
              styles.timeSlot,
              { width: slotWidth },
              slot === timeSlot && styles.activeTimeSlot,
            ]}
          >
            <Text style={styles.timeSlotText}>{slot}</Text>
          </View>
        ))}
      </View>
      
      {/* Draggable medication card */}
      <Animated.View
        style={[
          styles.card,
          {
            transform: [
              { translateX: pan.x },
              { translateY: pan.y },
            ],
          },
        ]}
        {...panResponder.panHandlers}
      >
        <Text style={styles.medicationName}>{medication.name}</Text>
        <Text style={styles.dosage}>{medication.dosage}</Text>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 200,
    width: '100%',
    marginVertical: 16,
  },
  timeSlots: {
    flexDirection: 'row',
    height: 50,
    marginBottom: 20,
  },
  timeSlot: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  activeTimeSlot: {
    backgroundColor: '#e6f7ff',
    borderColor: '#1890ff',
  },
  timeSlotText: {
    fontSize: 14,
  },
  card: {
    position: 'absolute',
    width: 150,
    height: 100,
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  medicationName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  dosage: {
    fontSize: 14,
    color: '#666',
  },
});
```

## Performance Considerations

When implementing animations, it's important to consider performance:

### Use the Native Driver

When possible, use `useNativeDriver: true` to offload animations to the native thread:

```jsx
Animated.timing(opacity, {
  toValue: 1,
  duration: 500,
  useNativeDriver: true, // Performance optimization
}).start();
```

> Note: Not all properties can be animated with the native driver. Only non-layout properties like `opacity` and `transform` are supported.

### Memoize Animated Components

Use `React.memo` to prevent unnecessary re-renders:

```jsx
const AnimatedCard = React.memo(({ style, children }) => (
  <Animated.View style={[styles.card, style]}>
    {children}
  </Animated.View>
));
```

### Throttle Gesture Events

For gesture-based animations, consider throttling events to reduce the processing load:

```jsx
import { throttle } from 'lodash';

// Throttled update function
const handlePanResponderMove = throttle((evt, gestureState) => {
  // Update animation values
  pan.x.setValue(gestureState.dx);
  pan.y.setValue(gestureState.dy);
}, 16.67); // Approximately 60fps
```

## Best Practices for Animations

1. **Keep It Subtle**: Animations should enhance the experience, not distract from it

2. **Use Animation for Purpose**: Each animation should serve a specific purpose (feedback, attention, explanation)

3. **Consider Accessibility**: Some users may prefer reduced motion (honor the system setting)

4. **Provide Control**: Allow users to skip or disable animations when appropriate

5. **Test on Real Devices**: Animations that look smooth in development may not perform well on lower-end devices

6. **Be Consistent**: Use similar animation patterns throughout your app for a cohesive feel

7. **Animate in 3D Space**: Use transform properties (translate, scale, rotate) for better performance

## Summary

Animations and transitions can significantly enhance the user experience of your React Native application. By using the Animated API and PanResponder, you can create smooth, engaging animations that provide feedback, guide users, and add polish to your UI. Remember to keep performance in mind and to use animations purposefully and consistently throughout your app.

## Further Reading

- [Animated API Documentation](https://reactnative.dev/docs/animated)
- [PanResponder Documentation](https://reactnative.dev/docs/panresponder)
- [React Native Reanimated](https://docs.swmansion.com/react-native-reanimated/) - A more powerful animation library
- [Lottie for React Native](https://github.com/lottie-react-native/lottie-react-native) - For complex pre-built animations
- [Motion Design for Mobile](https://material.io/design/motion/understanding-motion.html) - Material Design motion guidelines 