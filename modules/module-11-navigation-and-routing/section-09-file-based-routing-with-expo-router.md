## Section 9: File-Based Routing with Expo Router in Practice

This section delves into the practical application of Expo Router's file-based routing paradigm. You will learn how to implement common navigation patterns such as Stack, Tab, and Drawer navigators using layout routes (`_layout.tsx`) and how to leverage Expo Router's features for typed routes to build more robust applications like SpeedyMeds.

> 🛣️ **(All Learners):** Building on the introduction to Expo Router, this section will solidify your understanding of how file structure translates into navigation structure. Pay attention to the role of `_layout.tsx` files in defining navigators.

### Core Content

#### Conceptual Content: From Files to Navigators

Expo Router uses the file system to define your app's navigation structure. Each file in the `app/` directory typically corresponds to a route, and special `_layout.tsx` files define the navigator components (like Stack, Tabs, or Drawer) that wrap these routes.

- **Layout Routes (`_layout.tsx`):** These are the cornerstone for defining navigators. A `_layout.tsx` file in a directory configures the navigator for all routes within that directory and its subdirectories (unless another nested `_layout.tsx` takes precedence).
- **Navigator Components:** Expo Router provides its own navigator components (e.g., `import { Stack } from 'expo-router';`, `import { Tabs } from 'expo-router';`, `import { Drawer } from 'expo-router';`). These are used within `_layout.tsx` files.
- **Screen Configuration:** Options for screens (like header titles, tab icons, drawer labels) are typically configured using the `<Navigator.Screen name="route-file-name" />` component directly within the `_layout.tsx` file associated with that route's segment.

#### Procedural Content: Implementing Navigators with Layout Routes

Let's explore how to set up Stack, Tabs, and Drawer navigators.

**1. Stack Navigator with Expo Router**

Stack navigators are used for hierarchical navigation where screens are pushed onto and popped from a stack.

- **File Structure Example:**

  ```
  app/
  ├── (main)/              # Route group for the main stack
  │   ├── _layout.tsx      # Defines the Stack navigator for (main)
  │   ├── index.tsx        # Corresponds to route '/' within the (main) stack
  │   ├── details.tsx      # Corresponds to route '/details' within the (main) stack
  │   └── item/[id].tsx    # Dynamic route '/item/:id'
  └── _layout.tsx          # Root layout, could mount the (main) stack
  ```

- **Example `app/(main)/_layout.tsx` (Stack Navigator Definition):**

  ```tsx
  // app/(main)/_layout.tsx
  import { Stack } from "expo-router";

  export default function MainStackLayout() {
    return (
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: "#f4511e" },
          headerTintColor: "#fff",
        }}
      >
        <Stack.Screen name="index" options={{ title: "SpeedyMeds Home" }} />
        <Stack.Screen name="details" options={{ title: "Details Page" }} />
        <Stack.Screen
          name="item/[id]" // Use file path for dynamic routes
          options={{ title: "Item Details" }}
        />
      </Stack>
    );
  }
  ```

  - The `Stack` component from `expo-router` creates the stack.
  - `Stack.Screen` components correspond to the files in the `app/(main)/` directory. The `name` prop should match the filename (without extension) or the file path for nested/dynamic routes.
  - `options` on `Stack.Screen` or `screenOptions` on `Stack` are used for configuration (e.g., `title`, `headerStyle`).

- **Example `app/_layout.tsx` (Root Layout Mounting the Stack):**

  ```tsx
  // app/_layout.tsx
  import { Slot } from "expo-router";
  // Or specifically import the stack if it's the only thing
  // import { Stack } from 'expo-router/stack'; // if using a stack from a group like (app)

  export default function RootLayout() {
    // If (main) is your primary navigator, you might just render its slot.
    // Or, if you have multiple top-level groups/navigators, this root layout
    // might be a Stack navigator itself.
    // For simplicity, assuming (main) stack is the primary content:
    return <Slot />; // This will render the navigator defined in app/(main)/_layout.tsx
    // if (main)/index.tsx or other (main) route is matched.
    // More robustly, you'd often have a <Stack> or <Tabs> here.
    // For example, if (main) was named `(app)`:
    // return <Stack screenOptions={{ headerShown: false }} />;
    // This assumes your routes are structured like app/(app)/index.tsx etc.
    // The key is that app/_layout.tsx sets up the *root* navigator context.
  }
  ```

  A common pattern is for `app/_layout.tsx` to define a root navigator (like a Stack) and then have other navigators (like a Tab navigator defined in `app/(tabs)/_layout.tsx`) as screens within that root stack.

**2. Tab Navigator with Expo Router**

Tab navigators are ideal for primary, distinct sections of an app.

- **File Structure Example:**

  ```
  app/
  ├── (tabs)/              # Route group for the tabs
  │   ├── _layout.tsx      # Defines the Tabs navigator
  │   ├── home.tsx         # Route '/home' within tabs
  │   ├── prescriptions.tsx # Route '/prescriptions'
  │   └── settings.tsx     # Route '/settings'
  └── _layout.tsx          # Root layout, could mount the (tabs) group
  ```

- **Example `app/(tabs)/_layout.tsx` (Tabs Navigator Definition):**

  ```tsx
  // app/(tabs)/_layout.tsx
  import { Tabs } from "expo-router";
  import Ionicons from "@expo/vector-icons/Ionicons"; // Example

  export default function TabLayout() {
    return (
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: "tomato",
          tabBarInactiveTintColor: "gray",
        }}
      >
        <Tabs.Screen
          name="home" // Corresponds to app/(tabs)/home.tsx
          options={{
            title: "Home",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="home" color={color} size={size} />
            ),
          }}
        />
        <Tabs.Screen
          name="prescriptions" // Corresponds to app/(tabs)/prescriptions.tsx
          options={{
            title: "Meds",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="medkit" color={color} size={size} />
            ),
          }}
        />
        <Tabs.Screen
          name="settings" // Corresponds to app/(tabs)/settings.tsx
          options={{
            title: "Settings",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="settings" color={color} size={size} />
            ),
          }}
        />
      </Tabs>
    );
  }
  ```

  - The `Tabs` component from `expo-router` creates the tab bar.
  - `Tabs.Screen` configures each tab, linking to files in `app/(tabs)/`.
  - Options like `title`, `tabBarLabel`, `tabBarIcon` are set on `Tabs.Screen`.

- **Root Layout (`app/_layout.tsx`)**: This would typically mount the `(tabs)` layout, often by simply being a `<Stack />` or `<Slot />` that defaults to the `(tabs)` group if it contains the initial route (`index.tsx` within `(tabs)` or `(tabs)/home.tsx` if no index).

  ```tsx
  // app/_layout.tsx
  import { Stack } from "expo-router";

  export default function RootLayout() {
    // This setup makes the (tabs) navigator available at the root.
    // The headerShown: false on the Stack containing the Tabs
    // prevents a double header if the Tabs layout also uses a Stack.
    return <Stack screenOptions={{ headerShown: false }} />;
  }
  ```

**3. Drawer Navigator with Expo Router**

Drawer navigators provide a slide-out menu.

- **File Structure Example:**

  ```
  app/
  ├── (drawer)/            # Route group for the drawer
  │   ├── _layout.tsx      # Defines the Drawer navigator
  │   ├── feed.tsx         # Route '/feed' within drawer
  │   ├── notifications.tsx# Route '/notifications'
  │   └── (mainContent)/   # A nested stack or tabs for the main area
  │       ├── _layout.tsx  # Layout for main content (e.g., a Stack)
  │       ├── index.tsx    # Default screen for mainContent
  │       └── ...
  └── _layout.tsx          # Root layout
  ```

- **Example `app/(drawer)/_layout.tsx` (Drawer Navigator Definition):**

  ```tsx
  // app/(drawer)/_layout.tsx
  import { Drawer } from "expo-router/drawer"; // Or import { Drawer } from "expo-router"
  import Ionicons from "@expo/vector-icons/Ionicons";

  export default function DrawerLayout() {
    return (
      <Drawer
        screenOptions={{
          drawerActiveTintColor: "blue",
          drawerInactiveTintColor: "gray",
          // headerShown: false, // Often true to get a header with a hamburger menu
        }}
      >
        <Drawer.Screen
          name="feed" // Corresponds to app/(drawer)/feed.tsx
          options={{
            drawerLabel: "News Feed",
            title: "Feed",
            drawerIcon: ({ color, size }) => (
              <Ionicons name="newspaper" color={color} size={size} />
            ),
          }}
        />
        <Drawer.Screen
          name="notifications" // Corresponds to app/(drawer)/notifications.tsx
          options={{
            drawerLabel: "Updates",
            title: "Notifications",
            drawerIcon: ({ color, size }) => (
              <Ionicons name="notifications" color={color} size={size} />
            ),
          }}
        />
        {/* This screen represents the main content area, likely a Stack or Tabs */}
        {/* It won't appear in the drawer list itself if its name starts with an underscore */}
        {/* or is a group like (mainContent) */}
        <Drawer.Screen
          name="(mainContent)" // This refers to the app/(drawer)/(mainContent)/_layout.tsx navigator
          options={{
            drawerLabel: "Home", // Label for the drawer item if it were to be shown
            title: "SpeedyMeds App", // Header title for the content area
            // headerShown: false, // If (mainContent) has its own header
          }}
        />
      </Drawer>
    );
  }
  ```

  - The `Drawer` component (e.g., from `expo-router/drawer`) creates the drawer.
  - `Drawer.Screen` configures items. Use options like `drawerLabel`, `title`, and `drawerIcon`.
  - To integrate main app content (like a Stack or Tabs) within a drawer, you often define that content in a route group (e.g., `(mainContent)`) and reference it as a `Drawer.Screen`. The header for the main content (with the hamburger icon) is typically part of the `Drawer.Screen` options for this main content route, or configured within the `(mainContent)/_layout.tsx` itself.

#### Conceptual Content: Typed Routes in Expo Router

Expo Router supports generating types for your routes, providing autocompletion and compile-time checks for route paths and parameters. This greatly enhances developer experience and reduces runtime errors.

- **Benefits:**

  - Catch typos in route names during development.
  - Get autocompletion for `href` props in `<Link>` components and for `router.push()`, etc.
  - Ensure required parameters are passed and that their types are correct (when combined with `useLocalSearchParams` generics).

- **Type Generation:**

  - Expo Router can automatically generate a `typed-router.d.ts` file. This process is often triggered during the `npx expo prebuild --clean` command or can be part of the development server's startup or build phase. Consult the latest Expo Router documentation for specific commands if needed for manual generation.
  - Once generated, your editor should pick up these types, enabling features like typed links.

- **Accessing Route Information (Typed):**

  - `useLocalSearchParams<T>()`: As seen in Section 6, you can provide a generic type `T` to `useLocalSearchParams` that matches your expected parameters for the current route, giving you typed access to them.
  - `useGlobalSearchParams<T>()`: Similar to `useLocalSearchParams` but for accessing parameters that could be present on any route in the app (global query params).
  - `usePathname()`: A hook that returns the current route's pathname string (e.g., `/users/profile`).
  - `useSegments<T extends string[]>()`: Returns an array of the current route's segments (e.g., `['users', 'profile']`).

- **Example of Typed Navigation (Conceptual):**
  While direct `Link hrefTyped` might not be the exact syntax (it depends on editor integration and generated types), the principle is that the `href` prop will be type-checked:

  ```tsx
  // Assuming types are generated for a route like /users/[id].tsx
  import { Link } from "expo-router";

  // Valid: with correct param
  <Link href={{ pathname: "/users/[id]", params: { id: "123" } }}>
    View User
  </Link>;

  // Invalid: editor might warn if 'id' is missing or wrong type
  // <Link href="/users">View User</Link> // if /users expects an ID
  // <Link href={{ pathname: "/users/[id]", params: { userId: "123" } }}>View User</Link> // if param is 'id', not 'userId'
  ```

  The primary benefit comes from autocompletion and error checking when constructing `href` objects or using `router.push()` with pathnames and params.

> 📚 **Official Documentation:**
>
> - [Expo Router: Layouts and Navigators](https://docs.expo.dev/router/layouts/)
> - [Expo Router: Stack Navigator](https://docs.expo.dev/router/navigators/stack/)
> - [Expo Router: Tabs Navigator](https://docs.expo.dev/router/navigators/tabs/)
> - [Expo Router: Drawer Navigator](https://docs.expo.dev/router/navigators/drawer/)
> - [Expo Router: Typed Routes](https://docs.expo.dev/router/reference/typed-routes/)
> - [Expo Router: Linking and Navigation](https://docs.expo.dev/router/navigating/)

> 🌐 **(Web Developers using File-System Routers):**
>
> **Comparison:** The way `_layout.tsx` files define shared UI for a directory (segment) is very similar to layout components in Next.js (e.g., `layout.tsx` or `template.tsx`) or Remix (`app/routes/_index.tsx` structure). The navigator components (`Stack`, `Tabs`) are specific to Expo Router but serve the same purpose of structuring the UI for that segment.
>
> **Key Takeaway:** The pattern of collocated layouts defining the "chrome" for a set of routes is consistent.

> ⚛️ **(React Developers using React Navigation):**
>
> **Comparison:** Instead of imperatively defining `createStackNavigator().Navigator` and then nesting `Screen` components with their `component` props, you define the navigator type in `_layout.tsx` (e.g., `<Stack />`) and Expo Router automatically maps files in that directory to screens within that stack. Screen-specific options are still applied, but typically within the `_layout.tsx` file on the `<Navigator.Screen name="filename" />` elements.
>
> **Key Takeaway:** Configuration shifts from being purely in JavaScript objects/components to being driven by file structure, with `_layout.tsx` files acting as the configuration hub for each segment.

#### Exercise 11.4: Implementing Stack and Tabs with Expo Router

This exercise will guide you through setting up a nested Stack and Tab navigation structure using Expo Router's file-based conventions.

**(Placeholder: URL_to_Expo_Snack_for_Exercise_11.4)**

> **Instructions for Expo Snack `README.md` (Exercise 11.4):**
>
> ```md
> # Exercise 11.4: Implementing Stack and Tabs with Expo Router
>
> **Objective:** Recreate a common mobile navigation pattern: a root Stack navigator that contains a Tab navigator for its main screen, and another separate screen within the Stack.
>
> **File Structure Goal:**
> ```
>
> app/
> ├── \_layout.tsx # Root Stack Navigator
> ├── (tabs)/
> │ ├── \_layout.tsx # Tab Navigator
> │ ├── index.tsx # Home screen (first tab)
> │ └── profile.tsx # Profile screen (second tab)
> └── settings.tsx # Settings screen (part of the root Stack)
>
> ```
>
> **Tasks:**
>
> 1.  **Project Setup:**
>     - Ensure your project is configured for Expo Router (as per Section 8).
>
> 2.  **Create the Root Layout (`app/_layout.tsx`):**
>     - This file should define a `Stack` navigator.
>     - It should have two screens:
>       - One screen named `(tabs)` which will render the Tab navigator. Use `options={{ headerShown: false }}` for this screen to avoid a double header.
>       - Another screen named `settings` which will render the `app/settings.tsx` file. Give it a title like "App Settings".
>
> 3.  **Create the Tabs Layout (`app/(tabs)/_layout.tsx`):**
>     - This file should define a `Tabs` navigator.
>     - It should have two screens:
>       - `index` (for `app/(tabs)/index.tsx`): Title "Home", appropriate `tabBarIcon`.
>       - `profile` (for `app/(tabs)/profile.tsx`): Title "Profile", appropriate `tabBarIcon`.
>
> 4.  **Create Screen Content Files:**
>     - `app/(tabs)/index.tsx`:
>       - Display a "Home Screen" title.
>       - Add a `<Link href="/settings">` to navigate to the Settings screen.
>       - Add a `<Link href="/profile">` to navigate to the Profile tab.
>     - `app/(tabs)/profile.tsx`:
>       - Display a "Profile Screen" title.
>     - `app/settings.tsx`:
>       - Display a "Settings Screen" title.
>
> 5.  **Styling (Basic):**
>     - Ensure all screens have appropriate header titles.
>     - Ensure tabs have icons and labels.
>
> **Expected Outcome:**
>
> - The app opens to the "Home" screen, which is the first tab of a Tab navigator.
> - The Tab navigator has "Home" and "Profile" tabs with icons.
> - There is no header above the Tab navigator itself (because `headerShown: false` was set on the `(tabs)` screen in the root Stack).
> - Individual screens *within* the tabs (if they were stacks themselves, not in this exercise) or the `settings` screen would show their own headers. The "Settings Screen" should have its header "App Settings".
> - Clicking the link to "Settings" from the Home screen should navigate to the "Settings Screen" (pushing it onto the root Stack).
> - Clicking the link to "Profile" from the Home screen should switch to the "Profile" tab.
>
> **Bonus:**
> - In `app/(tabs)/index.tsx`, use the `router.push('/settings')` method for navigation instead of `<Link>`.
> - Experiment with adding a header to the `Tabs` navigator itself in `app/(tabs)/_layout.tsx` by wrapping the `<Tabs />` component in a `<Stack />` within that file (this demonstrates how layouts can also be nested navigators).
> ```

#### Next Steps

Understanding how React Navigation and Expo Router are configured sets the stage for comparing their approaches directly. The next section will provide a comparative look at their setup, configuration, and typical usage patterns.
