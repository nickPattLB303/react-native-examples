# React Native Theme Implementation with Context API - Part 4

## Part 6: Testing & Troubleshooting (15 min)

### Integration Testing
"Let's write integration tests for our theme system:

```typescript
import { render, fireEvent, act } from '@testing-library/react-native';

describe('Theme Integration', () => {
  beforeEach(() => {
    // Reset AsyncStorage mock
    AsyncStorage.clear();
    // Reset appearance mock
    jest.clearAllMocks();
  });

  it('theme changes propagate through component tree', async () => {
    const { getByTestId, getByText } = render(
      <ThemeProvider>
        <HomeScreen />
      </ThemeProvider>
    );

    const themeSwitch = getByTestId('theme-switch');
    const container = getByTestId('home-container');

    // Initial theme
    expect(container.props.style).toContainEqual({
      backgroundColor: themes.light.colors.background,
    });

    // Toggle theme
    await act(async () => {
      fireEvent(themeSwitch, 'valueChange', true);
    });

    // Verify theme change
    expect(container.props.style).toContainEqual({
      backgroundColor: themes.dark.colors.background,
    });
  });

  it('persists theme across app restarts', async () => {
    // Simulate stored theme
    await AsyncStorage.setItem(THEME_STORAGE_KEY, 'dark');

    const { getByTestId } = render(
      <ThemeProvider>
        <HomeScreen />
      </ThemeProvider>
    );

    const container = getByTestId('home-container');

    // Should load dark theme
    expect(container.props.style).toContainEqual({
      backgroundColor: themes.dark.colors.background,
    });
  });
});
```

### Performance Testing
"Let's measure and optimize theme performance:

```typescript
describe('Theme Performance', () => {
  it('minimizes renders on theme change', () => {
    const renderCount = jest.fn();
    
    const TestComponent = () => {
      const { theme } = useTheme();
      renderCount();
      return null;
    };

    const { getByTestId } = render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    const themeSwitch = getByTestId('theme-switch');
    
    // Initial render
    expect(renderCount).toHaveBeenCalledTimes(1);
    
    // Theme change
    fireEvent(themeSwitch, 'valueChange', true);
    
    // Should only re-render once
    expect(renderCount).toHaveBeenCalledTimes(2);
  });
});
```

### Common Issues & Solutions

#### 1. Theme Not Updating
```typescript
// Problem: Theme changes not reflecting
const Component = () => {
  // ❌ Wrong: Direct context usage
  const context = useContext(ThemeContext);
  
  // ✅ Right: Use custom hook
  const { theme } = useTheme();
};
```

#### 2. Performance Issues
```typescript
// Problem: Unnecessary re-renders
const Component = () => {
  // ❌ Wrong: Inline styles
  return (
    <View style={{ backgroundColor: theme.colors.background }}>
      <Text style={{ color: theme.colors.text }}>
        Content
      </Text>
    </View>
  );
  
  // ✅ Right: StyleSheet and style arrays
  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Text style={[styles.text, { color: theme.colors.text }]}>
        Content
      </Text>
    </View>
  );
};
```

#### 3. Animation Glitches
```typescript
// Problem: Jerky animations
const Component = () => {
  // ❌ Wrong: No native driver
  Animated.timing(fadeAnim, {
    toValue: 1,
    duration: 200,
  }).start();
  
  // ✅ Right: Use native driver
  Animated.timing(fadeAnim, {
    toValue: 1,
    duration: 200,
    useNativeDriver: true,
  }).start();
};
```

## Part 7: Advanced Topics (10 min)

### Theme Variants
```typescript
// Extended theme system with variants
interface ThemeVariant {
  name: string;
  colors: ColorPalette;
  spacing: SpacingSystem;
  typography: TypographySystem;
}

const themes: Record<string, ThemeVariant> = {
  light: { /* ... */ },
  dark: { /* ... */ },
  highContrast: { /* ... */ },
  sepia: { /* ... */ },
};
```

### Dynamic Theme Generation
```typescript
const generateTheme = (baseTheme: Theme, overrides: Partial<Theme>): Theme => {
  return deepMerge(baseTheme, overrides);
};

const customTheme = generateTheme(themes.light, {
  colors: {
    primary: '#FF0000',
  },
});
```

### Theme Transitions
```typescript
const ThemeTransition: React.FC = ({ children }) => {
  const { theme } = useTheme();
  const [fadeAnim] = useState(new Animated.Value(1));
  
  useEffect(() => {
    Animated.sequence([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 150,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 150,
        useNativeDriver: true,
      }),
    ]).start();
  }, [theme]);
  
  return (
    <Animated.View style={{ opacity: fadeAnim }}>
      {children}
    </Animated.View>
  );
};
```

## Wrap-up (5 min)

### Key Takeaways
1. Context API provides clean theme management
2. Performance optimization is crucial
3. Platform-specific considerations matter
4. Testing ensures reliability
5. Proper typing enhances development

### Next Steps
1. Implement additional theme variants
2. Add animation customization
3. Enhance platform-specific features
4. Write comprehensive tests
5. Document edge cases

### Resources
1. React Native Documentation
   - Context API: https://reactjs.org/docs/context.html
   - Hooks Guide: https://reactjs.org/docs/hooks-intro.html
   - Animation System: https://reactnative.dev/docs/animated

2. Platform Guidelines
   - iOS Human Interface Guidelines: https://developer.apple.com/design/
   - Material Design: https://material.io/design

3. Testing Resources
   - React Native Testing Library: https://callstack.github.io/react-native-testing-library/
   - Jest Documentation: https://jestjs.io/docs/getting-started

4. Additional Reading
   - Performance Optimization: https://reactnative.dev/docs/performance
   - Accessibility Guidelines: https://reactnative.dev/docs/accessibility

### Q&A Session (10 min)
"Now, let's open the floor for questions. We can discuss:
1. Implementation details
2. Performance optimization
3. Testing strategies
4. Platform-specific concerns
5. Real-world scenarios" 