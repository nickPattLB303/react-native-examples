## Section 2: Introduction to React Navigation (v6)

This section introduces React Navigation, a popular and widely adopted library for handling navigation in React Native applications. We will cover its core philosophy, main packages, the general setup process, fundamental concepts like the `navigation` and `route` props, and how React Navigation manages its state.

React Navigation is extensible and allows you to build sophisticated navigation structures like those discussed in the previous section (stacks, tabs, drawers).

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

6.  `@react-native-masked-view/masked-view` (Optional):
    - This dependency might be needed by `@react-navigation/stack` for certain UIKit-style header animations on iOS. If required for specific effects, you would install it via `npx expo install @react-native-masked-view/masked-view`.

#### Procedural Content: Installation and Setup

Setting up React Navigation involves installing these core packages and their dependencies. We'll primarily focus on the Expo workflow, which simplifies many aspects of the setup.

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
    To enable navigation, you need to wrap your entire application (usually in `App.tsx` or your main entry file) with the `NavigationContainer` component from `@react-navigation/native`. The `NavigationContainer` is responsible for managing the application's navigation state and connecting the navigator hierarchy to the device environment (handling deep links, back button behavior, etc.).

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

> [!TIP] > **Note for Bare React Native Projects:**
> While this course focuses on Expo, if you're working in a bare React Native project, the installation process for React Navigation and its dependencies involves a few extra native configuration steps:
>
> - **Installation:** Use `npm install` or `yarn add` for the packages.
> - **iOS:** After adding dependencies, navigate to your `ios` directory and run `npx pod-install ios` (or `pod install`) to link the native modules.
> - **Android:** You may need to prevent crashes related to activity restarts when the app is in the background. In `android/app/src/main/java/<your-package-name>/MainActivity.java` (or `.kt`), modify the `onCreate` method:
>
>   ```java
>   // MainActivity.java
>   // ...other imports
>   import android.os.Bundle;
>
>   public class MainActivity extends ReactActivity {
>     // ...other methods
>     @Override
>     protected void onCreate(Bundle savedInstanceState) {
>       super.onCreate(null); // Modified line for React Navigation
>     }
>   }
>   ```
>
>   (For Kotlin, the syntax is similar: `super.onCreate(null)` within `MainActivity.kt`).
>   Additionally, ensure your `MainActivity` has `android:launchMode="singleTask"` in the `android/app/src/main/AndroidManifest.xml` file if it isn't already set.
>
> Always consult the official React Navigation and respective dependency documentation for the most current bare workflow instructions.

This completes the basic installation and setup of React Navigation. In the following sections, we will learn how to define screens and use these navigators to build navigation flows.

#### Conceptual Content: Fundamental React Navigation Concepts

React Navigation operates on a set of core concepts that define its structure and programming model:

- **`NavigationContainer`**: As mentioned, this component is the root of your navigation structure. It manages the navigation state and handles interactions with the outside world (like deep linking and system back button).

- **Navigators**: These are special functions (e.g., `createNativeStackNavigator`, `createBottomTabNavigator`, `createDrawerNavigator`) that, when called, return an object containing two React components: a `Navigator` component and a `Screen` component (e.g., `Stack.Navigator` and `Stack.Screen`).

  - The `Navigator` component (e.g., `Stack.Navigator`) serves as a container that defines a specific navigation pattern (Stack, Tabs, Drawer) and holds the `Screen` components belonging to that pattern.

- **Screens**: These represent the individual views or pages within your application that users navigate between. They are defined using the `Screen` component provided by the specific navigator (e.g., `Stack.Screen`, `Tab.Screen`).
  Each `Screen` component requires at a minimum:

  - `name`: A unique string identifying the route (e.g., `"Home"`, `"UserDetails"`). This name is used programmatically when navigating to this screen.
  - `component`: The React component that should be rendered when this route is active (e.g., `HomeScreen`, `UserDetailsScreen`).
    > [!IMPORTANT]
    > You must pass the component reference directly (e.g., `component={HomeScreen}`). Do **not** pass an inline function (e.g., `component={() => <HomeScreen />}`), as this can lead to performance issues, unmounting/remounting of the screen, and loss of state.
  - `options` (optional): An object or a function returning an object used to configure the screen's appearance and behavior within the navigator (e.g., header title, tab icon, whether the header is shown). We'll explore these options in later sections.

- **`navigation` Prop**: Every component rendered as a `Screen` in your navigator automatically receives a `navigation` prop. This prop is the primary interface for triggering navigation actions. Key methods include:

  - `navigation.navigate('RouteName', { params })`: Navigates to another screen specified by `RouteName`. Optionally, you can pass `params` (an object) to the target screen.
  - `navigation.goBack()`: Returns to the previous screen in the stack.
  - `navigation.setParams({ newParams })`: Updates the parameters of the current screen. This merges `newParams` with existing ones.
  - `navigation.setOptions({ newOptions })`: Updates the screen's configuration options (e.g., header title) dynamically from within the component.
  - Other methods like `push`, `pop`, `popToTop` are available, especially for Stack navigators.

- **`route` Prop**: Alongside the `navigation` prop, screen components also receive a `route` prop. This prop holds information specific to the current route instance. Key properties include:
  - `route.name`: The name of the current route as defined in the `Screen` component's `name` prop.
  - `route.params`: An object containing parameters passed to this screen during navigation (e.g., via `navigation.navigate('Details', { userId: 123 })`).
  - `route.key`: A unique key for this specific instance of the screen in the navigation history.

Understanding these props is fundamental to interacting with the navigation system and building dynamic screen experiences.

#### Conceptual Content: Understanding Navigation State

React Navigation manages the application's navigation state internally. This state object represents the current structure and history of visited screens.

- **State Management:** The `NavigationContainer` is the central manager for this state object.
- **State Structure:** While the exact internal structure is an implementation detail and subject to change, the core accessible properties of a navigator's state are typically `index` (pointing to the currently active route in the `routes` array) and `routes` (an array representing the screens currently in the navigator's stack or list). For nested navigators, the state object itself becomes hierarchical.
  > [!CAUTION]
  > Direct manipulation of the navigation state object or reliance on its internal structure beyond officially documented APIs (like `index` and `routes` when using `getState` or `useNavigationState`) is strongly discouraged, as it can lead to unexpected behavior and break your app with library updates.
- **Accessing State:**

  - `navigation.getState()`: This method, available on the `navigation` prop, returns a snapshot of the current navigation state for the navigator that the screen belongs to. However, it does not trigger component re-renders if the state changes later. It's mainly useful within event listeners or callbacks where immediate reactivity isn't needed.
  - `useNavigationState` Hook: This hook is the recommended way to access navigation state reactively within a component. It accepts a selector function that receives the full state and returns a specific piece of data (e.g., `state => state.index`). The component will only re-render if the value returned by the selector changes, optimizing performance. Passing `state => state` will return the whole state object and cause re-renders on any state change.

    ```tsx
    import { useNavigationState } from "@react-navigation/native";

    function MyComponent() {
      const activeRouteName = useNavigationState(
        (state) => state.routes[state.index].name
      );
      // ...
    }
    ```

- **Immutability:** React Navigation relies on the immutability of the navigation state to detect changes and update the UI correctly. You should never attempt to directly mutate the state object. Always use methods provided by the `navigation` prop (like `navigate`, `setParams`) to trigger state changes.

Understanding these state concepts will help you debug navigation flows and build more advanced interactions when needed.

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

### Next Steps

With React Navigation installed and your app wrapped in `NavigationContainer`, you're ready to start building navigation structures. In the next section, we'll focus on setting up and using the Stack Navigator to manage a series of screens. Proceed to [Section 3: Stack Navigator Setup and Usage](./section-03-stack-navigator-setup-and-usage.md).
