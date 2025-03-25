# Module 7: React Native UI and Styling

## Dimensions and Responsive Units

Understanding screen dimensions and how to work with responsive units:

```tsx
import React from 'react';
import { 
  View, Text, StyleSheet, 
  Dimensions, PixelRatio, 
  SafeAreaView, ScrollView
} from 'react-native';

// Get screen dimensions
const windowDimensions = Dimensions.get('window');
const screenDimensions = Dimensions.get('screen');

// Calculate pixel ratio
const pixelRatio = PixelRatio.get();

// Function to convert dp to px
const dpToPx = (dp: number) => PixelRatio.getPixelSizeForLayoutSize(dp);

// Function to convert px to dp
const pxToDp = (px: number) => PixelRatio.roundToNearestPixel(px);

// Responsive width and height percentages
const widthPercentage = (percentage: number) => {
  return windowDimensions.width * (percentage / 100);
};

const heightPercentage = (percentage: number) => {
  return windowDimensions.height * (percentage / 100);
};

function DimensionsExample() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Text style={styles.title}>Understanding Dimensions</Text>
        
        {/* Screen Information */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Device Information</Text>
          <Text>Window Width: {windowDimensions.width}dp</Text>
          <Text>Window Height: {windowDimensions.height}dp</Text>
          <Text>Screen Width: {screenDimensions.width}dp</Text>
          <Text>Screen Height: {screenDimensions.height}dp</Text>
          <Text>Pixel Ratio: {pixelRatio}</Text>
          <Text>1dp = {pixelRatio}px on this device</Text>
        </View>
        
        {/* Responsive Units Demo */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Responsive Units</Text>
          
          <View style={styles.demoRow}>
            <View style={styles.demoItem}>
              <Text style={styles.demoLabel}>100dp Width</Text>
              <View style={[styles.box, {width: 100}]} />
              <Text>= {dpToPx(100)}px</Text>
            </View>
            
            <View style={styles.demoItem}>
              <Text style={styles.demoLabel}>25% Width</Text>
              <View style={[styles.box, {width: widthPercentage(25)}]} />
              <Text>= {widthPercentage(25).toFixed(1)}dp</Text>
            </View>
          </View>
        </View>
        
        {/* Responsive Examples */}
        <Text style={styles.title}>Responsive Layout Examples</Text>
        
        {/* Fixed vs Responsive */}
        <View style={styles.row}>
          <View style={styles.column}>
            <Text style={styles.cardTitle}>Fixed</Text>
            <View style={styles.fixedBox}>
              <Text style={styles.boxText}>200dp</Text>
            </View>
          </View>
          
          <View style={styles.column}>
            <Text style={styles.cardTitle}>Responsive</Text>
            <View style={styles.responsiveBox}>
              <Text style={styles.boxText}>50%</Text>
            </View>
          </View>
        </View>
        
        {/* Medication List Example */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Medication List (Responsive)</Text>
          
          {['Amoxicillin', 'Lisinopril', 'Metformin'].map((med, index) => (
            <View key={index} style={styles.medicationItem}>
              <View style={styles.medIconContainer}>
                <Text style={styles.medIcon}>💊</Text>
              </View>
              <View style={styles.medDetails}>
                <Text style={styles.medName}>{med}</Text>
                <Text style={styles.medInfo}>Take 1 tablet daily</Text>
              </View>
              <View style={[
                styles.dosageIndicator,
                {width: widthPercentage(15)}
              ]}>
                <Text style={styles.dosageText}>10mg</Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    margin: 16,
    textAlign: 'center',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    margin: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
    color: '#3498db',
  },
  demoRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },
  demoItem: {
    alignItems: 'center',
  },
  demoLabel: {
    marginBottom: 8,
  },
  box: {
    height: 50,
    backgroundColor: '#3498db',
    marginVertical: 8,
    borderRadius: 4,
  },
  row: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  column: {
    flex: 1,
    alignItems: 'center',
    padding: 8,
  },
  fixedBox: {
    width: 200,
    height: 100,
    backgroundColor: '#e74c3c',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  responsiveBox: {
    width: widthPercentage(50),
    height: 100,
    backgroundColor: '#2ecc71',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  boxText: {
    color: 'white',
    fontWeight: 'bold',
  },
  medicationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  medIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f0f8ff',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  medIcon: {
    fontSize: 20,
  },
  medDetails: {
    flex: 1,
  },
  medName: {
    fontSize: 16,
    fontWeight: '600',
  },
  medInfo: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  dosageIndicator: {
    backgroundColor: '#f0f8ff',
    borderRadius: 16,
    padding: 8,
    alignItems: 'center',
  },
  dosageText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#3498db',
  },
});
```

<blockquote><details>

Dimensions and responsive units are fundamental concepts in React Native development that enable applications to adapt gracefully to various device sizes and orientations. Unlike web development where CSS units like pixels, percentages, and viewport units are common, React Native uses a platform-agnostic approach with density-independent pixels (dp in Android, points in iOS) as its primary unit.

The `Dimensions` API provides access to screen and window metrics, offering crucial information for responsive layouts. The distinction between `window` and `screen` dimensions is significant on some devices:
- `window` dimensions represent the app's visible area (excluding system UI elements like status bars or navigation bars)
- `screen` dimensions represent the entire physical screen size

This example demonstrates how to access these values through `Dimensions.get('window')` and `Dimensions.get('screen')`. For most UI calculations, window dimensions are preferred as they represent the actual space available to your application.

Pixel ratio, accessed via `PixelRatio.get()`, represents the relationship between physical pixels and logical pixels (dp/points). For example, a device with a pixel ratio of 3 will have 3 physical pixels for every 1 logical pixel. This abstraction allows developers to work with a consistent coordinate system across devices with vastly different pixel densities.

The example demonstrates two utility functions for working with pixel ratios:
1. `dpToPx` converts density-independent pixels to physical pixels
2. `pxToDp` converts physical pixels to density-independent pixels

These conversions are occasionally needed when interfacing with APIs that work with physical pixels or when implementing precise visual designs.

For responsive layouts, the example implements percentage-based sizing through the `widthPercentage` and `heightPercentage` helper functions. These calculate dimensions as a percentage of the screen width or height, similar to CSS percentage units. This approach ensures elements scale proportionally across different screen sizes.

The "Fixed vs Responsive" comparison demonstrates a key advantage of responsive units. The fixed box remains 200dp wide regardless of screen size, which may be too large on small devices or too small on tablets. In contrast, the responsive box uses 50% of the screen width, ensuring it maintains an appropriate size proportion across all devices.

The medication list showcases a practical application of responsive design principles. The list items use a flexible layout with:
- Fixed-size elements for the medication icon (40dp × 40dp)
- Flexible text area that expands to fill available space (`flex: 1`)
- Responsive dosage indicator that uses a percentage of screen width for consistent visual balance

This component structure enables the UI to adapt to different screen widths while maintaining both readability and visual hierarchy. The approach combines fixed dimensions where appropriate (icon size) with flexible layouts (expandable text area) and proportional sizing (percentage-based dosage indicator width).

When implementing responsive layouts in React Native, consider these best practices:
1. Use flexbox for layouts that need to adapt to available space
2. Apply percentage-based dimensions for elements that should scale with screen size
3. Maintain fixed dimensions for elements where size consistency is important (like touch targets)
4. Account for different aspect ratios, not just screen sizes
5. Test on multiple device sizes to verify responsive behavior

By thoughtfully applying these dimensions and responsive units, your applications can deliver consistent user experiences across the diverse range of devices in the mobile ecosystem.

</details></blockquote>

---

## Styled Components in React Native

Using styled-components for more maintainable styling:

```tsx
import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';

// Basic styled components
const Container = styled.View`
  flex: 1;
  background-color: #f5f5f5;
  padding: 16px;
`;

const Title = styled.Text`
  font-size: 24px;
  font-weight: bold;
  color: #333;
  margin-bottom: 16px;
  text-align: center;
`;

const Card = styled.View`
  background-color: white;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 16px;
  shadow-color: #000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.1;
  shadow-radius: 4px;
  elevation: 2;
`;

// Styled component with props
const Button = styled.TouchableOpacity<{ primary?: boolean }>`
  background-color: ${props => props.primary ? '#3498db' : '#95a5a6'};
  padding: 12px 16px;
  border-radius: 6px;
  align-items: center;
  margin-vertical: 8px;
`;

const ButtonText = styled.Text<{ primary?: boolean }>`
  color: white;
  font-weight: ${props => props.primary ? 'bold' : 'normal'};
  font-size: 16px;
`;

// Extended component
const PrimaryButton = styled(Button).attrs({ primary: true })`
  margin-top: 16px;
`;

// Component with multiple variations
interface PillProps {
  variant?: 'success' | 'warning' | 'danger' | 'info';
}

const Pill = styled.View<PillProps>`
  border-radius: 20px;
  padding: 6px 12px;
  margin-right: 8px;
  background-color: ${props => {
    switch(props.variant) {
      case 'success': return '#2ecc71';
      case 'warning': return '#f1c40f';
      case 'danger': return '#e74c3c';
      case 'info':
      default: return '#3498db';
    }
  }};
`;

const PillText = styled.Text`
  color: white;
  font-size: 12px;
  font-weight: 500;
`;

// Medication list item with styled-components
const MedicationItem = styled.View`
  flex-direction: row;
  align-items: center;
  padding: 16px 0;
  border-bottom-width: 1px;
  border-bottom-color: #eee;
`;

const MedicationIcon = styled.View`
  width: 40px;
  height: 40px;
  border-radius: 20px;
  background-color: #f0f8ff;
  justify-content: center;
  align-items: center;
  margin-right: 12px;
`;

const MedicationIconText = styled.Text`
  font-size: 20px;
`;

const MedicationDetails = styled.View`
  flex: 1;
`;

const MedicationName = styled.Text`
  font-size: 16px;
  font-weight: 600;
  color: #333;
`;

const MedicationDosage = styled.Text`
  font-size: 14px;
  color: #666;
  margin-top: 4px;
`;

const PillRow = styled.View`
  flex-direction: row;
  margin-top: 8px;
`;

function StyledComponentsExample() {
  return (
    <Container>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Title>Pharmacy App</Title>
        
        <Card>
          <Title style={{ fontSize: 18, marginBottom: 8 }}>My Medications</Title>
          
          <MedicationItem>
            <MedicationIcon>
              <MedicationIconText>💊</MedicationIconText>
            </MedicationIcon>
            <MedicationDetails>
              <MedicationName>Amoxicillin</MedicationName>
              <MedicationDosage>Take 1 tablet three times daily</MedicationDosage>
              <PillRow>
                <Pill variant="info">
                  <PillText>Antibiotic</PillText>
                </Pill>
                <Pill variant="warning">
                  <PillText>With food</PillText>
                </Pill>
              </PillRow>
            </MedicationDetails>
          </MedicationItem>
          
          <MedicationItem>
            <MedicationIcon>
              <MedicationIconText>💊</MedicationIconText>
            </MedicationIcon>
            <MedicationDetails>
              <MedicationName>Lisinopril</MedicationName>
              <MedicationDosage>Take 1 tablet daily in the morning</MedicationDosage>
              <PillRow>
                <Pill variant="danger">
                  <PillText>Blood Pressure</PillText>
                </Pill>
              </PillRow>
            </MedicationDetails>
          </MedicationItem>
          
          <Button primary onPress={() => console.log('Add medication')}>
            <ButtonText primary>Add Medication</ButtonText>
          </Button>
        </Card>
        
        <Card>
          <Title style={{ fontSize: 18, marginBottom: 8 }}>Actions</Title>
          <Button primary onPress={() => console.log('Refill prescriptions')}>
            <ButtonText primary>Refill Prescriptions</ButtonText>
          </Button>
          <Button onPress={() => console.log('Set reminders')}>
            <ButtonText>Set Medication Reminders</ButtonText>
          </Button>
          <Button onPress={() => console.log('Contact pharmacy')}>
            <ButtonText>Contact Pharmacy</ButtonText>
          </Button>
        </Card>
        
        <PrimaryButton onPress={() => console.log('Emergency')}>
          <ButtonText primary>Emergency Contact</ButtonText>
        </PrimaryButton>
      </ScrollView>
    </Container>
  );
}

export default StyledComponentsExample;
```

<blockquote><details>

Styled Components offers a powerful alternative to React Native's built-in StyleSheet API by bringing CSS-in-JS styling to mobile development. This library enables developers to create component-specific styles with the full power of JavaScript, resulting in more maintainable and reusable UI code. The example demonstrates how styled-components can enhance the styling experience in React Native applications using a pharmacy app interface.

The fundamental concept of styled-components is the creation of styled UI elements that encapsulate their appearance and behavior. The example begins by defining basic building blocks like `Container`, `Title`, and `Card` - each combining a React Native component with its associated styles. This approach creates a clear connection between components and their styles, eliminating the need to manually match style objects with components as in the traditional StyleSheet approach.

One of the most powerful features demonstrated is the ability to create components that accept props to modify their appearance. The `Button` component uses a `primary` prop to conditionally apply different background colors. This dynamic styling capability enables the creation of versatile components that can adapt to different contexts while maintaining a consistent API. The TypeScript integration with `<{ primary?: boolean }>` ensures type safety for these props.

The example also showcases component composition and extension through:

1. **Component inheritance**: `PrimaryButton` extends the base `Button` component, inheriting all its styles and behavior while adding additional styling and default props through the `.attrs()` method.

2. **Prop-based variations**: The `Pill` component demonstrates how to create a single component with multiple visual variations based on a `variant` prop. This approach is particularly valuable for design systems where you need multiple visually distinct versions of the same basic component.

The medication list implementation demonstrates how styled-components can create semantic, meaningful component hierarchies with tailored styles. Each part of the medication item has a dedicated styled component (`MedicationItem`, `MedicationIcon`, `MedicationDetails`, etc.), making the structure clear and maintainable. This approach also allows for easy reuse throughout the application.

There are several key advantages of using styled-components in React Native development:

1. **Component-centric styling**: Styles are defined alongside the components they affect, creating a clear connection between UI elements and their appearance.

2. **Dynamic styling with props**: Components can adapt their appearance based on props, enabling more flexible and reusable components.

3. **Theming support**: While not shown in this example, styled-components provides robust theming capabilities, allowing applications to implement dark/light modes or other theme variations.

4. **Composable styles**: Styled components can extend other styled components, enabling the creation of component hierarchies with inherited styles.

5. **Cleaner components**: By extracting styling into styled components, the main component logic becomes cleaner and more focused on behavior rather than appearance.

6. **CSS-like syntax**: The template literal syntax will be familiar to web developers accustomed to CSS, making the transition to React Native styling more intuitive.

It's worth noting some important considerations when using styled-components in React Native:

1. **Performance**: While performance has improved in recent versions, deeply nested styled components can impact render performance. In performance-critical screens, traditional StyleSheet may still be preferred.

2. **Bundle size**: Styled-components adds to your application bundle size, though this is typically outweighed by the maintainability benefits.

3. **React Native specificity**: Always ensure you're importing from 'styled-components/native' rather than the base package to get components specifically designed for React Native.

The pharmacy app example demonstrates how styled-components can enhance the development experience by creating a more intuitive relationship between components and their styles while enabling greater flexibility through prop-based styling variations.

</details></blockquote>

---

## Shadow and Elevation

Creating depth in your UI with platform-specific shadows:

```tsx
import React from 'react';
import { 
  View, Text, StyleSheet, 
  ScrollView, Platform
} from 'react-native';

function ShadowExample() {
  // Shadow utility function
  const createShadow = (elevation: number) => {
    return Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: elevation/2 },
        shadowOpacity: 0.3,
        shadowRadius: elevation,
      },
      android: {
        elevation,
      },
    });
  };
  
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Shadow and Elevation</Text>
      
      <View style={styles.row}>
        <View style={[styles.card, styles.shadowSmall]}>
          <Text style={styles.cardTitle}>Low Shadow</Text>
          <Text style={styles.pill}>Ibuprofen</Text>
        </View>
        
        <View style={[styles.card, styles.shadowMedium]}>
          <Text style={styles.cardTitle}>Medium Shadow</Text>
          <Text style={styles.pill}>Metformin</Text>
        </View>
      </View>
      
      <View style={[styles.card, styles.shadowLarge]}>
        <Text style={styles.cardTitle}>Large Shadow</Text>
        <Text>Medication information card with pronounced shadow for emphasis</Text>
      </View>
      
      {/* Shadow examples with different elevations */}
      <Text style={styles.sectionTitle}>Elevation Examples</Text>
      <View style={styles.elevationRow}>
        {[1, 2, 4, 8, 16, 24].map(elevation => (
          <View 
            key={elevation}
            style={[
              styles.elevationBox,
              createShadow(elevation)
            ]}
          >
            <Text style={styles.elevationText}>{elevation}</Text>
          </View>
        ))}
      </View>
      
      {/* Medical card with proper shadows */}
      <Text style={styles.sectionTitle}>Medical Card Example</Text>
      <View style={[styles.medCard, styles.shadowMedium]}>
        <View style={styles.medCardHeader}>
          <Text style={styles.medCardTitle}>Prescription</Text>
        </View>
        <View style={styles.medCardBody}>
          <Text style={styles.medName}>Amoxicillin 500mg</Text>
          <Text style={styles.medInstructions}>
            Take 1 capsule by mouth 3 times daily for 10 days
          </Text>
          <View style={styles.divider} />
          <View style={styles.medMetaRow}>
            <Text style={styles.medMeta}>Qty: 30</Text>
            <Text style={styles.medMeta}>Refills: 0</Text>
          </View>
        </View>
        <View style={[styles.medCardFooter, styles.shadowSmall]}>
          <Text style={styles.footerText}>Expires: 12/31/2023</Text>
        </View>
      </View>
      
      {/* Floating Action Button */}
      <View style={styles.fabContainer}>
        <View style={[styles.fab, styles.shadowLarge]}>
          <Text style={styles.fabIcon}>+</Text>
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
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    width: '48%',
  },
  shadowSmall: Platform.select({
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
  shadowMedium: Platform.select({
    ios: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
    },
    android: {
      elevation: 5,
    },
  }),
  shadowLarge: Platform.select({
    ios: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 4.65,
    },
    android: {
      elevation: 10,
    },
  }),
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  pill: {
    alignSelf: 'flex-start',
    backgroundColor: '#e1f5fe',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 12,
    color: '#0288d1',
    fontSize: 12,
    fontWeight: '500',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 24,
    marginBottom: 16,
  },
  elevationRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
  },
  elevationBox: {
    width: 60,
    height: 60,
    backgroundColor: 'white',
    borderRadius: 4,
    margin: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  elevationText: {
    fontSize: 16,
    fontWeight: '500',
  },
  medCard: {
    backgroundColor: 'white',
    borderRadius: 8,
    overflow: 'hidden',
    marginBottom: 24,
  },
  medCardHeader: {
    backgroundColor: '#3498db',
    padding: 16,
  },
  medCardTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  medCardBody: {
    padding: 16,
  },
  medName: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  medInstructions: {
    fontSize: 14,
    color: '#555',
    marginBottom: 16,
  },
  divider: {
    height: 1,
    backgroundColor: '#eee',
    marginVertical: 8,
  },
  medMetaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  medMeta: {
    color: '#777',
    fontSize: 14,
  },
  medCardFooter: {
    padding: 12,
    backgroundColor: '#f9f9f9',
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  footerText: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
  fabContainer: {
    position: 'relative',
    height: 70,
    alignItems: 'center',
  },
  fab: {
    position: 'absolute',
    bottom: 0,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#3498db',
    justifyContent: 'center',
    alignItems: 'center',
  },
  fabIcon: {
    fontSize: 24,
    color: 'white',
    fontWeight: 'bold',
  },
});
```

<blockquote><details>

Shadow and elevation effects are essential design elements that create depth and hierarchy in mobile interfaces, helping users understand the relationship between different UI components. However, implementing consistent shadows across iOS and Android presents challenges due to fundamental differences in how these platforms handle depth effects. This example demonstrates effective approaches for creating cross-platform shadow effects in React Native.

The key difference between platforms is that iOS uses a true shadow rendering system with properties like `shadowColor`, `shadowOffset`, `shadowOpacity`, and `shadowRadius` to create realistic shadows, while Android uses a simpler `elevation` property that applies a uniform shadow effect. The example addresses this through platform-specific styling using `Platform.select()`.

The `createShadow` utility function demonstrates a reusable approach to shadow creation, taking a numeric elevation value and returning appropriate shadow properties for each platform. This approach allows developers to think in terms of a unified "elevation" concept while letting the function handle the platform-specific implementation details. For iOS, it calculates proportional shadow values, while for Android it directly applies the elevation value.

The example showcases three standard shadow intensities:
- **Low Shadow** (`shadowSmall`): Subtle shadows suitable for less prominent UI elements
- **Medium Shadow** (`shadowMedium`): Moderate shadows appropriate for most cards and containers
- **Large Shadow** (`shadowLarge`): Pronounced shadows for elements that need to appear elevated or interactive, like the floating action button

The "Elevation Examples" section displays a progression of elevation values from 1 to 24, showing how increasing elevation creates a stronger sense of height above the surface. This visual demonstration helps designers and developers choose appropriate elevation values for different UI components.

The medical prescription card demonstrates how shadows enhance the visual hierarchy of complex components:
1. The card itself uses a medium shadow to stand out from the background
2. The footer has a subtle shadow to create a sense of layering within the card
3. The rounded corners complement the shadow effect, enhancing the card-like appearance

The Floating Action Button (FAB) showcases how significant elevation creates a hovering effect, signaling to users that this is an important, interactive element that floats above the rest of the interface. The large shadow differentiates it from standard UI elements.

Some key best practices for shadow implementation demonstrated in this example:

1. **Platform adaptation**: Always use `Platform.select()` to provide appropriate shadow implementations for each platform
2. **Shadow consistency**: Create a system of standard shadow levels and reuse them consistently
3. **Purposeful elevation**: Apply shadow depth intentionally to reflect the information hierarchy
4. **Material Design inspiration**: The elevation values (2, 5, 10) follow principles from Material Design guidelines
5. **Performance consideration**: Shadows can impact rendering performance, so use them judiciously

Shadow effects can significantly enhance the usability of an application by:
- Creating visual hierarchy, helping users understand what elements are most important
- Providing depth cues that separate interactive elements from static content
- Defining spatial relationships between components
- Improving the perceived quality and polish of the user interface

The prescription card example specifically demonstrates how shadows can improve medical application interfaces by creating clear visual separation between different medications and emphasizing important information. The card's elevated appearance makes it easy to distinguish from the background, improving information scanning and readability.

When implementing shadows in your own applications, remember that the goal is to create subtle, realistic effects that enhance usability rather than distracting decorations. Well-implemented shadows should support the user experience without calling attention to themselves.

</details></blockquote>

---

## Advanced Styling Techniques

Combining multiple styling approaches for complex UIs:

```tsx
import React, { useState } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity,
  ScrollView, TextInput, Switch, Platform
} from 'react-native';
import styled from 'styled-components/native';

// Styled components
const Container = styled.View`
  flex: 1;
  background-color: #f5f5f5;
`;

const Header = styled.View`
  padding: 16px;
  background-color: #3498db;
  align-items: center;
`;

const HeaderText = styled.Text`
  color: white;
  font-size: 20px;
  font-weight: bold;
`;

// Theme constants
const THEME = {
  colors: {
    primary: '#3498db',
    secondary: '#2ecc71',
    danger: '#e74c3c',
    warning: '#f39c12',
    text: '#333',
    lightText: '#777',
    border: '#ddd',
    background: '#f5f5f5',
    card: '#fff',
  },
  spacing: {
    small: 8,
    medium: 16,
    large: 24,
  },
  fontSizes: {
    small: 12,
    medium: 16,
    large: 20,
    xlarge: 24,
  },
  borderRadius: {
    small: 4,
    medium: 8,
    large: 12,
  },
  shadow: {
    small: Platform.select({
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
    medium: Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
      },
      android: {
        elevation: 4,
      },
    }),
  },
};

function AdvancedStylingExample() {
  const [darkMode, setDarkMode] = useState(false);
  const [reminderEnabled, setReminderEnabled] = useState(true);
  
  // Dynamic theme based on dark mode state
  const theme = {
    ...THEME,
    colors: {
      ...THEME.colors,
      background: darkMode ? '#121212' : THEME.colors.background,
      card: darkMode ? '#1e1e1e' : THEME.colors.card,
      text: darkMode ? '#f5f5f5' : THEME.colors.text,
      lightText: darkMode ? '#bbbbbb' : THEME.colors.lightText,
      border: darkMode ? '#333' : THEME.colors.border,
    }
  };
  
  // Medication data
  const medications = [
    { id: 1, name: 'Amoxicillin', dosage: '500mg', schedule: 'Every 8 hours', color: '#e74c3c' },
    { id: 2, name: 'Lisinopril', dosage: '10mg', schedule: 'Once daily', color: '#3498db' },
    { id: 3, name: 'Metformin', dosage: '1000mg', schedule: 'Twice daily with meals', color: '#2ecc71' },
  ];
  
  return (
    <Container style={{ backgroundColor: theme.colors.background }}>
      <Header>
        <HeaderText>My Medications</HeaderText>
      </Header>
      
      <ScrollView style={styles.content}>
        {/* Settings Card - StyleSheet + Inline + Theme */}
        <View style={[
          styles.card, 
          { backgroundColor: theme.colors.card },
          theme.shadow.medium
        ]}>
          <Text style={[styles.cardTitle, { color: theme.colors.text }]}>
            Settings
          </Text>
          
          <View style={styles.setting}>
            <Text style={[styles.settingText, { color: theme.colors.text }]}>
              Dark Mode
            </Text>
            <Switch
              value={darkMode}
              onValueChange={setDarkMode}
              trackColor={{ false: '#767577', true: '#81b0ff' }}
              thumbColor={darkMode ? '#3498db' : '#f4f3f4'}
            />
          </View>
          
          <View style={styles.setting}>
            <Text style={[styles.settingText, { color: theme.colors.text }]}>
              Medication Reminders
            </Text>
            <Switch
              value={reminderEnabled}
              onValueChange={setReminderEnabled}
              trackColor={{ false: '#767577', true: '#81b0ff' }}
              thumbColor={reminderEnabled ? '#3498db' : '#f4f3f4'}
            />
          </View>
        </View>
        
        {/* Search - StyleSheet + Theme */}
        <View style={[
          styles.searchContainer, 
          { backgroundColor: theme.colors.card },
          theme.shadow.small
        ]}>
          <TextInput
            style={[styles.searchInput, { 
              backgroundColor: darkMode ? '#333' : '#f0f0f0',
              color: theme.colors.text,
              borderColor: theme.colors.border
            }]}
            placeholder="Search medications..."
            placeholderTextColor={theme.colors.lightText}
          />
        </View>
        
        {/* Medication Cards - Mixed Styling */}
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
          Current Medications
        </Text>
        
        {medications.map(med => (
          <View 
            key={med.id}
            style={[
              styles.medCard, 
              { backgroundColor: theme.colors.card },
              theme.shadow.small
            ]}
          >
            <View style={[styles.medColor, { backgroundColor: med.color }]} />
            <View style={styles.medContent}>
              <Text style={[styles.medName, { color: theme.colors.text }]}>
                {med.name}
              </Text>
              <Text style={[styles.medDetails, { color: theme.colors.lightText }]}>
                {med.dosage} • {med.schedule}
              </Text>
              
              <View style={styles.actionRow}>
                <TouchableOpacity 
                  style={[styles.button, { backgroundColor: THEME.colors.primary }]}
                >
                  <Text style={styles.buttonText}>Take</Text>
                </TouchableOpacity>
                
                <TouchableOpacity 
                  style={[styles.button, { backgroundColor: THEME.colors.secondary }]}
                >
                  <Text style={styles.buttonText}>Remind</Text>
                </TouchableOpacity>
                
                <TouchableOpacity 
                  style={[styles.button, { backgroundColor: THEME.colors.warning }]}
                >
                  <Text style={styles.buttonText}>Skip</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>
    </Container>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    padding: THEME.spacing.medium,
  },
  card: {
    borderRadius: THEME.borderRadius.medium,
    padding: THEME.spacing.medium,
    marginBottom: THEME.spacing.medium,
  },
  cardTitle: {
    fontSize: THEME.fontSizes.large,
    fontWeight: 'bold',
    marginBottom: THEME.spacing.medium,
  },
  setting: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: THEME.spacing.small,
  },
  settingText: {
    fontSize: THEME.fontSizes.medium,
  },
  searchContainer: {
    borderRadius: THEME.borderRadius.medium,
    overflow: 'hidden',
    marginBottom: THEME.spacing.medium,
  },
  searchInput: {
    padding: THEME.spacing.medium,
    fontSize: THEME.fontSizes.medium,
    borderWidth: 1,
  },
  sectionTitle: {
    fontSize: THEME.fontSizes.large,
    fontWeight: 'bold',
    marginBottom: THEME.spacing.medium,
  },
  medCard: {
    borderRadius: THEME.borderRadius.medium,
    marginBottom: THEME.spacing.medium,
    flexDirection: 'row',
    overflow: 'hidden',
  },
  medColor: {
    width: 12,
  },
  medContent: {
    flex: 1,
    padding: THEME.spacing.medium,
  },
  medName: {
    fontSize: THEME.fontSizes.medium,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  medDetails: {
    fontSize: THEME.fontSizes.small,
    marginBottom: THEME.spacing.medium,
  },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  button: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: THEME.borderRadius.small,
    marginRight: 8,
  },
  buttonText: {
    color: 'white',
    fontSize: THEME.fontSizes.small,
    fontWeight: '500',
  },
});
```

<blockquote><details>

Advanced styling in React Native often combines multiple approaches to achieve complex, maintainable, and flexible UI systems. This example demonstrates how to create a sophisticated medication tracking interface by integrating StyleSheet objects, styled-components, theming, dynamic styling, and conditional rendering. Each technique has specific strengths, and using them in combination allows developers to leverage the best approach for each UI challenge.

The example is organized around a central theme system implemented as a JavaScript object (`THEME`). This theme-based approach provides several advantages:

1. **Centralized design tokens**: Core values like colors, spacing, font sizes, and border radii are defined in one place, making it easy to maintain design consistency throughout the application.

2. **Design system implementation**: By referencing theme values rather than hardcoding style values, the interface naturally follows design system principles, ensuring visual coherence.

3. **Easy customization**: The theme system makes it simple to implement features like dark mode by swapping out color palettes while maintaining the same component structure.

The dark mode implementation demonstrates dynamic theming in action. When a user toggles the dark mode switch:
1. A new theme object is created that overrides specific color values
2. Components reference this dynamic theme object for their styling
3. The interface updates to reflect the new color scheme while maintaining layout and structure

Several styling approaches are showcased in the example:

**Styled Components** are used for the container and header elements, demonstrating how this library creates reusable, styled building blocks with CSS-like syntax. These components encapsulate their styling and can be composed to create complex interfaces.

**StyleSheet API** powers most of the component styles, organized in a traditional React Native styles object. This approach offers excellent performance and static typing benefits. The styles reference theme constants rather than hardcoded values, connecting them to the design system.

**Inline Styles** are used sparingly for dynamic properties that need to change based on state (like dark mode). By combining StyleSheet styles with inline overrides through array syntax (`[styles.card, { backgroundColor: theme.colors.card }]`), the example achieves both performance and flexibility.

**Conditional Styling** is applied throughout the interface, particularly in the dark mode implementation. The switch between light and dark themes demonstrates how React Native can create adaptive interfaces that respond to user preferences.

**Platform-Specific Styling** is handled through the theme's shadow implementation, which provides different shadow properties for iOS and Android platforms, ensuring consistent appearance across devices.

The medication card components showcase how these approaches can be combined in a single component:
1. The card structure uses StyleSheet styles for layout
2. Theme values provide colors and spacing
3. Conditional styling changes appearance based on the dark mode state
4. Each medication has a color-coded indicator, demonstrating component-specific styling

This example also demonstrates several best practices for React Native styling:

1. **Component-based organization**: Each logical UI section is implemented as a discrete component with its own styling.

2. **Responsive layout**: Flexbox is used extensively to create layouts that adapt to available space.

3. **Visual hierarchy**: Colors, shadows, and spacing work together to create clear visual relationships between elements.

4. **Performance considerations**: StyleSheet is used for static styles, while inline styles are limited to dynamic properties.

5. **Maintainability**: By centralizing style values in a theme object, the code becomes more maintainable as changes can be made in one place.

In a production application, this approach could be extended further with:
- A more sophisticated theming system that supports multiple theme variants
- Context API integration to make theme values available throughout the component tree
- A comprehensive style guide component library
- Integration with design token systems from tools like Figma

The combination of these styling approaches creates a flexible, maintainable system that can evolve with the application while maintaining visual consistency and performance. By thoughtfully choosing the right styling technique for each situation, developers can create sophisticated interfaces that are both beautiful and functional across the diverse ecosystem of mobile devices.

</details></blockquote>

---

