## Section 9: Other Input Types (Switches, Pickers - using Paper components)

Forms often require more than just text inputs. Users might need to make binary choices (e.g., with a switch), select from a predefined list of options (e.g., with a picker/dropdown), or input dates. React Hook Form, through its `Controller` component, can integrate seamlessly with various custom input components, including those from UI libraries like React Native Paper, which is recommended in our course blueprint.

This section will demonstrate how to incorporate React Native Paper's `Switch`, build custom pickers using Paper components like `Menu`, and integrate popular third-party pickers like `react-native-picker-select` into your forms managed by React Hook Form.

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
import { TextInput as RNTextInput } from "react-native"; // Moved import here

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
                    accessibilityLabel="Enter Patient Name"
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

**2. Custom Pickers with React Native Paper**

When the standard platform pickers are insufficient or a more customized UI/UX is required for selection, React Native Paper components like `Menu` can be used to build custom pickers.

**Using `Menu` Component for Simple Dropdown Pickers:**

The `Menu` component from React Native Paper, along with `Menu.Item`, can create a simple dropdown-style picker.

- **Key `Menu` Props:** `visible` (boolean to control visibility), `onDismiss` (callback when the menu is dismissed, e.g., by tapping outside), and `anchor` (the UI element, typically a `Button`, that the menu is positioned relative to and which triggers its opening).
- **Key `Menu.Item` Props:** `title` (the text displayed for the option) and `onPress` (callback when the item is selected).

To integrate this with RHF `Controller`:

1.  Manage the menu\'s `visible` state locally within your component (using `useState`).
2.  The `anchor` (e.g., a `Button`) displays the currently selected value (from `field.value`) and opens the menu on press.
3.  Inside the `Menu.Item`\'s `onPress` handler, call `field.onChange(selectedValue)` to update RHF\'s state and then close the menu.

**Example: `Menu` as a Picker for "Contact Method"**

```tsx
import React, { useState } from "react";
import { View, StyleSheet, Alert } from "react-native";
import {
  Button,
  Menu,
  Text,
  Provider as PaperProvider,
  DefaultTheme,
} from "react-native-paper";
import { useForm, Controller, SubmitHandler } from "react-hook-form";

const theme = DefaultTheme;

interface PreferenceFormData {
  contactMethod: string;
}

const contactOptions = [
  { label: "Email", value: "email" },
  { label: "Phone", value: "phone" },
  { label: "SMS", value: "sms" },
];

const MenuPickerForm: React.FC = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<PreferenceFormData>({
    defaultValues: { contactMethod: "" },
  });
  const [menuVisible, setMenuVisible] = useState(false);

  const openMenu = () => setMenuVisible(true);
  const closeMenu = () => setMenuVisible(false);

  const onSubmit: SubmitHandler<PreferenceFormData> = (data) => {
    Alert.alert("Preferences Saved", `Contact Method: ${data.contactMethod}`);
    console.log("SpeedyMeds Preferences:", data);
  };

  return (
    <PaperProvider theme={theme}>
      <View style={styles.container}>
        <Text style={styles.label}>Preferred Contact Method:</Text>
        <Controller
          control={control}
          name="contactMethod"
          rules={{ required: "Please select a contact method" }}
          render={({ field: { onChange, value } }) => (
            <Menu
              visible={menuVisible}
              onDismiss={closeMenu}
              anchor={
                <Button
                  onPress={openMenu}
                  mode="outlined"
                  style={styles.pickerButton}
                  accessibilityLabel="Select Contact Method"
                  accessibilityHint="Opens a dropdown to select contact method"
                >
                  {contactOptions.find((opt) => opt.value === value)?.label ||
                    "Select..."}
                </Button>
              }
            >
              {contactOptions.map((opt) => (
                <Menu.Item
                  key={opt.value}
                  title={opt.label}
                  onPress={() => {
                    onChange(opt.value);
                    closeMenu();
                  }}
                />
              ))}
            </Menu>
          )}
        />
        {errors.contactMethod && (
          <Text style={styles.errorText}>{errors.contactMethod.message}</Text>
        )}
        <View style={styles.buttonContainer}>
          <Button mode="contained" onPress={handleSubmit(onSubmit)}>
            Save Preferences
          </Button>
        </View>
      </View>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20, flex: 1, justifyContent: "center" },
  label: { fontSize: 16, marginBottom: 8, fontWeight: "500" },
  pickerButton: { marginBottom: 10 },
  errorText: { color: "red", fontSize: 12, marginTop: -5, marginBottom: 10 },
  buttonContainer: { marginTop: 20 },
});

// To use this example, ensure you export it, e.g.:
// export default MenuPickerForm;
```

**Using `Dialog` Component for More Complex Pickers:**

For pickers requiring a more elaborate UI (e.g., with search functionality, custom item rendering, or multi-select capabilities), the React Native Paper `Dialog` component offers greater flexibility. A `Dialog` can host any custom content. You would typically use `Dialog`, `Dialog.Title`, `Dialog.Content`, and `Dialog.Actions`. The `Dialog` needs to be wrapped in a `Portal` component to ensure it renders above other content.

Integration with RHF `Controller` would involve:

1.  Managing the dialog\'s visibility state.
2.  Rendering your custom picker UI inside `Dialog.Content`.
3.  When a value is selected within the dialog, call `field.onChange(selectedValue)` and then close the dialog. This approach is more involved but provides maximum control over the picker\'s appearance and functionality.

**3. Alternative: `react-native-picker-select`**

`react-native-picker-select` is a popular third-party library that provides a cross-platform picker component aiming to emulate native select interfaces. It often wraps `@react-native-picker/picker`.

**Installation:**

```bash
npm install react-native-picker-select @react-native-picker/picker
# For iOS, if not using Expo Prebuild or if issues arise:
# npx pod-install ios
```

For Expo managed projects, `npx expo install react-native-picker-select @react-native-picker/picker` is recommended.

**Key Props of `react-native-picker-select`:**

- `onValueChange: (value: any, index: number) => void`: Callback invoked with the selected value and its index.
- `items: Array<{ label: string, value: any, key?: string, color?: string }>`: An array of objects defining the picker options. `label` and `value` are required.
- `value: any`: The currently selected value.
- `placeholder?: { label: string, value: any }`: An object to define a placeholder item (e.g., "Select an item..."). An empty object `{}` can disable it or use `null` for the value if it should represent no selection.
- `style?: object`: For custom styling of various parts of the picker (see library docs for details on `inputIOS`, `inputAndroid`, etc.).
- `useNativeAndroidPickerStyle?: boolean` (Android only): Defaults to `true`, using the native Android Picker. If `false`, it renders a `TextInput`-like component similar to the iOS default, allowing for more consistent styling across platforms.

**Example: `react-native-picker-select` for "Favorite Sport"**

```tsx
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Button as NativeButton,
  Alert,
} from "react-native";
import RNPickerSelect from "react-native-picker-select";
import { useForm, Controller, SubmitHandler } from "react-hook-form";

interface SurveyFormData {
  favoriteSport: string | null; // Allow null for placeholder
}

const sportsItems = [
  { label: "Football", value: "football" },
  { label: "Basketball", value: "basketball" },
  { label: "Tennis", value: "tennis" },
  { label: "Volleyball", value: "volleyball" },
];

const PickerSelectForm: React.FC = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SurveyFormData>({
    defaultValues: { favoriteSport: null }, // Use null for placeholder
  });

  const onSubmit: SubmitHandler<SurveyFormData> = (data) => {
    Alert.alert(
      "Survey Submitted",
      `Favorite Sport: ${data.favoriteSport || "None"}`
    );
    console.log("SpeedyMeds Survey Data:", data);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Favorite Sport:</Text>
      <Controller
        control={control}
        name="favoriteSport"
        rules={{ required: "Please select your favorite sport" }}
        render={({ field: { onChange, value } }) => (
          <View style={styles.pickerInputContainer}>
            <RNPickerSelect
              onValueChange={(val) => onChange(val)} // Pass selected value to RHF
              items={sportsItems}
              value={value} // Controlled by RHF
              placeholder={{ label: "Select a sport...", value: null }}
              style={pickerSelectStyles} // Custom styles for the picker
            />
          </View>
        )}
      />
      {errors.favoriteSport && (
        <Text style={styles.errorText}>{errors.favoriteSport.message}</Text>
      )}
      <View style={styles.buttonContainer}>
        <NativeButton title="Submit Survey" onPress={handleSubmit(onSubmit)} />
      </View>
    </View>
  );
};

// Add styles similar to SwitchFormScreen, adapting as necessary
// const styles = StyleSheet.create({ ... pickerInputContainer: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8 }, ... });

// Example custom styles for RNPickerSelect
const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 4,
    color: "black",
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 1, // Changed from 0.5 to match styling
    borderColor: "gray", // Changed from 'purple' to match styling
    borderRadius: 4, // Changed from 8 to match styling
    color: "black",
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  placeholder: {
    color: "#a0a0a0", // Placeholder text color
  },
});

export default PickerSelectForm;
```

**"Under the Hood": `react-native-picker-select` iOS vs. Android Rendering**

This library abstracts platform differences, but it\'s important to be aware of them for styling and behavior:

- **iOS:** By default, it renders an unstyled `TextInput` component. When tapped, it presents a native modal-like picker UI (`UIPickerView`). This allows for extensive styling of the "closed" state input.
- **Android:** By default (`useNativeAndroidPickerStyle={true}`), it uses the native Android `Picker` widget. This provides a native look and feel but offers less styling flexibility for the "closed" state. If `useNativeAndroidPickerStyle={false}` is set, it will render a `TextInput` on Android as well, behaving more like the iOS version and allowing for more consistent cross-platform styling.

This underlying difference is key to understanding why styling props might apply differently or why certain behaviors (like the appearance of the dropdown/modal) vary between platforms.

**Props Summary Tables:**

The tables below summarize key props for the discussed input components, aiding in their integration with React Hook Form.

**Table: React Native Paper `Switch` Core Props**

The following table details essential props for the React Native Paper `Switch` component when used for boolean input.

| Prop Name       | Type                              | Description                                                       |
| :-------------- | :-------------------------------- | :---------------------------------------------------------------- |
| `value`         | `boolean`                         | Current state of the switch (true for \'on\', false for \'off\'). |
| `onValueChange` | `(newValue: boolean) => void`     | Callback invoked with the new value when the switch is toggled.   |
| `disabled`      | `boolean` (optional)              | If true, the switch is non-interactive.                           |
| `color`         | `string` (optional)               | Custom color for the switch, typically when in the \'on\' state.  |
| `style`         | `StyleProp<ViewStyle>` (optional) | Custom styles for the switch container.                           |

**Table: React Native Paper `Menu` Core Props (for Picker Usage)**

| Prop Name   | Type              | Description                                                                                  |
| :---------- | :---------------- | :------------------------------------------------------------------------------------------- |
| `visible`   | `boolean`         | Controls whether the menu is currently visible.                                              |
| `onDismiss` | `() => void`      | Callback when the menu is dismissed (e.g., by tapping outside). Must set `visible` to false. |
| `anchor`    | `React.ReactNode` | The UI element (e.g., a `Button`) that the menu is positioned relative to.                   |
| `children`  | `React.ReactNode` | Content of the menu, typically `Menu.Item` components.                                       |

_Note: `Menu.Item` has props like `title` and `onPress` which are crucial for picker functionality._

**Table: `react-native-picker-select` Core Props**

The following table outlines core props for the `react-native-picker-select` component, useful for creating dropdown selection inputs.

| Prop Name                     | Type                                                        | Description                                                                                                         |
| :---------------------------- | :---------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------ |
| `onValueChange`               | `(value: any, index: number) => void`                       | Required. Callback with the selected value and its index.                                                           |
| `items`                       | `Array<{ label: string, value: any,... }>`                  | Required. Array of item objects for the picker. `label` and `value` are mandatory per item.                         |
| `value`                       | `any`                                                       | The currently selected value. Should be controlled by RHF via `Controller`.                                         |
| `placeholder`                 | `object` (e.g., `{ label: string, value: any }`) (optional) | Defines a placeholder item. Use `{}` or `null` value for placeholder.                                               |
| `disabled`                    | `boolean` (optional)                                        | If true, the picker is non-interactive.                                                                             |
| `style`                       | `object` (optional)                                         | Custom styles for various parts of the picker (see library docs for specific keys like `inputIOS`, `inputAndroid`). |
| `useNativeAndroidPickerStyle` | `boolean` (Android only, optional)                          | Default `true`. If `false`, uses a `TextInput`-like appearance on Android, similar to iOS.                          |

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

**(https://snack.expo.dev/INSERT_ACTUAL_EXERCISE_12_3_URL_HERE)**

Refer to the `README.md` in the Snack for detailed instructions.

By using `Controller`, React Hook Form provides a flexible way to integrate a wide variety of input components, making your forms highly adaptable to different data types and UI requirements in applications like SpeedyMeds.

> 📚 **Official Documentation:**
>
> - [React Native Paper - `Switch`](https://callstack.github.io/react-native-paper/docs/components/Switch/)
> - [React Native Paper - `Menu`](https://callstack.github.io/react-native-paper/docs/components/Menu/)
> - [React Native Paper - `Dialog`](https://callstack.github.io/react-native-paper/docs/components/Dialog/)
> - [`react-native-picker-select` - GitHub](https://github.com/lawnstarter/react-native-picker-select)
> - [`@react-native-picker/picker` - GitHub](https://github.com/react-native-picker/picker) (often a dependency)

## Challenge 12: Create a Patient Information Form

This challenge tasks you with building a comprehensive Patient Information form for the SpeedyMeds application, integrating various input types and robust validation using React Hook Form.

- **Objective:** Consolidate your learning from Module 12 by creating a multi-field form with different input types, validation, and submission handling.
- **Requirements:**
  1.  Use React Hook Form for state management and validation.
  2.  The form should collect at least the following patient information:
      - Full Name (TextInput, required, minLength 3)
      - Date of Birth (TextInput, placeholder for a date picker, required, basic format validation if possible e.g., YYYY-MM-DD pattern)
      - Email (TextInput, required, email pattern validation)
      - Phone Number (TextInput, numeric, length validation)
      - Opt-in for SMS Reminders (React Native Paper Switch, boolean)
      - Preferred Contact Method (Picker - you can use `react-native-picker-select` or simulate with RNP Menu, options: "Email", "Phone", "SMS", required)
      - Emergency Contact Name (TextInput, optional)
  3.  Implement appropriate validation rules for each field, displaying clear error messages.
  4.  The submit button should be disabled if the form is invalid.
  5.  On successful submission, display an `Alert` with all the collected patient data and then reset the form.
  6.  Ensure the form is scrollable to accommodate all fields.

**(https://snack.expo.dev/INSERT_ACTUAL_CHALLENGE_12_URL_HERE)**

### Next Steps

This section concludes our exploration of various input types with React Hook Form and React Native Paper. You are now equipped to handle diverse form requirements for the SpeedyMeds application.

Before moving on, ensure you complete the Module Challenge 12 (detailed above) to solidify your understanding of form handling in React Native.

After completing the challenge, you will be ready for [Module 13: Working with Data (Fetching, Storing)](../module-13-working-with-data/section-00-introduction.md).
