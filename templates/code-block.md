<!-- Code Block Template -->
<!-- Use this structure for presenting code examples. -->

```jsx
// Specify the correct language (e.g., jsx, tsx, javascript, typescript, css, shell)
// Example: src/components/MyComponent.tsx

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

/**
 * JSDoc example for a component.
 * Describe the component's purpose, props, etc.
 * @param {object} props - Component props.
 * @param {string} props.message - The message to display.
 * @returns {React.ReactElement} The rendered component.
 */
const MyComponent = ({ message }: { message: string }): React.ReactElement => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: '#eee',
    borderRadius: 5,
  },
  text: {
    fontSize: 16,
    color: '#333',
  },
});

export default MyComponent;

```
**(Copy button available in top-right corner)**

**Explanation:**

<!--
Provide a detailed explanation of the code snippet above.
Minimum 200 words as per course requirements.

Cover the following aspects:
1.  **Purpose:** What does this code achieve? What problem does it solve?
2.  **Key Concepts:** Explain the core React Native, JavaScript, or TypeScript concepts demonstrated (e.g., functional components, props, state, hooks, StyleSheet, specific APIs).
3.  **Code Breakdown:** Walk through the important parts of the code line-by-line or section-by-section. Explain *why* the code is written this way.
4.  **Imports:** Explain where the imported modules come from and why they are needed.
5.  **Typing (TypeScript):** Explain the type annotations used (props, state, function return types). How does TypeScript help here?
6.  **Styling:** Explain the `StyleSheet.create` usage and the specific styles applied. How do they affect the visual appearance?
7.  **Accessibility (if applicable):** Explain any accessibility props used and their purpose.
8.  **JSDoc:** Briefly mention the purpose of the JSDoc comments for documentation generation.
9.  **Context/Usage:** How would this component typically be used within a larger application?
10. **Alternatives (Optional):** Briefly mention if there are alternative ways to achieve the same result and why this approach was chosen.

Example start: This code snippet defines a reusable React functional component named `MyComponent` using TypeScript. Its primary purpose is to display a simple message passed down via props within a styled container. This pattern is fundamental in React development for breaking down UIs into manageable pieces... [continue explanation]... The `StyleSheet.create` API is used for defining styles in React Native. It provides optimizations by creating plain JavaScript objects with unique IDs assigned to the styles, which helps in performance... [continue explanation]... TypeScript is used here to define the type for the `props` object, specifically ensuring that a `message` prop of type `string` is passed to the component. This adds type safety during development, catching potential errors early if an incorrect prop type is provided... [continue explanation for ~200+ words]
-->