## Section 9: Other Input Types (Switches, Pickers - using Paper components)

Forms often require more than just text inputs. Users might need to make binary choices (e.g., with a switch), select from a predefined list of options (e.g., with a picker/dropdown), or input dates. React Hook Form, through its `Controller` component, can integrate seamlessly with various custom input components, including those from UI libraries like React Native Paper, which is recommended in our course blueprint.

This section will demonstrate how to incorporate React Native Paper's `Switch` and a conceptual `Picker` (as Paper doesn't have a direct Picker, we'll illustrate the pattern, often achieved with a `Modal` and `List` or a third-party library) into your forms managed by React Hook Form.

**Integrating with `Controller`**

The `Controller` component is key to integrating any controlled input, whether it's a standard React Native component or a custom one from a library. The `render` prop gives you `field` properties (`onChange`, `onBlur`, `value`, `ref`) that you map to the corresponding props of your chosen input component.

**1. Using React Native Paper `Switch`**

A `Switch` component is used for toggling a boolean state (on/off, true/false).

- **React Native Paper `Switch` Props:**
  - `value` (boolean): The current state of the switch.
  - `onValueChange` ((value: boolean) => void): Callback that is called when the switch is toggled.

**Mapping to `Controller`:**

- `Controller`'s `field.value` maps to `Switch`'s `value`.
- `Controller`'s `field.onChange` maps to `Switch`'s `onValueChange`.

**Short, Self-Contained Example: `Switch` for "Opt-in to Notifications"**

Let's add an option for a patient to opt-in for medication reminders in our SpeedyMeds app.

```tsx
import React from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Button,
  Alert,
  ScrollView,
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import {
  Switch,
  Provider as PaperProvider,
  DefaultTheme,
} from "react-native-paper"; // Import Switch

// It's good practice to define a theme for PaperProvider
const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: "#1e88e5",
    accent: "#00bfa5",
  },
};

interface PatientPreferencesFormData {
  patientName: string;
  receiveNotifications: boolean;
}

const SwitchFormScreen = () => {
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    reset,
    watch, // To observe changes in the switch value
  } = useForm<PatientPreferencesFormData>({
    defaultValues: {
      patientName: "",
      receiveNotifications: false, // Default to false
    },
    mode: "onChange",
  });

  // Watch the value of receiveNotifications to display it
  const notificationsEnabled = watch("receiveNotifications");

  const onSubmit = (data: PatientPreferencesFormData) => {
    Alert.alert(
      "Preferences Saved (SpeedyMeds)",
      `Name: ${data.patientName}\nNotifications: ${
        data.receiveNotifications ? "Enabled" : "Disabled"
      }`
    );
    console.log("SpeedyMeds Patient Preferences:", data);
    reset();
  };

  return (
    <PaperProvider theme={theme}>
      <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.formContainer}>
            <Text style={styles.title}>Patient Preferences</Text>

            <Controller
              control={control}
              name="patientName"
              rules={{ required: "Patient name is required." }}
              render={({
                field: { onChange, onBlur, value },
                fieldState: { error },
              }) => (
                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Patient Name:</Text>
                  <RNTextInput
                    style={[styles.input, error ? styles.inputError : null]}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    placeholder="Enter patient name"
                    placeholderTextColor="#a0a0a0"
                  />
                  {error && (
                    <Text style={styles.errorText}>{error.message}</Text>
                  )}
                </View>
              )}
            />

            <Controller
              control={control}
              name="receiveNotifications"
              // No specific rules needed for a boolean switch unless it's conditionally required
              render={({ field: { onChange, value } }) => (
                <View style={styles.switchContainer}>
                  <Text style={styles.label}>
                    Receive Medication Reminders:
                  </Text>
                  <Switch
                    value={value} // Controlled by RHF
                    onValueChange={onChange} // Updates RHF state
                    color={theme.colors.primary} // Use theme color
                  />
                </View>
              )}
            />
            <Text style={styles.infoText}>
              Reminders currently: {notificationsEnabled ? "ON" : "OFF"}
            </Text>

            <View style={styles.buttonContainer}>
              <Button
                title="Save Preferences"
                onPress={handleSubmit(onSubmit)}
                disabled={!isValid}
                color={theme.colors.primary}
              />
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </PaperProvider>
  );
};

// Removed the incorrect placeholder TextInput component that was here.
// Make sure to import TextInput from react-native as RNTextInput at the top of the file:
// import { TextInput as RNTextInput } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f2f5",
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    padding: 16,
  },
  formContainer: {
    backgroundColor: "#ffffff",
    padding: 25,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
    marginBottom: 30,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    color: "#444",
    marginBottom: 8,
    fontWeight: "500",
  },
  input: {
    height: 48,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    fontSize: 16,
    backgroundColor: "#fff",
  },
  inputError: {
    borderColor: "#e53935",
  },
  errorText: {
    color: "#e53935",
    fontSize: 13,
    marginTop: 5,
  },
  switchContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
    marginTop: 10,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  infoText: {
    fontSize: 14,
    color: "#555",
    marginBottom: 25,
    textAlign: "left",
  },
  buttonContainer: {
    marginTop: 20,
  },
});

export default SwitchFormScreen;
```

**Explanation:**

1.  We import `Switch` from `react-native-paper` and wrap our component with `PaperProvider` (required by React Native Paper).
2.  The `receiveNotifications` field in `PatientPreferencesFormData` is a boolean.
3.  The `Controller` for `receiveNotifications` maps its `field.value` to the `Switch`'s `value` prop and `field.onChange` to the `onValueChange` prop.
4.  The `watch('receiveNotifications')` call is used to observe the current value of the switch and display it, demonstrating real-time state tracking.

**2. Integrating a Picker/Dropdown (Conceptual)**

React Native core does not include a built-in, universally styled Picker component that works consistently across both iOS and Android with a dropdown-like UI. `@react-native-picker/picker` is a community package that provides this functionality, and React Native Paper typically relies on integrating such components or building custom solutions using its `Modal` and `List.Item` components for a dropdown experience.

For the purpose of demonstrating integration with React Hook Form, let's assume we have a conceptual `CustomPicker` component. The pattern remains the same: use `Controller` and map its `field` properties.

**Conceptual `CustomPicker` Props:**

- `selectedValue`: The currently selected value.
- `onValueChange`: Callback when a new value is selected.
- `items`: An array of objects like `{ label: string, value: any }`.

**Conceptual Example: Picker for Medication Type**

```typescript
// In your form component:
// interface MedicationFormData { /* ... */ medicationType: string; }
// const { control, /* ... */ } = useForm<MedicationFormData>({
//   defaultValues: { medicationType: 'tablet' },
// });

<Controller
  control={control}
  name="medicationType"
  rules={{ required: "Medication type is required." }}
  render={({ field: { onChange, value }, fieldState: { error } }) => (
    <View style={styles.inputGroup}>
      <Text style={styles.label}>Medication Type:</Text>
      {/* <CustomPicker
        selectedValue={value}
        onValueChange={onChange}
        items={[
          { label: 'Tablet', value: 'tablet' },
          { label: 'Capsule', value: 'capsule' },
          { label: 'Syrup', value: 'syrup' },
          { label: 'Injection', value: 'injection' },
        ]}
        // ... other props for your CustomPicker
      /> */}
      {/* Replace CustomPicker with an actual implementation or library */}
      <Text style={styles.placeholderText}>
        (Picker/Dropdown for Medication Type - Conceptual)
      </Text>
      {error && <Text style={styles.errorText}>{error.message}</Text>}
    </View>
  )}
/>
```

**Key Points for Picker Integration:**

- The `field.value` from `Controller` would hold the selected value of the picker.
- The `field.onChange` from `Controller` would be called by the picker's `onValueChange` (or equivalent) prop.
- You would source the `items` for the picker from your application's data or constants.

> [!TIP]
> For a true dropdown/picker experience in React Native, you often need to use a third-party library (like `@react-native-picker/picker` for basic functionality, or more comprehensive ones like `react-native-dropdown-picker`) or build a custom component using a `Modal` from React Native or React Native Paper to display the list of options. The integration principle with React Hook Form's `Controller` remains consistent.

**Exercise 12.3: Integrating Switch/Picker in a Form**

Time to practice integrating these non-text input types.

- **Objective:** Create a form using React Hook Form that includes a React Native Paper `Switch` and a conceptual `Picker` (you can simulate the picker or use a simple `TextInput` as a placeholder if a full Picker component is too complex for the exercise scope, but ensure the RHF integration logic is present).
- **Requirements:**
  1.  Set up an Expo Snack with React Hook Form and React Native Paper installed.
  2.  Design a form for "Patient Consent" in the SpeedyMeds app with fields for:
      - `patientName` (string, `TextInput`, required).
      - `consentForTreatment` (boolean, React Native Paper `Switch`).
      - `preferredPharmacy` (string, use a `TextInput` as a placeholder for a Picker, make it required).
  3.  Use `Controller` to integrate all fields with React Hook Form.
  4.  Provide default values. For `consentForTreatment`, default to `false`.
  5.  Display validation errors if any.
  6.  On submit, show an `Alert` with all collected form data.

**(URL_to_Tool)** _(Link to Expo Snack for Exercise 12.3)_

Refer to the `README.md` in the Snack for detailed instructions.

By using `Controller`, React Hook Form provides a flexible way to integrate a wide variety of input components, making your forms highly adaptable to different data types and UI requirements in applications like SpeedyMeds.
