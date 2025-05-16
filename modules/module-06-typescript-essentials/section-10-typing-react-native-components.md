## Section 10: Typing React Native Components

TypeScript significantly enhances React Native development by enabling strong typing for component props and state. This leads to more robust, maintainable, and understandable components, catching many common errors at compile time rather than at runtime. This section explores how to define types for component props (including optional and default props) and component state.

### Conceptual Content: Ensuring Component Integrity with Types

React Native components are the fundamental building blocks of your UI. Ensuring that these components receive the correct data (props) and manage their internal data (state) correctly is crucial for application stability.

#### Typing Component Props

When you define a React Native component, it often accepts properties (props) from its parent component. TypeScript allows you to create an `interface` or `type` alias to define the expected shape and types of these props.

**Key Benefits:**

- **Compile-Time Validation:** TypeScript checks if the parent component provides all required props and if their types are correct.
- **Improved Autocompletion:** Your IDE can provide accurate suggestions for available props when using the component.
- **Self-Documenting Code:** The prop interface clearly defines the component's API.
- **Safer Refactoring:** If you change a prop's name or type, TypeScript will highlight all places where the component is used incorrectly.

**Defining Prop Types:**

The common practice is to define an interface for your component's props and use `React.FC<PropsInterface>` (Functional Component) for function components.

A short, self-contained example of typing component props:

```tsx
import React from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";

// 1. Define an interface for the component's props
interface MedicationDisplayProps {
  name: string; // Name of the medication
  dosage: string; // e.g., "10mg", "2 pills"
  instructions?: string; // Optional instructions
  onPressMedication: (medicationName: string) => void; // Callback when pressed
  isActive: boolean;
}

// 2. Use React.FC and the props interface with your functional component
const MedicationDisplay: React.FC<MedicationDisplayProps> = ({
  name,
  dosage,
  instructions,
  onPressMedication,
  isActive,
}) => {
  const handlePress = () => {
    onPressMedication(name); // Call the provided callback
  };

  return (
    <TouchableOpacity
      onPress={handlePress}
      style={[
        styles.container,
        isActive ? styles.activeContainer : styles.inactiveContainer,
      ]}
    >
      <Text style={styles.nameText}>{name}</Text>
      <Text style={styles.dosageText}>Dosage: {dosage}</Text>
      {instructions && (
        <Text style={styles.instructionsText}>
          Instructions: {instructions}
        </Text>
      )}
      {!isActive && <Text style={styles.statusText}>(Inactive)</Text>}
    </TouchableOpacity>
  );
};

// Example Usage (typically in a parent component)
export default function PatientMedicationList() {
  const handleSelectMedication = (medName: string) => {
    console.log(`${medName} was selected.`);
    // Navigate to detail screen or perform other action
  };

  return (
    <View style={styles.listContainer}>
      <MedicationDisplay
        name="Lisinopril"
        dosage="10mg daily"
        instructions="Take in the morning."
        onPressMedication={handleSelectMedication}
        isActive={true}
      />
      <MedicationDisplay
        name="Metformin"
        dosage="500mg twice daily"
        // instructions prop is optional
        onPressMedication={handleSelectMedication}
        isActive={false}
      />
      {/*
      <MedicationDisplay
        name="Amoxicillin"
        // dosage="250mg" // If a required prop like 'dosage' or 'onPressMedication' is missing, TypeScript will error.
        onPressMedication={handleSelectMedication}
        isActive={true}
      />
      */}
    </View>
  );
}

const styles = StyleSheet.create({
  listContainer: {
    padding: 10,
  },
  container: {
    backgroundColor: "#f0f0f0",
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
    borderWidth: 1,
  },
  activeContainer: {
    borderColor: "green",
    backgroundColor: "#e6ffe6",
  },
  inactiveContainer: {
    borderColor: "#aaa",
    backgroundColor: "#e0e0e0",
    opacity: 0.7,
  },
  nameText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  dosageText: {
    fontSize: 16,
    marginBottom: 3,
  },
  instructionsText: {
    fontSize: 14,
    fontStyle: "italic",
    color: "#555",
  },
  statusText: {
    fontSize: 14,
    color: "red",
    marginTop: 5,
  },
});
```

> In this SpeedyMeds example, `MedicationDisplayProps` defines the contract for the `MedicationDisplay` component. It expects `name`, `dosage`, `onPressMedication`, and `isActive` as required props, and `instructions` as an optional prop. The `React.FC<MedicationDisplayProps>` type annotation connects this interface to the component.
>
> When `MedicationDisplay` is used in `PatientMedicationList`, TypeScript checks if all required props are passed with the correct types. For instance, if you were to forget the `dosage` prop or pass a number where a string is expected for `name`, TypeScript would flag this as an error during development. The `onPressMedication` prop is a function type, ensuring that the parent provides a compatible callback.

#### Optional and Default Props

Components often have props that are not strictly required or that have sensible default values.

- **Optional Props:** Mark a prop as optional in its interface by adding a `?` after the property name (e.g., `instructions?: string`).
- **Default Prop Values:** You can provide default values for props directly in the component's function signature using JavaScript's default parameter syntax, often combined with destructuring.

A short, self-contained example of optional and default props:

```tsx
import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";

interface PillButtonProps {
  title: string;
  onPress: () => void;
  color?: string; // Optional: background color of the button
  size?: "small" | "medium" | "large"; // Optional: specific size options
  disabled?: boolean; // Optional: to disable the button
}

const PillButton: React.FC<PillButtonProps> = ({
  title,
  onPress,
  color = "#007AFF", // Default value for color
  size = "medium", // Default value for size
  disabled = false, // Default value for disabled
}) => {
  const buttonStyle = [
    styles.buttonBase,
    { backgroundColor: disabled ? "#cccccc" : color },
    size === "small" && styles.buttonSmall,
    size === "large" && styles.buttonLarge,
    disabled && styles.buttonDisabled,
  ];

  const textStyle = [
    styles.textBase,
    size === "small" && styles.textSmall,
    size === "large" && styles.textLarge,
  ];

  return (
    <Pressable onPress={onPress} style={buttonStyle} disabled={disabled}>
      <Text style={textStyle}>{title}</Text>
    </Pressable>
  );
};

export default function ButtonDemo() {
  return (
    <View style={styles.demoContainer}>
      <PillButton
        title="Submit"
        onPress={() => console.log("Submit pressed")}
      />
      <PillButton
        title="Cancel"
        onPress={() => console.log("Cancel pressed")}
        color="#FF3B30"
        size="small"
      />
      <PillButton
        title="Confirm Large"
        onPress={() => console.log("Confirm pressed")}
        size="large"
        color="green"
      />
      <PillButton
        title="Disabled"
        onPress={() => console.log("Disabled pressed (should not happen)")}
        disabled={true}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  demoContainer: {
    padding: 20,
    alignItems: "center",
  },
  buttonBase: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginVertical: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonSmall: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 15,
  },
  buttonLarge: {
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 25,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  textBase: {
    color: "white",
    fontSize: 16,
    fontWeight: "500",
  },
  textSmall: {
    fontSize: 12,
  },
  textLarge: {
    fontSize: 18,
  },
});
```

> In the `PillButtonProps` interface, `color`, `size`, and `disabled` are optional. Inside the `PillButton` component, default values are provided for these props using destructuring (`color = '#007AFF'`, `size = 'medium'`, `disabled = false`).
>
> This pattern allows the `PillButton` to be used with minimal props (just `title` and `onPress`), while still offering customization. TypeScript ensures that if `color` or `size` _are_ provided, they match their expected types (`string` for color, and `'small' | 'medium' | 'large'` for size).

#### Typing Component State with `useState`

TypeScript works seamlessly with the `useState` hook to provide type safety for component state.

- **Explicit Typing:** You can provide an explicit type argument to `useState` (e.g., `useState<boolean>(false)` or `useState<User | null>(null)`).
- **Type Inference:** If you initialize `useState` with a value, TypeScript can often infer the state's type.

**Key Benefits:**

- Ensures that you only set state with values of the correct type.
- Provides type safety when accessing state variables.

A short, self-contained example of typing component state:

```tsx
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Switch,
} from "react-native";

interface MedicationReminder {
  medicationName: string;
  time: string; // e.g., "08:00"
  isTaken: boolean;
}

interface AddReminderFormState {
  currentMedicationName: string;
  selectedTime: string; // Storing as string for simplicity
  validationError: string | null;
}

export default function AddMedicationReminder() {
  // Explicitly typing complex state
  const [reminders, setReminders] = useState<MedicationReminder[]>([]);

  // TypeScript can infer the type for simple initial values
  const [medicationNameInput, setMedicationNameInput] = useState(""); // Infers string
  const [timeInput, setTimeInput] = useState("09:00"); // Infers string
  const [showForm, setShowForm] = useState(true); // Infers boolean
  const [validationMessage, setValidationMessage] = useState<string | null>(
    null
  ); // Explicit for union type

  const handleAddReminder = () => {
    if (!medicationNameInput.trim()) {
      setValidationMessage("Medication name cannot be empty.");
      return;
    }
    if (!timeInput.match(/^([01]\d|2[0-3]):([0-5]\d)$/)) {
      setValidationMessage("Time must be in HH:MM format.");
      return;
    }
    setValidationMessage(null);

    const newReminder: MedicationReminder = {
      medicationName: medicationNameInput,
      time: timeInput,
      isTaken: false,
    };
    setReminders((prevReminders) => [...prevReminders, newReminder]);
    setMedicationNameInput(""); // Reset input
    // setTimeInput(0); // TypeScript Error: Argument of type 'number' is not assignable to parameter of type 'SetStateAction<string>'.
  };

  return (
    <View style={styles.container}>
      <View style={styles.toggleContainer}>
        <Text>Show Add Reminder Form: </Text>
        <Switch value={showForm} onValueChange={setShowForm} />
      </View>

      {showForm && (
        <View style={styles.formContainer}>
          <Text style={styles.label}>Medication Name:</Text>
          <TextInput
            style={styles.input}
            value={medicationNameInput}
            onChangeText={setMedicationNameInput}
            placeholder="e.g., Aspirin"
          />
          <Text style={styles.label}>Time (HH:MM):</Text>
          <TextInput
            style={styles.input}
            value={timeInput}
            onChangeText={setTimeInput}
            placeholder="e.g., 08:30"
            keyboardType="numbers-and-punctuation"
          />
          {validationMessage && (
            <Text style={styles.errorText}>{validationMessage}</Text>
          )}
          <Button title="Add Reminder" onPress={handleAddReminder} />
        </View>
      )}

      <Text style={styles.header}>Reminders:</Text>
      {reminders.length === 0 && <Text>No reminders set.</Text>}
      {reminders.map((reminder, index) => (
        <View key={index} style={styles.reminderItem}>
          <Text style={styles.reminderText}>
            {reminder.medicationName} at {reminder.time} -{" "}
            {reminder.isTaken ? "Taken" : "Pending"}
          </Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  toggleContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  formContainer: {
    marginBottom: 20,
    padding: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
  },
  label: { fontSize: 16, marginBottom: 4 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 8,
    marginBottom: 12,
    borderRadius: 4,
  },
  errorText: { color: "red", marginBottom: 8 },
  header: { fontSize: 18, fontWeight: "bold", marginTop: 10, marginBottom: 5 },
  reminderItem: {
    backgroundColor: "#f9f9f9",
    padding: 10,
    borderRadius: 4,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: "#eee",
  },
  reminderText: { fontSize: 16 },
});
```

> In the `AddMedicationReminder` component for our SpeedyMeds app:
>
> - `reminders` state is explicitly typed as `MedicationReminder[]` because it's an array of complex objects. This ensures we can only add objects conforming to the `MedicationReminder` interface to this array.
> - `medicationNameInput` and `timeInput` state types are inferred by TypeScript as `string` from their initial values (`''` and `'09:00'`).
> - `showForm` is inferred as `boolean`.
> - `validationMessage` is explicitly typed as `string | null` to indicate it can be a string or `null`.
>
> If you try to set a state variable to a value of an incompatible type (e.g., `setTimeInput(0)` where `timeInput` is a string), TypeScript will generate an error. This compile-time checking is invaluable for preventing state-related bugs.

#### Alternative: Typing Props Directly on Functional Components

While `React.FC` (or `React.FunctionComponent`) has been a common way to type functional components, current best practices and React 18 type updates suggest that explicitly typing props directly on the function signature is often preferred. This approach offers more clarity, especially regarding the `children` prop.

**Key Considerations for Direct Prop Typing:**

- **No Implicit `children`:** Unlike `React.FC`, typing props directly does not automatically include the `children` prop. If your component accepts children, you must explicitly define `children: React.ReactNode;` (or a more specific type) in your props interface/type. This makes the component's API more explicit.
- **`defaultProps`:** Direct typing works more cleanly with `defaultProps` if you still use them (though default function parameters are often preferred).
- **Return Type:** You should explicitly type the return value of the component, typically `React.JSX.Element` or `React.ReactElement | null` if it can return null.

A short, self-contained example of typing props directly:

```tsx
import React from "react"; // Ensure React is imported for JSX and ReactNode
import { Text, View, StyleSheet } from "react-native";

/**
 * Props for the PatientBanner component.
 * @property {string} name - The patient's name to display.
 * @property {number} age - The patient's age.
 * @property {string} [status] - Optional status indicator (e.g., "In Observation").
 * @property {React.ReactNode} [children] - Optional children to render within the banner.
 */
type PatientBannerProps = {
  name: string;
  age: number;
  status?: string;
  children?: React.ReactNode; // Explicitly define children if needed
};

/**
 * Displays basic patient information.
 * This component demonstrates typing props directly on the function signature.
 * @param {PatientBannerProps} props - The component props.
 * @returns {React.JSX.Element} The rendered component.
 */
const PatientBanner = ({
  name,
  age,
  status,
  children,
}: PatientBannerProps): React.JSX.Element => {
  return (
    <View style={styles.bannerContainer}>
      <Text style={styles.bannerText}>Name: {name}</Text>
      <Text style={styles.bannerText}>Age: {age}</Text>
      {status && <Text style={styles.bannerText}>Status: {status}</Text>}
      {children && <View style={styles.childrenContainer}>{children}</View>}
    </View>
  );
};

// Example Usage (typically in a parent component)
export function PatientInfoScreen() {
  return (
    <View style={{ flex: 1, padding: 10 }}>
      <PatientBanner name="John Doe" age={35} status="Stable">
        <Text style={{ color: "green" }}>This patient is doing well.</Text>
      </PatientBanner>
      <PatientBanner name="Jane Smith" age={42} />
    </View>
  );
}

const bannerStyles = StyleSheet.create({
  // Renamed to avoid conflict if main styles exist
  bannerContainer: {
    padding: 10,
    backgroundColor: "#eef",
    borderRadius: 5,
    marginBottom: 10,
  },
  bannerText: {
    fontSize: 16,
  },
  childrenContainer: {
    marginTop: 5,
    paddingTop: 5,
    borderTopWidth: 1,
    borderTopColor: "#ddf",
  },
});

// Note: The original MedicationDisplay example used React.FC. Both patterns are valid,
// but direct typing is increasingly favored for its explicitness, especially regarding children.
// Choose a consistent style for your project.
```

> This `PatientBanner` example demonstrates defining props directly on the functional component. The `PatientBannerProps` type explicitly includes `children?: React.ReactNode` if the component is designed to accept them. The component's return type is also explicitly `React.JSX.Element`. This approach is often considered cleaner and more aligned with modern TypeScript and React practices.

#### Typing Component State with `useReducer`

The `useReducer` hook is an alternative to `useState` for managing more complex state logic, especially when state transitions depend on previous state or involve multiple sub-values. TypeScript can effectively type the state, actions, and the reducer function itself.

**Key Elements to Type:**

1.  **State Type:** Define an interface or type for the shape of your state object.
2.  **Action Type:** Use a discriminated union for the different actions your reducer can handle. Each action object typically has a `type` property (the discriminant) and an optional `payload`.
3.  **Reducer Function:** The reducer function `(state: StateType, action: ActionType) => StateType` will be strongly typed based on your defined state and action types.

A conceptual example of typing `useReducer`:

```tsx
import React, { useReducer } from "react"; // Ensure React and useReducer are imported
import { View, Text, Button, StyleSheet as ReducerStyles } from "react-native"; // Aliased StyleSheet

// 1. Define State Type
interface CounterState {
  count: number;
  error: string | null;
}

// 2. Define Action Types (Discriminated Union)
type CounterAction =
  | { type: "increment"; payload?: number } // payload is optional
  | { type: "decrement"; payload?: number }
  | { type: "reset" }
  | { type: "setError"; payload: string };

// Initial state
const initialState: CounterState = {
  count: 0,
  error: null,
};

// 3. Define the Reducer Function
function counterReducer(
  state: CounterState,
  action: CounterAction
): CounterState {
  switch (action.type) {
    case "increment":
      return {
        ...state,
        count: state.count + (action.payload || 1),
        error: null,
      };
    case "decrement":
      return {
        ...state,
        count: state.count - (action.payload || 1),
        error: null,
      };
    case "reset":
      return { ...initialState }; // Reset to initial state
    case "setError":
      return { ...state, error: action.payload };
    default:
      const unhandledAction: never = action; // Exhaustiveness check
      throw new Error(
        `Unhandled action type: ${(unhandledAction as any).type}`
      );
  }
}

export function CounterComponent() {
  const [state, dispatch] = useReducer(counterReducer, initialState);

  return (
    <View style={ReducerStyles.counterContainer}>
      <Text style={ReducerStyles.countText}>Count: {state.count}</Text>
      {state.error && (
        <Text style={ReducerStyles.errorText}>Error: {state.error}</Text>
      )}
      <View style={ReducerStyles.buttonRow}>
        <Button
          title="Increment"
          onPress={() => dispatch({ type: "increment" })}
        />
        <Button
          title="Decrement by 2"
          onPress={() => dispatch({ type: "decrement", payload: 2 })}
        />
      </View>
      <View style={ReducerStyles.buttonRow}>
        <Button title="Reset" onPress={() => dispatch({ type: "reset" })} />
        <Button
          title="Set Error"
          onPress={() =>
            dispatch({ type: "setError", payload: "Something went wrong!" })
          }
        />
      </View>
    </View>
  );
}

const ReducerStyles = StyleSheet.create({
  counterContainer: { alignItems: "center", padding: 10 },
  countText: { fontSize: 24, fontWeight: "bold", marginVertical: 10 },
  errorText: { color: "red", marginVertical: 5 },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "80%",
    marginVertical: 5,
  },
});
```

> In this `CounterComponent`, `CounterState` defines the shape of the state, and `CounterAction` uses a discriminated union for all possible actions. The `counterReducer` function is strongly typed, ensuring that state updates are handled correctly according to the dispatched action type and payload. TypeScript provides autocompletion and error checking when calling `dispatch` with action objects.

Using `useReducer` with TypeScript provides excellent type safety for more intricate state management logic within your components.

By consistently typing props and state, you create a more robust and predictable component structure, making your React Native application easier to develop, debug, and maintain.

> 📚 **Official Documentation & Resources:**
>
> - [React TypeScript Cheatsheets: `React.FC`](https://github.com/typescript-cheatsheets/react/blob/main/README.md#reactfc--reactfunctionalcomponent)
> - [React TypeScript Cheatsheets: `useState`](https://github.com/typescript-cheatsheets/react/blob/main/README.md#usestate)
> - [React Docs: Typing Component Props](https://reactjs.org/docs/static-type-checking.html#typescript) (Principles apply to React Native)

---
