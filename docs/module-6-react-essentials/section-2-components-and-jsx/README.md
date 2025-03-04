# Section 2: Components and JSX

## Learning Objectives
After completing this section, you will be able to:
- Create functional components in React
- Understand and use JSX syntax effectively
- Implement conditional rendering patterns
- Handle lists and keys in components
- Differentiate between functional and class components

**Prerequisite Knowledge**: JavaScript basics, Introduction to React (Section 1)
**Estimated Time**: 1.5 hours

## Components: The Building Blocks of React

Components are the fundamental units of a React application. They are reusable, self-contained pieces of code that return React elements describing what should appear on the screen.

### Types of Components in React

React provides two primary ways to define components:

1. **Functional Components** (also called Function Components)
2. **Class Components**

In modern React development, functional components are preferred due to their simplicity and the introduction of Hooks in React 16.8, which added state and lifecycle features previously only available in class components.

> 💡 **Deep Dive**: When React was first introduced, functional components were called "stateless" components because they couldn't manage state. With the introduction of Hooks, functional components can now manage state and side effects, making them equally powerful to class components but with a more concise syntax.

### Functional Components

A functional component is a JavaScript function that returns JSX:

```jsx
// A simple functional component
function Greeting() {
  return <h1>Hello, world!</h1>;
}

// Arrow function syntax (equivalent)
const Greeting = () => {
  return <h1>Hello, world!</h1>;
};

// Shorter implicit return with arrow functions
const Greeting = () => <h1>Hello, world!</h1>;
```

In React Native, a similar component would look like:

```jsx
// React Native component
import { Text } from 'react-native';

const Greeting = () => <Text>Hello, world!</Text>;
```

### Class Components

While less common in modern React development, class components are JavaScript classes that extend `React.Component`:

```jsx
import React from 'react';

class Greeting extends React.Component {
  render() {
    return <h1>Hello, world!</h1>;
  }
}
```

In React Native:

```jsx
import React from 'react';
import { Text } from 'react-native';

class Greeting extends React.Component {
  render() {
    return <Text>Hello, world!</Text>;
  }
}
```

> 🔍 **Instructor Note**: Throughout this course, we'll focus primarily on functional components with hooks, as they represent the modern approach to React and React Native development.

## Understanding JSX

JSX (JavaScript XML) is a syntax extension for JavaScript that looks similar to HTML. It allows you to write UI components in a syntax that feels like HTML while leveraging the full power of JavaScript.

### Basic JSX Syntax

```jsx
const element = <h1>Hello, world!</h1>;
```

This isn't a string or HTML—it's JSX, which gets transformed into regular JavaScript function calls by build tools like Babel.

In React Native, similar JSX is used with platform-specific components:

```jsx
import { Text } from 'react-native';

const element = <Text>Hello, world!</Text>;
```

### JSX Under the Hood

When compiled, JSX transforms into `React.createElement()` function calls:

```jsx
// This JSX
const element = <h1 className="greeting">Hello, world!</h1>;

// Compiles to this JavaScript
const element = React.createElement(
  'h1',
  { className: 'greeting' },
  'Hello, world!'
);
```

> 💡 **Deep Dive**: JSX was inspired by XHP, an HTML component framework for PHP that was also developed at Facebook. JSX combines the templating approach of markup languages with the full power of a programming language.

### JSX Rules and Syntax

1. **Components must start with a capital letter**:
   ```jsx
   // Correct - React knows this is a custom component
   <MyComponent />
   
   // Incorrect - React will think this is a DOM tag
   <myComponent />
   ```

2. **JSX must have a single root element**:
   ```jsx
   // Correct
   return (
     <div>
       <h1>Title</h1>
       <p>Paragraph</p>
     </div>
   );
   
   // Also correct (using React Fragment)
   return (
     <>
       <h1>Title</h1>
       <p>Paragraph</p>
     </>
   );
   
   // Incorrect
   return (
     <h1>Title</h1>
     <p>Paragraph</p>
   );
   ```

3. **Self-closing tags must be closed**:
   ```jsx
   // Correct
   <img src="image.jpg" alt="An image" />
   
   // Incorrect
   <img src="image.jpg" alt="An image">
   ```

4. **JavaScript expressions in JSX use curly braces**:
   ```jsx
   const name = 'John';
   return <h1>Hello, {name}!</h1>;
   ```

5. **Comments in JSX use JavaScript comment syntax inside curly braces**:
   ```jsx
   return (
     <div>
       {/* This is a comment */}
       <h1>Hello</h1>
     </div>
   );
   ```

> 🔄 **For Web Developers**: JSX is very similar between React and React Native, with the main difference being the set of components you can use (DOM elements vs. React Native components).

> 🔄 **For Android/iOS Developers**: JSX might seem strange at first if you're accustomed to XML layouts (Android) or Interface Builder (iOS), but it offers much more flexibility by allowing you to embed logic directly in your UI code.

## Conditional Rendering

React's declarative nature makes conditional rendering straightforward. There are several patterns:

### 1. If Statements (outside JSX)

```jsx
function WeatherDisplay({ temperature }) {
  let message;
  
  if (temperature > 30) {
    message = <Text>It's hot outside!</Text>;
  } else if (temperature > 20) {
    message = <Text>It's pleasant outside.</Text>;
  } else {
    message = <Text>It's cold outside.</Text>;
  }
  
  return <View>{message}</View>;
}
```

### 2. Logical && Operator

```jsx
function Notification({ hasMessages }) {
  return (
    <View>
      {hasMessages && <Text>You have unread messages</Text>}
    </View>
  );
}
```

> ⚠️ **Warning**: Be careful with the `&&` operator when the left side could be `0`. In JavaScript, `0 && anything` evaluates to `0`, which React will attempt to render.

### 3. Ternary Operator

```jsx
function UserStatus({ isLoggedIn }) {
  return (
    <Text>
      {isLoggedIn ? 'Welcome back!' : 'Please log in'}
    </Text>
  );
}
```

### 4. Preventing Component Rendering

```jsx
function AdminPanel({ isAdmin }) {
  if (!isAdmin) {
    return null;  // Component renders nothing
  }
  
  return (
    <View>
      <Text>Admin Dashboard</Text>
    </View>
  );
}
```

## Rendering Lists

When rendering lists in React, you typically map over an array of data and return JSX for each item:

```jsx
function MedicationList({ medications }) {
  return (
    <View>
      {medications.map(medication => (
        <Text key={medication.id}>{medication.name}</Text>
      ))}
    </View>
  );
}
```

### The Importance of Keys

The `key` prop is critical when rendering lists in React:

- Keys help React identify which items have changed, been added, or removed
- Keys should be unique among siblings (but don't need to be globally unique)
- Typically, you should use an ID from your data
- Only use array indices as a last resort (and only if the list is static)

> 💡 **Deep Dive**: Under the hood, React uses keys to optimize the reconciliation process (the algorithm to diff one tree with another to determine which parts need to be changed). Without keys, React might re-render more elements than necessary or cause unexpected behavior with component state.

```jsx
// Good - Using stable IDs
{medications.map(med => <MedicationItem key={med.id} medication={med} />)}

// Acceptable - Using indices only for static lists
{colors.map((color, index) => <ColorSwatch key={index} color={color} />)}

// Bad - Using indices for lists that can change
{medications.map((med, index) => <MedicationItem key={index} medication={med} />)}
```

## Component Composition

React encourages composition over inheritance. Instead of creating complex class hierarchies, you compose components together to build UIs:

```jsx
// Button component
function Button({ onPress, children }) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.button}>
      <Text style={styles.buttonText}>{children}</Text>
    </TouchableOpacity>
  );
}

// Card component
function Card({ title, children }) {
  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>{title}</Text>
      <View style={styles.cardContent}>
        {children}
      </View>
    </View>
  );
}

// Composing components together
function MedicationCard({ medication, onPressRefill }) {
  return (
    <Card title={medication.name}>
      <Text>Dosage: {medication.dosage}</Text>
      <Text>Schedule: {medication.schedule}</Text>
      <Button onPress={onPressRefill}>
        Refill Prescription
      </Button>
    </Card>
  );
}
```

This composition pattern gives you flexibility without the complexity of inheritance hierarchies.

> 🚀 **Self-Led Learners**: Practice by creating a set of simple components and then composing them together. Try to identify common patterns in existing apps and think about how you would break them down into components.

## Functional vs. Class Components

While this course focuses on functional components, it's useful to understand the differences:

| Feature | Functional Components | Class Components |
|---------|----------------------|------------------|
| Syntax | Simpler, less boilerplate | More verbose |
| State | Uses useState and useReducer hooks | Uses this.state and this.setState() |
| Lifecycle | Uses useEffect hook | Uses lifecycle methods (componentDidMount, etc.) |
| Performance | Generally slightly better | Slightly more overhead |
| Context | useContext hook | static contextType or Context.Consumer |
| Refs | useRef hook | createRef or callback refs |

Most React Native applications built today use functional components with hooks, which is what we'll focus on in the rest of this module.

> 🔄 **For Android/iOS Developers**: Functional components with hooks are somewhat analogous to:
> - Android: ViewModel with StateFlow/LiveData for state management
> - iOS: SwiftUI views with @State and other property wrappers

In the next section, we'll explore props and component composition patterns in more detail, focusing on how data flows through a React application. 

## Practice Exercise: Creating Components

### Objective
Practice creating functional components for a medication tracking app, applying JSX syntax, conditional rendering, and list rendering patterns.

### Duration
20-30 minutes

### Exercise Description

In this exercise, you'll implement a set of React components for a medication tracking application. You'll create several components with different responsibilities and make them work together.

#### Requirements

You'll create the following components:

1. **MedicationHeader**: Displays a title and a small description
2. **StatusBadge**: Shows the status of a medication (taken, pending, skipped)
3. **MedicationItem**: Displays information about a single medication and uses the StatusBadge component
4. **MedicationList**: Renders multiple MedicationItem components

#### Sample Data

Use this sample data for your implementation:

```jsx
// Sample medication data
const medications = [
  { id: '1', name: 'Aspirin', dosage: '100mg', schedule: 'Daily', status: 'active' },
  { id: '2', name: 'Ibuprofen', dosage: '200mg', schedule: 'As needed', status: 'low' },
  { id: '3', name: 'Amoxicillin', dosage: '500mg', schedule: 'Twice daily', status: 'inactive' },
];
```

#### Implementation Steps

1. **MedicationHeader Component**

Create a component that:
- Accepts `title` and `description` props
- Renders the title in an h1 tag
- Renders the description in a paragraph tag

```jsx
function MedicationHeader({ title, description }) {
  return (
    <div>
      <h1>{title}</h1>
      <p>{description}</p>
    </div>
  );
}
```

2. **StatusBadge Component**

Create a component that:
- Accepts a `status` prop
- Renders different text/styling based on the status value
- Implements conditional rendering based on the status

3. **MedicationItem Component**

Create a component that:
- Accepts a `medication` object as a prop
- Displays the medication name, dosage, and schedule
- Uses the StatusBadge component to display the status

4. **MedicationList Component**

Create a component that:
- Accepts an array of `medications` as a prop
- Maps over the array to render a MedicationItem for each medication
- Adds proper keys to the list items
- Handles the empty list case

### Deliverables

Create a file with the 4 components implemented as described above.

### Bonus Challenges

If you finish early, try these extra challenges:

1. Add the ability to filter medications by status
2. Implement a search input that filters medications by name
3. Use React.Fragment where appropriate to avoid unnecessary wrapper divs

### Evaluation Criteria

- Correct implementation of functional components
- Proper use of JSX syntax
- Effective use of conditional rendering patterns
- Correct implementation of list rendering with keys
- Appropriate component composition

### Tips

- Remember to follow React naming conventions (PascalCase for components)
- Use destructuring for props where appropriate
- Consider what should be conditional vs. what should always render
- Remember to include key props when rendering lists
- Consider which components should be presentational (receive props) vs. which might need state 