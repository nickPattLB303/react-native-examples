# Module 6: React Essentials

## Learning Objectives
After completing this module, you will be able to:
- Understand the core concepts of React including components, props, and state
- Implement functional components with React Hooks
- Explain the React component lifecycle and how it differs from class components
- Apply JSX syntax effectively in React applications
- Create reusable and composable components
- Manage component state and side effects using hooks

**Prerequisite Knowledge**: JavaScript Essentials (Module 4), TypeScript Essentials (Module 5)
**Estimated Time**: 6-8 hours

## Module Overview
This module introduces the fundamental concepts of React, the JavaScript library upon which React Native is built. While React Native extends React for mobile development, mastering React's core concepts is essential for building effective React Native applications. We'll focus on modern React patterns using functional components and hooks rather than class-based approaches.

> 💡 **Deep Dive**: React's component model forms the foundation of React Native. Understanding how data flows through components, how state is managed, and how the rendering lifecycle works will make you far more effective in troubleshooting and optimizing React Native apps.

## Sections
1. [Introduction to React](./section-1-introduction-to-react/README.md)
2. [Components and JSX](./section-2-components-and-jsx/README.md)
3. [Props and Component Composition](./section-3-props-and-component-composition/README.md)
4. [State and Hooks](./section-4-state-and-hooks/README.md)
5. [Component Lifecycle and Effects](./section-5-component-lifecycle-and-effects/README.md)

> 🔍 **Instructor Note**: This module builds the conceptual foundation for the rest of the course. Emphasize how React's concepts are directly applied in React Native, just with different primitive components.

> 🚀 **Self-Led Learners**: Take time to experiment with the code examples provided in each section. Try modifying them to reinforce your understanding before moving on to the next section.

> 🔄 **For Web Developers**: If you're already familiar with React for web development, focus on understanding how the component lifecycle and state management patterns translate to mobile contexts. Pay attention to performance considerations that are different on mobile.

> 🔄 **For Android/iOS Developers**: Focus on understanding how React's component model compares to the UI framework you're familiar with. For Android developers, compare it to Views and ViewGroups. For iOS developers, compare it to UIViews and ViewControllers. 

# Section 1: Introduction to React

## Learning Objectives
After completing this section, you will be able to:
- Explain the core philosophy and design principles of React
- Understand the declarative nature of React's programming model
- Describe the history and evolution of React
- Recognize the relationship between React and React Native
- Identify the key differences between React on the web and React in React Native

**Prerequisite Knowledge**: Basic understanding of JavaScript (Module 4)
**Estimated Time**: 1 hour

## What is React?

React is a JavaScript library for building user interfaces, primarily focused on the view layer of applications. Developed and maintained by Facebook (now Meta), React was first released in 2013 and has since become one of the most popular frontend libraries in the world.

### Core Philosophy

React's core philosophy centers around several key principles:

#### 1. Component-Based Architecture

In React, user interfaces are broken down into small, reusable pieces called **components**. Each component encapsulates its own state, logic, and appearance, making them:

- **Reusable**: Components can be used multiple times across an application
- **Composable**: Smaller components can be combined to create more complex UIs
- **Maintainable**: Changes to one component don't affect others (when properly designed)

This component model enables developers to build UIs from simple, isolated pieces that maintain their own state.

> 💡 **Deep Dive**: React's component model was inspired by the concept of pure functions from functional programming. Components ideally should be pure, meaning that given the same inputs (props), they always render the same outputs without causing side effects.

#### 2. Declarative Programming

React uses a **declarative** approach to building UIs, in contrast to the **imperative** approach used in traditional DOM manipulation:

- **Declarative**: You describe what you want the UI to look like at any given point, and React handles the DOM updates to achieve that state.
- **Imperative**: You provide step-by-step instructions on how to change the UI from one state to another.

This declarative paradigm makes code more predictable, easier to debug, and simpler to understand.

```jsx
// Declarative React approach
function Counter() {
  const [count, setCount] = useState(0);
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}
```

```js
// Imperative DOM manipulation approach
let count = 0;
const countDisplay = document.getElementById('count');
const button = document.getElementById('increment');

button.addEventListener('click', () => {
  count++;
  countDisplay.textContent = `Count: ${count}`;
});
```

#### 3. Unidirectional Data Flow

React follows a one-way data flow pattern:
- Data flows down from parent components to children through props
- State changes flow up through callbacks or context

This predictable data flow makes applications easier to understand and debug.

> 🔄 **For Android Developers**: This is somewhat similar to how data flows between Activities and Fragments, but with a more formalized structure.

> 🔄 **For iOS Developers**: If you're familiar with SwiftUI, you'll find many similarities in the declarative approach and data flow. If you're coming from UIKit, React's approach is quite different from the imperative nature of UIViewController.

## The Evolution of React

React has evolved significantly since its initial release:

- **2013**: Initial public release of React for the web
- **2015**: React Native introduced, bringing the React model to mobile platforms
- **2016**: Introduction of stateless functional components
- **2019**: React Hooks introduced, enabling state and lifecycle features in functional components
- **2022+**: Concurrent features and automatic batching for improved performance

> 💡 **Deep Dive**: React was originally developed by Jordan Walke at Facebook in 2011 for use in the Facebook News Feed. It was open-sourced in 2013 and has since been adopted by thousands of companies including Instagram, Netflix, Airbnb, and many others.

## React vs. React Native

While React and React Native share the same core principles and patterns, they differ in several important ways:

| Feature | React (Web) | React Native |
|---------|-------------|--------------|
| Rendering Target | DOM (browsers) | Native UI components |
| Base Components | div, span, p, etc. | View, Text, Image, etc. |
| Styling | CSS, CSS-in-JS | JavaScript objects similar to CSS |
| Events | Browser events | Touch events, gestures |
| Animation | CSS transitions, Web Animations API | Animated API |
| Navigation | React Router, etc. | React Navigation, etc. |

Despite these differences, the core concepts of components, props, state, and lifecycle remain consistent between the two, which is why learning React fundamentals is critical for React Native development.

> 🔍 **For Web Developers**: The biggest adjustment when moving from React to React Native is the different set of primitive components and the styling system. You'll need to think in terms of mobile UI patterns rather than web patterns.

## React in Modern Application Development

React has influenced the broader JavaScript ecosystem and app development paradigms:

- **Libraries and Frameworks**: Many modern frameworks like Next.js, Gatsby, and Remix build upon React
- **State Management**: Libraries like Redux, MobX, and Recoil evolved to manage complex state in React applications
- **UI Patterns**: Component-based design has become standard across many frameworks
- **Cross-Platform Development**: React Native has made it possible to share business logic across platforms

## Why Learn React Before React Native?

Understanding React's core concepts provides the foundation for effective React Native development:

1. **Component Structure**: The component model is identical between React and React Native
2. **State Management**: State and props work the same way in both environments
3. **Component Lifecycle**: Understanding when and how components update is platform-agnostic
4. **Hooks API**: React Hooks are fully supported and work the same way in React Native
5. **Debugging Patterns**: Many debugging approaches are shared between the platforms

In the next sections, we'll dive deeper into these core React concepts, with examples that relate directly to React Native development.

> 🚀 **Self-Led Learners**: If you're new to React, consider building a simple web React application alongside this module to reinforce these concepts before applying them to React Native.

> 🔍 **Instructor Note**: The goal of this section is to establish a solid conceptual foundation before diving into code in subsequent sections. Emphasize the philosophical aspects of React's design that influence how we think about building components. 

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

# Section 3: Props and Component Composition

## Learning Objectives
After completing this section, you will be able to:
- Understand the role of props in React components
- Pass and receive props between components
- Implement prop type validation for component safety
- Apply component composition patterns
- Use React's children prop for flexible component design

**Prerequisite Knowledge**: Components and JSX (Section 2)
**Estimated Time**: 1.5 hours

## Understanding Props

Props (short for "properties") are the primary way to pass data between React components. They are read-only and flow downward from parent to child components, creating a one-way data flow that makes applications easier to understand and debug.

### The Role of Props

Props serve several crucial purposes in React applications:

1. **Data Passing**: They allow parent components to pass data to child components
2. **Configuration**: They enable customization of components for different use cases
3. **Behavior Definition**: They can include callback functions to define how a component should behave
4. **Children Content**: They provide a way to include child elements within a component

### Passing Props to Components

Props are passed to components as attributes in JSX:

```jsx
// Passing props to a component
<MedicationItem 
  name="Lisinopril" 
  dosage="10mg" 
  schedule="Once daily" 
  isActive={true} 
  onPress={() => console.log('Pressed')} 
/>
```

### Receiving Props in Components

In functional components, props are received as the first parameter, typically destructured for convenience:

```jsx
// Receiving props in a functional component
function MedicationItem({ name, dosage, schedule, isActive, onPress }) {
  return (
    <TouchableOpacity 
      style={[styles.container, isActive ? styles.active : styles.inactive]} 
      onPress={onPress}
    >
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.dosage}>{dosage}</Text>
      <Text style={styles.schedule}>{schedule}</Text>
    </TouchableOpacity>
  );
}
```

> 💡 **Deep Dive**: Props in React are immutable by design. A component should never modify its own props. This restriction helps enforce the one-way data flow that makes React applications predictable and easier to debug. If a component needs to modify data, it should use state instead.

### Default Props

You can define default values for props to handle cases where a prop isn't provided:

```jsx
function MedicationItem({ name, dosage, schedule, isActive = true, onPress }) {
  // Default value for isActive is true
  return (
    // Component implementation
  );
}

// Alternative approach using defaultProps (older pattern)
MedicationItem.defaultProps = {
  isActive: true,
};
```

In TypeScript, you can combine default values with type definitions:

```tsx
type MedicationItemProps = {
  name: string;
  dosage: string;
  schedule: string;
  isActive?: boolean; // Optional prop
  onPress: () => void;
};

function MedicationItem({ 
  name, 
  dosage, 
  schedule, 
  isActive = true, 
  onPress 
}: MedicationItemProps) {
  // Component implementation
}
```

### Prop Type Validation

React provides a way to validate props at runtime using PropTypes:

```jsx
import PropTypes from 'prop-types';

function MedicationItem({ name, dosage, schedule, isActive, onPress }) {
  // Component implementation
}

MedicationItem.propTypes = {
  name: PropTypes.string.isRequired,
  dosage: PropTypes.string.isRequired,
  schedule: PropTypes.string.isRequired,
  isActive: PropTypes.bool,
  onPress: PropTypes.func.isRequired,
};
```

> 🔍 **Instructor Note**: In modern React projects, especially those using TypeScript, PropTypes are less common as TypeScript provides compile-time type checking. However, understanding PropTypes is still valuable for projects using JavaScript.

## The "children" Prop

One special prop in React is `children`, which allows components to receive and render nested JSX elements:

```jsx
// Card component that accepts children
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

// Using the Card component with children
function MedicationDetail() {
  return (
    <Card title="Medication Details">
      <Text>Name: Lisinopril</Text>
      <Text>Dosage: 10mg</Text>
      <Text>Schedule: Once daily</Text>
      <Button title="Refill Prescription" onPress={() => {}} />
    </Card>
  );
}
```

The `children` prop allows for flexible component composition, enabling you to create wrapper components that can contain any content.

> 💡 **Deep Dive**: The children prop is actually part of the props object passed to your component. When you write `<Card>Content</Card>`, React passes `"Content"` as the `children` prop to the Card component. When you write `<Card><Text>A</Text><Text>B</Text></Card>`, the `children` prop becomes an array of React elements.

## Advanced Component Composition Patterns

While basic component composition is powerful, React offers several advanced patterns for more complex scenarios:

### 1. Specialization (Specific Components)

Create specialized versions of more generic components:

```jsx
// Generic Button component
function Button({ onPress, style, textStyle, children }) {
  return (
    <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
      <Text style={[styles.buttonText, textStyle]}>{children}</Text>
    </TouchableOpacity>
  );
}

// Specialized PrimaryButton component
function PrimaryButton({ onPress, children }) {
  return (
    <Button 
      onPress={onPress} 
      style={styles.primaryButton} 
      textStyle={styles.primaryButtonText}
    >
      {children}
    </Button>
  );
}

// Specialized DangerButton component
function DangerButton({ onPress, children }) {
  return (
    <Button 
      onPress={onPress} 
      style={styles.dangerButton} 
      textStyle={styles.dangerButtonText}
    >
      {children}
    </Button>
  );
}
```

### 2. Containment with Multiple Slots

For components that need multiple distinct "slots" for content:

```jsx
function ProfileCard({ header, footer, children }) {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        {header}
      </View>
      <View style={styles.content}>
        {children}
      </View>
      <View style={styles.footer}>
        {footer}
      </View>
    </View>
  );
}

// Usage
function UserProfile() {
  return (
    <ProfileCard
      header={<ProfileHeader user={user} />}
      footer={<ProfileActions user={user} />}
    >
      <UserDetails user={user} />
    </ProfileCard>
  );
}
```

### 3. Render Props

A technique for sharing code between components using a prop whose value is a function:

```jsx
function Toggler({ render }) {
  const [isOn, setIsOn] = useState(false);
  const toggle = () => setIsOn(!isOn);
  
  return render(isOn, toggle);
}

// Usage
function App() {
  return (
    <Toggler
      render={(isOn, toggle) => (
        <View>
          <Text>The switch is {isOn ? 'ON' : 'OFF'}</Text>
          <Button title="Toggle" onPress={toggle} />
        </View>
      )}
    />
  );
}
```

An alternative and more common syntax uses children as a function:

```jsx
function Toggler({ children }) {
  const [isOn, setIsOn] = useState(false);
  const toggle = () => setIsOn(!isOn);
  
  return children(isOn, toggle);
}

// Usage
function App() {
  return (
    <Toggler>
      {(isOn, toggle) => (
        <View>
          <Text>The switch is {isOn ? 'ON' : 'OFF'}</Text>
          <Button title="Toggle" onPress={toggle} />
        </View>
      )}
    </Toggler>
  );
}
```

> 💡 **Deep Dive**: The render props pattern emerged as a way to share stateful logic between components before hooks were introduced. While hooks have replaced many use cases for render props, this pattern is still valuable for certain scenarios, particularly when the rendering logic needs to be highly customizable.

### 4. Higher-Order Components (HOCs)

HOCs are functions that take a component and return a new, enhanced component:

```jsx
// HOC that adds loading capability to a component
function withLoading(WrappedComponent) {
  return function WithLoading({ isLoading, ...props }) {
    if (isLoading) {
      return <ActivityIndicator size="large" />;
    }
    return <WrappedComponent {...props} />;
  };
}

// Basic component
function UserProfile({ user }) {
  return (
    <View>
      <Text>{user.name}</Text>
      <Text>{user.email}</Text>
    </View>
  );
}

// Enhanced component with loading capability
const UserProfileWithLoading = withLoading(UserProfile);

// Usage
function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);
  
  // Fetch user data...
  
  return <UserProfileWithLoading isLoading={isLoading} user={user} />;
}
```

> 🔍 **Instructor Note**: Higher-Order Components were a common pattern before hooks, but are less frequently seen in modern React codebases. Understanding them is still valuable for working with existing libraries and codebases.

## Props vs. State

A common source of confusion for new React developers is understanding when to use props versus state:

| Props | State |
|-------|-------|
| Received from parent component | Defined within the component |
| Immutable (read-only) | Mutable (can be updated) |
| Used for configuration | Used for internal component data |
| Flow downward from parent to child | Contained within a component or lifted to parent |
| Updated by parent component | Updated by the component itself |

Props are like function parameters, while state is like variables declared within the function.

## Best Practices for Props

1. **Keep prop lists manageable**:
   - If a component has too many props, it may be doing too much and should be split
   - Consider grouping related props into a single object

2. **Use descriptive prop names**:
   - Prefer longer, descriptive names over short, ambiguous ones
   - Consider the component's public API—these names will be used by other developers

3. **Provide sensible defaults**:
   - When appropriate, define default values for optional props
   - This makes components more resilient and easier to use

4. **Validate props**:
   - Use PropTypes or TypeScript to ensure props are of the expected type
   - Document required props and their expected types

5. **Keep components pure with respect to props**:
   - Components should always render the same output for the same props
   - Avoid side effects based on props inside the render phase

> 🚀 **Self-Led Learners**: Review existing components in React Native apps and identify how they use props and component composition. Consider how you might refactor complex components into smaller, more composable pieces.

## Props in React Native vs. Web React

The concept of props is identical between React for the web and React Native, with the main difference being the available component types and their specific props. Common props in React Native include:

- `style`: Used for styling components (similar to `className` in web React)
- `onPress`: For handling press events (similar to `onClick` in web React)
- Platform-specific props like `activeOpacity` for TouchableOpacity

> 🔄 **For Web Developers**: Most of your knowledge about props in web React transfers directly to React Native. The main adjustments are learning the new component types and their specific props.

> 🔄 **For Android/iOS Developers**: Props in React are conceptually similar to:
> - Android: XML attributes for views, or parameters passed to custom views
> - iOS: Properties and initializer parameters for UIViews or SwiftUI views

In the next section, we'll build on our understanding of props by exploring state and hooks, which allow components to manage their own data and respond to user interactions. 

# Section 4: State and Hooks

## Learning Objectives
After completing this section, you will be able to:
- Understand the concept of state in React components
- Use the useState hook to manage component state
- Implement the useReducer hook for complex state logic
- Apply state management best practices
- Understand when and how to lift state up in component hierarchies

**Prerequisite Knowledge**: Components and JSX (Section 2), Props and Composition (Section 3)
**Estimated Time**: 2 hours

## Understanding State in React

State represents the internal, mutable data that affects a component's rendering. Unlike props, which are passed from parent components and are read-only, state is managed within the component itself and can change over time, typically in response to user actions or external events.

### The Role of State

State serves several critical purposes in React applications:

1. **User Interactions**: Track user input, form values, selections, etc.
2. **UI Status**: Manage UI states like loading, error states, or visibility of elements
3. **Data Storage**: Hold fetched data or computed values for rendering
4. **Component Memory**: Remember information across renders

### State Characteristics

- **Component-Specific**: State belongs to a specific component instance
- **Private**: A component's state is not accessible to other components unless explicitly passed as props
- **Mutable**: Unlike props, state can be updated (but only using the appropriate update function)
- **Asynchronous**: State updates may be batched for performance reasons
- **Triggering**: Changes to state trigger component re-renders

> 💡 **Deep Dive**: When a component's state changes, React creates a new virtual DOM representation of the component and compares it to the previous one. It then updates only the parts of the actual DOM that have changed, which is more efficient than directly manipulating the entire DOM.

## Managing State with Hooks

Hooks were introduced in React 16.8 as a way to use state and other React features in functional components. The two primary hooks for state management are `useState` and `useReducer`.

### The useState Hook

The `useState` hook is the simplest way to add state to a functional component:

```jsx
import React, { useState } from 'react';
import { View, Text, Button } from 'react-native';

function Counter() {
  // Declare a state variable 'count' with initial value 0
  const [count, setCount] = useState(0);
  
  return (
    <View>
      <Text>Count: {count}</Text>
      <Button title="Increment" onPress={() => setCount(count + 1)} />
      <Button title="Decrement" onPress={() => setCount(count - 1)} />
    </View>
  );
}
```

#### useState Syntax

```jsx
const [state, setState] = useState(initialState);
```

- `initialState`: The initial value for the state variable (can be any data type)
- `state`: The current state value
- `setState`: A function to update the state

#### Updating State

There are two main ways to update state with `useState`:

1. **Direct value update**:
   ```jsx
   setCount(5); // Set count directly to 5
   ```

2. **Functional update** (for updates based on previous state):
   ```jsx
   setCount(prevCount => prevCount + 1); // Increment based on previous value
   ```

The functional update pattern is especially important when state updates depend on previous state values, as React may batch multiple state updates for performance reasons.

> ⚠️ **Warning**: Never modify state directly. Always use the setter function:
> ```jsx
> // Incorrect - will not trigger re-render
> count = count + 1;
> 
> // Correct - use the setter function
> setCount(count + 1);
> ```

#### Multiple State Variables

You can use `useState` multiple times in a single component:

```jsx
function MedicationForm() {
  const [name, setName] = useState('');
  const [dosage, setDosage] = useState('');
  const [schedule, setSchedule] = useState('daily');
  const [isActive, setIsActive] = useState(true);
  
  // Component implementation
}
```

For related pieces of state, you can also use an object:

```jsx
function MedicationForm() {
  const [medication, setMedication] = useState({
    name: '',
    dosage: '',
    schedule: 'daily',
    isActive: true
  });
  
  // Update a single property in the state object
  const updateName = (name) => {
    setMedication(prevMed => ({
      ...prevMed, // Copy all existing properties
      name // Update only the name property
    }));
  };
  
  // Component implementation
}
```

> 💡 **Deep Dive**: Unlike `this.setState` in class components, the state updater function from `useState` doesn't automatically merge objects. When updating an object, you need to copy the existing properties explicitly using the spread operator (`...`) as shown above.

### The useReducer Hook

For more complex state logic, especially when state transitions depend on previous state or when different actions result in different state changes, `useReducer` provides a more structured approach:

```jsx
import React, { useReducer } from 'react';
import { View, Text, Button } from 'react-native';

// Reducer function defines how state updates in response to actions
function counterReducer(state, action) {
  switch (action.type) {
    case 'INCREMENT':
      return { count: state.count + 1 };
    case 'DECREMENT':
      return { count: state.count - 1 };
    case 'RESET':
      return { count: 0 };
    case 'SET':
      return { count: action.payload };
    default:
      throw new Error(`Unsupported action type: ${action.type}`);
  }
}

function Counter() {
  // Initialize useReducer with the reducer function and initial state
  const [state, dispatch] = useReducer(counterReducer, { count: 0 });
  
  return (
    <View>
      <Text>Count: {state.count}</Text>
      <Button title="Increment" onPress={() => dispatch({ type: 'INCREMENT' })} />
      <Button title="Decrement" onPress={() => dispatch({ type: 'DECREMENT' })} />
      <Button title="Reset" onPress={() => dispatch({ type: 'RESET' })} />
      <Button title="Set to 10" onPress={() => dispatch({ type: 'SET', payload: 10 })} />
    </View>
  );
}
```

#### useReducer Syntax

```jsx
const [state, dispatch] = useReducer(reducer, initialState);
```

- `reducer`: A function that determines how state updates based on actions
- `initialState`: The initial state value
- `state`: The current state value
- `dispatch`: A function to dispatch actions to the reducer

#### Benefits of useReducer

- **Centralized Logic**: All state update logic is contained in the reducer function
- **Predictable Transitions**: State changes follow a clear action → reducer → new state pattern
- **Testing**: Reducers are pure functions, making them easy to test
- **Debugging**: Action dispatches provide a clear history of state changes
- **Complex Updates**: Simplifies state logic that involves multiple sub-values or dependencies

> 🔄 **For Android Developers**: This pattern is similar to Redux, and has parallels to state management in MVI (Model-View-Intent) architecture.

> 🔄 **For iOS Developers**: If you're familiar with SwiftUI, this is somewhat similar to using reducers with the Combine framework or libraries like TCA (The Composable Architecture).

### Lazy State Initialization

For both `useState` and `useReducer`, if the initial state is the result of an expensive computation, you can pass a function instead of a value:

```jsx
// This function is only called during the first render
const [state, setState] = useState(() => {
  const initialState = performExpensiveCalculation();
  return initialState;
});
```

## Lifting State Up

When multiple components need access to the same state, you can "lift the state up" to their nearest common ancestor:

```jsx
function MedicationTracker() {
  // State is lifted up to this parent component
  const [medications, setMedications] = useState([]);
  
  const addMedication = (medication) => {
    setMedications([...medications, medication]);
  };
  
  const removeMedication = (id) => {
    setMedications(medications.filter(med => med.id !== id));
  };
  
  return (
    <View>
      <MedicationForm onAddMedication={addMedication} />
      <MedicationList 
        medications={medications} 
        onRemoveMedication={removeMedication} 
      />
    </View>
  );
}

function MedicationForm({ onAddMedication }) {
  // Form implementation that calls onAddMedication when submitted
}

function MedicationList({ medications, onRemoveMedication }) {
  // List implementation that displays medications and allows removal
}
```

Lifting state up is a fundamental pattern in React that follows the principle of "single source of truth." By keeping shared state in a parent component and passing it down via props, you ensure that all components see consistent data.

> 💡 **Deep Dive**: Lifting state up is React's built-in alternative to global state management. While libraries like Redux provide centralized state management, React's core pattern is to push state as high up the component tree as needed, but no higher.

## State Management Best Practices

### 1. Keep State Minimal

Only include in state what you absolutely need for rendering or data persistence:

```jsx
// Good - only tracking necessary values
const [isSubmitting, setIsSubmitting] = useState(false);
const [error, setError] = useState(null);
const [user, setUser] = useState(null);

// Avoid - derived values don't need to be in state
const [isLoggedIn, setIsLoggedIn] = useState(false); // Can be derived: !!user
```

### 2. Derive Values When Possible

Calculate derived data during render rather than storing it in state:

```jsx
function MedicationList({ medications }) {
  // Derive these values instead of storing in state
  const activeMedications = medications.filter(med => med.isActive);
  const medicationCount = medications.length;
  const hasNoPrescriptions = medications.length === 0;
  
  // Component implementation
}
```

### 3. Group Related State

For complex components, consider how to organize state:

```jsx
// Option 1: Multiple useState calls
const [username, setUsername] = useState('');
const [password, setPassword] = useState('');
const [error, setError] = useState(null);
const [isLoading, setIsLoading] = useState(false);

// Option 2: Single useState with object
const [loginForm, setLoginForm] = useState({
  username: '',
  password: '',
  error: null,
  isLoading: false
});

// Option 3: useReducer for complex logic
const [loginState, dispatch] = useReducer(loginReducer, {
  username: '',
  password: '',
  error: null,
  isLoading: false
});
```

Choose based on:
- How related the state values are
- How frequently they change together
- Complexity of the update logic

### 4. Avoid Duplication in State

Don't store the same data in multiple places:

```jsx
// Bad - duplicating data
const [medications, setMedications] = useState([]);
const [medicationCount, setMedicationCount] = useState(0);

// Adding a medication requires two updates
const addMedication = (med) => {
  setMedications([...medications, med]);
  setMedicationCount(medicationCount + 1); // Unnecessary duplication
};

// Good - derive count from medications
const medicationCount = medications.length;
```

### 5. Batch Related Updates

When multiple state updates need to happen together, consider using a reducer:

```jsx
// Before - multiple useState updates
const handleSubmit = async () => {
  setIsLoading(true);
  setError(null);
  
  try {
    const response = await submitForm(formData);
    setIsSubmitted(true);
    setResponse(response);
  } catch (error) {
    setError(error.message);
  } finally {
    setIsLoading(false);
  }
};

// After - single useReducer
const handleSubmit = async () => {
  dispatch({ type: 'SUBMIT_START' });
  
  try {
    const response = await submitForm(formData);
    dispatch({ type: 'SUBMIT_SUCCESS', payload: response });
  } catch (error) {
    dispatch({ type: 'SUBMIT_ERROR', payload: error.message });
  }
};
```

## State in React Native vs. Web React

The concepts and implementation of state are identical between React for the web and React Native. All the hooks (`useState`, `useReducer`, etc.) work exactly the same way.

The main differences come in:

1. **User Input**: In React Native, you'll handle touch events and mobile-specific inputs
2. **Persistence**: Mobile apps often need to persist state locally (see AsyncStorage in React Native)
3. **Navigation State**: React Native often uses libraries like React Navigation, which have their own state management

> 🔄 **For Web Developers**: Your knowledge of state management in React transfers directly to React Native.

> 🔄 **For Android/iOS Developers**: 
> - Android: State in React Native is similar to ViewModel state in MVVM, but with more direct connection to UI
> - iOS: Similar conceptually to SwiftUI state management, but with different syntax

## Using State for Common UI Patterns

### 1. Toggle Components

```jsx
function Accordion({ title, children }) {
  const [isExpanded, setIsExpanded] = useState(false);
  
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => setIsExpanded(!isExpanded)}>
        <View style={styles.header}>
          <Text style={styles.title}>{title}</Text>
          <Text>{isExpanded ? '▲' : '▼'}</Text>
        </View>
      </TouchableOpacity>
      
      {isExpanded && (
        <View style={styles.content}>
          {children}
        </View>
      )}
    </View>
  );
}
```

### 2. Form Inputs

```jsx
function MedicationForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    name: '',
    dosage: '',
    schedule: 'daily'
  });
  
  const handleChange = (field, value) => {
    setFormData({
      ...formData,
      [field]: value
    });
  };
  
  const handleSubmit = () => {
    onSubmit(formData);
  };
  
  return (
    <View style={styles.form}>
      <TextInput
        style={styles.input}
        value={formData.name}
        onChangeText={(text) => handleChange('name', text)}
        placeholder="Medication Name"
      />
      <TextInput
        style={styles.input}
        value={formData.dosage}
        onChangeText={(text) => handleChange('dosage', text)}
        placeholder="Dosage"
      />
      <Picker
        selectedValue={formData.schedule}
        onValueChange={(value) => handleChange('schedule', value)}
      >
        <Picker.Item label="Daily" value="daily" />
        <Picker.Item label="Weekly" value="weekly" />
        <Picker.Item label="As Needed" value="as_needed" />
      </Picker>
      <Button title="Add Medication" onPress={handleSubmit} />
    </View>
  );
}
```

### 3. Controlled Components

```jsx
function QuantitySelector({ value, onChange, min = 0, max = 10 }) {
  return (
    <View style={styles.container}>
      <Button
        title="-"
        onPress={() => onChange(Math.max(min, value - 1))}
        disabled={value <= min}
      />
      <Text style={styles.value}>{value}</Text>
      <Button
        title="+"
        onPress={() => onChange(Math.min(max, value + 1))}
        disabled={value >= max}
      />
    </View>
  );
}

// Usage
function ParentComponent() {
  const [quantity, setQuantity] = useState(1);
  
  return (
    <View>
      <Text>Select quantity:</Text>
      <QuantitySelector 
        value={quantity} 
        onChange={setQuantity} 
        max={5} 
      />
    </View>
  );
}
```

> 🚀 **Self-Led Learners**: Experiment with combining state and props by building a more complex component, such as a medication tracker that allows adding, removing, and toggling the active status of medications.

# Section 5: Component Lifecycle and Effects

## Learning Objectives
After completing this section, you will be able to:
- Understand the component lifecycle in React
- Use the useEffect hook for side effects in functional components
- Handle component cleanup effectively
- Implement the Context API for cross-component state sharing
- Use additional hooks like useRef, useMemo, and useCallback for performance optimization

**Prerequisite Knowledge**: State and Hooks (Section 4)
**Estimated Time**: 2 hours

## The React Component Lifecycle

Every React component goes through a series of phases during its existence:

1. **Mounting**: When React creates the component and inserts it into the DOM
2. **Updating**: When the component re-renders due to changes in props or state
3. **Unmounting**: When React removes the component from the DOM

In class components, these phases were handled with specific lifecycle methods like `componentDidMount`, `componentDidUpdate`, and `componentWillUnmount`. In modern React with functional components, the `useEffect` hook provides a more unified way to handle these lifecycle events.

> 💡 **Deep Dive**: Under the hood, React's reconciliation process determines when components need to re-render. When state or props change, React creates a new virtual DOM tree and compares it with the previous one (a process called "diffing"). It then updates only the parts of the actual DOM that have changed, which is more efficient than rebuilding the entire DOM.

## Side Effects with useEffect

The `useEffect` hook allows you to perform side effects in functional components. Side effects are operations that affect something outside the scope of the current function, such as:

- Data fetching
- Subscriptions
- DOM manipulations
- Logging
- Timers

### Basic useEffect Syntax

```jsx
import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';

function Timer() {
  const [seconds, setSeconds] = useState(0);
  
  useEffect(() => {
    // This code runs after every render
    console.log('Component rendered');
    
    // Optional cleanup function
    return () => {
      console.log('Cleanup before next effect or unmount');
    };
  });
  
  // Component implementation
}
```

### Effect Dependencies

The second argument to `useEffect` is an array of dependencies that determine when the effect should run:

1. **No dependency array**: The effect runs after every render
   ```jsx
   useEffect(() => {
     console.log('This runs after every render');
   });
   ```

2. **Empty dependency array**: The effect runs only after the first render (mount)
   ```jsx
   useEffect(() => {
     console.log('This runs only on mount (first render)');
   }, []);
   ```

3. **Array with dependencies**: The effect runs after the first render and whenever any dependency changes
   ```jsx
   useEffect(() => {
     console.log(`Current count: ${count}`);
   }, [count]); // Only re-run if count changes
   ```

> ⚠️ **Warning**: Forgetting dependencies can lead to stale closures and bugs. Include all values from the component scope that the effect uses. ESLint's `exhaustive-deps` rule can help catch missing dependencies.

### Common useEffect Patterns

#### 1. Data Fetching

```jsx
function MedicationDetails({ medicationId }) {
  const [medication, setMedication] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    // Reset state when medicationId changes
    setIsLoading(true);
    setError(null);
    
    // Fetch data
    async function fetchMedication() {
      try {
        const response = await fetch(`/api/medications/${medicationId}`);
        if (!response.ok) throw new Error('Failed to fetch');
        const data = await response.json();
        setMedication(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }
    
    fetchMedication();
  }, [medicationId]); // Re-run when medicationId changes
  
  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;
  if (!medication) return null;
  
  return (
    <View>
      <Text>{medication.name}</Text>
      <Text>{medication.dosage}</Text>
      {/* Additional medication details */}
    </View>
  );
}
```

#### 2. Subscriptions

```jsx
function MedicationReminder({ patientId }) {
  const [reminders, setReminders] = useState([]);
  
  useEffect(() => {
    // Set up subscription
    const subscription = ReminderService.subscribe(patientId, (newReminders) => {
      setReminders(newReminders);
    });
    
    // Clean up subscription on unmount or when patientId changes
    return () => {
      subscription.unsubscribe();
    };
  }, [patientId]);
  
  // Component implementation
}
```

#### 3. Timers

```jsx
function MedicationTimer({ duration, onComplete }) {
  const [timeLeft, setTimeLeft] = useState(duration);
  
  useEffect(() => {
    // Don't start if duration is invalid
    if (duration <= 0) return;
    
    // Reset timer when duration changes
    setTimeLeft(duration);
    
    // Set up interval
    const intervalId = setInterval(() => {
      setTimeLeft(prevTime => {
        if (prevTime <= 1) {
          clearInterval(intervalId);
          onComplete();
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);
    
    // Clean up interval on unmount or when duration changes
    return () => clearInterval(intervalId);
  }, [duration, onComplete]);
  
  // Component implementation
}
```

#### 4. DOM Manipulation (React Native: Native APIs)

In React Native, instead of manipulating the DOM, you might interact with native APIs:

```jsx
function ScreenBrightness() {
  const [brightness, setBrightness] = useState(0.5);
  
  useEffect(() => {
    // Set device brightness when component mounts or brightness changes
    Brightness.setBrightnessAsync(brightness);
    
    // Reset brightness on unmount
    return () => {
      Brightness.setBrightnessAsync(0.5); // Default brightness
    };
  }, [brightness]);
  
  // Component implementation
}
```

### Effect Cleanup

The cleanup function (returned from an effect) is crucial for preventing memory leaks and removing resources that should not persist:

1. **When cleanup runs**:
   - Before the component unmounts
   - Before the effect runs again (if it has dependencies)

2. **What should be cleaned up**:
   - Subscriptions
   - Timers
   - Event listeners
   - Connections to external APIs

```jsx
useEffect(() => {
  // Set up resource
  const subscription = someAPI.subscribe();
  
  // Clean up
  return () => {
    subscription.unsubscribe();
  };
}, [dependency]);
```

> 💡 **Deep Dive**: React's class component lifecycle methods like `componentDidMount` and `componentDidUpdate` always run separately. In contrast, `useEffect` with dependencies can conceptually replace both, but runs after the render is committed to the screen. This makes the rendered output and effects more predictable.

## Cross-Component State with Context API

For data that needs to be accessible by many components at different levels, props passing ("prop drilling") can become cumbersome. The Context API provides a way to share state across the component tree without explicitly passing props.

### Creating and Using Context

```jsx
import React, { createContext, useState, useContext } from 'react';

// 1. Create a context with a default value
const UserContext = createContext(null);

// 2. Create a provider component
function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  
  const login = (userData) => {
    setUser(userData);
  };
  
  const logout = () => {
    setUser(null);
  };
  
  // The value prop contains the data and functions to be shared
  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
}

// 3. Create a custom hook for consuming the context
function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}

// 4. Use the context in components
function ProfileScreen() {
  const { user, logout } = useUser();
  
  if (!user) {
    return <LoginScreen />;
  }
  
  return (
    <View>
      <Text>Welcome, {user.name}</Text>
      <Button title="Logout" onPress={logout} />
    </View>
  );
}

// 5. Wrap your app with the provider
function App() {
  return (
    <UserProvider>
      <NavigationContainer>
        {/* App components */}
      </NavigationContainer>
    </UserProvider>
  );
}
```

### When to Use Context

Context is ideal for:

- User authentication state
- Theme settings
- Language preferences
- Feature flags
- Other global application state

However, context isn't always the best solution:

- **Performance**: Context causes all components consuming it to re-render when the context value changes
- **Component Reusability**: Components that use context are tightly coupled to that context
- **Testing**: Components that rely on context require more setup in tests

For large-scale state management, you might want to consider libraries like Redux or MobX, which we'll cover in a later module.

> 🔄 **For Android Developers**: Context in React is conceptually similar to dependency injection patterns but for UI state. It's somewhat comparable to using a shared ViewModel at the activity level.

> 🔄 **For iOS Developers**: Context is similar to SwiftUI's EnvironmentObject, allowing data to be passed through the view hierarchy without manually passing props.

## Performance Optimization with Additional Hooks

React provides several hooks to optimize performance in functional components:

### useRef

The `useRef` hook creates a mutable reference that persists across renders without causing re-renders when changed:

```jsx
function StopWatch() {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef(null);
  
  // Start the stopwatch
  const start = () => {
    if (isRunning) return;
    
    setIsRunning(true);
    intervalRef.current = setInterval(() => {
      setTime(prevTime => prevTime + 1);
    }, 1000);
  };
  
  // Stop the stopwatch
  const stop = () => {
    if (!isRunning) return;
    
    clearInterval(intervalRef.current);
    intervalRef.current = null;
    setIsRunning(false);
  };
  
  // Clean up on unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);
  
  // Component implementation
}
```

Common uses for `useRef`:
- Storing timer IDs
- Accessing DOM elements in React or native components in React Native
- Keeping track of previous values
- Storing mutable values that don't affect rendering

### useMemo

The `useMemo` hook memoizes expensive calculations to avoid recomputing them on every render:

```jsx
function MedicationAnalytics({ medications }) {
  // This expensive calculation only runs when medications change
  const analytics = useMemo(() => {
    console.log('Computing analytics...');
    
    return {
      total: medications.length,
      active: medications.filter(med => med.isActive).length,
      expired: medications.filter(med => new Date(med.expiryDate) < new Date()).length,
      byCategory: medications.reduce((acc, med) => {
        acc[med.category] = (acc[med.category] || 0) + 1;
        return acc;
      }, {})
    };
  }, [medications]); // Only recalculate when medications change
  
  return (
    <View>
      <Text>Total: {analytics.total}</Text>
      <Text>Active: {analytics.active}</Text>
      <Text>Expired: {analytics.expired}</Text>
      {/* More analytics */}
    </View>
  );
}
```

### useCallback

The `useCallback` hook returns a memoized version of a callback function that only changes when its dependencies change:

```jsx
function MedicationList({ medications, onMedicationSelect }) {
  // This callback is stable across renders as long as onMedicationSelect doesn't change
  const handleSelect = useCallback((medication) => {
    console.log(`Selected ${medication.name}`);
    onMedicationSelect(medication);
  }, [onMedicationSelect]);
  
  return (
    <FlatList
      data={medications}
      keyExtractor={item => item.id}
      renderItem={({ item }) => (
        <MedicationItem
          medication={item}
          onSelect={() => handleSelect(item)}
        />
      )}
    />
  );
}
```

`useCallback` is especially important when:
- Passing callbacks to optimized child components that rely on reference equality
- Defining event handlers in components that render frequently
- Including the function in a dependency array of another hook

> 💡 **Deep Dive**: Both `useMemo` and `useCallback` are optimizations that help prevent unnecessary re-renders and recalculations. However, they come with their own overhead, so they should only be used when there's a measurable performance benefit. Don't optimize prematurely!

## Custom Hooks

One of the most powerful features of hooks is the ability to extract component logic into reusable functions called custom hooks:

```jsx
// Custom hook for managing form state
function useForm(initialValues) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  
  const handleChange = (field, value) => {
    setValues(prev => ({ ...prev, [field]: value }));
  };
  
  const handleBlur = (field) => {
    setTouched(prev => ({ ...prev, [field]: true }));
  };
  
  const reset = () => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
  };
  
  return {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    reset
  };
}

// Using the custom hook
function MedicationForm({ onSubmit }) {
  const form = useForm({
    name: '',
    dosage: '',
    schedule: 'daily'
  });
  
  const handleSubmit = () => {
    // Validate form
    const newErrors = {};
    if (!form.values.name) newErrors.name = 'Name is required';
    if (!form.values.dosage) newErrors.dosage = 'Dosage is required';
    
    if (Object.keys(newErrors).length > 0) {
      form.setErrors(newErrors);
      return;
    }
    
    onSubmit(form.values);
    form.reset();
  };
  
  return (
    <View>
      <TextInput
        value={form.values.name}
        onChangeText={(text) => form.handleChange('name', text)}
        onBlur={() => form.handleBlur('name')}
        placeholder="Medication Name"
      />
      {form.touched.name && form.errors.name && (
        <Text style={styles.error}>{form.errors.name}</Text>
      )}
      
      {/* Other form fields */}
      
      <Button title="Submit" onPress={handleSubmit} />
    </View>
  );
}
```

Benefits of custom hooks:
- **Reusability**: Extract and share logic between components
- **Composability**: Combine multiple hooks into a single custom hook
- **Abstraction**: Hide complex implementation details
- **Testing**: Test hooks independently from components

## Functional Component Lifecycle vs. Class Component Lifecycle

To fully understand the component lifecycle in functional components, it's helpful to compare with class components:

| Class Component Method | Functional Component Equivalent |
|------------------------|--------------------------------|
| `constructor` | `useState` initializer |
| `componentDidMount` | `useEffect(() => {}, [])` |
| `componentDidUpdate` | `useEffect(() => {}, [dependencies])` |
| `componentWillUnmount` | `useEffect(() => { return () => {} }, [])` |
| `shouldComponentUpdate` | `React.memo` and dependency arrays |
| `getDerivedStateFromProps` | Compute values during render |
| `getSnapshotBeforeUpdate` | No direct equivalent (rarely needed) |
| `componentDidCatch` | Error boundaries (still class components) |

> 🔍 **Instructor Note**: The hook-based approach simplifies the mental model by focusing on "what" side effects should happen rather than "when" they should happen in the lifecycle.

## Lifecycle and Effects in React Native

The lifecycle and effects concepts are identical between React for the web and React Native. However, in React Native, you'll often use effects for platform-specific concerns:

- **AppState monitoring**: Track when the app moves to the background or foreground
- **Geolocation updates**: Subscribe to location changes
- **Push notifications**: Set up notification handlers
- **Hardware APIs**: Interact with camera, accelerometer, etc.
- **Navigation events**: Listen for screen focus/blur events

Example with AppState:

```jsx
import React, { useState, useEffect } from 'react';
import { View, Text, AppState } from 'react-native';

function AppStateMonitor() {
  const [appState, setAppState] = useState(AppState.currentState);
  
  useEffect(() => {
    // Set up AppState subscription
    const subscription = AppState.addEventListener('change', nextAppState => {
      console.log(`App state changed from ${appState} to ${nextAppState}`);
      setAppState(nextAppState);
    });
    
    // Clean up on unmount
    return () => {
      subscription.remove();
    };
  }, [appState]);
  
  return (
    <View>
      <Text>Current state: {appState}</Text>
    </View>
  );
}
```

> 🔄 **For Android Developers**: AppState monitoring is similar to handling lifecycle callbacks like onPause/onResume in Activities, but with a reactive approach.

> 🔄 **For iOS Developers**: This is similar to responding to applicationDidBecomeActive and applicationWillResignActive notifications in AppDelegate.

## Best Practices for Effects

1. **Keep effects focused**:
   - Each effect should have a single responsibility
   - Split unrelated logic into separate effects

2. **Avoid race conditions**:
   - Use cleanup functions to handle component unmounts during async operations
   - Consider using a flag to track component mount state

   ```jsx
   useEffect(() => {
     let isMounted = true;
     
     fetchData().then(data => {
       if (isMounted) {
         setData(data);
       }
     });
     
     return () => {
       isMounted = false;
     };
   }, []);
   ```

3. **Be careful with effect dependencies**:
   - Include all values from component scope used in the effect
   - Consider restructuring code to avoid dependency loops
   - Use the ESLint `exhaustive-deps` rule

4. **Avoid unnecessary effects**:
   - Compute values during render when possible
   - Don't use effects for state updates that could be done during render
   
   ```jsx
   // Bad - unnecessary effect
   const [fullName, setFullName] = useState('');
   useEffect(() => {
     setFullName(`${firstName} ${lastName}`);
   }, [firstName, lastName]);
   
   // Good - compute during render
   const fullName = `${firstName} ${lastName}`;
   ```

5. **Handle cleanup properly**:
   - Always clean up subscriptions, timers, listeners
   - Test component unmounting scenarios

> 🚀 **Self-Led Learners**: Build a component that demonstrates multiple lifecycle stages, such as a medication reminder that fetches data on mount, updates a timer, and cleans up resources on unmount.

## Common Mistakes with useEffect

1. **Missing dependencies**:
   ```jsx
   // Incorrect - missing 'count' dependency
   useEffect(() => {
     const id = setInterval(() => {
       setCount(count + 1);
     }, 1000);
     return () => clearInterval(id);
   }, []); // This will always use the initial value of count
   
   // Correct
   useEffect(() => {
     const id = setInterval(() => {
       setCount(count + 1);
     }, 1000);
     return () => clearInterval(id);
   }, [count]);
   
   // Even better - using functional update
   useEffect(() => {
     const id = setInterval(() => {
       setCount(c => c + 1); // No dependency needed
     }, 1000);
     return () => clearInterval(id);
   }, []);
   ```

2. **Infinite loops**:
   ```jsx
   // Will cause infinite loop - effect changes dependency, causing re-render
   useEffect(() => {
     setData(processData(data));
   }, [data]);
   ```

3. **Unnecessary effects**:
   ```jsx
   // Unnecessary - derived value doesn't need an effect
   const [items, setItems] = useState([]);
   const [itemCount, setItemCount] = useState(0);
   
   useEffect(() => {
     setItemCount(items.length);
   }, [items]);
   
   // Better - compute during render
   const itemCount = items.length;
   ```

4. **Inconsistent cleanup**:
   ```jsx
   // Inconsistent cleanup - resources might leak
   useEffect(() => {
     const subscription = subscribe();
     
     if (someCondition) {
       return () => subscription.unsubscribe();
     }
     // Missing else branch with cleanup
   }, [someCondition]);
   
   // Better - consistent cleanup
   useEffect(() => {
     if (!someCondition) return;
     
     const subscription = subscribe();
     return () => subscription.unsubscribe();
   }, [someCondition]);
   ```
