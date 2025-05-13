## Section 8: Handling Form Submission

Once you have your form fields set up and validation in place with React Hook Form, the next crucial step is handling the submission process. This involves taking the validated form data and performing an action, such as sending it to an API, storing it locally, or navigating to another screen. React Hook Form simplifies this with its `handleSubmit` function and by providing state to manage the submission process, including asynchronous operations.

**The `handleSubmit` Function**

As we've seen in previous examples, the `handleSubmit` function is provided by the `useForm` hook. Its primary role is to:

1.  Trigger form validation based on your defined rules and `mode`.
2.  If validation fails, it prevents your submission handler from being called and updates the `errors` object in `formState`.
3.  If validation passes, it calls your custom submission handler function, passing the validated form data as an argument.

**Usage:**

You typically pass your submission logic function to `handleSubmit` in the `onPress` prop of your submit button:

```tsx
const { handleSubmit /* ...other properties from useForm */ } =
  useForm<MyFormData>();

const mySubmitHandler = (data: MyFormData) => {
  // This function is only called if validation passes.
  console.log("Form data is valid:", data);
  // Perform actions like API calls here.
};

// In your JSX:
<Button title="Submit Prescription" onPress={handleSubmit(mySubmitHandler)} />;
```

**Handling Asynchronous Submissions (e.g., API Calls)**

Most real-world form submissions involve asynchronous operations, such as posting data to a server. Your submission handler function can be an `async` function, and React Hook Form will correctly await its completion.

React Hook Form provides `formState.isSubmitting` to help you manage the UI during these asynchronous operations (e.g., disabling the submit button, showing a loading indicator).

- `isSubmitting` (boolean): Becomes `true` when `handleSubmit` is called and your asynchronous submission handler is executing. It reverts to `false` once your handler resolves or rejects.

**Short, Self-Contained Example: Asynchronous Submission with Loading State**

Let's simulate an API call for submitting patient medication data from our SpeedyMeds app and show a loading indicator.

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
  ActivityIndicator, // For loading indication
  ScrollView,
} from "react-native";
import { useForm, Controller } from "react-hook-form";

interface MedicationFormData {
  medicationName: string;
  dosage: string;
  patientId: string; // Example: ID of the patient this medication is for
}

// Simulate an API call
const submitMedicationToAPI = (data: MedicationFormData): Promise<void> => {
  return new Promise((resolve, reject) => {
    console.log("SpeedyMeds - Submitting to API:", data);
    setTimeout(() => {
      // Simulate success/failure randomly
      if (Math.random() > 0.2) {
        // 80% chance of success
        console.log("SpeedyMeds - API Submission Successful");
        resolve();
      } else {
        console.error("SpeedyMeds - API Submission Failed");
        reject(new Error("Failed to submit medication. Please try again."));
      }
    }, 2000); // Simulate 2-second network delay
  });
};

const AsyncSubmitRHFScreen = () => {
  const {
    control,
    handleSubmit,
    formState: { errors, isValid, isSubmitting }, // isSubmitting for loading state
    reset,
    setError, // To set errors from API response
  } = useForm<MedicationFormData>({
    defaultValues: {
      medicationName: "",
      dosage: "",
      patientId: "PAT12345", // Example default patient ID
    },
    mode: "onChange",
  });

  const onSubmit = async (data: MedicationFormData) => {
    try {
      // isSubmitting is true here
      await submitMedicationToAPI(data);
      Alert.alert(
        "Success",
        "Medication submitted successfully for SpeedyMeds!"
      );
      reset(); // Reset form on successful submission
    } catch (apiError: any) {
      Alert.alert(
        "Submission Error",
        apiError.message || "An unexpected error occurred."
      );
      // Optionally, set form-level or field-level errors based on API response
      // setError('root.serverError', { type: 'custom', message: apiError.message });
      // setError('medicationName', { type: 'server', message: 'This medication is currently unavailable.'});
    }
    // isSubmitting becomes false after this function resolves or rejects
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.formContainer}>
          <Text style={styles.title}>Log New Medication (SpeedyMeds)</Text>

          <Controller
            control={control}
            name="medicationName"
            rules={{
              required: "Medication name is required.",
              minLength: { value: 3, message: "Minimum 3 characters" },
            }}
            render={({
              field: { onChange, onBlur, value },
              fieldState: { error },
            }) => (
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Medication Name:</Text>
                <TextInput
                  style={[styles.input, error ? styles.inputError : null]}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  placeholder="e.g., Lisinopril"
                  editable={!isSubmitting} // Disable input while submitting
                />
                {error && <Text style={styles.errorText}>{error.message}</Text>}
              </View>
            )}
          />

          <Controller
            control={control}
            name="dosage"
            rules={{ required: "Dosage is required." }}
            render={({
              field: { onChange, onBlur, value },
              fieldState: { error },
            }) => (
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Dosage:</Text>
                <TextInput
                  style={[styles.input, error ? styles.inputError : null]}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  placeholder="e.g., 10mg, 1 tablet"
                  editable={!isSubmitting}
                />
                {error && <Text style={styles.errorText}>{error.message}</Text>}
              </View>
            )}
          />

          <Controller
            control={control}
            name="patientId"
            rules={{ required: "Patient ID is required." }}
            render={({
              field: { onChange, onBlur, value },
              fieldState: { error },
            }) => (
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Patient ID:</Text>
                <TextInput
                  style={[styles.input, error ? styles.inputError : null]}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  placeholder="e.g., PAT12345"
                  editable={!isSubmitting}
                />
                {error && <Text style={styles.errorText}>{error.message}</Text>}
              </View>
            )}
          />

          <View style={styles.buttonContainer}>
            {isSubmitting ? (
              <ActivityIndicator size="large" color="#1e88e5" />
            ) : (
              <Button
                title="Submit Medication"
                onPress={handleSubmit(onSubmit)}
                disabled={!isValid || isSubmitting}
                color="#1e88e5" // A nice blue color
              />
            )}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#eceff1", // Light grey background
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    paddingVertical: 20, // Add vertical padding for scroll view
    paddingHorizontal: 16,
  },
  formContainer: {
    backgroundColor: "#ffffff",
    padding: 25,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#37474f", // Dark grey title
    textAlign: "center",
    marginBottom: 25,
  },
  inputGroup: {
    marginBottom: 18,
  },
  label: {
    fontSize: 15,
    color: "#455a64", // Medium grey label
    marginBottom: 7,
    fontWeight: "500",
  },
  input: {
    height: 50,
    borderColor: "#cfd8dc", // Lighter border
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    fontSize: 16,
    backgroundColor: "#fafafa",
  },
  inputError: {
    borderColor: "#ef5350", // Material error red
  },
  errorText: {
    color: "#ef5350",
    fontSize: 13,
    marginTop: 4,
  },
  buttonContainer: {
    marginTop: 20,
    minHeight: 50, // Ensure space for ActivityIndicator
    justifyContent: "center",
  },
});

export default AsyncSubmitRHFScreen;
```

**Explanation of the Asynchronous Example:**

1.  **`submitMedicationToAPI` Function:** A mock function that returns a `Promise` to simulate an API call with a 2-second delay. It randomly resolves or rejects to mimic real-world scenarios.
2.  **`isSubmitting` State:** Destructured from `formState`. It's used to:
    - Show an `ActivityIndicator` instead of the submit button while the submission is in progress.
    - Disable the submit button (`disabled={!isValid || isSubmitting}`).
    - Optionally disable input fields (`editable={!isSubmitting}`) to prevent changes during submission.
3.  **`onSubmit` as an `async` Function:**
    - The `await submitMedicationToAPI(data)` call will pause execution until the promise resolves or rejects.
    - A `try...catch` block handles potential errors from the API call.
    - `Alert` messages notify the user of success or failure.
    - `reset()` is called on successful submission.
4.  **Error Handling with `setError` (Commented Out):**
    - The example includes commented-out lines showing how you might use `setError` (from `useForm`) to display API-specific errors directly in your form, either as general form errors (`root.serverError`) or tied to specific fields.
      - `setError('root.serverError', { type: 'custom', message: 'Server communication failed.' });`
      - `setError('fieldName', { type: 'server', message: 'This value is already taken.' });`
    - Displaying these `root` errors would typically involve checking `errors.root?.serverError?.message` in your JSX.

> [!TIP]
> Always provide feedback to the user during asynchronous operations. Using `isSubmitting` to show loading indicators and disable buttons significantly improves the user experience by clearly communicating that an action is in progress.

Effectively handling form submissions, including managing loading states and potential errors from asynchronous operations, is key to creating professional and user-friendly forms. React Hook Form provides the necessary tools to manage this complexity cleanly.
