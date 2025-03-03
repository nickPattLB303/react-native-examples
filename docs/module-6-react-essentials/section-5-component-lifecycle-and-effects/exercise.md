# Exercise: Medication Reminder with Effects

## Objective
Build a medication reminder component that demonstrates understanding of the component lifecycle, side effects with useEffect, and other advanced hooks.

## Duration
45-60 minutes

## Exercise Description

In this exercise, you'll implement a medication reminder component that fetches medication data, manages timers for reminders, and handles app state changes. You'll use various React hooks like `useEffect`, `useContext`, and performance optimization hooks.

### Requirements

You'll create the following components and functionality:

1. **Data Fetching**: Fetch medication data from an API (simulated)
2. **Reminder Timer**: Implement a timer that checks for due medications
3. **AppState Monitoring**: Pause reminders when the app is in the background
4. **Data Persistence**: Save reminder settings to localStorage/AsyncStorage
5. **Custom Hook**: Abstract logic into at least one custom hook

### Implementation Steps

#### 1. Set Up the MedicationReminder Component

Start by creating the main component structure:

```jsx
import React, { useState, useEffect } from 'react';
// For React Native:
// import { View, Text, Switch, Alert } from 'react-native';

function MedicationReminder() {
  // State for medications and settings
  const [medications, setMedications] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [remindersEnabled, setRemindersEnabled] = useState(true);
  const [reminderInterval, setReminderInterval] = useState(30); // minutes
  
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
        <label>
          Check Interval (minutes):
          <input
            type="number"
            min="1"
            max="60"
            value={reminderInterval}
            onChange={(e) => setReminderInterval(Number(e.target.value))}
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
  
  // For React Native: Similar implementation with View, Text, Switch instead of div, h1, input
}

// Helper function to format dates
function formatNextDose(dateString) {
  if (!dateString) return 'Not scheduled';
  
  const date = new Date(dateString);
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}
```

#### 2. Implement Data Fetching with useEffect

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

#### 3. Implement Reminder Timer with useEffect

Add an effect to check for medications that need to be taken:

```jsx
// Inside MedicationReminder component

// Reminder timer effect
useEffect(() => {
  // Skip if reminders are disabled or no medications
  if (!remindersEnabled || medications.length === 0) return;
  
  // Set up the interval
  const intervalId = setInterval(() => {
    const now = new Date();
    
    // Check each medication
    medications.forEach(med => {
      const nextDose = new Date(med.nextDose);
      
      // If the next dose is due (or overdue), show a reminder
      if (nextDose <= now) {
        // For web
        alert(`Time to take your ${med.name} (${med.dosage})!`);
        
        // For React Native
        // Alert.alert('Medication Reminder', `Time to take your ${med.name} (${med.dosage})!`);
        
        // In a real app, you would update the medication's next dose time here
      }
    });
  }, reminderInterval * 60 * 1000); // Convert minutes to milliseconds
  
  // Cleanup function
  return () => {
    clearInterval(intervalId);
  };
}, [medications, remindersEnabled, reminderInterval]); // Dependencies
```

#### 4. Implement AppState Monitoring (for React Native)

Add an effect to pause reminders when the app goes to the background:

```jsx
// For React Native only
// Import AppState from react-native
// const [appState, setAppState] = useState(AppState.currentState);

// AppState monitoring effect
useEffect(() => {
  // This is React Native specific - for web, you might use the Page Visibility API
  
  /* React Native implementation:
  
  const subscription = AppState.addEventListener('change', nextAppState => {
    console.log(`App state changed from ${appState} to ${nextAppState}`);
    setAppState(nextAppState);
    
    // Pause reminders when app goes to background
    if (nextAppState === 'background') {
      console.log('App went to background - pausing reminders');
      setRemindersEnabled(false);
    } else if (nextAppState === 'active' && appState === 'background') {
      console.log('App came to foreground - resuming reminders');
      setRemindersEnabled(true);
    }
  });
  
  // Clean up subscription
  return () => {
    subscription.remove();
  };
  */
  
  // For web, you could use the Page Visibility API instead:
  const handleVisibilityChange = () => {
    if (document.hidden) {
      console.log('Page is hidden - pausing reminders');
      setRemindersEnabled(false);
    } else {
      console.log('Page is visible - resuming reminders');
      setRemindersEnabled(true);
    }
  };
  
  document.addEventListener('visibilitychange', handleVisibilityChange);
  
  return () => {
    document.removeEventListener('visibilitychange', handleVisibilityChange);
  };
}, []); // Empty dependency array for web
// For React Native: [appState]
```

#### 5. Implement Settings Persistence with useEffect

Add an effect to save and load reminder settings:

```jsx
// Inside MedicationReminder component

// Load settings from storage on mount
useEffect(() => {
  // For web:
  const savedSettings = localStorage.getItem('reminderSettings');
  if (savedSettings) {
    const { enabled, interval } = JSON.parse(savedSettings);
    setRemindersEnabled(enabled);
    setReminderInterval(interval);
  }
  
  // For React Native:
  /* 
  const loadSettings = async () => {
    try {
      const savedSettings = await AsyncStorage.getItem('reminderSettings');
      if (savedSettings) {
        const { enabled, interval } = JSON.parse(savedSettings);
        setRemindersEnabled(enabled);
        setReminderInterval(interval);
      }
    } catch (e) {
      console.error('Failed to load settings', e);
    }
  };
  
  loadSettings();
  */
}, []); // Empty dependency array -> run only on mount

// Save settings when they change
useEffect(() => {
  // For web:
  const settings = { enabled: remindersEnabled, interval: reminderInterval };
  localStorage.setItem('reminderSettings', JSON.stringify(settings));
  
  // For React Native:
  /*
  const saveSettings = async () => {
    try {
      const settings = { enabled: remindersEnabled, interval: reminderInterval };
      await AsyncStorage.setItem('reminderSettings', JSON.stringify(settings));
    } catch (e) {
      console.error('Failed to save settings', e);
    }
  };
  
  saveSettings();
  */
}, [remindersEnabled, reminderInterval]); // Dependencies
```

#### 6. Create a Custom Hook

Extract the reminder logic into a custom hook:

```jsx
// In a separate file or above the component
function useReminderTimer(medications, enabled, interval) {
  const [dueReminders, setDueReminders] = useState([]);
  
  useEffect(() => {
    if (!enabled || medications.length === 0) return;
    
    console.log(`Setting up reminder timer with interval: ${interval} minutes`);
    
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
    const intervalId = setInterval(checkReminders, interval * 60 * 1000);
    
    return () => {
      console.log('Cleaning up reminder timer');
      clearInterval(intervalId);
    };
  }, [medications, enabled, interval]);
  
  return dueReminders;
}

// Use the custom hook in the component
function MedicationReminder() {
  // Earlier state definitions...
  
  // Use the custom hook
  const dueReminders = useReminderTimer(medications, remindersEnabled, reminderInterval);
  
  // Effect to show alerts for due reminders
  useEffect(() => {
    dueReminders.forEach(med => {
      // Show alert for each due reminder
      alert(`Time to take your ${med.name} (${med.dosage})!`);
      
      // For React Native
      // Alert.alert('Medication Reminder', `Time to take your ${med.name} (${med.dosage})!`);
    });
  }, [dueReminders]);
  
  // Rest of the component...
}
```

#### 7. Optimize with useMemo and useCallback

Add performance optimizations:

```jsx
// Inside MedicationReminder component

// Use useMemo for expensive calculations
const sortedMedications = useMemo(() => {
  console.log('Sorting medications');
  return [...medications].sort((a, b) => {
    return new Date(a.nextDose) - new Date(b.nextDose);
  });
}, [medications]);

// Use useCallback for functions passed to child components
const handleReminderToggle = useCallback((checked) => {
  setRemindersEnabled(checked);
}, []);

const handleIntervalChange = useCallback((value) => {
  setReminderInterval(Number(value));
}, []);
```

### Bonus Challenges

1. **Context API**: Implement a MedicationContext to provide medication data to all components
2. **Error Boundary**: Add an error boundary to gracefully handle errors in the component tree
3. **Multiple Effects**: Split the component into smaller components, each with their own focused effects
4. **Advanced Timer**: Implement a countdown timer that shows the time until the next medication is due

## Deliverables

1. MedicationReminder component with data fetching, timer, and persistence
2. Custom hook for reminder logic
3. Proper use of useEffect with cleanup functions
4. Performance optimizations with useMemo/useCallback
5. React Native-specific or web-specific implementations as appropriate

## Evaluation Criteria

- Correct implementation of useEffect with proper dependencies
- Effective use of cleanup functions to prevent memory leaks
- Appropriate handling of component lifecycle events
- Implementation of data persistence using effects
- Creation of reusable custom hooks
- Performance optimization with additional hooks

## Tips

- Focus on the cleanup functions in your effects to prevent memory leaks
- Test your component by mounting and unmounting it to ensure cleanup works
- Use the effect dependency array carefully to avoid infinite loops
- Consider edge cases like what happens if the component unmounts during a fetch
- Remember to abstract related logic into custom hooks for reusability 