## Section 10: Other Core Components Overview, Challenge, and Summary

Beyond the foundational components we've covered in detail, React Native offers several other Core Components that are useful in various scenarios. This section provides a brief overview of some of them, followed by a module challenge and a summary of what you've learned in Module 8.

### Conceptual Content: Overview of Other Core Components

Here are a few more Core Components you might encounter or need:

- **`<ActivityIndicator>`:**

  - **Purpose:** Displays a circular loading indicator (a spinner).
  - **Use Case:** Useful for showing that some background activity is in progress, like fetching data from a server for SpeedyMeds (e.g., loading prescription history).
  - **Key Props:** `size` (`'small'` or `'large'`), `color`, `animating` (boolean to show/hide).
  - **Docs:** [ActivityIndicator](https://reactnative.dev/docs/activityindicator)

- **`<Modal>`:**

  - **Purpose:** Presents content above an enclosing view. It's a way to display temporary UI that requires user interaction or attention, like dialogs, pop-ups, or full-screen overlays.
  - **Use Case:** In SpeedyMeds, a modal could be used to display a confirmation dialog before refilling a prescription, show an enlarged image of a medication, or present a date picker.
  - **Key Props:** `visible` (boolean to show/hide), `animationType` (`'slide'`, `'fade'`, `'none'`), `transparent` (boolean), `onRequestClose` (Android back button handler).
  - **Docs:** [Modal](https://reactnative.dev/docs/modal)

- **`<Switch>`:**

  - **Purpose:** Renders a boolean input (an on/off switch).
  - **Use Case:** For settings in SpeedyMeds, like enabling/disabling notifications for prescription refills.
  - **Key Props:** `value` (boolean), `onValueChange` (function called when the switch is toggled), `trackColor` (color of the switch track), `thumbColor` (color of the switch thumb).
  - **Docs:** [Switch](https://reactnative.dev/docs/switch)

- **`<StatusBar>`:**

  - **Purpose:** Allows you to control the app's status bar (the bar at the top of the screen that displays time, battery, network signal, etc.).
  - **Use Case:** To set the status bar's style (light or dark content), background color, or visibility, to match the SpeedyMeds app theme on different screens.
  - **Key Props:** `barStyle` (`'default'`, `'light-content'`, `'dark-content'`), `backgroundColor` (Android only), `hidden` (boolean), `translucent` (Android only).
  - **Docs:** [StatusBar](https://reactnative.dev/docs/statusbar)

- **`<RefreshControl>`:**
  - **Purpose:** This component is used inside a `<ScrollView>` or `<FlatList>` to add pull-to-refresh functionality.
  - **Use Case:** Allowing users of SpeedyMeds to pull down on a list of prescriptions or messages to check for new updates.
  - **Key Props:** `refreshing` (boolean, set to true when data is loading), `onRefresh` (function called when a refresh is initiated), `tintColor` (iOS), `colors` (Android).
  - **Docs:** [RefreshControl](https://reactnative.dev/docs/refreshcontrol)

These components, along with the ones covered in previous sections, form a powerful toolkit for building rich and interactive user interfaces in React Native. Always refer to the official documentation for the most up-to-date information on props and usage.

> 📚 **Official Documentation:**
>
> - [React Native Docs: Components and APIs](https://reactnative.dev/docs/components-and-apis) (A good starting point to explore all available components)

---

## Module 8 Challenge: Build a SpeedyMeds UI Element

Now it's time to combine your knowledge of various Core Components to build a UI element for the SpeedyMeds application.

**Objective:** Create a 'Prescription Refill Card' component.

This card should display information about a prescription and allow the user to initiate a refill request.

**Requirements:**

1.  **Structure (`<View>`):**

    - The card should have a main container `<View>`.
    - Inside, structure the content into logical sections using nested `<View>`s (e.g., a header section for medication name, a body for details, and a footer for the action button).

2.  **Text Display (`<Text>`):**

    - Display the **Medication Name** (e.g., 'Atorvastatin 20mg').
    - Display the **Quantity** (e.g., '90 Tablets').
    - Display the **Last Refilled Date** (e.g., 'Last Refilled: 2023-10-15').
    - Display the **Refills Remaining** (e.g., '2 Refills Left').

3.  **Image (`<Image>`):**

    - Include a small placeholder icon for the medication (you can use a local image if you set up asset bundling, or a simple network image URL like 'https://picsum.photos/50').

4.  **User Input (Optional Bonus):**

    - (Bonus) Add a `<TextInput>` where the user could hypothetically enter the number of refills they want to request (e.g., default to '1'). Style it to look like a small input field.

5.  **Action (`<Pressable>`):**

    - Include a 'Request Refill' button using `<Pressable>`.
    - The button should have custom styling (background color, text color, padding, rounded corners).
    - When pressed, it should show an `Alert` confirming the refill request (e.g., `Refill requested for Atorvastatin 20mg`).
    - The button should change its appearance when pressed (e.g., slightly darker background or opacity change).

6.  **Styling (`StyleSheet`):**

    - Define all styles using `StyleSheet.create()`.
    - The card should have a distinct background color, padding, rounded corners, and a subtle shadow.
    - Style the text elements for readability (e.g., medication name larger and bolder, details smaller).
    - Ensure the layout is clean and user-friendly.

7.  **Data:**
    - Create a sample data object or pass props to your `PrescriptionRefillCard` component to populate the information.

**Example Structure (Conceptual):**

```
+------------------------------------------+
| [Icon]  Medication Name (Atorvastatin)   |
|         Quantity: 90 Tablets             |
|------------------------------------------|
| Last Refilled: 2023-10-15                |
| Refills Remaining: 2 Refills Left        |
| (Optional TextInput for # of refills)    |
|------------------------------------------|
|           [ Request Refill (Button) ]    |
+------------------------------------------+
```

**Implementation:**

- You can build this as a new component in a Snack project or your local Expo environment.
- Focus on combining the Core Components covered in this module.

**(TODO: Link to Specific Expo Snack for Challenge 8)**

---

## Module 8 Summary: React Native Core Components

Congratulations on completing Module 8! You've gained a foundational understanding of React Native's Core Components, which are the essential building blocks for creating user interfaces in your mobile applications.

**Key Takeaways:**

- **Role of Core Components:** They are pre-built, platform-agnostic elements that translate to native UI widgets, enabling cross-platform development with a native look and feel.
- **`<View>`:** The fundamental container for layout and grouping other components. Uses Flexbox for layout.
- **`<Text>`:** Used for displaying all text content. Supports nesting for rich text styling.
- **`<Image>`:** Displays local and network images. Requires explicit width and height dimensions.
- **`<TextInput>`:** Enables user text input. Typically used as a controlled component with state management.
- **`<ScrollView>`:** Provides a scrollable container for content that might exceed screen size. Renders all children at once.
- **`StyleSheet` API:** The preferred way to define and organize styles using JavaScript objects with camelCased properties. Offers performance and organizational benefits.
- **`<Button>`:** A simple, platform-styled button with limited customization.
- **`<Pressable>`:** A highly customizable component for handling taps and providing detailed interaction feedback. Often preferred for custom button designs.
- **`<FlatList>` & `<SectionList>`:** Performant components for displaying long lists of data (flat or sectioned) using virtualization.
- **Other Components:** You were introduced to `<ActivityIndicator>`, `<Modal>`, `<Switch>`, `<StatusBar>`, and `<RefreshControl>`, expanding your toolkit for various UI needs.

**Skills Gained:**

By now, you should be able to:

- Structure UI layouts using `<View>`.
- Display and style text effectively with `<Text>`.
- Incorporate images into your application with `<Image>`.
- Create forms and capture user input using `<TextInput>`.
- Make content scrollable with `<ScrollView>`.
- Apply styles to components using `StyleSheet`.
- Implement user interactions with `<Button>` and `<Pressable>`.
- Render lists of data efficiently using `<FlatList>` and `<SectionList>`.
- Recognize when to use other common Core Components.

**Next Steps:**

With a solid understanding of Core Components, you are well-equipped to build a wide variety of user interfaces. The next modules will build upon this foundation, diving deeper into navigation, layout with Flexbox, and state management, enabling you to create more complex and dynamic applications like SpeedyMeds.

Keep practicing with these components, experiment with their props, and refer to the official React Native documentation as you continue your development journey.

- **Module 9: React Native Core APIs and Hooks**
