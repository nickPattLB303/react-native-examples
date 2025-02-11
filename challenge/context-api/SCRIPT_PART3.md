# React Native Theme Implementation with Context API - Part 3

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