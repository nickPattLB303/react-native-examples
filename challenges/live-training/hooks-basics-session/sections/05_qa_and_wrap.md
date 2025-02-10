# Q&A and Wrap-up
⏱️ Duration: 20 minutes (10 minutes Q&A + 10 minutes wrap-up)

## Setup Notes
- Have ProductCard.tsx final version ready
- Common troubleshooting examples prepared
- Additional hooks examples ready
- Resources slide/links prepared
- Homework starter code accessible

## Verbal Script

### Q&A Session (10 minutes)

"Before we wrap up, let's address some common questions and scenarios you might encounter when working with hooks. I'll start with the most common ones I hear, and then open it up for your specific questions.

[Show common questions slide]

First, let's tackle the most frequently asked questions:

Q: 'When should I create a custom hook versus just using useState and useEffect directly?'

A: "Great question! Consider creating a custom hook when you find yourself:
- Repeating the same combination of hooks across components
- Managing complex logic that distracts from component rendering
- Wanting to share stateful logic between components

For example, in our ProductCard, we extracted the favorite logic because:
1. It combines multiple hooks (useState and useEffect)
2. It handles async storage and error states
3. We might want to use it in other components (ProductList, WishList, etc.)

[Show code comparison]

Q: 'How do hooks affect performance compared to class components?'

A: "Hooks can actually lead to better performance because:
1. They bundle related logic together, reducing re-renders
2. They make code splitting easier
3. They avoid the overhead of class instances

[Show performance comparison diagram]

Q: 'What's the best way to debug hooks?'

A: "Let me show you some debugging techniques:

[Open DevTools]

1. Using React DevTools:
```typescript
const [count, setCount] = useState(0);
useEffect(() => {
  console.log('Count changed:', count);
}, [count]);
```

2. Custom hooks debugging:
```typescript
export const useDebugValue = (value: any, label: string) => {
  if (__DEV__) {
    console.log(`${label}:`, value);
  }
};
```

[Show common pitfalls diagram]

Now, let's look at some troubleshooting scenarios:

1. Infinite Effect Loops:
```typescript
// ❌ Will cause infinite loop
useEffect(() => {
  setCount(count + 1);
}, [count]);

// ✅ Fixed version
useEffect(() => {
  if (someCondition) {
    setCount(prev => prev + 1);
  }
}, [someCondition]);
```

2. Stale Closures:
```typescript
// ❌ Stale closure
useEffect(() => {
  const handler = () => {
    console.log(count); // Might be stale
  };
  eventEmitter.on('event', handler);
  return () => eventEmitter.off('event', handler);
}, []); // Missing dependency

// ✅ Fixed version
useEffect(() => {
  const handler = () => {
    console.log(count);
  };
  eventEmitter.on('event', handler);
  return () => eventEmitter.off('event', handler);
}, [count]); // Proper dependency
```

[Open for questions]

"What questions do you have about what we've covered today?"

[Address audience questions for remaining Q&A time]

### Wrap-up (10 minutes)

"Let's recap what we've learned today:

1. **useState**
   - Local state management
   - Functional updates
   - TypeScript integration

2. **useEffect**
   - Side effects handling
   - Cleanup functions
   - Dependency arrays

3. **Custom Hooks**
   - Code reusability
   - Logic composition
   - Best practices

[Show final ProductCard]

We've built a production-ready component that:
- Handles state efficiently
- Manages side effects properly
- Uses custom hooks for reusability
- Implements proper TypeScript types
- Follows platform-specific best practices

[Show homework assignment]

For homework, I'd like you to:

1. Complete the ProductCard by adding:
   - Image loading states
   - Error boundaries
   - Unit tests

2. Create two new custom hooks:
   - useImageLoader
   - useProductPrice (with currency formatting)

3. Bonus Challenge:
   - Add gesture handling
   - Implement shared element transitions

All the starter code is in the repository under:
```
challenges/live-training/hooks-basics-session/homework/
```

[Show resources slide]

Here are some resources to help you dive deeper:
- React Hooks Documentation: [link]
- TypeScript Handbook: [link]
- React Native Animation Guide: [link]
- Custom Hooks Examples: [link]

Remember:
- Start with simple hooks
- Add complexity gradually
- Always consider cleanup
- Use TypeScript for better DX

[Final thoughts]

"Thank you all for your attention today! Feel free to reach out if you have any questions while working on the homework. Remember, hooks are just functions - they're powerful because they're simple and composable.

Next session, we'll cover advanced patterns with hooks, including:
- useReducer for complex state
- useImperativeHandle for ref manipulation
- useLayoutEffect for DOM measurements

Have a great rest of your day!"

## Visual Aids
- Common questions slide (assets/slides/common-questions.png)
- Performance comparison (assets/diagrams/hooks-vs-classes.png)
- Debugging examples (assets/diagrams/debugging-hooks.png)
- Resources list (assets/slides/resources.png)

## Code Examples
See code-snippets/typescript/qa-examples.ts for all code shown in this section.

## Checkpoints
- [ ] Common questions addressed
- [ ] Debugging techniques demonstrated
- [ ] Key concepts reviewed
- [ ] Homework assigned
- [ ] Resources shared
- [ ] Next session preview given

## Session End Notes
- Collect feedback forms
- Share links to resources
- Ensure homework access
- Schedule office hours
- Update progress tracking 