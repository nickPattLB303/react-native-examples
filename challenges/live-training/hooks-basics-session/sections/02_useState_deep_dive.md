# useState Deep Dive
⏱️ Duration: 10 minutes

## Setup Notes
- Clean code editor visible
- TypeScript playground ready in another tab
- Diagrams for state flow ready
- Terminal with Expo project running
- Have common useState pitfalls examples prepared

## Verbal Script

[Ensure code editor is visible and clean]

"Now that we understand what we're building, let's dive into our first and most fundamental hook: **useState**. This hook is the foundation of local state management in React Native.

[Create a new file ProductCard.tsx]

Let's start by creating our component file. I'll explain every line as we go:

```typescript
import React, { useState } from 'react';
import { View } from 'react-native';
import styled from 'styled-components/native';
```

These imports might look simple, but let's break down why each one matters:
- We need React for JSX compilation
- useState is our star of the show today
- View is React Native's fundamental layout component
- styled-components will help us create maintainable styles

[Type out basic component structure]

```typescript
interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  description: string;
  imageUrl: string;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  id,
  name,
  price,
  description,
  imageUrl,
}) => {
  // Our hooks will go here
  return (
    <Container>
      {/* Component JSX will go here */}
    </Container>
  );
};
```

[Pause briefly]

For our iOS developers, think of this component like a UIViewController, but much more focused and reusable. For Android developers, it's similar to creating a custom View or Fragment.

Now, let's add our first piece of state:

```typescript
const [isFavorite, setIsFavorite] = useState(false);
```

This single line is doing quite a bit under the hood. Let's break it down:

1. The Destructuring Pattern:
```typescript
const [isFavorite, setIsFavorite] = ...
```
We're using array destructuring here. Why an array and not an object? This gives us the flexibility to name our variables anything we want. The first value is always the current state, and the second is the function to update it.

[Switch to diagram showing state updates]

2. The Initial Value:
```typescript
useState(false)
```
This sets our initial state. TypeScript will infer the boolean type, but we can be explicit:
```typescript
useState<boolean>(false)
```

Let's add more state to handle our expanding/collapsing description:

```typescript
const [isExpanded, setIsExpanded] = useState(false);
const [quantity, setQuantity] = useState(1);
```

[Show state updates in real-time]

Watch what happens when we update these values:

```typescript
const handleFavoritePress = () => {
  setIsFavorite(prev => !prev);
};
```

Notice a few key things here:
1. We're using the functional update pattern
2. The update is asynchronous
3. React will batch these updates for performance

[Switch to common pitfalls examples]

Here are some common mistakes to avoid:

1. Direct state mutation:
```typescript
// ❌ Wrong
isFavorite = true;

// ✅ Correct
setIsFavorite(true);
```

2. Using the current value directly in updates:
```typescript
// ❌ Potentially wrong
setQuantity(quantity + 1);

// ✅ Always correct
setQuantity(prev => prev + 1);
```

3. Assuming immediate updates:
```typescript
// ❌ This might not work as expected
setQuantity(5);
console.log(quantity); // Still old value!

// ✅ Use useEffect if you need to react to changes
useEffect(() => {
  console.log(quantity);
}, [quantity]);
```

[Show platform-specific considerations]

For our iOS developers: Unlike UIKit's property observers, state updates don't happen immediately. Think of setState more like dispatching to the main queue - it's scheduled but not instant.

For Android developers: This is similar to LiveData or StateFlow, but you don't need to explicitly set up observers. React handles the subscription model for you.

Let's implement our quantity controls:

```typescript
const handleIncrement = () => {
  setQuantity(prev => Math.min(prev + 1, 10)); // Maximum 10 items
};

const handleDecrement = () => {
  setQuantity(prev => Math.max(prev - 1, 1)); // Minimum 1 item
};
```

[Demo the state updates in Expo Go]

Watch how these updates trigger re-renders automatically. No need for manual view updates like in UIKit or calling notifyDataSetChanged in Android.

Any questions about useState before we move on to useEffect?

[Pause for questions]

## Visual Aids
- State update flow diagram (assets/diagrams/state-flow.png)
- Common pitfalls examples (assets/diagrams/useState-pitfalls.png)
- Platform comparison chart (assets/diagrams/platform-comparison.png)

## Code Examples
See code-snippets/typescript/useState-examples.ts for all code shown in this section.

## Checkpoints
- [ ] Basic useState syntax explained
- [ ] State update patterns demonstrated
- [ ] Common pitfalls covered
- [ ] Platform-specific parallels drawn
- [ ] Interactive examples shown
- [ ] Questions addressed

## Transition Notes
- Next section covers useEffect
- Keep the ProductCard.tsx file open
- Prepare to show side effects examples
- Energy should maintain technical focus but remain engaging 