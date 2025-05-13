## Section 4: Tab Navigator Setup and Usage

This section explores the Tab Navigator, a common pattern for top-level navigation where different sections of an app are accessible via tabs, typically at the bottom of the screen. We will use React Navigation's Bottom Tab Navigator (`@react-navigation/bottom-tabs`) to implement this pattern in our SpeedyMeds app, allowing users to easily switch between main features like a list of medications and pharmacy information.

> 🛣️ **(All Learners):** A solid understanding of Stack Navigator concepts from the previous section will be beneficial, as tabs often manage their own independent navigation stacks.

### Core Content

#### Conceptual Content: Understanding the Tab Navigator

The Tab Navigator displays a row of tabs, usually at the bottom of the screen on mobile devices (though top tabs are also possible). Each tab links to a different screen or a separate navigation stack. When a user selects a tab, the corresponding screen is displayed. The state of previously visited tabs is typically preserved, meaning users can switch between tabs without losing their place within each section.

**Key Concepts:**

- `createBottomTabNavigator`: A function from `@react-navigation/bottom-tabs` that returns an object containing `Navigator` and `Screen` components for building a bottom tab bar.
- **Tab Screens:** Each tab is associated with a component (a screen) or another navigator.
- **Tab Bar Icons and Labels:** Tabs are usually represented by an icon and/or a text label. These can be customized extensively.

#### Procedural Content: Implementing a Basic Tab Navigator

Let's add a tab navigator to our SpeedyMeds app. We'll imagine two main sections: `MedicationsStack` (which could be the stack navigator we started building in the previous section) and a new `PharmacyInfoScreen`.

**1. Define Screen Components (if new ones are needed):**

Assume we already have `HomeScreen` and `PrescriptionDetailScreen` from the previous section, which will form our `MedicationsStack`. Let's create a simple `PharmacyInfoScreen`.

```tsx
// screens/PharmacyInfoScreen.tsx
import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function PharmacyInfoScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>SpeedyMeds Pharmacy</Text>
      <Text style={styles.text}>123 Health St, Wellness City</Text>
      <Text style={styles.text}>Open 24/7</Text>
      <Text style={styles.text}>Contact: 555-0123</Text>
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
    marginBottom: 10,
  },
});
```

**2. Define the Stack Navigator for Medications (if not already done):**

It's common for a tab to manage its own stack of screens. Let's define a `MedicationsNavigator` using the `StackNavigator` from the previous section.

```tsx
// navigators/MedicationsNavigator.tsx
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen, { RootStackParamList } from "../screens/HomeScreen"; // Adjust path as needed
import PrescriptionDetailScreen from "../screens/PrescriptionDetailScreen"; // Adjust path

const Stack = createStackNavigator<RootStackParamList>();

export default function MedicationsNavigator() {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ title: "My Medications" }}
      />
      <Stack.Screen
        name="PrescriptionDetail"
        component={PrescriptionDetailScreen}
        options={({ route }) => ({
          title: `Detail: ${route.params.prescriptionId}`,
        })}
      />
    </Stack.Navigator>
  );
}
```

> [!TIP]
> Organizing navigators into their own files (e.g., in a `navigators` directory) helps keep `App.tsx` clean, especially as your app grows.

**3. Define TypeScript Types for Tab Navigator:**

Similar to the Stack Navigator, we should define types for our Tab Navigator's routes.

```typescript
// App.tsx or a shared types file
export type RootTabParamList = {
  Medications: undefined; // No params for the Medications tab itself
  PharmacyInfo: undefined; // No params for PharmacyInfo
  // Add other tab screens and their params here
};
```

**4. Create the Tab Navigator:**

Now, let's create the `BottomTabNavigator` in `App.tsx`.

```tsx
// App.tsx
import "react-native-gesture-handler";
import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "@expo/vector-icons/Ionicons"; // Example icon library

import MedicationsNavigator from "./navigators/MedicationsNavigator"; // Our stack
import PharmacyInfoScreen from "./screens/PharmacyInfoScreen";

export type RootTabParamList = {
  Medications: undefined;
  PharmacyInfo: undefined;
};

const Tab = createBottomTabNavigator<RootTabParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Medications"
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === "Medications") {
              iconName = focused ? "list-circle" : "list-circle-outline";
            } else if (route.name === "PharmacyInfo") {
              iconName = focused
                ? "information-circle"
                : "information-circle-outline";
            }
            // You can return any component that you like here!
            return (
              <Ionicons name={iconName as any} size={size} color={color} />
            );
          },
          tabBarActiveTintColor: "tomato",
          tabBarInactiveTintColor: "gray",
          headerShown: false, // Often hide header for tabs if each tab has its own stack header
        })}
      >
        <Tab.Screen
          name="Medications"
          component={MedicationsNavigator} // Nesting the Stack Navigator
          options={{ title: "Medications" }} // Title for the tab, header might be from stack
        />
        <Tab.Screen
          name="PharmacyInfo"
          component={PharmacyInfoScreen}
          options={{
            title: "Pharmacy Info",
            headerShown: true, // Example: Show header for this specific tab screen
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
```

**Explanation:**

- `createBottomTabNavigator<RootTabParamList>()`: Creates the tab navigator instance with type support.
- `<Tab.Navigator>`: The main tab navigator component.
  - `initialRouteName="Medications"`: Sets the default tab.
  - `screenOptions`: Allows you to define default options for all screens in the tab navigator. This is a powerful prop.
    - `tabBarIcon`: A function that returns a React element to be used as the tab icon. It receives `focused` (boolean), `color` (string), and `size` (number) props.
      - We use `Ionicons` from `@expo/vector-icons` for icons. You'd need to install this package (`npx expo install @expo/vector-icons`).
    - `tabBarActiveTintColor`: Color for the active tab icon and label.
    - `tabBarInactiveTintColor`: Color for inactive tabs.
    - `headerShown: false`: We set this to `false` globally for the tabs because our `MedicationsNavigator` (the stack) already provides its own headers. If a tab screen is a simple component (like `PharmacyInfoScreen`) and needs a header, you can enable it in its specific `Tab.Screen` options.
- `<Tab.Screen>`: Defines each tab.
  - `name="Medications" component={MedicationsNavigator}`: Here, the `Medications` tab renders our entire `MedicationsNavigator` (the stack navigator). This is a common pattern for nesting navigators.
  - `name="PharmacyInfo" component={PharmacyInfoScreen}`: This tab renders a simple screen component.
  - `options`: Can be used to set tab-specific options, like the `title` for the tab label or overriding `headerShown`.

> [!NOTE]
> When nesting navigators (e.g., a Stack inside a Tab), the `navigation` prop in screens of the inner navigator (Stack) will refer to the Stack navigator. To access the parent Tab navigator's `navigation` prop, you might need `navigation.getParent()`.

> 📚 **Official Documentation:**
>
> - [Bottom Tab Navigator - React Navigation](https://reactnavigation.org/docs/bottom-tab-navigator/)
> - [Nesting Navigators - React Navigation](https://reactnavigation.org/docs/nesting-navigators/)
> - [Screen options for tabs - React Navigation](https://reactnavigation.org/docs/bottom-tab-navigator/#options)
> - [Icons - Expo Documentation](https://docs.expo.dev/guides/icons/) (for using `@expo/vector-icons`)

> 🍏 **(iOS Developers):**
>
> **Comparison:** `createBottomTabNavigator` is analogous to `UITabBarController`. Each `<Tab.Screen>` is like adding a `UIViewController` (or a `UINavigationController` if nesting) to the `viewControllers` array of the tab bar controller. Customizing `tabBarIcon` and `tabBarLabel` is similar to setting `tabBarItem` properties.

> 🤖 **(Android Developers):**
>
> **Comparison:** This is similar to using a `BottomNavigationView` with menu items, where each item corresponds to a Fragment or an Activity. Nesting stacks within tabs is a common pattern also achievable with the Navigation Component by having separate navigation graphs for each tab's content.

#### Exercise 11.2: Basic Tab Navigation

Let's put this into practice by creating a simple tab-based navigation structure.

**(Placeholder: URL_to_Expo_Snack_for_Exercise_11.2)**

> **Instructions for Expo Snack `README.md` (Exercise 11.2):**
>
> ```md
> # Exercise 11.2: Basic Tab Navigation
>
> **Objective:** Implement a bottom tab navigator with two tabs: "Prescriptions" and "Appointments". The "Prescriptions" tab should reuse a stack navigator.
>
> **Tasks:**
>
> 1.  **Project Setup:**
>
>     - Ensure you have `@react-navigation/native` and `@react-navigation/bottom-tabs` installed, along with peer dependencies. You'll also need `@react-navigation/stack` for the nested stack.
>     - Install `@expo/vector-icons` if you want to use icons (e.g., `npx expo install @expo/vector-icons`).
>
> 2.  **Create Screen Components:**
>
>     - `PrescriptionListScreen.tsx`: Displays a title "Current Prescriptions" and a button "View Prescription RX123".
>     - `PrescriptionDetailScreen.tsx`: Displays a title "Prescription Detail" and text "Details for RX123". Add a "Back to List" button.
>     - `AppointmentsScreen.tsx`: Displays a title "Upcoming Appointments" and some placeholder text like "No appointments scheduled."
>
> 3.  **Define TypeScript Types:**
>
>     - `PrescriptionsStackParamList`: For the stack navigator (`PrescriptionList`, `PrescriptionDetail`). `PrescriptionDetail` should accept a `prescriptionId: string` param.
>     - `RootTabParamList`: For the tab navigator (`PrescriptionsTab`, `AppointmentsTab`).
>
> 4.  **Create Prescriptions Stack Navigator (`PrescriptionsStackNavigator.tsx`):**
>
>     - Use `createStackNavigator`.
>     - Include `PrescriptionListScreen` (name: `PrescriptionList`) and `PrescriptionDetailScreen` (name: `PrescriptionDetail`).
>     - Configure navigation from `PrescriptionListScreen` to `PrescriptionDetailScreen`, passing a `prescriptionId`.
>     - Configure navigation back from `PrescriptionDetailScreen`.
>
> 5.  **Implement the Tab Navigator (`App.tsx` or main navigator file):**
>     - Use `createBottomTabNavigator`.
>     - Wrap it in `NavigationContainer`.
>     - Add two `<Tab.Screen>` entries:
>       - Name: `PrescriptionsTab`, Component: `PrescriptionsStackNavigator`, Options: title "Prescriptions", appropriate `tabBarIcon`.
>       - Name: `AppointmentsTab`, Component: `AppointmentsScreen`, Options: title "Appointments", appropriate `tabBarIcon`, `headerShown: true` (to show a header for this simple screen).
>     - Set `PrescriptionsTab` as the `initialRouteName`.
>     - Customize `tabBarActiveTintColor` and `tabBarInactiveTintColor`.
>
> **Expected Outcome:**
>
> - The app loads with two tabs: "Prescriptions" and "Appointments". "Prescriptions" is active by default.
> - The "Prescriptions" tab shows the "Current Prescriptions" screen with its own header (from the stack navigator).
> - Tapping "View Prescription RX123" on this screen navigates to the "Prescription Detail" screen within the same tab, updating the stack navigator's header.
> - Tapping "Back to List" returns to the "Current Prescriptions" screen.
> - Switching to the "Appointments" tab displays the "Upcoming Appointments" screen with its own header (from the tab screen options).
> - Both tabs should have distinct icons.
>
> **Bonus (Optional):**
>
> - Try adding a third tab for "Patient Profile" (a simple screen component).
> - Experiment with different `tabBarOptions` or `screenOptions` to change the tab bar's appearance (e.g., `tabBarStyle`, `tabBarLabelStyle`).
> ```

#### Next Steps

With stack and tab navigators covered, we'll move on to another common pattern: the Drawer Navigator, which is useful for side menus and less frequently accessed application sections.
