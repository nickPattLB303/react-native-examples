# Module 8: React Native Core Components

React Native Core Components are the fundamental building blocks for creating user interfaces in your mobile applications. They provide a set of pre-built, platform-agnostic elements that translate to native UI widgets on iOS and Android. Understanding and effectively using these components is essential for any React Native developer. This module will equip you with the knowledge to leverage these essential tools to construct intuitive and performant user interfaces for applications like our SpeedyMeds pharmacy app.

> TIP
> Experienced React developers may find concepts in this section familiar, as React Native components share many similarities with web-based React components (e.g., JSX syntax, props). It's recommended to skim for review, focusing particularly on the specific props and behaviors unique to React Native components and any differences highlighted in Background Bridge Notes.

## Target Audience Adaptation

- 🍏 **(iOS Developers):** You'll find parallels between React Native Core Components and UIKit elements (e.g., `UIView`, `UILabel`, `UIImageView`, `UITextField`, `UIScrollView`, `UIButton`). This module will show you how React Native abstracts these into a unified JavaScript-based component system. The styling approach with `StyleSheet` will be different from Auto Layout or SwiftUI modifiers.
- 🤖 **(Android Developers):** Core Components map to Android Views (e.g., `View` to `ViewGroup`, `Text` to `TextView`, `Image` to `ImageView`, `TextInput` to `EditText`, `ScrollView` to `ScrollView`, `Button` to `Button`). You'll learn how React Native allows you to define these using JavaScript and JSX, with styling handled via `StyleSheet` rather than XML layouts.
- ⚛️ **(Web Developers with React):** You're already familiar with the component model, JSX, and props. React Native Core Components like `<View>`, `<Text>`, and `<Image>` will feel similar to HTML elements like `<div>`, `<span>` or `<p>`, and `<img>`. The main difference lies in the specific components available, their props, and how styling is applied (using `StyleSheet` and Flexbox by default, rather than CSS in the browser).
- 🅰️ **(Web Developers with Angular):** While Angular's component architecture is different, the concept of reusable UI building blocks is similar. React Native's Core Components are analogous to common UI elements you'd use or create as Angular components. You'll learn JSX syntax for defining these components and `StyleSheet` for styling, which differs from Angular templates and CSS encapsulation.

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

- Completion of [Module 3: Setting Up Your React Native Environment with Expo](../module-03-setting-up-your-react-native-environment-with-expo/section-00-introduction.md)
- Completion of [Module 5: JavaScript Essentials for React Native](../module-05-javascript-essentials-for-react-native/section-00-introduction.md)
- Completion of [Module 6: TypeScript Essentials](../module-06-typescript-essentials/section-00-introduction.md)
- Completion of [Module 7: React Essentials for React Native](../module-07-react-essentials-for-react-native/section-00-introduction.md)

## Module Summary

This module provides a comprehensive exploration of React Native's Core Components. You'll learn that these components are the essential, pre-built UI pieces like `<View>`, `<Text>`, `<Image>`, `<TextInput>`, `<ScrollView>`, and interactive elements like `<Button>` and `<Pressable>`. We'll cover how they map to native platform widgets, ensuring a truly native look and feel. A key focus will be on understanding their props, styling using `StyleSheet`, and their role in constructing the UI of a React Native application. By mastering these foundational elements, you'll be well-prepared to build complex and interactive user interfaces.

This module will culminate in **Challenge 8: Build a Basic Prescription Item Card**, where you'll apply your knowledge of Core Components to build a UI element for the SpeedyMeds application.
