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

- **Module 3: Setting Up Your React Native Environment with Expo**
- **Module 5: JavaScript Essentials for React Native**
- **Module 6: TypeScript Essentials**
- **Module 7: React Essentials for React Native**

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

**Challenge 8: Build a Basic Prescription Item Card**

**Objective:** Apply your knowledge of Core Components (`<View>`, `<Text>`, `<Image>`, `StyleSheet`) to build a reusable UI card that displays information for a single prescription item in the SpeedyMeds app.

**Tool:** Expo Snack

**(https://snack.expo.dev/@speedymeds/rn-challenge-08-prescription-card)**

## Module Summary

This module provides a comprehensive exploration of React Native's Core Components. You'll learn that these components are the essential, pre-built UI pieces like `<View>`, `<Text>`, `<Image>`, `<TextInput>`, `<ScrollView>`, and interactive elements like `<Button>` and `<Pressable>`. We'll cover how they map to native platform widgets, ensuring a truly native look and feel. A key focus will be on understanding their props, styling using `StyleSheet`, and their role in constructing the UI of a React Native application. By mastering these foundational elements, you'll be well-prepared to build complex and interactive user interfaces.

## Additional Resources

> 📚 **Official Documentation:**
>
> - [React Native Docs: Core Components and APIs](https://reactnative.dev/docs/core-components-and-apis)
> - [React Native Docs: Components Section (Browse individual components)](https://reactnative.dev/docs/components-and-apis)
> - [Expo Docs: React Native Core Components (Often mirrors RN docs but good to be aware of)](https://docs.expo.dev/ui-programming/react-native-styling/)
