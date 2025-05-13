## Section 8: Using React Native Paper Components

Now that we've introduced React Native Paper and completed the basic setup, let's explore how to use some of its common components to build UIs for our SpeedyMeds application. React Native Paper offers a rich set of pre-styled Material Design components that can significantly speed up your development process.

We'll cover examples of `Appbar`, `Button`, `TextInput`, and `Card` components. Remember to wrap your root component with `<PaperProvider>` as shown in the previous section for these components to render correctly with the default theme.

### `Appbar` for Headers

The `Appbar` component is used to create top application bars, often containing a title, navigation actions (like a back button), and other actions.

```tsx
import React from "react";
import { Appbar } from "react-native-paper";
import { Platform } from "react-native";

// Example Appbar for a SpeedyMeds screen
interface SpeedyMedsAppbarProps {
  title: string;
  showBackButton?: boolean;
  onBackPress?: () => void;
  onMorePress?: () => void;
}

const SpeedyMedsAppbar: React.FC<SpeedyMedsAppbarProps> = ({
  title,
  showBackButton,
  onBackPress,
  onMorePress,
}) => {
  const MORE_ICON = Platform.OS === "ios" ? "dots-horizontal" : "dots-vertical";

  return (
    <Appbar.Header>
      {showBackButton && <Appbar.BackAction onPress={onBackPress} />}
      <Appbar.Content title={title} />
      {onMorePress && <Appbar.Action icon={MORE_ICON} onPress={onMorePress} />}
      <Appbar.Action
        icon="magnify"
        onPress={() => console.log("Search pressed")}
      />
    </Appbar.Header>
  );
};

// How you might use it in a screen:
// const PatientDetailsScreen = ({ navigation }) => (
//   <>
//     <SpeedyMedsAppbar
//       title="Patient Details"
//       showBackButton
//       onBackPress={() => navigation.goBack()}
//       onMorePress={() => console.log('More options')}
//     />
//     {/* Screen content goes here */}
//   </>
// );

export default SpeedyMedsAppbar;
```

**Explanation:**

- `Appbar.Header`: The main container for the app bar.
- `Appbar.BackAction`: A standard back button icon and action.
- `Appbar.Content`: Used to display the title of the app bar.
- `Appbar.Action`: Used for displaying icon buttons for actions. We use a platform-specific icon for "more options".

### `Button` for Actions

React Native Paper provides versatile `Button` components with different modes (`text`, `outlined`, `contained`).

```tsx
import React from "react";
import { View, StyleSheet } from "react-native";
import { Button, Text } from "react-native-paper";

// Example Buttons for a SpeedyMeds form
const PrescriptionActions = () => {
  return (
    <View style={styles.container}>
      <Button
        icon="pill"
        mode="contained"
        onPress={() => console.log("Refill requested")}
        style={styles.button}
      >
        Request Refill
      </Button>
      <Button
        icon="information-outline"
        mode="outlined"
        onPress={() => console.log("View details")}
        style={styles.button}
      >
        View Details
      </Button>
      <Button
        mode="text"
        onPress={() => console.log("Action cancelled")}
        textColor="#6c757d" // Custom text color for text button
        style={styles.button}
      >
        Cancel
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    alignItems: "center", // Center buttons for this example
  },
  button: {
    marginVertical: 8,
    width: "80%", // Example width
  },
});

export default PrescriptionActions;
```

**Explanation:**

- `mode="contained"`: A filled button, typically for primary actions.
- `mode="outlined"`: A button with a border and no fill, for secondary actions.
- `mode="text"`: A flat button with no border or fill, often for less prominent actions.
- `icon` prop can take the name of any Material Community Icon.
- `style` prop can be used to apply additional custom styles.

### `TextInput` for User Input

Paper's `TextInput` offers Material Design styling for input fields, including labels that float, helper text, and error states.

```tsx
import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { TextInput, HelperText } from "react-native-paper";

// Example TextInput for a SpeedyMeds patient search
const PatientSearchInput = () => {
  const [patientId, setPatientId] = useState("");
  const [error, setError] = useState(false);

  const handleIdChange = (text: string) => {
    setPatientId(text);
    if (text.length > 0 && text.length < 5) {
      setError(true);
    } else {
      setError(false);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        label="Patient ID"
        value={patientId}
        onChangeText={handleIdChange}
        mode="outlined" // Can also be 'flat'
        keyboardType="numeric"
        left={<TextInput.Icon icon="account-search" />}
        error={error}
        style={styles.input}
      />
      <HelperText type="error" visible={error}>
        Patient ID must be at least 5 digits.
      </HelperText>
      <TextInput
        label="Medication Name"
        mode="outlined"
        left={<TextInput.Icon icon="pill" />}
        right={
          <TextInput.Icon
            icon="magnify"
            onPress={() => console.log("Search medication")}
          />
        }
        placeholder="e.g., Atorvastatin"
        style={styles.input}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  input: {
    marginBottom: 10,
  },
});

export default PatientSearchInput;
```

**Explanation:**

- `label`: The floating label for the input.
- `mode="outlined"`: Provides an outlined style for the input field.
- `left` and `right` props can take `TextInput.Icon` to add icons inside the input field.
- `error` prop highlights the input if there's an error.
- `HelperText` component can be used to display messages below the input, including error messages.

### `Card` for Displaying Content Sections

`Card` components are used to group related information in a visually distinct container, often with elevation/shadow.

```tsx
import React from "react";
import { View, StyleSheet } from "react-native";
import { Avatar, Button, Card, Text, Divider } from "react-native-paper";

// Example Card for displaying prescription details in SpeedyMeds
interface PrescriptionDetailCardProps {
  medicationName: string;
  dosage: string;
  refillsRemaining: number;
  pharmacist: string;
}

const LeftContent = (props: any) => <Avatar.Icon {...props} icon="pill" />;

const PrescriptionDetailCard: React.FC<PrescriptionDetailCardProps> = ({
  medicationName,
  dosage,
  refillsRemaining,
  pharmacist,
}) => {
  return (
    <Card style={styles.card}>
      <Card.Title
        title={medicationName}
        subtitle={`Dosage: ${dosage}`}
        left={LeftContent}
      />
      <Card.Content>
        <Text variant="bodyMedium">Refills Remaining: {refillsRemaining}</Text>
        <Divider style={styles.divider} />
        <Text variant="bodySmall">Pharmacist: {pharmacist}</Text>
      </Card.Content>
      <Card.Actions>
        <Button onPress={() => console.log("Close details")}>Close</Button>
        <Button
          mode="contained"
          onPress={() => console.log("Request refill for", medicationName)}
        >
          Request Refill
        </Button>
      </Card.Actions>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    margin: 16,
  },
  divider: {
    marginVertical: 8,
  },
});

// How you might use it
// const MedicationInfoScreen = () => (
//   <View>
//     <PrescriptionDetailCard
//       medicationName="Lisinopril 10mg"
//       dosage="1 tablet daily"
//       refillsRemaining={2}
//       pharmacist="Dr. Emily Carter"
//     />
//   </View>
// );

export default PrescriptionDetailCard;
```

**Explanation:**

- `Card`: The main container.
- `Card.Title`: Displays a title, subtitle, and can include `left` or `right` elements (like an `Avatar.Icon`).
- `Card.Content`: For the main body of the card.
- `Card.Cover`: (Not used here) For displaying an image at the top of the card.
- `Card.Actions`: A container for action buttons at the bottom of the card.
- `Text` with `variant` prop can be used to quickly apply Material Design type scale styles.

These examples showcase just a few of the many components available in React Native Paper. By combining these components, you can build complex and visually appealing UIs for SpeedyMeds with relative ease.

> [!TIP]
> Explore the official React Native Paper documentation to discover the full range of components and their props. Each component often has many customization options.

### Exercise 10.3: Implementing UI with Paper Components

Time to get hands-on with React Native Paper. This exercise involves building a screen for the SpeedyMeds app using various Paper components.

**Objective:** Create a settings screen for the SpeedyMeds app using `Appbar`, `List.Item` (or `Card`), `Switch`, and `Button` components from React Native Paper.

**(https://snack.expo.dev/@course-materials/module-10-exercise-10.3)**

_Instructions and requirements for the exercise are provided within the Expo Snack linked above._

Next, we'll learn how to customize the look and feel of these React Native Paper components using its theming system.

📚 **Official Documentation:**

- [React Native Paper: Components (Browse all)](https://callstack.github.io/react-native-paper/docs/components/ActivityIndicator)
- [React Native Paper: Appbar](https://callstack.github.io/react-native-paper/docs/components/Appbar)
- [React Native Paper: Button](https://callstack.github.io/react-native-paper/docs/components/Button)
- [React Native Paper: TextInput](https://callstack.github.io/react-native-paper/docs/components/TextInput)
- [React Native Paper: Card](https://callstack.github.io/react-native-paper/docs/components/Card)
