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

## Practice Exercise: Simple Medication Tracker

### Objective
Build a simple medication tracker component with state management, applying the useState hook and implementing state management best practices.

### Duration
20-30 minutes

### Exercise Description

In this exercise, you'll implement a basic medication tracking application that allows users to add medications to a list and toggle their status.

#### Requirements

You'll create the following components:

1. **MedicationTracker**: The main component that manages the medication list state
2. **MedicationForm**: A form component for adding new medications 
3. **MedicationItem**: A component to display a single medication with actions

#### Implementation Steps

##### 1. Set Up Basic State Structure

First, determine what state you need to track:

```jsx
function MedicationTracker() {
  // State for the medication list
  const [medications, setMedications] = useState([
    {
      id: '1',
      name: 'Lisinopril',
      dosage: '10mg',
      schedule: 'Daily',
      isActive: true
    },
    {
      id: '2',
      name: 'Metformin',
      dosage: '500mg',
      schedule: 'Twice daily',
      isActive: true
    }
  ]);
  
  // Rest of the component...
}
```

##### 2. Implement MedicationForm Component

Create a form component to add new medications:

```jsx
function MedicationForm({ onAddMedication }) {
  // State for form inputs
  const [name, setName] = useState('');
  const [dosage, setDosage] = useState('');
  const [schedule, setSchedule] = useState('Daily');

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!name || !dosage) return; // Basic validation
    
    // Generate a unique ID
    const newMedication = {
      id: Date.now().toString(),
      name,
      dosage,
      schedule,
      isActive: true
    };
    
    onAddMedication(newMedication);
    
    // Reset form
    setName('');
    setDosage('');
    setSchedule('Daily');
  };

  // Form JSX
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Medication Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Dosage"
        value={dosage}
        onChange={(e) => setDosage(e.target.value)}
        required
      />
      <select 
        value={schedule} 
        onChange={(e) => setSchedule(e.target.value)}
      >
        <option value="Daily">Daily</option>
        <option value="Twice daily">Twice daily</option>
        <option value="As needed">As needed</option>
      </select>
      <button type="submit">Add Medication</button>
    </form>
  );
}
```

##### 3. Implement MedicationItem Component

Create a component to display a single medication:

```jsx
function MedicationItem({ medication, onToggleStatus, onDelete }) {
  return (
    <div className={`medication-item ${medication.isActive ? 'active' : 'inactive'}`}>
      <h3>{medication.name}</h3>
      <p>Dosage: {medication.dosage}</p>
      <p>Schedule: {medication.schedule}</p>
      <p>Status: {medication.isActive ? 'Active' : 'Inactive'}</p>
      
      <button onClick={() => onToggleStatus(medication.id)}>
        {medication.isActive ? 'Mark as Inactive' : 'Mark as Active'}
      </button>
      
      <button onClick={() => onDelete(medication.id)}>
        Delete
      </button>
    </div>
  );
}
```

##### 4. Implement Main MedicationTracker Component

Combine all components and implement state management functions:

```jsx
function MedicationTracker() {
  // State as defined earlier
  // ...
  
  // Add a new medication
  const addMedication = (medication) => {
    setMedications([...medications, medication]);
  };
  
  // Toggle a medication's status
  const toggleMedicationStatus = (id) => {
    setMedications(medications.map(med => {
      if (med.id === id) {
        return { ...med, isActive: !med.isActive };
      }
      return med;
    }));
  };
  
  // Delete a medication
  const deleteMedication = (id) => {
    setMedications(medications.filter(med => med.id !== id));
  };
  
  // Render the components
  return (
    <div className="medication-tracker">
      <h1>Medication Tracker</h1>
      
      <MedicationForm onAddMedication={addMedication} />
      
      <div className="medication-list">
        {medications.length === 0 ? (
          <p>No medications found.</p>
        ) : (
          medications.map(medication => (
            <MedicationItem
              key={medication.id}
              medication={medication}
              onToggleStatus={toggleMedicationStatus}
              onDelete={deleteMedication}
            />
          ))
        )}
      </div>
    </div>
  );
}
```

### Deliverables

1. Functional medication tracker application with useState for state management
2. Components that demonstrate proper state usage and updates
3. Ability to add, toggle status, and delete medications

### Bonus Challenges

If you finish early, try implementing these enhancements:

1. **Filtering**: Add filter controls to show active or inactive medications
2. **useReducer**: Refactor the application to use useReducer instead of useState
3. **Local Storage**: Persist the medications using localStorage (web) or AsyncStorage (React Native)

### Tips

- Keep components focused on a single responsibility
- Use functional updates when new state depends on previous state
- Avoid direct mutations of state objects
- Consider which state should be local vs. lifted up

## State Management Beyond Hooks

For larger applications, you might need more sophisticated state management solutions:

1. **Context API**: For state that needs to be accessible by many components
2. **Redux**: For centralized state management with predictable state transitions
3. **MobX**: For reactive state management with less boilerplate
4. **Recoil**: For atomic state management designed specifically for React

We'll explore the Context API in the next section, and cover these other state management libraries in later modules.

In the next section, we'll dive into component lifecycle and side effects, which allow you to perform operations like data fetching and DOM manipulation that go beyond just rendering UI. 