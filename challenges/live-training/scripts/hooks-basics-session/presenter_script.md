# React Hooks Live Training Session: useState and useEffect
⏱️ Duration: 60 minutes

## Setup (5 minutes)
"Welcome everyone! Today we're diving into two fundamental React hooks: useState and useEffect. We'll build a simple weather app that demonstrates both hooks in action."

**Check Prerequisites:**
- "Who here has experience with state management in native development?"
- "For iOS developers, think of useState like @State in SwiftUI or stored properties with property observers"
- "For Android developers, think of it like LiveData or StateFlow in ViewModels"

## Initial Code Walkthrough (5 minutes)
"Let's look at our starter code. We have a basic WeatherScreen component with some TODO comments and a mock weather API function."

**Key Points:**
- Show the empty component structure
- Point out the fetchWeather mock function
- Highlight the existing styles

## Implementing useState (15 minutes)

### Step 1: Import and Basic Setup
```typescript
"First, let's import useState and set up our state variables:"
import React, { useState } from 'react';

// Inside component:
const [temperature, setTemperature] = useState<number | null>(null);
const [isLoading, setIsLoading] = useState(false);
```

**Explain:**
- "useState returns an array with two elements: the state value and a setter function"
- "We're using TypeScript to define temperature as number | null"
- "isLoading is a boolean flag to handle loading states"

### Step 2: Using State in JSX
```typescript
"Now let's update our render logic to use these states:"
{isLoading ? (
  <Text style={styles.loading}>Loading weather data...</Text>
) : temperature !== null ? (
  <Text style={styles.temperature}>{temperature}°C</Text>
) : (
  <Text style={styles.loading}>No data available</Text>
)}
```

**Key Points:**
- Demonstrate conditional rendering
- Show how state updates trigger re-renders
- Explain the importance of null checks

## Implementing useEffect (15 minutes)

### Step 1: Import and Basic Setup
```typescript
"Let's add useEffect to fetch data when our component mounts:"
import React, { useState, useEffect } from 'react';

// Inside component:
useEffect(() => {
  loadWeather();
}, []); // Empty dependency array
```

**Explain:**
- "useEffect runs after every render"
- "Empty dependency array means it only runs once on mount"
- "Compare to viewDidLoad (iOS) or onCreate (Android)"

### Step 2: Implement Loading Function
```typescript
"Let's create our loadWeather function:"
const loadWeather = async () => {
  setIsLoading(true);
  try {
    const temp = await fetchWeather();
    setTemperature(temp);
  } catch (error) {
    console.error('Failed to fetch weather:', error);
  } finally {
    setIsLoading(false);
  }
};
```

**Key Points:**
- Show proper loading state management
- Demonstrate error handling
- Explain the importance of finally block

### Step 3: Add Refresh Button
```typescript
"Finally, let's add a button to manually refresh:"
<Button 
  title="Refresh Weather" 
  onPress={loadWeather}
  disabled={isLoading}
/>
```

## Common Questions (10 minutes)

Q: "Why use null instead of undefined for temperature?"
A: "In TypeScript, null explicitly indicates 'no value', while undefined could mean 'not initialized'"

Q: "Why do we need the loading state?"
A: "It provides better UX by showing users when data is being fetched, similar to activity indicators in native apps"

Q: "What happens if we remove the dependency array in useEffect?"
A: "It would run after every render, potentially causing infinite loops with state updates"

## Platform-Specific Notes (5 minutes)

**iOS Developers:**
- "useState is similar to @State in SwiftUI"
- "useEffect with empty array is like viewDidLoad"
- "Loading states replace UIActivityIndicatorView"

**Android Developers:**
- "useState replaces LiveData/StateFlow"
- "useEffect with empty array is like onCreate"
- "Loading states replace ProgressBar"

## Wrap-up (5 minutes)
- Recap the key concepts covered
- Preview next session topics
- Share resources for further learning
- Take final questions

## Debugging Tips
If state updates aren't reflecting:
1. Check that setter functions are being called
2. Verify the dependency array in useEffect
3. Ensure state updates are inside try/catch

## Alternative Implementations
- Could use reducer instead of multiple useState
- Could implement error state for better error handling
- Could add temperature unit conversion feature 