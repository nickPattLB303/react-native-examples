# React Native Training Examples

Version: 1.0.0

## Live Training Session Structure

### Session Components
1. **Starter Code Window**
   - Clean, minimal implementation
   - TODO comments marking implementation points
   - Basic structure ready for live coding

2. **Presenter's Reference Materials**
   - Complete implementation (hidden)
   - Detailed script with timing markers
   - Pre-written answers to common questions
   - Code snippets ready for copy/paste

3. **Live Demo Environment**
   - Expo Go simulator running
   - Clear starting state
   - Predefined test data if needed
   - Backup simulator ready

### Live Coding Guidelines
- Break implementation into clear demo-able chunks
- Test each feature immediately after implementation
- Have fallback code snippets ready
- Include intentional teaching moments (common mistakes)
- Prepare alternative implementations to discuss

### Timing Structure
⏱️ 60-Minute Session Breakdown:
1. **Setup & Introduction** (5 min)
   - Ensure Expo Go is running
   - Show starter code
   - Explain session goals

2. **Guided Implementation** (40 min)
   - Code in small, testable increments
   - Demo each feature
   - Discuss alternatives
   - Answer prepared questions

3. **Q&A and Review** (10 min)
   - Address participant questions
   - Review key concepts
   - Discuss real-world applications

4. **Next Steps** (5 min)
   - Preview homework/challenges
   - Share resources
   - Set expectations for next session

## Table of Contents
- [Presenter Script Guidelines](#presenter-script-guidelines)
  - [Script Structure](#script-structure)
  - [Example Script: State Management](#example-script-state-management)
- [Example Implementations](#example-implementations)
  - [Basic Component Example](#basic-component-example)
  - [State Management Example](#state-management-example)
  - [Navigation Example](#navigation-example)
  - [API Integration Example](#api-integration-example)

See also:
- [Training Guidelines](./GUIDELINES.md)
- [Code Templates](./TEMPLATES.md)

## Troubleshooting Guide

### Common Issues and Solutions
- State Management
  - Issue: State updates not reflecting
  - Solution: Check subscription, verify action calls, inspect middleware
- Navigation
  - Issue: Screen transitions not working
  - Solution: Verify navigation container setup, check screen registration
- Platform Specific
  - Issue: iOS shadow not working
  - Solution: Use platform-specific shadow implementation
  - Issue: Android keyboard pushing content
  - Solution: Use KeyboardAvoidingView with appropriate behavior

### Performance Optimization
- Component re-rendering
- Memory management
- Network request caching
- Image optimization

## Presenter Script Guidelines

### Script Structure
- Write in conversational, easy-to-read format
- Include word-for-word speaking notes
- Mark timing cues with ⏱️
- Highlight key terms in **bold**
- Include Tips for simplified explanations
- Mark Anticipated Questions and answers
- Use platform-specific notes (iOS/Android)
- Add Alternative Approaches
- Include Learning Objectives checkpoints

### Example Script: State Management

```markdown
## State Management in React Native
⏱️ Duration: 60 minutes

### Opening (5 min)
"Welcome everyone! Today we're diving into state management in React Native. Before we start, quick show of hands - who here has worked with [state management in native development]?"

[Wait for responses]

"Great! Today we'll be comparing these native patterns with React Native's approach using Zustand and Context API."

### Key Concepts (10 min)
**State Management Core Principles**
- Think of state like a central database for your app's memory
- For iOS devs: Similar to combining NSUserDefaults and NotificationCenter
- For Android devs: Think ViewModel and LiveData combined

[Draw quick diagram showing state flow]

### Code Walkthrough (30 min)
Let's look at a real example:
```typescript
// Here's how we define our store
const useStore = create((set) => ({
  counter: 0,
  increment: () => set(state => ({ counter: state.counter + 1 }))
}));
```

**Key Points to Emphasize:**
- Store creation pattern
- State immutability
- Action definitions

### Common Questions
Q: "How does this compare to Redux?"
A: "Zustand is like a lightweight Redux. Imagine Redux as a full-scale government, while Zustand is more like a small town council - simpler, but still effective."

### Debugging Tips
When state updates aren't reflecting:
1. Check subscription
2. Verify action calls
3. Inspect middleware
```

## Example Implementations

### Basic Component Example
```typescript
import React from 'react';
import styled from 'styled-components/native';

interface UserProfileProps {
  name: string;
  email: string;
}

const Container = styled.View`
  padding: 16px;
  background-color: #fff;
  border-radius: 8px;
`;

const Name = styled.Text`
  font-size: 18px;
  font-weight: bold;
`;

const Email = styled.Text`
  font-size: 16px;
  color: #666;
`;

/**
 * Basic user profile display component
 * 
 * Demonstrates:
 * - TypeScript props
 * - styled-components
 * - Component structure
 */
export const UserProfile: React.FC<UserProfileProps> = ({ name, email }) => {
  return (
    <Container>
      <Name>{name}</Name>
      <Email>{email}</Email>
    </Container>
  );
};
```

### State Management Example
```typescript
import create from 'zustand';

interface UserState {
  user: {
    name: string;
    email: string;
  } | null;
  setUser: (user: UserState['user']) => void;
  clearUser: () => void;
}

/**
 * User state management with Zustand
 * 
 * Demonstrates:
 * - State definition
 * - Action creation
 * - TypeScript integration
 */
export const useUserStore = create<UserState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  clearUser: () => set({ user: null }),
}));
```

### Navigation Example
```typescript
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

/**
 * Main navigation stack
 * 
 * Demonstrates:
 * - Stack navigation setup
 * - Screen configuration
 * - Type safety in navigation
 */
export const MainStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="Home"
        component={HomeScreen}
        options={{
          title: 'Home',
          headerLargeTitle: true, // iOS-specific
        }}
      />
      <Stack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          title: 'Profile',
        }}
      />
    </Stack.Navigator>
  );
};
```

### API Integration Example
```typescript
import { useQuery, useMutation } from 'react-query';

/**
 * User data hooks with React Query
 * 
 * Demonstrates:
 * - Data fetching
 * - Error handling
 * - Loading states
 * - Cache management
 */
export const useUser = (userId: string) => {
  return useQuery(['user', userId], async () => {
    const response = await fetch(`/api/users/${userId}`);
    if (!response.ok) {
      throw new Error('Failed to fetch user');
    }
    return response.json();
  });
};

export const useUpdateUser = () => {
  return useMutation(async (userData) => {
    const response = await fetch('/api/users', {
      method: 'PUT',
      body: JSON.stringify(userData),
    });
    if (!response.ok) {
      throw new Error('Failed to update user');
    }
    return response.json();
  });
};
```

### Themed Component Example
```typescript
import styled from 'styled-components/native';

interface Theme {
  colors: {
    primary: string;
    background: string;
    text: string;
  };
  spacing: {
    small: number;
    medium: number;
    large: number;
  };
}

const Card = styled.View<{ theme: Theme }>`
  padding: ${props => props.theme.spacing.medium}px;
  background-color: ${props => props.theme.colors.background};
  border-radius: 8px;
`;

const Title = styled.Text<{ theme: Theme }>`
  font-size: 18px;
  color: ${props => props.theme.colors.text};
  font-weight: bold;
`;

const Content = styled.Text<{ theme: Theme }>`
  font-size: 16px;
  color: ${props => props.theme.colors.text};
  margin-top: ${props => props.theme.spacing.small}px;
`;

export const ThemedCard: React.FC<{ title: string; content: string }> = ({ 
  title, 
  content 
}) => {
  return (
    <Card>
      <Title>{title}</Title>
      <Content>{content}</Content>
    </Card>
  );
};
```

### Platform Specific Example
```typescript
import styled, { css } from 'styled-components/native';
import { Platform } from 'react-native';

const Card = styled.View<{ theme: Theme }>`
  background-color: ${props => props.theme.colors.background};
  border-radius: 8px;
  margin: ${props => props.theme.spacing.medium}px;
  
  ${Platform.select({
    ios: css`
      shadow-color: #000;
      shadow-offset: 0px 2px;
      shadow-opacity: 0.25;
      shadow-radius: 3.84px;
    `,
    android: css`
      elevation: 5;
    `
  })}
`;

const PlatformText = styled.Text<{ theme: Theme }>`
  color: ${props => props.theme.colors.text};
  font-family: ${Platform.select({
    ios: '-apple-system',
    android: 'Roboto'
  })};
  font-size: 16px;
`;

export const PlatformCard: React.FC = ({ children }) => (
  <Card>
    <PlatformText>{children}</PlatformText>
  </Card>
);
```

### Animation Example
```typescript
import styled from 'styled-components/native';
import Animated from 'react-native-reanimated';

const AnimatedContainer = styled(Animated.View)<{ theme: Theme }>`
  background-color: ${props => props.theme.colors.background};
  padding: ${props => props.theme.spacing.medium}px;
  border-radius: 8px;
`;

const AnimatedText = styled(Animated.Text)<{ theme: Theme }>`
  color: ${props => props.theme.colors.text};
  font-size: 16px;
`;

export const FadeInView: React.FC = ({ children }) => {
  const opacity = useSharedValue(0);

  useEffect(() => {
    opacity.value = withTiming(1, {
      duration: 500,
      easing: Easing.inOut(Easing.ease),
    });
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  return (
    <AnimatedContainer style={animatedStyle}>
      <AnimatedText>{children}</AnimatedText>
    </AnimatedContainer>
  );
};
``` 