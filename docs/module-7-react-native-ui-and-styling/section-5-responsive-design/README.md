# Section 5: Responsive Design

## Learning Objectives
After completing this section, you will be able to:
- Create layouts that adapt to different screen sizes and orientations
- Use the Dimensions API to build responsive components
- Implement device-specific styling and layouts
- Create a responsive design system that works across phones and tablets
- Apply best practices for handling screen rotation and resizing

**Prerequisite Knowledge**: Layout with Flexbox (Section 3)
**Estimated Time**: 1.5 hours

## Introduction to Responsive Design in React Native

Mobile applications need to work seamlessly across a wide variety of devices with different screen sizes, pixel densities, and orientations. In this section, we'll explore techniques for creating responsive UI layouts that adapt to these different conditions.

### Understanding Screen Dimensions

React Native provides the `Dimensions` API to get information about the device's screen:

```jsx
import { Dimensions } from 'react-native';

// Get the window dimensions
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

// Use dimensions for responsive styling
const styles = StyleSheet.create({
  container: {
    width: windowWidth * 0.9, // 90% of screen width
    height: windowHeight * 0.5, // 50% of screen height
  },
});
```

#### Key Points About Dimensions API

1. **Window vs. Screen**: 
   - `window` refers to the visible application window (excluding status bar on iOS)
   - `screen` refers to the full screen including status bar

2. **Device Rotation**: 
   - Screen dimensions will change when the device rotates
   - You need to listen for dimension changes to adapt your layout

```jsx
import React, { useState, useEffect } from 'react';
import { View, Dimensions, StyleSheet } from 'react-native';

const ResponsiveComponent = () => {
  const [dimensions, setDimensions] = useState({
    window: Dimensions.get('window'),
  });

  useEffect(() => {
    const subscription = Dimensions.addEventListener('change', ({ window }) => {
      setDimensions({ window });
    });
    
    return () => subscription?.remove();
  }, []);

  const { window } = dimensions;
  const isLandscape = window.width > window.height;
  
  return (
    <View style={[
      styles.container,
      isLandscape ? styles.landscapeContainer : styles.portraitContainer
    ]}>
      {/* Content here */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  portraitContainer: {
    // Portrait-specific styles
    flexDirection: 'column',
  },
  landscapeContainer: {
    // Landscape-specific styles
    flexDirection: 'row',
  },
});
```

> 💡 **Deep Dive**: The `Dimensions` API provides values in density-independent pixels (DIPs), not actual hardware pixels. This means the values are already scaled properly for different screen densities (DPI). This helps you create layouts that look similar regardless of pixel density.

### Using Percentages

React Native supports percentage values for width and height:

```jsx
const styles = StyleSheet.create({
  column: {
    width: '50%', // Take up half the parent's width
    padding: 10,
  },
  fullWidth: {
    width: '100%', // Take full width of parent
  },
  halfHeight: {
    height: '50%', // Take half the parent's height
  },
});
```

### Responsive Typography

Typography should adapt to different screen sizes. Here's a simple approach to scaling font sizes:

```jsx
import { Dimensions, PixelRatio } from 'react-native';

const { width, height } = Dimensions.get('window');
const screenWidth = width < height ? width : height;

// Scale font size based on screen width
const normalize = (size) => {
  const scale = screenWidth / 375; // 375 is standard width for iPhone
  const newSize = size * scale;
  return Math.round(PixelRatio.roundToNearestPixel(newSize));
};

// Use in styles
const styles = StyleSheet.create({
  title: {
    fontSize: normalize(24),
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: normalize(18),
  },
  body: {
    fontSize: normalize(16),
  },
});
```

### Aspect Ratio

For images and certain UI elements, maintaining aspect ratio is important:

```jsx
const styles = StyleSheet.create({
  responsiveImage: {
    width: '100%',
    aspectRatio: 16 / 9, // 16:9 aspect ratio
  },
  square: {
    width: '50%',
    aspectRatio: 1, // 1:1 aspect ratio (square)
  },
});
```

### Device Size Categories

It's often helpful to categorize devices by size to apply different layouts:

```jsx
import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');
const screenWidth = width < height ? width : height; // Use the smaller dimension

// Define size categories
const isSmallDevice = screenWidth <= 360;
const isMediumDevice = screenWidth > 360 && screenWidth <= 480;
const isLargeDevice = screenWidth > 480 && screenWidth <= 720;
const isTablet = screenWidth > 720;

// Use these in your styles or component rendering
const styles = StyleSheet.create({
  container: {
    padding: isSmallDevice ? 8 : isTablet ? 24 : 16,
  },
  title: {
    fontSize: isSmallDevice ? 20 : isTablet ? 32 : 24,
  },
});
```

## Responsive Layout Patterns

Let's explore common responsive layout patterns that work well in React Native:

### 1. Flexible Grid Layout

A grid that adjusts its column count based on screen size:

```jsx
import React from 'react';
import { View, Text, Dimensions, StyleSheet } from 'react-native';

const MedicationGrid = ({ medications }) => {
  const screenWidth = Dimensions.get('window').width;
  
  // Determine number of columns based on screen width
  const numColumns = screenWidth < 480 ? 2 : screenWidth < 720 ? 3 : 4;
  
  // Calculate item width based on number of columns
  const itemWidth = screenWidth / numColumns - 16;  // Subtract padding
  
  return (
    <View style={styles.container}>
      <View style={styles.grid}>
        {medications.map(medication => (
          <View 
            key={medication.id} 
            style={[styles.item, { width: itemWidth }]}
          >
            <Text style={styles.medicationName}>{medication.name}</Text>
            <Text style={styles.medicationDosage}>{medication.dosage}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 8,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  item: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    alignItems: 'center',
  },
  medicationName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  medicationDosage: {
    fontSize: 14,
    color: '#666',
  },
});
```

### 2. Responsive Navigation

Change navigation patterns based on device size:

```jsx
import React from 'react';
import { View, Dimensions, StyleSheet } from 'react-native';
import TabNavigation from './TabNavigation'; // Bottom tab navigation for small devices
import SidebarNavigation from './SidebarNavigation'; // Sidebar for larger devices

const AppLayout = ({ children }) => {
  const windowWidth = Dimensions.get('window').width;
  const isTablet = windowWidth >= 768;
  
  return (
    <View style={styles.container}>
      {isTablet ? (
        <View style={styles.tabletLayout}>
          <SidebarNavigation style={styles.sidebar} />
          <View style={styles.content}>
            {children}
          </View>
        </View>
      ) : (
        <View style={styles.phoneLayout}>
          <View style={styles.content}>
            {children}
          </View>
          <TabNavigation />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  phoneLayout: {
    flex: 1,
  },
  tabletLayout: {
    flex: 1,
    flexDirection: 'row',
  },
  sidebar: {
    width: 250,
    backgroundColor: '#f5f5f5',
  },
  content: {
    flex: 1,
  },
});
```

### 3. Conditional Rendering

Render different components based on screen size:

```jsx
import React from 'react';
import { View, Dimensions, StyleSheet } from 'react-native';
import MedicationList from './MedicationList'; // Compact list view
import MedicationCards from './MedicationCards'; // Card view for larger screens

const MedicationDashboard = ({ medications }) => {
  const windowWidth = Dimensions.get('window').width;
  const isLargeScreen = windowWidth >= 600;
  
  return (
    <View style={styles.container}>
      {isLargeScreen ? (
        <MedicationCards medications={medications} />
      ) : (
        <MedicationList medications={medications} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});
```

### 4. Adaptive Component Props

Adjust component props based on screen size:

```jsx
import React from 'react';
import { FlatList, Dimensions, StyleSheet } from 'react-native';
import MedicationItem from './MedicationItem';

const MedicationList = ({ medications }) => {
  const windowWidth = Dimensions.get('window').width;
  
  // Calculate number of columns based on screen width
  const numColumns = windowWidth >= 600 ? 2 : 1;
  
  // Adjust item size based on number of columns
  const itemHeight = numColumns === 1 ? 100 : 200;
  
  return (
    <FlatList
      data={medications}
      numColumns={numColumns}
      key={numColumns} // Force re-render when numColumns changes
      renderItem={({ item }) => (
        <MedicationItem 
          medication={item} 
          style={[
            styles.item, 
            { height: itemHeight }
          ]}
          showDetailedView={numColumns > 1}
        />
      )}
      contentContainerStyle={styles.list}
    />
  );
};

const styles = StyleSheet.create({
  list: {
    padding: 8,
  },
  item: {
    flex: 1,
    margin: 8,
    backgroundColor: 'white',
    borderRadius: 8,
  },
});
```

## Creating a Responsive Design System

For larger applications, it's helpful to create a responsive design system:

### 1. Create a Responsive Utility Module

```jsx
// utils/responsive.js
import { Dimensions, PixelRatio, Platform } from 'react-native';

// Screen dimensions
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

// Base dimensions (design is based on)
const BASE_WIDTH = 375; // iPhone X width

// Scales
const widthScale = SCREEN_WIDTH / BASE_WIDTH;

// Device type detection
const isTablet = SCREEN_WIDTH >= 768 || SCREEN_HEIGHT >= 768;
const isSmallDevice = SCREEN_WIDTH <= 360;

// Font scaling function
const scaleFontSize = (size) => {
  const newSize = size * widthScale;
  if (Platform.OS === 'ios') {
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
  }
  return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2;
};

// Margin and padding scaling
const spacing = (size) => size * widthScale;

// Get current screen orientation
const isLandscape = () => SCREEN_WIDTH > SCREEN_HEIGHT;

// Listen for dimension changes
const addDimensionListener = (callback) => {
  const subscription = Dimensions.addEventListener('change', ({ window }) => {
    const { width, height } = window;
    callback({ width, height, isLandscape: width > height });
  });
  
  return subscription;
};

export default {
  screenWidth: SCREEN_WIDTH,
  screenHeight: SCREEN_HEIGHT,
  widthScale,
  isTablet,
  isSmallDevice,
  scaleFontSize,
  spacing,
  isLandscape,
  addDimensionListener,
};
```

### 2. Create a Responsive Theme

```jsx
// theme/responsive-theme.js
import Responsive from '../utils/responsive';

// Define breakpoints
const breakpoints = {
  phone: 0,
  tablet: 768,
  desktop: 1024,
};

// Typography
const typography = {
  h1: {
    fontSize: Responsive.scaleFontSize(32),
    lineHeight: Responsive.scaleFontSize(38),
    fontWeight: 'bold',
  },
  h2: {
    fontSize: Responsive.scaleFontSize(24),
    lineHeight: Responsive.scaleFontSize(30),
    fontWeight: 'bold',
  },
  h3: {
    fontSize: Responsive.scaleFontSize(20),
    lineHeight: Responsive.scaleFontSize(26),
    fontWeight: '600',
  },
  body: {
    fontSize: Responsive.scaleFontSize(16),
    lineHeight: Responsive.scaleFontSize(22),
  },
  caption: {
    fontSize: Responsive.scaleFontSize(14),
    lineHeight: Responsive.scaleFontSize(18),
  },
};

// Spacing
const spacing = {
  xs: Responsive.spacing(4),
  small: Responsive.spacing(8),
  medium: Responsive.spacing(16),
  large: Responsive.spacing(24),
  xl: Responsive.spacing(32),
  xxl: Responsive.spacing(48),
};

// Layout
const layout = {
  container: {
    paddingHorizontal: Responsive.isTablet ? spacing.large : spacing.medium,
  },
  card: {
    padding: Responsive.isTablet ? spacing.medium : spacing.small,
    borderRadius: 8,
    backgroundColor: 'white',
  },
};

export default {
  breakpoints,
  typography,
  spacing,
  layout,
  isTablet: Responsive.isTablet,
  isSmallDevice: Responsive.isSmallDevice,
};
```

### 3. Apply the Design System

```jsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Theme from '../theme/responsive-theme';

const MedicationDetail = ({ medication }) => {
  return (
    <View style={[styles.container, Theme.layout.container]}>
      <Text style={[styles.title, Theme.typography.h2]}>
        {medication.name}
      </Text>
      
      <View style={[styles.card, Theme.layout.card]}>
        <Text style={[styles.sectionTitle, Theme.typography.h3]}>
          Dosage Information
        </Text>
        <Text style={[styles.body, Theme.typography.body]}>
          {medication.dosageInstructions}
        </Text>
      </View>
      
      <View style={[styles.card, Theme.layout.card, { marginTop: Theme.spacing.medium }]}>
        <Text style={[styles.sectionTitle, Theme.typography.h3]}>
          Side Effects
        </Text>
        <Text style={[styles.body, Theme.typography.body]}>
          {medication.sideEffects}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    marginBottom: Theme.spacing.medium,
  },
  card: {
    marginBottom: Theme.spacing.medium,
  },
  sectionTitle: {
    marginBottom: Theme.spacing.small,
  },
  body: {
    color: '#333',
  },
});
```

## Best Practices for Responsive Design

1. **Use Relative Units**: Prefer percentages and flex values over fixed dimensions

2. **Test on Multiple Devices**: Test your application on devices with different screen sizes and aspect ratios

3. **Handle Orientation Changes**: Listen for dimension changes and update your layout accordingly

4. **Create a Design System**: Build a consistent system of spacing, typography, and layout components

5. **Responsive Images**: Use appropriate image resolutions for different screen densities

6. **Avoid Hard-coded Values**: Use constants or functions to calculate dimensions instead of hard-coded values

7. **Progressive Enhancement**: Start with a base layout that works on the smallest supported device, then enhance for larger screens

8. **Consider Thumb Reach**: On larger phones, position important touch targets where they can be easily reached with one hand

## Handling Safe Areas and Notches

Modern phones may have notches, rounded corners, or home indicators that intrude into the screen area. React Native provides the `SafeAreaView` component to handle these:

```jsx
import React from 'react';
import { SafeAreaView, View, Text, StyleSheet } from 'react-native';

const App = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Medication Tracker</Text>
        {/* Your app content */}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
});
```

> 💡 **Deep Dive**: For more complex safe area handling, consider using the `react-native-safe-area-context` package, which provides more detailed information about safe areas on all sides of the screen.

## Summary

Responsive design is critical for creating applications that work well across the diverse ecosystem of mobile devices. By using React Native's built-in features like Flexbox, percentage-based sizing, and the Dimensions API, you can create layouts that adapt to different screen sizes and orientations. Creating a responsive design system with utilities for scaling typography, spacing, and layout components will ensure consistency across your application.

In the next section, we'll explore animations and transitions, which can enhance the user experience by providing visual feedback and creating fluid interactions.

## Further Reading

- [Dimensions API Documentation](https://reactnative.dev/docs/dimensions)
- [PixelRatio Documentation](https://reactnative.dev/docs/pixelratio)
- [SafeAreaView Documentation](https://reactnative.dev/docs/safeareaview)
- [React Native Safe Area Context](https://github.com/th3rdwave/react-native-safe-area-context)
- [Responsive UI in React Native](https://reactnative.dev/docs/next/responsive-ui) 