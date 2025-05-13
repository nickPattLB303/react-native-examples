## Section 2: Introduction to React Navigation (v6)

This section introduces React Navigation, a popular and widely adopted library for handling navigation in React Native applications. We will cover its core philosophy, main packages, and the general setup process. React Navigation is extensible and allows you to build sophisticated navigation structures like those discussed in the previous section (stacks, tabs, drawers).

> 🛣️ **(All Learners):** Pay close attention to the installation steps. Setting up React Navigation involves installing several packages, and ensuring they are compatible is crucial.

### Core Content

#### Conceptual Content: What is React Navigation?

React Navigation is a community-driven navigation solution for React Native. It provides a flexible and easy-to-use way to implement navigation patterns that feel native on both iOS and Android. Its core philosophy is to provide navigators (like stack, tab, and drawer) as React components, allowing you to define your app's navigation structure declaratively.

**Key Features:**

- **Native Look and Feel:** Animations and gestures are designed to mimic native platform behavior.
- **Extensible:** You can create custom navigators or customize existing ones.
- **Themeable:** Supports theming to match your application's design.
- **TypeScript Support:** Strong TypeScript support for robust development.
- **Community Driven:** Actively maintained with a large community and ecosystem.

React Navigation version 6 is the current major version as of this writing and is the version we will be using in this course.

#### Referential Content: Core Packages

React Navigation is split into several packages. The main ones you'll typically interact with are:

1.  `@react-navigation/native`:

    - Provides the core utilities and the `NavigationContainer` component, which wraps your entire navigation structure.
    - This is a fundamental package required for any React Navigation setup.

2.  `@react-navigation/stack`:

    - Provides the Stack navigator, allowing you to transition between screens and manage a navigation history stack.
    - Used for implementing flows where screens are presented on top of each other.

3.  `@react-navigation/bottom-tabs`:

    - Provides the Tab navigator, typically used for the main sections of an app, displayed as a tab bar at the bottom of the screen.

4.  `@react-navigation/drawer`:

    - Provides the Drawer navigator, which allows for a slide-out menu from the side of the screen.

5.  `react-native-screens` and `react-native-safe-area-context`:
    - These are peer dependencies required by React Navigation for native screen optimizations and handling safe areas (like notches or home indicators on modern devices).
    - They provide native primitives that make navigation more performant and visually correct.

#### Procedural Content: Installation and Setup

Setting up React Navigation involves installing these core packages and their dependencies. We'll be using Expo, which simplifies some aspects of the setup.

> [!IMPORTANT]
> Always refer to the official React Navigation documentation for the most up-to-date installation instructions, as package versions and dependencies can change.

**Steps for Installation (within an Expo project):**

1.  **Install Core Libraries:**
    Open your terminal in your Expo project directory (e.g., your `SpeedyMeds` app) and run:

    ```bash
    npx expo install @react-navigation/native
    ```

    Using `npx expo install` is recommended over `npm install` or `yarn add` for Expo projects because it ensures compatible versions of libraries are installed.

2.  **Install Peer Dependencies:**
    React Navigation relies on `react-native-screens` and `react-native-safe-area-context`. Install them using `expo install`:

    ```bash
    npx expo install react-native-screens react-native-safe-area-context
    ```

3.  **Install Navigators:**
    Depending on which navigators you plan to use, you'll install them separately. For now, let's assume we might use stack, tabs, and drawer navigators later in the module:

    ```bash
    npx expo install @react-navigation/stack
    npx expo install @react-navigation/bottom-tabs
    npx expo install @react-navigation/drawer react-native-gesture-handler react-native-reanimated
    ```

    - The `@react-navigation/drawer` navigator has additional peer dependencies: `react-native-gesture-handler` (for gesture interactions) and `react-native-reanimated` (for animations). `expo install` should handle compatible versions.

    > [!NOTE]
    > If you are using `react-native-reanimated` version 2 or higher (which `expo install` will likely add), you need to add the `react-native-reanimated/plugin` to your `babel.config.js`. Expo CLI should prompt you to do this or may do it automatically. If not, your `babel.config.js` should look something like this:
    >
    > ```javascript
    > module.exports = function (api) {
    >   api.cache(true);
    >   return {
    >     presets: ["babel-preset-expo"],
    >     plugins: [
    >       // Other plugins...
    >       "react-native-reanimated/plugin", // This must be listed last
    >     ],
    >   };
    > };
    > ```
    >
    > After modifying `babel.config.js`, you might need to clear the Metro bundler cache with `npx expo start --clear`.

4.  **Wrap Your App in `NavigationContainer`:**
    To enable navigation, you need to wrap your entire application (usually in `App.tsx` or your main entry file) with the `NavigationContainer` component.

    A minimal `App.tsx` might look like this after initial setup (before defining any screens or navigators):

    ```tsx
    // App.tsx
    import "react-native-gesture-handler"; // Should be at the top
    import * as React from "react";
    import { NavigationContainer } from "@react-navigation/native";
    // We will import and use navigators here later

    export default function App() {
      return (
        <NavigationContainer>
          {/* Your navigators and screens will go here */}
          {/* For now, you might put a placeholder Text component */}
        </NavigationContainer>
      );
    }
    ```

    > [!IMPORTANT]
    > The `import 'react-native-gesture-handler';` statement should be at the very top of your entry file (e.g., `App.tsx` or `index.js`), before any other imports, especially before importing React.

This completes the basic installation and setup of React Navigation. In the following sections, we will learn how to define screens and use these navigators to build navigation flows.

> 📚 **Official Documentation:**
>
> - [React Navigation - Getting started](https://reactnavigation.org/docs/getting-started)
> - [React Navigation - Installation](https://reactnavigation.org/docs/getting-started/#installation)
> - [Expo Documentation - Using React Navigation](https://docs.expo.dev/routing/react-navigation/)
> - [`react-native-gesture-handler` Installation](https://docs.swmansion.com/react-native-gesture-handler/docs/installation)
> - [`react-native-reanimated` Installation](https://docs.swmansion.com/react-native-reanimated/docs/fundamentals/installation)

> 🍏 **(iOS Developers) / 🤖 (Android Developers):**
>
> **Comparison:** The installation process might feel similar to adding dependencies using CocoaPods (iOS) or Gradle (Android). The key is that these are JavaScript libraries that often bridge to native capabilities.
>
> **Key Takeaway:** `npx expo install` simplifies managing compatible native module versions for these libraries, which can otherwise be a common source of issues in React Native development.

> 🌐 **(Web Developers):**
>
> **Comparison:** Similar to installing routing libraries like `react-router-dom` via npm or yarn. The main difference is the additional peer dependencies that interact with the native mobile environment (`react-native-screens`, `react-native-safe-area-context`, `react-native-gesture-handler`, `react-native-reanimated`).
>
> **Key Takeaway:** Mobile navigation libraries often have more complex dependencies due to their interaction with native UI elements, gestures, and animations.

#### Next Steps

With React Navigation installed and your app wrapped in `NavigationContainer`, you're ready to start building navigation structures. In the next section, we'll focus on setting up and using the Stack Navigator.
