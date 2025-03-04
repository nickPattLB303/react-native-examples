# Exercise: Creating a Responsive Medication App Interface

## Objective
Learn to create adaptive UI layouts that work well across different device sizes and orientations.

## Duration
30 minutes for main challenge, additional time for bonus tasks

## Exercise Description

In this exercise, you'll build a responsive medication tracking interface that adapts to different device sizes and orientations. You'll apply responsive design patterns to create a UI that provides a great user experience regardless of the device.

### MAIN CHALLENGE (30 minutes)

For the main challenge, focus on implementing these key responsive patterns:

1. Dimension-aware layouts with the `Dimensions` API
2. Responsive grid layout for medication items

### Setup

Create a new React Native project using Expo or React Native CLI:

```jsx
import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView,
  SafeAreaView,
  Dimensions,
  Platform,
} from 'react-native';

// Get initial dimensions
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

// Sample data
const medications = [
  { id: '1', name: 'Lisinopril', dosage: '10mg', time: '8:00 AM', type: 'heart' },
  { id: '2', name: 'Metformin', dosage: '500mg', time: '8:00 AM, 8:00 PM', type: 'diabetes' },
  { id: '3', name: 'Aspirin', dosage: '81mg', time: '8:00 AM', type: 'heart' },
  { id: '4', name: 'Atorvastatin', dosage: '20mg', time: '9:00 PM', type: 'cholesterol' },
  { id: '5', name: 'Albuterol', dosage: '90mcg', time: 'As needed', type: 'respiratory' },
  { id: '6', name: 'Levothyroxine', dosage: '88mcg', time: '7:00 AM', type: 'thyroid' },
];

const App = () => {
  // Your implementation will go here
  
  return (
    <SafeAreaView style={styles.container}>
      {/* Your UI will go here */}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  // You'll add more styles here
});

export default App;
```

### Implementation Tasks

#### Task 1: Create Dimension-Aware Layouts

First, create a component that can respond to dimension changes:

```jsx
const App = () => {
  // State to track dimensions
  const [dimensions, setDimensions] = useState({
    window: Dimensions.get('window'),
    screen: Dimensions.get('screen'),
  });

  // Set up an event listener for dimension changes
  useEffect(() => {
    const subscription = Dimensions.addEventListener('change', ({ window, screen }) => {
      setDimensions({ window, screen });
    });
    
    // Clean up the subscription
    return () => subscription.remove();
  }, []);

  // Extract the window dimensions
  const { width, height } = dimensions.window;
  
  // Determine if device is in landscape mode
  const isLandscape = width > height;
  
  // Determine if device is a tablet
  const isTablet = width >= 768;
  
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <Text style={styles.title}>My Medications</Text>
          <Text style={styles.subtitle}>
            {isLandscape ? 'Landscape Mode' : 'Portrait Mode'} - 
            {isTablet ? ' Tablet' : ' Phone'}
          </Text>
        </View>
        
        {/* We'll add the medication grid in the next task */}
      </ScrollView>
    </SafeAreaView>
  );
};

// Add these styles:
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    padding: 16,
    backgroundColor: 'white',
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
  },
});
```

#### Task 2: Create a Responsive Grid Layout

Now, create a responsive grid layout for medications that adapts to screen size:

```jsx
// Add this inside your App component after the header:
const renderMedicationGrid = () => {
  // Calculate number of columns based on screen width and orientation
  const numColumns = isTablet ? (isLandscape ? 4 : 3) : (isLandscape ? 3 : 2);
  
  // Calculate item width based on screen width and number of columns
  const itemWidth = (width - 32 - (numColumns - 1) * 8) / numColumns;
  
  return (
    <View style={styles.gridContainer}>
      {medications.map((med, index) => (
        <View 
          key={med.id}
          style={[
            styles.gridItem,
            { 
              width: itemWidth,
              marginRight: (index + 1) % numColumns === 0 ? 0 : 8
            }
          ]}
        >
          <View style={[styles.medIndicator, getMedicationType(med.type)]} />
          <Text style={styles.medName}>{med.name}</Text>
          <Text style={styles.medDosage}>{med.dosage}</Text>
          <Text style={styles.medTime}>{med.time}</Text>
        </View>
      ))}
    </View>
  );
};

// Function to determine medication type color
const getMedicationType = (type) => {
  switch (type) {
    case 'heart': return { backgroundColor: '#FF5252' };
    case 'diabetes': return { backgroundColor: '#FF9800' };
    case 'cholesterol': return { backgroundColor: '#2196F3' };
    case 'respiratory': return { backgroundColor: '#4CAF50' };
    case 'thyroid': return { backgroundColor: '#9C27B0' };
    default: return { backgroundColor: '#757575' };
  }
};

// Update the return statement to include the grid
return (
  <SafeAreaView style={styles.container}>
    <ScrollView>
      <View style={styles.header}>
        <Text style={styles.title}>My Medications</Text>
        <Text style={styles.subtitle}>
          {isLandscape ? 'Landscape Mode' : 'Portrait Mode'} - 
          {isTablet ? ' Tablet' : ' Phone'}
        </Text>
      </View>
      
      {renderMedicationGrid()}
    </ScrollView>
  </SafeAreaView>
);

// Add these styles:
const styles = StyleSheet.create({
  // ...existing styles
  
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 16,
    justifyContent: 'flex-start',
  },
  gridItem: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
    // Shadow styles
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  medIndicator: {
    height: 4,
    width: 36,
    borderRadius: 2,
    marginBottom: 8,
  },
  medName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  medDosage: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  medTime: {
    fontSize: 12,
    color: '#888',
  },
});
```

## BONUS CHALLENGES (if you finish early)

If you complete the main challenge and want to explore more responsive design patterns, try these bonus tasks:

### Bonus Task 1: Add a Responsive Daily Schedule View

Create a schedule view that changes layout based on the screen size and orientation:

```jsx
// Add this component to your file:
const DailySchedule = ({ isTablet, isLandscape }) => {
  const timeSlots = ['Morning', 'Afternoon', 'Evening', 'Bedtime'];
  
  // For tablet landscape, use a horizontal layout
  if (isTablet && isLandscape) {
    return (
      <View style={scheduleStyles.horizontalContainer}>
        {timeSlots.map((slot) => (
          <View key={slot} style={scheduleStyles.horizontalSlot}>
            <Text style={scheduleStyles.slotTitle}>{slot}</Text>
            <View style={scheduleStyles.horizontalMeds}>
              {getMedicationsForTimeSlot(slot).map(med => (
                <View key={med.id} style={scheduleStyles.horizontalMedItem}>
                  <Text style={scheduleStyles.medName}>{med.name}</Text>
                  <Text style={scheduleStyles.medDosage}>{med.dosage}</Text>
                </View>
              ))}
            </View>
          </View>
        ))}
      </View>
    );
  }
  
  // For other layouts, use a vertical layout
  return (
    <View style={scheduleStyles.verticalContainer}>
      {timeSlots.map((slot) => {
        const medsForSlot = getMedicationsForTimeSlot(slot);
        if (medsForSlot.length === 0) return null;
        
        return (
          <View key={slot} style={scheduleStyles.verticalSlot}>
            <Text style={scheduleStyles.slotTitle}>{slot}</Text>
            {medsForSlot.map(med => (
              <View key={med.id} style={scheduleStyles.verticalMedItem}>
                <Text style={scheduleStyles.medName}>{med.name}</Text>
                <Text style={scheduleStyles.medDosage}>{med.dosage}</Text>
              </View>
            ))}
          </View>
        );
      })}
    </View>
  );
};

// Helper function to filter medications by time slot
const getMedicationsForTimeSlot = (slot) => {
  return medications.filter(med => {
    const time = med.time.toLowerCase();
    switch (slot.toLowerCase()) {
      case 'morning': 
        return time.includes('am') || time.includes('morning');
      case 'afternoon': 
        return time.includes('noon') || time.includes('afternoon') || 
               (time.includes('pm') && !time.includes('8:00 pm') && !time.includes('9:00 pm'));
      case 'evening': 
        return time.includes('evening') || time.includes('8:00 pm');
      case 'bedtime': 
        return time.includes('bedtime') || time.includes('9:00 pm');
      default: 
        return false;
    }
  });
};

const scheduleStyles = StyleSheet.create({
  horizontalContainer: {
    flexDirection: 'row',
    padding: 16,
  },
  horizontalSlot: {
    flex: 1,
    marginHorizontal: 4,
  },
  horizontalMeds: {
    marginTop: 8,
  },
  horizontalMedItem: {
    backgroundColor: 'white',
    padding: 12,
    marginBottom: 8,
    borderRadius: 8,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  verticalContainer: {
    padding: 16,
  },
  verticalSlot: {
    marginBottom: 16,
  },
  verticalMedItem: {
    backgroundColor: 'white',
    padding: 12,
    marginTop: 8,
    borderRadius: 8,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  slotTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  medName: {
    fontSize: 16,
    fontWeight: '500',
  },
  medDosage: {
    fontSize: 14,
    color: '#666',
  },
});

// In your App component, add a state to toggle between views:
const [viewMode, setViewMode] = useState('grid');  // 'grid' or 'schedule'

// Add a function to toggle view:
const toggleView = () => {
  setViewMode(viewMode === 'grid' ? 'schedule' : 'grid');
};

// In your render function, add a button to toggle views and conditionally render the correct view:
return (
  <SafeAreaView style={styles.container}>
    <ScrollView>
      <View style={styles.header}>
        <Text style={styles.title}>My Medications</Text>
        <View style={styles.headerRow}>
          <Text style={styles.subtitle}>
            {isLandscape ? 'Landscape Mode' : 'Portrait Mode'} - 
            {isTablet ? ' Tablet' : ' Phone'}
          </Text>
          <TouchableOpacity onPress={toggleView} style={styles.toggleButton}>
            <Text style={styles.toggleText}>
              {viewMode === 'grid' ? 'Show Schedule' : 'Show Grid'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      
      {viewMode === 'grid' ? (
        renderMedicationGrid()
      ) : (
        <DailySchedule isTablet={isTablet} isLandscape={isLandscape} />
      )}
    </ScrollView>
  </SafeAreaView>
);
```

### Bonus Task 2: Implement a Responsive Navigation Pattern

Create a navigation pattern that adapts to device size:

```jsx
// For larger screens (tablets in landscape), show a side menu
// For smaller screens, show a bottom tab bar
const ResponsiveNavigation = ({ isTablet, isLandscape }) => {
  const navItems = [
    { id: 'home', label: 'Home', icon: '🏠' },
    { id: 'meds', label: 'Medications', icon: '💊' },
    { id: 'schedule', label: 'Schedule', icon: '🕒' },
    { id: 'profile', label: 'Profile', icon: '👤' },
  ];
  
  // Side menu for tablets in landscape
  if (isTablet && isLandscape) {
    return (
      <View style={navStyles.sideMenu}>
        {navItems.map(item => (
          <TouchableOpacity key={item.id} style={navStyles.sideMenuItem}>
            <Text style={navStyles.sideMenuIcon}>{item.icon}</Text>
            <Text style={navStyles.sideMenuLabel}>{item.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  }
  
  // Bottom tabs for other configurations
  return (
    <View style={navStyles.bottomTabs}>
      {navItems.map(item => (
        <TouchableOpacity key={item.id} style={navStyles.tabItem}>
          <Text style={navStyles.tabIcon}>{item.icon}</Text>
          <Text style={navStyles.tabLabel}>{item.label}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const navStyles = StyleSheet.create({
  sideMenu: {
    width: 200,
    backgroundColor: 'white',
    paddingVertical: 20,
    borderRightWidth: 1,
    borderRightColor: '#eee',
  },
  sideMenuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  sideMenuIcon: {
    fontSize: 20,
    marginRight: 12,
  },
  sideMenuLabel: {
    fontSize: 16,
    fontWeight: '500',
  },
  bottomTabs: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingVertical: 8,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 8,
  },
  tabIcon: {
    fontSize: 20,
    marginBottom: 4,
  },
  tabLabel: {
    fontSize: 12,
  },
});

// Update your app structure to use this navigation:
return (
  <SafeAreaView style={styles.container}>
    <View style={styles.appContainer}>
      {isTablet && isLandscape ? (
        <View style={styles.tabletLayout}>
          <ResponsiveNavigation isTablet={isTablet} isLandscape={isLandscape} />
          <View style={styles.mainContent}>
            {/* Your content here */}
          </View>
        </View>
      ) : (
        <View style={styles.phoneLayout}>
          <View style={styles.mainContent}>
            {/* Your content here */}
          </View>
          <ResponsiveNavigation isTablet={isTablet} isLandscape={isLandscape} />
        </View>
      )}
    </View>
  </SafeAreaView>
);
```

### Bonus Task 3: Implement Responsive Typography

Add responsive font scaling based on screen size:

```jsx
// Calculate scale factor based on screen width
const baseFontSize = 16;
const scaleFactor = Math.min(width / 380, 1.3); // Cap at 1.3x normal size

const responsiveStyles = StyleSheet.create({
  h1: {
    fontSize: baseFontSize * 1.5 * scaleFactor,
    fontWeight: 'bold',
  },
  h2: {
    fontSize: baseFontSize * 1.25 * scaleFactor,
    fontWeight: 'bold',
  },
  body: {
    fontSize: baseFontSize * scaleFactor,
  },
  caption: {
    fontSize: baseFontSize * 0.8 * scaleFactor,
  },
});
```

## Submission Guidelines

When you've completed the exercise, test your application on different device sizes (you can use the simulator/emulator) and in different orientations. Take screenshots in various configurations to demonstrate how your UI adapts.

## Helpful Resources

- [Dimensions API Documentation](https://reactnative.dev/docs/dimensions)
- [Platform-Specific Code](https://reactnative.dev/docs/platform-specific-code)
- [React Native Responsive UI Best Practices](https://reactnative.dev/docs/next/improvingux#optimize-for-devices-screens) 