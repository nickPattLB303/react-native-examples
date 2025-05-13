## Section 6: Passing Parameters Between Screens

In most applications, you'll need to pass data from one screen to another. For example, when a user taps on a list item in the SpeedyMeds app (like a specific medication), you'll want to navigate to a detail screen and show information specific to that selected item. React Navigation provides a straightforward way to pass parameters to routes during navigation.

> 🛣️ **(All Learners):** Understanding how to type these parameters with TypeScript is crucial for building robust and maintainable applications. We'll build upon the `RootStackParamList` (or similar param lists for other navigators) concept introduced earlier.

### Core Content

#### Conceptual Content: Why Pass Parameters?

Passing parameters allows you to make your screens dynamic and context-aware. Instead of creating a separate screen for every single item or piece of data, you can create a generic screen component that renders content based on the parameters it receives.

**Common Use Cases:**

- Displaying details of a selected item (e.g., product ID, user ID, prescription ID).
- Pre-filling forms with initial data.
- Passing configuration options to a screen.
- Indicating the source or reason for navigating to a screen.

#### Procedural Content: Passing and Reading Route Parameters

React Navigation allows you to pass parameters as a second argument to the `navigation.navigate()` or `navigation.push()` functions. The receiving screen can then access these parameters through its `route.params` prop.

**1. Passing Parameters:**

When you navigate to a screen, you can include a `params` object:

```tsx
// Example from a HomeScreen component
// navigation.navigate('RouteName', { /* parameters object */ });

// To navigate to a PrescriptionDetail screen for SpeedyMeds, passing a prescriptionId
navigation.navigate("PrescriptionDetail", {
  prescriptionId: "aspirin123",
  sourceScreen: "Home",
});
```

In this example, we are navigating to the `PrescriptionDetail` route and passing an object with two parameters: `prescriptionId` and `sourceScreen`.

**2. Reading Parameters in the Screen Component:**

The screen component that receives these parameters can access them via `route.params`.

```tsx
// PrescriptionDetailScreen.tsx
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import type { StackScreenProps } from "@react-navigation/stack";

// Assuming RootStackParamList is defined like this:
// export type RootStackParamList = {
//   Home: undefined;
//   PrescriptionDetail: { prescriptionId: string; sourceScreen?: string };
//   // sourceScreen is optional
// };

// Type for PrescriptionDetailScreen props, referencing the specific route name
import { RootStackParamList } from "./HomeScreen"; // Or your central types file
type PrescriptionDetailScreenProps = StackScreenProps<
  RootStackParamList,
  "PrescriptionDetail"
>;

export default function PrescriptionDetailScreen({
  route,
  navigation,
}: PrescriptionDetailScreenProps) {
  // Access parameters using route.params
  const { prescriptionId, sourceScreen } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Prescription Details</Text>
      <Text style={styles.text}>ID: {prescriptionId}</Text>
      {sourceScreen && (
        <Text style={styles.text}>Navigated from: {sourceScreen}</Text>
      )}
      {/* ... rest of the component ... */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
  },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 12 },
  text: { fontSize: 16, marginBottom: 8 },
});
```

- `route.params`: This object contains all parameters passed to this route. We destructure `prescriptionId` and `sourceScreen` from it.
- It's good practice to check if optional parameters exist before using them (e.g., `sourceScreen && ...`).

**3. Type Checking Parameters with TypeScript (`ParamList`):**

As shown in previous sections and highlighted here, defining a `ParamList` for your navigator is essential for type safety with parameters.

Let's refine our `RootStackParamList` for the `PrescriptionDetail` screen:

```typescript
// In your navigator setup file or a dedicated types file (e.g., navigationTypes.ts)
export type RootStackParamList = {
  Home: undefined; // Home screen takes no parameters
  PrescriptionDetail: {
    prescriptionId: string; // Required parameter
    sourceScreen?: string; // Optional parameter
  };
  EditProfile: { userId: string; isEditingMode: boolean };
  // ... other screens and their parameters
};
```

- For `PrescriptionDetail`, `prescriptionId` is a required string, while `sourceScreen` is an optional string.
- By providing this `RootStackParamList` to `createStackNavigator<RootStackParamList>()` and using `StackScreenProps<RootStackParamList, 'ScreenName'>` for your screen components, TypeScript will give you autocompletion for `route.params` and warn you if you try to navigate without required parameters or with incorrect types.

**4. Initial Parameters for a Screen:**

You can also provide initial parameters for a screen when it's defined in the navigator. These serve as default parameters if none are passed during navigation, or if the screen is the initial route.

```tsx
// In your Stack.Navigator configuration
<Stack.Screen
  name="PrescriptionDetail"
  component={PrescriptionDetailScreen}
  initialParams={{ prescriptionId: "default_rx_000", sourceScreen: "AppInit" }}
  options={({ route }) => ({ title: `Detail: ${route.params.prescriptionId}` })}
/>
```

- `initialParams`: If `PrescriptionDetailScreen` is loaded directly (e.g., as an `initialRouteName` or if no params are passed via `navigate`), `route.params` will be `{ prescriptionId: 'default_rx_000', sourceScreen: 'AppInit' }`.
- If parameters _are_ passed via `navigation.navigate()`, they will merge with and override `initialParams`.

**5. Updating Parameters (`navigation.setParams`):**

A screen can update its own parameters using `navigation.setParams()`.
This is less common for replacing core identifying params (like an ID) but can be useful for things like changing a filter state that is represented in params.

```tsx
// Inside a screen component
// navigation.setParams({ sourceScreen: 'Updated Value' });
```

> [!CAUTION]
> Use `navigation.setParams` sparingly. Overuse can make data flow hard to track. For complex state management within a screen or shared between screens, consider using React state, Context, or a state management library (covered in Module 13).

> 📚 **Official Documentation:**
>
> - [Passing parameters to routes - React Navigation](https://reactnavigation.org/docs/params/)
> - [Type checking with TypeScript - Navigation Props](https://reactnavigation.org/docs/typescript/#type-checking-navigation-prop)
> - [Type checking with TypeScript - Route Prop](https://reactnavigation.org/docs/typescript/#type-checking-the-route-prop)
> - [`initialParams` on Screen - React Navigation](https://reactnavigation.org/docs/screen/#initialparams)
> - [`navigation.setParams` - React Navigation](https://reactnavigation.org/docs/navigation-prop/#setparams)

> 🍏 **(iOS Developers):**
>
> **Comparison:** Passing parameters is similar to setting properties on a `UIViewController` before pushing it, or passing data through a segue's `prepare(for:sender:)` method in UIKit Storyboards. The `route.params` object is analogous to accessing these properties in the destination view controller.

> 🤖 **(Android Developers):**
>
> **Comparison:** This is like passing data between Activities using `Intent.putExtra()` and retrieving it in the receiving Activity with `getIntent().getExtras()`, or passing arguments between Fragments using a `Bundle` with Jetpack Navigation.

> 🌐 **(Web Developers):**
>
> **Comparison:** If you've used React Router, this is similar to route parameters (e.g., `/users/:id`) and query parameters. `route.params` in React Navigation often serves both purposes, though you primarily pass data through the `navigate` call rather than encoding it all in the URL string directly (unless dealing with deep linking, covered later).

#### Exercise 11.3: Passing Data via Navigation

This exercise will help you practice passing and receiving parameters between screens.

**(Placeholder: URL_to_Expo_Snack_for_Exercise_11.3)**

> **Instructions for Expo Snack `README.md` (Exercise 11.3):**
>
> ````md
> # Exercise 11.3: Passing Data via Navigation
>
> **Objective:** Create a stack navigator with two screens for the SpeedyMeds app: `MedicationSearchScreen` and `MedicationInfoScreen`. Pass search query and medication details between them.
>
> **Tasks:**
>
> 1.  **Project Setup:**
>
>     - Ensure React Navigation (native, stack) is installed.
>
> 2.  **Define TypeScript `RootStackParamList`:**
>
>     ```typescript
>     export type RootStackParamList = {
>       MedicationSearch: undefined;
>       MedicationInfo: {
>         medicationName: string;
>         dosage: string;
>         searchQuery?: string; // Optional: the query that found this med
>       };
>     };
>     ```
>
> 3.  **Create Screen Components:**
>
>     - `MedicationSearchScreen.tsx`:
>       - Should have a (mock) search input (you can use a simple `<TextInput>`).
>       - A button "Search for Aspirin". When pressed, it navigates to `MedicationInfoScreen`, passing `{ medicationName: 'Aspirin', dosage: '100mg', searchQuery: 'headache relief' }`.
>       - Another button "Search for Amoxicillin". When pressed, it navigates to `MedicationInfoScreen`, passing `{ medicationName: 'Amoxicillin', dosage: '250mg', searchQuery: 'infection' }`.
>       - Type its props using `StackScreenProps<RootStackParamList, 'MedicationSearch'>`.
>     - `MedicationInfoScreen.tsx`:
>       - Should display the `medicationName`, `dosage`, and `searchQuery` (if provided) received from `route.params`.
>       - Add a button to navigate back (`navigation.goBack()`).
>       - Type its props using `StackScreenProps<RootStackParamList, 'MedicationInfo'>`.
>
> 4.  **Implement the Stack Navigator (`App.tsx` or navigator file):**
>     - Use `createStackNavigator<RootStackParamList>()`.
>     - Add `Stack.Screen` entries for `MedicationSearch` and `MedicationInfo`.
>     - Set `MedicationSearch` as the `initialRouteName`.
>     - For `MedicationInfoScreen`, set a dynamic header title using `options` that includes the `medicationName` from `route.params` (e.g., `options: ({ route }) => ({ title: route.params.medicationName })`).
>
> **Expected Outcome:**
>
> - The app starts on the "Medication Search" screen.
> - Tapping "Search for Aspirin" navigates to a screen displaying "Aspirin", "100mg", and "headache relief", with "Aspirin" in the header.
> - Tapping "Search for Amoxicillin" navigates to a screen displaying "Amoxicillin", "250mg", and "infection", with "Amoxicillin" in the header.
> - The back button on the `MedicationInfoScreen` should return to the search screen.
>
> **Bonus (Optional):**
>
> - In `MedicationSearchScreen`, add an actual `<TextInput>` and allow the user to type a search query. Pass this dynamic query as the `searchQuery` parameter.
> - Set `initialParams` for the `MedicationInfoScreen` in the navigator configuration with some default medication data.
> ````

#### Next Steps

Being able to pass data is essential, but so is making your navigation look and feel like part of your app. The next section will cover how to configure and customize the appearance of headers and tabs.
