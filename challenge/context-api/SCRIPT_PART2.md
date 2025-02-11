# React Native Theme Implementation with Context API - Part 2

## Part 3: React Hooks Fundamentals (30 min)

### Understanding Hooks
"Now that we understand Context, let's dive into Hooks - the other crucial piece of our theme implementation.

From React's documentation:
> Hooks let you use state and other React features without writing a class component.

### Key Hooks We'll Use

#### 1. useState
```typescript
// Basic state management
const [isDark, setIsDark] = useState<boolean>(false);

// With type inference
const [theme, setTheme] = useState(() => themes.light);
```

State Hook Best Practices:
- Use type parameters for better inference
- Prefer function initialization for complex values
- Keep state minimal and focused

#### 2. useEffect
```typescript
// Basic effect
useEffect(() => {
  // Effect code
  return () => {
    // Cleanup code
  };
}, [dependencies]);

// Real-world example
useEffect(() => {
  const subscription = Appearance.addChangeListener(({ colorScheme }) => {
    setIsDark(colorScheme === 'dark');
  });

  return () => subscription.remove();
}, []);
```

Effect Hook Guidelines:
- Always clean up subscriptions
- Specify dependencies array
- Keep effects focused on one concern
- Handle errors in async effects

#### 3. useCallback
```typescript
// Memoized callback
const toggleTheme = useCallback(() => {
  setIsDark(prev => !prev);
}, []);

// With dependencies
const updateTheme = useCallback((newTheme: Theme) => {
  setTheme(newTheme);
  saveTheme(newTheme);
}, [saveTheme]);
```

Callback Hook Tips:
- Use for performance optimization
- Include all dependencies
- Consider whether memoization is needed

#### 4. useMemo
```typescript
// Memoized value
const themeValue = useMemo(() => ({
  theme: isDark ? darkTheme : lightTheme,
  toggleTheme,
}), [isDark, toggleTheme]);
```

Memo Hook Best Practices:
- Use for expensive calculations
- Memoize context values
- Include proper dependencies

### Custom Hooks
"Let's look at building custom hooks for our theme system:

```typescript
// Basic custom hook
function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
}

// Advanced custom hook with persistence
function usePersistedTheme() {
  const [theme, setTheme] = useState<Theme>();
  
  useEffect(() => {
    async function loadTheme() {
      try {
        const saved = await AsyncStorage.getItem('theme');
        if (saved) {
          setTheme(JSON.parse(saved));
        }
      } catch (error) {
        console.error('Failed to load theme:', error);
      }
    }
    
    loadTheme();
  }, []);

  const persistTheme = useCallback(async (newTheme: Theme) => {
    try {
      await AsyncStorage.setItem('theme', JSON.stringify(newTheme));
      setTheme(newTheme);
    } catch (error) {
      console.error('Failed to save theme:', error);
    }
  }, []);

  return [theme, persistTheme] as const;
}
```

Custom Hook Guidelines:
1. Start with 'use' prefix
2. Call other hooks unconditionally
3. Handle errors gracefully
4. Return consistent values

## Part 4: Theme System Architecture (30 min)

### System Overview
"Our theme system consists of several key components:

1. Theme Definition
   - Color palette
   - Typography scale
   - Spacing system
   - Platform-specific values

2. State Management
   - Theme context
   - Persistence layer
   - System theme integration

3. Component Integration
   - Theme hooks
   - Styled components
   - Animation system

### Theme Definition

#### Color System
```typescript
interface ColorPalette {
  // Primary colors
  primary: {
    light: string;
    main: string;
    dark: string;
    contrast: string;
  };
  
  // Semantic colors
  background: {
    default: string;
    paper: string;
    elevated: string;
  };
  
  // Text colors
  text: {
    primary: string;
    secondary: string;
    disabled: string;
    hint: string;
  };
  
  // Status colors
  success: string;
  warning: string;
  error: string;
  info: string;
}
```

Color System Best Practices:
1. Use semantic naming
2. Include contrast colors
3. Support dark mode
4. Follow platform guidelines

#### Typography System
```typescript
interface TypographySystem {
  // Font families
  families: {
    primary: string;
    secondary: string;
    monospace: string;
  };
  
  // Font sizes
  sizes: {
    xs: number;
    sm: number;
    md: number;
    lg: number;
    xl: number;
  };
  
  // Font weights
  weights: {
    light: string;
    regular: string;
    medium: string;
    bold: string;
  };
  
  // Line heights
  lineHeights: {
    tight: number;
    normal: number;
    relaxed: number;
  };
}
```

Typography Guidelines:
1. Use relative units
2. Support dynamic type
3. Maintain readability
4. Follow platform conventions

#### Spacing System
```typescript
interface SpacingSystem {
  // Base unit (usually 4 or 8)
  unit: number;
  
  // Spacing scale
  scale: {
    xs: number;
    sm: number;
    md: number;
    lg: number;
    xl: number;
  };
  
  // Layout spacing
  layout: {
    gutter: number;
    margin: number;
    padding: number;
  };
}
```

Spacing Best Practices:
1. Use consistent scale
2. Support responsive design
3. Follow platform metrics
4. Maintain rhythm

[Continued in SCRIPT_PART3.md...] 