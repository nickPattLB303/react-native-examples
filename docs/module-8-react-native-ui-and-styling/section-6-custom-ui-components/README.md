# Section 6: Custom UI Components

## Learning Objectives
After completing this section, you will be able to:
- Design and implement custom UI components in React Native
- Create reusable components with flexible props and styling
- Implement compound components for complex UI patterns
- Apply composition patterns to build maintainable component libraries
- Optimize custom components for performance
- Implement accessibility features in custom components
- Test custom UI components effectively

**Prerequisite Knowledge**: StyleSheet API (Section 2), Flexbox Layout (Section 3)
**Estimated Time**: 60-75 minutes

## Introduction to Custom UI Components

While React Native provides a set of core components, most applications require custom UI components that match specific design requirements and provide enhanced functionality. Building a library of custom components helps maintain consistency, improves development speed, and creates a better user experience.

> 💡 **Key Insight**: Well-designed custom components encapsulate both visual styling and behavior, making your application code more declarative, maintainable, and consistent.

## Component Design Principles

### 1. Composition Over Inheritance

React favors composition over inheritance. Build complex components by composing simpler ones:

```jsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from './Icon';

function InfoBox({ title, message, type = 'info' }) {
  return (
    <View style={[styles.container, styles[type]]}>
      <Icon name={getIconName(type)} style={styles.icon} />
      <View style={styles.content}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.message}>{message}</Text>
      </View>
    </View>
  );
}

function getIconName(type) {
  switch (type) {
    case 'success': return 'check-circle';
    case 'warning': return 'alert-triangle';
    case 'error': return 'x-circle';
    default: return 'info';
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderRadius: 8,
    padding: 16,
    marginVertical: 8,
  },
  info: {
    backgroundColor: '#e6f7ff',
    borderLeftWidth: 4,
    borderLeftColor: '#1890ff',
  },
  success: {
    backgroundColor: '#f6ffed',
    borderLeftWidth: 4,
    borderLeftColor: '#52c41a',
  },
  warning: {
    backgroundColor: '#fffbe6',
    borderLeftWidth: 4,
    borderLeftColor: '#faad14',
  },
  error: {
    backgroundColor: '#fff2f0',
    borderLeftWidth: 4,
    borderLeftColor: '#ff4d4f',
  },
  icon: {
    marginRight: 12,
  },
  content: {
    flex: 1,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 4,
  },
  message: {
    fontSize: 14,
  },
});

export default InfoBox;
```

### 2. Props API Design

Design a clear and consistent props API for your components:

```jsx
import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

function Button({
  // Content
  title,
  leftIcon,
  rightIcon,
  
  // Appearance
  variant = 'primary', // 'primary', 'secondary', 'outline'
  size = 'medium',     // 'small', 'medium', 'large'
  rounded = false,
  
  // Behavior
  onPress,
  disabled = false,
  loading = false,
  
  // Customization
  style,
  textStyle,
  
  // Other props
  ...otherProps
}) {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        styles[variant],
        styles[size],
        rounded && styles.rounded,
        disabled && styles.disabled,
        style,
      ]}
      onPress={onPress}
      disabled={disabled || loading}
      {...otherProps}
    >
      {leftIcon && <View style={styles.leftIcon}>{leftIcon}</View>}
      
      <Text style={[
        styles.text,
        styles[`${variant}Text`],
        styles[`${size}Text`],
        textStyle,
      ]}>
        {loading ? 'Loading...' : title}
      </Text>
      
      {rightIcon && <View style={styles.rightIcon}>{rightIcon}</View>}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
  },
  // Variants
  primary: {
    backgroundColor: '#1890ff',
  },
  secondary: {
    backgroundColor: '#f5f5f5',
  },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#1890ff',
  },
  // Sizes
  small: {
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  medium: {
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  large: {
    paddingVertical: 14,
    paddingHorizontal: 20,
  },
  // States
  rounded: {
    borderRadius: 9999,
  },
  disabled: {
    opacity: 0.6,
  },
  // Text styles
  text: {
    fontWeight: '500',
  },
  primaryText: {
    color: 'white',
  },
  secondaryText: {
    color: '#333',
  },
  outlineText: {
    color: '#1890ff',
  },
  smallText: {
    fontSize: 12,
  },
  mediumText: {
    fontSize: 14,
  },
  largeText: {
    fontSize: 16,
  },
  // Icon styles
  leftIcon: {
    marginRight: 8,
  },
  rightIcon: {
    marginLeft: 8,
  },
});

export default Button;
```

### 3. Style Customization

Allow flexible style customization while maintaining component integrity:

```jsx
import React from 'react';
import { View, StyleSheet } from 'react-native';

function Card({
  children,
  style,
  contentStyle,
  ...otherProps
}) {
  return (
    <View style={[styles.card, style]} {...otherProps}>
      <View style={[styles.content, contentStyle]}>
        {children}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  content: {
    padding: 16,
  },
});

export default Card;
```

## Building Complex Custom Components

### Compound Components Pattern

The compound component pattern allows for more flexible and expressive component APIs:

```jsx
import React, { createContext, useContext, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

// Create a context for the Accordion
const AccordionContext = createContext();

// Main Accordion component
function Accordion({ children, multiple = false, defaultExpanded = [] }) {
  const [expandedItems, setExpandedItems] = useState(defaultExpanded);

  const toggleItem = (itemId) => {
    if (multiple) {
      setExpandedItems(prev => 
        prev.includes(itemId)
          ? prev.filter(id => id !== itemId)
          : [...prev, itemId]
      );
    } else {
      setExpandedItems(prev => 
        prev.includes(itemId) ? [] : [itemId]
      );
    }
  };

  return (
    <AccordionContext.Provider value={{ expandedItems, toggleItem }}>
      <View style={styles.accordion}>
        {children}
      </View>
    </AccordionContext.Provider>
  );
}

// Accordion Item component
Accordion.Item = function AccordionItem({ id, children }) {
  const { expandedItems } = useContext(AccordionContext);
  const isExpanded = expandedItems.includes(id);

  return (
    <View style={styles.item}>
      {React.Children.map(children, child => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child, { id, isExpanded });
        }
        return child;
      })}
    </View>
  );
};

// Accordion Header component
Accordion.Header = function AccordionHeader({ id, children, isExpanded }) {
  const { toggleItem } = useContext(AccordionContext);

  return (
    <TouchableOpacity 
      style={[styles.header, isExpanded && styles.expandedHeader]} 
      onPress={() => toggleItem(id)}
    >
      <Text style={styles.headerText}>{children}</Text>
      <Text style={styles.icon}>{isExpanded ? '▲' : '▼'}</Text>
    </TouchableOpacity>
  );
};

// Accordion Content component
Accordion.Content = function AccordionContent({ children, isExpanded }) {
  if (!isExpanded) return null;
  
  return (
    <View style={styles.content}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  accordion: {
    borderRadius: 8,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#e8e8e8',
  },
  item: {
    borderBottomWidth: 1,
    borderBottomColor: '#e8e8e8',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f9f9f9',
  },
  expandedHeader: {
    backgroundColor: '#f0f0f0',
  },
  headerText: {
    fontSize: 16,
    fontWeight: '500',
  },
  icon: {
    fontSize: 12,
  },
  content: {
    padding: 16,
    backgroundColor: 'white',
  },
});

// Usage example:
function AccordionExample() {
  return (
    <Accordion defaultExpanded={['medications']}>
      <Accordion.Item id="medications">
        <Accordion.Header>Medications</Accordion.Header>
        <Accordion.Content>
          <Text>List of medications...</Text>
        </Accordion.Content>
      </Accordion.Item>
      
      <Accordion.Item id="appointments">
        <Accordion.Header>Appointments</Accordion.Header>
        <Accordion.Content>
          <Text>Upcoming appointments...</Text>
        </Accordion.Content>
      </Accordion.Item>
    </Accordion>
  );
}

export default Accordion;
```

### Custom Input Components

Create enhanced input components with built-in validation and formatting:

```jsx
import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet } from 'react-native';

function FormInput({
  label,
  value,
  onChangeText,
  placeholder,
  keyboardType = 'default',
  secureTextEntry = false,
  autoCapitalize = 'none',
  error,
  touched,
  required = false,
  helperText,
  style,
  inputStyle,
  ...otherProps
}) {
  const [isFocused, setIsFocused] = useState(false);
  
  const handleFocus = () => {
    setIsFocused(true);
    if (otherProps.onFocus) {
      otherProps.onFocus();
    }
  };
  
  const handleBlur = () => {
    setIsFocused(false);
    if (otherProps.onBlur) {
      otherProps.onBlur();
    }
  };
  
  const showError = error && touched;
  
  return (
    <View style={[styles.container, style]}>
      {label && (
        <Text style={styles.label}>
          {label}
          {required && <Text style={styles.required}> *</Text>}
        </Text>
      )}
      
      <TextInput
        style={[
          styles.input,
          isFocused && styles.focused,
          showError && styles.errorInput,
          inputStyle,
        ]}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        keyboardType={keyboardType}
        secureTextEntry={secureTextEntry}
        autoCapitalize={autoCapitalize}
        onFocus={handleFocus}
        onBlur={handleBlur}
        {...otherProps}
      />
      
      {showError ? (
        <Text style={styles.errorText}>{error}</Text>
      ) : helperText ? (
        <Text style={styles.helperText}>{helperText}</Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 6,
    color: '#333',
  },
  required: {
    color: '#ff4d4f',
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: '#d9d9d9',
    borderRadius: 4,
    paddingHorizontal: 12,
    fontSize: 16,
    color: '#333',
  },
  focused: {
    borderColor: '#1890ff',
  },
  errorInput: {
    borderColor: '#ff4d4f',
  },
  helperText: {
    fontSize: 12,
    color: '#8c8c8c',
    marginTop: 4,
  },
  errorText: {
    fontSize: 12,
    color: '#ff4d4f',
    marginTop: 4,
  },
});

export default FormInput;
```

### Custom List Components

Create enhanced list components with built-in loading, empty states, and error handling:

```jsx
import React from 'react';
import { FlatList, View, Text, ActivityIndicator, StyleSheet } from 'react-native';

function EnhancedList({
  data,
  renderItem,
  keyExtractor,
  ListHeaderComponent,
  ListFooterComponent,
  ItemSeparatorComponent,
  
  // Enhanced props
  loading = false,
  error = null,
  emptyText = 'No data available',
  loadingText = 'Loading...',
  errorText = 'Error loading data',
  retryText = 'Retry',
  onRetry,
  
  // Pass through other FlatList props
  ...otherProps
}) {
  // Loading state
  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#1890ff" />
        <Text style={styles.loadingText}>{loadingText}</Text>
      </View>
    );
  }
  
  // Error state
  if (error) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>{errorText}</Text>
        <Text style={styles.errorDetails}>{error.message}</Text>
        {onRetry && (
          <TouchableOpacity style={styles.retryButton} onPress={onRetry}>
            <Text style={styles.retryButtonText}>{retryText}</Text>
          </TouchableOpacity>
        )}
      </View>
    );
  }
  
  // Empty state
  if (!data || data.length === 0) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.emptyText}>{emptyText}</Text>
      </View>
    );
  }
  
  // Data state
  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      ListHeaderComponent={ListHeaderComponent}
      ListFooterComponent={ListFooterComponent}
      ItemSeparatorComponent={ItemSeparatorComponent || (() => <View style={styles.separator} />)}
      {...otherProps}
    />
  );
}

const styles = StyleSheet.create({
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#8c8c8c',
  },
  emptyText: {
    fontSize: 16,
    color: '#8c8c8c',
    textAlign: 'center',
  },
  errorText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ff4d4f',
    marginBottom: 8,
  },
  errorDetails: {
    fontSize: 14,
    color: '#8c8c8c',
    textAlign: 'center',
    marginBottom: 16,
  },
  retryButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: '#1890ff',
    borderRadius: 4,
  },
  retryButtonText: {
    color: 'white',
    fontWeight: '500',
  },
  separator: {
    height: 1,
    backgroundColor: '#f0f0f0',
  },
});

export default EnhancedList;
```

## Component Composition Patterns

### Higher-Order Components (HOCs)

Create reusable logic with Higher-Order Components:

```jsx
import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';

// HOC that adds loading state to any component
function withLoading(WrappedComponent) {
  return function WithLoadingComponent({ isLoading, ...props }) {
    if (isLoading) {
      return (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#1890ff" />
        </View>
      );
    }
    
    return <WrappedComponent {...props} />;
  };
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

// Usage:
const MedicationListWithLoading = withLoading(MedicationList);

function Screen() {
  const [loading, setLoading] = useState(true);
  const [medications, setMedications] = useState([]);
  
  // Fetch data...
  
  return (
    <MedicationListWithLoading 
      isLoading={loading}
      data={medications}
    />
  );
}
```

### Render Props Pattern

Share component logic using render props:

```jsx
import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';

function Collapsible({ 
  children, 
  renderHeader, 
  initialExpanded = false,
  animationDuration = 300,
}) {
  const [expanded, setExpanded] = useState(initialExpanded);
  
  const toggleExpanded = () => {
    setExpanded(!expanded);
  };
  
  return (
    <View style={styles.container}>
      {renderHeader({ expanded, toggleExpanded })}
      
      {expanded && (
        <View style={styles.content}>
          {children}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: '#e8e8e8',
    borderRadius: 4,
    overflow: 'hidden',
  },
  content: {
    padding: 16,
  },
});

// Usage:
function CollapsibleExample() {
  return (
    <Collapsible
      renderHeader={({ expanded, toggleExpanded }) => (
        <TouchableOpacity 
          style={styles.header} 
          onPress={toggleExpanded}
        >
          <Text>Section Title</Text>
          <Text>{expanded ? '▲' : '▼'}</Text>
        </TouchableOpacity>
      )}
    >
      <Text>Collapsible content here...</Text>
    </Collapsible>
  );
}
```

### Custom Hooks for UI Logic

Extract UI logic into custom hooks:

```jsx
import { useState, useEffect } from 'react';

function useFormField(initialValue = '', validate) {
  const [value, setValue] = useState(initialValue);
  const [touched, setTouched] = useState(false);
  const [error, setError] = useState('');
  
  useEffect(() => {
    if (touched && validate) {
      const validationError = validate(value);
      setError(validationError || '');
    }
  }, [value, touched, validate]);
  
  const handleChange = (newValue) => {
    setValue(newValue);
    if (touched && validate) {
      const validationError = validate(newValue);
      setError(validationError || '');
    }
  };
  
  const handleBlur = () => {
    setTouched(true);
    if (validate) {
      const validationError = validate(value);
      setError(validationError || '');
    }
  };
  
  const reset = () => {
    setValue(initialValue);
    setTouched(false);
    setError('');
  };
  
  return {
    value,
    setValue: handleChange,
    error,
    touched,
    handleBlur,
    reset,
    props: {
      value,
      onChangeText: handleChange,
      onBlur: handleBlur,
      error,
      touched,
    },
  };
}

// Usage:
function LoginForm() {
  const email = useFormField('', value => {
    if (!value) return 'Email is required';
    if (!/\S+@\S+\.\S+/.test(value)) return 'Invalid email format';
    return '';
  });
  
  const password = useFormField('', value => {
    if (!value) return 'Password is required';
    if (value.length < 6) return 'Password must be at least 6 characters';
    return '';
  });
  
  const handleSubmit = () => {
    email.handleBlur();
    password.handleBlur();
    
    if (!email.error && !password.error) {
      // Submit form
    }
  };
  
  return (
    <View>
      <FormInput
        label="Email"
        placeholder="Enter your email"
        keyboardType="email-address"
        {...email.props}
      />
      
      <FormInput
        label="Password"
        placeholder="Enter your password"
        secureTextEntry
        {...password.props}
      />
      
      <Button title="Login" onPress={handleSubmit} />
    </View>
  );
}
```

## Performance Optimization

### Memoization

Use `React.memo` to prevent unnecessary re-renders:

```jsx
import React, { memo } from 'react';
import { View, Text, StyleSheet } from 'react-native';

function MedicationItem({ name, dosage, schedule }) {
  return (
    <View style={styles.container}>
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.dosage}>{dosage}</Text>
      <Text style={styles.schedule}>{schedule}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: 'white',
    borderRadius: 8,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  dosage: {
    fontSize: 14,
    color: '#666',
    marginBottom: 2,
  },
  schedule: {
    fontSize: 14,
    color: '#888',
  },
});

// Memoize the component to prevent unnecessary re-renders
export default memo(MedicationItem);
```

### Optimizing Lists

Optimize list rendering performance:

```jsx
import React, { memo, useCallback } from 'react';
import { FlatList, View, Text, StyleSheet } from 'react-native';

// Memoized item component
const MedicationItem = memo(({ item }) => (
  <View style={styles.item}>
    <Text style={styles.name}>{item.name}</Text>
    <Text style={styles.dosage}>{item.dosage}</Text>
  </View>
));

function MedicationList({ data }) {
  // Memoized key extractor
  const keyExtractor = useCallback((item) => item.id, []);
  
  // Memoized render item function
  const renderItem = useCallback(({ item }) => (
    <MedicationItem item={item} />
  ), []);
  
  return (
    <FlatList
      data={data}
      keyExtractor={keyExtractor}
      renderItem={renderItem}
      initialNumToRender={10}
      maxToRenderPerBatch={10}
      windowSize={5}
      removeClippedSubviews={true}
      getItemLayout={(data, index) => ({
        length: 80, // Fixed height for each item
        offset: 80 * index,
        index,
      })}
    />
  );
}

const styles = StyleSheet.create({
  item: {
    height: 80,
    padding: 16,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  dosage: {
    fontSize: 14,
    color: '#666',
  },
});

export default MedicationList;
```

## Accessibility in Custom Components

Implement accessibility features in your custom components:

```jsx
import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

function AccessibleButton({
  title,
  onPress,
  accessibilityLabel,
  accessibilityHint,
  disabled = false,
  style,
  textStyle,
}) {
  return (
    <TouchableOpacity
      style={[styles.button, disabled && styles.disabled, style]}
      onPress={onPress}
      disabled={disabled}
      accessible={true}
      accessibilityLabel={accessibilityLabel || title}
      accessibilityHint={accessibilityHint}
      accessibilityRole="button"
      accessibilityState={{ disabled }}
    >
      <Text style={[styles.text, disabled && styles.disabledText, textStyle]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#1890ff',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 4,
    alignItems: 'center',
  },
  disabled: {
    backgroundColor: '#d9d9d9',
  },
  text: {
    color: 'white',
    fontWeight: '500',
    fontSize: 16,
  },
  disabledText: {
    color: '#bfbfbf',
  },
});

// Usage:
function AccessibilityExample() {
  return (
    <AccessibleButton
      title="Add Medication"
      onPress={() => {}}
      accessibilityLabel="Add a new medication"
      accessibilityHint="Opens the form to add a new medication to your list"
    />
  );
}
```

## Testing Custom Components

### Unit Testing with Jest and React Native Testing Library

```jsx
import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import Button from '../Button';

describe('Button Component', () => {
  it('renders correctly with title', () => {
    const { getByText } = render(<Button title="Press Me" onPress={() => {}} />);
    expect(getByText('Press Me')).toBeTruthy();
  });
  
  it('calls onPress when pressed', () => {
    const onPressMock = jest.fn();
    const { getByText } = render(<Button title="Press Me" onPress={onPressMock} />);
    
    fireEvent.press(getByText('Press Me'));
    expect(onPressMock).toHaveBeenCalledTimes(1);
  });
  
  it('does not call onPress when disabled', () => {
    const onPressMock = jest.fn();
    const { getByText } = render(
      <Button title="Press Me" onPress={onPressMock} disabled />
    );
    
    fireEvent.press(getByText('Press Me'));
    expect(onPressMock).not.toHaveBeenCalled();
  });
  
  it('applies custom styles', () => {
    const { getByText } = render(
      <Button 
        title="Styled Button" 
        onPress={() => {}} 
        style={{ backgroundColor: 'red' }}
        textStyle={{ color: 'yellow' }}
      />
    );
    
    const buttonElement = getByText('Styled Button');
    const buttonContainer = buttonElement.parent;
    
    expect(buttonContainer.props.style).toContainEqual(
      expect.objectContaining({ backgroundColor: 'red' })
    );
    expect(buttonElement.props.style).toContainEqual(
      expect.objectContaining({ color: 'yellow' })
    );
  });
});
```

## Exercise: Building a Custom Medication Card Component

Create a custom medication card component with the following features:

1. Display medication name, dosage, schedule, and instructions
2. Include a visual indicator for medication type (pill, liquid, injection)
3. Show a status badge (active, expired, low supply)
4. Add action buttons (take now, refill, view details)
5. Implement accessibility features
6. Make the component customizable with props
7. Optimize for performance

## Additional Resources

- [React Native Components and APIs](https://reactnative.dev/docs/components-and-apis)
- [React Composition Patterns](https://reactjs.org/docs/composition-vs-inheritance.html)
- [React Native Accessibility](https://reactnative.dev/docs/accessibility)
- [React Native Testing Library](https://callstack.github.io/react-native-testing-library/)

> 🔄 **For Web Developers**: While many React component patterns are similar between web and React Native, there are important differences in styling, layout, and available APIs. Focus on adapting your web component knowledge to the mobile context.

> 🔄 **For Android/iOS Developers**: React Native's component-based architecture may differ from traditional native development. Pay attention to how React's declarative approach and composition patterns can simplify complex UI implementations compared to imperative native code.
