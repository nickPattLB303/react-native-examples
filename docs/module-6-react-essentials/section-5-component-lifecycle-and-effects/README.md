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

1. **Mounting**: The component is being created and inserted into the DOM
2. **Updating**: The component is re-rendering due to changes in props or state
3. **Unmounting**: The component is being removed from the DOM

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

## Practice Exercise: Medication Reminder with Effects

### Objective
Build a simple medication reminder component that demonstrates understanding of the component lifecycle and side effects with useEffect.

### Duration
20-30 minutes

### Exercise Description

In this exercise, you'll implement a basic medication reminder component that fetches medication data and manages a timer for checking due medications.

#### Requirements

You'll implement the following functionality:

1. **Data Fetching**: Fetch medication data from a simulated API
2. **Reminder Timer**: Implement a timer that checks for due medications
3. **Custom Hook**: Extract reminder logic into a custom hook

#### Implementation Steps

##### 1. Set Up the MedicationReminder Component

Start by creating the main component structure:

```jsx
import React, { useState, useEffect } from 'react';

function MedicationReminder() {
  // State for medications and settings
  const [medications, setMedications] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [remindersEnabled, setRemindersEnabled] = useState(true);
  
  // Component implementation will go here
  
  return (
    <div className="medication-reminder">
      <h1>Medication Reminders</h1>
      
      {/* Loading and error states */}
      {isLoading && <p>Loading medications...</p>}
      {error && <p className="error">Error: {error}</p>}
      
      {/* Settings section */}
      <div className="reminder-settings">
        <h2>Reminder Settings</h2>
        <label>
          Enable Reminders:
          <input
            type="checkbox"
            checked={remindersEnabled}
            onChange={(e) => setRemindersEnabled(e.target.checked)}
          />
        </label>
      </div>
      
      {/* Medications list */}
      <div className="medications-list">
        <h2>Your Medications</h2>
        {medications.length === 0 ? (
          <p>No medications scheduled.</p>
        ) : (
          <ul>
            {medications.map(med => (
              <li key={med.id}>
                <strong>{med.name}</strong> - {med.dosage}
                <p>Next dose: {formatNextDose(med.nextDose)}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

// Helper function to format dates
function formatNextDose(dateString) {
  if (!dateString) return 'Not scheduled';
  
  const date = new Date(dateString);
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}
```

##### 2. Implement Data Fetching with useEffect

Add the effect to fetch medication data:

```jsx
// Inside MedicationReminder component

// Simulate an API fetch
const fetchMedications = async () => {
  // In a real app, this would be an API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: '1',
          name: 'Lisinopril',
          dosage: '10mg',
          schedule: 'Daily',
          nextDose: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString(), // 2 hours from now
        },
        {
          id: '2',
          name: 'Metformin',
          dosage: '500mg',
          schedule: 'Twice daily',
          nextDose: new Date(Date.now() + 5 * 60 * 60 * 1000).toISOString(), // 5 hours from now
        },
        {
          id: '3',
          name: 'Aspirin',
          dosage: '81mg',
          schedule: 'Daily',
          nextDose: new Date(Date.now() + 30 * 60 * 1000).toISOString(), // 30 minutes from now
        }
      ]);
    }, 1000); // Simulate network delay
  });
};

// Data fetching effect
useEffect(() => {
  let isMounted = true;
  
  const loadMedications = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await fetchMedications();
      
      // Only update state if component is still mounted
      if (isMounted) {
        setMedications(data);
        setIsLoading(false);
      }
    } catch (err) {
      if (isMounted) {
        setError(err.message || 'Failed to fetch medications');
        setIsLoading(false);
      }
    }
  };
  
  loadMedications();
  
  // Cleanup function
  return () => {
    isMounted = false;
  };
}, []); // Empty dependency array -> run only on mount
```

##### 3. Implement Reminder Timer with useEffect

Add an effect to check for medications that need to be taken:

```jsx
// Inside MedicationReminder component

// Reminder timer effect
useEffect(() => {
  // Skip if reminders are disabled or no medications
  if (!remindersEnabled || medications.length === 0) return;
  
  console.log('Setting up reminder timer');
  
  // Set up the interval
  const intervalId = setInterval(() => {
    const now = new Date();
    
    // Check each medication
    medications.forEach(med => {
      const nextDose = new Date(med.nextDose);
      
      // If the next dose is due (or overdue), show a reminder
      if (nextDose <= now) {
        alert(`Time to take your ${med.name} (${med.dosage})!`);
      }
    });
  }, 60 * 1000); // Check every minute
  
  // Cleanup function
  return () => {
    console.log('Cleaning up reminder timer');
    clearInterval(intervalId);
  };
}, [medications, remindersEnabled]); // Dependencies
```

##### 4. Create a Custom Hook (Bonus)

Extract the reminder logic into a custom hook:

```jsx
// In a separate file or above the component
function useReminderTimer(medications, enabled) {
  const [dueReminders, setDueReminders] = useState([]);
  
  useEffect(() => {
    if (!enabled || medications.length === 0) return;
    
    const checkReminders = () => {
      const now = new Date();
      const due = medications.filter(med => new Date(med.nextDose) <= now);
      
      if (due.length > 0) {
        setDueReminders(due);
      }
    };
    
    // Check immediately
    checkReminders();
    
    // Then set up interval
    const intervalId = setInterval(checkReminders, 60 * 1000);
    
    return () => {
      clearInterval(intervalId);
    };
  }, [medications, enabled]);
  
  return dueReminders;
}

// Use the custom hook in the component
function MedicationReminder() {
  // Earlier state definitions...
  
  // Use the custom hook
  const dueReminders = useReminderTimer(medications, remindersEnabled);
  
  // Effect to show alerts for due reminders
  useEffect(() => {
    dueReminders.forEach(med => {
      // Show alert for each due reminder
      alert(`Time to take your ${med.name} (${med.dosage})!`);
    });
  }, [dueReminders]);
  
  // Rest of the component...
}
```

### Deliverables

1. MedicationReminder component with data fetching and timer functionality
2. Proper use of useEffect with cleanup functions
3. Optional: Custom hook for reminder logic

### Bonus Challenges

If you finish early, try implementing these enhancements:

1. **Settings Persistence**: Save and load reminder settings using localStorage
2. **Sorting**: Sort medications by next dose time using useMemo
3. **Countdown**: Display a countdown timer to the next medication dose

### Tips

- Focus on the cleanup functions in your effects to prevent memory leaks
- Use the effect dependency array carefully to avoid infinite loops
- Consider edge cases like what happens if the component unmounts during a fetch
- Remember that effects run after render, not during it

In this section, we've explored React's component lifecycle and how to handle side effects with the `useEffect` hook. We've also looked at the Context API for sharing state across components and additional hooks for performance optimization. These concepts form the foundation for building sophisticated React and React Native applications that manage state, handle side effects, and optimize performance effectively. 