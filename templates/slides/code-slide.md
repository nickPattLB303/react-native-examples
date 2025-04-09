---
marp: true
theme: company
paginate: true
header: "[Topic Title]"
footer: "© 2025 - React Native Training"
class: code-slide
---

# [Code Example: Title]

```typescript
// [Code example title]
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

/**
 * [Component description]
 */
const ExampleComponent: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Example code</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // Container styles
  },
  text: {
    // Text styles
  },
});

export default ExampleComponent;
```

<!-- 
Speaker Notes:
- Walk through the code example line by line
- Explain the purpose of key sections
- Highlight best practices demonstrated
- Point out TypeScript types and JSDoc comments
- Mention potential gotchas or edge cases
- Explain how this relates to the pharmacy application context
-->