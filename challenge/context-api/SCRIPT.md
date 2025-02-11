# React Native Theme Implementation with Context API
⏱️ Duration: 180 minutes

## Table of Contents
1. Introduction (5 min)
2. Context API Deep Dive (30 min)
3. React Hooks Fundamentals (30 min)
4. Theme System Architecture (30 min)
5. Implementation Steps (60 min)
6. Testing & Troubleshooting (15 min)
7. Q&A Session (10 min)

## Part 1: Introduction (5 min)

### Welcome & Overview
"Welcome everyone! Today we're embarking on a comprehensive journey into building a professional-grade theme system in React Native using the Context API. This isn't just a simple dark/light mode switch - we're building a complete, production-ready theming infrastructure.

What we'll build will:
- Implement a type-safe theme system
- Handle system theme preferences
- Persist user choices
- Include smooth transitions
- Support cross-platform styling
- Follow accessibility guidelines

### Target Audience
This session is designed for:
- React Native developers looking to implement robust theme systems
- iOS developers transitioning to React Native
- Android developers learning React patterns
- Teams implementing design systems

### Prerequisites
Before we begin, ensure you have:
1. React Native development environment
2. Node.js and npm installed
3. iOS Simulator or Android Emulator
4. Code editor (preferably VSCode)
5. Basic TypeScript knowledge

### Environment Setup
Let's start by installing required dependencies:

```bash
# Install base dependencies
npm install @react-native-async-storage/async-storage

# TypeScript types
npm install --save-dev @types/react @types/react-native
```

## Part 2: Context API Deep Dive (30 min)

### What is Context?
"The Context API is one of React's most powerful features for state management. Let's understand what it is and why we need it.

From the official React documentation:
> Context provides a way to pass data through the component tree without having to pass props manually at every level.

Think of Context as a way to create global variables for your React component tree. It's particularly useful for:
- Themes
- User preferences
- Authentication state
- Localization data

### When to Use Context
Context is ideal when you have:
1. Global state that many components need
2. Data that changes infrequently
3. Props that would need to be passed through many layers

Example without Context (Prop Drilling):
```typescript
// 🚫 Problematic prop drilling
function App() {
  const theme = useTheme();
  return (
    <Header theme={theme}>
      <Navigation theme={theme}>
        <Sidebar theme={theme}>
          <ThemeButton theme={theme} />
        </Sidebar>
      </Navigation>
    </Header>
  );
}
```

Example with Context:
```typescript
// ✅ Clean Context usage
function App() {
  return (
    <ThemeProvider>
      <Header>
        <Navigation>
          <Sidebar>
            <ThemeButton />
          </Sidebar>
        </Navigation>
      </Header>
    </ThemeProvider>
  );
}
```

### Context API Components
1. React.createContext
```typescript
// Creating context with default value
const ThemeContext = React.createContext<ThemeContextType | undefined>(undefined);
```

2. Context.Provider
```typescript
// Providing context value
<ThemeContext.Provider value={themeState}>
  {children}
</ThemeContext.Provider>
```

3. useContext Hook
```typescript
// Consuming context
const theme = useContext(ThemeContext);
```

### Context Best Practices
1. Keep context focused
```typescript
// 🚫 Too broad
const AppContext = createContext({ theme, user, cart, settings });

// ✅ Focused contexts
const ThemeContext = createContext(themeDefault);
const UserContext = createContext(userDefault);
```

2. Provide default values
```typescript
// With type safety
const ThemeContext = createContext<Theme>({
  colors: defaultColors,
  spacing: defaultSpacing,
});
```

3. Split context logic
```typescript
// Separate context logic into custom hooks
const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
};
```

### Context Performance Considerations
1. Context updates trigger re-renders
2. Use multiple contexts for different update frequencies
3. Memoize context values

```typescript
// ✅ Memoized context value
const value = useMemo(
  () => ({
    theme,
    toggleTheme,
  }),
  [theme]
);
```

[Continued in SCRIPT_PART2.md...] 