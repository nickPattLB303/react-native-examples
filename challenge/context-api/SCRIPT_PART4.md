# React Native Theme Implementation with Context API - Part 4

## Part 6: Advanced Styled-Components Patterns (15 min)

### Composition Patterns
"Let's explore advanced composition patterns with styled-components:

```typescript
// Base components
const BaseCard = styled.View<{ theme: Theme }>`
  padding: ${props => props.theme.spacing.md}px;
  border-radius: 8px;
  background-color: ${props => props.theme.colors.card};
`;

const BaseText = styled.Text<{ theme: Theme }>`
  color: ${props => props.theme.colors.text};
  font-size: ${props => props.theme.typography.fontSize.medium}px;
`;

// Extended components
const ElevatedCard = styled(BaseCard)`
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

const Title = styled(BaseText)`
  font-size: ${props => props.theme.typography.fontSize.large}px;
  font-weight: ${props => props.theme.typography.fontWeight.bold};
`;
```

### Variant System
"Implementing a variant system with styled-components:

```typescript
type ButtonVariant = 'primary' | 'secondary' | 'outline';

interface ButtonProps {
  theme: Theme;
  variant: ButtonVariant;
  size?: 'small' | 'medium' | 'large';
}

const getButtonStyles = (props: ButtonProps) => {
  switch (props.variant) {
    case 'primary':
      return css`
        background-color: ${props.theme.colors.primary};
        color: #FFFFFF;
      `;
    case 'secondary':
      return css`
        background-color: ${props.theme.colors.card};
        color: ${props.theme.colors.text};
      `;
    case 'outline':
      return css`
        background-color: transparent;
        border: 1px solid ${props.theme.colors.primary};
        color: ${props.theme.colors.primary};
      `;
  }
};

const StyledButton = styled.TouchableOpacity<ButtonProps>`
  padding: ${props => props.theme.spacing.md}px;
  border-radius: 8px;
  align-items: center;
  justify-content: center;
  ${props => getButtonStyles(props)}
`;
```

### Animation Integration
"Advanced animation patterns with styled-components:

```typescript
const FadeInView = styled(Animated.View)<{ theme: Theme }>`
  opacity: ${props => props.opacity};
  background-color: ${props => props.theme.colors.background};
  padding: ${props => props.theme.spacing.md}px;
`;

const SlideInView = styled(Animated.View)<{ theme: Theme }>`
  transform: translateX(${props => props.translateX}px);
  background-color: ${props => props.theme.colors.background};
  padding: ${props => props.theme.spacing.md}px;
`;

const AnimatedComponent: React.FC = () => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(-100)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.spring(slideAnim, {
        toValue: 0,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <>
      <FadeInView style={{ opacity: fadeAnim }}>
        <Text>Fade In Content</Text>
      </FadeInView>
      <SlideInView style={{ transform: [{ translateX: slideAnim }] }}>
        <Text>Slide In Content</Text>
      </SlideInView>
    </>
  );
};
```

### Performance Optimization
"Best practices for performance with styled-components:

```typescript
// 1. Memoize styled components
const MemoizedCard = React.memo(styled.View`
  // Styles
`);

// 2. Use CSS helper for complex styles
const complexStyles = css<{ theme: Theme }>`
  background-color: ${props => props.theme.colors.background};
  padding: ${props => props.theme.spacing.md}px;
  // More styles...
`;

const OptimizedComponent = styled.View`
  ${complexStyles}
`;

// 3. Prop interpolation
const DynamicComponent = styled.View<{ theme: Theme; active: boolean }>`
  opacity: ${props => props.active ? 1 : 0.5};
  ${props => props.active && css`
    border: 2px solid ${props.theme.colors.primary};
  `}
`;
```

## Wrap-up (5 min)

### Key Takeaways
1. Styled-components provides clean theme integration
2. Component composition enhances reusability
3. Platform-specific styling is straightforward
4. Animation integration is seamless
5. Performance optimization is crucial

### Next Steps
1. Implement additional theme variants
2. Add animation customization
3. Enhance platform-specific features
4. Write comprehensive tests
5. Document edge cases

### Resources
1. styled-components Documentation
   - Main docs: https://styled-components.com/docs
   - React Native specific: https://styled-components.com/docs/basics#react-native

2. Platform Guidelines
   - iOS Human Interface Guidelines: https://developer.apple.com/design/
   - Material Design: https://material.io/design

3. Animation Resources
   - React Native Animated: https://reactnative.dev/docs/animated
   - Reanimated: https://docs.swmansion.com/react-native-reanimated/

4. Additional Reading
   - Performance Optimization: https://reactnative.dev/docs/performance
   - Accessibility Guidelines: https://reactnative.dev/docs/accessibility

### Q&A Session (10 min)
"Now, let's open the floor for questions about:
1. Styled-components implementation
2. Theme system architecture
3. Animation patterns
4. Performance optimization
5. Real-world scenarios" 