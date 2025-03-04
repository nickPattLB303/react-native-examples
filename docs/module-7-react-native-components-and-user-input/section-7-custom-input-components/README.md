# Section 7: Custom Components

## Learning Objectives
After completing this section, you will be able to:
- Create reusable custom components in React Native using TypeScript
- Apply best practices for component composition and props design with strong typing
- Implement custom UI components specific to your application needs
- Create components that handle both appearance and behavior
- Properly document custom components for reuse
- Test custom components to ensure they work as expected

**Prerequisite Knowledge**: Core React Native Components (Section 1)
**Estimated Time**: 45-60 minutes

## Custom Components Overview

Custom components allow you to encapsulate and reuse UI elements and logic throughout your application. Using TypeScript with custom components provides additional benefits:

1. More consistent user experience
2. Reduced code duplication
3. Simplified maintenance
4. Better organization and readability
5. Easier testing
6. Type safety and better developer experience

## Basic Custom Component Structure

A well-structured custom component in TypeScript typically includes:

```tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

// Define the component props interface
interface CustomComponentProps {
  title: string;
  subtitle?: string;
  backgroundColor?: string;
  onPress?: () => void;
  children?: React.ReactNode;
}

const CustomComponent: React.FC<CustomComponentProps> = ({
  title,
  subtitle,
  backgroundColor = '#ffffff',
  onPress,
  children
}) => {
  return (
    <View style={[styles.container, { backgroundColor }]}>
      <Text style={styles.title}>{title}</Text>
      {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
      <View style={styles.content}>
        {children}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderRadius: 8,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  content: {
    marginTop: 8,
  },
});

export default CustomComponent;
```

## Custom Input Components

Let's start by creating custom input components that can be reused throughout our pharmacy application:

### Custom Text Input

```tsx
import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet, TextInputProps } from 'react-native';

// Define the component props interface
interface CustomTextInputProps extends Omit<TextInputProps, 'style'> {
  label: string;
  error?: string;
  required?: boolean;
}

const CustomTextInput: React.FC<CustomTextInputProps> = ({
  label,
  value,
  onChangeText,
  placeholder,
  error,
  keyboardType = 'default',
  secureTextEntry = false,
  maxLength,
  required = false,
  ...rest
}) => {
  const [isFocused, setIsFocused] = useState<boolean>(false);
  
  return (
    <View style={styles.container}>
      <Text style={styles.label}>
        {label}
        {required && <Text style={styles.required}> *</Text>}
      </Text>
      
      <TextInput
        style={[
          styles.input,
          isFocused && styles.focusedInput,
          error && styles.errorInput
        ]}
        value={value}
        onChangeText={onChangeText}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder={placeholder}
        keyboardType={keyboardType}
        secureTextEntry={secureTextEntry}
        maxLength={maxLength}
        placeholderTextColor="#999"
        {...rest}
      />
      
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    fontWeight: '500',
  },
  required: {
    color: '#FF3B30',
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 16,
    fontSize: 16,
  },
  focusedInput: {
    borderColor: '#007AFF',
    borderWidth: 2,
  },
  errorInput: {
    borderColor: '#FF3B30',
  },
  errorText: {
    color: '#FF3B30',
    fontSize: 14,
    marginTop: 4,
  },
});

export default CustomTextInput;
```

### Custom Quantity Selector

```tsx
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

// Define the component props interface
interface QuantitySelectorProps {
  label?: string;
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  disabled?: boolean;
}

const QuantitySelector: React.FC<QuantitySelectorProps> = ({
  label,
  value,
  onChange,
  min = 1,
  max = 100,
  step = 1,
  disabled = false,
}) => {
  const increment = () => {
    if (value < max) {
      onChange(value + step);
    }
  };
  
  const decrement = () => {
    if (value > min) {
      onChange(value - step);
    }
  };
  
  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      
      <View style={styles.controlsContainer}>
        <TouchableOpacity 
          style={[
            styles.button, 
            value <= min && styles.disabledButton,
            disabled && styles.disabledButton
          ]}
          onPress={decrement}
          disabled={value <= min || disabled}
        >
          <Text style={styles.buttonText}>-</Text>
        </TouchableOpacity>
        
        <View style={styles.valueContainer}>
          <Text style={styles.value}>{value}</Text>
        </View>
        
        <TouchableOpacity 
          style={[
            styles.button, 
            value >= max && styles.disabledButton,
            disabled && styles.disabledButton
          ]}
          onPress={increment}
          disabled={value >= max || disabled}
        >
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    fontWeight: '500',
  },
  controlsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
  },
  button: {
    width: 50,
    height: 50,
    backgroundColor: '#007AFF',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  disabledButton: {
    backgroundColor: '#ccc',
  },
  valueContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 8,
  },
  value: {
    fontSize: 18,
    fontWeight: '500',
  },
});

export default QuantitySelector;
```

## Custom UI Components

Custom components aren't limited to inputs. Let's create some other useful UI components:

### Custom Card Component

```tsx
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

// Define the component props interface
interface MedicationCardProps {
  name: string;
  dosage: string;
  description: string;
  onPress: () => void;
  isActive?: boolean;
}

const MedicationCard: React.FC<MedicationCardProps> = ({
  name,
  dosage,
  description,
  onPress,
  isActive = false,
}) => {
  return (
    <TouchableOpacity
      style={[styles.card, isActive && styles.activeCard]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <View style={styles.header}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.dosage}>{dosage}</Text>
      </View>
      
      <Text style={styles.description} numberOfLines={2}>
        {description}
      </Text>
      
      <View style={styles.footer}>
        <Text style={styles.actionText}>Tap for details</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginBottom: 16,
  },
  activeCard: {
    borderWidth: 2,
    borderColor: '#007AFF',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  dosage: {
    fontSize: 16,
    color: '#555',
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
  },
  footer: {
    marginTop: 8,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  actionText: {
    fontSize: 14,
    color: '#007AFF',
  },
});

export default MedicationCard;
```

### Custom Badge Component

```tsx
import React from 'react';
import { View, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';

type StatusType = 'active' | 'pending' | 'completed' | 'expired' | string;

// Define the component props interface
interface StatusBadgeProps {
  status: StatusType;
  customStyle?: ViewStyle;
  textStyle?: TextStyle;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ 
  status, 
  customStyle, 
  textStyle 
}) => {
  const getStatusColor = (): { bg: string; text: string } => {
    switch (status.toLowerCase()) {
      case 'active':
        return { bg: '#DEFFEE', text: '#00A36A' };
      case 'pending':
        return { bg: '#FFF5DD', text: '#D9A000' };
      case 'completed':
        return { bg: '#E5F5FF', text: '#007AFF' };
      case 'expired':
        return { bg: '#FFEBEB', text: '#FF3B30' };
      default:
        return { bg: '#F0F0F0', text: '#777777' };
    }
  };
  
  const { bg, text } = getStatusColor();
  
  return (
    <View style={[
      styles.badge, 
      { backgroundColor: bg },
      customStyle
    ]}>
      <Text style={[
        styles.text, 
        { color: text },
        textStyle
      ]}>
        {status}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 16,
    alignSelf: 'flex-start',
  },
  text: {
    fontSize: 12,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
});

export default StatusBadge;
```

## Custom Functional Components

Not all custom components are purely UI-focused. Some encapsulate behavior:

### Custom Loading Component

```tsx
import React from 'react';
import { View, ActivityIndicator, Text, StyleSheet } from 'react-native';

// Define the component props interface
interface LoadingOverlayProps {
  isLoading: boolean;
  message?: string;
  transparent?: boolean;
  children?: React.ReactNode;
}

const LoadingOverlay: React.FC<LoadingOverlayProps> = ({
  isLoading,
  message = 'Loading...',
  transparent = true,
  children,
}) => {
  if (!isLoading) return <>{children}</>;
  
  return (
    <View style={styles.container}>
      {children && <View style={transparent ? styles.contentBlurred : styles.content}>
        {children}
      </View>}
      
      <View style={[
        styles.overlay,
        transparent && styles.transparentOverlay
      ]}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#007AFF" />
          <Text style={styles.message}>{message}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
  contentBlurred: {
    flex: 1,
    opacity: 0.5,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  transparentOverlay: {
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
  },
  loadingContainer: {
    padding: 24,
    backgroundColor: 'white',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 5,
  },
  message: {
    marginTop: 12,
    fontSize: 16,
    fontWeight: '500',
  },
});

export default LoadingOverlay;
```

### Custom Error Boundary Component

```tsx
import React, { Component, ErrorInfo, ReactNode } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

// Define the component props and state interfaces
interface ErrorBoundaryProps {
  children: ReactNode;
  onReset?: () => void;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  
  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    // Update state so the next render will show the fallback UI
    return { hasError: true, error };
  }
  
  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    // You can log the error to an error reporting service
    console.log('Error caught by boundary:', error, errorInfo);
  }
  
  resetError = (): void => {
    this.setState({ hasError: false, error: null });
    
    if (this.props.onReset) {
      this.props.onReset();
    }
  };
  
  render(): ReactNode {
    if (this.state.hasError) {
      // Render fallback UI
      return (
        <View style={styles.container}>
          <Text style={styles.header}>Something went wrong</Text>
          <Text style={styles.message}>
            {this.state.error?.message || 'An unexpected error occurred'}
          </Text>
          <Button title="Try Again" onPress={this.resetError} />
        </View>
      );
    }
    
    return this.props.children;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  message: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 24,
    color: '#666',
  },
});

export default ErrorBoundary;
```

## Custom Component Best Practices

### Component Design Principles

1. **Single Responsibility**: Each component should focus on doing one thing well.
2. **Composability**: Components should be easily combined with other components.
3. **Reusability**: Components should be designed to be reused across the application.
4. **Customizability**: Components should accept props for customization.
5. **Self-Contained**: Components should manage their own state when appropriate.

### Props Design

For well-designed components, consider:

1. **Provide Defaults**: Set sensible default values for optional props.
2. **Use TypeScript Types**: Define proper interfaces for component props.
3. **Consistent Naming**: Use consistent naming conventions for props.
4. **Minimal Props Interface**: Only expose what's necessary.
5. **Props Extension**: Extend existing types when appropriate (e.g., extending TextInputProps).

### Component Documentation

With TypeScript, your component props are self-documenting, but additional JSDoc comments are still valuable:

```tsx
/**
 * MedicationCard - Displays medication information in a card format
 * 
 * @param props - Component props
 * @param props.name - The name of the medication
 * @param props.dosage - The dosage information
 * @param props.description - Description or instructions
 * @param props.onPress - Function to call when card is pressed
 * @param props.isActive - Whether the card is in active state
 * 
 * @example
 * <MedicationCard
 *   name="Ibuprofen"
 *   dosage="200mg"
 *   description="Take with food, twice daily"
 *   onPress={() => handlePress(medication.id)}
 * />
 */
```

## Creating a Custom Component Library

For larger applications, consider organizing your custom components into a library:

```
/components
  /inputs
    CustomTextInput.tsx
    QuantitySelector.tsx
    ...
  /ui
    MedicationCard.tsx
    StatusBadge.tsx
    ...
  /layout
    Container.tsx
    Row.tsx
    Column.tsx
    ...
  /feedback
    ErrorBoundary.tsx
    LoadingOverlay.tsx
    ...
  index.ts  // Export all components
```

The `index.ts` file can export all components:

```tsx
// Input components
export { default as CustomTextInput } from './inputs/CustomTextInput';
export { default as QuantitySelector } from './inputs/QuantitySelector';

// UI components
export { default as MedicationCard } from './ui/MedicationCard';
export { default as StatusBadge } from './ui/StatusBadge';

// Layout components
export { default as Container } from './layout/Container';
export { default as Row } from './layout/Row';
export { default as Column } from './layout/Column';

// Feedback components
export { default as ErrorBoundary } from './feedback/ErrorBoundary';
export { default as LoadingOverlay } from './feedback/LoadingOverlay';
```

## Exercise: Build a Pharmacy-Specific Component Library

Create a small pharmacy-specific component library with the following components:

1. A medication list item component that shows:
   - Medication name and strength
   - Prescription status (active, expired, etc.)
   - Days remaining
   - Quick action buttons (refill, details)

2. A dosage scheduler component that allows:
   - Selecting time of day (morning, afternoon, evening, bedtime)
   - Selecting frequency (daily, specific days, etc.)
   - Displaying the next scheduled dose

3. A prescription summary component that shows:
   - Patient name
   - Medication details
   - Prescribing doctor
   - Pharmacy location
   - Fill history

Use the following starting point for your component library:

```tsx
// Create a directory structure for your components
// /components
//   /medication
//     MedicationListItem.tsx
//     DosageScheduler.tsx
//     PrescriptionSummary.tsx
//   index.ts

// Example of what MedicationListItem.tsx might look like:
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

// Define types for the component
interface MedicationListItemProps {
  // Define your props here
}

const MedicationListItem: React.FC<MedicationListItemProps> = (props) => {
  // Implement your component here
  return (
    <View style={styles.container}>
      {/* Component content */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // Your styles here
  },
});

export default MedicationListItem;
```

## Additional Resources

- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [React TypeScript Cheatsheet](https://github.com/typescript-cheatsheets/react)
- [React Native Component Libraries](https://reactnative.directory/?search=ui)
- [Component Design Patterns](https://reactpatterns.com/)
- [React Native Paper](https://callstack.github.io/react-native-paper/) - UI library with customizable components
- [React Native Elements](https://reactnativeelements.com/) - UI toolkit for React Native
- [Storybook for React Native](https://storybook.js.org/docs/react-native/get-started/introduction) - Tool for building UI components in isolation 