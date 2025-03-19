# Exercise: Create a Medication Card Component

**Duration:** 15-20 minutes  
**Module:** 1 - React Native Fundamentals  
**Section:** Components and JSX

## Objective

Practice creating a basic React Native component with proper styling and documentation. This exercise will help you understand the component structure, JSX syntax, and styling in React Native.

## Prerequisites

- Basic understanding of React Native components
- Familiarity with JSX syntax
- Knowledge of StyleSheet in React Native

## Instructions

1. Create a new file called `MedicationCard.tsx` in your project.

2. Import the necessary components from React Native:

```typescript
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
```

3. Create a TypeScript interface for the component props:

```typescript
/**
 * Props for the MedicationCard component
 */
interface MedicationCardProps {
  /** The name of the medication */
  name: string;
  /** The category of the medication (e.g., "Pain Relief", "Antibiotic") */
  category: string;
  /** The expiration date of the medication */
  expirationDate: string;
}
```

4. Create the `MedicationCard` component with JSDoc documentation:

```typescript
/**
 * A component that displays medication information in a card format
 * 
 * This component shows the medication name, category, and expiration date
 * in a visually appealing card layout.
 * 
 * @param props - The component props
 * @returns A React component
 */
const MedicationCard: React.FC<MedicationCardProps> = ({ 
  name, 
  category, 
  expirationDate 
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.category}>{category}</Text>
      <Text style={styles.expiration}>Expires: {expirationDate}</Text>
    </View>
  );
};
```

5. Create the StyleSheet for the component:

```typescript
const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    marginVertical: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#3498db',
    // Add shadow for iOS
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    // Add elevation for Android
    elevation: 2,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#2c3e50',
  },
  category: {
    fontSize: 16,
    color: '#3498db',
    marginBottom: 8,
  },
  expiration: {
    fontSize: 14,
    color: '#7f8c8d',
  },
});
```

6. Export the component:

```typescript
export default MedicationCard;
```

7. Test your component by creating a sample implementation:

```typescript
// In your App.tsx or another component file
import MedicationCard from './MedicationCard';

// Inside your render function
<MedicationCard 
  name="Ibuprofen" 
  category="Pain Relief" 
  expirationDate="12/31/2025" 
/>
```

## Expected Output

Your component should render a card that displays:
- The medication name in bold
- The category in blue
- The expiration date in gray
- The card should have a blue border on the left side
- The card should have a subtle shadow effect

## Tips

- Make sure to use semantic naming for your style properties
- Consider how the component might be reused in different contexts
- Use TypeScript interfaces to clearly define the expected props
- Include comprehensive JSDoc comments to document your component
- Test with different data to ensure the component handles various text lengths

## Platform-Specific Notes

### Android Developers
The `elevation` property in the styles is similar to the elevation concept in Material Design. It creates a shadow effect based on the value provided.

### iOS Developers
The shadow properties (`shadowColor`, `shadowOffset`, etc.) work similarly to CALayer shadow properties in UIKit.

### React Developers
This component follows the same functional component pattern you're familiar with from React for web, but uses React Native's specific components like `View` and `Text` instead of HTML elements.

### Angular Developers
Unlike Angular components that use templates and component decorators, React Native components combine the template (JSX) and component logic in the same file.

## Learning Path Notes

### Instructor-Led
Instructors should walk through this exercise step by step, explaining each part of the component. Highlight the differences between React Native and web development.

### Self-Led
Take your time to understand each part of the component. Try modifying the styles to see how changes affect the appearance.

### Asynchronous
Focus on the parts most relevant to your current needs. If you're already familiar with React components, pay special attention to the React Native-specific styling.

## Additional Resources

- [React Native View Documentation](https://reactnative.dev/docs/view)
- [React Native Text Documentation](https://reactnative.dev/docs/text)
- [React Native StyleSheet Documentation](https://reactnative.dev/docs/stylesheet)
- [TypeScript in React Native](https://reactnative.dev/docs/typescript)
