## Section 8: Introduction to Expo Router

This section introduces Expo Router, a file-system-based routing solution for React Native and web applications built with Expo. It offers a different paradigm for defining navigation compared to the more explicit configuration required by React Navigation. We will explore its core concepts, benefits, and how it simplifies setting up routes in your SpeedyMeds application.

> 🛣️ **(All Learners):** Expo Router is built on top of React Navigation. Understanding the fundamental React Navigation concepts (navigators, screens) covered in previous sections will provide a good foundation for grasping how Expo Router works under the hood.

### Core Content

#### Conceptual Content: What is Expo Router?

Expo Router is a routing library from Expo that enables file-system-based routing for native mobile (iOS and Android) and web platforms. This means you define your app's routes by organizing files and directories within a specific project folder (usually `app/`), similar to how routing works in web frameworks like Next.js or Remix.

**Key Features & Benefits:**

- **File-System Routing:** Define routes by creating files and folders. This can lead to a more intuitive and organized project structure for navigation.
- **Universal (Cross-Platform):** Works seamlessly across iOS, Android, and web from a single codebase.
- **Built on React Navigation:** Leverages the power and stability of React Navigation for native navigation primitives (stack, tabs, etc.) while providing a simpler API on top.
- **Layouts:** Define shared UI components (like headers or tab bars) for groups of routes using layout files.
- **Typed Routes (with TypeScript):** Provides utilities for type-safe navigation and parameter passing.
- **Deep Linking Simplified:** Handles deep linking and URL integration more automatically.
- **API Routes:** Supports creating server-side API endpoints within your Expo app (primarily for web/serverful contexts).
- **Fast Refresh & Hot Reloading:** Excellent developer experience with Expo's tooling.

Expo Router aims to simplify the setup and maintenance of navigation by making it more declarative and convention-based.

#### Conceptual Content: Core Concepts of Expo Router

1.  **The `app` Directory:** This is the heart of Expo Router. All files within the `app` directory (at the root of your project) are automatically treated as routes.

    - `app/index.tsx`: Becomes the home screen (route `/`).
    - `app/profile.tsx`: Becomes the `/profile` route.
    - `app/settings/index.tsx`: Becomes the `/settings` route.
    - `app/settings/notifications.tsx`: Becomes the `/settings/notifications` route.

2.  **Dynamic Routes:** Create routes with dynamic segments by using square brackets in filenames.

    - `app/medications/[id].tsx`: Matches routes like `/medications/aspirin123` or `/medications/amox456`. The `id` value becomes a route parameter.
    - `app/users/[...rest].tsx`: A catch-all or deep dynamic route.

3.  **Layout Routes (`_layout.tsx`):** These special files define shared UI and navigation structure for a segment of routes (a directory and its children).

    - An `app/_layout.tsx` file at the root of the `app` directory can define the root navigator (e.g., a Stack, Tabs, or Drawer navigator) for the entire app. When Expo Router initializes, this root layout effectively replaces the traditional `App.tsx` (from the project root) as the main UI entry point for your application.
    - A `app/settings/_layout.tsx` file can define a specific navigator (e.g., a Stack navigator) just for routes within the `settings` directory.
    - Layouts are where you configure your React Navigation navigators (Stack, Tabs, Drawer) using components provided by Expo Router.
    - **The `<Slot />` Component:** Layout routes use the `<Slot />` component (imported from `expo-router`) to render their child routes. Think of `<Slot />` as a placeholder where the content of the matched child route will be injected. If a layout route uses a specific navigator component like `<Stack />`, `<Tabs />`, or `<Drawer />` (from `expo-router`), these components implicitly handle rendering the child routes, effectively acting like specialized Slots. You typically don't use `<Slot />` _and_ a navigator component like `<Stack />` in the same layout; the navigator itself manages the rendering of its children (screens).

4.  **Navigators in Expo Router (`Stack`, `Tabs`, `Drawer`):**
    Expo Router provides its own versions of Stack, Tabs, and Drawer components (e.g., `import { Stack } from 'expo-router/stack';`). You use these within your `_layout.tsx` files to define the navigation structure.

    - `<Stack />`: Renders a stack navigator for the current directory segment.
    - `<Tabs />`: Renders a tab navigator.
    - `<Drawer />`: Renders a drawer navigator.
      Screen configuration (like titles, header options) is done directly on these navigator components or on their `Screen` children within the layout file.

5.  **Linking (`<Link />` component and `router` object):**

    - `expo-router` provides a `<Link href="/routeName">` component for declarative navigation, similar to an `<a>` tag in HTML.
    - It also provides a `router` object (e.g., `import { router } from 'expo-router';`) with imperative methods like `router.push('/routeName')`, `router.replace('/routeName')`, and `router.back()`.

6.  **Route Groups (`(group-name)`):**
    Directories named with parentheses, like `app/(tabs)/home.tsx`, are used to organize files or define layouts without affecting the URL structure. This is useful for grouping routes under a common layout (e.g., a tab bar defined in `app/(tabs)/_layout.tsx`) without adding `(tabs)` to the URL path.

7.  **Underlying Mechanism: Built on React Navigation:**
    It's important to understand that Expo Router is built on top of React Navigation. At build time, Expo Router translates your file system structure (files and layouts in the `app` directory) into a standard React Navigation configuration object. At runtime, the actual navigation state management (tracking active screens, history, parameters) is still handled by React Navigation's core. This means that many concepts and capabilities from React Navigation (like screen options, navigator props, and even some hooks if used carefully) can still be relevant or accessible, though Expo Router aims to provide a more streamlined API for most common use cases.

#### Procedural Content: Initial Setup for Expo Router

Adding Expo Router to an existing Expo project or starting a new one with it is straightforward.

**1. Installation (for a new project or adding to existing):**

If starting a new project, you can use a template that includes Expo Router:

```bash
npx create-expo-app@latest --template blank-typescript-router-example MySpeedyMedsAppWithRouter
cd MySpeedyMedsAppWithRouter
```

Or, for an existing Expo SDK 49+ project:

```bash
npx expo install expo-router react-native-screens react-native-safe-area-context expo-linking expo-constants expo-status-bar
```

**2. Configure `package.json`:**

Add the `main` entry point to your `package.json` if it's not already there or update it:

```json
{
  "main": "expo-router/entry"
}
```

**3. Modify `babel.config.js` (if needed):**

Add the `expo-router/babel` plugin:

```javascript
// babel.config.js
module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      // Required for expo-router
      "expo-router/babel",
      // Other plugins...
      "react-native-reanimated/plugin", // If using Drawer or advanced animations
    ],
  };
};
```

**4. Configure `app.json` (Expo Config File):**

Ensure your Expo configuration file (`app.json` or `app.config.js/ts`) is set up for Expo Router, especially for web support and deep linking schemes.

```json
// app.json (example modifications)
{
  "expo": {
    "name": "MySpeedyMedsAppWithRouter",
    "slug": "myspeedymedsappwithrouter",
    // Add a custom scheme for deep linking
    "scheme": "myspeedymedsapp",
    "web": {
      // Ensure bundler is metro for Expo Router web support
      "bundler": "metro"
    },
    "plugins": [
      "expo-router"
      // Potentially "expo-font" or other plugins
    ]
    // ... other configurations
  }
}
```

- `scheme`: Defines a URL scheme for your app, essential for deep linking (e.g., `myspeedymedsapp://profile`).
- `web.bundler: "metro"`: Expo Router requires Metro for web support.
- `plugins: ["expo-router"]`: This plugin should be added to integrate Expo Router capabilities like API routes and further configuration.

After changes to `babel.config.js`, `package.json`, or `app.json`, you may need to restart your development server with the cache cleared (`npx expo start -c`).

**5. Create the `app` Directory:**

Create an `app` directory at the root of your project. This is where your routes will live.
Example: `mkdir app`

**6. Create a Root Layout (`app/_layout.tsx`):**

This file defines the root navigator for your app. For example, a simple stack navigator:

```tsx
// app/_layout.tsx
import { Stack } from "expo-router/stack";

/**
 * Defines the root layout for the application using Expo Router.
 * This component sets up a Stack navigator as the primary navigation structure.
 * It includes screens for the home page (`index`) and a profile page (`profile`).
 * @returns {JSX.Element} The root Stack navigator.
 */
export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: "SpeedyMeds Home" }} />
      <Stack.Screen name="profile" options={{ title: "My Profile" }} />
      {/* Add other global screens or nested navigators here */}
    </Stack>
  );
}
```

**7. Create Your First Screen (`app/index.tsx`):**

```tsx
// app/index.tsx
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Link } from "expo-router";

/**
 * Represents the home screen of the SpeedyMeds application when using Expo Router.
 * Displays a welcome message and links to other sections like Profile and an example medication detail page.
 * @returns {JSX.Element} The rendered home screen component.
 */
export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to SpeedyMeds!</Text>
      <Link href="/profile" style={styles.link}>
        Go to Profile
      </Link>
      <Link href="/medications/aspirin123" style={styles.link}>
        View Aspirin Details (Example)
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 16 },
  link: {
    marginVertical: 8,
    fontSize: 16,
    color: "blue",
    textDecorationLine: "underline",
  },
});
```

**8. Create Another Screen (e.g., `app/profile.tsx`):**

```tsx
// app/profile.tsx
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Stack } from "expo-router"; // To configure screen-specific options if needed

/**
 * Represents the user profile screen in the SpeedyMeds application using Expo Router.
 * Displays basic user information like name and email.
 * @returns {JSX.Element} The rendered profile screen component.
 */
export default function ProfileScreen() {
  return (
    <View style={styles.container}>
      {/* Screen-specific header config can go here if not in _layout */}
      {/* <Stack.Screen options={{ title: 'User Profile' }} /> */}
      <Text style={styles.title}>My Profile</Text>
      <Text>Name: John Doe</Text>
      <Text>Email: john.doe@example.com</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 16 },
});
```

Now, when you run your app (`npx expo start`), Expo Router will pick up these files and create the navigation structure.

> 📚 **Official Documentation:**
>
> - [Expo Router: Introduction](https://docs.expo.dev/router/introduction/)
> - [Expo Router: Installation](https://docs.expo.dev/router/installation/)
> - [Expo Router: File Conventions (Routing)](https://docs.expo.dev/router/routing/)
> - [Expo Router: Layouts](https://docs.expo.dev/router/layouts/)
> - [Expo Router: Navigating Between Pages](https://docs.expo.dev/router/navigating/)

> 🌐 **(Web Developers using Next.js/Remix):**
>
> **Comparison:** The file-system routing based on an `app` directory, dynamic routes with `[param].tsx`, and layout files (`_layout.tsx`) will feel very familiar. Expo Router brings this productive development pattern to native mobile development.
>
> **Key Takeaway:** You can leverage your existing mental model for routing from these modern web frameworks.

> ⚛️ **(React Developers using React Navigation):**
>
> **Comparison:** Instead of explicitly creating navigator components (`createStackNavigator`, `createBottomTabNavigator`) and defining screens within them in JavaScript, you primarily define routes through file structure and configure navigators in `_layout.tsx` files. React Navigation is still used under the hood.
>
> **Key Takeaway:** Expo Router offers a higher-level, convention-over-configuration approach on top of React Navigation's capabilities.

#### Next Steps

With a basic understanding of Expo Router and its setup, the next section will delve deeper into how file-based routing works in practice, including creating stack and tab navigators using layouts, and handling dynamic routes for the SpeedyMeds app.
