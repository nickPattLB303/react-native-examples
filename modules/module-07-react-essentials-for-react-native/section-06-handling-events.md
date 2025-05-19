## Section 6: Handling Events (Press Events)

Interactive applications respond to user input. In React Native, this often involves handling touch events, such as a user pressing a button. This section focuses on how to handle these events, particularly "press" events, using React's event system, which provides a consistent API across platforms by abstracting native differences.

### Event Handling in React

Handling events in React (and React Native) is very similar to handling events on DOM elements in web development, but with a few syntactical differences:

- **camelCase:** React event handlers are named using camelCase, rather than lowercase. For example, an `onclick` event in HTML becomes `onClick` in React/JSX. In React Native, a common event is `onPress`.
- **Functions:** You pass a function as the event handler, rather than a string.

  ```tsx
  // HTML (for comparison)
  // <button onclick="handleLogin()">Login</button>

  // JSX (React/React Native)
  <Button title="Login" onPress={handleLogin} />
  ```

Event handler functions can also receive an optional argument, often called `event` (or `e`), which contains information about the user interaction. For basic `onPress` events with the `<Button>` component, this argument is often not explicitly used as the primary action is clear. However, for more complex interactions or components like `<Pressable>`, this event object can provide useful details (e.g., touch coordinates via `event.nativeEvent`). We will explore components like `<Pressable>` in more detail later.

### Handling `onPress` Events

The most common touch event you'll handle in React Native is `onPress`. This event is available on several Core Components like `<Button>`, `<Pressable>`, and `<TouchableOpacity>` (though `<Pressable>` is now generally recommended over `TouchableOpacity`).

**Example: A Simple Alert Button**

Let's create a button that shows an alert when pressed.

```tsx
import React from "react";
import { View, Button, Alert, StyleSheet } from "react-native";

const AlertButton = () => {
  const handlePress = () => {
    Alert.alert("SpeedyMeds Reminder", "Time to take your medication!");
  };

  return (
    <View style={styles.container}>
      <Button title="Show Reminder" onPress={handlePress} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default AlertButton;
```

In this example:

- We define a function `handlePress`.
- This function is passed as the `onPress` prop to the `<Button>` component.
- When the button is pressed, `handlePress` is executed, and an `Alert` (from React Native's `Alert` API) is shown.

```mermaid
graph LR
    subgraph UserInteraction
        A[User Taps Button] --> B[Device Detects Touch];
    end

    subgraph ReactNativeApp
        B --> C{React Native Component (e.g., <Button />)};
        C -- "onPress Event Prop" --> D[Event Handler Function (e.g., handlePress)];
        D -- "Executes Logic" --> E[App Logic (e.g., Alert.alert(), setState())];
        E -- Optional State Update --> F{React Schedules Re-render};
        F --> G[UI Updates];
    end

    G --> H[User Sees Result];
```

This diagram illustrates the typical event handling flow in a React Native application. It begins when a `User Taps` a component like a `Button`. The `Device Detects Touch` and forwards this to the `React Native App`. The specific `React Native Component` (e.g., `<Button />`) that was interacted with then triggers the function assigned to its relevant event prop, in this case, the `onPress` prop. This calls the `Event Handler Function` (e.g., `handlePress`) defined by the developer. Inside this handler, `App Logic` is executed, which could involve showing an alert, navigating, or, very commonly, calling a state setter function (`setState()`). If state is updated, React `Schedules a Re-render`. Consequently, the `UI Updates` to reflect any changes, and the `User Sees Result` of their interaction. This flow ensures a responsive and interactive user experience.

### Inline Event Handlers

You can also define event handler functions inline using arrow functions, especially for very simple logic:

```tsx
import React, { useState } from "react";
import { View, Text, Button, StyleSheet } from "react-native";

const DosageAdjuster = () => {
  const [dosage, setDosage] = useState<number>(10); // Initial dosage in mg

  return (
    <View style={styles.container}>
      <Text style={styles.dosageText}>Current Dosage: {dosage}mg</Text>
      <Button
        title="Increase Dosage by 5mg"
        onPress={() => setDosage((prevDosage) => prevDosage + 5)}
      />
      <Button
        title="Decrease Dosage by 5mg"
        onPress={() => setDosage((prevDosage) => Math.max(0, prevDosage - 5))} // Prevent negative dosage
        disabled={dosage === 0}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
    alignItems: "center",
  },
  dosageText: {
    fontSize: 16,
    marginBottom: 10,
  },
});

export default DosageAdjuster;
```

Here, the `onPress` handlers directly call `setDosage` using inline arrow functions.

### Passing Arguments to Event Handlers

Sometimes you need to pass arguments to your event handler function. For example, if you have a list of items and each item has a button.

To do this, you typically use an arrow function in the `onPress` prop that then calls your handler with the desired arguments.

```tsx
import React from "react";
import { View, Text, Button, Alert, StyleSheet } from "react-native";

/**
 * @interface MedicationItemProps
 * @description Props for the MedicationItem component.
 * @property {string} id - The unique identifier for the medication.
 * @property {string} name - The name of the medication.
 * @property {(id: string, name: string) => void} onSelectMedication - Callback function invoked when the item's select button is pressed.
 */
interface MedicationItemProps {
  id: string;
  name: string;
  onSelectMedication: (id: string, name: string) => void;
}

/**
 * @function MedicationItem
 * @description A component that displays a medication's name and a "Select" button.
 * It demonstrates how to pass arguments to an event handler passed down as a prop.
 *
 * @param {MedicationItemProps} props - The props for the component.
 * @returns {JSX.Element} A View containing the medication name and a select button.
 */
const MedicationItem: React.FC<MedicationItemProps> = ({
  id,
  name,
  onSelectMedication,
}) => {
  return (
    <View style={styles.itemContainer}>
      <Text>{name}</Text>
      <Button
        title="Select"
        onPress={() => onSelectMedication(id, name)} // Arrow function calls handler with id and name
      />
    </View>
  );
};

// Example Usage (Conceptual - would be part of a list)
/**
 * @function PrescriptionSelector
 * @description An example component that demonstrates rendering multiple `MedicationItem`
 * components and handling their selection events. This component would typically
 * be part of a larger prescription management screen in the SpeedyMeds app.
 *
 * @returns {JSX.Element} A View containing a list of MedicationItem components.
 */
const PrescriptionSelector = () => {
  const handleMedicationSelection = (id: string, name: string) => {
    Alert.alert(
      "Medication Selected",
      `You selected ${name} (ID: ${id}) for refill.`
    );
  };

  return (
    <View>
      <MedicationItem
        id="med123"
        name="Atorvastatin"
        onSelectMedication={handleMedicationSelection}
      />
      <MedicationItem
        id="med456"
        name="Omeprazole"
        onSelectMedication={handleMedicationSelection}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
});

export default PrescriptionSelector;
```

This example features two components, `MedicationItem` and `PrescriptionSelector`, to illustrate a common pattern: rendering a list of items where each item has an interactive element (like a button) that needs to communicate specific data back to a parent or handler function. The `MedicationItem` component is designed to be reusable, displaying the `name` of a medication and a "Select" button. Crucially, it accepts an `onSelectMedication` prop, which is a callback function passed down from its parent (`PrescriptionSelector` in this case).

When the "Select" button within a `MedicationItem` is pressed, its `onPress` handler is an inline arrow function: `() => onSelectMedication(id, name)`. This is a key technique for passing specific data associated with that particular item (its unique `id` and `name`) to the `onSelectMedication` callback. If we had written `onPress={onSelectMedication(id, name)}` directly, the function would execute immediately upon render, not when the button is pressed. The arrow function wrapper ensures that `onSelectMedication` is only called upon the press event, and with the correct arguments corresponding to the item that was pressed.

The `PrescriptionSelector` component demonstrates how to use `MedicationItem`. It defines its own `handleMedicationSelection` function which matches the signature expected by `MedicationItem`'s `onSelectMedication` prop. This handler receives the `id` and `name` of the selected medication and, in this example, simply displays an alert. In a real SpeedyMeds application, this handler might update state, navigate to a detail screen, or add the medication to a refill list. By rendering multiple `MedicationItem` instances and passing the same `handleMedicationSelection` handler to each, the parent maintains control over what happens when an item is selected, while each child item correctly identifies itself upon interaction. This pattern is fundamental for building interactive lists and delegating event handling in React applications.

> [!IMPORTANT]
> Avoid calling the event handler function directly in the prop, like `onPress={onSelectMedication(id, name)}`. This would execute the function when the component renders, not when the event occurs. Always pass a function reference or an arrow function.

> ⚛️ **(Web Developers with React Experience):**
>
> **Comparison:** Event handling (e.g., `onClick`, `onChange`) in React for web is very similar. React Native uses specific event props like `onPress` for touch interactions. The pattern of passing functions and using arrow functions to pass arguments is identical.
>
> **Key Takeaway:** Your React event handling knowledge is directly applicable. Just be aware of the specific event prop names available on React Native components (e.g., `onPress` instead of `onClick` for button-like interactions).
>
> **Source:** [React Native Docs: Handling Touches](https://reactnative.dev/docs/handling-touches)

> 🅰️ **(Web Developers with Angular/Other Framework Experience):**
>
> **Comparison:** Angular uses `(event)="handler()"` syntax (e.g., `(click)="onSave()"`). React uses props like `onPress={handler}`. The concept of binding events to methods is similar, but the syntax differs. React's inline arrow functions for passing arguments are a common pattern.
>
> **Key Takeaway:** Event handlers are props that expect functions. Pay attention to how arguments are passed using arrow functions if needed.
>
> **Source:** [Angular Docs: Event binding](https://angular.io/guide/event-binding)

> 📲 **(Native Developers - Android/iOS):**
>
> **Comparison:** This is akin to setting listeners or targets/actions. For example, `button.setOnClickListener(...)` in Android or `addTarget(_:action:for:)` in iOS. In React Native, you assign a JavaScript function to an event prop like `onPress`.
>
> **Key Takeaway:** You handle user interactions by providing JavaScript functions to specific event props on components. These functions are executed when the interaction (e.g., a press) occurs.
>
> **Source:** [Android Dev Docs: Handle click events](https://developer.android.com/develop/ui/views/touch-and-input/input-events/click-events), [Apple Dev Docs: UIControl addTarget](https://developer.apple.com/documentation/uikit/uicontrol/1618259-addtarget)

React Native provides a consistent way to handle user interactions across platforms. The `onPress` event is fundamental for making your SpeedyMeds app interactive, allowing users to trigger actions like selecting a medication, confirming an order, or navigating to a new screen.

> 📚 **Official Documentation:**
>
> - [React Docs: Responding to Events](https://react.dev/learn/responding-to-events)
> - [React Native Docs: Handling Touches (covers `Button`, `Pressable` etc.)](https://reactnative.dev/docs/handling-touches)
> - [React Native Docs: `Button`](https://reactnative.dev/docs/button)
> - [React Native Docs: `Pressable`](https://reactnative.dev/docs/pressable)

### Next Steps

Handling user events is crucial for interactivity. Now that you can respond to user actions, the next step is to learn how to dynamically change what your components render based on different conditions. Proceed to [Section 7: Conditional Rendering](./section-07-conditional-rendering.md).
