# useEffect Deep Dive
⏱️ Duration: 10 minutes

## Setup Notes
- ProductCard.tsx file open with useState implementation
- AsyncStorage examples ready
- Animation examples prepared
- Common useEffect patterns diagram ready
- Cleanup examples prepared

## Verbal Script

[Ensure ProductCard.tsx is visible]

"Now that we've mastered useState, let's tackle side effects with **useEffect**. This hook is your solution for handling everything that happens 'outside' of your component's render cycle.

[Add import to top of file]

```typescript
import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Animated, Platform } from 'react-native';
```

[Point to new imports]

We've added a few new imports here. AsyncStorage will help us persist our favorite state, and Animated will handle our expand/collapse animation.

For our iOS developers, useEffect combines several lifecycle methods you're familiar with:
- viewDidLoad
- viewWillAppear
- viewDidAppear
- viewWillDisappear

For Android developers, think of it like:
- onCreate
- onStart
- onResume
- onPause
- onDestroy

But instead of spreading our logic across multiple methods, we centralize it based on what data it depends on.

[Type out basic useEffect]

```typescript
useEffect(() => {
  // Effect code here
  return () => {
    // Cleanup code here
  };
}, [/* dependencies */]);
```

Let's break down this structure:
1. The effect function: What we want to happen
2. The cleanup function: How to clean up after ourselves
3. The dependency array: When to run the effect

[Add first real effect]

```typescript
const [fadeAnim] = useState(new Animated.Value(0));

useEffect(() => {
  // Start fade-in animation when component mounts
  Animated.timing(fadeAnim, {
    toValue: 1,
    duration: 500,
    useNativeDriver: true,
  }).start();
}, []); // Empty dependency array = only run on mount
```

[Point to empty dependency array]

Notice the empty array here. This means our animation only runs when the component mounts - similar to viewDidLoad or onCreate.

[Add favorite persistence effect]

```typescript
useEffect(() => {
  // Save favorite state to AsyncStorage
  const saveFavoriteState = async () => {
    try {
      await AsyncStorage.setItem(`favorite_${id}`, JSON.stringify(isFavorite));
    } catch (error) {
      console.error('Error saving favorite state:', error);
    }
  };

  saveFavoriteState();
}, [isFavorite, id]); // Run when favorite state changes
```

[Point to dependency array]

Here we have dependencies: isFavorite and id. This effect runs whenever either value changes.

[Show cleanup example]

Let's add an effect that needs cleanup:

```typescript
useEffect(() => {
  // Track view time for analytics
  const startTime = Date.now();
  
  // Cleanup function
  return () => {
    const duration = Date.now() - startTime;
    console.log(`Product ${id} viewed for ${duration}ms`);
  };
}, []); // Runs on mount, cleanup on unmount
```

[Switch to common mistakes diagram]

Let's look at some common useEffect pitfalls:

1. Missing dependencies:
```typescript
// ❌ Missing dependency
useEffect(() => {
  console.log(quantity);
}, []); // ESLint will warn you!

// ✅ Correct
useEffect(() => {
  console.log(quantity);
}, [quantity]);
```

2. Async effect function:
```typescript
// ❌ Wrong
useEffect(async () => {
  await loadData();
}, []);

// ✅ Correct
useEffect(() => {
  const loadData = async () => {
    await loadData();
  };
  loadData();
}, []);
```

3. Not cleaning up:
```typescript
// ❌ Memory leak potential
useEffect(() => {
  const subscription = someAPI.subscribe();
}, []);

// ✅ Proper cleanup
useEffect(() => {
  const subscription = someAPI.subscribe();
  return () => subscription.unsubscribe();
}, []);
```

[Show platform-specific considerations]

For iOS developers: Think of cleanup like viewWillDisappear - it's your chance to remove observers, listeners, and timers.

For Android developers: This is similar to onPause or onDestroy - where you'd typically clean up resources.

[Add expanded state effect]

```typescript
useEffect(() => {
  if (isExpanded) {
    // Trigger expand animation
    Animated.spring(expandAnim, {
      toValue: 1,
      useNativeDriver: false,
    }).start();
  } else {
    // Trigger collapse animation
    Animated.spring(expandAnim, {
      toValue: 0,
      useNativeDriver: false,
    }).start();
  }
}, [isExpanded]); // Run when expanded state changes
```

[Demo the animations]

Watch how our animations respond to state changes. The useEffect hook ensures our animations stay synchronized with our component's state.

Any questions about useEffect before we move on to custom hooks?

[Pause for questions]

## Visual Aids
- Lifecycle comparison diagram (assets/diagrams/lifecycle-comparison.png)
- Effect patterns flowchart (assets/diagrams/effect-patterns.png)
- Common mistakes examples (assets/diagrams/effect-mistakes.png)

## Code Examples
See code-snippets/typescript/useEffect-examples.ts for all code shown in this section.

## Checkpoints
- [ ] Basic useEffect syntax explained
- [ ] Dependency array concept clear
- [ ] Cleanup function importance demonstrated
- [ ] Common patterns shown
- [ ] Platform-specific parallels drawn
- [ ] Animation integration demonstrated

## Transition Notes
- Next section covers custom hooks
- Keep the ProductCard.tsx file open
- Prepare to extract shared logic
- Energy should build excitement for creating reusable hooks 