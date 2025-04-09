# Exercise: Basic Component Creation

**Related Topic**: React Native Fundamentals
**Duration**: 15-20 minutes

## Introduction

This exercise will help you practice creating a basic React Native component with TypeScript typing. You'll build a `MedicationCard` component that displays medication information in a visually appealing card format. This is a fundamental skill that you'll use throughout your React Native development journey.

## Learning Objectives

By completing this exercise, you will:
- Create a React Native functional component with TypeScript props
- Apply styling using StyleSheet
- Implement proper accessibility attributes
- Practice using core React Native components (View, Text, etc.)

## Prerequisites

- Basic understanding of React concepts (components, props)
- Basic understanding of TypeScript interfaces
- Familiarity with StyleSheet in React Native

## Pharmacy Theme Integration

This exercise creates a component for displaying medication information, which is a core element in pharmacy applications. The `MedicationCard` component will be reused throughout the SpeedyMeds application to display consistent medication information to users.

## Exercise Steps

### 1. Create the Component File

Create a new file named `MedicationCard.tsx` in your project's components directory.

### 2. Define the TypeScript Interface

At the top of your file, create an interface to define the props for your component:

```typescript
import React from 'react';
import { View, Text, StyleSheet, Image, ViewStyle } from 'react-native';

/**
 * Properties for the MedicationCard component
 */
interface MedicationCardProps {
  /** Name of the medication */
  name: string;
  /** Dosage information (e.g., "10mg") */
  dosage: string;
  /** Frequency of administration (e.g., "Twice daily") */
  frequency: string;
  /** URL to the medication's image */
  imageUrl?: string;
  /** Optional custom style for the container */
  style?: ViewStyle;
}
```

### 3. Create the Functional Component

Implement the component using the interface you defined:

```typescript
/**
 * MedicationCard displays medication information in a card format
 * 
 * @param props The component properties
 * @returns A styled card component displaying medication information
 */
const MedicationCard: React.FC<MedicationCardProps> = ({
  name,
  dosage,
  frequency,
  imageUrl,
  style,
}) => {
  return (
    <View 
      style={[styles.container, style]}
      accessible={true}
      accessibilityRole="button"
      accessibilityLabel={`Medication ${name}, ${dosage}, ${frequency}`}
      accessibilityHint="Displays medication information"
    >
      <View style={styles.contentContainer}>
        <Text style={styles.nameText}>{name}</Text>
        <Text style={styles.dosageText}>{dosage}</Text>
        <Text style={styles.frequencyText}>{frequency}</Text>
      </View>
      {imageUrl && (
        <Image 
          source={{ uri: imageUrl }} 
          style={styles.image}
          accessible={true}
          accessibilityLabel={`Image of ${name}`}
        />
      )}
    </View>
  );
};
```

### 4. Add Styling with StyleSheet

Add styles to make your component visually appealing:

```typescript
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: '#ffffff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  contentContainer: {
    flex: 1,
  },
  nameText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 4,
  },
  dosageText: {
    fontSize: 16,
    color: '#555555',
    marginBottom: 4,
  },
  frequencyText: {
    fontSize: 14,
    color: '#777777',
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 4,
    marginLeft: 12,
  },
});

export default MedicationCard;
```

### 5. Test Your Component

Create a simple test implementation to see your component in action:

```typescript
// In your App.tsx or another component file
import MedicationCard from './components/MedicationCard';

// Example usage
export default function App() {
  return (
    <View style={{ flex: 1, padding: 20, paddingTop: 40 }}>
      <MedicationCard
        name="Lisinopril"
        dosage="10mg"
        frequency="Once daily"
        imageUrl="https://example.com/lisinopril.jpg"
      />
      <MedicationCard
        name="Metformin"
        dosage="500mg"
        frequency="Twice daily with meals"
        style={{ backgroundColor: '#f0f8ff' }}
      />
    </View>
  );
}
```

## Developer Path Adaptations

### For Native Developers

If you're coming from native development, pay attention to how React Native's StyleSheet API differs from UIKit or Android styling. Note that styles don't cascade like CSS - they're applied as discrete objects to components. Also notice how the component composition pattern differs from view controller hierarchies in UIKit or activities/fragments in Android.

### For Web Developers

If you're coming from web development, note that React Native doesn't use HTML tags or CSS classes. Style properties use camelCase (e.g., `backgroundColor` instead of `background-color`), and not all CSS properties are available. The `Image` component has different behavior than HTML's `img` tag, requiring explicit dimensions.

## Testing Your Knowledge

1. What happens if you don't provide an `imageUrl` prop to the `MedicationCard` component?
2. How would you modify the component to display a placeholder image when no image URL is provided?
3. What accessibility considerations does the component implement?
4. How would you add a press handler to make the card interactive?
5. Why is TypeScript interface documentation important for reusable components?

## Challenge

Enhance the `MedicationCard` component by:

1. Adding a status indicator that shows whether the medication is active or inactive
2. Implementing a touch interaction that shows additional details when pressed
3. Adding proper error handling for the image loading
4. Making the card's appearance adapt to light/dark mode

## Solution

The complete solution code is available in the course repository. Remember to try implementing the component yourself before looking at the solution!

## Resources

- [React Native StyleSheet Documentation](https://reactnative.dev/docs/stylesheet)
- [React Native View Documentation](https://reactnative.dev/docs/view)
- [React Native Accessibility](https://reactnative.dev/docs/accessibility)
- [TypeScript React Components](https://www.typescriptlang.org/docs/handbook/react.html)