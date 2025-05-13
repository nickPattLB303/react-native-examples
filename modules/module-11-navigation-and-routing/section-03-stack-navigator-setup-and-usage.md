## Section 3: Stack Navigator Setup and Usage

This section focuses on the Stack Navigator from React Navigation. You'll learn how to define a stack of screens, navigate between them, and understand the basic configuration options. The Stack Navigator is fundamental for creating linear flows where users move forwards and backwards through a sequence of screens, such as a sign-up process or drilling down into details within the SpeedyMeds app.

> 🛣️ **(All Learners):** Ensure you have completed the React Navigation installation steps from the previous section. The concepts here build directly on that foundation.

### Core Content

#### Conceptual Content: Understanding the Stack Navigator

The Stack Navigator provides a way to transition between screens where each new screen is placed on top of a stack. When you navigate back, the top screen is removed from the stack, revealing the previous screen. It's managed by the `@react-navigation/stack` package.

**Key Concepts:**

- **Screen:** A React component that represents a single view in your application.
- **Navigator:** A React component that defines a specific navigation pattern (e.g., Stack, Tab, Drawer). It takes route configuration as props and renders the active screen.
- **Route:** A configuration object that maps a name to a screen component and can include options for how that screen is presented (e.g., header title).
- `createStackNavigator`:
  A function that returns an object containing two components: `Navigator` and `Screen`. You use these to configure your stack.

#### Procedural Content: Implementing a Basic Stack Navigator

Let's create a simple two-screen stack for our SpeedyMeds app: a `HomeScreen` and a `PrescriptionDetailScreen`.

**1. Define Your Screen Components:**

First, create the React components for your screens. These are just regular React Native components.

```tsx
// screens/HomeScreen.tsx
import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import type { StackScreenProps } from "@react-navigation/stack"; // For type checking

// Define a type for your stack parameters if you plan to pass params
// We'll cover this in detail in a later section (Section 6)
export type RootStackParamList = {
  Home: undefined; // No params for Home
  PrescriptionDetail: { prescriptionId: string }; // Expects prescriptionId
};

// Type for HomeScreen props
type HomeScreenProps = StackScreenProps<RootStackParamList, "Home">;

export default function HomeScreen({ navigation }: HomeScreenProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>SpeedyMeds Home</Text>
      <Button
        title="Go to Aspirin Details"
        onPress={() =>
          navigation.navigate("PrescriptionDetail", {
            prescriptionId: "aspirin123",
          })
        }
      />
      <Button
        title="Go to Amoxicillin Details (Non-Existent Example)"
        onPress={() =>
          navigation.navigate("PrescriptionDetail", {
            prescriptionId: "amox456",
          })
        }
      />
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
});
```

```tsx
// screens/PrescriptionDetailScreen.tsx
import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import type { StackScreenProps } from "@react-navigation/stack";
import { RootStackParamList } from "./HomeScreen"; // Import the param list

// Type for PrescriptionDetailScreen props
type PrescriptionDetailScreenProps = StackScreenProps<
  RootStackParamList,
  "PrescriptionDetail"
>;

export default function PrescriptionDetailScreen({
  route,
  navigation,
}: PrescriptionDetailScreenProps) {
  // Access the route params
  const { prescriptionId } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Prescription Detail</Text>
      <Text style={styles.text}>Details for: {prescriptionId}</Text>
      <Button title="Go back to Home" onPress={() => navigation.goBack()} />
      <Button
        title="Go to Home (alternative)"
        onPress={() => navigation.navigate("Home")}
      />
      {/* Example of pushing another instance of the same screen (less common for details) */}
      {/* <Button 
        title="Go to another Detail (e.g., related item)" 
        onPress={() => navigation.push('PrescriptionDetail', { prescriptionId: 'relatedItem789' })} 
      /> */}
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

> [!TIP]
> It's a good practice to define your screen components in separate files (e.g., within a `screens` directory) to keep your project organized.

**2. Create the Stack Navigator:**

Now, let's integrate these screens into a stack navigator. You'll typically do this in your `App.tsx` or a dedicated navigation file.

```tsx
// App.tsx (or a dedicated navigator file)
import "react-native-gesture-handler";
import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import HomeScreen, { RootStackParamList } from "./screens/HomeScreen"; // Assuming files are in ./screens/
import PrescriptionDetailScreen from "./screens/PrescriptionDetailScreen";

const Stack = createStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: "SpeedyMeds Dashboard" }} // Sets header title
        />
        <Stack.Screen
          name="PrescriptionDetail"
          component={PrescriptionDetailScreen}
          options={({ route }) => ({
            title: `Detail: ${route.params.prescriptionId}`,
          })} // Dynamic title
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
```

**Explanation:**

- `createStackNavigator<RootStackParamList>()`: We call this function to get our `Stack` object. Providing `RootStackParamList` here gives us type safety for route names and parameters.
- `<NavigationContainer>`: Wraps the entire navigation structure, as discussed in the previous section.
- `<Stack.Navigator>`: This component is the actual navigator. It manages the stack of screens.
  - `initialRouteName="Home"`: Specifies that the `Home` screen should be the first one displayed when the app loads.
- `<Stack.Screen>`: Each instance of this component defines a route in our stack.
  - `name="Home"`: This is the unique name for this route. We use this name when navigating (e.g., `navigation.navigate('Home')`).
  - `component={HomeScreen}`: Specifies the React component to render for this route.
  - `options={{ title: 'SpeedyMeds Dashboard' }}`: Configures options for this screen, such as the header title. Options can be an object or a function that returns an object (useful for dynamic options based on `route` or `navigation` props).

**3. Navigating Between Screens:**

In `HomeScreen.tsx`, we used `navigation.navigate('PrescriptionDetail', { prescriptionId: 'aspirin123' })`:

- `navigation.navigate('RouteName')`: This function is used to navigate to another screen in the stack. If the screen is already in the stack, it will navigate back to it. If not, it pushes the new screen onto the stack.
- `{ prescriptionId: 'aspirin123' }`: This is an optional second argument to `navigate`, an object containing parameters to pass to the target screen. The `PrescriptionDetailScreen` can access this via `route.params`.

In `PrescriptionDetailScreen.tsx`:

- `navigation.goBack()`: Pops the current screen from the stack and navigates to the previous screen.
- `navigation.navigate('Home')`: Navigates to the 'Home' screen. If 'Home' is already in the stack below the current screen, it will pop screens until 'Home' is reached. If 'Home' is not in the stack (which is unlikely in this simple stack if you started from Home), it would push 'Home'.
- `navigation.push('RouteName')`: This function _always_ pushes a new screen onto the stack, even if a screen with the same name is already present. This is useful if you want multiple instances of the same screen type in your stack (e.g., navigating from one profile screen to another profile screen).

**TypeScript Integration (`RootStackParamList`):**

Defining `RootStackParamList` is crucial for TypeScript projects:

```typescript
export type RootStackParamList = {
  Home: undefined; // 'Home' screen takes no parameters
  PrescriptionDetail: { prescriptionId: string }; // 'PrescriptionDetail' screen expects a prescriptionId string
  // Add other screens and their params here
};
```

This type definition helps React Navigation provide type checking for route names and parameters passed between screens. You then use `StackScreenProps<RootStackParamList, 'ScreenName'>` to type the props for your screen components, giving you autocompletion and type safety for `navigation` and `route` props.

> [!IMPORTANT]
> The keys in `RootStackParamList` (e.g., `Home`, `PrescriptionDetail`) MUST match the `name` prop of your `<Stack.Screen>` components.

> 📚 **Official Documentation:**
>
> - [Stack Navigator - React Navigation](https://reactnavigation.org/docs/stack-navigator/)
> - [Navigating to a new screen - React Navigation](https://reactnavigation.org/docs/navigating)
> - [Passing parameters to routes - React Navigation](https://reactnavigation.org/docs/params/)
> - [TypeScript with React Navigation](https://reactnavigation.org/docs/typescript/)

> 🍏 **(iOS Developers):**
>
> **Comparison:** `createStackNavigator` is like instantiating a `UINavigationController`. Each `<Stack.Screen>` is akin to a `UIViewController` pushed onto the navigation stack. `navigation.navigate()` is similar to `pushViewController()`, and `navigation.goBack()` is like `popViewController(animated:)`.
>
> **Key Takeaway:** The declarative nature of defining screens as components and managing navigation via props is the main difference from UIKit's imperative approach.

> 🤖 **(Android Developers):**
>
> **Comparison:** This is similar to using Android Jetpack Navigation Component where you define destinations in a navigation graph and use `NavController.navigate()` to move between them. Parameters are passed similarly to using `Bundle` objects.
>
> **Key Takeaway:** React Navigation provides a unified JavaScript API for these familiar concepts, abstracting the platform-specific implementations.

#### Exercise 11.1: Basic Stack Navigation

Now it's time to practice! This exercise will guide you through setting up a basic two-screen stack navigator.

**(Placeholder: URL_to_Expo_Snack_for_Exercise_11.1)**

> **Instructions for Expo Snack `README.md` (Exercise 11.1):**
>
> ````md
> # Exercise 11.1: Basic Stack Navigation
>
> **Objective:** Implement a simple stack navigator with two screens: `MedicationListScreen` and `MedicationReminderScreen`.
>
> **Tasks:**
>
> 1.  **Project Setup:**
>
>     - Ensure you have `@react-navigation/native` and `@react-navigation/stack` installed, along with their dependencies (`react-native-screens`, `react-native-safe-area-context`). Refer to the course material if needed.
>
> 2.  **Create Screen Components:**
>
>     - Create `MedicationListScreen.tsx`: This screen should display a simple title like "My Medications" and a button that says "Add New Reminder".
>     - Create `MedicationReminderScreen.tsx`: This screen should display a title like "New Medication Reminder" and a button that says "Back to List".
>
> 3.  **Define Type for Stack Parameters (RootStackParamList):**
>
>     - Create a `RootStackParamList` type. For this exercise, neither screen needs to accept parameters initially.
>
>     ```typescript
>     // Example in a shared types file or at the top of your navigator setup
>     export type RootStackParamList = {
>       MedicationList: undefined;
>       MedicationReminder: undefined;
>     };
>     ```
>
> 4.  **Implement the Stack Navigator:**
>
>     - In your `App.tsx` (or a dedicated navigator file):
>       - Import `NavigationContainer`.
>       - Import `createStackNavigator`.
>       - Import your two screen components.
>       - Create the stack navigator instance using `createStackNavigator<RootStackParamList>()`.
>       - Wrap your `Stack.Navigator` with `NavigationContainer`.
>       - Configure `Stack.Navigator` with `MedicationListScreen` as the `initialRouteName`.
>       - Add `Stack.Screen` entries for both `MedicationListScreen` (name: "MedicationList") and `MedicationReminderScreen` (name: "MedicationReminder").
>       - Set appropriate header titles for each screen using the `options` prop (e.g., `options={{ title: 'My Medications' }}`).
>
> 5.  **Implement Navigation Logic:**
>     - In `MedicationListScreen.tsx`:
>       - Use the `navigation.navigate('MedicationReminder')` method on the "Add New Reminder" button's `onPress` handler to navigate to the `MedicationReminderScreen`.
>       - Ensure your component props are correctly typed using `StackScreenProps`.
>     - In `MedicationReminderScreen.tsx`:
>       - Use the `navigation.goBack()` method on the "Back to List" button's `onPress` handler to return to the `MedicationListScreen`.
>       - Ensure your component props are correctly typed.
>
> **Expected Outcome:**
>
> - The app should initially display the "My Medications" screen.
> - Tapping "Add New Reminder" should navigate to the "New Medication Reminder" screen.
> - Tapping "Back to List" on the reminder screen should navigate back to the "My Medications" screen.
> - Both screens should display their respective custom header titles.
>
> **Bonus (Optional):**
>
> - Try using `navigation.push('MedicationReminder')` instead of `navigate` in `MedicationListScreen` and observe the difference in stack behavior if you navigate multiple times.
> - Explore other `options` for `Stack.Screen`, like customizing header styles (we'll cover this more in Section 7).
> ````

#### Next Steps

Now that you can create a basic stack of screens, the next step is to explore other types of navigators. In the upcoming section, we will look at how to implement Tab Navigation for different sections of your app.
