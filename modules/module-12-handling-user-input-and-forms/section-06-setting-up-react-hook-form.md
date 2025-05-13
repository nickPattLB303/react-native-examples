## Section 6: Setting up React Hook Form

Now that we've established the benefits of using a form library and recommended React Hook Form, let's walk through the process of installing and setting it up in your Expo project. This section will cover the initial steps to get you started with using its powerful features for your SpeedyMeds application forms.

**Installation**

Integrating React Hook Form into your Expo project is straightforward using `npx expo install` or your preferred package manager (npm/yarn). Using `npx expo install` is recommended as it ensures compatibility with your Expo SDK version.

1.  **Open your terminal** in the root directory of your Expo project.
2.  **Run the installation command:**

    ```bash
    npx expo install react-hook-form
    ```

    Alternatively, using npm or yarn:

    ```bash
    npm install react-hook-form
    # or
    yarn add react-hook-form
    ```

This command will download and add `react-hook-form` to your project's `package.json` and `node_modules` directory.

> [!NOTE]
> React Hook Form itself does not have any native dependencies, so it works seamlessly with Expo Go and development builds without requiring custom native code compilation.

**Core Concept: The `useForm` Hook**

The primary entry point for using React Hook Form is the `useForm` hook. This hook provides various methods and state values necessary for managing your form.

When you call `useForm`, you get back an object containing several useful properties and functions, including:

- `register`: A function to register your inputs with React Hook Form. This is primarily for web environments with uncontrolled inputs. For React Native, we'll often use the `Controller` component.
- `handleSubmit`: A function to handle form submission. It takes your submit handler function as an argument and will only call it if validation passes.
- `control`: An object that contains methods for registering controlled components. This is crucial for integrating with React Native input components from UI libraries or custom controlled inputs. We will use this extensively.
- `formState`: An object containing information about the form's state, such as `errors`, `isValid`, `isDirty`, `isSubmitting`, etc.
- `watch`: A function to watch specified input values and re-render when they change.
- `setValue`: A function to dynamically set the value of a registered input.
- `reset`: A function to reset the form fields to their default values.

**Basic Setup in a Component**

Let's create a basic structure for a form component using `useForm`.

1.  **Import `useForm`:**

    ```typescript
    import { useForm, Controller } from "react-hook-form";
    ```

    We also import `Controller`, which is essential for integrating `TextInput` and other React Native input components.

2.  **Call `useForm` in your component:**

    ```typescript
    interface FormData {
      medicationName: string;
      quantity: number;
    }

    const SpeedyMedsPrescriptionForm = () => {
      const {
        control,
        handleSubmit,
        formState: { errors },
      } = useForm<FormData>({
        defaultValues: {
          medicationName: "",
          quantity: 1,
        },
        mode: "onChange", // Optional: validate on change
      });
      // ... rest of the component
    };
    ```

    - We define an interface `FormData` to provide type safety for our form values.
    - `useForm<FormData>()` is called, optionally providing `defaultValues` for your form fields and a `mode` (e.g., `'onChange'` to trigger validation on every input change, `'onBlur'` to validate on blur, or `'onSubmit'` which is the default).
    - We destructure `control`, `handleSubmit`, and `formState: { errors }` from the `useForm` hook's return value.

**Integrating with `TextInput` using `Controller`**

Since React Native's `TextInput` is a controlled component by nature (when you manage its `value` and `onChangeText`), we use the `Controller` component from React Hook Form to bridge it with the form state.

The `Controller` component wraps your input component and takes care of registering it with React Hook Form, handling its value, and managing its state updates.

**Short, Self-Contained Example: Basic React Hook Form Setup with `Controller`**

This example demonstrates setting up a simple form with one `TextInput` field for a patient's name, managed by React Hook Form using the `Controller` component.

```tsx
import React from "react";
import {
  SafeAreaView,
  StyleSheet,
  TextInput,
  Text,
  View,
  Button,
  Alert,
} from "react-native";
import { useForm, Controller, FieldValues } from "react-hook-form";

interface PatientFormData {
  patientName: string;
  // Add other fields here for the SpeedyMeds app, e.g.:
  // age: number;
  // condition: string;
}

const BasicRHFScreen = () => {
  const {
    control,
    handleSubmit,
    formState: { errors, isValid }, // Added isValid for button state
    reset, // To clear the form
  } = useForm<PatientFormData>({
    defaultValues: {
      patientName: "",
    },
    mode: "onChange", // Validate as user types
  });

  const onSubmit = (data: PatientFormData) => {
    Alert.alert("Form Submitted", `Patient Name: ${data.patientName}`);
    console.log("SpeedyMeds Patient Data:", data);
    // In a real SpeedyMeds app, you'd send this data to a server or store it.
    reset(); // Optionally reset the form after successful submission
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.formContainer}>
        <Text style={styles.title}>Patient Registration (SpeedyMeds)</Text>

        <Controller
          control={control} // Pass the control object from useForm
          rules={{
            required: "Patient name is required.",
            minLength: {
              value: 2,
              message: "Name must be at least 2 characters.",
            },
          }}
          render={({
            field: { onChange, onBlur, value },
            fieldState: { error },
          }) => (
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Patient Full Name:</Text>
              <TextInput
                style={[styles.input, error ? styles.inputError : null]}
                onBlur={onBlur} // Important for 'onBlur' validation mode if used
                onChangeText={onChange} // Connects TextInput's change to RHF
                value={value} // TextInput value is controlled by RHF
                placeholder="e.g., John Doe"
                placeholderTextColor="#aaa"
              />
              {error && <Text style={styles.errorText}>{error.message}</Text>}
            </View>
          )}
          name="patientName" // Unique name for this input field
        />

        <View style={styles.buttonContainer}>
          <Button
            title="Register Patient"
            onPress={handleSubmit(onSubmit)} // handleSubmit validates before calling onSubmit
            color="#27ae60"
            disabled={!isValid} // Disable button if form is not valid
          />
        </View>
        <View style={[styles.buttonContainer, { marginTop: 10 }]}>
          <Button
            title="Reset Form"
            onPress={() => reset({ patientName: "" })} // Reset to default or specific values
            color="#e74c3c"
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 16,
    backgroundColor: "#f4f7f6",
  },
  formContainer: {
    backgroundColor: "#ffffff",
    padding: 25,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 4,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#2c3e50",
    textAlign: "center",
    marginBottom: 25,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    color: "#34495e",
    marginBottom: 8,
    fontWeight: "500",
  },
  input: {
    height: 50,
    borderColor: "#d1d8e0",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: 16,
    backgroundColor: "#fdfdfe",
  },
  inputError: {
    borderColor: "#e74c3c", // Red border for errors
  },
  errorText: {
    color: "#e74c3c",
    fontSize: 13,
    marginTop: 5,
  },
  buttonContainer: {
    marginTop: 15,
  },
});

export default BasicRHFScreen;
```

**Explanation of the `Controller` Usage:**

- `name="patientName"`: This is a required prop and must be unique for each field in your form. It links the `Controller` to the specific field in your `FormData` type and `defaultValues`.
- `control={control}`: Passes the `control` object obtained from `useForm`.
- `rules={{ ... }}`: An optional prop where you can define validation rules for this input (e.g., `required`, `minLength`, `pattern`). We'll cover validation in detail in the next section.
- `render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (...) }`: This is a render prop function.
  - `field`: This object contains `onChange`, `onBlur`, and `value` specific to this field, which you pass to your `TextInput`.
    - `onChange`: Pass this to `TextInput`'s `onChangeText`.
    - `onBlur`: Pass this to `TextInput`'s `onBlur`.
    - `value`: Pass this to `TextInput`'s `value`.
  - `fieldState: { error }`: This object provides information about the field's state, including any validation `error` associated with it. We use this to display an error message and style the input differently if there's an error.
- The `Button`'s `onPress` is wrapped with `handleSubmit(onSubmit)`. `handleSubmit` will first trigger validation, and if all rules pass, it will call your `onSubmit` function with the form data.
- The `disabled={!isValid}` prop on the submit button demonstrates how to use form state to enhance UX.
- A reset button is added to demonstrate the `reset` functionality from `useForm`.

This setup provides a solid foundation for building forms with React Hook Form in React Native. You now have a mechanism to register inputs, handle their state, and prepare for validation and submission, all with significantly less boilerplate than manual state management for complex forms.
