## Section 2: JSX (Syntax, Embedding Expressions, Attributes)

This section introduces JSX, a syntax extension for JavaScript that you'll use extensively in React and React Native to describe what your UI should look like. We'll cover its basic syntax, how to embed JavaScript expressions, and how to specify attributes (similar to HTML attributes).

### What is JSX?

JSX stands for JavaScript XML. It allows you to write HTML-like (or XML-like) structures directly within your JavaScript code. While it might look like a template language, JSX is actually transformed (transpiled) into regular JavaScript function calls by tools like Babel. Specifically, JSX elements become `React.createElement()` calls.

For example, this JSX code:

```tsx
const element = <Text>Hello, SpeedyMeds User!</Text>;
```

Is essentially transformed into something like this:

```javascript
const element = React.createElement(Text, null, "Hello, SpeedyMeds User!");
```

Using JSX makes your React code more readable and easier to visualize the UI structure you're building. In React Native, you'll use JSX to define the hierarchy of your native UI components like `<View>`, `<Text>`, `<Image>`, etc.

### Basic JSX Syntax

- **Elements:** JSX elements look like HTML tags. They can be React Native Core Components (e.g., `<View>`), custom components you create (e.g., `<MedicationCard />`), or standard HTML tags if you were using React for the web (though these are not directly used in React Native UIs).
- **Closing Tags:** Every JSX tag must be closed, either with a self-closing tag (e.g., `<Image source={...} />`) or a corresponding closing tag (e.g., `<Text>Hello</Text>`).
- **Single Root Element:** A React component (or a JSX expression returned from a function) must return a single root JSX element. If you need to return multiple elements, you must wrap them in a single parent element, like a `<View>`, or use a React Fragment (`<>...</>`).

```tsx
// Correct: Single root element
const MyComponent = () => {
  return (
    <View>
      <Text>Medication Name</Text>
      <Text>Dosage: 1 tablet</Text>
    </View>
  );
};

// Correct: Using a Fragment
const AnotherComponent = () => {
  return (
    <>
      <Text>Patient Details</Text>
      <Text>Age: 42</Text>
    </>
  );
};

// Incorrect: Multiple root elements (will cause an error)
// const ErrorComponent = () => {
//   return (
//     <Text>Error Detail 1</Text>
//     <Text>Error Detail 2</Text>
//   );
// };
```

### Embedding JavaScript Expressions

You can embed any valid JavaScript expression within JSX by wrapping it in curly braces `{}`.

```tsx
const patientName: string = "Jane Doe";
const medicationCount: number = 3;

const PatientGreeting = () => {
  return (
    <View>
      <Text>Welcome, {patientName}!</Text>
      <Text>You have {medicationCount} pending prescriptions.</Text>
      <Text>Next refill in {2 * 3} days.</Text>
    </View>
  );
};
```

This includes variables, function calls, arithmetic operations, and more. However, you cannot use `if/else` statements directly within JSX curly braces. Instead, you'd use conditional (ternary) operators or helper functions, which we'll cover in "Conditional Rendering."

### JSX Attributes (Props)

JSX elements can have attributes, just like HTML. These attributes are passed to React components as `props` (properties).

- **String Literals:** Use quotes for string literal attributes:

  ```tsx
  <Text style={{ color: "blue" }}>Patient Alert</Text>
  ```

  Wait, that `style` example is more complex. A simpler string example:

  ```tsx
  <Image accessibilityLabel="Official SpeedyMeds Logo" />
  ```

- **JavaScript Expressions:** Use curly braces `{}` to embed JavaScript expressions as attribute values. This is very common for non-string values or dynamic content.

  ```tsx
  const logoImage = require('./assets/speedymeds-logo.png');
  const isUrgent: boolean = true;

  <Image source={logoImage} />
  <Text style={{ color: isUrgent ? 'red' : 'green' }}>
    {isUrgent ? "Urgent Medication" : "Standard Medication"}
  </Text>
  ```

- **CamelCase Naming:** JSX attribute names typically use camelCase (e.g., `accessibilityLabel`, `numberOfLines`). This is because they will become keys in a JavaScript `props` object.

- **Style Prop:** The `style` prop in React Native is special. It accepts a JavaScript object (or an array of objects) defining styles, not a string like in HTML. We'll dive deeper into styling later.
  ```tsx
  <View style={{ backgroundColor: "#f0f0f0", padding: 10 }}>
    <Text style={{ fontSize: 16, fontWeight: "bold" }}>Refill Details</Text>
  </View>
  ```

> 🌐 **(Web Developers - React/Angular/HTML):**
>
> **Comparison:** JSX closely resembles HTML but it's not HTML. Key differences include:
>
> - `className` instead of `class` (because `class` is a reserved keyword in JavaScript).
> - Style is an object (`style={{color: 'blue'}}`) not a string (`style="color: blue;"`).
> - All tags must be closed (e.g. `<img />` or `<br />`).
> - CamelCase for many attributes (e.g., `onClick` vs `onclick`).
>   In React Native, you won't use HTML tags like `div`, `p`, `img`. Instead, you use React Native Core Components like `<View>`, `<Text>`, `<Image>` which compile to native UI elements.
>
> **Key Takeaway:** While JSX syntax feels familiar if you know HTML, remember it's JavaScript. Pay attention to the differences in attribute naming (camelCase) and how specific attributes like `style` work. The elements themselves are specific to React Native, not standard HTML.

> 📲 **(Native Developers - Android/iOS):**
>
> **Comparison:** JSX is your way of defining UI layouts, similar to how you might use XML in Android or Storyboards/SwiftUI in iOS. Instead of writing XML tags or using a visual designer, you write these JavaScript-based tags. These JSX tags directly correspond to native UI components.
>
> **Key Takeaway:** Think of JSX as a structured, declarative way to define your UI hierarchy. The elements you use (`<View>`, `<Text>`, etc.) will be translated into their respective native counterparts on iOS and Android.

JSX is a powerful feature that makes writing React UIs intuitive. As you get more comfortable with it, you'll find it a natural way to express your UI structure and logic.

> 📚 **Official Documentation:**
>
> - [React Docs: JSX - Introducing JSX](https://react.dev/learn/writing-markup-with-jsx)
> - [React Docs: JSX - JavaScript in JSX with Curly Braces](https://react.dev/learn/javascript-in-jsx-with-curly-braces)
> - [React Native Docs: JSX and an Introduction to an Element](https://reactnative.dev/docs/jsx)
