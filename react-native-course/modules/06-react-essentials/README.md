# Module 6: React Essentials

<div class="instructor-led">Instructor-Led</div>
<div class="self-led">Self-Led</div>
<div class="asynchronous">Asynchronous</div>

Note: Welcome to Module 6: React Essentials. This module covers the core concepts of React that are essential for React Native development. Remember to tailor your presentation based on your audience's background.

---

## Goals

By the end of this module, you will be able to:

- Understand React's component-based architecture
- Create functional components with JSX
- Manage component data with props and state
- Implement component lifecycle methods and hooks
- Use Context API for state management
- Apply React patterns in React Native apps

Note: Emphasize that these skills will directly transfer to their React Native development work.

---

## Prerequisites

- JavaScript Essentials (Module 4)
- TypeScript Essentials (Module 5)

<div class="ios-dev">If you come from iOS development, you'll find parallels between React components and UIKit views.</div>

<div class="android-dev">If you come from Android development, you'll find similarities between React components and Android fragments/views.</div>

<div class="react-dev">If you're already familiar with React for web, focus on the differences in React Native.</div>

<div class="angular-dev">If you're coming from Angular, pay attention to React's one-way data flow versus Angular's two-way binding.</div>

Note: Take a moment to gauge your audience's background and experience level. Adjust your emphasis accordingly.

---

# 1. Introduction to React

---

## What is React?

- A JavaScript library for building user interfaces
- Created by Facebook (Meta) in 2013
- Based on component-based architecture
- Uses a virtual DOM for efficient rendering

<!-- slide: data-visibility="documentation-only" -->
React is a declarative, efficient, and flexible JavaScript library for building user interfaces. It lets you compose complex UIs from small and isolated pieces of code called "components". These components manage their own state and can be composed to make complex UIs.

Note: React's approach revolutionized UI development by focusing on a component-based architecture rather than template-based approaches.

--

## React vs React Native

| React | React Native |
|-------|--------------|
| Renders to the browser DOM | Renders to native platform UIs |
| Uses HTML and CSS | Uses native components (View, Text, etc.) |
| Web-specific APIs | Mobile-specific APIs |
| `react-dom` for rendering | `react-native` for rendering |

Both share:
- Component-based architecture
- JSX syntax
- React core concepts (props, state, context)

<!-- slide: data-visibility="documentation-only" -->
While React and React Native share the same core principles, React Native enables developers to create native mobile applications using React's declarative UI paradigm. Instead of rendering to the browser's DOM, React Native renders to native UI components, creating a truly native experience rather than a web view.

Note: Emphasize that learning React fundamentals will directly benefit React Native development, as the core concepts remain the same.

--

## React Philosophy

- **Declarative**: Tell React what you want, not how to do it
- **Component-Based**: Build encapsulated components that manage their own state
- **Learn Once, Write Anywhere**: Apply the same principles across platforms

<div class="platform-specific">
<div class="ios-dev">For iOS developers: Think of React components like reusable UIViews with their own state management.</div>
<div class="android-dev">For Android developers: Components are similar to Fragments but with simpler lifecycle and state management.</div>
<div class="angular-dev">For Angular developers: Components are similar but with one-way data flow instead of two-way binding.</div>
</div>

Note: The "Learn Once, Write Anywhere" philosophy is particularly relevant for React Native, as the concepts transfer across platforms.

---

# 2. Components & JSX

---

## Components: The Building Blocks

Components are reusable, self-contained pieces of code that:

- Return what should appear on the screen
- Can be nested inside other components
- Maintain their own internal state
- Can be reused throughout your application

```tsx
// A simple component in React Native
const Greeting = () => {
  return <Text>Welcome to PharmacyRx!</Text>;
};
```

Note: Components are the foundation of React. Make sure everyone understands this concept before moving on.

--

## Types of Components

**Functional Components** (Preferred)
```tsx
const MedicationItem = (props: MedicationProps) => {
  return <Text>{props.name}</Text>;
};
```

**Class Components** (Legacy)
```tsx
class MedicationItem extends React.Component<MedicationProps> {
  render() {
    return <Text>{this.props.name}</Text>;
  }
}
```

<div class="note">
Modern React primarily uses functional components with hooks. Class components are shown for context but should be avoided in new development.
</div>

<!-- slide: data-visibility="documentation-only" -->
Since the introduction of Hooks in React 16.8, functional components have become the preferred way to write React components. They are more concise, easier to test, and make code reuse simpler through custom hooks.

Note: Emphasize that we will focus on functional components with hooks in this course, as they represent modern React development practices.

--

## Understanding JSX

JSX (JavaScript XML) is a syntax extension for JavaScript that looks similar to HTML.

```tsx
// JSX syntax
const element = <Text>Take medication twice daily</Text>;

// Compiles to
const element = React.createElement(
  Text,
  null,
  "Take medication twice daily"
);
```

JSX allows you to:
- Write HTML-like code in JavaScript
- Embed expressions with `{}`
- Include components within other components

Note: JSX might look strange at first, but it becomes intuitive quickly. It's helpful to understand what's happening under the hood.

--

## JSX Rules

1. All tags must be closed (self-closing or with closing tag)
2. Components must return a single root element
3. Use camelCase for attributes (className instead of class)
4. JavaScript expressions go inside curly braces `{}`
5. Comments inside JSX use `{/* comment */}`

```tsx
const MedicationDetail = (props: { name: string; dosage: string }) => {
  return (
    <View style={styles.container}>
      {/* This is a JSX comment */}
      <Text style={styles.name}>{props.name}</Text>
      <Text>Dosage: {props.dosage}</Text>
    </View>
  );
};
```

Note: Many syntax errors in React come from violating these JSX rules. Point out the differences from HTML.

--

## React Native Core Components

React Native provides built-in components that map to native UI elements:

| React Native | iOS | Android | Web Analog |
|--------------|-----|---------|------------|
| `<View>` | `UIView` | `android.view` | `<div>` |
| `<Text>` | `UITextView` | `TextView` | `<p>` |
| `<Image>` | `UIImageView` | `ImageView` | `<img>` |
| `<ScrollView>` | `UIScrollView` | `ScrollView` | `<div>` with overflow |
| `<TextInput>` | `UITextField` | `EditText` | `<input>` |
| `<Pressable>` | `UIButton` | `Button` | `<button>` |

<div class="platform-specific">
Unlike the web where you can use many HTML elements, React Native has a limited set of core components. Each maps to native platform UI components.
</div>

Note: React Native components are your building blocks. Understanding their native equivalents can help when debugging platform-specific issues.

--

## Exercise: Creating Basic Components

<div class="exercise">
  <h3>Exercise: Pharmacy Product Card</h3>
  
  <p>Create a basic component that displays a medication product card with:</p>
  <ul>
    <li>Medication name</li>
    <li>Dosage information</li>
    <li>A label indicating if it requires a prescription</li>
  </ul>
  
  <p>Use the following TypeScript interface:</p>
  
```tsx
interface MedicationProduct {
  id: string;
  name: string;
  dosage: string;
  requiresPrescription: boolean;
}

// Your component here
```

  <p>Time: 15 minutes</p>
  
  <p>Tip: Use View, Text, and styling to create a card-like appearance.</p>
</div>

Note: Walk around and help participants who may be struggling. This exercise tests their understanding of basic components, props, and conditional rendering.

---

# 3. Props & State

---

## Understanding Props

Props (properties):
- Pass data from parent to child component
- Are read-only (immutable)
- Enable component reusability and configuration
- Can include functions for child-to-parent communication

```tsx
// Parent component
const MedicationList = () => {
  return (
    <View>
      <MedicationItem 
        name="Amoxicillin" 
        dosage="500mg" 
        requiresPrescription={true} 
      />
      <MedicationItem 
        name="Ibuprofen" 
        dosage="200mg" 
        requiresPrescription={false} 
      />
    </View>
  );
};

// Child component
interface MedicationItemProps {
  name: string;
  dosage: string;
  requiresPrescription: boolean;
}

const MedicationItem = (props: MedicationItemProps) => {
  return (
    <View style={styles.item}>
      <Text style={styles.name}>{props.name}</Text>
      <Text>Dosage: {props.dosage}</Text>
      {props.requiresPrescription && (
        <Text style={styles.prescription}>Requires Prescription</Text>
      )}
    </View>
  );
};
```

<!-- slide: data-visibility="documentation-only" -->
Props are the mechanism for passing data from parent to child components in React. They are read-only, which enforces the one-way data flow that React advocates. This one-way flow makes applications more predictable and easier to debug.

Note: Props are similar to function parameters - they allow components to be configurable and reusable.

--

## Props Best Practices

1. Use TypeScript interfaces to define prop types
2. Provide default props when applicable
3. Destructure props for cleaner code
4. Consider using optional props for flexibility

```tsx
interface MedicationItemProps {
  name: string;
  dosage: string;
  requiresPrescription: boolean;
  onSelect?: () => void; // Optional prop
}

// With destructuring and default props
const MedicationItem = ({ 
  name, 
  dosage, 
  requiresPrescription, 
  onSelect = () => {} // Default value
}: MedicationItemProps) => {
  return (
    <Pressable style={styles.item} onPress={onSelect}>
      <Text style={styles.name}>{name}</Text>
      <Text>Dosage: {dosage}</Text>
      {requiresPrescription && (
        <Text style={styles.prescription}>Requires Prescription</Text>
      )}
    </Pressable>
  );
};
```

<div class="platform-specific">
<div class="ios-dev">For iOS developers: Props are similar to initializer parameters in Swift.</div>
<div class="android-dev">For Android developers: Props are similar to constructor parameters or arguments passed to Fragment.newInstance().</div>
</div>

Note: Good prop design makes components more reusable and self-documenting.

--

## Understanding State

State:
- Holds data that can change over time
- Is managed within a component
- Causes component to re-render when updated
- Should be kept minimal and focused

```tsx
import React, { useState } from 'react';
import { View, Text, Button } from 'react-native';

const Counter = () => {
  // State declaration with initial value
  const [count, setCount] = useState(0);
  
  return (
    <View>
      <Text>Pills remaining: {count}</Text>
      <Button 
        title="Take pill" 
        onPress={() => setCount(count - 1)} 
      />
      <Button 
        title="Refill" 
        onPress={() => setCount(30)} 
      />
    </View>
  );
};
```

<!-- slide: data-visibility="documentation-only" -->
While props are passed to a component from its parent, state is managed internally within the component itself. State represents values that can change over time, typically in response to user interactions or network responses. When state changes, React re-renders the component to reflect those changes.

Note: The difference between props and state can be summarized as: "Props are passed to the component, state is managed within the component."

--

## State vs Props

| State | Props |
|-------|-------|
| Internal to a component | Passed from parent |
| Can be changed by the component | Read-only (immutable) |
| Use `useState` hook | Received as parameters |
| Causes re-render when changed | New props can cause re-render |
| Should contain minimal data | Can contain callbacks for child-to-parent communication |

<div class="warning">
State should never be modified directly. Always use the setter function provided by useState.

❌ `count = count + 1` 
✅ `setCount(count + 1)`
</div>

<div class="platform-specific">
<div class="ios-dev">For iOS developers: State is similar to properties that trigger view updates when changed.</div>
<div class="android-dev">For Android developers: State is similar to LiveData or properties that trigger UI updates.</div>
<div class="angular-dev">For Angular developers: Unlike two-way binding, React state changes must be handled explicitly.</div>
</div>

Note: Many React bugs are caused by direct state mutations. Emphasize the importance of using state setters.

--

## Lifting State Up

When multiple components need to share state:
- Move the state to their closest common ancestor
- Pass state down as props
- Pass update functions down as props

```tsx
const MedicationTracker = () => {
  // State is lifted to parent component
  const [takenToday, setTakenToday] = useState(false);
  
  return (
    <View>
      <MedicationStatus isTaken={takenToday} />
      <MedicationActions 
        isTaken={takenToday}
        onMedicationTaken={() => setTakenToday(true)}
        onReset={() => setTakenToday(false)}
      />
    </View>
  );
};

const MedicationStatus = ({ isTaken }: { isTaken: boolean }) => (
  <Text>
    Status: {isTaken ? 'Medication taken' : 'Medication due'}
  </Text>
);

interface ActionProps {
  isTaken: boolean;
  onMedicationTaken: () => void;
  onReset: () => void;
}

const MedicationActions = ({ 
  isTaken, 
  onMedicationTaken, 
  onReset 
}: ActionProps) => (
  <View>
    <Button 
      title="Mark as taken" 
      disabled={isTaken}
      onPress={onMedicationTaken} 
    />
    <Button 
      title="Reset for tomorrow" 
      disabled={!isTaken}
      onPress={onReset} 
    />
  </View>
);
```

<!-- slide: data-visibility="documentation-only" -->
"Lifting state up" is a common pattern in React for sharing state between components. Instead of trying to sync state between different components, we move the state up to their closest common parent and pass it down through props. This maintains the one-way data flow that React prefers.

Note: This pattern is crucial for maintaining data consistency across components. It's a fundamental pattern in React state management.

--

## Exercise: Props and State

<div class="exercise">
  <h3>Exercise: Medication Tracker</h3>
  
  <p>Create a medication tracker component that:</p>
  <ul>
    <li>Displays a list of medications (from props)</li>
    <li>Allows marking medications as taken (state)</li>
    <li>Shows a count of taken vs. total medications</li>
  </ul>
  
  <p>Use the following interface:</p>
  
```tsx
interface Medication {
  id: string;
  name: string;
  timesPerDay: number;
}

interface MedicationTrackerProps {
  medications: Medication[];
}

// Your component(s) here
```

  <p>Time: 20 minutes</p>
  
  <p>Hint: Consider using useState to track which medications have been taken.</p>
</div>

Note: This exercise tests their understanding of passing data through props and managing state for user interactions.

---

# 4. Component Lifecycle

---

## Understanding Component Lifecycle

Every React component goes through a lifecycle:

1. **Mounting**: Component is created and inserted into the DOM
2. **Updating**: Component re-renders due to changes in props or state
3. **Unmounting**: Component is removed from the DOM

<div class="note">
In class components, lifecycle was managed through methods like componentDidMount, componentDidUpdate, etc. In modern React, we use hooks to handle lifecycle events.
</div>

<!-- slide: data-visibility="documentation-only" -->
Understanding the component lifecycle is essential for managing side effects, like data fetching, subscriptions, or manually changing the DOM. With functional components, we use hooks to tap into these lifecycle events rather than the class lifecycle methods.

Note: While we focus on hooks for lifecycle management, understanding the concept of the lifecycle is still important.

--

## Lifecycle with Hooks

The `useEffect` hook handles lifecycle events in functional components:

```tsx
import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';

const MedicationReminder = ({ medicationName }: { medicationName: string }) => {
  const [timeRemaining, setTimeRemaining] = useState(60);
  
  // Similar to componentDidMount and componentDidUpdate
  useEffect(() => {
    // Set up timer when component mounts
    const timerId = setInterval(() => {
      setTimeRemaining(prevTime => {
        if (prevTime <= 1) {
          clearInterval(timerId);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);
    
    // Cleanup when component unmounts (similar to componentWillUnmount)
    return () => clearInterval(timerId);
  }, []); // Empty dependency array means this runs once on mount
  
  return (
    <View>
      <Text>Remember to take {medicationName}</Text>
      <Text>Time remaining: {timeRemaining}s</Text>
    </View>
  );
};
```

Note: useEffect consolidates what would previously be spread across multiple lifecycle methods. The dependency array is crucial for controlling when the effect runs.

--

## useEffect and Dependencies

The dependency array controls when the effect runs:

```tsx
// Runs once on mount (empty dependencies)
useEffect(() => {
  // Effect code...
  return () => {/* cleanup */};
}, []);

// Runs on mount and when medication changes
useEffect(() => {
  // Effect code...
  return () => {/* cleanup */};
}, [medication]);

// Runs on EVERY render (no dependency array)
useEffect(() => {
  // Effect code...
});
```

<div class="warning">
Missing dependencies can cause stale closures and bugs. React's linter rule will warn you about missing dependencies.
</div>

<!-- slide: data-visibility="documentation-only" -->
The dependency array is a key concept with useEffect. It tells React when to re-run the effect. If any value in the dependency array changes, the effect will run again. An empty array means "run once on mount," while no array means "run on every render."

Note: The dependency array is a common source of bugs in React. Always be mindful of what dependencies your effect needs.

--

## Common useEffect Use Cases

1. **Data fetching**
```tsx
useEffect(() => {
  const fetchMedications = async () => {
    const response = await fetch('/api/medications');
    const data = await response.json();
    setMedications(data);
  };
  
  fetchMedications();
}, []); // Fetch once when component mounts
```

2. **Subscriptions**
```tsx
useEffect(() => {
  const subscription = medicationService.subscribe(
    userId,
    (data) => setReminders(data)
  );
  
  return () => subscription.unsubscribe();
}, [userId]); // Re-subscribe when userId changes
```

3. **DOM/native UI manipulations**
```tsx
useEffect(() => {
  if (isActive) {
    // Highlight element, animate, etc.
  }
  
  return () => {/* cleanup */};
}, [isActive]); // Run when isActive changes
```

<div class="platform-specific">
<div class="ios-dev">For iOS developers: useEffect is similar to viewDidAppear, viewDidUpdate, and viewWillDisappear combined.</div>
<div class="android-dev">For Android developers: useEffect is similar to onStart, onResume, and onDestroy lifecycle methods.</div>
</div>

Note: These patterns represent the most common use cases for useEffect in React applications.

---

# 5. Hooks

---

## Introduction to Hooks

Hooks allow you to use state and other React features in functional components:

- Introduced in React 16.8 (2019)
- Enable stateful logic in functional components
- Allow reuse of stateful logic without class components
- Must follow the Rules of Hooks

<div class="note">
Hooks solved many issues with class components including the "this" binding problem, wrapper hell from HOCs, and complex lifecycle methods.
</div>

<!-- slide: data-visibility="documentation-only" -->
Hooks revolutionized how we write React components. Before hooks, you needed to use class components to access state and lifecycle methods. Hooks allow functional components to use these features, resulting in more concise, readable code that's easier to test and maintain.

Note: Hooks represent a fundamental shift in React development. Most modern React code is written with hooks.

--

## Core Hooks

1. **useState**: Adds state to functional components
```tsx
const [count, setCount] = useState(0);
```

2. **useEffect**: Handles side effects and lifecycle
```tsx
useEffect(() => {
  document.title = `Count: ${count}`;
}, [count]);
```

3. **useContext**: Accesses context values
```tsx
const theme = useContext(ThemeContext);
```

4. **useReducer**: State management for complex state logic
```tsx
const [state, dispatch] = useReducer(reducer, initialState);
```

5. **useRef**: Maintains mutable values between renders
```tsx
const inputRef = useRef(null);
```

Note: These core hooks form the foundation for most React component logic.

--

## useState vs useReducer

**useState**: For simple state
```tsx
const [count, setCount] = useState(0);

// Usage
setCount(count + 1);
setCount(prevCount => prevCount + 1);
```

**useReducer**: For complex state logic
```tsx
const initialState = { count: 0, lastUpdated: null };

function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return { 
        count: state.count + 1, 
        lastUpdated: new Date() 
      };
    case 'decrement':
      return { 
        count: state.count - 1, 
        lastUpdated: new Date() 
      };
    default:
      throw new Error();
  }
}

const [state, dispatch] = useReducer(reducer, initialState);

// Usage
dispatch({ type: 'increment' });
```

<div class="platform-specific">
<div class="react-dev">For React developers: useReducer is a great way to transition from Redux patterns to hooks-based state management.</div>
<div class="angular-dev">For Angular developers: useReducer is similar to the reducer pattern in NgRx.</div>
</div>

Note: When state logic becomes complex or multiple values are tightly related, useReducer often provides a more maintainable solution than multiple useState calls.

--

## useRef and Its Uses

The useRef hook:
- Creates a mutable object with a `.current` property
- Persists values between renders
- Can refer to DOM elements directly
- Does NOT trigger re-renders when changed

```tsx
// Storing mutable values
function StopwatchComponent() {
  const [time, setTime] = useState(0);
  const intervalRef = useRef(null);
  
  const startTimer = () => {
    intervalRef.current = setInterval(() => {
      setTime(t => t + 1);
    }, 1000);
  };
  
  const stopTimer = () => {
    clearInterval(intervalRef.current);
  };
  
  return (/* component JSX */);
}

// Accessing DOM/native elements
function TextInputWithFocus() {
  const inputRef = useRef(null);
  
  const focusInput = () => {
    inputRef.current.focus();
  };
  
  return (
    <>
      <TextInput ref={inputRef} />
      <Button title="Focus Input" onPress={focusInput} />
    </>
  );
}
```

Note: useRef is a very versatile hook with many applications beyond just DOM references.

--

## Custom Hooks

Custom hooks allow you to:
- Extract reusable logic from components
- Share stateful logic between components
- Compose multiple hooks into one
- Encapsulate complex behavior

```tsx
// Custom hook for medication reminders
function useMedicationReminder(medicationId) {
  const [reminder, setReminder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    let isMounted = true;
    
    const fetchReminder = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/reminders/${medicationId}`);
        const data = await response.json();
        
        if (isMounted) {
          setReminder(data);
          setLoading(false);
        }
      } catch (err) {
        if (isMounted) {
          setError(err);
          setLoading(false);
        }
      }
    };
    
    fetchReminder();
    
    return () => {
      isMounted = false;
    };
  }, [medicationId]);
  
  return { reminder, loading, error };
}

// Usage in a component
function MedicationDetail({ medicationId }) {
  const { reminder, loading, error } = useMedicationReminder(medicationId);
  
  if (loading) return <Loading />;
  if (error) return <Error message={error.message} />;
  
  return (
    <View>
      <Text>Next reminder: {reminder.time}</Text>
    </View>
  );
}
```

<!-- slide: data-visibility="documentation-only" -->
Custom hooks are one of the most powerful features of React's hooks system. They allow you to extract and reuse stateful logic across components, making your code more modular and maintainable. By convention, custom hooks always start with "use" to signal that they follow the Rules of Hooks.

Note: Custom hooks are a key mechanism for code reuse in React. Encourage students to look for opportunities to extract reusable logic into custom hooks.

--

## Rules of Hooks

1. **Only call hooks at the top level**
   - Don't call hooks inside loops, conditions, or nested functions

```tsx
// ❌ Wrong: Hook inside condition
function Component() {
  const [name, setName] = useState('');
  
  if (name !== '') {
    useEffect(() => {
      // This will break
    }, []);
  }
}

// ✅ Correct: Condition inside hook
function Component() {
  const [name, setName] = useState('');
  
  useEffect(() => {
    if (name !== '') {
      // This is fine
    }
  }, [name]);
}
```

2. **Only call hooks from React functions**
   - Call hooks from React functional components
   - Call hooks from custom hooks (starting with "use")

<div class="warning">
Breaking the Rules of Hooks can lead to bugs and inconsistent behavior. React's linter plugin will warn you about violations.
</div>

Note: The Rules of Hooks are enforced to ensure hooks work correctly with React's component rendering model. They're not arbitrary restrictions.

--

## Exercise: Refactoring with Hooks

<div class="exercise">
  <h3>Exercise: Medication Timer with Hooks</h3>
  
  <p>Create a custom hook called useMedicationTimer that:</p>
  <ul>
    <li>Tracks time elapsed since a medication was taken</li>
    <li>Provides a function to reset the timer</li>
    <li>Returns the elapsed time and reset function</li>
  </ul>
  
```tsx
// Create this custom hook
function useMedicationTimer() {
  // Your code here
}

// Then use it in a component
function MedicationTimer({ medicationName }) {
  const { elapsedTime, resetTimer } = useMedicationTimer();
  
  return (
    <View>
      <Text>{medicationName}: {elapsedTime}s since last dose</Text>
      <Button title="Reset Timer" onPress={resetTimer} />
    </View>
  );
}
```

  <p>Time: 15 minutes</p>
  
  <p>Hint: Use useState and useEffect with an interval.</p>
</div>

Note: This exercise lets participants practice creating a custom hook that encapsulates timer functionality, making it reusable across components.

---

# 6. Context API

---

## What is Context?

Context provides a way to:
- Share data between components without prop drilling
- Access shared data anywhere in the component tree
- Create global state for specific parts of your app

<div class="platform-specific">
<div class="ios-dev">For iOS developers: Similar to environment objects in SwiftUI or singletons in UIKit.</div>
<div class="android-dev">For Android developers: Similar to dependency injection or application-level singletons.</div>
<div class="angular-dev">For Angular developers: Similar to services with dependency injection.</div>
</div>

<!-- slide: data-visibility="documentation-only" -->
Context solves the problem of "prop drilling" - passing props through multiple layers of components. It provides a way to share values like themes, user data, or other global state without explicitly passing props through every level of the component tree.

Note: Context is ideal for truly global concerns like themes, authentication, or localization. For component-specific state, props are still preferred.

--

## Creating and Using Context

Three steps to using Context:

1. **Create a context**
```tsx
// ThemeContext.tsx
import { createContext, useContext } from 'react';

interface ThemeContextType {
  primaryColor: string;
  textColor: string;
  isDark: boolean;
}

export const ThemeContext = createContext<ThemeContextType>({
  primaryColor: '#4285F4', // Default value
  textColor: '#000000',
  isDark: false
});

// Custom hook for using this context
export const useTheme = () => useContext(ThemeContext);
```

2. **Provide context value**
```tsx
// App.tsx
import { ThemeContext } from './ThemeContext';

const App = () => {
  const theme = {
    primaryColor: '#4285F4',
    textColor: '#000000',
    isDark: false
  };
  
  return (
    <ThemeContext.Provider value={theme}>
      <Navigation />
    </ThemeContext.Provider>
  );
};
```

3. **Consume context**
```tsx
// MedicationCard.tsx
import { useTheme } from './ThemeContext';

const MedicationCard = ({ name, dosage }) => {
  const theme = useTheme();
  
  return (
    <View style={{ backgroundColor: theme.primaryColor }}>
      <Text style={{ color: theme.textColor }}>{name}</Text>
      <Text style={{ color: theme.textColor }}>Dosage: {dosage}</Text>
    </View>
  );
};
```

Note: This pattern of creating a custom hook to access context (e.g., useTheme) is a common and recommended practice.

--

## Context with State

Combining Context with state management for dynamic updates:

```tsx
// ThemeContext.tsx
import { createContext, useContext, useState, ReactNode } from 'react';

interface ThemeContextType {
  primaryColor: string;
  textColor: string;
  isDark: boolean;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [isDark, setIsDark] = useState(false);
  
  const theme = {
    primaryColor: isDark ? '#121212' : '#4285F4',
    textColor: isDark ? '#FFFFFF' : '#000000',
    isDark,
    toggleTheme: () => setIsDark(!isDark)
  };
  
  return (
    <ThemeContext.Provider value={theme}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
```

Usage:
```tsx
// App.tsx
const App = () => (
  <ThemeProvider>
    <Navigation />
  </ThemeProvider>
);

// ThemeToggle.tsx
const ThemeToggle = () => {
  const { isDark, toggleTheme } = useTheme();
  
  return (
    <Button 
      title={isDark ? 'Switch to Light' : 'Switch to Dark'}
      onPress={toggleTheme}
    />
  );
};
```

Note: This pattern encapsulates both the state and its update logic within the context provider, making it self-contained.

--

## Context Best Practices

1. **Separate contexts by concern**
   - Create different contexts for unrelated data (theme, auth, etc.)
   - Prevents unnecessary re-renders

2. **Optimize for performance**
   - Split context if parts of it update at different frequencies
   - Use React.memo for components that consume context

3. **Provide defaults that make sense**
   - Context should have sensible default values
   - Makes testing components in isolation easier

4. **Create custom hooks for consuming context**
   - Encapsulates the useContext call
   - Provides better error handling and type safety

<div class="warning">
Context is not optimized for high-frequency updates. For complex state with frequent changes, consider other state management solutions like Zustand (covered in Module 10).
</div>

Note: Context is powerful but not a complete state management solution. It works best for relatively stable, app-wide settings.

--

## Exercise: Theme Context

<div class="exercise">
  <h3>Exercise: Pharmacy Theme Switcher</h3>
  
  <p>Create a theme context and provider that:</p>
  <ul>
    <li>Provides light and dark themes for a pharmacy app</li>
    <li>Includes a toggle function to switch between themes</li>
    <li>Demonstrates usage in at least two components</li>
  </ul>
  
  <p>Implement these files:</p>
  
```tsx
// 1. ThemeContext.tsx - Create context & provider

// 2. ThemedButton.tsx - Component that uses the theme

// 3. ThemedCard.tsx - Another component using the theme

// 4. App.tsx - Wrapper that uses the provider
```

  <p>Time: 20 minutes</p>
  
  <p>Hint: Define theme properties like primaryColor, backgroundColor, textColor.</p>
</div>

Note: This exercise helps participants understand how to create and use context for a common use case (theming).

---

# 7. React Patterns

---

## Component Composition

Composition is a powerful pattern for:
- Creating specialized components
- Avoiding prop drilling
- Making components more reusable

```tsx
// Generic Card component
const Card = ({ children }) => (
  <View style={styles.card}>{children}</View>
);

// Specialized component using composition
const MedicationCard = ({ name, dosage, instructions }) => (
  <Card>
    <Text style={styles.title}>{name}</Text>
    <Text>Dosage: {dosage}</Text>
    <Text>Instructions: {instructions}</Text>
  </Card>
);

// Usage
const App = () => (
  <View>
    <MedicationCard 
      name="Lisinopril"
      dosage="10mg daily"
      instructions="Take with food"
    />
  </View>
);
```

<div class="platform-specific">
<div class="react-dev">For React developers: This is similar to how you'd build composable components on the web.</div>
</div>

Note: Composition is one of the most powerful patterns in React. It allows for flexible, reusable component architectures.

--

## Component Composition with children

The `children` prop enables more flexible composition:

```tsx
// Components that accept and render children
const Section = ({ title, children }) => (
  <View style={styles.section}>
    <Text style={styles.sectionTitle}>{title}</Text>
    <View style={styles.sectionContent}>
      {children}
    </View>
  </View>
);

// Usage with nested components
const PrescriptionInfo = ({ prescription }) => (
  <Section title="Prescription Information">
    <Text>Doctor: {prescription.doctor}</Text>
    <Text>Date: {prescription.date}</Text>
    <Text>Refills: {prescription.refills}</Text>
    
    <Section title="Instructions">
      <Text>{prescription.instructions}</Text>
    </Section>
  </Section>
);
```

<!-- slide: data-visibility="documentation-only" -->
The `children` prop is a special prop in React that allows you to pass components as data to other components. This pattern enables you to create wrapper components that don't need to know the details of what they're rendering, making them more flexible and reusable.

Note: The children pattern is essential for creating flexible layouts and container components in React Native, similar to how you might use it in web development.

--

## Controlled vs Uncontrolled Components

**Controlled Components**: State managed by parent
```tsx
const MedicationForm = () => {
  const [name, setName] = useState('');
  
  return (
    <View>
      <TextInput
        value={name}
        onChangeText={setName}
        placeholder="Medication name"
      />
      <Text>Current input: {name}</Text>
    </View>
  );
};
```

**Uncontrolled Components**: State managed internally
```tsx
const UncontrolledForm = () => {
  const inputRef = useRef();
  
  const handleSubmit = () => {
    // Access the value when needed
    const name = inputRef.current.value;
    // Process the data...
  };
  
  return (
    <View>
      <TextInput
        ref={inputRef}
        defaultValue=""
        placeholder="Medication name"
      />
      <Button title="Submit" onPress={handleSubmit} />
    </View>
  );
};
```

<div class="note">
In React Native, most form components are naturally controlled as they don't maintain their own internal state like browser inputs do.
</div>

Note: In most cases, controlled components are preferred in React Native as they provide more direct control over the component's behavior and state.

--

## Higher Order Components (HOCs)

HOCs are functions that:
- Take a component as input
- Return an enhanced component
- Add reusable functionality

```tsx
// HOC that adds loading state
function withLoading(WrappedComponent) {
  return function WithLoading(props) {
    const [isLoading, setIsLoading] = useState(false);
    
    const startLoading = () => setIsLoading(true);
    const stopLoading = () => setIsLoading(false);
    
    return (
      <WrappedComponent
        {...props}
        isLoading={isLoading}
        startLoading={startLoading}
        stopLoading={stopLoading}
      />
    );
  };
}

// Usage
const MedicationListWithLoading = withLoading(MedicationList);

// In a component
function App() {
  return <MedicationListWithLoading onRefresh={() => {
    // Fetch data
  }} />;
}
```

<div class="note">
While HOCs are still used in many React codebases, hooks often provide a cleaner, more composable solution for the same problems.
</div>

Note: HOCs are less common in modern React with the advent of hooks, but understanding them is still important as you'll encounter them in existing codebases.

--

## Hooks vs. HOCs vs. Render Props

These patterns solve similar problems but with different tradeoffs:

**Hooks**:
- More concise and composable
- No component nesting
- Clearer type inference
```tsx
function MedicationList() {
  const { data, loading, error } = useFetchMedications();
  // Render based on data, loading, error
}
```

**HOCs**:
- Wrap components with additional props
- Can be harder to compose
- May obscure component props
```tsx
const MedicationListWithData = withFetchMedications(MedicationList);
```

**Render Props**:
- Pass rendering logic via props
- Very flexible but can lead to nesting
```tsx
<FetchMedications>
  {(data, loading, error) => (
    // Render based on data, loading, error
  )}
</FetchMedications>
```

<div class="note">
Modern React favors hooks for most use cases, but all these patterns have valid applications.
</div>

Note: Understanding these different patterns helps developers choose the right tool for each situation, and read existing code that may use any of these approaches.

---

# Module 6 Challenge

---

## Pharmacy Inventory Management

<div class="challenge">
  <h3>Challenge: Pharmacy Inventory System</h3>
  
  <p>Create a pharmacy inventory management component that allows:</p>
  <ul>
    <li>Viewing a list of medications in the inventory</li>
    <li>Adding new medications to inventory</li>
    <li>Updating stock quantities</li>
    <li>Marking medications as low stock or out of stock</li>
    <li>Filtering/searching medications</li>
  </ul>
  
  <p>Requirements:</p>
  <ul>
    <li>Use TypeScript for all components</li>
    <li>Apply useReducer for inventory state management</li>
    <li>Create a custom hook for the inventory logic</li>
    <li>Implement Context API for theme (light/dark mode)</li>
    <li>Include at least one higher-order component</li>
  </ul>
  
  <p>Time: 45-60 minutes</p>
  
  <p>Hint: Start by defining your interfaces and state structure before implementing the components.</p>
</div>

Note: This challenge synthesizes all the major concepts from the module. It's designed to be challenging but achievable within the time frame. Encourage participants to plan before coding.

---

## Summary

In this module, we covered:

- React's component-based architecture
- JSX syntax and rendering
- Props and state management
- Component lifecycle and side effects with useEffect
- Hooks for state and side effects
- Context API for global state
- Common React patterns in React Native

<div class="note">
These React concepts form the foundation of React Native development. In the next module, we'll explore React Native-specific components and user input handling.
</div>

Note: Encourage participants to practice these concepts by building small components before moving on to the next module. The more comfortable they are with core React concepts, the easier React Native will be.

---

## Additional Resources

- [React Official Documentation](https://reactjs.org/docs/getting-started.html)
- [React Hooks API Reference](https://reactjs.org/docs/hooks-reference.html)
- [TypeScript React Cheatsheet](https://github.com/typescript-cheatsheets/react)
- [React Native - The Practical Guide](https://www.udemy.com/course/react-native-the-practical-guide/)
- [React Design Patterns and Best Practices](https://www.packtpub.com/product/react-design-patterns-and-best-practices-second-edition/9781786464538)

<div class="platform-specific">
<div class="ios-dev">For iOS developers: [React Native for iOS Developers](https://www.raywenderlich.com/485-react-native-tutorial-building-ios-apps-with-javascript)</div>
<div class="android-dev">For Android developers: [React Native for Android Developers](https://reactnative.dev/docs/android-building-from-source)</div>
</div>

Note: Encourage continued learning beyond the course materials. React is a deep subject with many nuances to master.

---

## Thank You!

Questions? Comments? Feedback?

<div class="instructor-led">For instructor-led sessions: Let's discuss and clarify any concepts before moving on.</div>

<div class="self-led">For self-led learners: Please reach out through the course channels if you have questions.</div>

Note: Take time to answer questions and ensure everyone is comfortable with the material before concluding the module.
