# Exercise: Build a Pharmacy Medication Card Component

## Objective
Create a reusable medication card component with advanced UI features that follows best practices in React Native.

## Duration
45-60 minutes

## Exercise Description

In this exercise, you'll build a comprehensive medication card component that uses various advanced UI patterns and components. This component will display detailed information about a medication and provide interactive elements for user actions.

### Requirements

Your medication card component should include:

1. **Visual Elements**:
   - Medication image or icon
   - Medication name and dosage information
   - Status indicator (active, inactive, etc.)
   - Expandable details section

2. **Interactive Elements**:
   - Expandable/collapsible details with animation
   - At least one interactive button (e.g., "Refill Now")
   - A custom checkbox or switch component
   - Status badge with appropriate styling

3. **Performance Considerations**:
   - Use appropriate React hooks for state management
   - Implement memoization where appropriate

### Setup

Create a new React Native project or use a sandbox environment like Expo Snack (https://snack.expo.dev/).

```jsx
// Import necessary components
import React, { useState, useCallback, useMemo } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Platform,
} from 'react-native';

// Component structure
const MedicationCard = ({
  medication,
  onRefill,
  onToggleReminder,
}) => {
  // Your implementation here
};

// Example data
const medicationData = {
  id: '123',
  name: 'Lisinopril',
  dosage: '10mg',
  schedule: 'Once daily',
  image: 'https://via.placeholder.com/60',
  status: 'active', // 'active', 'inactive', 'refill-needed'
  description: 'Used to treat high blood pressure and heart failure.',
  sideEffects: ['Dizziness', 'Headache', 'Dry cough'],
  isReminderEnabled: false,
  refillsRemaining: 3,
  lastFilled: '2023-05-15',
  pharmacy: 'Main Street Pharmacy',
};
```

### Implementation Steps

#### Step 1: Create the Base Card Layout

Start by implementing the basic structure of the card:

```jsx
const MedicationCard = ({ medication, onRefill, onToggleReminder }) => {
  // State for expanded view
  const [expanded, setExpanded] = useState(false);
  
  return (
    <View style={styles.card}>
      {/* Card Header */}
      <View style={styles.cardHeader}>
        {/* Implement header with image, name, and status */}
      </View>
      
      {/* Basic Information */}
      <View style={styles.basicInfo}>
        {/* Display dosage and schedule information */}
      </View>
      
      {/* Expandable Details */}
      {/* Implement expandable section */}
      
      {/* Action Buttons */}
      <View style={styles.actions}>
        {/* Implement action buttons */}
      </View>
    </View>
  );
};
```

#### Step 2: Implement the Status Badge

Create a reusable status badge component:

```jsx
const StatusBadge = ({ status }) => {
  // Determine colors and text based on status
  const getStatusConfig = () => {
    switch (status) {
      case 'active':
        return { color: '#4CAF50', text: 'Active' };
      case 'inactive':
        return { color: '#9E9E9E', text: 'Inactive' };
      case 'refill-needed':
        return { color: '#FF9800', text: 'Refill Needed' };
      default:
        return { color: '#2196F3', text: 'Unknown' };
    }
  };
  
  const { color, text } = getStatusConfig();
  
  return (
    <View style={[styles.statusBadge, { backgroundColor: color + '20' }]}>
      <View style={[styles.statusDot, { backgroundColor: color }]} />
      <Text style={[styles.statusText, { color }]}>{text}</Text>
    </View>
  );
};
```

#### Step 3: Create the Custom Reminder Toggle

Implement a custom toggle switch for reminders:

```jsx
const ReminderToggle = ({ value, onToggle, disabled }) => {
  // Animation for the toggle thumb
  const thumbAnim = React.useRef(new Animated.Value(value ? 1 : 0)).current;
  
  React.useEffect(() => {
    Animated.timing(thumbAnim, {
      toValue: value ? 1 : 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, [value, thumbAnim]);
  
  // Interpolate values for position and colors
  const thumbPosition = thumbAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [4, 22],
  });
  
  const trackColor = thumbAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['#e0e0e0', '#4CAF50'],
  });
  
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onToggle}
      disabled={disabled}
      style={styles.reminderContainer}
    >
      <Text style={styles.reminderText}>Reminders</Text>
      <View style={[styles.track, { backgroundColor: trackColor }]}>
        <Animated.View
          style={[
            styles.thumb,
            { transform: [{ translateX: thumbPosition }] },
          ]}
        />
      </View>
    </TouchableOpacity>
  );
};
```

#### Step 4: Implement the Expandable Details Section

Create an expandable section with animation:

```jsx
// Within your MedicationCard component
const animHeight = React.useRef(new Animated.Value(0)).current;

const toggleExpand = () => {
  const toValue = expanded ? 0 : 1;
  
  Animated.timing(animHeight, {
    toValue,
    duration: 300,
    useNativeDriver: false,
  }).start();
  
  setExpanded(!expanded);
};

// The max height for the expanded section (you can adjust based on content)
const maxHeight = 200;

const animatedHeight = animHeight.interpolate({
  inputRange: [0, 1],
  outputRange: [0, maxHeight],
});

// Then in your render:
<TouchableOpacity onPress={toggleExpand} style={styles.expandButton}>
  <Text style={styles.expandText}>
    {expanded ? "Hide Details" : "Show Details"}
  </Text>
</TouchableOpacity>

<Animated.View style={[styles.details, { height: animatedHeight, overflow: 'hidden' }]}>
  <Text style={styles.detailTitle}>Description</Text>
  <Text style={styles.detailText}>{medication.description}</Text>
  
  <Text style={styles.detailTitle}>Side Effects</Text>
  <View style={styles.sideEffects}>
    {medication.sideEffects.map((effect, index) => (
      <Text key={index} style={styles.sideEffect}>• {effect}</Text>
    ))}
  </View>
  
  <Text style={styles.detailTitle}>Pharmacy</Text>
  <Text style={styles.detailText}>{medication.pharmacy}</Text>
  
  <Text style={styles.detailTitle}>Last Filled</Text>
  <Text style={styles.detailText}>{medication.lastFilled}</Text>
</Animated.View>
```

#### Step 5: Add Refill Button with Memoization

Implement a memoized refill button:

```jsx
// Within your MedicationCard component
const handleRefill = useCallback(() => {
  if (onRefill) {
    onRefill(medication.id);
  }
}, [medication.id, onRefill]);

// Create a memoized button component
const RefillButton = useMemo(() => {
  return (
    <TouchableOpacity 
      style={styles.refillButton}
      onPress={handleRefill}
    >
      <Text style={styles.refillButtonText}>Refill Now</Text>
    </TouchableOpacity>
  );
}, [handleRefill]);

// Then use RefillButton in your render
```

#### Step 6: Put It All Together

Assemble the complete component:

```jsx
const MedicationCard = ({ medication, onRefill, onToggleReminder }) => {
  const [expanded, setExpanded] = useState(false);
  const [reminderEnabled, setReminderEnabled] = useState(medication.isReminderEnabled);
  
  const animHeight = React.useRef(new Animated.Value(0)).current;
  
  const toggleExpand = () => {
    const toValue = expanded ? 0 : 1;
    
    Animated.timing(animHeight, {
      toValue,
      duration: 300,
      useNativeDriver: false,
    }).start();
    
    setExpanded(!expanded);
  };
  
  const maxHeight = 200;
  
  const animatedHeight = animHeight.interpolate({
    inputRange: [0, 1],
    outputRange: [0, maxHeight],
  });
  
  const handleReminderToggle = useCallback(() => {
    setReminderEnabled(prev => !prev);
    if (onToggleReminder) {
      onToggleReminder(medication.id, !reminderEnabled);
    }
  }, [medication.id, reminderEnabled, onToggleReminder]);
  
  const handleRefill = useCallback(() => {
    if (onRefill) {
      onRefill(medication.id);
    }
  }, [medication.id, onRefill]);
  
  const RefillButton = useMemo(() => {
    return (
      <TouchableOpacity 
        style={styles.refillButton}
        onPress={handleRefill}
      >
        <Text style={styles.refillButtonText}>Refill Now</Text>
      </TouchableOpacity>
    );
  }, [handleRefill]);
  
  return (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Image source={{ uri: medication.image }} style={styles.image} />
        <View style={styles.headerInfo}>
          <Text style={styles.medicationName}>{medication.name}</Text>
          <Text style={styles.dosage}>{medication.dosage}</Text>
        </View>
        <StatusBadge status={medication.status} />
      </View>
      
      <View style={styles.basicInfo}>
        <Text style={styles.schedule}>
          Take {medication.schedule.toLowerCase()}
        </Text>
        <Text style={styles.refills}>
          Refills remaining: {medication.refillsRemaining}
        </Text>
      </View>
      
      <TouchableOpacity onPress={toggleExpand} style={styles.expandButton}>
        <Text style={styles.expandText}>
          {expanded ? "Hide Details" : "Show Details"}
        </Text>
      </TouchableOpacity>
      
      <Animated.View style={[styles.details, { height: animatedHeight, overflow: 'hidden' }]}>
        <Text style={styles.detailTitle}>Description</Text>
        <Text style={styles.detailText}>{medication.description}</Text>
        
        <Text style={styles.detailTitle}>Side Effects</Text>
        <View style={styles.sideEffects}>
          {medication.sideEffects.map((effect, index) => (
            <Text key={index} style={styles.sideEffect}>• {effect}</Text>
          ))}
        </View>
        
        <Text style={styles.detailTitle}>Pharmacy</Text>
        <Text style={styles.detailText}>{medication.pharmacy}</Text>
        
        <Text style={styles.detailTitle}>Last Filled</Text>
        <Text style={styles.detailText}>{medication.lastFilled}</Text>
      </Animated.View>
      
      <View style={styles.actions}>
        <ReminderToggle 
          value={reminderEnabled}
          onToggle={handleReminderToggle}
        />
        {RefillButton}
      </View>
    </View>
  );
};
```

#### Step 7: Add Styles

Style your component:

```jsx
const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    margin: 8,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 12,
  },
  headerInfo: {
    flex: 1,
  },
  medicationName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  dosage: {
    fontSize: 14,
    color: '#757575',
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 12,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 4,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '500',
  },
  basicInfo: {
    marginBottom: 12,
  },
  schedule: {
    fontSize: 16,
    marginBottom: 4,
  },
  refills: {
    fontSize: 14,
    color: '#757575',
  },
  expandButton: {
    paddingVertical: 8,
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    marginTop: 8,
  },
  expandText: {
    color: '#2196F3',
    fontWeight: '500',
  },
  details: {
    marginTop: 8,
  },
  detailTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 8,
    marginBottom: 4,
  },
  detailText: {
    fontSize: 14,
    color: '#333',
    lineHeight: 20,
  },
  sideEffects: {
    marginTop: 4,
  },
  sideEffect: {
    fontSize: 14,
    color: '#333',
    marginBottom: 2,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 16,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  reminderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  reminderText: {
    fontSize: 14,
    marginRight: 8,
  },
  track: {
    width: 50,
    height: 24,
    borderRadius: 12,
    padding: 2,
  },
  thumb: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: 'white',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  refillButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 4,
  },
  refillButtonText: {
    color: 'white',
    fontWeight: '500',
  },
});
```

### Testing Your Component

Create a simple App component to test your medication card:

```jsx
const App = () => {
  const handleRefill = (id) => {
    console.log(`Refill medication with id: ${id}`);
  };
  
  const handleToggleReminder = (id, value) => {
    console.log(`Toggle reminder for medication ${id}: ${value ? 'ON' : 'OFF'}`);
  };
  
  return (
    <View style={appStyles.container}>
      <Text style={appStyles.header}>My Medications</Text>
      <MedicationCard
        medication={medicationData}
        onRefill={handleRefill}
        onToggleReminder={handleToggleReminder}
      />
    </View>
  );
};

const appStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
    paddingTop: 50, // For status bar on mobile
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
});
```

## Bonus Challenges

If you finish early or want to enhance your component:

1. **Theme Support**: Modify your component to accept a theme prop and style the component accordingly

2. **Multiple Card States**: Implement different visual states based on medication status (e.g., expired, low supply)

3. **Animation Enhancements**: Add entrance animations when the card first renders

4. **Progress Indicator**: Add a circular progress indicator showing how many pills remain

5. **Platform-specific Features**: Add platform-specific styling or features (e.g., different shadow implementations)

## Submission

Take screenshots of your completed component in both the collapsed and expanded states. If you implemented any bonus features, include those in your submission as well.

## Helpful Resources

- [Animated API Documentation](https://reactnative.dev/docs/animated)
- [TouchableOpacity Documentation](https://reactnative.dev/docs/touchableopacity)
- [Platform-Specific Code](https://reactnative.dev/docs/platform-specific-code)
- [React hooks: useCallback and useMemo](https://reactjs.org/docs/hooks-reference.html) 