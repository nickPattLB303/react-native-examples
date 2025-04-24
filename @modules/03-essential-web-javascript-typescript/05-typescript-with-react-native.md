# Applying TypeScript to React Native Components

TypeScript integrates seamlessly with React Native, providing type safety for components, props, state, and more. This section explores how to effectively use TypeScript in React Native development to create more robust and maintainable applications.

## Typing Component Props

Props are the primary way to pass data between React components. TypeScript helps ensure that components receive the correct props with the right types.

### Using Interfaces for Props

The most common approach is to define an interface for your component's props:

```tsx
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

// Define the props interface
interface GreetingProps {
  name: string;
  age?: number; // Optional prop
  onPress: () => void;
}

// Use the interface to type the component props
const Greeting: React.FC<GreetingProps> = ({ name, age, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.container}>
        <Text style={styles.text}>Hello, {name}!</Text>
        {age !== undefined && <Text style={styles.subText}>You are {age} years old</Text>}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
    marginVertical: 5,
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  subText: {
    fontSize: 14,
    color: '#666',
  },
});

export default Greeting;
```

### Using Type Aliases for Props

You can also use type aliases instead of interfaces:

```tsx
// Using type alias instead of interface
type ButtonProps = {
  title: string;
  onPress: () => void;
  disabled?: boolean;
  type?: 'primary' | 'secondary' | 'danger'; // Union type for limited options
};

const Button: React.FC<ButtonProps> = ({ 
  title, 
  onPress, 
  disabled = false, 
  type = 'primary' 
}) => {
  // Component implementation
};
```

### Default Props

There are several ways to handle default props with TypeScript:

```tsx
// Method 1: Default parameters in function destructuring (recommended)
interface CardProps {
  title: string;
  description?: string;
  showImage?: boolean;
}

const Card: React.FC<CardProps> = ({ 
  title, 
  description = 'No description available', 
  showImage = true 
}) => {
  // Component implementation
};

// Method 2: defaultProps (older approach)
interface HeaderProps {
  title: string;
  size: 'small' | 'medium' | 'large';
}

const Header: React.FC<HeaderProps> = ({ title, size }) => {
  // Component implementation
};

Header.defaultProps = {
  size: 'medium' as const,
};
```

### Children Props

React components can receive children elements. Here's how to type them:

```tsx
// Basic children typing
interface ContainerProps {
  children: React.ReactNode;
}

const Container: React.FC<ContainerProps> = ({ children }) => {
  return <View style={styles.container}>{children}</View>;
};

// Restricting to a single child
interface SingleChildProps {
  children: React.ReactElement;
}

// Restricting to specific types of children
interface ListProps {
  children: React.ReactElement<typeof ListItem> | React.ReactElement<typeof ListItem>[];
}
```

### Style Props

React Native components often accept style props. Here's how to type them:

```tsx
import { StyleSheet, View, Text, ViewStyle, TextStyle } from 'react-native';

interface StyledBoxProps {
  style?: ViewStyle;
  textStyle?: TextStyle;
  title: string;
}

const StyledBox: React.FC<StyledBoxProps> = ({ style, textStyle, title }) => {
  return (
    <View style={[styles.box, style]}>
      <Text style={[styles.text, textStyle]}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  box: {
    padding: 10,
    backgroundColor: '#eaeaea',
    borderRadius: 5,
  },
  text: {
    fontSize: 16,
  },
});
```

## Typing Component State with useState

The `useState` hook can be typed using generics to specify the type of the state variable:

```tsx
import React, { useState } from 'react';
import { View, Text, Button, TextInput } from 'react-native';

const Counter: React.FC = () => {
  // TypeScript can infer the type from the initial value
  const [count, setCount] = useState(0); // inferred as number
  
  // Explicit typing with generics
  const [text, setText] = useState<string>('');
  
  // For complex types or when initial value is null/undefined
  interface User {
    id: number;
    name: string;
    email: string;
  }
  
  const [user, setUser] = useState<User | null>(null);
  
  return (
    <View>
      <Text>Count: {count}</Text>
      <Button title="Increment" onPress={() => setCount(count + 1)} />
      
      <TextInput
        value={text}
        onChangeText={setText}
        placeholder="Type something..."
      />
      
      {user ? (
        <Text>User: {user.name}</Text>
      ) : (
        <Button 
          title="Load User" 
          onPress={() => setUser({ id: 1, name: 'John', email: 'john@example.com' })} 
        />
      )}
    </View>
  );
};
```

### Union Types with useState

Union types are useful when state can be one of several types:

```tsx
// Loading state pattern
type RequestState<T> = 
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success', data: T }
  | { status: 'error', error: Error };

const UserProfile: React.FC = () => {
  const [userRequest, setUserRequest] = useState<RequestState<User>>({ status: 'idle' });
  
  const fetchUser = async () => {
    try {
      setUserRequest({ status: 'loading' });
      const response = await fetch('https://api.example.com/user');
      const data = await response.json();
      setUserRequest({ status: 'success', data });
    } catch (error) {
      setUserRequest({ status: 'error', error: error instanceof Error ? error : new Error('Unknown error') });
    }
  };
  
  // Render based on state
  return (
    <View>
      {userRequest.status === 'idle' && (
        <Button title="Load User" onPress={fetchUser} />
      )}
      
      {userRequest.status === 'loading' && (
        <ActivityIndicator size="large" />
      )}
      
      {userRequest.status === 'success' && (
        <Text>Welcome, {userRequest.data.name}!</Text>
      )}
      
      {userRequest.status === 'error' && (
        <Text>Error: {userRequest.error.message}</Text>
      )}
    </View>
  );
};
```

## Typing useEffect

The `useEffect` hook doesn't typically need explicit typing, but you should ensure the dependency array is properly typed:

```tsx
import React, { useState, useEffect } from 'react';

const UserStatus: React.FC<{ userId: number }> = ({ userId }) => {
  const [isOnline, setIsOnline] = useState(false);
  
  useEffect(() => {
    // TypeScript ensures userId is a number
    const checkStatus = async () => {
      const response = await fetch(`https://api.example.com/users/${userId}/status`);
      const data = await response.json();
      setIsOnline(data.online);
    };
    
    checkStatus();
    
    // Cleanup function
    return () => {
      // Cleanup code here
    };
  }, [userId]); // TypeScript checks that all dependencies are included
  
  return <Text>User is {isOnline ? 'Online' : 'Offline'}</Text>;
};
```

## Typing Custom Hooks

Custom hooks follow the same patterns as regular hooks but can encapsulate more complex logic:

```tsx
import { useState, useEffect } from 'react';

// Define return type for the hook
interface UseUserResult {
  user: User | null;
  loading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
}

// Custom hook with TypeScript
function useUser(userId: number): UseUserResult {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  
  const fetchUser = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(`https://api.example.com/users/${userId}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setUser(data);
    } catch (e) {
      setError(e instanceof Error ? e : new Error('Unknown error'));
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    fetchUser();
  }, [userId]);
  
  return { user, loading, error, refetch: fetchUser };
}

// Using the custom hook
const UserProfile: React.FC<{ userId: number }> = ({ userId }) => {
  const { user, loading, error, refetch } = useUser(userId);
  
  if (loading) return <ActivityIndicator size="large" />;
  if (error) return <Text>Error: {error.message}</Text>;
  if (!user) return <Text>No user found</Text>;
  
  return (
    <View>
      <Text>Name: {user.name}</Text>
      <Text>Email: {user.email}</Text>
      <Button title="Refresh" onPress={refetch} />
    </View>
  );
};
```

## Typing Event Handlers

React Native event handlers can be typed for better safety:

```tsx
import { TouchableOpacity, Text, GestureResponderEvent, TextInput, NativeSyntheticEvent, TextInputChangeEventData } from 'react-native';

const EventHandlingComponent: React.FC = () => {
  // TouchableOpacity onPress event
  const handlePress = (event: GestureResponderEvent) => {
    console.log('Pressed at:', event.nativeEvent.locationX, event.nativeEvent.locationY);
  };
  
  // TextInput onChangeText (simplified event)
  const handleTextChange = (text: string) => {
    console.log('Text changed:', text);
  };
  
  // TextInput onChange (full event)
  const handleChange = (event: NativeSyntheticEvent<TextInputChangeEventData>) => {
    console.log('Text changed:', event.nativeEvent.text);
  };
  
  return (
    <>
      <TouchableOpacity onPress={handlePress}>
        <Text>Press Me</Text>
      </TouchableOpacity>
      
      <TextInput
        onChangeText={handleTextChange}
        onChange={handleChange}
      />
    </>
  );
};
```

## Typing Navigation Props

When using React Navigation, you can type the navigation and route props:

```tsx
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';

// Define the parameter list for your navigation stack
type RootStackParamList = {
  Home: undefined;
  Profile: { userId: number };
  Settings: { theme: 'light' | 'dark' };
};

// Type for the navigation prop
type ProfileScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Profile'>;

// Type for the route prop
type ProfileScreenRouteProp = RouteProp<RootStackParamList, 'Profile'>;

// Component props interface
interface ProfileScreenProps {
  navigation: ProfileScreenNavigationProp;
  route: ProfileScreenRouteProp;
}

// Component with typed navigation
const ProfileScreen: React.FC<ProfileScreenProps> = ({ navigation, route }) => {
  const { userId } = route.params; // TypeScript knows userId is a number
  
  return (
    <View>
      <Text>User ID: {userId}</Text>
      <Button
        title="Go to Settings"
        onPress={() => navigation.navigate('Settings', { theme: 'dark' })}
      />
      <Button
        title="Go Back"
        onPress={() => navigation.goBack()}
      />
    </View>
  );
};
```

With Expo Router, you can use the `useLocalSearchParams` hook with TypeScript:

```tsx
import { useLocalSearchParams } from 'expo-router';

// In a file like [id].tsx
const ProductScreen = () => {
  // Type the params
  const params = useLocalSearchParams<{
    id: string;
    category?: string;
  }>();
  
  const productId = params.id;
  const category = params.category || 'default';
  
  // Rest of component
};
```

## Type Assertions

Sometimes you might need to use type assertions when TypeScript can't infer the correct type:

```tsx
// Type assertion with 'as'
const userData = JSON.parse(jsonString) as User;

// Alternative syntax (not used in JSX)
const userData = <User>JSON.parse(jsonString);

// Assertion with unknown as intermediate step (safer)
const userData = (JSON.parse(jsonString) as unknown) as User;
```

Type assertions should be used sparingly and cautiously. They override the compiler's type checking and can hide potential errors if the assertion is incorrect. Using unknown as an intermediate step is safer than directly asserting to a specific type.

## Best Practices for TypeScript in React Native

1. **Use interfaces or types for component props**
   ```tsx
   interface ButtonProps {
     title: string;
     onPress: () => void;
   }
   ```

2. **Prefer function components with React.FC**
   ```tsx
   const Button: React.FC<ButtonProps> = ({ title, onPress }) => {
     // Implementation
   };
   ```

3. **Type useState with generics for complex types**
   ```tsx
   const [user, setUser] = useState<User | null>(null);
   ```

4. **Create reusable type definitions**
   ```tsx
   // In types.ts
   export interface User {
     id: number;
     name: string;
     email: string;
   }
   
   export type Theme = 'light' | 'dark';
   ```

5. **Use discriminated unions for state management**
   ```tsx
   type RequestState<T> = 
     | { status: 'idle' }
     | { status: 'loading' }
     | { status: 'success', data: T }
     | { status: 'error', error: Error };
   ```

6. **Type third-party library props when necessary**
   ```tsx
   // If types aren't available or are incomplete
   declare module 'some-untyped-module' {
     export interface ComponentProps {
       value: string;
       onChange: (value: string) => void;
     }
     
     export const Component: React.FC<ComponentProps>;
   }
   ```

7. **Use type inference where possible**
   ```tsx
   // Let TypeScript infer the type when it's obvious
   const [count, setCount] = useState(0); // Inferred as number
   ```

8. **Create utility types for common patterns**
   ```tsx
   // Make all properties optional
   type PartialUser = Partial<User>;
   
   // Make all properties required
   type RequiredUser = Required<User>;
   
   // Pick specific properties
   type UserCredentials = Pick<User, 'email' | 'password'>;
   
   // Omit specific properties
   type PublicUser = Omit<User, 'password' | 'token'>;
   ```

## Resources for Further Learning

- [React TypeScript Cheatsheet](https://react-typescript-cheatsheet.netlify.app/)
- [TypeScript and React Native](https://reactnative.dev/docs/typescript)
- [React Navigation TypeScript Documentation](https://reactnavigation.org/docs/typescript/)
- [Expo Router with TypeScript](https://docs.expo.dev/router/reference/typescript/)
- [TypeScript Handbook: React](https://www.typescriptlang.org/docs/handbook/react.html)
- [React Native TypeScript Template](https://github.com/react-native-community/react-native-template-typescript)

## Summary

Applying TypeScript to React Native components provides significant advantages by enforcing contracts at the component boundaries (props) and for internal data management (state). This prevents a common class of errors where incorrect data types are passed between components or used within state logic.

Using `React.FC<Props>` and `useState<StateType>` allows the TypeScript compiler to verify the integrity of data flow within the component architecture, leading to more reliable and easier-to-debug applications.

Remember that TypeScript is a development tool that helps catch errors early, but it doesn't affect the runtime behavior of your application. The TypeScript code is compiled to JavaScript before it runs on the device.

In this module, we've covered the essential TypeScript patterns for React Native development. As you continue building applications, you'll discover more advanced typing techniques that can further enhance your development experience and code quality.