# Module 8: React Native Core Components

React Native Core Components are the fundamental building blocks for creating user interfaces in your mobile applications. They provide a set of pre-built, platform-agnostic elements that translate to native UI widgets on iOS and Android. Understanding and effectively using these components is essential for any React Native developer. This module will equip you with the knowledge to leverage these essential tools to construct intuitive and performant user interfaces for applications like our SpeedyMeds pharmacy app.

> 🛣️ **(All Learners):** This module dives into the visual building blocks of React Native. Whether you're new to mobile or have experience with other frameworks, understanding Core Components is key to building UIs. Pay attention to the props and styling specific to each component.

> 🧑‍🏫 **(Instructor-Led):** Encourage students to experiment with each Core Component in an Expo Snack as they are introduced. Live coding simple UIs combining these components can be very effective.

> 🧗‍♀️ **(Self-Led):** Create small, focused examples for each Core Component. Try to replicate simple UI elements from apps you use daily to understand their construction.

> 🔁 **(Asynchronous Learners):** The official React Native documentation for each Core Component is an excellent supplementary resource. Refer to it often as you go through this module.

## Target Audience Adaptation

> 🍏 **(iOS Developers):**
>
> **Comparison:** React Native Core Components like `<View>`, `<Text>`, and `<Image>` are analogous to UIKit elements such as `UIView`, `UILabel`, and `UIImageView`. The primary difference is that you define and manipulate these components using JavaScript/JSX instead of Swift/Objective-C and Interface Builder or programmatic layout. Styling via `StyleSheet` (using Flexbox) will also differ from Auto Layout or SwiftUI modifiers.
>
> **Key Takeaway:** You'll recognize the purpose of many components. The main learning curve will be the JSX syntax, prop-based configuration, and JavaScript-based styling.
>
> **Source:** [React Native Docs: Core Components and Native Components](https://reactnative.dev/docs/core-components-and-native-components), [Apple Developer Docs: UIKit](https://developer.apple.com/documentation/uikit)

> 🤖 **(Android Developers):**
>
> **Comparison:** React Native Core Components map directly to Android Views. For example, `<View>` is like a `ViewGroup`, `<Text>` to `TextView`, and `<Image>` to `ImageView`. Instead of XML layouts, you'll use JSX. Styling is done with JavaScript objects via `StyleSheet`, which is different from Android's XML attributes or themes.
>
> **Key Takeaway:** The concept of UI widgets will be familiar. Focus on learning the JSX syntax for these components and how styling is applied using JavaScript.
>
> **Source:** [React Native Docs: Core Components and Native Components](https://reactnative.dev/docs/core-components-and-native-components), [Android Developer Docs: Views](https://developer.android.com/guide/topics/ui/declaring-layout)

> ⚛️ **(Web Developers with React):**
>
> **Comparison:** The component model, JSX syntax, and props are identical to React for the web. Think of `<View>` as `<div>`, `<Text>` as `<p>` or `<span>`, and `<Image>` as `<img>`. The main differences are the specific set of components available (native mobile widgets vs. HTML elements) and their unique props. Styling is also different: React Native uses `StyleSheet` objects and Flexbox by default, not standard web CSS (though many CSS concepts translate).
>
> **Key Takeaway:** Your React knowledge is highly transferable. Focus on learning the available Core Components and their specific props, as well as the React Native styling system.
>
> **Source:** [React Native Docs: Core Components and Native Components](https://reactnative.dev/docs/core-components-and-native-components), [React Native Docs: Style](https://reactnative.dev/docs/style)

> 🅰️ **(Web Developers with Angular/Other Frameworks):**
>
> **Comparison:** While the architectural specifics differ, the idea of using pre-defined UI elements to build your application is similar to using common components or directives in Angular (e.g., `<button>`, `<input>`, or Material Design components). In React Native, you define these using JSX. Styling is done with JavaScript objects via `StyleSheet`, which contrasts with Angular's component-scoped CSS or global stylesheets.
>
> **Key Takeaway:** The concept of UI building blocks will be familiar. Concentrate on learning JSX for component definition, the available Core Components, and the `StyleSheet` API for styling.
>
> **Source:** [React Native Docs: Core Components and Native Components](https://reactnative.dev/docs/core-components-and-native-components), [Angular Docs: Built-in directives](https://angular.io/guide/built-in-directives)

## Learning Objectives

By the end of this module, you will be able to:

- Describe the role and importance of Core Components in React Native development.
- Implement fundamental UI structures using `<View>` components.
- Display static and dynamic text effectively with the `<Text>` component.
- Incorporate local and network images into your application using `<Image>`.
- Capture user input with various configurations of the `<TextInput>` component.
- Enable scrollable content areas using `<ScrollView>`.
- Apply basic styling to Core Components using the `StyleSheet` API.
- Handle user interactions with `<Button>` and `<Pressable>` components.
- Render efficient lists of data using `<FlatList>` and `<SectionList>`.
- Identify and understand the use cases for other common Core Components like `<ActivityIndicator>` and `<Modal>`.

## Prerequisites

Before starting this module, ensure you have completed:

- Completion of [Module 3: Setting Up Your React Native Environment with Expo](../module-03-react-native-environment-with-expo/section-00-introduction.md)
- Completion of [Module 5: JavaScript Essentials for React Native](../module-05-javascript-essentials-for-react-native/section-00-introduction.md)
- Completion of [Module 6: TypeScript Essentials](../module-06-typescript-essentials/section-00-introduction.md)
- Completion of [Module 7: React Essentials for React Native](../module-07-react-essentials-for-react-native/section-00-introduction.md)

## Sections in This Module

This module is divided into the following sections:

- [Section 1: The Role of Core Components](./section-01-the-role-of-core-components.md)
- [Section 2: View (`<View>`) - The Fundamental Container](./section-02-view.md)
- [Section 3: Text (`<Text>`) - Displaying Text](./section-03-text.md)
- [Section 4: Image (`<Image>`) - Displaying Images](./section-04-image.md)
- [Section 5: TextInput (`<TextInput>`) - User Input](./section-05-textinput.md)
- [Section 6: ScrollView (`<ScrollView>`) - Enabling Scrolling](./section-06-scrollview.md)
- [Section 7: StyleSheet API - Basic Styling](./section-07-stylesheet-api.md)
- [Section 8: Button and Pressable (`<Button>`, `<Pressable>`) - Handling Taps](./section-08-button-and-pressable.md)
- [Section 9: FlatList and SectionList - Efficient List Rendering](./section-09-flatlist-and-sectionlist.md)
- [Section 10: Other Core Components Overview](./section-10-other-core-components-overview.md)

## Module Challenge

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

**(https://snack.expo.dev/@speedymeds/rn-challenge-08-prescription-card)**

## Module Summary

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

## Additional Resources

- [React Native Docs: Core Components and APIs](https://reactnative.dev/docs/core-components-and-apis)
- [React Native Docs: Components Section (Browse individual components)](https://reactnative.dev/docs/components-and-apis)
- [Expo Docs: React Native Core Components (Often mirrors RN docs but good to be aware of)](https://docs.expo.dev/ui-programming/react-native-styling/)
