## Section 11: Typing Events and Styles in React Native

TypeScript enhances React Native development not only for component props and state but also for handling user interactions (events) and defining component appearances (styles). This section explores how to apply TypeScript to event handlers and `StyleSheet` definitions for more robust and maintainable code.

### Conceptual Content: Ensuring Clarity in Interactions and Appearance

#### Typing Event Handlers

React Native components emit various events in response to user interactions (e.g., button presses, text input changes, gestures). TypeScript allows you to strongly type the event objects and handler functions, preventing common errors related to event structures and expected parameters.

**Key React Native Event Types:**

React Native provides specific event types for different interactions. Some common ones include:

- `GestureResponderEvent`: For touch events from components like `TouchableOpacity`, `Pressable`, `View` (with press handlers).
- `NativeSyntheticEvent<T>`: A generic wrapper for many native platform events. `T` represents the specific event data payload, e.g.:
  - `TextInputChangeEventData` for `TextInput`'s `onChange` event.
  - `ImageLoadEventData` for `Image`'s `onLoad` event.
- Direct value types: Some component callbacks provide direct values instead of event objects (e.g., `TextInput`'s `onChangeText` provides a `string`).

**Benefits of Typing Event Handlers:**

- **Correct Event Properties:** Prevents attempts to access properties that don't exist on a specific event type (e.g., accessing web-specific `event.target.value` on a React Native event).
- **Accurate Handler Signatures:** Ensures your callback functions expect the correct type of event object or parameters.
- **Improved IDE Support:** Autocompletion for event properties and handler parameters.

A short, self-contained example of typing event handlers:

```tsx
import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  GestureResponderEvent, // For touch events
  NativeSyntheticEvent, // Generic native event wrapper
  TextInputChangeEventData, // Specific payload for TextInput onChange
} from "react-native";

// Props for a custom button component
interface CustomButtonProps {
  label: string;
  onCustomPress: (event: GestureResponderEvent, label: string) => void;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  label,
  onCustomPress,
}) => {
  // Event transformation: Pass the original event and additional data
  const handlePress = (event: GestureResponderEvent) => {
    onCustomPress(event, label);
  };

  return (
    <TouchableOpacity onPress={handlePress} style={styles.button}>
      <Text style={styles.buttonText}>{label}</Text>
    </TouchableOpacity>
  );
};

export default function EventDemoScreen() {
  const [inputValue, setInputValue] = useState("");
  const [changeEventCount, setChangeEventCount] = useState(0);

  // Handler for CustomButton
  const handleButtonInteraction = (
    event: GestureResponderEvent,
    label: string
  ) => {
    console.log(`Button '${label}' pressed.`);
    // Accessing nativeEvent properties safely
    console.log(
      `Touch location X: ${event.nativeEvent.locationX}, Y: ${event.nativeEvent.locationY}`
    );
  };

  // Handler for TextInput's onChangeText (receives text directly)
  const handleTextDirectly = (text: string) => {
    setInputValue(text);
  };

  // Handler for TextInput's onChange (receives a NativeSyntheticEvent)
  const handleTextInputChange = (
    event: NativeSyntheticEvent<TextInputChangeEventData>
  ) => {
    // Accessing nativeEvent.text for the actual input value
    console.log("TextInput onChange event text:", event.nativeEvent.text);
    setChangeEventCount((prev) => prev + 1);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Type something..."
        value={inputValue} // Controlled component
        onChangeText={handleTextDirectly} // Preferred for getting text
        onChange={handleTextInputChange} // Receives full event object
      />
      <Text>Input Value: {inputValue}</Text>
      <Text>onChange events triggered: {changeEventCount}</Text>

      <CustomButton label="Action A" onCustomPress={handleButtonInteraction} />
      <CustomButton label="Action B" onCustomPress={handleButtonInteraction} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 20,
    fontSize: 16,
  },
  button: {
    backgroundColor: "#007AFF",
    padding: 12,
    borderRadius: 5,
    alignItems: "center",
    marginBottom: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "500",
  },
});
```

> In this SpeedyMeds-related scenario, `CustomButtonProps` defines `onCustomPress` expecting a `GestureResponderEvent` and a `string`.
> The `EventDemoScreen` demonstrates:
>
> - Handling `GestureResponderEvent` from `CustomButton`, where `event.nativeEvent.locationX` can be safely accessed because TypeScript knows its type.
> - Using `onChangeText` with `TextInput`, which directly provides the `text: string`.
> - Using `onChange` with `TextInput`, which provides a `NativeSyntheticEvent<TextInputChangeEventData>`, from which `event.nativeEvent.text` is accessed.
>
> TypeScript ensures these handlers are used correctly, preventing runtime errors from trying to access non-existent properties or passing incorrect arguments.

#### Typing Styles with `StyleSheet.create`

React Native uses JavaScript to define styles. TypeScript can provide type safety for these style objects, ensuring you use valid style properties and appropriate types for their values. Incorrect style properties in React Native often lead to runtime errors rather than being silently ignored (as in web CSS).

React Native exports specific style types for different components:

- `ViewStyle`: For `<View>` components and general layout.
- `TextStyle`: For `<Text>` components (extends `ViewStyle` and adds text-specific properties like `color`, `fontSize`, `fontWeight`).
- `ImageStyle`: For `<Image>` components (extends `ViewStyle` and adds image-specific properties like `resizeMode`).

**Benefits of Typing Styles:**

- **Validation of Style Properties:** Catches typos or use of non-existent style properties at compile time.
- **Correct Property Values:** Ensures values assigned to style properties match their expected types (e.g., a number for `fontSize`, a string for `color`).
- **IDE Autocompletion:** Provides suggestions for valid style properties.

**Using `StyleSheet.create`:**

While you can define style objects directly, `StyleSheet.create` is recommended because it can optimize styles by sending them to the native side only once. TypeScript infers the types within `StyleSheet.create` quite well. You can also explicitly type the entire styles object for even greater clarity if needed.

A short, self-contained example of typing styles:

```tsx
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ViewStyle,
  TextStyle,
  ImageStyle,
} from "react-native";

// Optional: Define an interface for the entire styles object for maximum explicitness
interface MedicationCardStyles {
  cardContainer: ViewStyle;
  imageContainer: ViewStyle;
  medicationImage: ImageStyle;
  infoContainer: ViewStyle;
  nameText: TextStyle;
  dosageText: TextStyle;
  statusIndicator: ViewStyle;
}

const styles = StyleSheet.create<MedicationCardStyles>({
  cardContainer: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 16,
    marginVertical: 8,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3, // for Android
    // borderWidth: 'thin' // Error: Type 'string' is not assignable to type 'number | undefined'.
  },
  imageContainer: {
    marginRight: 16,
  },
  medicationImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    // resizeMode: 'contain' // Valid ImageStyle property
  },
  infoContainer: {
    flex: 1,
  },
  nameText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    // flex: 1, // Error: 'flex' does not exist in type 'TextStyle'. (It exists in ViewStyle)
  },
  dosageText: {
    fontSize: 14,
    color: "#666",
    marginTop: 4,
  },
  statusIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginLeft: "auto", // Pushes to the right in a flex container
  },
});

interface MedicationCardProps {
  name: string;
  dosage: string;
  imageUrl?: string;
  isInStock: boolean;
}

const MedicationCard: React.FC<MedicationCardProps> = ({
  name,
  dosage,
  imageUrl,
  isInStock,
}) => {
  const stockIndicatorColor = isInStock ? "green" : "red";

  // Conditional styling with TypeScript
  const dynamicStatusStyle: ViewStyle = {
    ...styles.statusIndicator,
    backgroundColor: stockIndicatorColor,
  };

  return (
    <View style={styles.cardContainer}>
      <View style={styles.imageContainer}>
        <Image
          source={
            imageUrl
              ? { uri: imageUrl }
              : require("./assets/default-med-icon.png")
          } // Assuming a local default asset
          style={styles.medicationImage}
        />
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.nameText}>{name}</Text>
        <Text style={styles.dosageText}>{dosage}</Text>
      </View>
      <View style={dynamicStatusStyle} />
    </View>
  );
};

export default function MedicationDashboard() {
  return (
    <View style={{ flex: 1, padding: 10, backgroundColor: "#f5f5f5" }}>
      <MedicationCard
        name="Aspirin"
        dosage="100mg"
        isInStock={true}
        imageUrl="https://example.com/aspirin.png"
      />
      <MedicationCard name="Lisinopril" dosage="10mg" isInStock={false} />
      {/* For this example to run, create a placeholder ./assets/default-med-icon.png */}
    </View>
  );
}

// To make the example runnable, create a dummy assets folder and default-med-icon.png file
// or remove the Image component / provide a valid URI for imageUrl.
```

> In this SpeedyMeds `MedicationCard` example:
>
> - The `MedicationCardStyles` interface explicitly types each key in our `styles` object with `ViewStyle`, `TextStyle`, or `ImageStyle`.
> - When `StyleSheet.create<MedicationCardStyles>({...})` is used, TypeScript validates that each style object (`cardContainer`, `nameText`, etc.) conforms to its specified type.
> - The commented-out errors show examples of what TypeScript would catch: assigning a string to `borderWidth` (expects a number), or trying to use `flex` (a `ViewStyle` property) within `nameText` (a `TextStyle`).
> - The `dynamicStatusStyle` demonstrates how to create dynamic styles while still maintaining type safety by explicitly typing the `dynamicStatusStyle` variable as `ViewStyle`.
>
> This rigorous type checking for styles helps prevent visual bugs and runtime errors, making your UI code more predictable.

> 📚 **Official Documentation & Resources:**
>
> - [React Native Docs: StyleSheet](https://reactnative.dev/docs/stylesheet)
> - [React Native Docs: View Style Props](https://reactnative.dev/docs/view-style-props)
> - [React Native Docs: Text Style Props](https://reactnative.dev/docs/text-style-props)
> - [React Native Docs: Image Style Props](https://reactnative.dev/docs/image-style-props)
> - [TypeScript Cheatsheets for React (Events section is relevant)](https://github.com/typescript-cheatsheets/react#events)

---
