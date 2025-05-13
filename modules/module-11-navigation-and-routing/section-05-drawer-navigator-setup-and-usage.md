## Section 5: Drawer Navigator Setup and Usage

This section introduces the Drawer Navigator, a navigation pattern where a panel slides in from the side of the screen (typically the left) to reveal a list of navigation links. We will use React Navigation's Drawer Navigator (`@react-navigation/drawer`) to implement this. Drawers are often used for primary navigation in some apps or for housing secondary items like settings, user profiles, or less frequently accessed sections of the SpeedyMeds app.

> 🛣️ **(All Learners):** Familiarity with `NavigationContainer` and the basic structure of React Navigation screens is assumed. Ensure `react-native-gesture-handler` and `react-native-reanimated` are correctly set up as they are crucial for drawer animations and gestures.

### Core Content

#### Conceptual Content: Understanding the Drawer Navigator

The Drawer Navigator provides a slide-in menu, often referred to as a "hamburger menu" due to the common icon used to toggle it. It's a good way to offer navigation to multiple distinct sections without cluttering the main interface, especially if you have more items than would comfortably fit in a bottom tab bar.

**Key Concepts:**

- `createDrawerNavigator`: A function from `@react-navigation/drawer` that returns an object containing `Navigator` and `Screen` components for building a drawer-based navigation.
- **Drawer Items:** Each item in the drawer typically navigates to a screen or another navigator.
- **Opening/Closing Drawer:** The drawer can usually be opened by a swipe gesture from the edge of the screen or by tapping a dedicated menu icon in the header. It can be closed by swiping back, tapping the main content area, or selecting a drawer item.

#### Procedural Content: Implementing a Basic Drawer Navigator

Let's integrate a Drawer Navigator into our SpeedyMeds app. We might have our main Tab Navigator (from the previous section) as one of the drawer items, and perhaps a separate `SettingsScreen` accessible via the drawer.

**1. Define Screen Components (if new ones are needed):**

Assume we have our `TabNavigator` (let's call the component `MainAppTabs`) from the previous section. We'll create a new `SettingsScreen`.

```tsx
// screens/SettingsScreen.tsx
import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import type { DrawerScreenProps } from "@react-navigation/drawer"; // For type checking

// Define RootDrawerParamList (see step 2)
import { RootDrawerParamList } from "../navigators/AppDrawerNavigator"; // Adjust path as needed

type SettingsScreenProps = DrawerScreenProps<RootDrawerParamList, "Settings">;

export default function SettingsScreen({ navigation }: SettingsScreenProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>App Settings</Text>
      <Text style={styles.text}>
        Configure your SpeedyMeds preferences here.
      </Text>
      <Button title="Open Drawer" onPress={() => navigation.openDrawer()} />
      <Button title="Toggle Drawer" onPress={() => navigation.toggleDrawer()} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  text: {
    fontSize: 18,
    marginBottom: 15,
  },
});
```

**2. Define TypeScript Types for Drawer Navigator:**

```typescript
// navigators/AppDrawerNavigator.tsx or a shared types file
export type RootDrawerParamList = {
  MainApp: undefined; // Represents our main TabNavigator or StackNavigator
  Settings: undefined;
  // Add other drawer screens here
};
```

**3. Create the Drawer Navigator:**

Let's assume `MainAppTabs.tsx` contains the TabNavigator setup from Section 4. Now, we'll create `AppDrawerNavigator.tsx` (or modify `App.tsx`).

```tsx
// navigators/AppDrawerNavigator.tsx (or App.tsx)
import "react-native-gesture-handler"; // Must be at the top
import * as React from "react";
import { Button } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import {
  createDrawerNavigator,
  DrawerNavigationProp,
} from "@react-navigation/drawer";
import { createStackNavigator } from "@react-navigation/stack"; // For header in main content

// Assuming MainAppTabs is your TabNavigator component from previous section
import MainAppTabs from "./MainAppTabs"; // Adjust path
import SettingsScreen from "../screens/SettingsScreen"; // Adjust path

export type RootDrawerParamList = {
  MainApp: undefined;
  Settings: undefined;
};

// This is a simple stack for the MainApp to have a header with a drawer toggle
// This is one way to integrate; alternatives exist.
const Stack = createStackNavigator();

// Helper component to add a header to MainAppTabs and a drawer toggle button
// Note: navigation prop here is from the Stack, not the Drawer directly
function MainAppWithHeader({ navigation }: { navigation: any }) {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="SpeedyMedsApp"
        component={MainAppTabs}
        options={{
          title: "SpeedyMeds",
          headerLeft: () => (
            <Button onPress={() => navigation.openDrawer()} title="Menu" />
          ),
        }}
      />
    </Stack.Navigator>
  );
}

const Drawer = createDrawerNavigator<RootDrawerParamList>();

export default function AppDrawerNavigator() {
  return (
    // NavigationContainer should be at the root, so if AppDrawerNavigator is not the root,
    // move NavigationContainer to the actual root component (e.g. App.tsx)
    // For this example, assuming AppDrawerNavigator IS the root for simplicity of example.
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="MainApp">
        <Drawer.Screen
          name="MainApp"
          component={MainAppWithHeader} // Using the component with header
          options={{ title: "Dashboard", drawerLabel: "Home / Dashboard" }}
        />
        <Drawer.Screen
          name="Settings"
          component={SettingsScreen}
          options={{ title: "Application Settings" }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
```

**Explanation:**

- `createDrawerNavigator<RootDrawerParamList>()`: Creates the drawer navigator instance.
- `<Drawer.Navigator>`: The main drawer navigator component.
  - `initialRouteName="MainApp"`: Sets the default screen shown.
- `<Drawer.Screen>`: Defines each item in the drawer.
  - `name="MainApp" component={MainAppWithHeader}`: This drawer item renders our `MainAppWithHeader` component. `MainAppWithHeader` is a small Stack navigator that wraps `MainAppTabs` simply to provide a header bar where we can place a button to open the drawer.
  - `options={{ title: 'Dashboard', drawerLabel: 'Home / Dashboard' }}`: `title` can be used by headers (if shown by the drawer itself), and `drawerLabel` sets the text shown in the drawer menu for this item.
- **Opening the Drawer:**
  - **Programmatically:** You can use `navigation.openDrawer()`, `navigation.closeDrawer()`, or `navigation.toggleDrawer()` from any screen within the drawer navigator (or its children, potentially using `navigation.getParent().openDrawer()`).
  - **Gesture:** By default, users can swipe from the left edge of the screen to open the drawer.
  - **Header Button:** In `MainAppWithHeader`, we added a `headerLeft` button to the Stack Navigator's screen options. This button calls `navigation.openDrawer()`. Note that the `navigation` prop available directly in `MainAppWithHeader` belongs to the Stack Navigator it creates. To control the _drawer_, if `MainAppWithHeader` was directly a screen of the drawer, its `navigation` prop would have `openDrawer`. Since `MainAppWithHeader` here _is_ a screen of the drawer, its navigation prop _is_ the drawer navigation prop. If `MainAppTabs` needed to open the drawer, it would use `navigation.getParent()?.openDrawer()`. The example `MainAppWithHeader` receives the drawer `navigation` prop because `MainAppWithHeader` is a direct screen of the `Drawer.Navigator`.

> [!IMPORTANT]
> For `react-native-gesture-handler` to work correctly, especially on Android, ensure your root component (usually `MainActivity.java` for Android or `AppDelegate.m` for iOS if you were not using Expo or had ejected) is properly set up. With Expo managed workflow, this is generally handled for you, but make sure `import 'react-native-gesture-handler';` is at the top of your `App.tsx` or entry file.

> [!TIP]
> The `react-native-reanimated` library is a powerful animation library. The Drawer Navigator uses it for smooth animations. Ensure it's correctly installed and its Babel plugin is configured (as mentioned in Section 2 for React Navigation setup).

> 📚 **Official Documentation:**
>
> - [Drawer Navigator - React Navigation](https://reactnavigation.org/docs/drawer-navigator/)
> - [Opening and closing drawer programmatically - React Navigation](https://reactnavigation.org/docs/drawer-navigator/#opening-and-closing-drawer-programmatically)
> - [`react-native-gesture-handler` Documentation](https://docs.swmansion.com/react-native-gesture-handler/)
> - [`react-native-reanimated` Documentation](https://docs.swmansion.com/react-native-reanimated/)

> 🍏 **(iOS Developers):**
>
> **Comparison:** This is similar to implementing a custom side menu using a `UIViewController` that manages a main content view controller and a hidden menu view controller, often triggered by a `UIScreenEdgePanGestureRecognizer` or a bar button item. Some third-party libraries also provide this.

> 🤖 **(Android Developers):**
>
> **Comparison:** This directly corresponds to Android's `DrawerLayout` and `NavigationView`. The swipe gesture and the concept of a main content area with a sliding drawer are identical. React Navigation provides the cross-platform abstraction.

#### Exercise: (No exercise for this section as per blueprint, but one could be added)

The blueprint doesn't specify an exercise for Section 5. However, a typical exercise would involve:

1. Creating a new Drawer Navigator.
2. Adding a few simple screens to it (e.g., ProfileScreen, HelpScreen).
3. Integrating an existing Stack or Tab navigator as one of the drawer items.
4. Implementing a button in the header of the nested navigator to toggle the drawer.

#### Next Steps

Now that you've learned about Stack, Tab, and Drawer navigators, a crucial aspect of building multi-screen applications is passing data between these screens. The next section will cover exactly that: how to pass parameters to routes.
