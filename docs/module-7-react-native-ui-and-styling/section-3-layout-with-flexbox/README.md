# Section 3: Layout with Flexbox

## Learning Objectives
After completing this section, you will be able to:
- Implement flexible layouts using Flexbox in React Native
- Apply flexbox properties to create responsive designs
- Understand the differences between React Native's Flexbox and web CSS Flexbox
- Build complex layouts using nested flex containers
- Solve common layout challenges with appropriate flexbox patterns

**Prerequisite Knowledge**: Styling Fundamentals (Section 2)
**Estimated Time**: 1.5-2 hours

## Introduction to Flexbox in React Native

Flexbox is the primary layout system in React Native. It provides a powerful and flexible way to arrange components in a container, even when their size is unknown or dynamic. While React Native's implementation of Flexbox is based on the web standard, there are some important differences to be aware of.

### Flexbox Basics

At its core, Flexbox is a one-dimensional layout model that works with rows or columns. It distributes space and aligns items in a container to create powerful layouts.

```jsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const FlexBasic = () => (
  <View style={styles.container}>
    <Text style={styles.box}>Box 1</Text>
    <Text style={styles.box}>Box 2</Text>
    <Text style={styles.box}>Box 3</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#f5f5f5',
  },
  box: {
    height: 50,
    width: 50,
    backgroundColor: '#2196F3',
    margin: 5,
    textAlign: 'center',
    textAlignVertical: 'center',
    color: 'white',
  },
});
```

> 💡 **Deep Dive**: React Native's Flexbox implementation uses the Yoga layout engine, a cross-platform layout engine designed specifically for React Native to ensure consistent behavior across iOS and Android.

### Key Differences from Web Flexbox

1. **Default Values**: In React Native, containers have `flexDirection: 'column'` by default (web is `row`)
2. **flex Property**: The `flex` property works differently - in React Native, it's a number representing the proportion of space an item should take
3. **No Flexbox Gap**: React Native doesn't support the `gap`, `row-gap`, or `column-gap` properties (use margins instead)
4. **Unitless Values**: All dimension values are unitless and represent density-independent pixels
5. **Limited Support**: Some properties like `flex-basis` have limited support

### Main Flexbox Properties

#### Flex Container Properties

These properties are applied to the container:

1. **flexDirection**: Defines the primary axis (how children are placed)
   - `row`: Children are placed left to right
   - `column`: Children are placed top to bottom (default)
   - `row-reverse`: Children are placed right to left
   - `column-reverse`: Children are placed bottom to top

```jsx
const styles = StyleSheet.create({
  rowContainer: {
    flexDirection: 'row',
    // Children will be laid out horizontally
  },
  columnContainer: {
    flexDirection: 'column',
    // Children will be laid out vertically (default)
  },
});
```

2. **justifyContent**: Aligns children along the primary axis
   - `flex-start`: Items align at the start (default)
   - `flex-end`: Items align at the end
   - `center`: Items align at the center
   - `space-between`: Items are evenly distributed; first item is at the start, last item at the end
   - `space-around`: Items are evenly distributed with equal space around them
   - `space-evenly`: Items are evenly distributed with equal space between them

```jsx
const styles = StyleSheet.create({
  spaceBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // Children will have space between them
  },
  centered: {
    justifyContent: 'center',
    // Children will be centered on the primary axis
  },
});
```

3. **alignItems**: Aligns children along the cross axis
   - `stretch`: Items stretch to fill the container (default)
   - `flex-start`: Items align at the start
   - `flex-end`: Items align at the end
   - `center`: Items align at the center
   - `baseline`: Items align at their baselines

```jsx
const styles = StyleSheet.create({
  centered: {
    alignItems: 'center',
    // Children will be centered on the cross axis
  },
  stretched: {
    alignItems: 'stretch',
    // Children will stretch to fill the container on the cross axis
  },
});
```

4. **flexWrap**: Controls whether children can wrap to new lines
   - `nowrap`: Children won't wrap (default)
   - `wrap`: Children will wrap to new lines if needed
   - `wrap-reverse`: Children will wrap to new lines in reverse

```jsx
const styles = StyleSheet.create({
  wrappingContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    // Children will wrap to new lines when needed
  },
});
```

5. **alignContent**: Aligns rows/columns of wrapped content along the cross axis
   - Only has an effect when `flexWrap: 'wrap'` and there are multiple lines
   - Options: `flex-start`, `flex-end`, `center`, `stretch`, `space-between`, `space-around`

```jsx
const styles = StyleSheet.create({
  wrappingContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignContent: 'space-between',
    // Multiple rows will have space between them
  },
});
```

#### Flex Item Properties

These properties are applied to the child items:

1. **flex**: Defines how an item grows or shrinks to fill available space
   - A positive number represents the proportion of space an item should take relative to siblings
   - For example, an item with `flex: 2` will take twice as much space as an item with `flex: 1`

```jsx
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  smallBox: {
    flex: 1,
    // Takes 1 part of the available space
  },
  largeBox: {
    flex: 2,
    // Takes 2 parts of the available space
  },
});
```

2. **alignSelf**: Overrides the parent's `alignItems` property for a specific child
   - Options: `auto`, `flex-start`, `flex-end`, `center`, `stretch`, `baseline`

```jsx
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'flex-start',
  },
  defaultAligned: {
    // Will be aligned to flex-start (from parent)
  },
  selfCentered: {
    alignSelf: 'center',
    // This item will be centered, overriding the parent's alignItems
  },
});
```

3. **flexGrow**, **flexShrink**: More specific control over how items grow or shrink
   - `flexGrow`: Similar to `flex`, but only affects growing
   - `flexShrink`: Controls how items shrink when there's not enough space

4. **position**: Changes how an item is positioned in relation to its normal position
   - `relative`: Normal positioning (default)
   - `absolute`: Positioned relative to its parent

5. **top**, **right**, **bottom**, **left**: Used with `position` to specify exact positioning

### Common Layout Patterns

Let's explore some common layout patterns you'll frequently implement in React Native applications:

#### 1. Card Layout

A common pattern for displaying structured information:

```jsx
const MedicationCard = () => (
  <View style={styles.card}>
    <View style={styles.header}>
      <Image style={styles.image} source={require('./med-image.png')} />
      <View style={styles.headerText}>
        <Text style={styles.title}>Lisinopril</Text>
        <Text style={styles.subtitle}>10mg Tablet</Text>
      </View>
    </View>
    <View style={styles.body}>
      <Text style={styles.description}>Take 1 tablet once daily.</Text>
    </View>
    <View style={styles.footer}>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Refill</Text>
      </TouchableOpacity>
    </View>
  </View>
);

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    margin: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  header: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  image: {
    width: 50,
    height: 50,
    marginRight: 12,
  },
  headerText: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
  },
  body: {
    marginBottom: 12,
  },
  description: {
    fontSize: 14,
    lineHeight: 20,
  },
  footer: {
    alignItems: 'flex-end',
  },
  button: {
    backgroundColor: '#2196F3',
    padding: 8,
    borderRadius: 4,
  },
  buttonText: {
    color: 'white',
  },
});
```

#### 2. Grid Layout

Creating a grid of items:

```jsx
const MedicationGrid = ({ medications }) => (
  <View style={styles.container}>
    <View style={styles.grid}>
      {medications.map(medication => (
        <View key={medication.id} style={styles.gridItem}>
          <Image style={styles.medicationImage} source={{ uri: medication.imageUrl }} />
          <Text style={styles.medicationName}>{medication.name}</Text>
        </View>
      ))}
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 8,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  gridItem: {
    width: '50%', // Two items per row
    padding: 8,
    alignItems: 'center',
  },
  medicationImage: {
    width: 80,
    height: 80,
    marginBottom: 8,
  },
  medicationName: {
    textAlign: 'center',
  },
});
```

#### 3. Split Screen Layout

Dividing the screen into sections:

```jsx
const MedicationDetails = () => (
  <View style={styles.container}>
    <View style={styles.topSection}>
      <Text style={styles.header}>Medication Information</Text>
      <Image style={styles.image} source={require('./med-image.png')} />
    </View>
    <View style={styles.bottomSection}>
      <Text style={styles.title}>Usage Instructions</Text>
      <Text style={styles.description}>Take 1 tablet once daily with water.</Text>
      <Text style={styles.title}>Side Effects</Text>
      <Text style={styles.description}>May cause dizziness or drowsiness.</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topSection: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  bottomSection: {
    flex: 2,
    padding: 16,
    backgroundColor: 'white',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  image: {
    width: 150,
    height: 150,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 12,
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    lineHeight: 20,
    color: '#333',
  },
});
```

#### 4. Fixed Header/Footer with Scrollable Content

A common pattern for screens with scrollable content:

```jsx
const MedicationList = () => (
  <View style={styles.container}>
    <View style={styles.header}>
      <Text style={styles.headerText}>My Medications</Text>
    </View>
    
    <ScrollView style={styles.content}>
      {/* Medication items would go here */}
      <Text style={styles.medicationItem}>Medication 1</Text>
      <Text style={styles.medicationItem}>Medication 2</Text>
      {/* More items... */}
    </ScrollView>
    
    <View style={styles.footer}>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Add Medication</Text>
      </TouchableOpacity>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    height: 60,
    padding: 16,
    backgroundColor: '#2196F3',
    justifyContent: 'center',
  },
  headerText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
  },
  medicationItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  footer: {
    height: 60,
    padding: 8,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#2196F3',
    padding: 8,
    borderRadius: 4,
  },
  buttonText: {
    color: 'white',
  },
});
```

### Flexbox Debugging Tips

Working with Flexbox can sometimes be challenging. Here are some tips for debugging layout issues:

1. **Add Temporary Background Colors**: Add different background colors to components to visualize their boundaries
   ```jsx
   <View style={{ flex: 1, backgroundColor: 'yellow' }}>
     <View style={{ flex: 1, backgroundColor: 'red' }}>
       {/* Content */}
     </View>
   </View>
   ```

2. **Use React Native Debugger or Chrome DevTools**: These tools allow you to inspect component layouts

3. **Add Border or Outline**: Add temporary borders to see component boundaries
   ```jsx
   <View style={{ borderWidth: 1, borderColor: 'red' }}>
     {/* Content */}
   </View>
   ```

4. **Simplify and Build Up**: When facing complex layout issues, start with a simpler version and gradually add complexity

5. **Check for Absolute Positioning**: Absolute positioned elements are taken out of the normal flow, which might affect layout expectations

## Best Practices for Layouts

1. **Avoid Fixed Dimensions**: Use flex values and percentages instead of fixed heights and widths when possible for responsive designs

2. **Keep Nesting Shallow**: Deeply nested flex containers can impact performance and make debugging harder

3. **Use Constants for Spacing**: Create a spacing system with consistent values for margins and padding

4. **Create Reusable Layout Components**: For common patterns like cards, lists, and grids, create reusable components

5. **Consider Platform Differences**: Be aware that some styles may render differently on iOS and Android (especially shadows)

## Summary

Flexbox is the foundation of layouts in React Native. Understanding how to use flexbox properties effectively allows you to create complex, responsive layouts that work well across different screen sizes and device orientations. By mastering the patterns demonstrated in this section, you'll be able to implement virtually any UI design in your React Native applications.

In the next section, we'll explore advanced UI components that build upon these layout fundamentals to create more sophisticated user interfaces.

## Further Reading

- [Layout with Flexbox - React Native Documentation](https://reactnative.dev/docs/flexbox)
- [Understanding Flexbox in React Native - Yoga Layout](https://yogalayout.com/)
- [Flexbox Froggy](https://flexboxfroggy.com/) - A game for learning flexbox
- [React Native Layout Katas](https://github.com/derekmorash/react-native-layout-katas) 