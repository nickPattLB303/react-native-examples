## Section 2: JSX (Syntax, Embedding Expressions, Attributes)

This section introduces JSX, a syntax extension for JavaScript that you'll use extensively in React and React Native to describe what your UI should look like. We'll cover its basic syntax, how to embed JavaScript expressions, and how to specify attributes (similar to HTML attributes).

### What is JSX?

JSX stands for JavaScript XML. It allows you to write HTML-like (or XML-like) structures directly within your JavaScript code. While it might look like a template language, JSX is actually transformed (transpiled) into regular JavaScript function calls by tools like Babel. Specifically, JSX elements become `React.createElement()` calls.

For example, this JSX code:

```tsx
const element = <Text>Hello, SpeedyMeds User!</Text>;
```

Is essentially transformed into something like this by a transpiler like Babel:

```javascript
// Pre-React 17 behavior or with specific Babel config
const element = React.createElement(Text, null, "Hello, SpeedyMeds User!");
```

We'll discuss this transformation in more detail in the "JSX Under the Hood" section.

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

- **Comments:** To add comments within JSX, use the JavaScript multi-line comment syntax wrapped in curly braces:
  ```tsx
  const CommentExample = () => {
    return (
      <View>
        {/* This is a comment inside JSX */}
        <Text>Some visible text.</Text>
      </View>
    );
  };
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
      {/* You can call functions too: {formatDate(new Date())} */}
    </View>
  );
};
```

This includes variables, function calls, arithmetic operations, object property access, and even other JSX elements. However, you cannot use JavaScript _statements_ like `if/else` blocks or `for`/`while` loops directly within JSX curly braces. Such imperative logic should typically be handled in the JavaScript code surrounding the JSX, or by using JavaScript expressions that achieve a similar outcome (e.g., using ternary operators or `&&` for conditional rendering, or array `map()` methods for rendering lists instead of `for` loops within JSX). We'll cover these patterns in "Conditional Rendering" and "Lists and Keys."

### JSX Attributes (Props)

JSX elements can have attributes, just like HTML. These attributes are passed to React components as `props` (properties).

- **String Literals:** Use quotes for string literal attributes:

  ```tsx
  <Text style={{ color: "blue" }}>Patient Alert</Text>
  ```

  A simpler string example for attributes is:

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
> - The `style` attribute accepts a JavaScript object with camelCased CSS property names (e.g., `style={{backgroundColor: 'blue'}}`) not a string (`style="color: blue;"`). For React on the web, numeric values for certain style properties (like `height: 10`) might be automatically appended with "px" by React DOM, though it's good practice to be explicit. In React Native, `fontSize` is often a unitless number, and other layout properties are also typically numbers.
> - All tags must be closed (e.g. `<img src="..." />` or `<br />`).
> - Attribute names are generally camelCased (e.g., `onClick` vs `onclick`, `tabIndex` vs `tabindex`, `htmlFor` vs `for`). However, standard `data-*` and `aria-*` attributes retain their hyphenated HTML syntax (more relevant for web React).
> - In React Native, you won't use HTML tags like `div`, `p`, `img`. Instead, you use React Native Core Components like `<View>`, `<Text>`, `<Image>` which compile to native UI elements.
>
> **Key Takeaway:** While JSX syntax feels familiar if you know HTML, remember it's JavaScript with specific rules. Pay attention to the differences in attribute naming (camelCase), how `style` works, and that the elements themselves are specific to React Native. Below is a quick reference table for common HTML attributes and their JSX counterparts.
>
> | HTML Feature/Attribute                | JSX Equivalent                 | Reason/Note                                                                    |
> | ------------------------------------- | ------------------------------ | ------------------------------------------------------------------------------ |
> | `class`                               | `className`                    | `class` is a reserved keyword in JavaScript.                                   |
> | `for` (on `<label>`)                  | `htmlFor`                      | `for` is a reserved keyword in JavaScript.                                     |
> | `style="color: blue;"`                | `style={{ color: 'blue' }}`    | Accepts a JavaScript object; CSS properties are camelCased.                    |
> | `onclick="myFunc()"`                  | `onClick={myFunc}`             | Accepts a function reference, not a string. Event names are camelCased.        |
> | `<!-- comment -->`                    | `{/* comment */}`              | JavaScript multiline comment syntax wrapped in curly braces.                   |
> | `<input type="text">`                 | `<input type="text" />`        | All tags must be closed; self-closing tags use `/>`.                           |
> | `tabindex`                            | `tabIndex`                     | Attribute names are generally camelCased.                                      |
> | `readonly`                            | `readOnly`                     | Attribute names are generally camelCased.                                      |
> | SVG attributes (e.g., `stroke-width`) | `strokeWidth` (React specific) | SVG attributes also follow camelCase convention when used in React components. |
>
> **Source:** [React Docs: DOM Elements](https://react.dev/reference/react-dom/components/common#common-props)

> 📲 **(Native Developers - Android/iOS):**
>
> **Comparison:** JSX is your primary way of defining UI layouts in React Native, similar to how you might use XML in Android (for ViewGroups and Views) or Storyboards/programmatic UIKit/SwiftUI in iOS. Instead of writing XML tags or using a visual design tool for layout, you write these JavaScript-based tags directly in your component files. These JSX tags directly correspond to native UI components.
>
> **Key Takeaway:** JSX provides a unified way to define UI structures in JavaScript, mapping to native components. Familiarize yourself with the available React Native Core Components that you will use within JSX.
>
> **Source:** [Android Dev: Layouts](https://developer.android.com/guide/topics/ui/declaring-layout), [Apple Dev: SwiftUI Views and Controls](https://developer.apple.com/documentation/swiftui/views-and-controls)

JSX is a powerful feature that makes writing React UIs intuitive. As you get more comfortable with it, you'll find it a natural way to express your UI structure and logic.

### JSX Under the Hood

While JSX provides a convenient and declarative syntax, browsers and JavaScript engines don't interpret it directly. A transformation process, called transpilation, converts JSX into standard JavaScript that can be executed.

**1. Transpilation: The Role of Babel**

The most common transpiler for JSX is Babel. Babel is a versatile JavaScript compiler that transforms modern JavaScript features (ES6+) and syntax extensions like JSX into older, more widely compatible versions of JavaScript (typically ES5). This transpilation step is usually integrated into the build pipeline of a React Native project, managed by tools like Metro (React Native's bundler).

```mermaid
graph LR
    subgraph "Development Time"
        A[Developer writes JSX in .tsx/.jsx file] --> B{JSX Syntax e.g., <MyComponent prop="value" />};
    end
    subgraph "Build Time (Transpilation)"
        B --> C{Babel Compiler};
        C -- Pre-React 17 Transform --> D[React.createElement(MyComponent, {prop: "value"})];
        C -- New JSX Transform (React 17+) --> E[_jsx(MyComponent, {prop: "value"})];
    end
    subgraph "Runtime"
        D --> F[JavaScript Engine Executes Function Call];
        E --> F;
        F --> G{React Element Object (Virtual DOM Node)};
    end
```

This diagram illustrates the transformation journey of JSX. During development, a developer writes UI structures using JSX syntax (e.g., `<MyComponent prop="value" />`) in `.tsx` or `.jsx` files. At build time, a transpiler like Babel processes this code. Before React 17, Babel would convert the JSX into `React.createElement()` function calls. With React 17 and the new JSX transform, Babel converts it into calls to internal functions like `_jsx()` (imported from `react/jsx-runtime`). Both `React.createElement()` and `_jsx()` are standard JavaScript function calls that the JavaScript engine can execute at runtime. The execution of these functions results in the creation of a React Element, which is a lightweight JavaScript object describing the component type, its props, and any children. This object becomes part of React's Virtual DOM, used to efficiently update the actual UI.

**2. From JSX to `React.createElement()` (Pre-React 17)**

Historically, before React 17, Babel transformed JSX elements into calls to `React.createElement()`. This function typically takes three arguments:

1.  **Type:** The element type (e.g., a string like `'div'` for HTML, or a component reference like `MyButton`).
2.  **Props:** An object containing the props (attributes) passed to the element.
3.  **Children:** The children of the element (text content or other JSX elements).

For example, `<MyButton color="blue">Click Me</MyButton>` would become `React.createElement(MyButton, {color: 'blue'}, 'Click Me')`.
This transformation was why, in older React projects, `import React from 'react';` was mandatory in any file using JSX—the transpiled code relied on `React.createElement` being in scope.

**3. The New JSX Transform (React 17+): `_jsx` Runtime**

React 17 introduced a New JSX Transform. With this, Babel can automatically import special helper functions (often named `jsx` or `jsxs`, internally `_jsx` or `_jsxs`) from new entry points within the React package (e.g., `react/jsx-runtime`). These functions are then used to create React elements, instead of `React.createElement()`.

**Benefits of the New JSX Transform:**

- **No Need for Manual React Import for JSX:** The most noticeable benefit is that you often no longer need to `import React from 'react';` just to use JSX. The compiler handles importing the necessary runtime functions automatically.
- **Slightly Smaller Bundle Sizes:** As the explicit `React` import might not be needed in every file using only JSX.
- **Simpler File Structure:** Component files can look cleaner.

This new transform works behind the scenes in modern React and React Native projects, simplifying the developer experience. However, understanding that JSX is just syntactic sugar for JavaScript function calls that create React elements (which are essentially objects describing your UI) is still valuable.

The reliance on transpilation means that React and React Native development inherently involve a build step. This is a key distinction for developers accustomed to writing JavaScript that runs directly in a browser without compilation.

### JSX in React Native

JSX is the standard for defining UI component structure in React Native. However, the elements used are specific to React Native.

**1. Using React Native Core Components**

You don't use web HTML elements like `<div>` or `<span>`. Instead, React Native provides Core Components that map to native UI widgets:

- `<View>`: A fundamental container, similar to `<div>`.
- `<Text>`: For displaying all text content.
- `<Image>`: For displaying images.
- `<TextInput>`: For text input.
- `<ScrollView>`: For scrollable content.
- `<Button>`: A basic button.

This example demonstrates a simple React Native screen using Core Components:

```tsx
import React from "react";
import { View, Text, Button } from "react-native";

const MyScreen = () => {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Hello, React Native!</Text>
      <Button title="Press Me" onPress={() => console.log("Button pressed!")} />
    </View>
  );
};
```

This `MyScreen` component renders a `View` that acts as a container, centering its children on the screen using Flexbox styles. Inside, it displays a `Text` element with a greeting and a `Button` component. When the button is pressed, it logs a message to the console. This structure is typical for a React Native screen, combining layout (`View`), text display (`Text`), and interactive elements (`Button`), all defined using JSX. You can try running this example in an Expo Snack to see it in action.

**2. File Extensions for JSX**

- **JavaScript Projects:** While `.js` can technically work for files with JSX (if the bundler is configured), it's a common convention to use `.jsx` to clearly indicate JSX syntax.
- **TypeScript Projects:** Files containing JSX **must** use the `.tsx` extension. The `.ts` extension is for plain TypeScript files without JSX. This is crucial for the TypeScript compiler to correctly parse and type-check JSX.

> 📚 **Official Documentation:**
>
> - [React Docs: Writing Markup with JSX](https://react.dev/learn/writing-markup-with-jsx)
> - [React Docs: JavaScript in JSX with Curly Braces](https://react.dev/learn/javascript-in-jsx-with-curly-braces)
> - [React Blog: Introducing the New JSX Transform](https://reactjs.org/blog/2020/09/22/introducing-the-new-jsx-transform.html)
> - [React Native Docs: Core Components - JSX](https://reactnative.dev/docs/jsx)
> - [TypeScript Docs: Basic Types - `.tsx` files](https://www.typescriptlang.org/docs/handbook/basic-types.html#typescript-files-tsx)

### Next Steps

Now that you're familiar with JSX syntax for describing UI structure, the next logical step is to understand how these structures are organized into reusable pieces of code. Proceed to [Section 3: Components](./section-03-components.md) to learn about creating and using React components.
