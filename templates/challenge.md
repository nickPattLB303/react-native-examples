---
marp: true
theme: custom-theme
paginate: false # Challenges might span multiple concepts, pagination optional
header: 'Challenge: [Challenge Title]'
footer: 'React Native Training'
---

<!-- _class: lead -->
# Challenge: [Challenge Title]

**Estimated Time:** 30-60 minutes

**Theme:** Pharmacy / Medication

---

## Scenario

<!-- Describe a more involved real-world scenario, potentially integrating concepts from multiple lessons. -->
Example: SpeedyMeds needs to implement a feature allowing users to filter their prescription list by status (Active, Inactive, Refill Due) and search by medication name...

---

## Requirements

<!-- Provide a clear list of functional and non-functional requirements for the challenge. -->
-   Fetch prescription data (use mock data or a provided function).
-   Display the prescriptions in a `FlatList`.
-   Implement a search input field that filters the list by medication name (case-insensitive).
-   Implement filter buttons/tabs for status filtering.
-   Combine search and filter functionality.
-   Ensure the UI is responsive and accessible.
-   Style the component according to the provided guidelines (or reference style guide).

---

## Starter Code / Setup

<!-- Provide necessary setup instructions, links to Expo Snacks, or starter code blocks. -->
<!-- This might involve multiple files or more complex setup than exercises. -->
[Start this challenge on Expo Snack](https://snack.expo.dev/...)

**OR**

Clone the starter branch from the [Capstone Project Repo](link-to-repo) and navigate to the relevant directory/component.

**OR**

```jsx
// src/screens/PrescriptionListScreen.tsx
import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, FlatList, Text, StyleSheet } from 'react-native';
// Assume getPrescriptions is an async function fetching mock data
// import { getPrescriptions } from '../api/mockApi';

// TODO: Implement filtering and search logic
// TODO: Build the UI components

const PrescriptionListScreen = () => {
  // State for search query, filter, and prescriptions
  // ...

  // Fetch data on mount
  // ...

  return (
    <View style={styles.container}>
      {/* TODO: Add Search Input */}
      {/* TODO: Add Filter Buttons/Tabs */}
      {/* TODO: Add FlatList */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  // Add more styles
});

export default PrescriptionListScreen;

```
**Explanation:** This starter code sets up the basic screen structure... (Add detailed explanation)

---

## Expected Outcome

<!-- Describe the final state and functionality. Screenshots or GIFs can be very helpful here if possible. -->
-   A screen displaying a list of prescriptions.
-   A working search bar that filters the list dynamically as the user types.
-   Working filter buttons/tabs that filter the list by status.
-   Search and filters work together correctly.
-   The list scrolls smoothly and looks presentable.

---

## Need Help? (Optional Hints)

<!-- Provide hints for more complex parts of the challenge. -->
<!--
<details>
<summary>Hint 1: Filtering Logic</summary>

Consider using `Array.prototype.filter()` and combining conditions for search and status filters. You might want to apply filters sequentially.
</details>

<details>
<summary>Hint 2: State Management</summary>

You'll need state variables (`useState`) to hold the search query, the active filter, the original list of prescriptions, and the filtered list to display.
</details>

<details>
<summary>Hint 3: `FlatList`</summary>

Remember to provide `data`, `renderItem`, and a unique `keyExtractor` prop to the `FlatList`.
</details>
-->

---

## Solution

<!-- Provide a link to the solution code. -->
[View the solution on Expo Snack](https://snack.expo.dev/...)
<!-- Or link to a file/branch -->
<!-- [View the solution code](./solutions/challenge-solution.tsx) -->