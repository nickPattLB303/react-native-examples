# Module 11: Navigation and Routing

<!-- Optional: Add a relevant banner image here if desired, following image standards -->
<!-- e.g., ![React Native Navigation Banner](./assets/images/module-11/navigation-banner.png) -->
<!-- Caption: Navigational elements connecting different app screens. -->

Welcome to Module 11: Navigation and Routing! In any mobile application with more than a single screen, a robust navigation system is essential. Navigation forms the backbone of an application, dictating how users move between different sections and functionalities, and managing the presentation of, and transitions between, multiple screens. The effectiveness of an application's navigation system is paramount to its success; a poorly designed or unintuitive navigation structure can significantly hinder usability and lead to user frustration, potentially causing users to abandon the app. Conversely, a seamless, logical, and predictable navigation flow enhances the overall user experience (UX) significantly. Effective navigation acts as a silent guide, enabling users to discover features, complete tasks, and access information with minimal friction, directly contributing to higher user engagement and satisfaction. The chosen navigation patterns and underlying library are critical architectural decisions that shape the user's journey and perception of the application by structuring its information architecture.

This module explores how to implement intuitive and effective navigation in your React Native applications. You'll learn about fundamental navigation concepts and then dive into two powerful libraries: React Navigation and Expo Router. While these are the primary focus, it's worth noting that other solutions like `react-native-navigation` by Wix exist, which take a native-centric approach. By the end of this module, you'll be able to construct complex navigation flows, pass data between screens, and customize the appearance of your navigation elements, enabling you to build professional, multi-screen applications for our SpeedyMeds pharmacy app.

> 🛣️ **(All Learners):** This module is foundational for building any non-trivial React Native application. Pay close attention to the setup and configuration details for each navigation library, as these are common areas where developers encounter issues. Understanding how to structure navigation is key to a good user experience in SpeedyMeds.

> 🍏 **(iOS Developers):** You're likely familiar with UIKit's `UINavigationController` or SwiftUI's `NavigationView` and `NavigationStack`. React Native navigation libraries provide similar concepts like stacks, tabs, and drawers, but with a declarative, component-based approach common in React.
>
> **Comparison:** Think of navigation containers like `StackNavigator` as analogous to `UINavigationController`, managing a stack of view controllers. Tab and Drawer navigators correspond to `UITabBarController` and `UISplitViewController` or custom drawer implementations, respectively. The way you define routes and transitions will feel different, moving from imperative code or storyboard configurations to JavaScript objects and components.
>
> **Key Takeaway:** The primary difference lies in the JavaScript-driven configuration and the use of components to define your navigation structure, rather than Interface Builder or imperative Swift/Objective-C code. You'll be defining screens as React components and linking them via navigation props and functions.
>
> **Source:** [UINavigationController | Apple Developer Documentation](https://developer.apple.com/documentation/uikit/uinavigationcontroller)

> 🤖 **(Android Developers):** You're accustomed to Activities, Fragments, and the Android Jetpack Navigation Component for managing app navigation. React Native libraries offer a unified way to handle navigation across platforms, managed within the JavaScript layer.
>
> **Comparison:** React Navigation's stack navigator is similar to managing a back stack of Fragments within an Activity, or using the Jetpack Navigation Component to define destinations and actions. Concepts like Intents for starting new Activities and passing data are handled through navigation actions and route parameters in React Native.
>
> **Key Takeaway:** React Native navigation is typically centralized within the JavaScript layer, offering a more unified approach compared to Android's distinct Activity and Fragment lifecycles. You'll define navigation graphs using JavaScript objects or file-system conventions (with Expo Router) rather than XML.
>
> **Source:** [Navigation overview | Android Developers](https://developer.android.com/guide/navigation/overview)

> 🌐 **(Web Developers):** If you've used routing libraries like React Router (for React) or Angular Router, you'll find some familiar concepts such as defining routes and linking to different views. However, mobile navigation has unique patterns like native stack behavior, gestures, and distinct visual components like tab bars and drawers.
>
> **Comparison:** The concept of routes and linking to different "pages" (screens in mobile) is similar. Expo Router, with its file-based routing, might feel particularly akin to frameworks like Next.js or Remix. React Navigation's configuration is more explicit, defining navigators and screens in JavaScript.
>
> **Key Takeaway:** While the core idea of routing is similar, be prepared for mobile-specific UI paradigms, native screen transition animations, and managing navigation state that deeply integrates with the mobile OS back button behavior.
>
> **Source:** [React Router Docs](https://reactrouter.com/)

## Understanding the Ecosystem: Versions and Compatibility

Navigating the version landscape of React Native, Expo, and associated navigation libraries is crucial due to their rapid release cycles and the potential for compatibility issues. Understanding the interplay between these components is essential for stable development and a smooth learning experience.

### Key Considerations:

- **Version Alignment:** The version of React Native used in a project directly impacts the compatibility and feature availability of navigation libraries and their dependencies. Expo SDKs bundle specific React Native versions (e.g., Expo SDK 52 uses React Native 0.76), and upgrading one often necessitates upgrading the other. Navigation libraries, in turn, specify minimum React Native versions.
- **Rapid Releases & Stability:** The React Native and Expo ecosystems evolve quickly. While this brings new features, new SDK releases can sometimes introduce temporary stability issues or library compatibility problems. It's wise to check community feedback and be prepared for minor adjustments, especially when adopting the very latest versions.
- **Dependency Management with Expo:** When working with Expo, it is **strongly recommended** to use `npx expo install <package-name>` rather than `npm install` or `yarn add`. The `npx expo install` command attempts to install versions of libraries that are known to be compatible with your project's Expo SDK version. Tools like `npx expo doctor` can help identify and resolve inconsistencies in your project's dependencies.
- **Expo Go Limitations:** The Expo Go app, used for quick testing on devices, has a limited support window for older SDKs. Eventually, support for an SDK is dropped from Expo Go, which may require you to upgrade your project or use development builds for testing. Furthermore, with newer SDKs (like SDK 52+), Expo Go primarily supports projects using the New Architecture (Fabric).
- **The New Architecture (Fabric):** React Native is gradually transitioning to a New Architecture, which includes a new rendering system called Fabric. Newer Expo SDKs (e.g., SDK 52 enabled Fabric by default for new projects) are increasingly adopting it. Libraries, including crucial navigation dependencies like `react-native-screens`, need to explicitly support Fabric, and may have different version requirements depending on whether Fabric is enabled.

Being mindful of these factors will help you manage dependencies effectively and troubleshoot setup issues more efficiently.

### Library Version Compatibility (Targeting Expo SDK 52 / RN 0.76)

The following table provides a reference for potentially compatible library versions when targeting an environment based on Expo SDK 52 (which uses React Native 0.76). Note that specific patch versions can be crucial, and thorough testing is always recommended. Compatibility can also depend on whether the New Architecture (Fabric) is enabled.

| Category                | Library                          | Recommended Version (Expo SDK 52 / RN 0.76)         | Notes                                                                                           |
| ----------------------- | -------------------------------- | --------------------------------------------------- | ----------------------------------------------------------------------------------------------- |
| Expo SDK                | `expo`                           | `~52.0.x`                                           | Base SDK version.                                                                               |
| React Native            | `react-native`                   | `0.76.x`                                            | Required by Expo SDK 52.                                                                        |
| React Navigation (Core) | `@react-navigation/native`       | `^6.x` (e.g., `@react-navigation/core@6.4.17`)      | Base package for v6. Specific latest v6 patch needed.                                           |
|                         | `@react-navigation/stack`        | `^6.x`                                              | Stack navigator for v6.                                                                         |
|                         | `@react-navigation/bottom-tabs`  | `^6.x`                                              | Bottom Tabs navigator for v6.                                                                   |
|                         | `@react-navigation/drawer`       | `^6.x`                                              | Drawer navigator for v6.                                                                        |
| Expo Router             | `expo-router`                    | `~3.x`                                              | Version aligned with SDK 52/53, uses React Nav v7 internally for its own implementations.       |
| Dependencies            | `react-native-screens`           | `~4.9.0` (Paper) / `~4.0.0` (Fabric)                | Version depends on RN 0.76 and architecture. Use `npx expo install`.                            |
|                         | `react-native-safe-area-context` | Use `npx expo install` recommended version          | Required peer dependency for React Navigation.                                                  |
|                         | `react-native-gesture-handler`   | `~2.12.0` (Check `npx expo install` recommendation) | Required for Stack/Drawer Navigators. Verify with `npx expo install`.                           |
|                         | `react-native-reanimated`        | `~2.14.4` / `^3.x` (Check `npx expo install`)       | Required for Drawer Navigator (v2+), potentially used by Stack. Verify with `npx expo install`. |
|                         | `expo-linking`                   | Use `npx expo install` recommended version          | Used by Expo Router for deep linking.                                                           |
|                         | `expo-constants`                 | Use `npx expo install` recommended version          | Used by Expo Router.                                                                            |
|                         | `expo-status-bar`                | Use `npx expo install` recommended version          | Common utility, installed with Expo Router setup.                                               |

> **Note:** Always prioritize versions recommended by `npx expo install <package-name>` for your specific Expo SDK version, as this tool attempts to resolve compatible dependencies.

## Learning Objectives

By the end of this module, you will be able to:

- Describe core navigation concepts like stack, tab, and drawer navigators.
- Implement stack navigation for screen transitions using React Navigation.
- Implement tab-based navigation for main app sections using React Navigation.
- Implement drawer navigation for auxiliary menus using React Navigation.
- Pass parameters and data effectively between different screens.
- Configure and customize navigation headers, tab bars, and drawer styles to match app branding.
- Explain the features, benefits, and file-based routing paradigm of Expo Router.
- Implement various routing patterns (stack, tabs) using Expo Router.
- Compare and contrast the setup, configuration, and usage of React Navigation and Expo Router.
- Implement deep linking to allow users to navigate to specific screens from external URLs using Expo Router.

## Prerequisites

Before starting this module, ensure you have a solid understanding of the following:

- Completion of [Module 3: Setting Up Your React Native Environment with Expo](../module-03-setting-up-environment-with-expo/section-00-introduction.md)
- Completion of [Module 6: TypeScript Essentials](../module-06-typescript-essentials/section-00-introduction.md)
- Completion of [Module 7: React Essentials for React Native](../module-07-react-essentials/section-00-introduction.md)
- Completion of [Module 8: React Native Core Components](../module-08-core-components/section-00-introduction.md)
- Completion of [Module 10: Styling in React Native](../module-10-styling/section-00-introduction.md)

## Module Sections

This module is divided into the following sections:

1.  **Section 1: Navigation Concepts:** Understanding stacks, tabs, and drawers.
2.  **Section 2: Introduction to React Navigation (v6):** Overview and setup.
3.  **Section 3: Stack Navigator Setup and Usage:** Building basic screen flows.
4.  **Section 4: Tab Navigator Setup and Usage:** Implementing main app navigation.
5.  **Section 5: Drawer Navigator Setup and Usage:** Creating side menus.
6.  **Section 6: Passing Parameters Between Screens:** Sharing data during navigation.
7.  **Section 7: Configuring Headers and Tabs:** Customizing appearance.
8.  **Section 8: Introduction to Expo Router:** Exploring file-based routing.
9.  **Section 9: File-Based Routing with Expo Router:** Practical implementation.
10. **Section 10: Expo Router vs. React Navigation Configuration:** A comparative look.
11. **Section 11: Deep Linking:** Handling external navigation.

---

**(Placeholder: URL_to_Expo_Snack_for_Challenge_11)**

> This link will direct you to an Expo Snack for the Module 11 Challenge. Detailed instructions are provided within the Snack's `README.md` file.

## Module Summary

In this module, you explored the critical role of navigation in mobile applications. You started by understanding fundamental navigation patterns: stack, tab, and drawer. You then dove into practical implementation using React Navigation, learning how to set up and use its various navigators, pass data between screens, and customize their appearance. Following that, you were introduced to Expo Router, a file-system-based routing solution, and learned how to create routes and navigate using this newer paradigm. The module also provided a comparison between React Navigation and Expo Router, and covered how to implement deep linking. By mastering these tools and concepts, you are now equipped to build complex, multi-screen React Native applications with intuitive user flows, a crucial skill for developing the SpeedyMeds app.

## Additional Resources

- [React Navigation Official Documentation](https://reactnavigation.org/)
- [Expo Router Official Documentation](https://docs.expo.dev/router/introduction/)
- [Stack Navigator | React Navigation](https://reactnavigation.org/docs/stack-navigator/)
- [Tab Navigator | React Navigation](https://reactnavigation.org/docs/tab-based-navigation/)
- [Drawer Navigator | React Navigation](https://reactnavigation.org/docs/drawer-navigator/)
- [Passing parameters to routes | React Navigation](https://reactnavigation.org/docs/params/)
- [Deep linking | Expo Documentation](https://docs.expo.dev/guides/deep-linking/)
