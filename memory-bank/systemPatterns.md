# System Patterns

This document outlines the key patterns, conventions, and standards used throughout the React Native Training Course project.

## Code Patterns

### Pharmacy/Medication Theme

All code examples, exercises, and projects follow a consistent pharmacy/medication theme:

```javascript
// Example of themed variable names
const medications = [
  { id: 1, name: 'Amoxicillin', dosage: '500mg', frequency: '3x daily' },
  { id: 2, name: 'Lisinopril', dosage: '10mg', frequency: '1x daily' },
  { id: 3, name: 'Metformin', dosage: '1000mg', frequency: '2x daily' }
];

// Example of themed component
function MedicationList({ medications }) {
  return (
    <FlatList
      data={medications}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <MedicationItem 
          name={item.name}
          dosage={item.dosage}
          frequency={item.frequency}
        />
      )}
    />
  );
}
```

### JSDoc Documentation

All code includes comprehensive JSDoc documentation:

```javascript
/**
 * @fileoverview Component for displaying a list of medications
 * @author Training Course Author
 * @created 2023-05-01
 */

/**
 * Calculates the dosage based on patient weight and medication concentration
 * @param {number} weight - Patient weight in kg
 * @param {number} concentration - Medication concentration in mg/ml
 * @returns {number} The calculated dosage in ml
 * @example
 * // Returns 2.5
 * calculateDosage(50, 20)
 */
function calculateDosage(weight, concentration) {
  return weight * 0.001 * concentration;
}
```

### Platform-Specific Code Handling

Platform-specific code is clearly marked and explained:

```javascript
// iOS-specific implementation
if (Platform.OS === 'ios') {
  // Implementation with explanation of iOS-specific behavior
}
// Android-specific implementation
else if (Platform.OS === 'android') {
  // Implementation with explanation of Android-specific behavior
}
```

## Documentation Patterns

### Microsoft Writing Style Guide

All documentation follows the Microsoft Writing Style Guide:

- Clear, concise language
- Active voice
- Present tense
- Second person ("you") for instructions
- Numbered lists for sequential steps
- Bulleted lists for non-sequential items

### ADDIE Model Implementation

Course content follows the ADDIE instructional design model:

1. **Analysis**: Identify learning needs and objectives
2. **Design**: Create learning paths and content structure
3. **Development**: Create content and exercises
4. **Implementation**: Deliver content through appropriate platforms
5. **Evaluation**: Assess effectiveness and gather feedback

### Callout Boxes

Documentation uses consistent callout boxes:

```markdown
> **Note**: Additional information that may be helpful.

> **Tip**: Suggestions for best practices or shortcuts.

> **Warning**: Important information to prevent errors.

> **Deep Dive**: More detailed technical explanations.
```

## Learning Path Patterns

### Three Learning Paths

Content supports three distinct learning paths:

1. **Beginner Path**: Foundational concepts with detailed explanations
2. **Intermediate Path**: More complex topics with some assumed knowledge
3. **Advanced Path**: Deep dives into advanced concepts and optimizations

### Content Difficulty Progression

Content follows a consistent difficulty progression:

- **Level 1**: Basic concepts and syntax
- **Level 2**: Combining concepts into functional components
- **Level 3**: Building complete features
- **Level 4**: Optimizing and extending functionality

## Exercise Patterns

### Exercise Structure

Exercises follow a consistent structure:

1. **Objective**: Clear statement of what will be learned
2. **Prerequisites**: Required knowledge or setup
3. **Instructions**: Step-by-step guidance
4. **Expected Output**: What the completed exercise should look like
5. **Hints**: Optional assistance for those who need it
6. **Solution**: Complete solution with explanations

### Challenge Structure

Challenges follow a consistent structure:

1. **Scenario**: Real-world context for the challenge
2. **Requirements**: Specific features to implement
3. **Constraints**: Limitations or specific approaches to use
4. **Resources**: Available tools and references
5. **Evaluation Criteria**: How the solution will be assessed
6. **Sample Solution**: One possible implementation

## Technical Implementation Patterns

### Component Structure

React Native components follow a consistent structure:

```javascript
/**
 * @fileoverview Component description
 * @author Author Name
 * @created YYYY-MM-DD
 */

import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';

/**
 * Component description
 * 
 * @param {Object} props Component properties
 * @returns {React.ReactElement} Component
 */
export default function ComponentName(props) {
  // State declarations
  
  // Effects
  
  // Helper functions
  
  // Render methods
  
  // Main render
  return (
    <View style={styles.container}>
      {/* Component content */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // Styles
  },
  // Additional styles
});
```

### State Management

State management follows these patterns:

- Local state with `useState` for component-specific state
- Context API for shared state across related components
- Redux for complex application-wide state

### API Integration

API integration follows these patterns:

- Custom hooks for API calls
- Loading, error, and success states
- Proper error handling and user feedback
- Caching strategies for performance 