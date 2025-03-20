# Module 6: React Essentials

<div class="instructor-led">Instructor-Led</div>
<div class="self-led">Self-Led</div>
<div class="asynchronous">Asynchronous</div>

---

## Overview

This module introduces the core concepts of React, the foundation of React Native. We'll explore React's component-based architecture, JSX syntax, props, state, and lifecycle methods. Understanding these fundamentals is crucial for building effective React Native applications.

Note: Welcome to Module 6: React Essentials. This module is critical as it forms the foundation for everything we'll do in React Native. React's component-based architecture revolutionized frontend development by making UI creation more modular, reusable, and maintainable. Throughout this module, we'll build a solid understanding of React's core concepts, which directly transfer to React Native development. We'll start with the basics and progressively move to more advanced topics, ensuring you have a comprehensive understanding of React before we dive deeper into React Native-specific features in subsequent modules.

---

## Learning Objectives

By the end of this module, you will be able to:

- Understand React's component-based architecture and its advantages
- Create and use functional and class components with TypeScript
- Implement JSX syntax effectively in your components
- Pass and manage props between components
- Manage component state using useState and useReducer hooks
- Implement side effects using useEffect and other React hooks
- Apply React's rendering lifecycle to optimize performance

Note: These learning objectives outline what you'll master by the end of this module. React's component-based architecture is fundamental to modern web and mobile development, allowing us to build complex UIs from simple, reusable pieces. You'll learn to create both functional and class components, though we'll focus more on functional components with hooks as they're the modern approach. JSX is React's syntax extension that lets you write HTML-like code in JavaScript, making component creation intuitive. Props allow components to communicate with each other, while state management is crucial for handling dynamic data. The useEffect hook and other lifecycle methods help manage side effects like data fetching. Understanding React's rendering process will help you build performant applications. These concepts directly transfer to React Native development.

---

# Section 1: Introduction to React

---

## What is React?

- A JavaScript library for building user interfaces
- Created by Facebook (now Meta) in 2013
- Component-based architecture
- Virtual DOM for efficient rendering
- Declarative approach to UI development
- Powers many popular websites and applications

Note: React is a JavaScript library developed by Facebook in 2013 that has revolutionized how we build user interfaces. At its core, React introduces a component-based architecture where UIs are broken down into reusable, self-contained components. This modular approach makes applications easier to develop, maintain, and scale. React uses a Virtual DOM, which is a lightweight copy of the actual DOM. When state changes occur, React first updates this Virtual DOM, compares it with the previous version (a process called "diffing"), and then efficiently updates only the necessary parts of the actual DOM. This approach significantly improves performance compared to directly manipulating the DOM. React's declarative nature means developers describe what the UI should look like based on the current state, and React handles the DOM updates to match that description. This contrasts with imperative programming where you explicitly define each step to achieve the desired outcome.

---

## React vs React Native

| React | React Native |
|-------|--------------|
| For web applications | For mobile applications |
| Renders to HTML and browser DOM | Renders to native mobile components |
| Uses web-specific components (div, span, etc.) | Uses mobile-specific components (View, Text, etc.) |
| Accesses web APIs | Accesses native device features |
| Same core concepts (components, props, state) | Same core concepts (components, props, state) |

Note: Understanding the relationship between React and React Native is crucial. React is designed for web applications, rendering components to HTML elements in the browser's DOM. React Native, on the other hand, is a framework that uses React's principles but renders to native mobile components instead of HTML. While React uses web elements like divs and spans, React Native provides platform-specific components like View and Text that map to their native counterparts on iOS and Android. Despite these differences, both share the same fundamental concepts: component-based architecture, unidirectional data flow, and state management. This is why learning React first provides a solid foundation for React Native development. The knowledge you gain in this module about components, JSX, props, state, and lifecycle methods will directly transfer to React Native, with the main difference being the specific components and APIs you'll use.

---

## Why React?

- **Reusable Components**: Build encapsulated components that manage their own state
- **Efficient Updates**: Virtual DOM minimizes expensive DOM operations
- **Unidirectional Data Flow**: Makes code more predictable and easier to debug
- **Strong Community**: Large ecosystem of libraries, tools, and resources
- **Industry Adoption**: Widely used in production by major companies
- **Cross-platform Development**: Skills transfer to React Native

Note: React offers numerous advantages that have contributed to its widespread adoption. The component-based architecture promotes reusability, allowing developers to create self-contained, modular pieces that can be composed to build complex UIs. This approach significantly reduces code duplication and makes maintenance easier. The Virtual DOM implementation optimizes rendering by minimizing direct DOM manipulations, which are computationally expensive. React's unidirectional data flow means data flows in a single direction, making applications more predictable and easier to debug compared to two-way data binding approaches. The React ecosystem is vast, with countless libraries, tools, and resources available to solve common problems. Major companies like Facebook, Instagram, Netflix, and Airbnb use React in production, demonstrating its scalability and reliability. Perhaps most relevant to our course, the skills you learn with React directly transfer to React Native, making it an excellent investment of your time.

---

## React's Core Philosophy

- **Declarative**: Describe what you want, not how to achieve it
- **Component-Based**: Build encapsulated components that manage their state
- **Learn Once, Write Anywhere**: Apply the same principles across platforms
- **Virtual DOM**: Efficient updates through reconciliation
- **Unidirectional Data Flow**: Data flows down, events flow up

Note: React's core philosophy shapes how we approach development. The declarative paradigm means we describe the desired UI state, and React handles the DOM manipulations to achieve it. This contrasts with imperative approaches where developers manually manipulate the DOM. The component-based architecture encourages breaking UIs into independent, reusable pieces with well-defined interfaces. "Learn Once, Write Anywhere" reflects React's adaptability—once you understand React's principles, you can apply them across different platforms and environments, including React Native for mobile development. The Virtual DOM serves as an abstraction of the actual DOM, allowing React to perform efficient updates through its reconciliation algorithm. Unidirectional data flow means data passes down from parent to child components through props, while events flow up through callbacks. This predictable data flow makes applications easier to understand and debug, especially as they grow in complexity.

---

# Section 2: Components and JSX

---

## Components: The Building Blocks

Components are the core building blocks of React applications:

- **Reusable**: Create once, use many times
- **Composable**: Combine simple components to build complex UIs
- **Encapsulated**: Each component manages its own logic and rendering
- **Hierarchical**: Components can contain other components

Note: Components are the fundamental building blocks of React applications. They encapsulate pieces of the UI along with their behavior, making development more modular and maintainable. The reusability of components is a key advantage—once created, they can be used throughout your application or even across different projects. Components are highly composable, meaning you can combine simple components to create more complex ones, building up your UI like Lego blocks. This composability allows for a clean separation of concerns, with each component handling a specific part of the UI. Encapsulation means components contain both the visual elements (what users see) and the logic that controls their behavior. The hierarchical nature of components creates a tree-like structure, with parent components rendering child components, which may themselves contain other components. This component hierarchy mirrors the DOM structure and helps organize your application logically.

---

## Types of Components

React offers two main types of components:

### Class Components
```typescript
class Welcome extends React.Component<{ name: string }> {
  render() {
    return <h1>Hello, {this.props.name}</h1>;
  }
}
```

### Functional Components (Preferred)
```typescript
const Welcome = ({ name }: { name: string }) => {
  return <h1>Hello, {name}</h1>;
};
```

Note: React provides two ways to define components: class components and functional components. Class components are ES6 classes that extend React.Component and must include a render method that returns React elements. They were the primary way to create components that needed state management or lifecycle methods before React 16.8. Functional components are simpler JavaScript functions that accept props as an argument and return React elements. With the introduction of Hooks in React 16.8, functional components can now use state and other React features that were previously only available in class components. Today, functional components are the preferred approach due to their simplicity, better performance, and easier testing. They result in less boilerplate code and are more aligned with React's future direction. In this module, we'll focus primarily on functional components with Hooks, though we'll cover class components briefly for completeness and to help you understand legacy code you might encounter.

---

## JSX: JavaScript XML

JSX is a syntax extension for JavaScript that looks similar to HTML:

```typescript
const element = <h1>Hello, world!</h1>;
```

JSX gets transformed into JavaScript:

```typescript
const element = React.createElement(
  'h1',
  null,
  'Hello, world!'
);
```

Note: JSX (JavaScript XML) is a syntax extension for JavaScript that looks similar to HTML or XML but comes with the full power of JavaScript. It's not required for React development but is highly recommended as it makes the code more readable and intuitive. Behind the scenes, JSX is transformed into regular JavaScript function calls by tools like Babel during the build process. The JSX expression `<h1>Hello, world!</h1>` gets compiled to `React.createElement('h1', null, 'Hello, world!')`. This transformation happens at build time, not runtime, so there's no performance penalty. JSX allows you to describe what the UI should look like in a syntax familiar to many developers, while still leveraging JavaScript's expressiveness. This combination makes React component creation more intuitive and maintainable compared to manually creating elements with `React.createElement()`. Understanding that JSX is just syntactic sugar for function calls helps demystify how React works under the hood.

---

## JSX Rules and Syntax

```typescript
const MedicationCard = () => {
  const medicationName = "Lisinopril";
  const dosage = 10;
  
  return (
    <div className="medication-card">
      <h2>{medicationName}</h2>
      <p>Dosage: {dosage} mg</p>
      {dosage > 5 && <p>High dosage warning</p>}
    </div>
  );
};
```

Note: JSX comes with several important rules and syntax considerations that you need to understand to use it effectively. JSX expressions must have exactly one parent element—you can't return multiple elements side by side without wrapping them in a parent container. If you don't want to add an extra DOM node, you can use React Fragments (`<>...</>` or `<React.Fragment>...</React.Fragment>`). JSX uses `className` instead of `class` for CSS classes because `class` is a reserved keyword in JavaScript. Similarly, it uses `htmlFor` instead of `for` in label elements. Curly braces `{}` are used to embed JavaScript expressions within JSX, allowing you to incorporate dynamic values, calculations, or conditional rendering. In the example above, we're displaying the medication name and dosage dynamically, and conditionally rendering a warning message only when the dosage exceeds 5mg. JSX attributes use camelCase naming convention (e.g., `onClick` instead of `onclick`), following JavaScript conventions rather than HTML. Self-closing tags must include a slash (`<img />` rather than `<img>`). Understanding these rules will help you avoid common pitfalls when writing JSX.

---

## Embedding Expressions in JSX

JSX allows you to embed any JavaScript expression using curly braces:

```typescript
const MedicationCalculator = () => {
  const baseDosage = 5;
  const patientWeight = 70; // kg
  const dosagePerKg = 0.1;
  
  return (
    <div>
      <h2>Medication Dosage Calculator</h2>
      <p>Base dosage: {baseDosage} mg</p>
      <p>Patient weight: {patientWeight} kg</p>
      <p>Calculated dosage: {baseDosage + (patientWeight * dosagePerKg)} mg</p>
      <p>Status: {patientWeight > 100 ? 'Adjust dosage' : 'Standard dosage'}</p>
    </div>
  );
};
```

Note: One of JSX's most powerful features is the ability to embed JavaScript expressions within curly braces `{}`. This allows you to incorporate dynamic values and logic directly in your markup. You can include variables, function calls, arithmetic operations, object properties, and more. In the example, we're calculating a medication dosage based on patient weight and displaying it dynamically. The expression `baseDosage + (patientWeight * dosagePerKg)` is evaluated at render time to compute the appropriate dosage. We're also using a ternary operator `patientWeight > 100 ? 'Adjust dosage' : 'Standard dosage'` for conditional rendering, which is a common pattern in React. This ability to seamlessly blend JavaScript with markup makes JSX extremely flexible and expressive. It's important to note that only expressions are allowed inside curly braces, not statements like if/else or for loops. For more complex logic, you can use immediately-invoked function expressions (IIFEs) or extract the logic into separate functions. This embedding capability is what makes React's declarative approach so powerful.

---

## Conditional Rendering in JSX

React allows several approaches for conditional rendering:

```typescript
const MedicationStatus = ({ name, inStock, quantity }: 
  { name: string, inStock: boolean, quantity: number }) => {
  
  // If-else approach (outside JSX)
  let stockDisplay;
  if (inStock && quantity > 10) {
    stockDisplay = <span className="in-stock">Well Stocked</span>;
  } else if (inStock && quantity <= 10) {
    stockDisplay = <span className="low-stock">Low Stock</span>;
  } else {
    stockDisplay = <span className="out-of-stock">Out of Stock</span>;
  }
  
  return (
    <div className="medication-status">
      <h3>{name}</h3>
      
      {/* Ternary operator approach */}
      <p>Status: {inStock ? 'Available' : 'Unavailable'}</p>
      
      {/* Logical && operator approach */}
      {quantity < 5 && <p className="warning">Reorder soon!</p>}
      
      {/* Pre-determined element from above */}
      <p>Inventory: {stockDisplay}</p>
    </div>
  );
};
```

Note: Conditional rendering is a fundamental technique in React that allows you to create dynamic UIs that respond to changing data and user interactions. There are several approaches to implement conditional rendering, each with its own use cases. The if-else approach is used outside of JSX to pre-determine what will be rendered. This is useful for complex conditions that would be unwieldy inside JSX. The ternary operator (`condition ? true : false`) is perfect for simple inline conditions within JSX, such as toggling between two possible outputs. The logical AND operator (`&&`) is ideal for conditionally rendering an element only when a condition is true—if the condition is false, nothing is rendered. This is commonly used for "optional" elements like warning messages or badges. You can also use switch statements, object mappings, or immediately-invoked function expressions (IIFEs) for more complex conditional logic. When working with lists that might be empty, it's common to use the logical AND to conditionally render the list only when it has items. These conditional rendering techniques are essential for creating responsive, data-driven interfaces in React applications.

---

## Lists and Keys in JSX

Rendering lists in React requires a unique "key" prop for each item:

```typescript
const MedicationList = () => {
  const medications = [
    { id: 1, name: "Aspirin", dosage: "325mg" },
    { id: 2, name: "Lisinopril", dosage: "10mg" },
    { id: 3, name: "Metformin", dosage: "500mg" },
    { id: 4, name: "Atorvastatin", dosage: "20mg" }
  ];
  
  return (
    <div className="medication-list">
      <h2>Available Medications</h2>
      <ul>
        {medications.map(medication => (
          <li key={medication.id}>
            <strong>{medication.name}</strong> - {medication.dosage}
          </li>
        ))}
      </ul>
    </div>
  );
};
```

Note: Rendering lists is a common task in React applications, and it's typically done using the JavaScript `map()` method to transform an array of data into an array of JSX elements. When rendering lists, React requires a special "key" prop for each item to help it identify which items have changed, been added, or been removed. This key should be a unique identifier, ideally from your data (like an ID from a database), and should be stable across re-renders. Using array indices as keys is generally discouraged unless the list is static and will never be reordered or modified, as it can lead to performance issues and bugs with component state. Keys only need to be unique among siblings, not globally unique across the application. In the example, we're mapping over an array of medication objects and generating a list item for each one, using the medication's ID as the key. Without these keys, React would issue a warning in the console and might encounter performance issues or unexpected behavior when the list changes. The key prop is not accessible inside the component—it's used internally by React for reconciliation. If you need to access the value used as a key, pass it as a separate prop as well.

---

# Section 3: Props and Component Composition

---

## Understanding Props

Props (short for properties) are how components receive data from their parent:

- Props are read-only and should not be modified
- Props can be any JavaScript value (strings, numbers, objects, functions)
- Props flow downward from parent to child components

```typescript
// Parent component passing props
const App = () => {
  return <Medication name="Lisinopril" dosage={10} unit="mg" />;
};

// Child component receiving props
const Medication = ({ name, dosage, unit }: 
  { name: string, dosage: number, unit: string }) => {
  return (
    <div className="medication">
      <h2>{name}</h2>
      <p>Dosage: {dosage} {unit}</p>
    </div>
  );
};
```

Note: Props are the mechanism for passing data from parent to child components in React, enabling component communication and reusability. They function similarly to HTML attributes but can include any JavaScript value—strings, numbers, objects, arrays, functions, and even other React elements. Props are read-only, reflecting React's unidirectional data flow principle. This immutability helps maintain predictable behavior in your application. When a parent component renders a child component, it can pass any number of props to customize the child's appearance or behavior. In the example, the App component passes three props to the Medication component: name, dosage, and unit. The child component destructures these props in its function parameters, making them easy to use within the component. TypeScript adds type safety to props, helping catch errors during development rather than at runtime. If a prop's value needs to be modified, the parent component should handle the state and pass both the current value and a function to update it. This pattern, known as "lifting state up," maintains the unidirectional data flow while allowing child components to trigger changes.

---

## Props with TypeScript

TypeScript enhances props with static type checking:

```typescript
// Define a Props interface
interface MedicationProps {
  name: string;
  dosage: number;
  unit: string;
  instructions?: string; // Optional prop
  sideEffects: string[];
  onPrescribe: (medicationName: string) => void;
}

// Use the interface with your component
const Medication = ({ 
  name, 
  dosage, 
  unit, 
  instructions = "Take as directed", // Default value for optional prop
  sideEffects,
  onPrescribe
}: MedicationProps) => {
  return (
    <div className="medication">
      <h2>{name}</h2>
      <p>Dosage: {dosage} {unit}</p>
      <p>Instructions: {instructions}</p>
      <h3>Side Effects:</h3>
      <ul>
        {sideEffects.map((effect, index) => (
          <li key={index}>{effect}</li>
        ))}
      </ul>
      <button onClick={() => onPrescribe(name)}>
        Prescribe Medication
      </button>
    </div>
  );
};
```

Note: TypeScript significantly enhances React development by providing static type checking for props, helping catch errors during development rather than at runtime. The standard approach is to define an interface or type that specifies the shape of your component's props. In the example, we've created a `MedicationProps` interface that defines the expected types for each prop. The question mark after `instructions?` indicates that this prop is optional. For optional props, you can provide default values using parameter default values in the function signature, as shown with `instructions = "Take as directed"`. TypeScript ensures that all required props are provided when using the component and that all props match their expected types. It also provides excellent editor support with autocompletion and inline documentation. For function props like `onPrescribe`, TypeScript allows you to specify the function signature, including parameter types and return type. This is particularly valuable for callback functions, ensuring they're called with the correct arguments. Using TypeScript with React props creates self-documenting components, making it easier for other developers (or your future self) to understand how to use them correctly.

---

## Children Props

The special `children` prop allows components to accept and render nested content:

```typescript
interface CardProps {
  title: string;
  children: React.ReactNode;
}

const Card = ({ title, children }: CardProps) => {
  return (
    <div className="card">
      <div className="card-header">
        <h2>{title}</h2>
      </div>
      <div className="card-body">
        {children}
      </div>
    </div>
  );
};

// Usage
const App = () => {
  return (
    <Card title="Medication Information">
      <p>Lisinopril is used to treat high blood pressure.</p>
      <p>Take once daily with or without food.</p>
    </Card>
  );
};
```

Note: The `children` prop is a special prop in React that allows components to accept and render nested content. It represents whatever is passed between the opening and closing tags of a component. This pattern is widely used for creating container or layout components that wrap other content. In the example, we've created a Card component that accepts a title prop and children. The Card component provides consistent styling and structure, while allowing the parent component to determine what content goes inside. The type for children is typically `React.ReactNode`, which encompasses all possible React nodes including elements, strings, numbers, fragments, portals, and null or undefined. This flexibility allows a component to accept virtually any renderable content as children. The children prop enables component composition, one of React's most powerful patterns. It allows you to create reusable wrapper components for common UI patterns like cards, modals, tabs, and layouts. By leveraging the children prop, you can create more flexible and composable component APIs, reducing the need for complex prop configurations and making your components more intuitive to use.

---

## Component Composition

Composition allows building complex UIs from simpler components:

```typescript
// Specialized components
const MedicationHeader = ({ name, category }: 
  { name: string, category: string }) => (
  <div className="medication-header">
    <h2>{name}</h2>
    <span className="category">{category}</span>
  </div>
);

const MedicationDosage = ({ amount, frequency }: 
  { amount: string, frequency: string }) => (
  <div className="medication-dosage">
    <p><strong>Dosage:</strong> {amount}</p>
    <p><strong>Frequency:</strong> {frequency}</p>
  </div>
);

const MedicationSideEffects = ({ effects }: { effects: string[] }) => (
  <div className="medication-side-effects">
    <h3>Possible Side Effects:</h3>
    <ul>
      {effects.map((effect, index) => (
        <li key={index}>{effect}</li>
      ))}
    </ul>
  </div>
);

// Composed component
const MedicationDetail = () => {
  const sideEffects = ["Dizziness", "Cough", "Headache"];
  
  return (
    <div className="medication-detail">
      <MedicationHeader name="Lisinopril" category="ACE Inhibitor" />
      <MedicationDosage amount="10mg" frequency="Once daily" />
      <MedicationSideEffects effects={sideEffects} />
    </div>
  );
};
```

Note: Component composition is a fundamental pattern in React that involves combining smaller, focused components to build more complex UIs. This approach offers several advantages over inheritance or large monolithic components. By breaking down your UI into smaller, single-responsibility components, you improve reusability, maintainability, and testability. In the example, we've created three specialized components—MedicationHeader, MedicationDosage, and MedicationSideEffects—each responsible for rendering a specific part of the medication information. These components are then composed together in the MedicationDetail component to create a complete medication detail view. This composition approach makes the code more modular and easier to maintain. If you need to change how the dosage information is displayed, you only need to modify the MedicationDosage component. Composition also enhances reusability—these specialized components could be used in different contexts throughout the application. For instance, MedicationHeader might be used in a list view as well as a detail view. React's component composition model is often described with the phrase "composition over inheritance," encouraging developers to build complex components by composing simpler ones rather than creating complex inheritance hierarchies.

---

## Prop Drilling and Its Limitations

Prop drilling occurs when props are passed through multiple component layers:

```typescript
// Top-level component with data
const MedicationDashboard = () => {
  const user = { name: "Dr. Smith", role: "Physician" };
  
  return (
    <div className="dashboard">
      <Header user={user} />
      <MedicationList user={user} />
    </div>
  );
};

// Middle component that doesn't use user but passes it down
const MedicationList = ({ user }: { user: { name: string, role: string } }) => {
  const medications = [
    { id: 1, name: "Aspirin" },
    { id: 2, name: "Lisinopril" }
  ];
  
  return (
    <div className="medication-list">
      <h2>Medications</h2>
      {medications.map(med => (
        <MedicationItem 
          key={med.id} 
          medication={med} 
          user={user} 
        />
      ))}
    </div>
  );
};

// Leaf component that finally uses the user prop
const MedicationItem = ({ 
  medication, 
  user 
}: { 
  medication: { id: number, name: string }, 
  user: { name: string, role: string } 
}) => {
  return (
    <div className="medication-item">
      <h3>{medication.name}</h3>
      <p>Prescribed by: {user.name} ({user.role})</p>
    </div>
  );
};
```

Note: Prop drilling refers to the process of passing props through multiple layers of components, even through components that don't directly use those props but merely pass them down to their children. In the example, the user object is defined in the MedicationDashboard component and passed down to the MedicationItem component through the MedicationList component, which doesn't actually use the user data itself. While this approach works for simple applications with shallow component trees, it becomes problematic as your application grows. Prop drilling can lead to several issues: it makes your code more verbose and harder to maintain, creates unnecessary coupling between components, complicates refactoring, and can impact performance by causing unnecessary re-renders. As your application grows more complex, you'll want to consider alternative approaches for sharing data between components that aren't directly connected in the component hierarchy. In later sections, we'll explore solutions like Context API and state management libraries that help address these limitations. These solutions provide ways to make data available to components without explicitly passing it through every level of the component tree, reducing the need for prop drilling and making your code more maintainable.

---

# Section 4: State and Lifecycle

---

## Understanding Component State

State represents data that changes over time and affects a component's rendering:

```typescript
import React, { useState } from 'react';

const MedicationCounter = () => {
  // Initialize state with useState hook
  const [count, setCount] = useState<number>(0);
  
  // Event handlers that update state
  const increment = () => {
    setCount(count + 1);
  };
  
  const decrement = () => {
    setCount(prevCount => Math.max(0, prevCount - 1));
  };
  
  return (
    <div className="medication-counter">
      <h2>Medication Count: {count}</h2>
      <div className="controls">
        <button onClick={decrement}>Decrease</button>
        <button onClick={increment}>Increase</button>
      </div>
      {count === 0 && <p>Please add medications to your cart.</p>}
    </div>
  );
};
```

Note: State is one of the most important concepts in React, representing data that changes over time and affects a component's rendering. Unlike props, which are passed from parent components and are read-only, state is managed internally by the component and can be updated. In functional components, state is managed using the useState hook, which returns a pair: the current state value and a function to update it. The useState hook takes an initial state value as its argument and returns an array with two elements. By convention, we use array destructuring to assign names to these elements—typically the state variable and a setter function prefixed with "set". In the example, we're tracking a count of medications with an initial value of 0. The increment and decrement functions update this state in response to button clicks. Notice that the decrement function uses a functional update form (`prevCount => Math.max(0, prevCount - 1)`) to ensure we're working with the most current state value and to prevent the count from going below zero. When state changes, React automatically re-renders the component with the new state values, updating the UI to reflect the current state. This is a key aspect of React's declarative approach—you describe how the UI should look based on the current state, and React handles the updates.

---

## useState Hook

The `useState` hook lets functional components manage state:

```typescript
import React, { useState } from 'react';

interface Medication {
  id: number;
  name: string;
  dosage: string;
  isSelected: boolean;
}

const MedicationSelector = () => {
  // State for a single value
  const [searchTerm, setSearchTerm] = useState<string>('');
  
  // State for an array of objects
  const [medications, setMedications] = useState<Medication[]>([
    { id: 1, name: "Aspirin", dosage: "325mg", isSelected: false },
    { id: 2, name: "Lisinopril", dosage: "10mg", isSelected: false },
    { id: 3, name: "Metformin", dosage: "500mg", isSelected: false }
  ]);
  
  // Handler to toggle medication selection
  const toggleSelection = (id: number) => {
    setMedications(prevMeds => 
      prevMeds.map(med => 
        med.id === id ? { ...med, isSelected: !med.isSelected } : med
      )
    );
  };
  
  // Handler for search input
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };
  
  // Filter medications based on search term
  const filteredMedications = medications.filter(med => 
    med.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  return (
    <div className="medication-selector">
      <input 
        type="text" 
        placeholder="Search medications..." 
        value={searchTerm} 
        onChange={handleSearch}
      />
      
      <ul className="medication-list">
        {filteredMedications.map(med => (
          <li 
            key={med.id} 
            className={med.isSelected ? 'selected' : ''}
            onClick={() => toggleSelection(med.id)}
          >
            <strong>{med.name}</strong> - {med.dosage}
          </li>
        ))}
      </ul>
      
      <div className="selected-count">
        Selected: {medications.filter(med => med.isSelected).length}
      </div>
    </div>
  );
};
```

Note: The useState hook is the primary way to add state to functional components in React. It takes an initial state value as its argument and returns an array with two elements: the current state value and a function to update it. We typically use array destructuring to name these elements. In the example, we're managing two pieces of state: a simple string for the search term and a more complex array of medication objects. When working with complex state like objects or arrays, it's important to maintain immutability when updating state. Notice how the toggleSelection function creates a new array using map() rather than modifying the existing array. This immutability is crucial for React's rendering optimization. The functional update form (passing a function to the state setter) is used to ensure we're working with the most current state, which is important when the new state depends on the previous state. This pattern helps avoid bugs related to stale state in asynchronous updates. The example also demonstrates derived state—filteredMedications is calculated from the current state values but isn't state itself. This pattern is preferred over storing derived values in state, as it ensures the derived value is always in sync with its dependencies.

---

## useEffect Hook

The `useEffect` hook lets you perform side effects in functional components:

```typescript
import React, { useState, useEffect } from 'react';

interface Medication {
  id: number;
  name: string;
  dosage: string;
}

const MedicationSearch = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [medications, setMedications] = useState<Medication[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  
  // Effect that runs on component mount and when searchTerm changes
  useEffect(() => {
    // Skip the effect if search term is empty
    if (!searchTerm.trim()) {
      setMedications([]);
      return;
    }
    
    const fetchMedications = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        // Simulate API call with timeout
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock data - in a real app, this would be an API call
        const mockResults: Medication[] = [
          { id: 1, name: "Aspirin", dosage: "325mg" },
          { id: 2, name: "Lisinopril", dosage: "10mg" },
          { id: 3, name: "Metformin", dosage: "500mg" }
        ].filter(med => 
          med.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        
        setMedications(mockResults);
      } catch (err) {
        setError('Failed to fetch medications');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    
    // Debounce the search to avoid too many requests
    const timeoutId = setTimeout(() => {
      fetchMedications();
    }, 500);
    
    // Cleanup function to cancel the timeout if the effect runs again
    return () => clearTimeout(timeoutId);
  }, [searchTerm]); // Dependency array - effect runs when searchTerm changes
  
  return (
    <div className="medication-search">
      <input
        type="text"
        placeholder="Search medications..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      
      {isLoading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}
      
      {!isLoading && !error && (
        <ul className="results">
          {medications.length > 0 ? (
            medications.map(med => (
              <li key={med.id}>
                <strong>{med.name}</strong> - {med.dosage}
              </li>
            ))
          ) : (
            searchTerm.trim() && <p>No medications found</p>
          )}
        </ul>
      )}
    </div>
  );
};
```

Note: The useEffect hook is a powerful tool for handling side effects in functional components. Side effects include data fetching, subscriptions, manual DOM manipulations, and anything that affects something outside the component's scope. The hook takes two arguments: a function containing the effect code and an optional dependency array. In the example, we're using useEffect to fetch medication data based on a search term. The effect runs when the component mounts and whenever the searchTerm changes, as specified by the dependency array [searchTerm]. If the dependency array is empty [], the effect runs only once after the initial render. Omitting the dependency array entirely would cause the effect to run after every render, which is rarely what you want. The cleanup function (returned by the effect) is important for preventing memory leaks and unwanted behavior. In our example, it clears the timeout to prevent stale searches if the user types quickly. This cleanup runs before the effect runs again and when the component unmounts. The example also demonstrates common patterns for handling loading states and errors in asynchronous operations. We're using multiple pieces of state to track the loading status, error state, and the fetched data. The conditional rendering in the return statement ensures a good user experience by showing appropriate feedback based on these states.

---

## useReducer Hook

The `useReducer` hook is an alternative to useState for complex state logic:

```typescript
import React, { useReducer } from 'react';

// Define the state type
interface CartState {
  items: {
    id: number;
    name: string;
    price: number;
    quantity: number;
  }[];
  total: number;
}

// Define the action types
type CartAction =
  | { type: 'ADD_ITEM'; payload: { id: number; name: string; price: number } }
  | { type: 'REMOVE_ITEM'; payload: { id: number } }
  | { type: 'UPDATE_QUANTITY'; payload: { id: number; quantity: number } }
  | { type: 'CLEAR_CART' };

// Reducer function
const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existingItem = state.items.find(item => item.id === action.payload.id);
      
      if (existingItem) {
        // Item exists, increment quantity
        const updatedItems = state.items.map(item => 
          item.id === action.payload.id 
            ? { ...item, quantity: item.quantity + 1 } 
            : item
        );
        
        return {
          items: updatedItems,
          total: calculateTotal(updatedItems)
        };
      } else {
        // New item, add to cart
        const newItems = [
          ...state.items,
          { ...action.payload, quantity: 1 }
        ];
        
        return {
          items: newItems,
          total: calculateTotal(newItems)
        };
      }
    }
    
    case 'REMOVE_ITEM': {
      const updatedItems = state.items.filter(item => item.id !== action.payload.id);
      
      return {
        items: updatedItems,
        total: calculateTotal(updatedItems)
      };
    }
    
    case 'UPDATE_QUANTITY': {
      const updatedItems = state.items.map(item => 
        item.id === action.payload.id 
          ? { ...item, quantity: action.payload.quantity } 
          : item
      );
      
      return {
        items: updatedItems,
        total: calculateTotal(updatedItems)
      };
    }
    
    case 'CLEAR_CART':
      return {
        items: [],
        total: 0
      };
      
    default:
      return state;
  }
};

// Helper function to calculate total
const calculateTotal = (items: CartState['items']) => {
  return items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
};

// Component using the reducer
const MedicationCart = () => {
  const initialState: CartState = { items: [], total: 0 };
  
  const [cart, dispatch] = useReducer(cartReducer, initialState);
  
  const medications = [
    { id: 1, name: "Aspirin", price: 5.99 },
    { id: 2, name: "Lisinopril", price: 12.99 },
    { id: 3, name: "Metformin", price: 8.49 }
  ];
  
  return (
    <div className="medication-cart">
      <h2>Medication Cart</h2>
      
      <div className="product-list">
        <h3>Available Medications</h3>
        {medications.map(med => (
          <div key={med.id} className="product-item">
            <span>{med.name} - ${med.price.toFixed(2)}</span>
            <button onClick={() => dispatch({ 
              type: 'ADD_ITEM', 
              payload: med 
            })}>
              Add to Cart
            </button>
          </div>
        ))}
      </div>
      
      <div className="cart-items">
        <h3>Cart</h3>
        {cart.items.length === 0 ? (
          <p>Your cart is empty</p>
        ) : (
          <>
            {cart.items.map(item => (
              <div key={item.id} className="cart-item">
                <span>{item.name} - ${item.price.toFixed(2)} x {item.quantity}</span>
                <div className="quantity-controls">
                  <button onClick={() => dispatch({
                    type: 'UPDATE_QUANTITY',
                    payload: { id: item.id, quantity: Math.max(1, item.quantity - 1) }
                  })}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => dispatch({
                    type: 'UPDATE_QUANTITY',
                    payload: { id: item.id, quantity: item.quantity + 1 }
                  })}>+</button>
                </div>
                <button onClick={() => dispatch({
                  type: 'REMOVE_ITEM',
                  payload: { id: item.id }
                })}>Remove</button>
              </div>
            ))}
            <div className="cart-total">
              <strong>Total: ${cart.total.toFixed(2)}</strong>
            </div>
            <button 
              className="clear-cart"
              onClick={() => dispatch({ type: 'CLEAR_CART' })}
            >
              Clear Cart
            </button>
          </>
        )}
      </div>
    </div>
  );
};
```

Note: The useReducer hook is a more powerful alternative to useState for managing complex state logic. It's particularly useful when the next state depends on the previous state or when state transitions involve multiple sub-values that need to be updated together. The hook is inspired by Redux and follows a similar pattern. It takes a reducer function and an initial state, returning the current state and a dispatch function. The reducer function receives the current state and an action, and returns the new state based on the action type. In our example, we're implementing a medication shopping cart with several operations: adding items, removing items, updating quantities, and clearing the cart. Each operation is represented by an action with a specific type and payload. TypeScript adds strong typing to both the state and actions, making the code more robust and providing better editor support. The pattern enforces a predictable state update logic—all state changes must go through the reducer function, making it easier to track and debug state changes. This centralized state management is especially valuable for complex components or when state logic needs to be shared across components. The useReducer hook is often used in conjunction with useContext to provide a Redux-like state management solution without external libraries. This combination is powerful for managing global application state or for complex components with many state transitions.

---

## Other Important Hooks

React provides several other built-in hooks for various purposes:

```typescript
import React, { 
  useState, 
  useEffect, 
  useContext, 
  useRef, 
  useMemo, 
  useCallback 
} from 'react';

// Create a context
const ThemeContext = React.createContext<'light' | 'dark'>('light');

const MedicationDetail = () => {
  // useContext: Access context values
  const theme = useContext(ThemeContext);
  
  // useState: Manage component state
  const [count, setCount] = useState(0);
  
  // useRef: Create a mutable reference
  const inputRef = useRef<HTMLInputElement>(null);
  const prevCountRef = useRef<number>();
  
  // useEffect: Perform side effects
  useEffect(() => {
    // Update the ref with current count after render
    prevCountRef.current = count;
    
    // Log when count changes
    console.log(`Count changed from ${prevCountRef.current} to ${count}`);
  }, [count]);
  
  // useMemo: Memoize expensive calculations
  const expensiveCalculation = useMemo(() => {
    console.log('Performing expensive calculation...');
    // Simulate expensive operation
    let result = 0;
    for (let i = 0; i < 1000000; i++) {
      result += i;
    }
    return result;
  }, []); // Empty dependency array means this only runs once
  
  // useCallback: Memoize functions
  const handleButtonClick = useCallback(() => {
    setCount(c => c + 1);
    // Focus the input element
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);
  
  return (
    <div className={`medication-detail theme-${theme}`}>
      <h2>Medication Detail</h2>
      <p>Current count: {count}</p>
      {prevCountRef.current !== undefined && (
        <p>Previous count: {prevCountRef.current}</p>
      )}
      
      <input 
        ref={inputRef} 
        type="text" 
        placeholder="Enter notes here" 
      />
      
      <button onClick={handleButtonClick}>
        Increment Count
      </button>
      
      <p>Result of expensive calculation: {expensiveCalculation}</p>
    </div>
  );
};

// Parent component providing context
const App = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  
  return (
    <ThemeContext.Provider value={theme}>
      <div>
        <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
          Toggle Theme
        </button>
        <MedicationDetail />
      </div>
    </ThemeContext.Provider>
  );
};
```

Note: React provides several additional hooks beyond useState, useEffect, and useReducer, each serving specific purposes to solve common problems in functional components. The useContext hook provides a way to consume values from React's Context API without nesting consumer components. It's useful for accessing global data like themes, user authentication, or language preferences. The useRef hook creates a mutable reference that persists across renders. It has two main use cases: accessing DOM elements directly (as shown with inputRef) and storing values that shouldn't trigger re-renders when changed (like prevCountRef tracking the previous count). The useMemo hook memoizes expensive calculations, recomputing the value only when dependencies change. This optimization prevents unnecessary recalculations during renders, improving performance for computationally intensive operations. The useCallback hook is similar but memoizes functions instead of values. It's particularly useful for optimizing child component renders when passing callback functions as props, preventing unnecessary re-renders caused by new function references. React also provides specialized hooks like useLayoutEffect (similar to useEffect but fires synchronously after DOM mutations), useDebugValue (for custom hook debugging), and useImperativeHandle (for customizing the instance value exposed when using refs). Additionally, there are hooks from React Router (useParams, useHistory, etc.) and other libraries that follow the same pattern. Understanding when to use each hook is key to writing efficient and maintainable React components.

---

## Component Lifecycle with Hooks

Hooks can handle all the lifecycle needs of class components:

```typescript
import React, { useState, useEffect, useRef } from 'react';

const MedicationTimer = () => {
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const intervalRef = useRef<number | null>(null);
  
  // ComponentDidMount + ComponentDidUpdate (when isActive changes)
  useEffect(() => {
    // Start or stop the timer based on isActive state
    if (isActive) {
      console.log('Timer started');
      intervalRef.current = window.setInterval(() => {
        setSeconds(s => s + 1);
      }, 1000);
    } else if (intervalRef.current) {
      console.log('Timer paused');
      clearInterval(intervalRef.current);
    }
    
    // ComponentWillUnmount (cleanup)
    return () => {
      console.log('Cleaning up timer');
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isActive]);
  
  // ComponentDidMount - runs once
  useEffect(() => {
    console.log('Component mounted');
    
    // ComponentWillUnmount
    return () => {
      console.log('Component will unmount');
    };
  }, []);
  
  // Runs after every render
  useEffect(() => {
    console.log('Component updated, seconds:', seconds);
  });
  
  const handleToggle = () => {
    setIsActive(!isActive);
  };
  
  const handleReset = () => {
    setIsActive(false);
    setSeconds(0);
  };
  
  // Format seconds into mm:ss
  const formatTime = () => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };
  
  return (
    <div className="medication-timer">
      <h2>Medication Timer</h2>
      <div className="time-display">{formatTime()}</div>
      <div className="controls">
        <button onClick={handleToggle}>
          {isActive ? 'Pause' : 'Start'}
        </button>
        <button onClick={handleReset}>Reset</button>
      </div>
      <p className="status">
        Timer is {isActive ? 'running' : 'paused'}
      </p>
    </div>
  );
};
```

Note: React's hooks system provides a complete replacement for the lifecycle methods found in class components, offering more flexibility and better separation of concerns. The useEffect hook is the primary tool for handling lifecycle events in functional components. By controlling the dependency array, you can replicate various lifecycle behaviors. An empty dependency array ([]) makes the effect run only once after the initial render, similar to componentDidMount. Omitting the dependency array entirely causes the effect to run after every render, like a combination of componentDidMount and componentDidUpdate. Including specific dependencies makes the effect run when those values change, providing fine-grained control over when side effects occur. The cleanup function returned by useEffect serves the same purpose as componentWillUnmount, allowing you to clean up resources like timers, subscriptions, or event listeners. In the example, we're using multiple useEffect hooks for different purposes: one manages the timer interval based on the isActive state, another runs only on mount and unmount for logging, and a third runs after every render to log updates. This separation of concerns is a key advantage of hooks over lifecycle methods—related logic stays together rather than being split across different lifecycle methods. The useRef hook complements useEffect by providing a way to store mutable values that persist across renders, like the interval ID in our example. This pattern of using multiple focused effects with appropriate dependencies leads to more maintainable and less error-prone code compared to the traditional lifecycle methods.

---

## Performance Optimization with React.memo

`React.memo` can prevent unnecessary re-renders of functional components:

```typescript
import React, { useState, memo } from 'react';

// Define props interface for the child component
interface MedicationItemProps {
  id: number;
  name: string;
  dosage: string;
  onSelect: (id: number) => void;
}

// Create a memoized component with React.memo
const MedicationItem = memo(({ id, name, dosage, onSelect }: MedicationItemProps) => {
  console.log(`Rendering MedicationItem: ${name}`);
  
  return (
    <li className="medication-item" onClick={() => onSelect(id)}>
      <div className="medication-info">
        <h3>{name}</h3>
        <p>Dosage: {dosage}</p>
      </div>
    </li>
  );
});

// Custom comparison function (optional)
const arePropsEqual = (
  prevProps: MedicationItemProps, 
  nextProps: MedicationItemProps
) => {
  // Only re-render if these props change
  return (
    prevProps.id === nextProps.id &&
    prevProps.name === nextProps.name &&
    prevProps.dosage === nextProps.dosage
    // Intentionally not comparing onSelect function
  );
};

// Create another memoized component with custom comparison
const MedicationItemWithCustomComparison = memo(
  ({ id, name, dosage, onSelect }: MedicationItemProps) => {
    console.log(`Rendering MedicationItemWithCustomComparison: ${name}`);
    
    return (
      <li className="medication-item" onClick={() => onSelect(id)}>
        <div className="medication-info">
          <h3>{name}</h3>
          <p>Dosage: {dosage}</p>
        </div>
      </li>
    );
  },
  arePropsEqual
);

// Parent component
const MedicationList = () => {
  const [medications] = useState([
    { id: 1, name: "Aspirin", dosage: "325mg" },
    { id: 2, name: "Lisinopril", dosage: "10mg" },
    { id: 3, name: "Metformin", dosage: "500mg" }
  ]);
  
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [count, setCount] = useState(0);
  
  // This function reference changes on every render
  const handleSelect = (id: number) => {
    setSelectedId(id);
  };
  
  return (
    <div className="medication-list">
      <h2>Medications</h2>
      <p>Selected ID: {selectedId !== null ? selectedId : 'None'}</p>
      <p>Counter: {count}</p>
      <button onClick={() => setCount(c => c + 1)}>
        Increment Counter
      </button>
      
      <ul>
        {medications.map(med => (
          <MedicationItem
            key={med.id}
            id={med.id}
            name={med.name}
            dosage={med.dosage}
            onSelect={handleSelect}
          />
        ))}
      </ul>
    </div>
  );
};
```

Note: React.memo is a higher-order component that memoizes the result of a component render, preventing unnecessary re-renders when props haven't changed. It's similar to PureComponent for class components but works with functional components. When a parent component re-renders, all its child components typically re-render as well, even if their props haven't changed. React.memo optimizes this by performing a shallow comparison of props and only re-rendering if the props have changed. In the example, MedicationItem is wrapped with React.memo, so it will only re-render when its props change. When the counter state in the parent component changes, the parent re-renders, but the memoized MedicationItem components won't re-render if their props remain the same. However, there's a potential issue with the handleSelect function—since it's defined inside the parent component, it creates a new function reference on every render, which would cause memoized components to re-render anyway. To solve this, you could use the useCallback hook to memoize the function, or provide a custom comparison function as the second argument to React.memo that ignores the function prop, as shown with MedicationItemWithCustomComparison. It's important to note that memoization has its own cost, so it's most beneficial for components with expensive render operations or components that render frequently but rarely need to update. React.memo should be used selectively rather than applied to every component by default.

---

# Section 5: Handling Events

---

## React Event Handling

React provides a synthetic event system that works consistently across browsers:

```typescript
import React, { useState, FormEvent, ChangeEvent } from 'react';

const MedicationForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    dosage: '',
    frequency: 'daily',
    notes: ''
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  // Handle input changes
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
    
    // Clear error when field is edited
    if (errors[name]) {
      setErrors(prevErrors => {
        const newErrors = { ...prevErrors };
        delete newErrors[name];
        return newErrors;
      });
    }
  };
  
  // Handle form submission
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Validate form
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Medication name is required';
    }
    
    if (!formData.dosage.trim()) {
      newErrors.dosage = 'Dosage is required';
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    // Form is valid, process submission
    console.log('Form submitted:', formData);
    setIsSubmitted(true);
    
    // In a real app, you would send this data to an API
  };
  
  // Reset the form
  const handleReset = () => {
    setFormData({
      name: '',
      dosage: '',
      frequency: 'daily',
      notes: ''
    });
    setErrors({});
    setIsSubmitted(false);
  };
  
  if (isSubmitted) {
    return (
      <div className="medication-form-success">
        <h2>Medication Added</h2>
        <p>You have successfully added {formData.name}.</p>
        <button onClick={handleReset}>Add Another Medication</button>
      </div>
    );
  }
  
  return (
    <div className="medication-form">
      <h2>Add New Medication</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Medication Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={errors.name ? 'error' : ''}
          />
          {errors.name && <div className="error-message">{errors.name}</div>}
        </div>
        
        <div className="form-group">
          <label htmlFor="dosage">Dosage:</label>
          <input
            type="text"
            id="dosage"
            name="dosage"
            value={formData.dosage}
            onChange={handleChange}
            className={errors.dosage ? 'error' : ''}
          />
          {errors.dosage && <div className="error-message">{errors.dosage}</div>}
        </div>
        
        <div className="form-group">
          <label htmlFor="frequency">Frequency:</label>
          <select
            id="frequency"
            name="frequency"
            value={formData.frequency}
            onChange={handleChange}
          >
            <option value="daily">Once Daily</option>
            <option value="twice-daily">Twice Daily</option>
            <option value="as-needed">As Needed</option>
          </select>
        </div>
        
        <div className="form-group">
          <label htmlFor="notes">Notes:</label>
          <textarea
            id="notes"
            name="notes"
            value={formData.notes}
            onChange={handleChange}
          />
        </div>
        
        <div className="form-buttons">
          <button type="submit">Add Medication</button>
          <button type="button" onClick={handleReset}>Reset</button>
        </div>
      </form>
    </div>
  );
};
```

Note: React's event handling system provides a consistent interface across different browsers through synthetic events. These events are wrappers around the browser's native events and follow the same API, but with some enhancements for cross-browser compatibility. In React, event handlers are named using camelCase (e.g., onClick instead of onclick) and are passed as JSX attributes. Event handlers receive the synthetic event object as an argument, which you can use to access information about the event or call methods like preventDefault() to stop the default browser behavior. In the example, we're handling form events with TypeScript, which provides type safety for event objects. The ChangeEvent generic type ensures proper typing for the event object based on the element type (input, select, or textarea). The FormEvent type is used for the form submission event. The form demonstrates common patterns for handling user input: maintaining form state in a single object, validating inputs, displaying error messages, and showing a success state after submission. The handleChange function uses computed property names ([name]: value) to update the correct field in the form state based on the input's name attribute. This pattern allows a single handler to manage multiple form fields. The handleSubmit function prevents the default form submission, validates the inputs, and either displays errors or processes the form data. The handleReset function demonstrates how to reset the form to its initial state. These patterns form the foundation for building interactive forms in React applications.

---

## Controlled vs Uncontrolled Components

React offers two approaches for handling form inputs:

```typescript
import React, { useState, useRef, FormEvent } from 'react';

// Controlled Component Example
const ControlledForm = () => {
  const [name, setName] = useState('');
  const [email
# Module 6: React Essentials

<div class="instructor-led">Instructor-Led</div>
<div class="self-led">Self-Led</div>
<div class="asynchronous">Asynchronous</div>

## Overview

This module introduces the core concepts of React, the foundation of React Native. We'll explore React's component-based architecture, JSX syntax, props, state, and lifecycle methods. Understanding these fundamentals is crucial for building effective React Native applications.

Note: Welcome to Module 6: React Essentials. This module is critical as it forms the foundation for everything we'll do in React Native. React's component-based architecture revolutionized frontend development by making UI creation more modular, reusable, and maintainable. Throughout this module, we'll build a solid understanding of React's core concepts, which directly transfer to React Native development. We'll start with the basics and progressively move to more advanced topics, ensuring you have a comprehensive understanding of React before we dive deeper into React Native-specific features in subsequent modules.

---

## Learning Objectives

By the end of this module, you will be able to:

- Understand React's component-based architecture and its advantages
- Create and use functional and class components with TypeScript
- Implement JSX syntax effectively in your components
- Pass and manage props between components
- Manage component state using useState and useReducer hooks
- Implement side effects using useEffect and other React hooks
- Apply React's rendering lifecycle to optimize performance

Note: These learning objectives outline what you'll master by the end of this module. React's component-based architecture is fundamental to modern web and mobile development, allowing us to build complex UIs from simple, reusable pieces. You'll learn to create both functional and class components, though we'll focus more on functional components with hooks as they're the modern approach. JSX is React's syntax extension that lets you write HTML-like code in JavaScript, making component creation intuitive. Props allow components to communicate with each other, while state management is crucial for handling dynamic data. The useEffect hook and other lifecycle methods help manage side effects like data fetching. Understanding React's rendering process will help you build performant applications. These concepts directly transfer to React Native development.

---

# Section 1: Introduction to React

---

## What is React?

- A JavaScript library for building user interfaces
- Created by Facebook (now Meta) in 2013
- Component-based architecture
- Virtual DOM for efficient rendering
- Declarative approach to UI development
- Powers many popular websites and applications

Note: React is a JavaScript library developed by Facebook in 2013 that has revolutionized how we build user interfaces. At its core, React introduces a component-based architecture where UIs are broken down into reusable, self-contained components. This modular approach makes applications easier to develop, maintain, and scale. React uses a Virtual DOM, which is a lightweight copy of the actual DOM. When state changes occur, React first updates this Virtual DOM, compares it with the previous version (a process called "diffing"), and then efficiently updates only the necessary parts of the actual DOM. This approach significantly improves performance compared to directly manipulating the DOM. React's declarative nature means developers describe what the UI should look like based on the current state, and React handles the DOM updates to match that description. This contrasts with imperative programming where you explicitly define each step to achieve the desired outcome.

---

## React vs React Native

| React | React Native |
|-------|--------------|
| For web applications | For mobile applications |
| Renders to HTML and browser DOM | Renders to native mobile components |
| Uses web-specific components (div, span, etc.) | Uses mobile-specific components (View, Text, etc.) |
| Accesses web APIs | Accesses native device features |
| Same core concepts (components, props, state) | Same core concepts (components, props, state) |

Note: Understanding the relationship between React and React Native is crucial. React is designed for web applications, rendering components to HTML elements in the browser's DOM. React Native, on the other hand, is a framework that uses React's principles but renders to native mobile components instead of HTML. While React uses web elements like divs and spans, React Native provides platform-specific components like View and Text that map to their native counterparts on iOS and Android. Despite these differences, both share the same fundamental concepts: component-based architecture, unidirectional data flow, and state management. This is why learning React first provides a solid foundation for React Native development. The knowledge you gain in this module about components, JSX, props, state, and lifecycle methods will directly transfer to React Native, with the main difference being the specific components and APIs you'll use.

---

## Why React?

- **Reusable Components**: Build encapsulated components that manage their own state
- **Efficient Updates**: Virtual DOM minimizes expensive DOM operations
- **Unidirectional Data Flow**: Makes code more predictable and easier to debug
- **Strong Community**: Large ecosystem of libraries, tools, and resources
- **Industry Adoption**: Widely used in production by major companies
- **Cross-platform Development**: Skills transfer to React Native

Note: React offers numerous advantages that have contributed to its widespread adoption. The component-based architecture promotes reusability, allowing developers to create self-contained, modular pieces that can be composed to build complex UIs. This approach significantly reduces code duplication and makes maintenance easier. The Virtual DOM implementation optimizes rendering by minimizing direct DOM manipulations, which are computationally expensive. React's unidirectional data flow means data flows in a single direction, making applications more predictable and easier to debug compared to two-way data binding approaches. The React ecosystem is vast, with countless libraries, tools, and resources available to solve common problems. Major companies like Facebook, Instagram, Netflix, and Airbnb use React in production, demonstrating its scalability and reliability. Perhaps most relevant to our course, the skills you learn with React directly transfer to React Native, making it an excellent investment of your time.

---

## React's Core Philosophy

- **Declarative**: Describe what you want, not how to achieve it
- **Component-Based**: Build encapsulated components that manage their state
- **Learn Once, Write Anywhere**: Apply the same principles across platforms
- **Virtual DOM**: Efficient updates through reconciliation
- **Unidirectional Data Flow**: Data flows down, events flow up

Note: React's core philosophy shapes how we approach development. The declarative paradigm means we describe the desired UI state, and React handles the DOM manipulations to achieve it. This contrasts with imperative approaches where developers manually manipulate the DOM. The component-based architecture encourages breaking UIs into independent, reusable pieces with well-defined interfaces. "Learn Once, Write Anywhere" reflects React's adaptability—once you understand React's principles, you can apply them across different platforms and environments, including React Native for mobile development. The Virtual DOM serves as an abstraction of the actual DOM, allowing React to perform efficient updates through its reconciliation algorithm. Unidirectional data flow means data passes down from parent to child components through props, while events flow up through callbacks. This predictable data flow makes applications easier to understand and debug, especially as they grow in complexity.

---

# Section 2: Components and JSX

---

## Components: The Building Blocks

Components are the core building blocks of React applications:

- **Reusable**: Create once, use many times
- **Composable**: Combine simple components to build complex UIs
- **Encapsulated**: Each component manages its own logic and rendering
- **Hierarchical**: Components can contain other components

Note: Components are the fundamental building blocks of React applications. They encapsulate pieces of the UI along with their behavior, making development more modular and maintainable. The reusability of components is a key advantage—once created, they can be used throughout your application or even across different projects. Components are highly composable, meaning you can combine simple components to create more complex ones, building up your UI like Lego blocks. This composability allows for a clean separation of concerns, with each component handling a specific part of the UI. Encapsulation means components contain both the visual elements (what users see) and the logic that controls their behavior. The hierarchical nature of components creates a tree-like structure, with parent components rendering child components, which may themselves contain other components. This component hierarchy mirrors the DOM structure and helps organize your application logically.

---

## Types of Components

React offers two main types of components:

### Class Components
```typescript
class Welcome extends React.Component<{ name: string }> {
  render() {
    return <h1>Hello, {this.props.name}</h1>;
  }
}
```

### Functional Components (Preferred)
```typescript
const Welcome = ({ name }: { name: string }) => {
  return <h1>Hello, {name}</h1>;
};
```

Note: React provides two ways to define components: class components and functional components. Class components are ES6 classes that extend React.Component and must include a render method that returns React elements. They were the primary way to create components that needed state management or lifecycle methods before React 16.8. Functional components are simpler JavaScript functions that accept props as an argument and return React elements. With the introduction of Hooks in React 16.8, functional components can now use state and other React features that were previously only available in class components. Today, functional components are the preferred approach due to their simplicity, better performance, and easier testing. They result in less boilerplate code and are more aligned with React's future direction. In this module, we'll focus primarily on functional components with Hooks, though we'll cover class components briefly for completeness and to help you understand legacy code you might encounter.

---

## JSX: JavaScript XML

JSX is a syntax extension for JavaScript that looks similar to HTML:

```typescript
const element = <h1>Hello, world!</h1>;
```

JSX gets transformed into JavaScript:

```typescript
const element = React.createElement(
  'h1',
  null,
  'Hello, world!'
);
```

Note: JSX (JavaScript XML) is a syntax extension for JavaScript that looks similar to HTML or XML but comes with the full power of JavaScript. It's not required for React development but is highly recommended as it makes the code more readable and intuitive. Behind the scenes, JSX is transformed into regular JavaScript function calls by tools like Babel during the build process. The JSX expression `<h1>Hello, world!</h1>` gets compiled to `React.createElement('h1', null, 'Hello, world!')`. This transformation happens at build time, not runtime, so there's no performance penalty. JSX allows you to describe what the UI should look like in a syntax familiar to many developers, while still leveraging JavaScript's expressiveness. This combination makes React component creation more intuitive and maintainable compared to manually creating elements with `React.createElement()`. Understanding that JSX is just syntactic sugar for function calls helps demystify how React works under the hood.

---

## JSX Rules and Syntax

```typescript
const MedicationCard = () => {
  const medicationName = "Lisinopril";
  const dosage = 10;
  
  return (
    <div className="medication-card">
      <h2>{medicationName}</h2>
      <p>Dosage: {dosage} mg</p>
      {dosage > 5 && <p>High dosage warning</p>}
    </div>
  );
};
```

Note: JSX comes with several important rules and syntax considerations that you need to understand to use it effectively. JSX expressions must have exactly one parent element—you can't return multiple elements side by side without wrapping them in a parent container. If you don't want to add an extra DOM node, you can use React Fragments (`<>...</>` or `<React.Fragment>...</React.Fragment>`). JSX uses `className` instead of `class` for CSS classes because `class` is a reserved keyword in JavaScript. Similarly, it uses `htmlFor` instead of `for` in label elements. Curly braces `{}` are used to embed JavaScript expressions within JSX, allowing you to incorporate dynamic values, calculations, or conditional rendering. In the example above, we're displaying the medication name and dosage dynamically, and conditionally rendering a warning message only when the dosage exceeds 5mg. JSX attributes use camelCase naming convention (e.g., `onClick` instead of `onclick`), following JavaScript conventions rather than HTML. Self-closing tags must include a slash (`<img />` rather than `<img>`). Understanding these rules will help you avoid common pitfalls when writing JSX.

---

## Embedding Expressions in JSX

JSX allows you to embed any JavaScript expression using curly braces:

```typescript
const MedicationCalculator = () => {
  const baseDosage = 5;
  const patientWeight = 70; // kg
  const dosagePerKg = 0.1;
  
  return (
    <div>
      <h2>Medication Dosage Calculator</h2>
      <p>Base dosage: {baseDosage} mg</p>
      <p>Patient weight: {patientWeight} kg</p>
      <p>Calculated dosage: {baseDosage + (patientWeight * dosagePerKg)} mg</p>
      <p>Status: {patientWeight > 100 ? 'Adjust dosage' : 'Standard dosage'}</p>
    </div>
  );
};
```

Note: One of JSX's most powerful features is the ability to embed JavaScript expressions within curly braces `{}`. This allows you to incorporate dynamic values and logic directly in your markup. You can include variables, function calls, arithmetic operations, object properties, and more. In the example, we're calculating a medication dosage based on patient weight and displaying it dynamically. The expression `baseDosage + (patientWeight * dosagePerKg)` is evaluated at render time to compute the appropriate dosage. We're also using a ternary operator `patientWeight > 100 ? 'Adjust dosage' : 'Standard dosage'` for conditional rendering, which is a common pattern in React. This ability to seamlessly blend JavaScript with markup makes JSX extremely flexible and expressive. It's important to note that only expressions are allowed inside curly braces, not statements like if/else or for loops. For more complex logic, you can use immediately-invoked function expressions (IIFEs) or extract the logic into separate functions. This embedding capability is what makes React's declarative approach so powerful.

---

## Conditional Rendering in JSX

React allows several approaches for conditional rendering:

```typescript
const MedicationStatus = ({ name, inStock, quantity }: 
  { name: string, inStock: boolean, quantity: number }) => {
  
  // If-else approach (outside JSX)
  let stockDisplay;
  if (inStock && quantity > 10) {
    stockDisplay = <span className="in-stock">Well Stocked</span>;
  } else if (inStock && quantity <= 10) {
    stockDisplay = <span className="low-stock">Low Stock</span>;
  } else {
    stockDisplay = <span className="out-of-stock">Out of Stock</span>;
  }
  
  return (
    <div className="medication-status">
      <h3>{name}</h3>
      
      {/* Ternary operator approach */}
      <p>Status: {inStock ? 'Available' : 'Unavailable'}</p>
      
      {/* Logical && operator approach */}
      {quantity < 5 && <p className="warning">Reorder soon!</p>}
      
      {/* Pre-determined element from above */}
      <p>Inventory: {stockDisplay}</p>
    </div>
  );
};
```

Note: Conditional rendering is a fundamental technique in React that allows you to create dynamic UIs that respond to changing data and user interactions. There are several approaches to implement conditional rendering, each with its own use cases. The if-else approach is used outside of JSX to pre-determine what will be rendered. This is useful for complex conditions that would be unwieldy inside JSX. The ternary operator (`condition ? true : false`) is perfect for simple inline conditions within JSX, such as toggling between two possible outputs. The logical AND operator (`&&`) is ideal for conditionally rendering an element only when a condition is true—if the condition is false, nothing is rendered. This is commonly used for "optional" elements like warning messages or badges. You can also use switch statements, object mappings, or immediately-invoked function expressions (IIFEs) for more complex conditional logic. When working with lists that might be empty, it's common to use the logical AND to conditionally render the list only when it has items. These conditional rendering techniques are essential for creating responsive, data-driven interfaces in React applications.

---

## Lists and Keys in JSX

Rendering lists in React requires a unique "key" prop for each item:

```typescript
const MedicationList = () => {
  const medications = [
    { id: 1, name: "Aspirin", dosage: "325mg" },
    { id: 2, name: "Lisinopril", dosage: "10mg" },
    { id: 3, name: "Metformin", dosage: "500mg" },
    { id: 4, name: "Atorvastatin", dosage: "20mg" }
  ];
  
  return (
    <div className="medication-list">
      <h2>Available Medications</h2>
      <ul>
        {medications.map(medication => (
          <li key={medication.id}>
            <strong>{medication.name}</strong> - {medication.dosage}
          </li>
        ))}
      </ul>
    </div>
  );
};
```

Note: Rendering lists is a common task in React applications, and it's typically done using the JavaScript `map()` method to transform an array of data into an array of JSX elements. When rendering lists, React requires a special "key" prop for each item to help it identify which items have changed, been added, or been removed. This key should be a unique identifier, ideally from your data (like an ID from a database), and should be stable across re-renders. Using array indices as keys is generally discouraged unless the list is static and will never be reordered or modified, as it can lead to performance issues and bugs with component state. Keys only need to be unique among siblings, not globally unique across the application. In the example, we're mapping over an array of medication objects and generating a list item for each one, using the medication's ID as the key. Without these keys, React would issue a warning in the console and might encounter performance issues or unexpected behavior when the list changes. The key prop is not accessible inside the component—it's used internally by React for reconciliation. If you need to access the value used as a key, pass it as a separate prop as well.

---

# Section 3: Props and Component Composition

---

## Understanding Props

Props (short for properties) are how components receive data from their parent:

- Props are read-only and should not be modified
- Props can be any JavaScript value (strings, numbers, objects, functions)
- Props flow downward from parent to child components

```typescript
// Parent component passing props
const App = () => {
  return <Medication name="Lisinopril" dosage={10} unit="mg" />;
};

// Child component receiving props
const Medication = ({ name, dosage, unit }: 
  { name: string, dosage: number, unit: string }) => {
  return (
    <div className="medication">
      <h2>{name}</h2>
      <p>Dosage: {dosage} {unit}</p>
    </div>
  );
};
```

Note: Props are the mechanism for passing data from parent to child components in React, enabling component communication and reusability. They function similarly to HTML attributes but can include any JavaScript value—strings, numbers, objects, arrays, functions, and even other React elements. Props are read-only, reflecting React's unidirectional data flow principle. This immutability helps maintain predictable behavior in your application. When a parent component renders a child component, it can pass any number of props to customize the child's appearance or behavior. In the example, the App component passes three props to the Medication component: name, dosage, and unit. The child component destructures these props in its function parameters, making them easy to use within the component. TypeScript adds type safety to props, helping catch errors during development rather than at runtime. If a prop's value needs to be modified, the parent component should handle the state and pass both the current value and a function to update it. This pattern, known as "lifting state up," maintains the unidirectional data flow while allowing child components to trigger changes.

---

## Props with TypeScript

TypeScript enhances props with static type checking:

```typescript
// Define a Props interface
interface MedicationProps {
  name: string;
  dosage: number;
  unit: string;
  instructions?: string; // Optional prop
  sideEffects: string[];
  onPrescribe: (medicationName: string) => void;
}

// Use the interface with your component
const Medication = ({ 
  name, 
  dosage, 
  unit, 
  instructions = "Take as directed", // Default value for optional prop
  sideEffects,
  onPrescribe
}: MedicationProps) => {
  return (
    <div className="medication">
      <h2>{name}</h2>
      <p>Dosage: {dosage} {unit}</p>
      <p>Instructions: {instructions}</p>
      <h3>Side Effects:</h3>
      <ul>
        {sideEffects.map((effect, index) => (
          <li key={index}>{effect}</li>
        ))}
      </ul>
      <button onClick={() => onPrescribe(name)}>
        Prescribe Medication
      </button>
    </div>
  );
};
```

Note: TypeScript significantly enhances React development by providing static type checking for props, helping catch errors during development rather than at runtime. The standard approach is to define an interface or type that specifies the shape of your component's props. In the example, we've created a `MedicationProps` interface that defines the expected types for each prop. The question mark after `instructions?` indicates that this prop is optional. For optional props, you can provide default values using parameter default values in the function signature, as shown with `instructions = "Take as directed"`. TypeScript ensures that all required props are provided when using the component and that all props match their expected types. It also provides excellent editor support with autocompletion and inline documentation. For function props like `onPrescribe`, TypeScript allows you to specify the function signature, including parameter types and return type. This is particularly valuable for callback functions, ensuring they're called with the correct arguments. Using TypeScript with React props creates self-documenting components, making it easier for other developers (or your future self) to understand how to use them correctly.

---

## Children Props

The special `children` prop allows components to accept and render nested content:

```typescript
interface CardProps {
  title: string;
  children: React.ReactNode;
}

const Card = ({ title, children }: CardProps) => {
  return (
    <div className="card">
      <div className="card-header">
        <h2>{title}</h2>
      </div>
      <div className="card-body">
        {children}
      </div>
    </div>
  );
};

// Usage
const App = () => {
  return (
    <Card title="Medication Information">
      <p>Lisinopril is used to treat high blood pressure.</p>
      <p>Take once daily with or without food.</p>
    </Card>
  );
};
```

Note: The `children` prop is a special prop in React that allows components to accept and render nested content. It represents whatever is passed between the opening and closing tags of a component. This pattern is widely used for creating container or layout components that wrap other content. In the example, we've created a Card component that accepts a title prop and children. The Card component provides consistent styling and structure, while allowing the parent component to determine what content goes inside. The type for children is typically `React.ReactNode`, which encompasses all possible React nodes including elements, strings, numbers, fragments, portals, and null or undefined. This flexibility allows a component to accept virtually any renderable content as children. The children prop enables component composition, one of React's most powerful patterns. It allows you to create reusable wrapper components for common UI patterns like cards, modals, tabs, and layouts. By leveraging the children prop, you can create more flexible and composable component APIs, reducing the need for complex prop configurations and making your components more intuitive to use.

---

## Component Composition

Composition allows building complex UIs from simpler components:

```typescript
// Specialized components
const MedicationHeader = ({ name, category }: 
  { name: string, category: string }) => (
  <div className="medication-header">
    <h2>{name}</h2>
    <span className="category">{category}</span>
  </div>
);

const MedicationDosage = ({ amount, frequency }: 
  { amount: string, frequency: string }) => (
  <div className="medication-dosage">
    <p><strong>Dosage:</strong> {amount}</p>
    <p><strong>Frequency:</strong> {frequency}</p>
  </div>
);

const MedicationSideEffects = ({ effects }: { effects: string[] }) => (
  <div className="medication-side-effects">
    <h3>Possible Side Effects:</h3>
    <ul>
      {effects.map((effect, index) => (
        <li key={index}>{effect}</li>
      ))}
    </ul>
  </div>
);

// Composed component
const MedicationDetail = () => {
  const sideEffects = ["Dizziness", "Cough", "Headache"];
  
  return (
    <div className="medication-detail">
      <MedicationHeader name="Lisinopril" category="ACE Inhibitor" />
      <MedicationDosage amount="10mg" frequency="Once daily" />
      <MedicationSideEffects effects={sideEffects} />
    </div>
  );
};
```

Note: Component composition is a fundamental pattern in React that involves combining smaller, focused components to build more complex UIs. This approach offers several advantages over inheritance or large monolithic components. By breaking down your UI into smaller, single-responsibility components, you improve reusability, maintainability, and testability. In the example, we've created three specialized components—MedicationHeader, MedicationDosage, and MedicationSideEffects—each responsible for rendering a specific part of the medication information. These components are then composed together in the MedicationDetail component to create a complete medication detail view. This composition approach makes the code more modular and easier to maintain. If you need to change how the dosage information is displayed, you only need to modify the MedicationDosage component. Composition also enhances reusability—these specialized components could be used in different contexts throughout the application. For instance, MedicationHeader might be used in a list view as well as a detail view. React's component composition model is often described with the phrase "composition over inheritance," encouraging developers to build complex components by composing simpler ones rather than creating complex inheritance hierarchies.

---

## Prop Drilling and Its Limitations

Prop drilling occurs when props are passed through multiple component layers:

```typescript
// Top-level component with data
const MedicationDashboard = () => {
  const user = { name: "Dr. Smith", role: "Physician" };
  
  return (
    <div className="dashboard">
      <Header user={user} />
      <MedicationList user={user} />
    </div>
  );
};

// Middle component that doesn't use user but passes it down
const MedicationList = ({ user }: { user: { name: string, role: string } }) => {
  const medications = [
    { id: 1, name: "Aspirin" },
    { id: 2, name: "Lisinopril" }
  ];
  
  return (
    <div className="medication-list">
      <h2>Medications</h2>
      {medications.map(med => (
        <MedicationItem 
          key={med.id} 
          medication={med} 
          user={user} 
        />
      ))}
    </div>
  );
};

// Leaf component that finally uses the user prop
const MedicationItem = ({ 
  medication, 
  user 
}: { 
  medication: { id: number, name: string }, 
  user: { name: string, role: string } 
}) => {
  return (
    <div className="medication-item">
      <h3>{medication.name}</h3>
      <p>Prescribed by: {user.name} ({user.role})</p>
    </div>
  );
};
```

Note: Prop drilling refers to the process of passing props through multiple layers of components, even through components that don't directly use those props but merely pass them down to their children. In the example, the user object is defined in the MedicationDashboard component and passed down to the MedicationItem component through the MedicationList component, which doesn't actually use the user data itself. While this approach works for simple applications with shallow component trees, it becomes problematic as your application grows. Prop drilling can lead to several issues: it makes your code more verbose and harder to maintain, creates unnecessary coupling between components, complicates refactoring, and can impact performance by causing unnecessary re-renders. As your application grows more complex, you'll want to consider alternative approaches for sharing data between components that aren't directly connected in the component hierarchy. In later sections, we'll explore solutions like Context API and state management libraries that help address these limitations. These solutions provide ways to make data available to components without explicitly passing it through every level of the component tree, reducing the need for prop drilling and making your code more maintainable.

---

# Section 4: State and Lifecycle

---

## Understanding Component State

State represents data that changes over time and affects a component's rendering:

```typescript
import React, { useState } from 'react';

const MedicationCounter = () => {
  // Initialize state with useState hook
  const [count, setCount] = useState<number>(0);
  
  // Event handlers that update state
  const increment = () => {
    setCount(count + 1);
  };
  
  const decrement = () => {
    setCount(prevCount => Math.max(0, prevCount - 1));
  };
  
  return (
    <div className="medication-counter">
      <h2>Medication Count: {count}</h2>
      <div className="controls">
        <button onClick={decrement}>Decrease</button>
        <button onClick={increment}>Increase</button>
      </div>
      {count === 0 && <p>Please add medications to your cart.</p>}
    </div>
  );
};
```

Note: State is one of the most important concepts in React, representing data that changes over time and affects a component's rendering. Unlike props, which are passed from parent components and are read-only, state is managed internally by the component and can be updated. In functional components, state is managed using the useState hook, which returns a pair: the current state value and a function to update it. The useState hook takes an initial state value as its argument and returns an array with two elements. By convention, we use array destructuring to assign names to these elements—typically the state variable and a setter function prefixed with "set". In the example, we're tracking a count of medications with an initial value of 0. The increment and decrement functions update this state in response to button clicks. Notice that the decrement function uses a functional update form (`prevCount => Math.max(0, prevCount - 1)`) to ensure we're working with the most current state value and to prevent the count from going below zero. When state changes, React automatically re-renders the component with the new state values, updating the UI to reflect the current state. This is a key aspect of React's declarative approach—you describe how the UI should look based on the current state, and React handles the updates.

---

## useState Hook

The `useState` hook lets functional components manage state:

```typescript
import React, { useState } from 'react';

interface Medication {
  id: number;
  name: string;
  dosage: string;
  isSelected: boolean;
}

const MedicationSelector = () => {
  // State for a single value
  const [searchTerm, setSearchTerm] = useState<string>('');
  
  // State for an array of objects
  const [medications, setMedications] = useState<Medication[]>([
    { id: 1, name: "Aspirin", dosage: "325mg", isSelected: false },
    { id: 2, name: "Lisinopril", dosage: "10mg", isSelected: false },
    { id: 3, name: "Metformin", dosage: "500mg", isSelected: false }
  ]);
  
  // Handler to toggle medication selection
  const toggleSelection = (id: number) => {
    setMedications(prevMeds => 
      prevMeds.map(med => 
        med.id === id ? { ...med, isSelected: !med.isSelected } : med
      )
    );
  };
  
  // Handler for search input
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };
  
  // Filter medications based on search term
  const filteredMedications = medications.filter(med => 
    med.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  return (
    <div className="medication-selector">
      <input 
        type="text" 
        placeholder="Search medications..." 
        value={searchTerm} 
        onChange={handleSearch}
      />
      
      <ul className="medication-list">
        {filteredMedications.map(med => (
          <li 
            key={med.id} 
            className={med.isSelected ? 'selected' : ''}
            onClick={() => toggleSelection(med.id)}
          >
            <strong>{med.name}</strong> - {med.dosage}
          </li>
        ))}
      </ul>
      
      <div className="selected-count">
        Selected: {medications.filter(med => med.isSelected).length}
      </div>
    </div>
  );
};
```

Note: The useState hook is the primary way to add state to functional components in React. It takes an initial state value as its argument and returns an array with two elements: the current state value and a function to update it. We typically use array destructuring to name these elements. In the example, we're managing two pieces of state: a simple string for the search term and a more complex array of medication objects. When working with complex state like objects or arrays, it's important to maintain immutability when updating state. Notice how the toggleSelection function creates a new array using map() rather than modifying the existing array. This immutability is crucial for React's rendering optimization. The functional update form (passing a function to the state setter) is used to ensure we're working with the most current state, which is important when the new state depends on the previous state. This pattern helps avoid bugs related to stale state in asynchronous updates. The example also demonstrates derived state—filteredMedications is calculated from the current state values but isn't state itself. This pattern is preferred over storing derived values in state, as it ensures the derived value is always in sync with its dependencies.

---

## Controlled vs Uncontrolled Components

React offers two approaches for handling form inputs:

```typescript
import React, { useState, useRef, FormEvent } from 'react';

// Controlled Component Example
const ControlledForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Controlled Form Submitted:', { name, email });
    // Form values are already available in state
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Name:</label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="email">Email:</label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

// Uncontrolled Component Example
const UncontrolledForm = () => {
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Access form values from refs
    const name = nameRef.current?.value || '';
    const email = emailRef.current?.value || '';
    
    console.log('Uncontrolled Form Submitted:', { name, email });
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name-uncontrolled">Name:</label>
        <input
          id="name-uncontrolled"
          type="text"
          ref={nameRef}
          defaultValue=""
        />
      </div>
      <div>
        <label htmlFor="email-uncontrolled">Email:</label>
        <input
          id="email-uncontrolled"
          type="email"
          ref={emailRef}
          defaultValue=""
        />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};
```

Note: React provides two approaches for handling form inputs: controlled and uncontrolled components. In controlled components, form data is handled by React state. Each input element's value is set by state and updated through onChange handlers. This gives you complete control over the form's behavior and makes it easy to implement features like validation, conditional disabling of the submit button, or dynamically changing form fields. The downside is that you need to write an event handler for every way the data can change and store all form data in state. In uncontrolled components, form data is handled by the DOM itself. Instead of writing an event handler for every state update, you use a ref to get form values directly from the DOM when needed, typically during form submission. This approach is less code and can be useful for integrating React with non-React code. However, it provides less control and makes certain features harder to implement. In general, controlled components are recommended for most use cases as they're more "React-like" and provide more predictable behavior. They make form state explicit and keep it in one place, making debugging easier. Uncontrolled components can be useful for simple forms or when integrating with third-party DOM libraries. The choice between controlled and uncontrolled components depends on your specific requirements and the complexity of your form.

---

## Context API for State Management

React's Context API provides a way to share state across components without prop drilling:

```typescript
import React, { createContext, useContext, useState, ReactNode } from 'react';

// Define the shape of our context
interface MedicationContextType {
  medications: Medication[];
  addMedication: (medication: Medication) => void;
  removeMedication: (id: number) => void;
}

interface Medication {
  id: number;
  name: string;
  dosage: string;
}

// Create the context with a default value
const MedicationContext = createContext<MedicationContextType | undefined>(undefined);

// Create a provider component
interface MedicationProviderProps {
  children: ReactNode;
}

export const MedicationProvider = ({ children }: MedicationProviderProps) => {
  const [medications, setMedications] = useState<Medication[]>([
    { id: 1, name: "Aspirin", dosage: "325mg" },
    { id: 2, name: "Lisinopril", dosage: "10mg" }
  ]);
  
  const addMedication = (medication: Medication) => {
    setMedications(prevMeds => [...prevMeds, medication]);
  };
  
  const removeMedication = (id: number) => {
    setMedications(prevMeds => prevMeds.filter(med => med.id !== id));
  };
  
  // Provide the context value to all children
  return (
    <MedicationContext.Provider value={{ medications, addMedication, removeMedication }}>
      {children}
    </MedicationContext.Provider>
  );
};

// Custom hook to use the medication context
export const useMedications = () => {
  const context = useContext(MedicationContext);
  if (context === undefined) {
    throw new Error('useMedications must be used within a MedicationProvider');
  }
  return context;
};

// Example usage in components
const MedicationList = () => {
  const { medications } = useMedications();
  
  return (
    <div>
      <h2>Medication List</h2>
      <ul>
        {medications.map(med => (
          <MedicationItem key={med.id} medication={med} />
        ))}
      </ul>
    </div>
  );
};

const MedicationItem = ({ medication }: { medication: Medication }) => {
  const { removeMedication } = useMedications();
  
  return (
    <li>
      <span>{medication.name} - {medication.dosage}</span>
      <button onClick={() => removeMedication(medication.id)}>Remove</button>
    </li>
  );
};

const AddMedicationForm = () => {
  const { addMedication } = useMedications();
  const [name, setName] = useState('');
  const [dosage, setDosage] = useState('');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && dosage) {
      addMedication({
        id: Date.now(), // Simple way to generate unique IDs
        name,
        dosage
      });
      setName('');
      setDosage('');
    }
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Medication name"
        value={name}
        onChange={e => setName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Dosage"
        value={dosage}
        onChange={e => setDosage(e.target.value)}
      />
      <button type="submit">Add Medication</button>
    </form>
  );
};

// App component that wraps everything with the provider
const App = () => {
  return (
    <MedicationProvider>
      <div className="app">
        <h1>Pharmacy Management</h1>
        <AddMedicationForm />
        <MedicationList />
      </div>
    </MedicationProvider>
  );
};
```

Note: The Context API is React's built-in solution for sharing state across components without having to pass props through every level of the component tree. It's particularly useful for global state that many components need to access, such as user authentication, theme preferences, or application settings. The Context API consists of three main parts: the context object (created with createContext), a Provider component that makes the context available to its children, and consumers that read the context (either via useContext hook or Context.Consumer). In the example, we've created a medication management system with a context that provides access to the medications array and functions to add or remove medications. The MedicationProvider component manages the state and provides it to all child components. We've also created a custom hook (useMedications) that simplifies consuming the context and provides better error messages if used incorrectly. The components can now access the shared state without prop drilling—MedicationList displays all medications, MedicationItem can remove a medication, and AddMedicationForm can add a new one, all without passing props through intermediate components. While Context is powerful, it's not optimized for high-frequency updates, as all components that consume a context will re-render when the context value changes. For complex state management with better performance, you might consider combining Context with useReducer or using a dedicated state management library like Redux or Zustand.

---

## Custom Hooks

Custom hooks let you extract and reuse stateful logic between components:

```typescript
import { useState, useEffect } from 'react';

// Custom hook for fetching data
function useFetch<T>(url: string) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let isMounted = true;
    
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(url);
        
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        const result = await response.json();
        
        if (isMounted) {
          setData(result);
          setError(null);
        }
      } catch (err) {
        if (isMounted) {
          setError(err instanceof Error ? err : new Error('An unknown error occurred'));
          setData(null);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchData();
    
    return () => {
      isMounted = false;
    };
  }, [url]);

  return { data, loading, error };
}

// Custom hook for form handling
function useForm<T extends Record<string, any>>(initialValues: T) {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setValues(prev => ({ ...prev, [name]: value }));
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
  };

  const resetForm = () => {
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
    resetForm,
    setValues,
    setErrors
  };
}

// Example usage of custom hooks
function MedicationSearch() {
  const { data, loading, error } = useFetch<{ medications: Array<{ id: number, name: string, dosage: string }> }>('https://api.example.com/medications');

  if (loading) return <div>Loading medications...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h2>Medications</h2>
      <ul>
        {data?.medications.map(med => (
          <li key={med.id}>{med.name} - {med.dosage}</li>
        ))}
      </ul>
    </div>
  );
}

function MedicationForm() {
  const { values, handleChange, handleBlur, errors, touched, resetForm } = useForm({
    name: '',
    dosage: '',
    frequency: 'daily'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', values);
    resetForm();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Medication Name:</label>
        <input
          id="name"
          name="name"
          value={values.name}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {touched.name && errors.name && <div className="error">{errors.name}</div>}
      </div>
      
      <div>
        <label htmlFor="dosage">Dosage:</label>
        <input
          id="dosage"
          name="dosage"
          value={values.dosage}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {touched.dosage && errors.dosage && <div className="error">{errors.dosage}</div>}
      </div>
      
      <div>
        <label htmlFor="frequency">Frequency:</label>
        <select
          id="frequency"
          name="frequency"
          value={values.frequency}
          onChange={handleChange}
          onBlur={handleBlur}
        >
          <option value="daily">Once Daily</option>
          <option value="twice-daily">Twice Daily</option>
          <option value="as-needed">As Needed</option>
        </select>
      </div>
      
      <button type="submit">Submit</button>
      <button type="button" onClick={resetForm}>Reset</button>
    </form>
  );
}
```

Note: Custom hooks are a powerful feature in React that allows you to extract component logic into reusable functions. They follow the "use" naming convention and can call other hooks, enabling you to compose complex behavior from simpler pieces. In the example, we've created two custom hooks: useFetch for data fetching and useForm for form handling. The useFetch hook encapsulates the common pattern of fetching data, handling loading states, and managing errors. It's generic, accepting a type parameter to specify the expected data structure, making it type-safe with TypeScript. The useForm hook provides a complete form management solution, handling form values, validation, touched fields, and form reset functionality. Both hooks demonstrate how to extract complex, stateful logic that would otherwise be duplicated across components. Custom hooks promote code reuse, separation of concerns, and testability. They allow you to separate the UI from the logic, making your components cleaner and more focused on rendering. They can also encapsulate complex implementations behind simple interfaces, making your code more maintainable. When creating custom hooks, it's important to follow the rules of hooks: only call hooks at the top level of your function (not inside loops, conditions, or nested functions) and only call hooks from React function components or other custom hooks. Custom hooks are a fundamental tool for organizing and reusing logic in React applications, and mastering them will significantly improve your React development skills.

---

# Section 5: Exercise and Challenge

---

## Exercise: Medication Tracker

<div class="exercise">

### Exercise: Build a Medication Tracker

**Objective:** Create a simple medication tracker application using React and TypeScript that allows users to add, view, and delete medications.

**Time:** 15-20 minutes

**Requirements:**
1. Create a `Medication` interface with properties: `id` (number), `name` (string), `dosage` (string), and `frequency` (string)
2. Implement a form to add new medications
3. Display a list of added medications
4. Add the ability to delete medications from the list
5. Use React hooks (useState, useEffect) for state management
6. Implement proper TypeScript typing throughout

**Starting Code:**
```typescript
import React, { useState } from 'react';

interface Medication {
  // Define your interface here
}

const MedicationTracker = () => {
  // Implement your component here
  
  return (
    <div className="medication-tracker">
      <h1>Medication Tracker</h1>
      {/* Add your form and list here */}
    </div>
  );
};

export default MedicationTracker;
```

**Resources:**
- [React Hooks Documentation](https://reactjs.org/docs/hooks-intro.html)
- [TypeScript in React Documentation](https://www.typescriptlang.org/docs/handbook/react.html)
- [Expo Snack for Testing](https://snack.expo.dev/)

</div>

Note: This exercise is designed to reinforce the React concepts we've covered so far, particularly focusing on component creation, state management with hooks, and TypeScript integration. Start by defining the Medication interface with the required properties. Then, implement the MedicationTracker component with useState to manage the list of medications. Create a form with controlled inputs to add new medications, ensuring you generate a unique ID for each entry (you can use Date.now() for simplicity). Display the list of medications using the map function, making sure to include a key prop for each item. Add a delete button to each medication entry that removes it from the state. Remember to use proper TypeScript typing throughout your implementation, including for event handlers and state. This exercise will help solidify your understanding of React's component model, state management with hooks, and how TypeScript enhances your development experience by providing type safety. If you get stuck, refer to the examples we've covered in the module or check the provided resources.

---

## Challenge: Pharmacy Inventory System

<div class="challenge">

### Challenge: Build a Pharmacy Inventory System

**Objective:** Create a more comprehensive pharmacy inventory management system using React, TypeScript, and advanced React patterns.

**Time:** 30-60 minutes

**Requirements:**
1. Create a complete inventory management system with the following features:
   - Add, edit, and delete medications
   - Filter and search medications
   - Categorize medications by type
   - Track inventory levels with low stock warnings
   - Form validation for all inputs

2. Implement the following React patterns:
   - Custom hooks for reusable logic
   - Context API for global state management
   - Proper component composition
   - Performance optimization with React.memo or useMemo where appropriate

3. Use TypeScript effectively:
   - Create interfaces for all data structures
   - Type all props, state, and function parameters
   - Use generics where appropriate

**Starting Structure:**
```
/src
  /components
    /MedicationForm
      MedicationForm.tsx
    /MedicationList
      MedicationList.tsx
    /MedicationItem
      MedicationItem.tsx
    /MedicationFilter
      MedicationFilter.tsx
  /context
    MedicationContext.tsx
  /hooks
    useMedicationForm.ts
    useFilter.ts
  /types
    index.ts
  App.tsx
```

**Resources:**
- [React Context Documentation](https://reactjs.org/docs/context.html)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)
- [React Performance Optimization](https://reactjs.org/docs/optimizing-performance.html)
- [Expo Snack for Testing](https://snack.expo.dev/)

</div>

Note: This challenge extends the concepts from the exercise into a more comprehensive application that demonstrates advanced React patterns and best practices. Begin by defining your data types in the types directory, creating interfaces for medications, categories, and any other entities your system will manage. Implement the MedicationContext to provide global state management for your application, including functions to add, edit, and delete medications. Create custom hooks like useMedicationForm for form handling and validation, and useFilter for implementing search and filtering functionality. Build your components following good composition practices—each component should have a single responsibility. The MedicationForm component should handle adding and editing medications with proper validation. MedicationList should display medications with filtering options, while MedicationItem should render individual medications with edit and delete capabilities. Implement performance optimizations where appropriate, such as memoizing expensive calculations with useMemo or preventing unnecessary re-renders with React.memo. This challenge will test your ability to apply React's advanced patterns in a real-world scenario and create a well-structured, maintainable application. Focus on creating clean, reusable components and hooks that demonstrate your understanding of React's component model and state management approaches.

---

# Section 6: Summary and Resources

---

## Summary

In this module, we've covered:

- React's component-based architecture and its advantages
- JSX syntax and how it works under the hood
- Creating and using functional components with TypeScript
- Props and component composition patterns
- State management with useState and useReducer hooks
- Side effects with useEffect and other React hooks
- Context API for global state management
- Performance optimization techniques
- Custom hooks for reusable logic

Note: This module has provided a comprehensive introduction to React, the foundation of React Native development. We started with the core concepts of React's component-based architecture and its declarative approach to UI development. We explored JSX, React's syntax extension that makes component creation intuitive by combining HTML-like markup with JavaScript expressions. We covered both class and functional components, with a focus on the modern hooks-based approach. Props and component composition were examined as the primary mechanisms for building complex UIs from simpler pieces. State management was a major focus, covering useState for simple state, useReducer for complex state logic, and Context API for global state sharing. We also explored the useEffect hook for handling side effects like data fetching and subscriptions. Performance optimization techniques like React.memo and useMemo were introduced to help you build efficient applications. Finally, we looked at custom hooks as a powerful pattern for extracting and reusing stateful logic. These concepts form the foundation for React Native development, as they transfer directly to building mobile applications.

---

## Additional Resources

### Official Documentation
- [React Documentation](https://reactjs.org/docs/getting-started.html)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)
- [React TypeScript Cheatsheet](https://github.com/typescript-cheatsheets/react)

### Books and Courses
- "React Up and Running" by Stoyan Stefanov
- "Learning React" by Alex Banks and Eve Porcello
- "React - The Complete Guide" on Udemy by Maximilian Schwarzmüller

### Tools and Libraries
- [Create React App](https://create-react-app.dev/)
- [React DevTools](https://reactjs.org/blog/2019/08/15/new-react-devtools.html)
- [ESLint React Plugin](https://github.com/jsx-eslint/eslint-plugin-react)

### Community Resources
- [React Subreddit](https://www.reddit.com/r/reactjs/)
- [Reactiflux Discord Community](https://www.reactiflux.com/)
- [Stack Overflow React Questions](https://stackoverflow.com/questions/tagged/reactjs)

Note: These resources will help you deepen your understanding of React and continue your learning journey. The official React documentation is comprehensive and regularly updated, making it an excellent primary reference. The TypeScript Handbook and React TypeScript Cheatsheet provide valuable guidance for using TypeScript effectively with React. The recommended books and courses offer structured learning paths with practical examples and exercises. Tools like Create React App simplify project setup, while React DevTools provides powerful debugging capabilities. ESLint with the React plugin helps enforce best practices and catch common mistakes. Community resources like the React subreddit, Reactiflux Discord, and Stack Overflow are invaluable for getting help, staying updated with the latest trends, and connecting with other React developers. As you continue to build React and React Native applications, these resources will serve as valuable references and learning aids. Remember that React's ecosystem is constantly evolving, so staying connected with the community and regularly checking the official documentation will help you keep your skills current.

---

# Thank You!

Questions?

[Back to Course Home](../../index.html)
