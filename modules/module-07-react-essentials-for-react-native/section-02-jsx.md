## Section 2: JSX (Syntax, Embedding Expressions, Attributes)

In the previous section, we learned that React uses a declarative, component-based approach to building UIs. Now, let's explore **JSX**, the syntax that makes writing React components intuitive and expressive. JSX stands for JavaScript XML, and it allows you to write HTML-like (or XML-like) markup directly within your JavaScript code.

While you _can_ write React without JSX, using it is highly recommended and is the standard practice. It makes your component code more readable and easier to visualize the UI structure it represents.

### What is JSX?

At its core, JSX is a syntactic sugar for `React.createElement(component, props, ...children)`. When your JavaScript code containing JSX is compiled (typically by a tool like Babel, which is integrated into Expo and Create React App), the JSX expressions are transformed into regular JavaScript function calls.

For example, this JSX:

```tsx
const greetingElement = <Text>Hello, SpeedyMeds User!</Text>;
```

gets compiled into something like this JavaScript:

```javascript
const greetingElement = React.createElement(
  Text,
  null,
  "Hello, SpeedyMeds User!"
);
```

(Note: In React Native, `Text` would be `'Text'` or the actual `Text` component imported from `react-native`.)

Using JSX makes the code look much cleaner and more like the UI it describes.

> 💡 **TIP:** Since JSX is not standard JavaScript, browsers (or the JavaScript engine in React Native) don't understand it directly. A build step involving a transpiler like Babel is necessary to convert JSX into valid JavaScript code.

### Basic JSX Syntax Rules

1.  **Return a Single Root Element:** A functional component or a JSX expression must return a single root element. If you need to return multiple elements, you must wrap them in a single parent tag, like a `<View>` in React Native, or use a React Fragment (`<>...</>`).

    ```tsx
    // Correct: Single root <View>
    const MedicationReminder = () => {
      return (
        <View>
          <Text>Advil</Text>
          <Text>Take 2 pills at 8:00 AM</Text>
        </View>
      );
    };

    // Correct: Using a Fragment
    const MedicationDetails = () => {
      return (
        <>
          <Text>Paracetamol</Text>
          <Text>500mg</Text>
        </>
      );
    };

    // Incorrect: Multiple root elements (will cause an error)
    // const BadReminder = () => {
    //   return (
    //     <Text>Aspirin</Text>
    //     <Text>Take 1 pill with water</Text>
    //   );
    // };
    ```

2.  **Use CamelCase for Attributes/Props:** HTML attributes like `class` or `onclick` have JavaScript equivalents in JSX that use camelCase. For example, `class` becomes `className` (though this is more relevant for web React; React Native uses `style` prop for styling). Event handlers like `onclick` become `onPress` in React Native.

    ```tsx
    // For web React (example)
    // const webElement = <div className="my-class">Content</div>;

    // For React Native (style prop)
    // We'll cover styling and props in detail later.
    const styledText = <Text style={{ color: "blue" }}>Blue Text</Text>;
    ```

3.  **Close All Tags:** JSX tags must always be closed. Self-closing tags (like `<Image />`) must end with `/>`. Tags that have content must have a corresponding closing tag (e.g., `<Text>Hello</Text>`).

    ```tsx
    const UserProfile = () => {
      return (
        <View>
          <Image source={{ uri: "https://example.com/user.png" }} />
          {/* Image is self-closing */}
          <Text>User Name</Text>
          {/* Text has an opening and closing tag */}
        </View>
      );
    };
    ```

### Embedding JavaScript Expressions in JSX

You can embed any valid JavaScript expression within JSX by wrapping it in curly braces `{}`.

```tsx
const MedicationDisplay = () => {
  const medicationName: string = "Amoxicillin";
  const dosage: number = 250;
  const unit: string = "mg";
  const instructions: string = "Take one tablet every 8 hours.";

  return (
    <View>
      <Text>Medication: {medicationName}</Text>
      <Text>
        Dosage: {dosage} {unit}
      </Text>
      <Text>Instructions: {instructions.toUpperCase()}</Text>
      <Text>Next Dose in: {4 + 4} hours</Text>
    </View>
  );
};
```

In this example:

- `{medicationName}`, `{dosage}`, and `{unit}` embed variable values.
- `{instructions.toUpperCase()}` calls a JavaScript string method.
- `{4 + 4}` evaluates an arithmetic expression.

> ⚠️ **CAUTION:** You cannot embed JavaScript _statements_ (like `if` statements or `for` loops) directly within JSX curly braces. You can use expressions that evaluate to values, such as ternary operators or function calls that return JSX.

### JSX Attributes (Props)

JSX elements can have attributes, just like HTML elements. In React, these attributes are called **props** (short for properties). We'll cover props in detail in a later section, but here's a quick look:

```tsx
// Assume MyCustomButton is a component that accepts a 'title' prop
const ActionButton = () => {
  return <MyCustomButton title="Submit Order" />;
};

// For built-in components like Image
const MedicationImage = () => {
  const imageUrl = "https://example.com/aspirin.png";
  return <Image source={{ uri: imageUrl }} style={{ width: 50, height: 50 }} />;
};
```

- `title="Submit Order"`: Here, `title` is a prop passed to `MyCustomButton`. String literals are passed in quotes.
- `source={{ uri: imageUrl }}`: Here, `source` is a prop. The value `{ uri: imageUrl }` is a JavaScript object, so it's wrapped in curly braces. The outer curly braces signify an embedded JavaScript expression, and the inner ones define the object literal.
- `style={{ width: 50, height: 50 }}`: The `style` prop in React Native also takes a JavaScript object.

If an attribute value is a JavaScript expression (like a variable or an object), it MUST be wrapped in curly braces `{}`. If it's a string literal, quotes are used.

### Comments in JSX

To add comments within JSX, you need to wrap them in curly braces and then use JavaScript comment syntax:

```tsx
const ReminderCard = () => {
  const patientName = "Jane Doe";

  return (
    <View>
      {/* This is a comment inside JSX about the patient */}
      <Text>Patient: {patientName}</Text>
      <Text>
        {/* Multi-line comments work too,
            as long as they are within the curly braces
            and follow JS comment syntax. */}
        Remember to take your medication.
      </Text>
    </View>
  );
};
```

JSX is a powerful feature that blends the expressiveness of HTML/XML with the full capabilities of JavaScript. It makes defining complex UI structures more manageable and readable. As you continue through this module, you'll become increasingly comfortable with reading and writing JSX.

> 📚 **Official Documentation:**
>
> - [React Docs - Introducing JSX](https://react.dev/learn/writing-markup-with-jsx)
> - [React Docs - JavaScript in JSX with Curly Braces](https://react.dev/learn/javascript-in-jsx-with-curly-braces)
