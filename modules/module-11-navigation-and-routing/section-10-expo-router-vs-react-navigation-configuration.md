## Section 10: Expo Router vs. React Navigation Configuration

This section provides a comparative overview of configuring navigation using Expo Router versus the traditional React Navigation library. Both approaches have their strengths and are suitable for different use cases or developer preferences. Understanding these differences will help you decide which tool (or combination of tools) is best for your SpeedyMeds application or future projects.

> 🛣️ **(All Learners):** This section assumes you have a basic understanding of how to set up simple stack and tab navigators with both React Navigation (Sections 3 & 4) and Expo Router (Section 9).

### Core Content

#### Conceptual Content: Philosophical Differences

- **React Navigation (Traditional):**

  - **Explicit Configuration:** You define navigators (`createStackNavigator`, `createBottomTabNavigator`, etc.) and screens (`<Stack.Screen>`, `<Tab.Screen>`) explicitly in your JavaScript/TypeScript code.
  - **Component-Based:** Navigation structure is built using React components.
  - **Granular Control:** Offers fine-grained control over every aspect of the navigation behavior and appearance through props and options.
  - **Flexibility:** Highly flexible, allowing for complex and unconventional navigation patterns.

- **Expo Router:**
  - **Convention-Over-Configuration:** Relies on file-system conventions (the `app` directory structure) to define routes.
  - **File-System Based:** Routes are primarily determined by file and directory names.
  - **Simplified API (on top of React Navigation):** Uses React Navigation under the hood but provides a simpler API for common patterns, especially through layout routes (`_layout.tsx`).
  - **Opinionated (in a good way):** Guides you towards common patterns, potentially speeding up development for standard app structures.
  - **Universal by Design:** Strong emphasis on working across native and web platforms with minimal changes.

#### Comparative Analysis: Key Configuration Aspects

Let's compare how common navigation tasks are handled by each approach.

**1. Defining Screens/Routes:**

- **React Navigation:**
  You explicitly define each screen within a navigator component:

  ```tsx
  // React Navigation - App.tsx (simplified)
  const Stack = createStackNavigator();
  function MyStack() {
    return (
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Details" component={DetailsScreen} />
      </Stack.Navigator>
    );
  }
  ```

- **Expo Router:**
  You create files in the `app` directory:
- `app/index.tsx` (becomes `/` or your initial route for the layout)
- `app/details.tsx` (becomes `/details`)
  The navigator itself is defined in a `_layout.tsx` file:
  ```tsx
  // Expo Router - app/_layout.tsx (simplified)
  import { Stack } from "expo-router";
  export default function AppLayout() {
    return (
      <Stack>
        <Stack.Screen name="index" options={{ title: "Home" }} />
        <Stack.Screen name="details" options={{ title: "Details" }} />
      </Stack>
    );
  }
  ```

**2. Creating a Stack Navigator:**

- **React Navigation:** Use `createStackNavigator` and then `<Stack.Navigator>` and `<Stack.Screen>` components.
- **Expo Router:** Create an `app/_layout.tsx` file (or a layout for a specific segment like `app/(main)/_layout.tsx`) and export a component that returns `<Stack>...</Stack>` from `expo-router`.
  ```tsx
  // Expo Router - app/_layout.tsx
  import { Stack } from "expo-router/stack";
  export default () => <Stack />;
  ```
  Individual screen options are often set in this layout or can be set directly in the screen files using `<Stack.Screen options={{...}} />` from `expo-router`.

**3. Creating a Tab Navigator:**

- **React Navigation:** Use `createBottomTabNavigator` and then `<Tab.Navigator>` and `<Tab.Screen>` components.
- **Expo Router:** Create a layout file (e.g., `app/(tabs)/_layout.tsx`) for a route group. This layout exports a component returning `<Tabs>...</Tabs>` from `expo-router`.
  ```tsx
  // Expo Router - app/(tabs)/_layout.tsx
  import { Tabs } from "expo-router/tabs";
  export default () => <Tabs />;
  ```
  Screens for tabs are files within the `(tabs)` directory (e.g., `app/(tabs)/home.tsx`). `Tabs.Screen` components in the layout link these files to tabs and configure them.

**4. Passing Parameters:**

- **React Navigation:**
- Pass via `navigation.navigate('RouteName', { param1: value })`.
- Access via `route.params.param1`.
- Type safety via `RootStackParamList` (or similar) and `StackScreenProps`.

- **Expo Router:**
- For dynamic routes (e.g., `app/medications/[id].tsx`), parameters are part of the URL.
- Access via `useLocalSearchParams()` or `useGlobalSearchParams()`.
- Linking with parameters: `<Link href={{ pathname: '/medications/[id]', params: { id: '123' } }} />` or `<Link href="/medications/123">`.
- Type safety for params can be achieved using generics with `useLocalSearchParams<{ id: string }>()` and with Expo Router's typed routes feature.

**5. Configuring Screen Options (e.g., Header Title, Tab Icons):**

- **React Navigation:**
- Use the `options` prop on `<Stack.Screen>` or `<Tab.Screen>`.
- Use the `screenOptions` prop on the navigator component (`<Stack.Navigator>`, `<Tab.Navigator>`) for defaults.

- **Expo Router:**
- Use the `options` prop on `<Stack.Screen>` or `<Tabs.Screen>` _within the relevant `_layout.tsx` file_.
- Alternatively, a screen component itself can export a static `options` object or use `<Stack.Screen options={{...}} />` or `<Tabs.Screen options={{...}} />` from `expo-router` directly within its own file to configure its appearance in the parent layout navigator.
  ```tsx
  // Expo Router - app/profile.tsx (configuring its own stack options)
  import { Stack } from "expo-router";
  // ...
  export default function ProfileScreen() {
    return (
      <View>
        <Stack.Screen options={{ title: "My Custom Profile Title" }} />
        <Text>Profile Content</Text>
      </View>
    );
  }
  ```

**6. Nesting Navigators:**

- **React Navigation:** A screen component for one navigator can be another navigator component (e.g., a `Tab.Screen` component renders a `StackNavigator` component).
- **Expo Router:** Achieved through nested `_layout.tsx` files and route groups. For example, `app/(tabs)/_layout.tsx` defines tabs, and `app/(tabs)/(medications)/_layout.tsx` could define a stack for the `(medications)` segment, which is then referenced as a screen in the tabs layout.

#### Table: Feature Comparison at a Glance

| Feature               | React Navigation (Traditional)                     | Expo Router                                                                   |
| --------------------- | -------------------------------------------------- | ----------------------------------------------------------------------------- |
| **Route Definition**  | JavaScript/TypeScript code (explicit)              | File system (convention-based)                                                |
| **Navigator Setup**   | `createXNavigator()`, `<Navigator>`, `<Screen>`    | `_layout.tsx` files with `<Stack>`, `<Tabs>`, etc.                            |
| **Screen Components** | Standard React components                          | Standard React components (files in `app/`)                                   |
| **Linking**           | `navigation.navigate()`, `navigation.push()`       | `<Link href="...">`, `router.push()`                                          |
| **Parameters**        | `route.params`, typed via `ParamList`              | `useLocalSearchParams()`, typed routes                                        |
| **Layouts/Shared UI** | Custom components, HOCs, or nesting navigators     | `_layout.tsx` files, route groups `(group)`                                   |
| **Deep Linking**      | Requires manual configuration (linking prop, etc.) | More automated, URL-focused by design                                         |
| **Web Support**       | Possible, but may need more platform-specific code | Strong focus, often works out-of-the-box                                      |
| **Learning Curve**    | Steeper initially for complex setups               | Potentially gentler for common patterns (if familiar with file-based routing) |
| **Underlying Engine** | Is the engine itself                               | Built on top of React Navigation                                              |

#### When to Choose Which?

- **Choose React Navigation (Traditional) when:**

  - You need extremely complex or unconventional navigation patterns not easily mapped to file structures.
  - You prefer explicit, code-based configuration for everything.
  - You are working on a project that already heavily uses this pattern and migrating is not feasible.
  - You are not using Expo or prefer to manage all dependencies and configurations manually.

- **Choose Expo Router when:**
  - You are starting a new Expo project (SDK 49+).
  - You prefer convention-over-configuration and file-system-based routing (similar to Next.js).
  - You want a streamlined approach for universal apps (iOS, Android, Web).
  - You want simplified deep linking and URL handling.
  - Your app structure fits well with directory-based route organization.

> [!IMPORTANT]
> Expo Router uses React Navigation for its core functionalities. So, you are still benefiting from the robustness of React Navigation. Expo Router primarily offers a different, often more convenient, way to define and manage your routes and layouts.

> 📚 **Official Documentation:**
>
> - [Expo Router: Comparison to React Navigation](https://docs.expo.dev/router/comparison/)
> - [React Navigation: Thinking in React Navigation](https://reactnavigation.org/docs/thinking-in-react-navigation/)

#### Next Steps

Understanding both React Navigation and Expo Router provides you with versatile tools for tackling any navigation challenge. The final topic in this module is deep linking, which allows users to navigate to specific content within your app from external sources. We will explore how Expo Router simplifies this process.
