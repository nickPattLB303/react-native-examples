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

#### Comparative Analysis: Key Aspects

Let's compare how common navigation tasks and general characteristics differ between each approach.

**1. Setup Complexity:**

- **React Navigation:** Involves installing multiple packages (`@react-navigation/native`, specific navigator packages like `@react-navigation/stack`, and peer dependencies such as `react-native-screens`, `react-native-safe-area-context`, `react-native-gesture-handler`, `react-native-reanimated`). Requires wrapping the app in `<NavigationContainer>`. For features like drawer navigation, `react-native-reanimated` needs its Babel plugin configured. Bare React Native projects require additional native setup (e.g., `pod install` for iOS, `MainActivity.java` modifications for Android).
- **Expo Router:** Initial setup typically involves installing `expo-router` (which pulls in necessary dependencies like `react-native-screens`, `react-native-safe-area-context`, `expo-linking`). Configuration includes setting `"main": "expo-router/entry"` in `package.json`, adding the `expo-router/babel` plugin to `babel.config.js`, and potentially configuring `app.json` (e.g., for a deep linking `scheme` or web bundler settings). The core structure revolves around creating the `app/` directory and `_layout.tsx` files.

**2. Defining Screens/Routes:**

- **React Navigation:** You explicitly define each screen as a component passed to `<Navigator.Screen name="UniqueName" component={ScreenComponent} />` within a navigator component.
- **Expo Router:** Files created in the `app/` directory (e.g., `app/index.tsx`, `app/details.tsx`) automatically become routes based on their file path. The navigator configuration that wraps these routes is defined in a corresponding `_layout.tsx` file.

**3. Creating Navigators (Stack, Tabs, Drawer):**

- **React Navigation:** Use functions like `createStackNavigator`, `createBottomTabNavigator`, `createDrawerNavigator`, and then use their respective `<Navigator>` and `<Screen>` components in your JavaScript/TypeScript code.
- **Expo Router:** In a `_layout.tsx` file for a specific directory segment, you import and use navigator components like `<Stack />`, `<Tabs />`, or `<Drawer />` (from `expo-router`, `expo-router/stack`, etc.). Files within that directory then become screens for that navigator.

**4. Passing Parameters:**

- **React Navigation:** Parameters are passed as an object in the second argument to `navigation.navigate('RouteName', { params })`. They are accessed in the receiving screen via `route.params`. Type safety is managed using a `ParamList` type definition for the navigator.
- **Expo Router:** Parameters are typically part of the URL, either as dynamic segments (e.g., `app/items/[id].tsx`) or query parameters. They are accessed using hooks like `useLocalSearchParams()` or `useGlobalSearchParams()`. Type safety can be achieved with generics for these hooks and through Expo Router's typed routes feature.

**5. Configuring Screen Options (e.g., Header Title, Tab Icons):**

- **React Navigation:** Use the `options` prop on individual `<Screen>` components or the `screenOptions` prop on the `<Navigator>` component for defaults.
- **Expo Router:** Options are set on `<Navigator.Screen name="filename" />` elements within the `_layout.tsx` file that defines the navigator. Alternatively, screen files themselves can export an `options` object or use `Navigator.Screen` (e.g. `<Stack.Screen options={{...}} />`) to configure their appearance in the parent layout.

**6. Nesting Navigators:**

- **React Navigation:** A screen component for one navigator can be another navigator component (e.g., a `Tab.Screen`'s `component` prop can render a `StackNavigator`).
- **Expo Router:** Achieved through nested `_layout.tsx` files and route groups. For example, `app/(tabs)/_layout.tsx` defines tabs, and a screen within it, say `app/(tabs)/feed.tsx`, could itself be a directory `app/(tabs)/feed/` with its own `_layout.tsx` defining a stack for the feed.

**7. Deep Linking:**

- **React Navigation:** Requires manual configuration using the `linking` prop on `<NavigationContainer>`. This involves defining URL prefixes and mapping URL patterns to route names and parameters, which can become complex for deeply nested structures.
- **Expo Router:** Handles deep linking more automatically due to its URL-centric, file-system-based routing. You primarily need to define a `scheme` in your `app.json`. Route paths directly map to URL paths, simplifying the setup.

**8. Web Support:**

- **React Navigation:** Supports web platform when used with `react-native-web`, but routing configurations and URL-to-route mapping might require more explicit, sometimes platform-specific, setup.
- **Expo Router:** Designed with web as a first-class citizen. Its file-system routing aligns well with web development patterns (like Next.js). URLs are generally consistent across native and web platforms, and it leverages Metro as the bundler for web.

**9. Learning Curve & Developer Experience:**

- **React Navigation:** Can have a steeper learning curve due to its explicit nature, numerous configuration options, and the need to understand core concepts like the `navigation` and `route` props thoroughly. TypeScript setup for type-safe navigation can be verbose.
- **Expo Router:** May offer a gentler start, especially for developers familiar with file-system routing from web frameworks. Conventions simplify common use cases. However, mastering layout routes (`_layout.tsx`), route groups, and how they translate to underlying navigators is key. Typed routes feature aims to enhance DX.

**10. Customization & Flexibility:**

- **React Navigation:** Offers maximum flexibility and granular control for implementing complex or unconventional navigation flows, custom transitions, and highly specific navigator behaviors.
- **Expo Router:** While flexible (as it uses React Navigation internally), its convention-based approach guides development towards common patterns. Highly custom navigators or extremely bespoke behaviors might be simpler to achieve by dropping down to React Navigation's direct APIs or by using advanced customization patterns within Expo Router.

**11. Performance Considerations:**

- **Both:** Rely on `react-native-screens` for native-optimized screen components, which is crucial for performance.
- **React Navigation:** Lazy loading of screens (e.g., in `Tab.Navigator` where `lazy={true}` is default) is an explicit feature developers can control. Overall performance often depends on how developers structure their navigators and optimize screen components (e.g., using `React.memo`, avoiding unnecessary re-renders).
- **Expo Router:** Aims for build-time optimizations by pre-constructing route configurations from the file system. Lazy loading of routes is also a general default behavior. Performance characteristics are largely inherited from the underlying React Navigation components it generates and uses.

The following table provides a side-by-side summary of key features and characteristics:

#### Table: Feature Comparison Summary

| Feature                      | React Navigation (v6)                                                                           | Expo Router (v3)                                                                         |
| ---------------------------- | ----------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- |
| **Routing Approach**         | Programmatic / Configuration-First                                                              | File-based / Convention-over-Configuration                                               |
| **Setup Ease (Simple)**      | Moderate (Requires explicit config for navigators)                                              | High (Convention-driven, less boilerplate for basic routes)                              |
| **Setup Ease (Complex)**     | Moderate (Explicit control can be clearer for complex nests)                                    | Moderate (Managing deeply nested layouts/groups and their contexts can become complex)   |
| **Customization**            | High (Extensive API for fine-grained control)                                                   | Medium (Relies on conventions; uses RN options but abstraction can sometimes limit)      |
| **Deep Linking Setup**       | Manual Configuration Required (linking prop on Container)                                       | Largely Automatic (Requires `scheme` config in `app.json`; URL-centric by design)        |
| **Navigator Variety**        | High (Stack, Tabs, Drawer, Native Stack, Material variants, ability to build custom navigators) | Medium (Stack, Tabs, Drawer built-in layouts; custom navigators via advanced usage)      |
| **Community Support**        | Very High (Large, mature community, extensive resources)                                        | Medium (Growing rapidly, strong official documentation by Expo)                          |
| **Ecosystem**                | Works in Expo & Bare React Native projects                                                      | Primarily designed for Expo projects (can work in bare RN with more complex setup)       |
| **Web Support**              | Yes (Requires configuration, `react-native-web` setup)                                          | Yes (Integrated via file-based routing, Metro bundler for web is standard)               |
| **Type Safety (TypeScript)** | Good (Requires manual annotation for params/routes via ParamList)                               | Good (Aims for simpler typing via generated typed routes for paths & params)             |
| **Learning Curve**           | Steeper (More core concepts & APIs to learn upfront)                                            | Gentler for basic cases (if familiar with file-based routing); layouts are a key concept |
| **Performance (Lazy Load)**  | Explicit lazy loading options (e.g., `lazy` prop on Tab screens)                                | Routes generally lazy-loaded by default; benefits from build-time route analysis         |

#### When to Choose Which?

- **Choose React Navigation (Traditional) when:**

  - You need extremely complex or unconventional navigation patterns not easily mapped to file structures.
  - You prefer explicit, code-based configuration for absolute control over every detail.
  - You are working on a non-Expo (bare React Native) project where integrating Expo Router might add undesired complexity.
  - Your project already has a significant investment in traditional React Navigation, and migration isn't feasible.

- **Choose Expo Router when:**
  - You are starting a new Expo project (especially SDK 49+).
  - You prefer convention-over-configuration and the file-system-based routing paradigm (similar to Next.js or Remix).
  - You are building a universal application (iOS, Android, Web) and want a streamlined approach for routing across platforms.
  - Simplified deep linking and URL handling are high priorities.
  - Your application's structure naturally fits a directory-based route organization.

> [!IMPORTANT]
> Expo Router uses React Navigation for its core functionalities. So, you are still benefiting from the robustness of React Navigation. Expo Router primarily offers a different, often more convenient, way to define and manage your routes and layouts, particularly within the Expo ecosystem.

> 📚 **Official Documentation:**
>
> - [Expo Router: Comparison to React Navigation](https://docs.expo.dev/router/comparison/)
> - [React Navigation: Thinking in React Navigation](https://reactnavigation.org/docs/thinking-in-react-navigation/)

#### Next Steps

Understanding both React Navigation and Expo Router provides you with versatile tools for tackling any navigation challenge. The final topic in this module is deep linking, which allows users to navigate to specific content within your app from external sources. We will explore how Expo Router simplifies this process.
