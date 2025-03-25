# Module 7: React Native UI and Styling

## Animation in React Native

Creating fluid and responsive animations to enhance user experience:

```tsx
import React, { useRef, useState, useEffect } from 'react';
import {
  View, Text, StyleSheet, Animated, Easing,
  TouchableOpacity, ScrollView, Dimensions,
  PanResponder
} from 'react-native';

const { width } = Dimensions.get('window');

function AnimationExample() {
  // Fade animation
  const fadeAnim = useRef(new Animated.Value(0)).current;
  
  // Scale animation
  const scaleAnim = useRef(new Animated.Value(1)).current;
  
  // Slide animation
  const slideAnim = useRef(new Animated.Value(-100)).current;
  
  // Spinner animation
  const spinAnim = useRef(new Animated.Value(0)).current;
  
  // Progress animation
  const [progress, setProgress] = useState(0);
  const progressAnim = useRef(new Animated.Value(0)).current;
  
  // Sequence counter for medication reminder
  const [sequence, setSequence] = useState(0);
  
  // Interpolated values
  const spin = spinAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg']
  });
  
  const progressWidth = progressAnim.interpolate({
    inputRange: [0, 100],
    outputRange: ['0%', '100%']
  });
  
  // Drag animation for pill
  const pillPosition = useRef(new Animated.ValueXY({ x: 0, y: 0 })).current;
  const [pillTaken, setPillTaken] = useState(false);
  
  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: Animated.event(
      [null, { dx: pillPosition.x, dy: pillPosition.y }],
      { useNativeDriver: false }
    ),
    onPanResponderRelease: (_, gesture) => {
      // Check if pill is dragged to "taken" zone (right side)
      if (gesture.moveX > width * 0.7) {
        Animated.spring(pillPosition, {
          toValue: { x: width - 120, y: 0 },
          useNativeDriver: false,
        }).start();
        setPillTaken(true);
        triggerSuccessAnimation();
      } else {
        // Return to original position
        Animated.spring(pillPosition, {
          toValue: { x: 0, y: 0 },
          useNativeDriver: false,
        }).start();
      }
    }
  });
  
  // Start basic animations
  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true
    }).start();
    
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 800,
      easing: Easing.out(Easing.back(1.5)),
      useNativeDriver: true
    }).start();
    
    // Start spinner animation
    Animated.loop(
      Animated.timing(spinAnim, {
        toValue: 1,
        duration: 2000,
        easing: Easing.linear,
        useNativeDriver: true
      })
    ).start();
    
    // Progress animation
    animateProgress(0, 100, 3000);
  }, []);
  
  // Function to animate progress bar
  const animateProgress = (from, to, duration) => {
    setProgress(to);
    progressAnim.setValue(from);
    Animated.timing(progressAnim, {
      toValue: to,
      duration,
      easing: Easing.inOut(Easing.ease),
      useNativeDriver: false
    }).start();
  };
  
  // Scale up and down animation
  const pulseAnimation = () => {
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 1.2,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();
  };
  
  // Trigger a success animation sequence when pill is taken
  const triggerSuccessAnimation = () => {
    // Reset progress for demo purposes
    animateProgress(0, 100, 1500);
    
    // Increment sequence counter for medication reminder
    setSequence(prev => (prev + 1) % 3);
  };
  
  // Animation sequence for medication reminder
  useEffect(() => {
    if (sequence > 0) {
      // Create staggered animations for medication reminders
      const animations = [
        Animated.timing(fadeAnim, {
          toValue: 0.5,
          duration: 300,
          useNativeDriver: true
        }),
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true
        })
      ];
      
      Animated.sequence(animations).start();
    }
  }, [sequence]);
  
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Animation in React Native</Text>
      
      {/* Basic animations */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Basic Animations</Text>
        
        <Animated.View 
          style={[
            styles.animationBox,
            {
              opacity: fadeAnim,
              transform: [
                { translateX: slideAnim },
                { scale: scaleAnim }
              ]
            }
          ]}
        >
          <Text style={styles.animationText}>Fade & Slide</Text>
        </Animated.View>
        
        <TouchableOpacity onPress={pulseAnimation} style={styles.button}>
          <Text style={styles.buttonText}>Pulse Animation</Text>
        </TouchableOpacity>
      </View>
      
      {/* Loading and progress */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Loading & Progress</Text>
        
        <View style={styles.row}>
          <Animated.View style={[
            styles.spinner,
            { transform: [{ rotate: spin }] }
          ]}>
            <Text style={styles.spinnerText}>💊</Text>
          </Animated.View>
          
          <View style={styles.progressContainer}>
            <Animated.View 
              style={[
                styles.progressBar, 
                { width: progressWidth }
              ]} 
            />
            <Text style={styles.progressText}>{`${progress}%`}</Text>
          </View>
        </View>
      </View>
      
      {/* Interactive animations */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Interactive Animation</Text>
        <Text style={styles.instructions}>
          Drag the pill to the right to mark as taken
        </Text>
        
        <View style={styles.pillTrack}>
          <View style={styles.pillZone}>
            <Text style={styles.zoneText}>Drag Here</Text>
          </View>
          
          <Animated.View 
            {...panResponder.panHandlers}
            style={[
              styles.draggablePill,
              pillPosition.getLayout(),
              pillTaken && styles.pillTaken
            ]}
          >
            <Text style={styles.pillText}>Amoxicillin</Text>
          </Animated.View>
        </View>
        
        {pillTaken && (
          <Animated.View 
            style={[
              styles.takenMessage,
              { opacity: fadeAnim }
            ]}
          >
            <Text style={styles.takenText}>
              Medication taken! Next dose in 8 hours.
            </Text>
          </Animated.View>
        )}
        
        <TouchableOpacity 
          style={styles.resetButton} 
          onPress={() => {
            setPillTaken(false);
            Animated.spring(pillPosition, {
              toValue: { x: 0, y: 0 },
              useNativeDriver: false,
            }).start();
          }}
        >
          <Text style={styles.resetButtonText}>Reset Demo</Text>
        </TouchableOpacity>
      </View>
      
      {/* Staggered animation */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Reminder Animation</Text>
        
        <View style={styles.reminderContainer}>
          {['Morning', 'Afternoon', 'Evening'].map((time, index) => (
            <Animated.View 
              key={time}
              style={[
                styles.reminderItem,
                sequence > index && { backgroundColor: '#e3f2fd' },
                sequence === index && {
                  opacity: fadeAnim,
                  transform: [{ scale: scaleAnim }]
                }
              ]}
            >
              <Text style={styles.reminderTime}>{time}</Text>
              <Text style={styles.reminderMed}>Lisinopril 10mg</Text>
              <View style={[
                styles.reminderStatus,
                sequence > index && styles.reminderTaken
              ]}>
                <Text style={styles.reminderStatusText}>
                  {sequence > index ? 'Taken' : 'Pending'}
                </Text>
              </View>
            </Animated.View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  section: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
    color: '#3498db',
  },
  animationBox: {
    backgroundColor: '#3498db',
    height: 100,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  animationText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#2ecc71',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  spinner: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  spinnerText: {
    fontSize: 24,
  },
  progressContainer: {
    flex: 1,
    height: 20,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    overflow: 'hidden',
    position: 'relative',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#2ecc71',
    borderRadius: 10,
  },
  progressText: {
    position: 'absolute',
    width: '100%',
    textAlign: 'center',
    fontSize: 12,
    fontWeight: 'bold',
    color: '#333',
    lineHeight: 20,
  },
  pillTrack: {
    height: 60,
    backgroundColor: '#f0f0f0',
    borderRadius: 30,
    marginVertical: 16,
    position: 'relative',
    overflow: 'hidden',
  },
  pillZone: {
    position: 'absolute',
    right: 0,
    height: '100%',
    width: '30%',
    backgroundColor: '#e3f2fd',
    borderTopRightRadius: 30,
    borderBottomRightRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  zoneText: {
    color: '#3498db',
    fontWeight: '500',
    fontSize: 12,
  },
  draggablePill: {
    width: 120,
    height: 40,
    backgroundColor: '#3498db',
    borderRadius: 20,
    position: 'absolute',
    top: 10,
    left: 10,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  pillTaken: {
    backgroundColor: '#2ecc71',
  },
  pillText: {
    color: 'white',
    fontWeight: 'bold',
  },
  instructions: {
    textAlign: 'center',
    color: '#666',
    marginBottom: 8,
    fontStyle: 'italic',
  },
  takenMessage: {
    backgroundColor: '#e8f5e9',
    padding: 12,
    borderRadius: 8,
    marginVertical: 12,
  },
  takenText: {
    color: '#2e7d32',
    textAlign: 'center',
    fontWeight: '500',
  },
  resetButton: {
    backgroundColor: '#f0f0f0',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  resetButtonText: {
    color: '#666',
    fontSize: 14,
  },
  reminderContainer: {
    marginTop: 8,
  },
  reminderItem: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: 'white',
    borderRadius: 8,
    marginBottom: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#3498db',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  reminderTime: {
    fontWeight: 'bold',
    width: 80,
  },
  reminderMed: {
    flex: 1,
  },
  reminderStatus: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: '#f0f0f0',
  },
  reminderTaken: {
    backgroundColor: '#e8f5e9',
  },
  reminderStatusText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#666',
  },
});

export default AnimationExample;
```

<blockquote><details>

Animations are a critical component of modern mobile applications, enhancing user experience by providing visual feedback, guiding attention, and making interfaces feel more responsive and engaging. This example demonstrates several animation techniques in React Native, focusing on practical applications in a medication management context.

React Native's `Animated` API is the cornerstone of animation implementation in the framework, providing a powerful yet efficient way to create fluid animations that run on the native thread for optimal performance. The example demonstrates multiple animation types and techniques:

**Basic Value Animations** form the foundation of React Native's animation system. The example uses several `Animated.Value` instances to control different properties:
- `fadeAnim` manages opacity transitions
- `scaleAnim` handles size changes
- `slideAnim` controls horizontal position
- `spinAnim` drives rotation

These values are connected to component properties through style transformations, allowing precise control over how elements appear and move.

**Animation Timing and Easing** control the pace and feel of animations. The example demonstrates various timing configurations:
- Standard timing with `Animated.timing` for smooth, predictable transitions
- Spring physics with `Animated.spring` for more natural, bouncy movements (used in the pill drag interaction)
- Custom easing with functions like `Easing.back` to create more engaging motion patterns

**Value Interpolation** transforms animation values into different ranges or types. The example shows two key interpolations:
- Converting a 0-1 value to "0deg"-"360deg" for the spinner rotation
- Mapping progress values from 0-100 to "0%"-"100%" for the progress bar width

**Composition of Animations** enables complex sequences and parallel movements. The example demonstrates:
- `Animated.sequence` to run animations one after another (in the pulse effect)
- `Animated.loop` for continuous repetition (spinner)
- Gesture-driven animations with `PanResponder` (pill dragging)

**Practical Applications in Medication Management:**

1. **Progress Indicators**: The circular spinner and progress bar visualize loading states or progress toward taking all daily medications. These animations provide reassurance that the system is working and help users understand their medication adherence.

2. **Interactive Elements**: The draggable pill demonstrates how animation can create engaging interactions. The natural-feeling spring physics when releasing the pill provides satisfying feedback to the user's actions, making the task of marking medications as taken more engaging.

3. **Status Changes**: The success animation when a pill is "taken" provides immediate positive feedback, reinforcing the user's action with visual cues. The color change and message appearance create a rewarding experience.

4. **Attention Direction**: The pulsing animation on medication reminders draws users' attention to important information, particularly the current dose that needs to be taken.

5. **Sequential Guidance**: The staggered animations in the medication reminder section help users understand the sequence of doses throughout the day, with clear visual differentiation between taken, current, and upcoming doses.

**Implementation Considerations:**

The example demonstrates several important practices for animation in React Native:

1. **Performance Optimization**: The code uses `useNativeDriver: true` wherever possible, which offloads animations to the native thread for smoother performance. For animations that can't use the native driver (like layout measurements), it falls back to JavaScript-driven animations.

2. **State Management**: The animations are tied to component state through `useRef` and `useState` hooks, ensuring that animations respond appropriately to state changes and user interactions.

3. **Gesture Handling**: The `PanResponder` integration shows how to create draggable elements with appropriate feedback based on user gestures.

4. **Conditional Animation**: Different animations are triggered based on application state, like the pill being marked as taken or the progression through medication reminders.

5. **Reset Capabilities**: The example includes mechanisms to reset animations, allowing users to see them again or practice interactions multiple times.

Animations should enhance the user experience without being distracting. In this medication management example, the animations serve clear purposes: they provide feedback, guide attention to important elements, make interactions more intuitive, and create a more engaging user experience. These principles can be applied to any React Native application to create interfaces that are not only functional but also delightful to use.

</details></blockquote>

---

## Custom UI Components

Building reusable, styled components for consistent UI:

```tsx
import React, { useState } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, 
  TextInput, ScrollView, Switch, Platform,
  Image
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

// ========= Custom UI Components =========

// Custom button with multiple variants
interface CustomButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'danger';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  icon?: React.ReactNode;
  fullWidth?: boolean;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  icon,
  fullWidth = false,
}) => {
  // Size maps
  const sizeStyles = {
    small: {
      paddingVertical: 6,
      paddingHorizontal: 12,
      fontSize: 12,
    },
    medium: {
      paddingVertical: 10,
      paddingHorizontal: 16,
      fontSize: 14,
    },
    large: {
      paddingVertical: 14,
      paddingHorizontal: 20,
      fontSize: 16,
    },
  };
  
  // Variant styles
  const getVariantStyles = () => {
    switch (variant) {
      case 'primary':
        return {
          backgroundColor: '#3498db',
          textColor: 'white',
          borderColor: '#3498db',
        };
      case 'secondary':
        return {
          backgroundColor: '#2ecc71',
          textColor: 'white',
          borderColor: '#2ecc71',
        };
      case 'outline':
        return {
          backgroundColor: 'transparent',
          textColor: '#3498db',
          borderColor: '#3498db',
        };
      case 'danger':
        return {
          backgroundColor: '#e74c3c',
          textColor: 'white',
          borderColor: '#e74c3c',
        };
      default:
        return {
          backgroundColor: '#3498db',
          textColor: 'white',
          borderColor: '#3498db',
        };
    }
  };
  
  const variantStyles = getVariantStyles();
  
  return (
    <TouchableOpacity
      style={[
        styles.button,
        {
          backgroundColor: variantStyles.backgroundColor,
          borderColor: variantStyles.borderColor,
          paddingVertical: sizeStyles[size].paddingVertical,
          paddingHorizontal: sizeStyles[size].paddingHorizontal,
          opacity: disabled ? 0.6 : 1,
          width: fullWidth ? '100%' : 'auto',
        },
        variant === 'outline' && styles.buttonOutline,
      ]}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.7}
    >
      <View style={styles.buttonContent}>
        {icon && <View style={styles.buttonIcon}>{icon}</View>}
        <Text
          style={[
            styles.buttonText,
            {
              color: variantStyles.textColor,
              fontSize: sizeStyles[size].fontSize,
            },
          ]}
        >
          {title}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

// Custom card component
interface CardProps {
  title?: string;
  children: React.ReactNode;
  elevation?: number;
  onPress?: () => void;
}

const Card: React.FC<CardProps> = ({
  title,
  children,
  elevation = 2,
  onPress,
}) => {
  const cardStyles = [
    styles.card,
    Platform.select({
      ios: {
        shadowOpacity: 0.1 + elevation * 0.05,
        shadowRadius: elevation,
        shadowOffset: { width: 0, height: elevation / 2 },
      },
      android: {
        elevation,
      },
    }),
  ];
  
  const CardComponent = onPress ? TouchableOpacity : View;
  
  return (
    <CardComponent
      style={cardStyles}
      onPress={onPress}
      activeOpacity={onPress ? 0.9 : 1}
    >
      {title && <Text style={styles.cardTitle}>{title}</Text>}
      {children}
    </CardComponent>
  );
};

// Custom input component
interface CustomInputProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  keyboardType?: 'default' | 'numeric' | 'email-address';
  secureTextEntry?: boolean;
  error?: string;
  info?: string;
  disabled?: boolean;
}

const CustomInput: React.FC<CustomInputProps> = ({
  label,
  value,
  onChangeText,
  placeholder,
  keyboardType = 'default',
  secureTextEntry = false,
  error,
  info,
  disabled = false,
}) => {
  return (
    <View style={styles.inputContainer}>
      <Text style={styles.inputLabel}>{label}</Text>
      <TextInput
        style={[
          styles.input,
          error && styles.inputError,
          disabled && styles.inputDisabled,
        ]}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        keyboardType={keyboardType}
        secureTextEntry={secureTextEntry}
        editable={!disabled}
      />
      {error && <Text style={styles.errorText}>{error}</Text>}
      {info && <Text style={styles.infoText}>{info}</Text>}
    </View>
  );
};

// Custom medication item component
interface MedicationItemProps {
  name: string;
  dosage: string;
  schedule: string;
  color?: string;
  onTaken?: () => void;
  onInfo?: () => void;
  taken?: boolean;
}

const MedicationItem: React.FC<MedicationItemProps> = ({
  name,
  dosage,
  schedule,
  color = '#3498db',
  onTaken,
  onInfo,
  taken = false,
}) => {
  return (
    <Card elevation={2}>
      <View style={styles.medicationItem}>
        <View style={[styles.medicationColor, { backgroundColor: color }]} />
        <View style={styles.medicationContent}>
          <Text style={styles.medicationName}>{name}</Text>
          <Text style={styles.medicationDosage}>
            {dosage} • {schedule}
          </Text>
          
          <View style={styles.medicationActions}>
            <CustomButton
              title={taken ? "Taken" : "Take Now"}
              variant={taken ? "outline" : "primary"}
              size="small"
              onPress={onTaken}
              disabled={taken}
            />
            <CustomButton
              title="Info"
              variant="outline"
              size="small"
              onPress={onInfo}
            />
          </View>
        </View>
      </View>
    </Card>
  );
};

// Custom toggle component
interface ToggleProps {
  label: string;
  value: boolean;
  onValueChange: (value: boolean) => void;
  disabled?: boolean;
}

const Toggle: React.FC<ToggleProps> = ({
  label,
  value,
  onValueChange,
  disabled = false,
}) => {
  return (
    <View style={styles.toggleContainer}>
      <Text style={[styles.toggleLabel, disabled && { color: '#999' }]}>
        {label}
      </Text>
      <Switch
        value={value}
        onValueChange={onValueChange}
        disabled={disabled}
        trackColor={{ false: '#767577', true: '#bde0fe' }}
        thumbColor={value ? '#3498db' : '#f4f3f4'}
      />
    </View>
  );
};

// Header with gradient
interface HeaderProps {
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
}

const Header: React.FC<HeaderProps> = ({ title, subtitle, action }) => {
  return (
    <LinearGradient
      colors={['#3498db', '#2980b9']}
      style={styles.header}
    >
      <View style={styles.headerContent}>
        <View style={styles.headerTitles}>
          <Text style={styles.headerTitle}>{title}</Text>
          {subtitle && (
            <Text style={styles.headerSubtitle}>{subtitle}</Text>
          )}
        </View>
        {action && <View style={styles.headerAction}>{action}</View>}
      </View>
    </LinearGradient>
  );
};

// Badge component for status indications
interface BadgeProps {
  text: string;
  type?: 'default' | 'success' | 'warning' | 'error' | 'info';
  size?: 'small' | 'medium';
}

const Badge: React.FC<BadgeProps> = ({
  text,
  type = 'default',
  size = 'medium',
}) => {
  // Badge background colors by type
  const getBadgeColor = () => {
    switch (type) {
      case 'success': return '#e8f5e9';
      case 'warning': return '#fff8e1';
      case 'error': return '#ffebee';
      case 'info': return '#e3f2fd';
      default: return '#f5f5f5';
    }
  };

  // Badge text colors by type
  const getTextColor = () => {
    switch (type) {
      case 'success': return '#2e7d32';
      case 'warning': return '#f57f17';
      case 'error': return '#c62828';
      case 'info': return '#1565c0';
      default: return '#616161';
    }
  };

  // Size variations
  const getSize = () => {
    return size === 'small' ? {
      paddingVertical: 2,
      paddingHorizontal: 6,
      fontSize: 10,
    } : {
      paddingVertical: 4,
      paddingHorizontal: 8,
      fontSize: 12,
    };
  };

  const sizeStyle = getSize();
  
  return (
    <View style={[
      styles.badge,
      { backgroundColor: getBadgeColor() },
      { 
        paddingVertical: sizeStyle.paddingVertical, 
        paddingHorizontal: sizeStyle.paddingHorizontal 
      }
    ]}>
      <Text style={[
        styles.badgeText, 
        { color: getTextColor() },
        { fontSize: sizeStyle.fontSize }
      ]}>
        {text}
      </Text>
    </View>
  );
};

// Main component showcasing custom UI
function CustomComponentsExample() {
  const [selectedMedication, setSelectedMedication] = useState(0);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [reminderTime, setReminderTime] = useState('');
  const [showAdvanced, setShowAdvanced] = useState(false);
  
  const medications = [
    {
      id: 1,
      name: 'Amoxicillin',
      dosage: '500mg',
      schedule: 'Every 8 hours',
      color: '#e74c3c',
      taken: true,
    },
    {
      id: 2,
      name: 'Lisinopril',
      dosage: '10mg',
      schedule: 'Once daily',
      color: '#3498db',
      taken: false,
    },
    {
      id: 3,
      name: 'Metformin',
      dosage: '1000mg',
      schedule: 'Twice daily with meals',
      color: '#2ecc71',
      taken: false,
    },
  ];
  
  const handleMedicationTaken = (id) => {
    // In a real app, you would update state here
    console.log(`Medication ${id} marked as taken`);
  };
  
  return (
    <View style={styles.container}>
      <Header
        title="MediTrack"
        subtitle="Your medication companion"
        action={
          <CustomButton
            title="Profile"
            variant="outline"
            size="small"
            onPress={() => console.log('Profile')}
          />
        }
      />
      
      <ScrollView style={styles.content}>
        <Text style={styles.sectionTitle}>Custom Components</Text>
        
        <Card title="My Medications">
          {medications.map((med) => (
            <MedicationItem
              key={med.id}
              name={med.name}
              dosage={med.dosage}
              schedule={med.schedule}
              color={med.color}
              taken={med.taken}
              onTaken={() => handleMedicationTaken(med.id)}
              onInfo={() => setSelectedMedication(med.id)}
            />
          ))}
        </Card>
        
        <Card title="Medication Status">
          <View style={styles.statusRow}>
            <Badge text="Active" type="success" />
            <Badge text="Expiring Soon" type="warning" />
            <Badge text="Needs Refill" type="error" />
            <Badge text="New" type="info" />
            <Badge text="Other" type="default" size="small" />
          </View>
        </Card>
        
        <Card title="Reminder Settings">
          <Toggle
            label="Enable Notifications"
            value={notificationsEnabled}
            onValueChange={setNotificationsEnabled}
          />
          
          <CustomInput
            label="Reminder Time"
            value={reminderTime}
            onChangeText={setReminderTime}
            placeholder="e.g., 8:00 AM"
            disabled={!notificationsEnabled}
            info={notificationsEnabled ? "When should we remind you?" : "Enable notifications first"}
          />
          
          <Toggle
            label="Show Advanced Options"
            value={showAdvanced}
            onValueChange={setShowAdvanced}
          />
          
          {showAdvanced && (
            <View style={styles.advancedOptions}>
              <Text style={styles.advancedTitle}>Advanced Options</Text>
              
              <Toggle
                label="Sound Alerts"
                value={true}
                onValueChange={() => {}}
              />
              
              <Toggle
                label="Vibration"
                value={true}
                onValueChange={() => {}}
              />
              
              <Toggle
                label="Reminder Persistence"
                value={false}
                onValueChange={() => {}}
              />
            </View>
          )}
        </Card>
        
        <Card title="Button Examples">
          <View style={styles.buttonGrid}>
            <CustomButton
              title="Primary"
              variant="primary"
              onPress={() => console.log('Primary')}
            />
            <CustomButton
              title="Secondary"
              variant="secondary"
              onPress={() => console.log('Secondary')}
            />
            <CustomButton
              title="Outline"
              variant="outline"
              onPress={() => console.log('Outline')}
            />
            <CustomButton
              title="Danger"
              variant="danger"
              onPress={() => console.log('Danger')}
            />
          </View>
          
          <View style={styles.buttonGrid}>
            <CustomButton
              title="Small"
              size="small"
              onPress={() => {}}
            />
            <CustomButton
              title="Medium"
              size="medium"
              onPress={() => {}}
            />
            <CustomButton
              title="Large"
              size="large"
              onPress={() => {}}
            />
            <CustomButton
              title="Disabled"
              disabled
              onPress={() => {}}
            />
          </View>
          
          <CustomButton
            title="Full Width Button"
            fullWidth
            onPress={() => console.log('Full width')}
          />
        </Card>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    paddingTop: Platform.OS === 'ios' ? 44 : 16,
    paddingBottom: 16,
    paddingHorizontal: 16,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTitles: {
    flex: 1,
  },
  headerTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  headerSubtitle: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 14,
  },
  headerAction: {
    marginLeft: 16,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
    color: '#333',
  },
  button: {
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    marginBottom: 8,
  },
  buttonOutline: {
    backgroundColor: 'transparent',
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonIcon: {
    marginRight: 8,
  },
  buttonText: {
    fontWeight: '600',
  },
  buttonGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    marginBottom: 16,
  },
  inputContainer: {
    marginBottom: 16,
  },
  inputLabel: {
    marginBottom: 8,
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 14,
  },
  inputError: {
    borderColor: '#e74c3c',
  },
  inputDisabled: {
    backgroundColor: '#f9f9f9',
    borderColor: '#eee',
    color: '#999',
  },
  errorText: {
    color: '#e74c3c',
    fontSize: 12,
    marginTop: 4,
  },
  infoText: {
    color: '#777',
    fontSize: 12,
    marginTop: 4,
  },
  medicationItem: {
    flexDirection: 'row',
    marginBottom: 16,
    borderRadius: 8,
    overflow: 'hidden',
  },
  medicationColor: {
    width: 8,
    backgroundColor: '#3498db',
  },
  medicationContent: {
    flex: 1,
    paddingLeft: 12,
  },
  medicationName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  medicationDosage: {
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
  },
  medicationActions: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  toggleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  toggleLabel: {
    fontSize: 16,
    color: '#333',
  },
  advancedOptions: {
    backgroundColor: '#f9f9f9',
    padding: 16,
    borderRadius: 8,
    marginTop: 8,
  },
  advancedTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  badge: {
    borderRadius: 16,
    marginRight: 8,
  },
  badgeText: {
    fontWeight: '500',
  },
  statusRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 12,
  },
});

export default CustomComponentsExample;
```

<blockquote><details>

Creating reusable UI components is a cornerstone of modern React Native development, enabling consistent design, improved maintainability, and increased development speed. This example demonstrates the implementation of a comprehensive component library tailored for a medication tracking application, showcasing best practices for component design and organization.

The custom component system in this example follows several key design principles:

**1. Composition and Reusability**

The components are designed with composability in mind, allowing them to be combined in various ways to create complex interfaces. For example, the `MedicationItem` component internally uses the `Card` and `CustomButton` components, demonstrating how well-designed components can be nested to create more specialized UI elements without duplicating code.

**2. Consistent Props API**

Each component follows a consistent pattern for props:
- Common properties like `disabled` are implemented consistently across components
- Size variants (`small`, `medium`, `large`) use the same naming convention
- Event handlers follow the React naming convention (`onPress`, `onValueChange`)

This consistency creates a predictable interface for developers, making the components intuitive to use and reducing the learning curve.

**3. TypeScript Integration**

The components leverage TypeScript through detailed interfaces (e.g., `CustomButtonProps`, `CardProps`) that define the expected props and their types. This provides several benefits:
- Type checking at development time
- Improved IDE autocomplete and documentation
- Clear documentation of the component API
- Enforcement of required props

**4. Variant Support**

The `CustomButton` component demonstrates how to implement variants (primary, secondary, outline, danger) and sizes (small, medium, large) through configurable props. This approach enables a single component to satisfy multiple design requirements, reducing the need for specialized one-off components while maintaining design consistency.

**5. Platform Adaptation**

The components account for platform differences where needed. For example, the `Card` component uses `Platform.select()` to implement appropriate shadow properties for iOS and elevation for Android, while the `Header` component adjusts its top padding based on the platform to account for iOS status bar height.

**6. Visual Feedback**

Interactive components include visual feedback mechanisms:
- The `CustomButton` uses `activeOpacity` to provide tap feedback
- The `Toggle` component visualizes its state through color and position
- Error and disabled states are visually distinct in the `CustomInput` component

**7. Accessibility Considerations**

The components are designed with accessibility in mind:
- Touchable areas are appropriately sized for easy interaction
- Text has sufficient contrast against backgrounds
- Disabled states are visually distinguishable
- Interactive elements provide feedback

**Component Highlights:**

The **`CustomButton`** component demonstrates advanced styling techniques:
- Computed styles based on props (variant, size, disabled state)
- Style composition using arrays to combine base styles with variant-specific ones
- Support for icons and text in a flexible layout

The **`Card`** component shows how to create a versatile container:
- Configurable elevation for visual hierarchy
- Support for both interactive (touchable) and static usage
- Consistent styling with optional title

The **`CustomInput`** component handles various input scenarios:
- Label and input field grouping
- Error and info message display
- Disabled state styling
- Various keyboard types for different input needs

The **`Header`** component uses Expo's `LinearGradient` to create a visually appealing gradient background, demonstrating integration with external UI libraries.

The **`Badge`** component provides a lightweight way to display status indicators:
- Multiple semantic variants (success, warning, error, info)
- Size variations for different contexts
- Consistent styling with appropriate colors for each status type

The **`MedicationItem`** component demonstrates composition by combining other components:
- Uses the Card component as a container
- Incorporates CustomButton components for actions
- Features a colored strip for visual categorization
- Maintains consistent spacing and typography

The **`Toggle`** component wraps the native Switch component:
- Adds a label with consistent styling
- Handles the disabled state for both the switch and label
- Uses custom colors that match the application theme

**Benefits of Component-Based Architecture:**

1. **Design Consistency**: By centralizing styling decisions in reusable components, the application maintains visual consistency across screens.

2. **Development Efficiency**: Developers can quickly assemble interfaces from pre-built components rather than implementing common UI patterns repeatedly.

3. **Maintenance Advantages**: When design changes are needed, they can be implemented in a single component rather than across multiple screens.

4. **Testing Simplification**: Components can be tested in isolation, making it easier to ensure they work correctly in all scenarios.

5. **Documentation**: Well-defined props interfaces serve as documentation for how to use each component.

**Real-World Application:**

In the medication management context, this component library addresses specific user needs:

- Clear presentation of medication information through the MedicationItem component
- Quick actions to mark medications as taken
- Visual status indicators through badges
- Configurable notification preferences
- Adaptive UI elements that work across device sizes

The `CustomComponentsExample` demonstrates how these components work together to create a cohesive interface. It shows real-world implementation patterns like:

- Conditional rendering based on state (advanced options)
- Handling user interactions (medication taken, toggles)
- Organization of related UI elements into logical sections
- Responsive layouts using flexbox

This approach to building a custom component library is scalable and can evolve with the application's needs. As new design requirements emerge, the component system can be extended with new components or enhanced with additional variants and props.

</details></blockquote>

---

## Theme Systems in React Native

Implementing a consistent theme across your application:

```tsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useColorScheme } from 'react-native';

// Define our theme structure
export interface ThemeColors {
  primary: string;
  secondary: string;
  background: string;
  card: string;
  text: string;
  border: string;
  notification: string;
  success: string;
  warning: string;
  error: string;
  disabled: string;
}

interface ThemeSpacing {
  xs: number;
  s: number;
  m: number;
  l: number;
  xl: number;
  xxl: number;
}

interface ThemeTypography {
  fontFamily: {
    regular: string;
    medium: string;
    bold: string;
  };
  fontSize: {
    xs: number;
    s: number;
    m: number;
    l: number;
    xl: number;
    xxl: number;
  };
}

interface ThemeBorderRadius {
  xs: number;
  s: number;
  m: number;
  l: number;
  round: number;
}

interface ThemeShadows {
  light: object;
  medium: object;
  heavy: object;
}

export interface Theme {
  dark: boolean;
  colors: ThemeColors;
  spacing: ThemeSpacing;
  typography: ThemeTypography;
  borderRadius: ThemeBorderRadius;
  shadows: ThemeShadows;
}

// Create light and dark themes
const lightTheme: Theme = {
  dark: false,
  colors: {
    primary: '#3498db',
    secondary: '#2ecc71',
    background: '#f5f5f5',
    card: '#ffffff',
    text: '#333333',
    border: '#dddddd',
    notification: '#f39c12',
    success: '#27ae60',
    warning: '#f39c12',
    error: '#e74c3c',
    disabled: '#bdc3c7',
  },
  spacing: {
    xs: 4,
    s: 8,
    m: 16,
    l: 24,
    xl: 32,
    xxl: 48,
  },
  typography: {
    fontFamily: {
      regular: 'System',
      medium: 'System',
      bold: 'System',
    },
    fontSize: {
      xs: 12,
      s: 14,
      m: 16,
      l: 18,
      xl: 20,
      xxl: 24,
    },
  },
  borderRadius: {
    xs: 4,
    s: 8,
    m: 12,
    l: 16, 
    round: 9999,
  },
  shadows: {
    light: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.18,
      shadowRadius: 1.0,
      elevation: 1,
    },
    medium: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 3,
    },
    heavy: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.32,
      shadowRadius: 5.46,
      elevation: 6,
    },
  },
};

const darkTheme: Theme = {
  dark: true,
  colors: {
    primary: '#3498db',
    secondary: '#2ecc71',
    background: '#121212',
    card: '#1e1e1e',
    text: '#f5f5f5',
    border: '#333333',
    notification: '#f39c12',
    success: '#27ae60',
    warning: '#f39c12',
    error: '#e74c3c',
    disabled: '#636e72',
  },
  spacing: { ...lightTheme.spacing },
  typography: { ...lightTheme.typography },
  borderRadius: { ...lightTheme.borderRadius },
  shadows: { 
    light: {
      ...lightTheme.shadows.light,
      shadowColor: '#222',
    },
    medium: {
      ...lightTheme.shadows.medium,
      shadowColor: '#222',
    },
    heavy: {
      ...lightTheme.shadows.heavy,
      shadowColor: '#222',
    },
  },
};

// Create a custom pharmacy theme
const pharmacyTheme: Theme = {
  dark: false,
  colors: {
    primary: '#5e35b1', // Deep purple
    secondary: '#00acc1', // Cyan
    background: '#f5f7fa',
    card: '#ffffff',
    text: '#37474f',
    border: '#eceff1',
    notification: '#ff9800',
    success: '#4caf50',
    warning: '#ff9800',
    error: '#f44336',
    disabled: '#cfd8dc',
  },
  spacing: { ...lightTheme.spacing },
  typography: {
    ...lightTheme.typography,
    fontFamily: {
      regular: 'Roboto',
      medium: 'Roboto-Medium',
      bold: 'Roboto-Bold',
    },
  },
  borderRadius: { ...lightTheme.borderRadius },
  shadows: { ...lightTheme.shadows },
};

// Create context
type ThemeContextType = {
  theme: Theme;
  setTheme: (theme: 'light' | 'dark' | 'pharmacy') => void;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Create provider
export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const colorScheme = useColorScheme();
  const [theme, setThemeState] = useState<Theme>(
    colorScheme === 'dark' ? darkTheme : lightTheme
  );

  // Update theme when system theme changes
  useEffect(() => {
    if (colorScheme === 'dark') {
      setThemeState(darkTheme);
    } else {
      setThemeState(lightTheme);
    }
  }, [colorScheme]);

  // Set theme explicitly
  const setTheme = (themeName: 'light' | 'dark' | 'pharmacy') => {
    switch (themeName) {
      case 'light':
        setThemeState(lightTheme);
        break;
      case 'dark':
        setThemeState(darkTheme);
        break;
      case 'pharmacy':
        setThemeState(pharmacyTheme);
        break;
    }
  };

  // Toggle between light and dark themes
  const toggleTheme = () => {
    setThemeState(theme.dark ? lightTheme : darkTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Custom hook to use the theme
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

// Example usage:
// 
// // Wrap your app with the provider
// const App = () => {
//   return (
//     <ThemeProvider>
//       <AppContent />
//     </ThemeProvider>
//   );
// };
// 
// // Use the theme in components
// const AppContent = () => {
//   const { theme, toggleTheme } = useTheme();
//
//   return (
//     <View style={{ 
//       flex: 1, 
//       backgroundColor: theme.colors.background,
//       padding: theme.spacing.m 
//     }}>
//       <Text style={{ 
//         color: theme.colors.text,
//         fontSize: theme.typography.fontSize.l,
//         fontFamily: theme.typography.fontFamily.bold 
//       }}>
//         Themed Component
//       </Text>
//       <TouchableOpacity 
//         style={{ 
//           backgroundColor: theme.colors.primary,
//           padding: theme.spacing.m,
//           borderRadius: theme.borderRadius.m,
//           ...theme.shadows.medium
//         }}
//         onPress={toggleTheme}
//       >
//         <Text style={{ color: 'white' }}>
//           Toggle Theme
//         </Text>
//       </TouchableOpacity>
//     </View>
//   );
// };
```

<blockquote><details>

Implementing a cohesive theme system is essential for creating polished, professional React Native applications with consistent visual language and behavior. A well-structured theme system centralizes design decisions, simplifies dark mode support, and makes applications more maintainable. This example demonstrates a comprehensive approach to theming in React Native using React's Context API.

### Theme System Architecture

The example implements a complete theme system with several key components:

**1. Theme Definition**

The theme structure is defined through TypeScript interfaces that clearly specify the available design tokens:

- `ThemeColors`: Defines the color palette including primary, secondary, background, and semantic colors like success and error
- `ThemeSpacing`: Establishes a consistent spacing scale for margins, padding, and layout
- `ThemeTypography`: Specifies font families and a typographic scale for consistent text styling
- `ThemeBorderRadius`: Provides standardized border radius values for UI elements
- `ThemeShadows`: Defines shadow presets for creating depth in the interface

This structured approach to design tokens ensures consistency throughout the application and makes it easy to update values in a single location.

**2. Theme Variants**

The system supports multiple theme variants:

- `lightTheme`: A standard light mode theme with a bright background and dark text
- `darkTheme`: A dark mode theme with dark backgrounds and light text
- `pharmacyTheme`: A domain-specific theme with colors and styling suited to pharmacy applications

The dark theme reuses many values from the light theme (spacing, typography, etc.) while changing colors and adjusting shadows to work well on dark backgrounds. This demonstrates how to efficiently create theme variants without duplicating shared values.

**3. Context and Provider**

The theme is made available throughout the application using React's Context API:

- `ThemeContext`: Creates a context to store the current theme and theme-changing functions
- `ThemeProvider`: Wraps the application and provides theme values to all child components
- System theme detection with `useColorScheme()` automatically applies the appropriate theme based on device settings

**4. Theme Access and Manipulation**

The system provides intuitive ways to access and change the theme:

- `useTheme()`: A custom hook that provides easy access to the current theme and theme functions
- `setTheme()`: Allows explicitly setting a specific theme variant
- `toggleTheme()`: Provides a convenient way to switch between light and dark themes

### Best Practices Demonstrated

This implementation showcases several theming best practices:

**1. Semantic Naming**

The theme uses semantic names for colors (like 'primary' and 'error') rather than visual names (like 'blue' or 'red'). This makes it easier to maintain consistent meaning when changing the color palette.

**2. Systematic Scaling**

The spacing, typography, and border radius values follow a systematic scale rather than arbitrary values. This creates visual rhythm and consistency throughout the interface.

**3. Platform Adaptation**

The shadow implementation acknowledges platform differences, using a combination of shadow properties for iOS and elevation for Android.

**4. Type Safety**

TypeScript interfaces provide strong typing for the theme, helping catch errors during development and providing excellent IDE support.

**5. System Integration**

The theme respects system preferences by default through `useColorScheme()`, following platform conventions while still allowing user override.

**6. Composition and Inheritance**

Theme variants inherit and compose properties from other themes, reducing duplication and ensuring consistency across variants.

### Practical Applications in a Pharmacy App

In a medication tracking application, a theme system like this enables:

1. **Branding Consistency**: The pharmacy theme applies consistent brand colors across all screens and components

2. **Accessibility Support**: The dark theme provides a comfortable viewing option for low-light environments or users with visual sensitivities

3. **Visual Hierarchy**: Semantic colors clearly indicate the purpose of interface elements (success for completed actions, warning for alerts, etc.)

4. **Maintenance Efficiency**: Design changes can be implemented by updating the theme values rather than modifying individual components

5. **Responsive Design**: Using theme-based spacing values rather than hard-coded dimensions supports better responsive layouts

### Implementation Approach

To use this theme system in an application:

1. Wrap the root component with `ThemeProvider` to make the theme available throughout the app
2. Use the `useTheme()` hook in components to access the current theme values
3. Apply theme values to component styles instead of hard-coded values
4. Provide theme-switching controls for users who prefer a specific theme

The commented example at the bottom of the code shows how components would consume this theme system, applying theme-based styling for colors, typography, spacing, borders, and shadows.

By implementing a comprehensive theme system like this, React Native applications can achieve professional polish, maintain consistency across features, and adapt to different user preferences and platform conventions.

</details></blockquote>

---

## Exercise: Creating a Responsive Pharmacy Card Component

Create a responsive pharmacy card component with styling that adapts to different screen sizes. Use both StyleSheet and styled-components approaches.

1. Card should display medication details.
2. Card should have different layouts for portrait and landscape orientations.
3. Use shadows and proper typography.
4. Implement touch feedback for interactive elements.
5. Add stylish visual elements like color-coded categories or status indicators.

This exercise will help you practice the styling concepts covered in this module.

---

## Challenge: Medication Tracker App UI

Build a complete medication tracker app UI with the following components:

1. A responsive dashboard showing medication schedules for the day
2. A detail view for medication information
3. A form for adding new medications with proper styling
4. Dark mode support
5. Platform-specific adaptations for iOS and Android

Apply all the styling techniques covered in this module to create a cohesive, well-designed UI.

Bonus: Add animations to enhance the user experience.
