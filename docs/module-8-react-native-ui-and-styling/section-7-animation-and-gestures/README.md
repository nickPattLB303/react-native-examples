# Section 7: Animation and Gestures

## Learning Objectives
After completing this section, you will be able to:
- Implement basic animations using React Native's Animated API
- Create complex animation sequences and parallel animations
- Handle user gestures with the PanResponder API
- Combine animations with gesture responses
- Optimize animations for performance
- Use third-party animation libraries
- Apply animations and gestures to enhance user experience

**Prerequisite Knowledge**: React Native Components (Module 7), Custom UI Components (Section 6)
**Estimated Time**: 60-75 minutes

## Introduction to Animations in React Native

Animations are a crucial part of creating engaging mobile experiences. React Native provides several ways to implement animations, from simple transitions to complex gesture-based interactions. Well-designed animations can improve user experience by providing visual feedback, guiding attention, and making interfaces feel more responsive.

> 💡 **Key Insight**: Animations should enhance the user experience, not distract from it. Use animations purposefully to communicate state changes, provide feedback, and guide users through your application.

## React Native's Animated API

The `Animated` API is React Native's primary solution for creating animations. It provides a flexible system for defining animations that can be driven by time or gestures.

### Basic Animation Concepts

```jsx
import React, { useRef, useEffect } from 'react';
import { View, Text, Animated, StyleSheet, Button } from 'react-native';

function FadeInView({ children }) {
  // Create an Animated.Value to drive the opacity
  const opacity = useRef(new Animated.Value(0)).current;
  
  useEffect(() => {
    // Define and start the animation when the component mounts
    Animated.timing(opacity, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true, // Performance optimization
    }).start();
  }, [opacity]);
  
  return (
    <Animated.View style={{ ...styles.container, opacity }}>
      {children}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#e6f7ff',
    borderRadius: 8,
  },
});

// Usage
function AnimationExample() {
  return (
    <View style={{ padding: 20 }}>
      <FadeInView>
        <Text style={{ fontSize: 18, textAlign: 'center' }}>
          This content fades in on mount!
        </Text>
      </FadeInView>
    </View>
  );
}
```

### Animation Types

React Native's `Animated` API provides several animation types:

#### 1. Timing

Animates a value over time using easing functions:

```jsx
import React, { useRef } from 'react';
import { View, Animated, Button, Easing, StyleSheet } from 'react-native';

function TimingAnimationExample() {
  const translateX = useRef(new Animated.Value(0)).current;
  
  const startAnimation = () => {
    // Reset the animation
    translateX.setValue(0);
    
    // Start the animation
    Animated.timing(translateX, {
      toValue: 200,
      duration: 1000,
      easing: Easing.bounce, // Use a bounce easing function
      useNativeDriver: true,
    }).start();
  };
  
  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.box,
          {
            transform: [{ translateX }],
          },
        ]}
      />
      <Button title="Start Animation" onPress={startAnimation} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    width: 100,
    height: 100,
    backgroundColor: '#1890ff',
    borderRadius: 8,
    marginBottom: 20,
  },
});
```

#### 2. Spring

Creates spring-based animations that mimic physical movement:

```jsx
import React, { useRef } from 'react';
import { View, Animated, Button, StyleSheet } from 'react-native';

function SpringAnimationExample() {
  const scale = useRef(new Animated.Value(1)).current;
  
  const startAnimation = () => {
    // Shrink first
    Animated.spring(scale, {
      toValue: 0.8,
      friction: 3, // Controls "bounciness"
      tension: 40, // Controls speed
      useNativeDriver: true,
    }).start(() => {
      // Then bounce back
      Animated.spring(scale, {
        toValue: 1,
        friction: 3,
        tension: 40,
        useNativeDriver: true,
      }).start();
    });
  };
  
  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.box,
          {
            transform: [{ scale }],
          },
        ]}
      />
      <Button title="Spring Animation" onPress={startAnimation} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    width: 100,
    height: 100,
    backgroundColor: '#52c41a',
    borderRadius: 8,
    marginBottom: 20,
  },
});
```

#### 3. Decay

Simulates a gradual slowing down, like momentum scrolling:

```jsx
import React, { useRef } from 'react';
import { View, Animated, Button, StyleSheet } from 'react-native';

function DecayAnimationExample() {
  const translateX = useRef(new Animated.Value(0)).current;
  
  const startAnimation = () => {
    // Reset position
    translateX.setValue(0);
    
    // Start decay animation with initial velocity
    Animated.decay(translateX, {
      velocity: 0.5, // Initial velocity
      deceleration: 0.997, // Deceleration rate
      useNativeDriver: true,
    }).start();
  };
  
  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.box,
          {
            transform: [{ translateX }],
          },
        ]}
      />
      <Button title="Decay Animation" onPress={startAnimation} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    width: 100,
    height: 100,
    backgroundColor: '#fa8c16',
    borderRadius: 8,
    marginBottom: 20,
  },
});
```

### Composing Animations

React Native allows you to compose animations in various ways:

#### 1. Sequence

Run animations one after another:

```jsx
import React, { useRef } from 'react';
import { View, Animated, Button, StyleSheet } from 'react-native';

function SequenceAnimationExample() {
  const translateY = useRef(new Animated.Value(0)).current;
  const opacity = useRef(new Animated.Value(1)).current;
  
  const startAnimation = () => {
    // Reset values
    translateY.setValue(0);
    opacity.setValue(1);
    
    // Create a sequence of animations
    Animated.sequence([
      // First move down
      Animated.timing(translateY, {
        toValue: 200,
        duration: 500,
        useNativeDriver: true,
      }),
      // Then fade out
      Animated.timing(opacity, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }),
      // Then move back up (while invisible)
      Animated.timing(translateY, {
        toValue: 0,
        duration: 0,
        useNativeDriver: true,
      }),
      // Finally fade back in
      Animated.timing(opacity, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start();
  };
  
  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.box,
          {
            opacity,
            transform: [{ translateY }],
          },
        ]}
      />
      <Button title="Sequence Animation" onPress={startAnimation} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    width: 100,
    height: 100,
    backgroundColor: '#722ed1',
    borderRadius: 8,
    marginBottom: 20,
  },
});
```

#### 2. Parallel

Run multiple animations at the same time:

```jsx
import React, { useRef } from 'react';
import { View, Animated, Button, StyleSheet } from 'react-native';

function ParallelAnimationExample() {
  const scale = useRef(new Animated.Value(1)).current;
  const rotate = useRef(new Animated.Value(0)).current;
  
  const startAnimation = () => {
    // Reset values
    scale.setValue(1);
    rotate.setValue(0);
    
    // Run animations in parallel
    Animated.parallel([
      // Scale up
      Animated.timing(scale, {
        toValue: 1.5,
        duration: 1000,
        useNativeDriver: true,
      }),
      // Rotate
      Animated.timing(rotate, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
    ]).start();
  };
  
  // Interpolate rotation value to degrees
  const spin = rotate.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });
  
  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.box,
          {
            transform: [
              { scale },
              { rotate: spin },
            ],
          },
        ]}
      />
      <Button title="Parallel Animation" onPress={startAnimation} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    width: 100,
    height: 100,
    backgroundColor: '#eb2f96',
    borderRadius: 8,
    marginBottom: 20,
  },
});
```

#### 3. Stagger

Start multiple animations with a delay between each:

```jsx
import React, { useRef } from 'react';
import { View, Animated, Button, StyleSheet } from 'react-native';

function StaggerAnimationExample() {
  // Create an array of animated values
  const animations = useRef([...Array(5)].map(() => new Animated.Value(0))).current;
  
  const startAnimation = () => {
    // Reset values
    animations.forEach(anim => anim.setValue(0));
    
    // Stagger the animations
    Animated.stagger(
      150, // Delay between each animation
      animations.map(anim => 
        Animated.timing(anim, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        })
      )
    ).start();
  };
  
  return (
    <View style={styles.container}>
      {animations.map((anim, index) => (
        <Animated.View
          key={index}
          style={[
            styles.bar,
            {
              opacity: anim,
              transform: [
                {
                  translateX: anim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [-100, 0],
                  }),
                },
              ],
            },
          ]}
        />
      ))}
      <Button title="Stagger Animation" onPress={startAnimation} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bar: {
    width: 200,
    height: 20,
    backgroundColor: '#1890ff',
    borderRadius: 4,
    marginBottom: 10,
  },
});
```

### Interpolation

Interpolation allows you to map input ranges to output ranges, enabling complex animations:

```jsx
import React, { useRef, useEffect } from 'react';
import { View, Animated, StyleSheet } from 'react-native';

function InterpolationExample() {
  const progress = useRef(new Animated.Value(0)).current;
  
  useEffect(() => {
    // Create a looping animation
    Animated.loop(
      Animated.timing(progress, {
        toValue: 1,
        duration: 3000,
        useNativeDriver: true,
      })
    ).start();
  }, [progress]);
  
  // Interpolate multiple values from a single animated value
  const translateX = progress.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0, 100, 0],
  });
  
  const opacity = progress.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [1, 0.5, 1],
  });
  
  const rotate = progress.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });
  
  const backgroundColor = progress.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: ['#1890ff', '#eb2f96', '#1890ff'],
  });
  
  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.box,
          {
            opacity,
            backgroundColor,
            transform: [
              { translateX },
              { rotate },
            ],
          },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    width: 100,
    height: 100,
    borderRadius: 8,
  },
});
```

## Gesture Handling with PanResponder

The `PanResponder` API allows you to handle complex touch gestures:

```jsx
import React, { useRef, useState } from 'react';
import { View, Animated, PanResponder, StyleSheet } from 'react-native';

function DraggableBox() {
  // Store the position of the box
  const pan = useRef(new Animated.ValueXY()).current;
  
  // Create a pan responder
  const panResponder = useRef(
    PanResponder.create({
      // Ask to be the responder
      onStartShouldSetPanResponder: () => true,
      
      // Handle the gesture
      onPanResponderMove: Animated.event(
        [
          null, // First argument is the event
          { dx: pan.x, dy: pan.y }, // Extract dx and dy from the gesture
        ],
        { useNativeDriver: false } // Can't use native driver with ValueXY
      ),
      
      // Handle release of touch
      onPanResponderRelease: () => {
        // Animate back to center
        Animated.spring(pan, {
          toValue: { x: 0, y: 0 },
          friction: 5,
          useNativeDriver: false,
        }).start();
      },
    })
  ).current;
  
  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.box,
          {
            transform: [
              { translateX: pan.x },
              { translateY: pan.y },
            ],
          },
        ]}
        {...panResponder.panHandlers}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    width: 100,
    height: 100,
    backgroundColor: '#1890ff',
    borderRadius: 8,
  },
});
```

### Combining Gestures with Animations

Create interactive animations that respond to user gestures:

```jsx
import React, { useRef } from 'react';
import { View, Animated, PanResponder, StyleSheet } from 'react-native';

function SwipeableCard() {
  const pan = useRef(new Animated.ValueXY()).current;
  const opacity = useRef(new Animated.Value(1)).current;
  
  // Create a threshold for dismissing the card
  const dismissThreshold = 100;
  
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      
      onPanResponderMove: (evt, gestureState) => {
        // Update position
        pan.setValue({ x: gestureState.dx, y: gestureState.dy });
        
        // Calculate opacity based on horizontal distance
        const absX = Math.abs(gestureState.dx);
        const newOpacity = 1 - (absX / (dismissThreshold * 2));
        opacity.setValue(newOpacity);
      },
      
      onPanResponderRelease: (evt, gestureState) => {
        const absX = Math.abs(gestureState.dx);
        
        if (absX > dismissThreshold) {
          // Swipe far enough to dismiss
          Animated.timing(opacity, {
            toValue: 0,
            duration: 200,
            useNativeDriver: false,
          }).start();
        } else {
          // Not far enough, animate back to center
          Animated.parallel([
            Animated.spring(pan, {
              toValue: { x: 0, y: 0 },
              friction: 5,
              useNativeDriver: false,
            }),
            Animated.spring(opacity, {
              toValue: 1,
              friction: 5,
              useNativeDriver: false,
            }),
          ]).start();
        }
      },
    })
  ).current;
  
  // Calculate rotation based on horizontal movement
  const rotate = pan.x.interpolate({
    inputRange: [-200, 0, 200],
    outputRange: ['-30deg', '0deg', '30deg'],
  });
  
  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.card,
          {
            opacity,
            transform: [
              { translateX: pan.x },
              { translateY: pan.y },
              { rotate },
            ],
          },
        ]}
        {...panResponder.panHandlers}
      >
        <View style={styles.cardContent}>
          <View style={styles.cardHeader} />
          <View style={styles.cardBody}>
            <View style={styles.textLine} />
            <View style={styles.textLine} />
            <View style={[styles.textLine, { width: '60%' }]} />
          </View>
        </View>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    width: 300,
    height: 200,
    backgroundColor: 'white',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  cardContent: {
    flex: 1,
    padding: 15,
  },
  cardHeader: {
    height: 40,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
    marginBottom: 15,
  },
  cardBody: {
    flex: 1,
  },
  textLine: {
    height: 15,
    backgroundColor: '#f0f0f0',
    borderRadius: 3,
    marginBottom: 10,
    width: '100%',
  },
});
```

## Common Animation Patterns

### 1. Loading Spinner

```jsx
import React, { useRef, useEffect } from 'react';
import { View, Animated, StyleSheet } from 'react-native';

function LoadingSpinner() {
  const rotation = useRef(new Animated.Value(0)).current;
  
  useEffect(() => {
    // Create a looping rotation animation
    Animated.loop(
      Animated.timing(rotation, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      })
    ).start();
  }, [rotation]);
  
  const spin = rotation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });
  
  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.spinner,
          {
            transform: [{ rotate: spin }],
          },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  spinner: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 4,
    borderColor: '#f0f0f0',
    borderTopColor: '#1890ff',
  },
});
```

### 2. Button Feedback

```jsx
import React, { useRef } from 'react';
import { TouchableWithoutFeedback, Animated, Text, StyleSheet } from 'react-native';

function AnimatedButton({ title, onPress }) {
  const scale = useRef(new Animated.Value(1)).current;
  
  const handlePressIn = () => {
    Animated.spring(scale, {
      toValue: 0.95,
      friction: 5,
      useNativeDriver: true,
    }).start();
  };
  
  const handlePressOut = () => {
    Animated.spring(scale, {
      toValue: 1,
      friction: 5,
      useNativeDriver: true,
    }).start();
  };
  
  return (
    <TouchableWithoutFeedback
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      onPress={onPress}
    >
      <Animated.View
        style={[
          styles.button,
          {
            transform: [{ scale }],
          },
        ]}
      >
        <Text style={styles.buttonText}>{title}</Text>
      </Animated.View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#1890ff',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 6,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
});
```

### 3. Collapsible Header

```jsx
import React from 'react';
import { View, Text, ScrollView, Animated, StyleSheet } from 'react-native';

function CollapsibleHeader() {
  const scrollY = new Animated.Value(0);
  
  // Calculate header height based on scroll position
  const headerHeight = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [200, 80],
    extrapolate: 'clamp',
  });
  
  // Calculate header title opacity based on scroll position
  const headerTitleOpacity = scrollY.interpolate({
    inputRange: [0, 60, 90],
    outputRange: [0, 0, 1],
    extrapolate: 'clamp',
  });
  
  // Calculate header content opacity based on scroll position
  const headerContentOpacity = scrollY.interpolate({
    inputRange: [0, 60, 90],
    outputRange: [1, 0, 0],
    extrapolate: 'clamp',
  });
  
  return (
    <View style={styles.container}>
      <Animated.View style={[styles.header, { height: headerHeight }]}>
        <Animated.Text
          style={[styles.headerTitle, { opacity: headerTitleOpacity }]}
        >
          Medications
        </Animated.Text>
        <Animated.View
          style={[styles.headerContent, { opacity: headerContentOpacity }]}
        >
          <Text style={styles.headerContentTitle}>Your Medications</Text>
          <Text style={styles.headerContentSubtitle}>
            Track and manage your prescriptions
          </Text>
        </Animated.View>
      </Animated.View>
      
      <Animated.ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
      >
        {[...Array(20)].map((_, index) => (
          <View key={index} style={styles.item}>
            <Text style={styles.itemText}>Medication Item {index + 1}</Text>
          </View>
        ))}
      </Animated.ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    backgroundColor: '#1890ff',
    justifyContent: 'flex-end',
    overflow: 'hidden',
  },
  headerTitle: {
    position: 'absolute',
    bottom: 16,
    left: 16,
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  headerContent: {
    padding: 16,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  headerContentTitle: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  headerContentSubtitle: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 16,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
  },
  item: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  itemText: {
    fontSize: 16,
  },
});
```

## Animation Performance

### Using the Native Driver

The `useNativeDriver` option significantly improves animation performance by running animations on the native thread:

```jsx
Animated.timing(opacity, {
  toValue: 1,
  duration: 1000,
  useNativeDriver: true, // Run animation on the native thread
}).start();
```

> ⚠️ **Important**: Not all properties can be animated with the native driver. Only non-layout properties like `opacity` and `transform` are supported. Properties like `backgroundColor`, `width`, and `height` cannot use the native driver.

### Optimizing Complex Animations

For complex animations, consider these optimization techniques:

1. **Use `useNativeDriver` whenever possible**
2. **Avoid animating layout properties** (use transform instead)
3. **Minimize the number of animated nodes**
4. **Use `shouldComponentUpdate` or `React.memo` to prevent unnecessary renders**
5. **Consider using `Animated.Value.addListener` sparingly** as it can impact performance

## Third-Party Animation Libraries

While React Native's built-in Animated API is powerful, several third-party libraries offer additional features:

### 1. React Native Reanimated

Reanimated provides a more declarative API and better performance for complex animations:

```jsx
import React from 'react';
import { View, StyleSheet } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { Button } from 'react-native';

function ReanimatedExample() {
  const offset = useSharedValue(0);
  
  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: offset.value }],
    };
  });
  
  const handlePress = () => {
    offset.value = withSpring(offset.value === 0 ? 100 : 0);
  };
  
  return (
    <View style={styles.container}>
      <Animated.View style={[styles.box, animatedStyles]} />
      <Button title="Toggle" onPress={handlePress} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    width: 100,
    height: 100,
    backgroundColor: '#1890ff',
    borderRadius: 8,
    marginBottom: 20,
  },
});
```

### 2. React Native Gesture Handler

Provides more precise gesture handling:

```jsx
import React from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useAnimatedGestureHandler,
  withSpring,
} from 'react-native-reanimated';
import { PanGestureHandler } from 'react-native-gesture-handler';

function GestureHandlerExample() {
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  
  const panGestureEvent = useAnimatedGestureHandler({
    onStart: (_, ctx) => {
      ctx.startX = translateX.value;
      ctx.startY = translateY.value;
    },
    onActive: (event, ctx) => {
      translateX.value = ctx.startX + event.translationX;
      translateY.value = ctx.startY + event.translationY;
    },
    onEnd: () => {
      translateX.value = withSpring(0);
      translateY.value = withSpring(0);
    },
  });
  
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: translateX.value },
        { translateY: translateY.value },
      ],
    };
  });
  
  return (
    <View style={styles.container}>
      <PanGestureHandler onGestureEvent={panGestureEvent}>
