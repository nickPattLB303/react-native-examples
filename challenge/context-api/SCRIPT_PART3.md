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
"Let's build our ThemeSwitcher component:

```typescript
export const ThemeSwitcher: React.FC = () => {
  const { theme, isDark, toggleTheme } = useTheme();
  const [fadeAnim] = useState(new Animated.Value(1));
  
  return (
    <Animated.View
      style={[
        styles.container,
        { opacity: fadeAnim, backgroundColor: theme.colors.card },
      ]}
      accessible={true}
      accessibilityRole="switch"
      accessibilityState={{ checked: isDark }}
      accessibilityLabel={`Switch to ${isDark ? 'light' : 'dark'} theme`}
    >
      <Text style={[styles.text, { color: theme.colors.text }]}>
        {isDark ? 'Dark Mode' : 'Light Mode'}
      </Text>
      <Switch
        value={isDark}
        onValueChange={toggleTheme}
        trackColor={{ false: '#767577', true: theme.colors.primary }}
        thumbColor={isDark ? '#ffffff' : '#f4f3f4'}
        ios_backgroundColor="#3e3e3e"
      />
    </Animated.View>
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
"Let's handle iOS-specific features:

```typescript
// iOS-specific shadow implementation
const iosShadowStyle = {
  shadowColor: theme.colors.text,
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.25,
  shadowRadius: 3.84,
};

// iOS-specific component styling
const iosStyles = StyleSheet.create({
  container: {
    ...Platform.select({
      ios: {
        ...iosShadowStyle,
      },
    }),
  },
});
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

#### Unit Testing
"Let's write tests for our theme implementation:

```typescript
describe('ThemeProvider', () => {
  it('provides correct theme based on system preference', () => {
    // Mock system color scheme
    jest.spyOn(Appearance, 'getColorScheme').mockReturnValue('dark');
    
    const { result } = renderHook(() => useTheme(), {
      wrapper: ThemeProvider,
    });
    
    expect(result.current.isDark).toBe(true);
    expect(result.current.theme).toEqual(themes.dark);
  });
  
  it('persists theme changes', async () => {
    const { result } = renderHook(() => useTheme(), {
      wrapper: ThemeProvider,
    });
    
    act(() => {
      result.current.toggleTheme();
    });
    
    // Verify AsyncStorage was called
    expect(AsyncStorage.setItem).toHaveBeenCalledWith(
      THEME_STORAGE_KEY,
      'light'
    );
  });
});
```

Testing Implementation Notes:
1. Mock system APIs
2. Test persistence
3. Verify animations
4. Check accessibility

[Continued in SCRIPT_PART4.md...]" 