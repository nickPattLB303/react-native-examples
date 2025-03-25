# Module 7: React Native UI and Styling

## Responsive Design

Make your React Native UI adapt to different screen sizes and orientations:

```tsx
import React, { useState, useEffect } from 'react';
import { 
  View, Text, StyleSheet, Dimensions, 
  ScrollView, useWindowDimensions, 
  Platform, PixelRatio 
} from 'react-native';

// Get the screen dimensions
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

// Base on a design for 375pt width screen (iPhone X)
const baseWidth = 375;

// Scale factor
const scale = SCREEN_WIDTH / baseWidth;

// Function to normalize font sizes
const normalize = (size) => {
  const newSize = size * scale;
  // Pixel ratio is different on iOS and Android
  if (Platform.OS === 'ios') {
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
  } else {
    return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2;
  }
};

function ResponsiveDesignExample() {
  // Use hook for dimensions (responds to orientation changes)
  const window = useWindowDimensions();
  
  // Calculate dynamic grid columns based on screen width
  const numColumns = Math.max(1, Math.floor(window.width / 150));
  
  // Track orientation changes
  const [isLandscape, setIsLandscape] = useState(window.width > window.height);
  
  useEffect(() => {
    setIsLandscape(window.width > window.height);
  }, [window.width, window.height]);
  
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Responsive Design Example</Text>
      
      <Text style={styles.sectionTitle}>Screen Information</Text>
      <View style={styles.infoContainer}>
        <Text>Width: {window.width}pt</Text>
        <Text>Height: {window.height}pt</Text>
        <Text>Orientation: {isLandscape ? 'Landscape' : 'Portrait'}</Text>
        <Text>Pixel Ratio: {PixelRatio.get()}</Text>
      </View>
      
      <Text style={styles.sectionTitle}>Responsive Typography</Text>
      <View style={styles.typographyContainer}>
        <Text style={styles.largeText}>Large Text ({normalize(24)}pt)</Text>
        <Text style={styles.mediumText}>Medium Text ({normalize(16)}pt)</Text>
        <Text style={styles.smallText}>Small Text ({normalize(12)}pt)</Text>
      </View>
      
      <Text style={styles.sectionTitle}>
        Responsive Grid ({numColumns} columns)
      </Text>
      <View style={[
        styles.gridContainer,
        isLandscape && styles.landscapeGrid
      ]}>
        {Array(6).fill(0).map((_, i) => (
          <View 
            key={i} 
            style={[
              styles.gridItem,
              { width: `${100 / numColumns - 4}%` }
            ]}
          >
            <Text style={styles.gridItemText}>Item {i + 1}</Text>
          </View>
        ))}
      </View>
      
      <Text style={styles.sectionTitle}>Adaptive Layout</Text>
      <View style={[
        styles.adaptiveContainer,
        isLandscape && styles.adaptiveLandscape
      ]}>
        <View style={[
          styles.adaptiveSection,
          isLandscape && styles.adaptiveSectionLandscape
        ]}>
          <Text style={styles.adaptiveTitle}>Section 1</Text>
          <Text>This section adapts to orientation changes</Text>
        </View>
        <View style={[
          styles.adaptiveSection,
          isLandscape && styles.adaptiveSectionLandscape
        ]}>
          <Text style={styles.adaptiveTitle}>Section 2</Text>
          <Text>Layout changes based on available space</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: normalize(20),
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: normalize(16),
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  infoContainer: {
    backgroundColor: '#f0f0f0',
    padding: 15,
    borderRadius: 5,
  },
  typographyContainer: {
    backgroundColor: '#f0f0f0',
    padding: 15,
    borderRadius: 5,
  },
  largeText: {
    fontSize: normalize(24),
    marginBottom: 10,
  },
  mediumText: {
    fontSize: normalize(16),
    marginBottom: 10,
  },
  smallText: {
    fontSize: normalize(12),
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginHorizontal: -5,
  },
  landscapeGrid: {
    marginHorizontal: -10,
  },
  gridItem: {
    backgroundColor: '#e1f5fe',
    borderRadius: 5,
    padding: 15,
    margin: 5,
    alignItems: 'center',
    justifyContent: 'center',
    aspectRatio: 1,
  },
  gridItemText: {
    fontWeight: '500',
  },
  adaptiveContainer: {
    flexDirection: 'column',
  },
  adaptiveLandscape: {
    flexDirection: 'row',
  },
  adaptiveSection: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    padding: 15,
    borderRadius: 5,
    marginBottom: 10,
  },
  adaptiveSectionLandscape: {
    marginHorizontal: 5,
    marginBottom: 0,
  },
  adaptiveTitle: {
    fontSize: normalize(16),
    fontWeight: 'bold',
    marginBottom: 5,
  },
});
```

<blockquote><details>

Responsive design in React Native ensures your application looks and functions well across a wide variety of devices, screen sizes, and orientations. This example demonstrates several essential techniques for creating responsive UIs in React Native applications.

**Dynamic Dimension Tracking** is demonstrated through two approaches:
1. The static `Dimensions.get('window')` API provides an initial screen size at app launch
2. The `useWindowDimensions()` hook offers real-time updates when dimensions change (e.g., during rotation)

The latter is preferred for components that need to respond to orientation changes, as shown in this example where the layout adapts when the device rotates.

**Font Scaling** is handled through the `normalize()` function, which scales font sizes proportionally based on screen width while accounting for platform-specific pixel density differences. This technique ensures text remains readable across devices with different screen sizes and resolutions. The example standardizes design around a 375pt base width (common for iPhone designs) and adjusts sizes proportionally.

**Pixel Ratio Handling** accounts for the different pixel densities across devices. The `PixelRatio` API helps convert between device-independent points (used in React Native) and physical pixels. The example shows slightly different handling for iOS and Android, acknowledging the platform differences in how text renders.

**Responsive Grids** adapt the number of columns based on available width. By calculating `numColumns` dynamically based on screen width, the grid maintains appropriately sized items regardless of device orientation or size. Each item also uses percentage-based widths to fill the available space proportionally.

**Adaptive Layouts** change their structure based on orientation. When in portrait mode, sections stack vertically; in landscape, they display side by side. This pattern is implemented by:
1. Tracking orientation with the `isLandscape` state
2. Applying different style objects conditionally based on this state
3. Using flexbox direction (`column` vs `row`) to change the layout flow

**Orientation Detection** is handled by comparing width and height values and updating when they change:
```javascript
const [isLandscape, setIsLandscape] = useState(window.width > window.height);
  
useEffect(() => {
  setIsLandscape(window.width > window.height);
}, [window.width, window.height]);
```

This approach is more reliable than platform-specific orientation APIs, as it directly responds to the actual dimensions available to your application.

The example also demonstrates several best practices for responsive design:
1. **Avoiding fixed dimensions** where possible, using flex, percentages, and proportional sizing instead
2. **Using aspect ratios** to maintain consistent proportions (for the grid items)
3. **Flexible margin and padding** that adapts to different screen sizes
4. **Platform-specific adjustments** to account for rendering differences
5. **Scrollable containers** to handle content that might not fit on smaller screens

These techniques collectively ensure that applications maintain visual consistency and usability across the wide range of devices that React Native supports, from small phones to tablets and even foldable devices with dynamic screen sizes.

</details></blockquote>

---

## Platform-Specific Styling

Customize your UI for different platforms:

```tsx
import React from 'react';
import { 
  View, Text, StyleSheet, Platform, 
  TouchableOpacity, TouchableNativeFeedback 
} from 'react-native';

// Platform-specific component
const TouchableFeedback = Platform.select({
  ios: props => <TouchableOpacity {...props} />,
  android: props => <TouchableNativeFeedback {...props} />
});

function MedicationButton({ title, onPress }) {
  // Platform specific component rendering
  return Platform.OS === 'ios' ? (
    <TouchableOpacity 
      style={styles.button} 
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  ) : (
    <TouchableNativeFeedback
      onPress={onPress}
      background={TouchableNativeFeedback.Ripple('#d4d4d4', false)}
    >
      <View style={styles.button}>
        <Text style={styles.buttonText}>{title}</Text>
      </View>
    </TouchableNativeFeedback>
  );
}

function PlatformStyleExample() {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Platform-Specific Styling</Text>
      
      {/* Platform-specific values */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Using Platform-Specific Values</Text>
        <Text style={styles.platformText}>
          This text uses platform-specific font family and size
        </Text>
      </View>
      
      {/* Platform.select for styles */}
      <View style={styles.platformCard}>
        <Text style={styles.cardTitle}>Using Platform.select</Text>
        <Text>
          This card has platform-optimized styling for shadows and elevation
        </Text>
      </View>
      
      {/* Platform-specific components */}
      <Text style={styles.sectionTitle}>Platform-Specific Buttons:</Text>
      
      <MedicationButton 
        title="Take Medication"
        onPress={() => console.log('Button pressed')}
      />
      
      {/* Generic touchable with platform adaptation */}
      <Text style={styles.sectionTitle}>Using TouchableFeedback:</Text>
      <TouchableFeedback onPress={() => console.log('Touchable pressed')}>
        <View style={styles.genericButton}>
          <Text style={styles.buttonText}>Record Symptoms</Text>
        </View>
      </TouchableFeedback>
      
      {/* Platform-specific file extension */}
      <Text style={styles.note}>
        Note: You can also create platform-specific files with
        .ios.js and .android.js extensions
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f9f9f9',
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  platformCard: {
    backgroundColor: Platform.OS === 'ios' ? '#f8f8f8' : '#e8f5e9',
    borderRadius: Platform.OS === 'ios' ? 8 : 4,
    padding: 15,
    marginBottom: 15,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    color: Platform.OS === 'ios' ? '#007aff' : '#1976d2',
  },
  platformText: {
    fontFamily: Platform.select({
      ios: 'System',
      android: 'Roboto',
    }),
    fontSize: Platform.OS === 'ios' ? 16 : 15,
    lineHeight: Platform.OS === 'ios' ? 22 : 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 20,
    marginBottom: 10,
  },
  button: {
    backgroundColor: Platform.OS === 'ios' ? '#007aff' : '#1976d2',
    borderRadius: Platform.OS === 'ios' ? 8 : 4,
    paddingVertical: 12,
    paddingHorizontal: 20,
    alignItems: 'center',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 1,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  genericButton: {
    backgroundColor: Platform.OS === 'ios' ? '#34c759' : '#43a047',
    borderRadius: Platform.OS === 'ios' ? 8 : 4,
    paddingVertical: 12,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: Platform.OS === 'ios' ? '600' : '500',
  },
  note: {
    marginTop: 30,
    textAlign: 'center',
    fontSize: 14,
    fontStyle: 'italic',
    color: '#666',
  },
});
```

<blockquote><details>

Platform-specific styling is a crucial aspect of creating native-feeling applications in React Native. While the framework's philosophy is "learn once, write anywhere," respecting platform conventions leads to better user experiences. This example demonstrates several techniques for implementing platform-specific adaptations while maintaining a clean, maintainable codebase.

**Platform Module** is React Native's primary tool for platform-specific code. The example showcases three key methods:

1. **Platform.OS** provides a simple conditional check to apply different styles or render different components based on platform. The `cardTitle` style uses this approach to apply iOS blue vs. Android blue material colors, while the `MedicationButton` component uses it to render completely different touchable implementations.

2. **Platform.select()** offers a more concise syntax for platform-specific values, returning the value for the current platform from an object. This method is used for the `platformText` style to apply appropriate font families (System for iOS, Roboto for Android) and in the `card` style to implement platform-appropriate shadow effects (shadowProperties for iOS vs. elevation for Android).

3. **Platform-specific components** can be created by wrapping platform-specific implementations in a unified interface. The `TouchableFeedback` component demonstrates this pattern, selecting either `TouchableOpacity` (iOS) or `TouchableNativeFeedback` (Android) to provide platform-appropriate touch feedback while maintaining a consistent API.

**Platform-Specific Design Patterns** are applied throughout the example:

1. **Visual styling** follows platform conventions with rounded corners (more pronounced on iOS), appropriate color schemes, and native shadow implementations.

2. **Touch feedback** differs between platforms - iOS uses opacity changes while Android uses the material design ripple effect, each providing the tactile feedback users expect on their platform.

3. **Typography** adaptations include platform-specific font families, sizes, and line heights to match each platform's text rendering characteristics.

4. **Visual hierarchy** is maintained across platforms while respecting platform-specific aesthetics - notice how both platforms use blue for primary actions but with platform-appropriate hues.

The example also references **platform-specific file extensions** (.ios.js and .android.js), another powerful approach not explicitly demonstrated in the code. This technique allows you to maintain separate implementations for each platform while importing them with the same path, letting React Native automatically select the appropriate version.

These platform-specific adaptations enhance the native feel of applications without sacrificing the productivity benefits of cross-platform development. Users expect applications to follow platform conventions, and these techniques allow you to meet those expectations while sharing the majority of your codebase across platforms.

When implementing platform-specific styling, consider these best practices:

1. Use platform-specific adaptations for visual elements and interactions, not core business logic
2. Apply platform conventions judiciously - focus on established patterns users will notice
3. Consider extracting platform-specific code into separate files for complex differences
4. Test thoroughly on both platforms to ensure appropriate behavior and appearance
5. Use design systems that account for platform differences while maintaining brand consistency

By thoughtfully applying these platform-specific styling techniques, you can create applications that feel at home on both iOS and Android while maximizing code reuse between platforms.

</details></blockquote>