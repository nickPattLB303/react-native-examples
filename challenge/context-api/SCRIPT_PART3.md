# React Native Theme Implementation with Context API - Part 3

Welcome to the third part of our session. Now, it's time to roll up our sleeves and bring our theme system to life. In this section, I will show you how to implement our Theme Provider. As I code, I want you to picture the flow of information from the very top of the app, where our global theme is managed, down to every individual component that needs to display a consistent look and feel.

I begin by explaining that the first step is to initialize the state which holds the current theme mode. I explain how we use the device's color scheme as the starting point, ensuring that our app initially respects the user's system preferences. As I write the code, I describe how we set up a state variable, and then use a memoization technique to create a context value that includes not only the current theme details but also the functions needed to toggle and set the theme.

Next, I walk you through how we load any saved theme preferences from persistent storage. I emphasize how vital it is to provide a seamless experience by reading a previously selected theme so that the user's preference is retained across app sessions. I narrate the importance of handling potential errors during this asynchronous operation, reassuring you that our code is both robust and user-friendly.

As I move forward, I detail how we establish a listener for system theme changes. This part of the implementation ensures that if the operating system's theme changes, our application will adjust accordingly—unless the user has explicitly set a preference. I explain every piece of the code in a conversational tone, clarifying why each listener must be properly cleaned up when the component unmounts to prevent memory leaks.

Then, I describe the essence of our theme functions. I explain how the toggle function is designed to flip the theme from light to dark or vice versa, and how it simultaneously updates the AsyncStorage so that the theme selection persists even after the app is closed. I take a moment to stress the use of error handling in these functions, ensuring that any issues during the save or update process are caught and logged appropriately.

By the end of this section, I summarize how every part of our Theme Provider—from system detection and state management to persistence and cleanup—works in harmony to offer a smooth, intuitive theming experience for our application. I encourage you to meditate on this flow, understanding that our careful attention to detail not only creates a fluid user experience but also exemplifies best practices in React Native development.

Let's now dive into the code implementation. I will proceed to type each line, speak my thoughts aloud, and ensure that every concept is clearly understood. Enjoy the live coding, and keep your questions ready for our later Q&A session.

## Part 5: Implementation Steps (60 min)

### Step 1: Theme Provider Implementation (15 min)

#### Setting Up the Provider
"Let's implement our ThemeProvider with all necessary features:

```typescript
export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // System theme detection
  const systemColorScheme = useColorScheme();
  
  // Theme state
  const [isDark, setIsDark] = useState<boolean>(() => {
    return systemColorScheme === 'dark';
  });
  
  // Memoized theme value
  const themeValue = useMemo(() => ({
    theme: isDark ? themes.dark : themes.light,
    isDark,
    toggleTheme: () => setIsDark(prev => !prev),
    setTheme: (mode: 'light' | 'dark') => setIsDark(mode === 'dark'),
  }), [isDark]);
  
  return (
    <ThemeContext.Provider value={themeValue}>
      {children}
    </ThemeContext.Provider>
  );
};

// Define styled-components for our theme demo
const DemoContainer = styled.View<{ theme: Theme }>`
  flex: 1;
  padding: ${props => props.theme.spacing.md}px;
  background-color: ${props => props.theme.colors.background};
`;

const DemoText = styled.Text<{ theme: Theme }>`
  color: ${props => props.theme.colors.text};
  font-size: ${props => props.theme.typography.fontSize.medium}px;
  margin-bottom: ${props => props.theme.spacing.sm}px;
`;
```

Key Implementation Points:
1. System theme integration
2. State management
3. Memoized context value
4. Type-safe props

#### Adding Theme Persistence
"Now let's add theme persistence using AsyncStorage:

```typescript
// Theme persistence
useEffect(() => {
  // Load saved theme
  const loadSavedTheme = async () => {
    try {
      const savedTheme = await AsyncStorage.getItem(THEME_STORAGE_KEY);
      if (savedTheme) {
        setIsDark(savedTheme === 'dark');
      }
    } catch (error) {
      console.error('Failed to load theme:', error);
    }
  };
  
  loadSavedTheme();
  
  // Save theme changes
  const saveTheme = async () => {
    try {
      await AsyncStorage.setItem(THEME_STORAGE_KEY, isDark ? 'dark' : 'light');
    } catch (error) {
      console.error('Failed to save theme:', error);
    }
  };
  
  saveTheme();
}, [isDark]);
```

Persistence Implementation Notes:
1. Error handling
2. Loading states
3. Proper cleanup
4. Type safety

#### System Theme Integration
"Let's handle system theme changes:

```typescript
useEffect(() => {
  // Subscribe to system theme changes
  const subscription = Appearance.addChangeListener(({ colorScheme }) => {
    // Only update if no user preference is saved
    AsyncStorage.getItem(THEME_STORAGE_KEY).then(savedTheme => {
      if (!savedTheme) {
        setIsDark(colorScheme === 'dark');
      }
    });
  });
  
  // Cleanup subscription
  return () => {
    subscription.remove();
  };
}, []);
```

System Theme Considerations:
1. Subscription management
2. User preference priority
3. Performance optimization
4. Error boundaries

### Step 2: Theme Switcher Component (15 min)

#### Basic Component Structure
"Let's build our ThemeSwitcher component using styled-components:

```typescript
// Styled components for ThemeSwitcher
const Container = styled(Animated.View)<{ theme: Theme }>`
  padding: ${props => props.theme.spacing.md}px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background-color: ${props => props.theme.colors.card};
  border-radius: 8px;
`;

const Label = styled.Text<{ theme: Theme }>`
  color: ${props => props.theme.colors.text};
  font-size: ${props => props.theme.typography.fontSize.medium}px;
  font-weight: ${props => props.theme.typography.fontWeight.medium};
`;

export const ThemeSwitcher: React.FC = () => {
  const { theme, isDark, toggleTheme } = useTheme();
  const [fadeAnim] = useState(new Animated.Value(1));

  return (
    <Container style={{ opacity: fadeAnim }}>
      <Label>{isDark ? 'Dark Mode' : 'Light Mode'}</Label>
      <Switch
        value={isDark}
        onValueChange={toggleTheme}
        trackColor={{ false: '#767577', true: theme.colors.primary }}
        thumbColor={isDark ? '#ffffff' : '#f4f3f4'}
      />
    </Container>
  );
};
```

Component Implementation Notes:
1. Accessibility support
2. Platform-specific styling
3. Animation integration
4. Theme integration

#### Adding Animations
"Let's implement smooth theme transitions:

```typescript
const handleThemeChange = () => {
  // Fade out
  Animated.timing(fadeAnim, {
    toValue: 0,
    duration: 200,
    useNativeDriver: true,
  }).start(() => {
    // Toggle theme
    toggleTheme();
    
    // Fade in
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    }).start();
  });
};
```

Animation Implementation Notes:
1. Performance optimization
2. Timing configuration
3. Native driver usage
4. Cleanup handling

### Step 3: Platform-Specific Implementation (15 min)

#### iOS Considerations
"Let's handle iOS-specific styling with styled-components:

```typescript
const Card = styled.View<{ theme: Theme }>`
  background-color: ${props => props.theme.colors.card};
  border-radius: 8px;
  
  ${Platform.select({
    ios: css`
      shadow-color: ${props => props.theme.colors.text};
      shadow-offset: 0px 2px;
      shadow-opacity: 0.25;
      shadow-radius: 3.84px;
    `,
    android: css`
      elevation: 5;
    `
  })}
`;

// iOS-specific text styling
const IOSText = styled.Text<{ theme: Theme }>`
  color: ${props => props.theme.colors.text};
  font-size: ${props => props.theme.typography.fontSize.medium}px;
  /* iOS-specific font */
  font-family: -apple-system;
`;
```

iOS Implementation Notes:
1. Shadow implementation
2. Dynamic type support
3. Haptic feedback
4. Safe area handling

#### Android Considerations
"Now for Android-specific features:

```typescript
// Android-specific elevation
const androidElevation = {
  elevation: 5,
  backgroundColor: theme.colors.card, // Required for elevation
};

// Android-specific component styling
const androidStyles = StyleSheet.create({
  container: {
    ...Platform.select({
      android: {
        ...androidElevation,
      },
    }),
  },
});
```

Android Implementation Notes:
1. Elevation handling
2. Ripple effects
3. Material Design
4. Back handler

### Step 4: Testing & Error Handling (15 min)

#### Unit Testing Styled Components
"Let's write tests for our styled components:

```typescript
import { render } from '@testing-library/react-native';
import { ThemeProvider } from './ThemeContext';
import styled from 'styled-components/native';

const TestComponent = styled.View<{ theme: Theme }>`
  background-color: ${props => props.theme.colors.background};
`;

describe('Styled Components with Theme', () => {
  it('applies theme styles correctly', () => {
    const { getByTestId } = render(
      <ThemeProvider>
        <TestComponent testID="test-component" />
      </ThemeProvider>
    );

    const component = getByTestId('test-component');
    expect(component).toHaveStyle({
      backgroundColor: themes.light.colors.background,
    });
  });
});
```

Testing Implementation Notes:
1. Mock system APIs
2. Test persistence
3. Verify animations
4. Check accessibility

[Continued in SCRIPT_PART4.md...]" 