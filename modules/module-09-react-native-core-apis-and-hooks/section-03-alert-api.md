## Section 3: Alert API

Communicating important information or prompting users for confirmation are common tasks in mobile applications. React Native's `Alert` API provides a simple way to display standard native alert dialogs with a title, message, and buttons.

### Conceptual Content

The `Alert` API allows you to present a native alert modal to the user. These alerts are platform-standard, meaning they will look and feel like typical alerts on iOS and Android. This is useful for:

- **Notifying Users:** Informing users about important events, errors, or successful operations (e.g., "Medication refill request submitted successfully!").
- **Confirming Actions:** Asking users to confirm potentially destructive or critical actions (e.g., "Are you sure you want to remove this medication from your list?").
- **Simple Prompts:** On iOS, you can also use alerts to prompt users for simple text input (though this is less common and often better handled with custom modal components for more complex input).

Alerts are modal, meaning they block interaction with the rest of the application until dismissed by the user.

### Referential Content

The primary method for the `Alert` API is:

- **`Alert.alert(title, message?, buttons?, options?)`**
  - **`title` (string):** The title of the alert. Required.
  - **`message` (string, optional):** An optional descriptive message below the title.
  - **`buttons` (AlertButton[], optional):** An array of button configuration objects. If not provided, a default "OK" button is shown. Each `AlertButton` object can have:
    - `text` (string): The label for the button.
    - `onPress` (function, optional): A callback function executed when the button is pressed.
    - `style` ('default', 'cancel', 'destructive', optional): Defines the button's style.
      - `'default'`: Standard button style.
      - `'cancel'`: Typically used for a cancel action. On iOS, this button might be styled differently or placed separately.
      - `'destructive'`: Indicates an action that could lead to data loss or a significant change. Often styled in red on iOS.
  - **`options` (object, optional):** An object with additional options:
    - `cancelable` (boolean, optional): If `true` (Android only), the alert can be dismissed by tapping outside of it. Default is `true`.
    - `onDismiss` (function, optional): A callback executed when the alert is dismissed (e.g., by tapping outside on Android if `cancelable` is true, or by pressing the hardware back button).
    - `userInterfaceStyle` ('light' | 'dark' | 'automatic', optional): (iOS 13+ only) Sets the interface style for the alert. Defaults to `'automatic'`.

**Button Order and Limits:**

- On iOS, you can have an unlimited number of buttons.
- On Android, you can have at most three buttons. If you provide more, only the first three will be displayed according to these rules:
  1. A "neutral" button (if one is specified as `style: 'default'` or no style).
  2. A "negative" button (if one is specified as `style: 'cancel'` or `style: 'destructive'`).
  3. A "positive" button (if one is specified as `style: 'default'` or no style, and it's the primary action).
     It's generally best to stick to 1-3 buttons for cross-platform consistency.

> 📚 **Official Documentation:**
>
> - [React Native Docs: `Alert`](https://reactnative.dev/docs/alert)

### Procedural Content

Let's see how to use the `Alert` API in the SpeedyMeds application.

**1. Displaying a Simple Information Alert**

This example shows a basic alert to inform the user that their medication reminder has been set.

```tsx
import React from "react";
import { View, Button, StyleSheet, Alert } from "react-native";

const SetReminderButton: React.FC = () => {
  const handleSetReminder = () => {
    // Logic to actually set a medication reminder would go here
    Alert.alert(
      "Reminder Set",
      "Your reminder for Aspirin 100mg has been successfully set.",
      [{ text: "OK" }]
    );
  };

  return (
    <View style={styles.container}>
      <Button title="Set Medication Reminder" onPress={handleSetReminder} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: "center",
  },
});

export default SetReminderButton;
```

This code displays a simple alert with a title, message, and a single "OK" button to dismiss it.

**2. Confirming an Action (e.g., Refilling a Prescription)**

This example demonstrates how to ask the user for confirmation before proceeding with a prescription refill.

```tsx
import React from "react";
import { View, Button, StyleSheet, Alert, Text } from "react-native";

interface RefillPrescriptionProps {
  medicationName: string;
}

const RefillPrescriptionButton: React.FC<RefillPrescriptionProps> = ({
  medicationName,
}) => {
  const [status, setStatus] = React.useState<string>("");

  const handleRefill = () => {
    Alert.alert(
      "Confirm Refill",
      `Are you sure you want to request a refill for ${medicationName}?`,
      [
        {
          text: "Cancel",
          onPress: () => setStatus("Refill canceled."),
          style: "cancel",
        },
        {
          text: "Yes, Refill",
          onPress: () => {
            // Actual refill logic would go here
            console.log(`Refilling ${medicationName}...`);
            setStatus(`${medicationName} refill requested!`);
          },
          style: "default", // Could also be 'destructive' if it has irreversible consequences
        },
      ],
      { cancelable: false } // User must explicitly choose an option
    );
  };

  return (
    <View style={styles.container}>
      <Button
        title={`Request Refill for ${medicationName}`}
        onPress={handleRefill}
      />
      {status ? <Text style={styles.statusText}>{status}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: "center",
  },
  statusText: {
    marginTop: 10,
    fontSize: 14,
    color: "green",
  },
});

export default RefillPrescriptionButton;
```

In this `RefillPrescriptionButton` component, pressing the button triggers an alert with "Cancel" and "Yes, Refill" options. The `onPress` callbacks for each button handle the respective actions (e.g., simulating a refill request). Setting `cancelable: false` ensures the user actively chooses an option rather than dismissing the alert by tapping outside.

**3. Using a Destructive Action Button**

If an action is destructive, like deleting a medication entry, you should indicate this.

```tsx
import React from "react";
import { View, Button, StyleSheet, Alert, Text } from "react-native";

interface DeleteMedicationProps {
  medicationId: string;
  medicationName: string;
  onDelete: (id: string) => void; // Callback after deletion
}

const DeleteMedicationButton: React.FC<DeleteMedicationProps> = ({
  medicationId,
  medicationName,
  onDelete,
}) => {
  const handleDelete = () => {
    Alert.alert(
      "Delete Medication",
      `Are you sure you want to delete ${medicationName}? This action cannot be undone.`,
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          onPress: () => {
            console.log(`Deleting ${medicationName} (ID: ${medicationId})`);
            // Actual deletion logic
            onDelete(medicationId);
          },
          style: "destructive", // This will typically render the button text in red on iOS
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Button
        title={`Delete ${medicationName}`}
        onPress={handleDelete}
        color="red"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    alignItems: "center",
  },
});

export default DeleteMedicationButton;
```

Here, the "Delete" button has `style: 'destructive'`. On iOS, this usually renders the button text in red, clearly signaling a potentially dangerous action to the user.

### Background Bridge Notes

> 📲 **(Native Developers):**
>
> **Comparison:** In iOS, this is very similar to using `UIAlertController` with different `UIAlertAction` styles (`.default`, `.cancel`, `.destructive`). On Android, it's akin to using `AlertDialog.Builder` to create and show dialogs with positive, negative, and neutral buttons.
>
> **Key Takeaway:** React Native's `Alert` API provides a cross-platform abstraction over these native alert components, simplifying their usage from JavaScript.
>
> **Source:** [UIAlertController (Apple Docs)](https://developer.apple.com/documentation/uikit/uialertcontroller), [Dialogs (Android Docs)](https://developer.android.com/guide/topics/ui/dialogs)

> 🌐 **(Web Developers):**
>
> **Comparison:** The closest web equivalents are `window.alert()`, `window.confirm()`, and `window.prompt()`. However, these are very basic, often considered intrusive, and cannot be styled or customized as much as native alerts.
>
> **Key Takeaway:** React Native's `Alert` API provides access to the richer, more user-friendly native alert system of mobile platforms, offering a better user experience than standard browser dialogs.

### Exercise

Practice using the `Alert` API to provide feedback in a user interaction scenario.

- **Exercise 9.1: Using the Alert API**
  - **Objective:** Create a button that, when pressed, simulates submitting a patient feedback form for the SpeedyMeds app and then displays an alert confirming the submission.
  - **Instructions:** Modify a simple component to include a "Submit Feedback" button. On press, show an alert with the title "Feedback Submitted" and a message like "Thank you for your feedback on the SpeedyMeds app!". The alert should have a single "Dismiss" button.
  - **Tool:** [**(https://snack.expo.dev/)**](https://snack.expo.dev/) (A new Snack will need to be created for this exercise).
