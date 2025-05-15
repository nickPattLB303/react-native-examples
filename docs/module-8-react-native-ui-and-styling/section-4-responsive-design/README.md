# Section 4: Responsive Design and Device Adaptation

## Learning Objectives
After completing this section, you will be able to:
- Create layouts that adapt to different screen sizes and orientations
- Use the Dimensions API to get device screen information
- Implement responsive typography and spacing
- Handle device orientation changes
- Create adaptive layouts for phones and tablets
- Apply platform-specific styling for iOS and Android
- Test responsive designs across different devices

**Prerequisite Knowledge**: Flexbox Layout in React Native (Section 3)
**Estimated Time**: 60-75 minutes

## Introduction to Responsive Design in React Native

Responsive design in React Native involves creating user interfaces that adapt to different screen sizes, orientations, and device types. Unlike web development, where media queries are commonly used, React Native requires different approaches to achieve responsive layouts.

> 💡 **Key Insight**: React Native apps run on a wide variety of devices with different screen sizes, pixel densities, and aspect ratios. A well-designed app should look good and function properly on all these devices without requiring separate codebases.

## Understanding Device Metrics

### Dimensions API

React Native's `Dimensions` API provides information about the device's screen:

```jsx
import { Dimensions } from 'react-native';

// Get the window dimensions
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

// Get the screen dimensions (may include areas not visible to the app, like notches)
const screenWidth = Dimensions.get('screen').width;
const screenHeight = Dimensions.get('screen').height;
```

> ⚠️ **Important**: The `Dimensions` API returns values in density-independent pixels (dp or dip), not physical pixels. This means the values are already adjusted for the device's pixel density.

### Using Dimensions for Responsive Layouts

```jsx
import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');
const isTablet = width >= 768; // Common breakpoint for tablets

function ResponsiveCard() {
  return (
    <View style={[
      styles.card,
      isTablet ? styles.tabletCard : styles.phoneCard
    ]}>
      <Text style={[
        styles.title,
        isTablet ? styles.tabletTitle : styles.phoneTitle
      ]}>
        Medication Reminder
      </Text>
      <Text style={styles.description}>
        Take your medication at the prescribed time
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 15,
    borderRadius: 8,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  phoneCard: {
    width: width * 0.9, // 90% of screen width on phones
    marginHorizontal: width * 0.05,
  },
  tabletCard: {
    width: width * 0.7, // 70% of screen width on tablets
    marginHorizontal: width * 0.15,
  },
  title: {
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  phoneTitle: {
    fontSize: 18,
  },
  tabletTitle: {
    fontSize: 24,
  },
  description: {
    color: '#666',
    fontSize: isTablet ? 16 : 14,
  },
});
```

### Limitations of the Dimensions API

The `Dimensions` API has some limitations:
- It doesn't automatically update when the device orientation changes
- It doesn't account for dynamic system UI elements like the software keyboard

To handle orientation changes, you need to listen for dimension changes:

```jsx
import React, { useState, useEffect } from 'react';
import { View, Dimensions } from 'react-native';

function OrientationAwareComponent() {
  const [dimensions, setDimensions] = useState({
    window: Dimensions.get('window'),
    screen: Dimensions.get('screen'),
  });

  useEffect(() => {
    const subscription = Dimensions.addEventListener('change', ({ window, screen }) => {
      setDimensions({ window, screen });
    });
    
    return () => subscription?.remove();
  }, []);

  const isLandscape = dimensions.window.width > dimensions.window.height;
  
  return (
    <View style={{
      flexDirection: isLandscape ? 'row' : 'column',
      // Other styles based on orientation
    }}>
      {/* Component content */}
    </View>
  );
}
```

## Responsive Typography

### Scaling Font Sizes

Create a utility function to scale font sizes based on screen width:

```jsx
import { Dimensions } from 'react-native';

const { width } = Dimensions.get('window');
const baseWidth = 375; // Base width (e.g., iPhone X)

export function scaleFontSize(size) {
  const scale = width / baseWidth;
  const newSize = size * scale;
  
  // Optional: add min/max constraints
  return Math.round(Math.min(Math.max(newSize, size - 2), size + 4));
}

// Usage
const styles = StyleSheet.create({
  title: {
    fontSize: scaleFontSize(24),
    fontWeight: 'bold',
  },
  body: {
    fontSize: scaleFontSize(16),
  },
});
```

### Creating a Typography System

Define a typography system with responsive font sizes:

```jsx
// typography.js
import { Dimensions } from 'react-native';

const { width } = Dimensions.get('window');
const baseWidth = 375;

const scale = (size) => {
  const scale = width / baseWidth;
  const newSize = size * scale;
  return Math.round(Math.min(Math.max(newSize, size - 2), size + 4));
};

export const typography = {
  fontSizes: {
    xs: scale(12),
    sm: scale(14),
    md: scale(16),
    lg: scale(18),
    xl: scale(20),
    xxl: scale(24),
    xxxl: scale(30),
  },
  fontWeights: {
    normal: 'normal',
    medium: '500',
    bold: 'bold',
  },
  lineHeights: {
    xs: scale(16),
    sm: scale(20),
    md: scale(24),
    lg: scale(28),
    xl: scale(32),
    xxl: scale(36),
  },
};

// Usage
import { typography } from './typography';
import { StyleSheet, Text } from 'react-native';

function ResponsiveText() {
  return (
    <Text style={styles.heading}>Responsive Heading</Text>
  );
}

const styles = StyleSheet.create({
  heading: {
    fontSize: typography.fontSizes.xl,
    fontWeight: typography.fontWeights.bold,
    lineHeight: typography.lineHeights.xl,
  },
});
```

## Responsive Spacing and Layout

### Percentage-Based Dimensions

Use percentage-based dimensions for responsive widths:

```jsx
import { StyleSheet, View } from 'react-native';

function ResponsiveContainer() {
  return (
    <View style={styles.container}>
      <View style={styles.leftPanel}>
        {/* Left panel content */}
      </View>
      <View style={styles.rightPanel}>
        {/* Right panel content */}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '100%',
  },
  leftPanel: {
    width: '30%', // Takes 30% of the container width
    padding: 10,
  },
  rightPanel: {
    width: '70%', // Takes 70% of the container width
    padding: 10,
  },
});
```

### Aspect Ratio

Maintain aspect ratios for images and containers:

```jsx
import { StyleSheet, View, Image } from 'react-native';

function AspectRatioImage() {
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={require('./assets/medication.png')}
          style={styles.image}
          resizeMode="cover"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  imageContainer: {
    width: '100%',
    aspectRatio: 16 / 9, // 16:9 aspect ratio
    overflow: 'hidden',
    borderRadius: 8,
  },
  image: {
    width: '100%',
    height: '100%',
  },
});
```

### Responsive Grid Layout

Create a responsive grid that adapts to screen size:

```jsx
import React from 'react';
import { StyleSheet, View, Text, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');
const numColumns = width >= 768 ? 3 : 2; // 3 columns on tablets, 2 on phones
const itemWidth = (width - 40) / numColumns; // 40 = total padding and margins

function ResponsiveGrid() {
  const items = [
    { id: '1', name: 'Aspirin' },
    { id: '2', name: 'Ibuprofen' },
    { id: '3', name: 'Paracetamol' },
    { id: '4', name: 'Amoxicillin' },
    { id: '5', name: 'Lisinopril' },
    { id: '6', name: 'Metformin' },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.grid}>
        {items.map(item => (
          <View 
            key={item.id} 
            style={[styles.item, { width: itemWidth }]}
          >
            <Text style={styles.itemText}>{item.name}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  item: {
    height: 100,
    backgroundColor: 'white',
    borderRadius: 8,
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  itemText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});
```

## Handling Orientation Changes

### Using the `useWindowDimensions` Hook

React Native provides the `useWindowDimensions` hook, which automatically updates when dimensions change:

```jsx
import React from 'react';
import { StyleSheet, View, Text, useWindowDimensions } from 'react-native';

function OrientationResponsiveLayout() {
  const { width, height } = useWindowDimensions();
  const isLandscape = width > height;

  return (
    <View style={[
      styles.container,
      isLandscape ? styles.landscapeContainer : styles.portraitContainer
    ]}>
      <View style={[
        styles.sidebar,
        isLandscape ? styles.landscapeSidebar : styles.portraitSidebar
      ]}>
        <Text style={styles.sidebarText}>Sidebar</Text>
      </View>
      
      <View style={[
        styles.content,
        isLandscape ? styles.landscapeContent : styles.portraitContent
      ]}>
        <Text style={styles.contentText}>Main Content</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  portraitContainer: {
    flexDirection: 'column',
  },
  landscapeContainer: {
    flexDirection: 'row',
  },
  sidebar: {
    backgroundColor: '#f0f0f0',
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  portraitSidebar: {
    height: 100,
    width: '100%',
  },
  landscapeSidebar: {
    width: 200,
    height: '100%',
  },
  content: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  portraitContent: {
    // Portrait-specific content styles
  },
  landscapeContent: {
    // Landscape-specific content styles
  },
  sidebarText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  contentText: {
    fontSize: 16,
  },
});
```

### Locking Orientation

In some cases, you might want to lock the app to a specific orientation. This is typically done at the native level, but you can use libraries like `expo-screen-orientation` in Expo projects:

```jsx
import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import * as ScreenOrientation from 'expo-screen-orientation';

function PortraitOnlyScreen() {
  useEffect(() => {
    // Lock to portrait orientation
    async function lockOrientation() {
      await ScreenOrientation.lockAsync(
        ScreenOrientation.OrientationLock.PORTRAIT
      );
    }
    
    lockOrientation();
    
    return () => {
      // Unlock when component unmounts
      ScreenOrientation.unlockAsync();
    };
  }, []);

  return (
    <View>
      <Text>This screen is locked to portrait orientation</Text>
    </View>
  );
}
```

## Device-Specific Adaptations

### Platform-Specific Styling

Use the `Platform` API to apply different styles based on the operating system:

```jsx
import { StyleSheet, View, Text, Platform } from 'react-native';

function PlatformAdaptiveComponent() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Platform Adaptive Title</Text>
      <View style={styles.card}>
        <Text style={styles.cardText}>This card has platform-specific styling</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 15,
    fontFamily: Platform.OS === 'ios' ? 'Avenir' : 'Roboto',
    color: Platform.OS === 'ios' ? '#000' : '#333',
  },
  card: {
    padding: 15,
    borderRadius: Platform.OS === 'ios' ? 10 : 4,
    backgroundColor: 'white',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  cardText: {
    fontSize: 16,
    color: Platform.OS === 'ios' ? '#333' : '#444',
  },
});
```

### Device Type Detection

Create a utility to detect device type (phone vs. tablet):

```jsx
// deviceUtils.js
import { Dimensions, Platform } from 'react-native';

const { width, height } = Dimensions.get('window');
const aspectRatio = height / width;

export const isTablet = () => {
  // iPad detection for iOS
  if (Platform.OS === 'ios') {
    return Platform.isPad;
  }
  
  // Android and other platforms - use screen size
  return (
    (width >= 768 && height >= 768) || // Min tablet size
    (aspectRatio <= 1.6) // Typical tablet aspect ratio
  );
};

// Usage
import { isTablet } from './deviceUtils';
import { StyleSheet, View, Text } from 'react-native';

function DeviceAdaptiveComponent() {
  const isTabletDevice = isTablet();
  
  return (
    <View style={styles.container}>
      <Text style={[
        styles.text,
        isTabletDevice ? styles.tabletText : styles.phoneText
      ]}>
        {isTabletDevice ? 'Tablet Layout' : 'Phone Layout'}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
  },
  text: {
    fontWeight: 'bold',
  },
  phoneText: {
    fontSize: 16,
  },
  tabletText: {
    fontSize: 24,
  },
});
```

## Safe Area and Notch Handling

### SafeAreaView Component

Use `SafeAreaView` to handle safe areas (notches, home indicators, etc.):

```jsx
import { SafeAreaView, StyleSheet, View, Text } from 'react-native';

function SafeAreaExample() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Medication App</Text>
      </View>
      
      <View style={styles.content}>
        <Text style={styles.contentText}>
          This content is safe from notches and system UI elements
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    padding: 15,
    backgroundColor: '#007bff',
  },
  headerText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    padding: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentText: {
    fontSize: 16,
    textAlign: 'center',
  },
});
```

### Using react-native-safe-area-context

For more control over safe areas, use the `react-native-safe-area-context` library:

```jsx
import { StyleSheet, View, Text } from 'react-native';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';

function AppContent() {
  const insets = useSafeAreaInsets();
  
  return (
    <View style={[
      styles.container,
      {
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
        paddingLeft: insets.left,
        paddingRight: insets.right,
      }
    ]}>
      <Text style={styles.text}>Content with custom safe area insets</Text>
    </View>
  );
}

function App() {
  return (
    <SafeAreaProvider>
      <AppContent />
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 16,
  },
});
```

## Testing Responsive Designs

### Using Simulators and Emulators

Test your app on different device simulators/emulators:
- iOS Simulator: Test on different iPhone and iPad models
- Android Emulator: Test on different screen sizes and densities

### Physical Device Testing

Always test on physical devices when possible, as they provide the most accurate representation of how your app will look and perform.

### Responsive Design Testing Tools

- **Expo Device Library**: If using Expo, test on multiple device types directly from the Expo client
- **React Native Debugger**: Inspect and modify styles in real-time
- **Flipper**: Facebook's debugging platform with layout inspection tools

## Exercise: Creating a Responsive Medication Dashboard

Create a medication dashboard that adapts to different screen sizes and orientations:

1. In portrait mode on phones:
   - Stack components vertically
   - Use full width for cards and lists
   - Use appropriate font sizes for smaller screens

2. In landscape mode on phones:
   - Use a two-column layout
   - Adjust component sizes to fit the wider, shorter screen

3. On tablets:
   - Use a sidebar navigation layout
   - Display more content in each row
   - Use larger font sizes and spacing

Implement this dashboard using the responsive design techniques covered in this section.

## Additional Resources

- [React Native Responsive Dimensions](https://reactnative.dev/docs/dimensions)
- [React Native Platform Specific Code](https://reactnative.dev/docs/platform-specific-code)
- [React Native Safe Area Context](https://github.com/th3rdwave/react-native-safe-area-context)
- [Responsive UI in React Native](https://medium.com/building-with-react-native/how-to-develop-responsive-uis-with-react-native-1x03-a448097c9503)

> 🔄 **For Web Developers**: Unlike web development where media queries are the primary tool for responsive design, React Native requires a more programmatic approach using the Dimensions API and conditional styling. Focus on learning these new patterns rather than trying to apply web-centric approaches.

> 🔄 **For Android/iOS Developers**: React Native's approach to responsive design is more declarative than traditional native development. Instead of creating separate layouts for different configurations, you can use conditional styling and flexible layouts to adapt to different screen sizes.
