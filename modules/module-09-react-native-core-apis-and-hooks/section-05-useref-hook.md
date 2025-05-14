## Section 5: `useRef` Hook

The `useRef` Hook is a versatile tool in React that serves two primary purposes:

1.  Creating a mutable reference object whose `.current` property can hold any value (e.g., numbers, strings, objects, component instances). This reference persists for the full lifetime of the component, and importantly, changing its `.current` property does **not** trigger a re-render.
2.  Accessing underlying native component instances (like `<TextInput>`, `<ScrollView>`) or DOM elements in web React. This allows you to call imperative methods on them (e.g., `focus()` on an input, `scrollTo()` on a list).

While direct DOM manipulation is less common in React Native compared to the web, `useRef` is crucial for interacting with native component methods and managing values that shouldn\'t trigger the rendering lifecycle.

### Conceptual Content

**What is `useRef`?**

`useRef` returns a mutable ref object. Its `.current` property is initialized to the value you pass as an argument (the `initialValue`). The ref object itself (the container) is stable and will be the same object across all re-renders of the component.

**Key Characteristics & Use Cases:**

- **Accessing Native Component Instances:** You attach a ref to a React Native component (e.g., `<TextInput ref={myInputRef} />`) to get access to its underlying native instance. This allows imperative calls like `myInputRef.current.focus()` or `myListRef.current.scrollToEnd()`.
- **Storing Mutable Values Without Re-renders:** Useful for values that change but shouldn\'t cause a re-render, such as:
  - Timer IDs (from `setTimeout` or `setInterval`).
  - Subscription objects from event listeners or external data sources.
  - Previous state or prop values for comparison in `useEffect`.
  - Handles to imperative animation libraries.
- **Persistence:** The ref object persists for the component\'s entire lifetime.
- **Mutability of `.current`:** You can directly read and write to `ref.current`.
- **No Re-render on `.current` Change:** Modifying `ref.current` does not trigger a component re-render. This is the key difference from state managed by `useState`.

> [!IMPORTANT]
> If a value stored in a ref is directly used in your JSX for rendering, and you expect the UI to update when that value changes, `useRef` is the wrong tool. You should use `useState` for values that drive the component\'s visual output.

### Referential Content

- **`useRef<T>(initialValue: T): React.MutableRefObject<T>`** (When you have a definite initial value and the type T is known and won\'t be null later, e.g., `useRef<number>(0)`)
- **`useRef<T | null>(initialValue: T | null): React.RefObject<T>`** (More common for refs that will hold component instances, where `initialValue` is often `null`. `T` is the type of the component instance, e.g., `TextInput` from `react-native`. `RefObject` has a read-only `.current` from TypeScript\'s perspective initially, but React populates it.)

  - **`initialValue`**: The initial value for the `ref.current` property. Often set to `null` when the ref will hold a component instance, as the instance is only available after the initial render when the component mounts.
  - **Returns**: A ref object with a single property: `current`.
    - `ref.current`: Initially set to `initialValue`. You can later set it to something else. If you pass a ref object to React as a `ref` attribute on a component (e.g., `<TextInput ref={myRef} />`), React will set its `current` property to the corresponding native component instance when the component mounts, and back to `null` when it unmounts.

> 📚 **Official Documentation:**
>
> - [React Docs: `useRef`](https://react.dev/reference/react/useRef)
> - [React Docs: Manipulating the DOM with Refs](https://react.dev/learn/manipulating-the-dom-with-refs) (Web-focused, but core concepts of attaching refs and calling methods apply)
> - [React Native Docs: Refs and the DOM](https://reactnative.dev/docs/refs-and-the-dom) (Explains differences from web DOM and focus on native components)
> - [React Docs: `forwardRef`](https://react.dev/reference/react/forwardRef)
> - [React Docs: `useImperativeHandle`](https://react.dev/reference/react/useImperativeHandle)

### "Under the Hood": Refs and Native Interaction

When a ref is attached to a React Native core component, React Native\'s rendering system (Fabric in the New Architecture, or the legacy system) ensures that `ref.current` is populated with an object that can bridge calls to the native side.

- For methods like `focus()` on a `TextInput` or `scrollToIndex()` on a `FlatList`, calling them on `ref.current` dispatches a command to the UIManager (in the legacy architecture) or directly invokes a native method via JSI (in the New Architecture). This command instructs the corresponding native view to perform the action.
- For measurement methods like `measure()`, a request is sent to the native layout system to calculate the view\'s metrics. Once calculated, these values are passed back to the JavaScript callback function provided to `measure()`.

### Procedural Content

Let\'s explore `useRef` in the context of the SpeedyMeds app.

**1. Focusing a `TextInput` and Scrolling a `FlatList`**

In a form for adding a new medication or viewing a long list of patient medications, you might want to programmatically control focus or scroll position.

```tsx
import React, { useRef } from \"react\";
import {
  View,
  TextInput,
  Button,
  StyleSheet,
  Text,
  FlatList,
  SafeAreaView,
} from \"react-native\";

interface MedicationItem {
  id: string;
  name: string;
  dosage: string;
}

const MedicationManagementScreen: React.FC = () => {
  const medicationNameInputRef = useRef<TextInput>(null);
  const medicationListRef = useRef<FlatList<MedicationItem>>(null);

  const dummyMedications: MedicationItem[] = Array.from({ length: 25 }, (_, i) => ({
    id: `med-${i}`,
    name: `Medication #${i + 1} (e.g., Atorvastatin)`,
    dosage: `${(i % 3) + 1}0mg daily`,
  }));

  const handleFocusMedicationName = () => {
    medicationNameInputRef.current?.focus();
  };

  const handleScrollToTop = () => {
    medicationListRef.current?.scrollToOffset({ animated: true, offset: 0 });
  };

  const handleScrollToItem15 = () => {
    medicationListRef.current?.scrollToIndex({ animated: true, index: 14, viewPosition: 0 }); // 0 for top
  };

  const renderMedication = ({ item }: { item: MedicationItem }) => (
    <View style={styles.listItemContainer}>
      <Text style={styles.listItemName}>{item.name}</Text>
      <Text style={styles.listItemDosage}>{item.dosage}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.label}>New Medication Name:</Text>
      <TextInput
        ref={medicationNameInputRef}
        style={styles.input}
        placeholder=\"e.g., Amoxicillin 250mg\"
      />
      <Button
        title=\"Focus Medication Name Input\"
        onPress={handleFocusMedicationName}
      />
      <View style={styles.buttonRow}>
        <Button title=\"Scroll List to Top\" onPress={handleScrollToTop} />
        <Button title=\"Scroll to Item 15\" onPress={handleScrollToItem15} />
      </View>
      <FlatList
        ref={medicationListRef}
        data={dummyMedications}
        renderItem={renderMedication}
        keyExtractor={(item) => item.id}
        style={styles.list}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10 },
  label: { fontSize: 16, marginBottom: 5, fontWeight: \"bold\" },
  input: {
    height: 40,
    borderColor: \"gray\",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    backgroundColor: \"#fff\",
  },
  buttonRow: {
    flexDirection: \'row\',
    justifyContent: \'space-around\',
    marginVertical: 10,
  },
  list: {
    flex: 1,
    borderWidth: 1,
    borderColor: \'lightgray\',
  },
  listItemContainer: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: \'#eee\',
    backgroundColor: \'#f9f9f9\'
  },
  listItemName: {
    fontSize: 16,
    fontWeight: \'bold\'
  },
  listItemDosage: {
    fontSize: 14,
    color: \'#555\'
  }
});

export default MedicationManagementScreen;
```

In this `MedicationManagementScreen`:

- `medicationNameInputRef` is attached to a `TextInput` to allow focusing it.
- `medicationListRef` is attached to a `FlatList` to control its scroll position (`scrollToOffset`, `scrollToIndex`).
- This demonstrates accessing imperative methods on native component instances: `focus()`, `blur()`, `clear()`, `isFocused()` for `TextInput`; `scrollToEnd()`, `scrollToIndex()`, `scrollToOffset()` for `ScrollView`/`FlatList`; and `measure()`, `measureInWindow()`, `measureLayout()` for `View` instances to get their layout information.

**2. Storing a Mutable Value (e.g., Timer ID or Previous Prop)**

**a) Storing a Timer ID**

This example demonstrates using `useRef` to store a timer ID from `setTimeout`. This is useful for managing timers that shouldn't cause re-renders when their ID changes, and for ensuring they can be cleared correctly.

```tsx
import React, { useRef, useEffect, useState } from "react";
import { View, Text, Button, StyleSheet, Alert } from "react-native"; // Added Alert for example 3

const TemporaryNotification: React.FC = () => {
  const [message, setMessage] = useState<string | null>(null);
  const timerIdRef = useRef<NodeJS.Timeout | null>(null);

  const showNotification = (text: string, duration: number = 3000) => {
    // Clear any existing timer before setting a new one
    if (timerIdRef.current) {
      clearTimeout(timerIdRef.current);
    }

    setMessage(text);

    timerIdRef.current = setTimeout(() => {
      setMessage(null);
      timerIdRef.current = null; // Clear the ref after timer expires
    }, duration);
  };

  useEffect(() => {
    // Cleanup: Clear the timer if the component unmounts
    return () => {
      if (timerIdRef.current) {
        clearTimeout(timerIdRef.current);
      }
    };
  }, []); // Empty dependency array means this cleanup runs on unmount

  return (
    <View style={stylesForTimer.container}>
      <Button
        title="Show SpeedyMeds Tip"
        onPress={() =>
          showNotification(
            "SpeedyMeds Tip: Remember to take medication with food!"
          )
        }
      />
      {message && (
        <View style={stylesForTimer.notificationBox}>
          <Text style={stylesForTimer.notificationText}>{message}</Text>
        </View>
      )}
    </View>
  );
};

const stylesForTimer = StyleSheet.create({
  container: { alignItems: "center", marginVertical: 10 },
  notificationBox: {
    marginTop: 10,
    padding: 10,
    backgroundColor: "#e3f2fd", // Light blue
    borderRadius: 5,
    borderColor: "#90caf9", // Blue border
    borderWidth: 1,
  },
  notificationText: { color: "#1e88e5" }, // Blue text
});

// Note: To run this example in isolation, you would export default TemporaryNotification;
// For the combined section file structure, one main export is typically used.
```

Here, `timerIdRef` stores the ID returned by `setTimeout`. We use a ref because changing the timer ID should not cause a re-render. The `useEffect` cleanup function ensures that if the component unmounts while the timer is active, the timer is cleared.

**b) Storing Previous Prop Value for SpeedyMeds Prescription Change Detection**

Sometimes you need to compare a prop\'s current value with its previous value to trigger specific logic.

```tsx
import React, { useState, useEffect, useRef } from \"react\";
import { View, Text, StyleSheet, Button } from \"react-native\";

interface PrescriptionDisplayProps {
  currentPrescriptionId: string | null;
  patientName: string;
}

const PrescriptionChangeTracker: React.FC<PrescriptionDisplayProps> = ({
  currentPrescriptionId,
  patientName,
}) => {
  const previousPrescriptionIdRef = useRef<string | null>();

  useEffect(() => {
    // This effect runs *after* the component has rendered with the new props.
    // So, previousPrescriptionIdRef.current still holds the ID from the *previous* render.
    if (
      previousPrescriptionIdRef.current !== undefined && // Check if it\'s not the first render
      previousPrescriptionIdRef.current !== currentPrescriptionId
    ) {
      console.log(
        `SpeedyMeds: Prescription changed for ${patientName} from ${previousPrescriptionIdRef.current} to ${currentPrescriptionId}`
      );
      // Here you could trigger data re-fetch for the new prescription, analytics, etc.
    }

    // Update the ref\'s current value to the current ID for the *next* render cycle.
    previousPrescriptionIdRef.current = currentPrescriptionId;
  }, [currentPrescriptionId, patientName]); // Effect depends on currentPrescriptionId and patientName

  return (
    <View style={stylesForTracker.container}>
      <Text style={stylesForTracker.text}>Patient: {patientName}</Text>
      <Text style={stylesForTracker.text}>
        Current Rx ID: {currentPrescriptionId || \"None\"}
      </Text>
      <Text style={stylesForTracker.text}>
        Previous Rx ID: {previousPrescriptionIdRef.current === undefined ? \"N/A\" : previousPrescriptionIdRef.current || \"None\"}
      </Text>
    </View>
  );
};

const stylesForTracker = StyleSheet.create({
  container: { marginTop: 10, padding: 10, borderWidth: 1, borderColor: \"#FFD700\" }, // Gold border
  text: { fontSize: 14, color: \"#4A4A4A\", marginBottom: 4 },
});

// Example Parent Component to demonstrate PrescriptionChangeTracker
export const PatientDashboard: React.FC = () => {
  const [selectedRx, setSelectedRx] = useState<string | null>(\'rx1001\');
  const patient = \"John Doe\";

  return (
    <View style={{padding: 10}}>
      <Text style={{fontSize: 18, fontWeight: \'bold\'}}>Patient Dashboard: {patient}</Text>
      <PrescriptionChangeTracker currentPrescriptionId={selectedRx} patientName={patient} />
      <View style={{flexDirection: \'row\', justifyContent: \'space-around\', marginTop:10}}>
        <Button title=\"Select Rx A (rx1001)\" onPress={() => setSelectedRx(\'rx1001\')} />
        <Button title=\"Select Rx B (rx2002)\" onPress={() => setSelectedRx(\'rx2002\')} />
        <Button title=\"Select Rx C (rx3003)\" onPress={() => setSelectedRx(\'rx3003\')} />
      </View>
    </View>
  );
};
```

In this `PrescriptionChangeTracker`, `previousPrescriptionIdRef.current` always holds the value of `currentPrescriptionId` from the previous render, allowing for easy detection of changes to trigger further actions, like fetching new medication details for the SpeedyMeds app.

**3. `React.forwardRef` and `useImperativeHandle` for Custom Inputs**

When you create a custom component that wraps a native component like `TextInput`, you cannot directly attach a ref to your custom component and expect to call `focus()` on it. The `ref` would point to your custom component function instance, not the underlying `TextInput`. `React.forwardRef` allows your component to receive a `ref` and pass it down to a child. `useImperativeHandle` customizes the instance value that is exposed to parent components when using `ref`.

```tsx
import React, { useRef, forwardRef, useImperativeHandle, useState } from \"react\";
import {
  TextInput,
  TextInputProps,
  View,
  Text,
  Button,
  StyleSheet,
  Alert // Ensure Alert is imported if used (as in handleSubmit)
} from \"react-native\";

/**
 * Props for the SpeedyMedsInput component.
 * Extends standard TextInputProps.
 */
interface SpeedyMedsInputProps extends TextInputProps {
  /** The label to display above the input field. */
  label: string;
  /** Optional initial value for the input field. */
  initialValue?: string;
}

/**
 * Defines the imperative methods that can be called on a SpeedyMedsInput component instance
 * when accessed via a ref.
 */
export interface SpeedyMedsInputRef {
  /** Focuses the underlying TextInput field. */
  focusInput: () => void;
  /** Clears the underlying TextInput field and its internal state. */
  clearInput: () => void;
  /** Gets the current value of the input field from its internal state. */
  getValue: () => string | undefined;
  /** Sets the value of the input field in its internal state. */
  setValue: (text: string) => void;
}

/**
 * A custom TextInput component for SpeedyMeds forms that allows imperative control
 * via a ref using `forwardRef` and `useImperativeHandle`.
 * It manages its own internal value state.
 * @param props - The props for the component.
 * @param ref - The ref passed from the parent component.
 */
const SpeedyMedsInput = forwardRef<SpeedyMedsInputRef, SpeedyMedsInputProps>(
  (props, ref) => {
    const { label, initialValue = \"\", ...textInputProps } = props;
    const internalInputRef = useRef<TextInput>(null);
    const [value, setValueState] = useState<string>(initialValue);

    // Expose specific methods to the parent component via the passed \'ref\'
    useImperativeHandle(ref, () => ({
      focusInput: () => {
        internalInputRef.current?.focus();
      },
      clearInput: () => {
        internalInputRef.current?.clear();
        setValueState(\'\'); // Also clear internal state if managing it
      },
      getValue: () => {
        return value; // Or internalInputRef.current?.props.value if not controlled internally
      },
      setValue: (text: string) => {
        setValueState(text);
        // If not fully controlled, this might just set the internal state
        // and not directly manipulate internalInputRef.current.setNativeProps({text: text})
        // unless that level of control is needed.
      }
    }));

    const handleChangeText = (text: string) => {
      setValueState(text);
      if (props.onChangeText) {
        props.onChangeText(text);
      }
    };

    return (
      <View style={stylesForForwardRef.inputContainer}>
        <Text style={stylesForForwardRef.label}>{label}</Text>
        <TextInput
          ref={internalInputRef}
          style={stylesForForwardRef.input}
          placeholderTextColor=\"#888\"
          value={value} // Controlled component
          onChangeText={handleChangeText}
          {...textInputProps}
        />
      </View>
    );
  }
);

const MedicationRefillForm: React.FC = () => {
  const pharmacyNameRef = useRef<SpeedyMedsInputRef>(null);
  const patientIdRef = useRef<SpeedyMedsInputRef>(null);

  const handleSubmit = () => {
    const pharmacy = pharmacyNameRef.current?.getValue();
    const patientId = patientIdRef.current?.getValue();
    Alert.alert(\"Refill Submitted\", `Pharmacy: ${pharmacy}, Patient ID: ${patientId}`);
    pharmacyNameRef.current?.clearInput();
    patientIdRef.current?.clearInput();
  };

  return (
    <View style={stylesForForwardRef.formContainer}>
      <SpeedyMedsInput
        ref={pharmacyNameRef}
        label=\"Pharmacy Name\"
        placeholder=\"Enter pharmacy name\"
        initialValue=\"SpeedyMeds Downtown\"
      />
      <SpeedyMedsInput
        ref={patientIdRef}
        label=\"Patient ID\"
        placeholder=\"Enter patient ID\"
        keyboardType=\"numeric\"
      />
      <Button title=\"Focus Pharmacy Input\" onPress={() => pharmacyNameRef.current?.focusInput()} />
      <Button title=\"Submit Refill Request\" onPress={handleSubmit} />
    </View>
  );
};

const stylesForForwardRef = StyleSheet.create({
  formContainer: { padding: 15, backgroundColor: \'#f0f0f0\' },
  inputContainer: { marginBottom: 15 },
  label: { fontSize: 14, color: \'#333\', marginBottom: 4, fontWeight: \'500\' },
  input: {
    height: 45,
    borderColor: \"#aaa\",
    borderWidth: 1,
    paddingHorizontal: 12,
    backgroundColor: \"#fff\",
    borderRadius: 5,
  },
});

export default MedicationRefillForm;

```

`React.forwardRef` is essential for creating reusable components that need to expose imperative control over their underlying native elements. `useImperativeHandle` provides a way to limit and define exactly which functions are exposed, offering better encapsulation.

### Background Bridge Notes

> 📲 **(Native Developers):**
>
> **Comparison:** In native iOS (Swift/Objective-C), you might hold direct references to UI elements (like `UITextField` instances via `@IBOutlet` or programmatically). `useRef` for component instances is similar to having such a reference, allowing you to call methods on it. For mutable values not triggering UI updates, you'd use regular instance variables/properties.
>
> **Key Takeaway:** `useRef` provides a React-idiomatic way to get hold of these instance-like references within functional components and to manage mutable data outside the standard state rendering flow.

> 🌐 **(Web Developers):**
>
> **Comparison:** This is very similar to `useRef` in React for the web. You use it to get references to DOM elements (e.g., `<input ref={myRef} />`) to call methods like `focus()` or to store mutable values like animation IDs or subscription objects without causing re-renders.
>
> **Key Takeaway:** The concept and usage of `useRef`, `forwardRef`, and `useImperativeHandle` are largely consistent between React for web and React Native. The main difference lies in _what_ you are referencing – native component instances in React Native versus DOM elements in web React, and thus the specific imperative methods available on those references will differ.

**Table: `useRef` vs. Other Referencing/Mutable Value Mechanisms**

| Mechanism                       | Primary Use                                   | Triggers Re-render?         | Scope/Lifecycle    | Typical Scenario (React Native)                                     |
| ------------------------------- | --------------------------------------------- | --------------------------- | ------------------ | ------------------------------------------------------------------- |
| `useRef` (Component Instance)   | Access/manipulate native view instances       | No                          | Component instance | `inputRef.current.focus()`, `listRef.current.scrollToIndex()`       |
| `useRef` (Mutable Value)        | Store persistent value without re-render      | No                          | Component instance | Timer ID, previous props/state, animation handles                   |
| `useState`                      | Manage component state that drives UI         | Yes                         | Component instance | Form inputs, visibility toggles, data for display                   |
| Instance Variable (Class Comp)  | Store persistent value in class components    | No (if not in `this.state`) | Class instance     | Similar to `useRef` for mutable values in classes (less common now) |
| `document.getElementById` (Web) | Direct DOM access (outside React model)       | N/A (external)              | Global DOM         | Legacy/non-React DOM manipulation (avoid in React apps)             |
| `@ViewChild` (Angular)          | Access child component/DOM element in Angular | N/A (Angular)               | Component instance | Imperative calls on child components/elements in Angular            |

This table helps clarify the distinct roles and behaviors of `useRef` compared to other mechanisms for referencing elements or storing mutable data, which is particularly useful for learners transitioning from different programming paradigms.

`useRef` is a powerful Hook for breaking out of the typical declarative React flow when you need to interact imperatively with components or manage mutable values without triggering re-renders. Use it judiciously where direct interaction or non-rendering state is genuinely required.
