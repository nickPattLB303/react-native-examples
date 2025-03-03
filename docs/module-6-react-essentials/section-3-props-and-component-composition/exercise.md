# Exercise: Building a Component Library

## Objective
Create a set of reusable components for a medication tracking app, focusing on proper props usage and component composition patterns.

## Duration
30-45 minutes

## Exercise Description

In this exercise, you'll build a small component library for a medication tracking application. You'll practice passing props between components, implementing prop validation, and using different component composition patterns.

### Requirements

You'll create the following components:

1. **Button**: A reusable button component with different variants
2. **Card**: A container component that uses the children prop
3. **MedicationCard**: A specialized component built from other components

### Implementation Steps

#### 1. Button Component

Create a flexible Button component that:
- Accepts `type` (primary, secondary, danger), `size` (small, medium, large), `onPress`, and `children` props
- Renders a button with different styles based on the type and size
- Handles the onPress event
- Includes prop validation

```jsx
import PropTypes from 'prop-types';
// For React Native:
// import { TouchableOpacity, Text, StyleSheet } from 'react-native';

function Button({ type = 'primary', size = 'medium', onPress, children }) {
  // Implement button styles based on type and size
  // For web:
  const buttonStyle = {
    // Base styles
    padding: size === 'small' ? '4px 8px' : size === 'medium' ? '8px 16px' : '12px 24px',
    borderRadius: '4px',
    border: 'none',
    cursor: 'pointer',
    // Type-specific styles
    backgroundColor: 
      type === 'primary' ? '#007bff' : 
      type === 'secondary' ? '#6c757d' : 
      '#dc3545', // danger
    color: 'white',
  };
  
  return (
    <button style={buttonStyle} onClick={onPress}>
      {children}
    </button>
  );
  
  // For React Native:
  /* 
  return (
    <TouchableOpacity 
      style={[styles.button, styles[type], styles[size]]} 
      onPress={onPress}
    >
      <Text style={styles.text}>{children}</Text>
    </TouchableOpacity>
  );
  */
}

Button.propTypes = {
  type: PropTypes.oneOf(['primary', 'secondary', 'danger']),
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  onPress: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

// For React Native:
/*
const styles = StyleSheet.create({
  button: {
    borderRadius: 4,
  },
  primary: {
    backgroundColor: '#007bff',
  },
  secondary: {
    backgroundColor: '#6c757d',
  },
  danger: {
    backgroundColor: '#dc3545',
  },
  small: {
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  medium: {
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  large: {
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
  text: {
    color: 'white',
    textAlign: 'center',
  },
});
*/
```

#### 2. Card Component

Create a Card component that:
- Accepts `title`, `footer`, and `children` props
- Renders a card with a header (title), content (children), and optional footer
- Uses composition to create a flexible container

```jsx
import PropTypes from 'prop-types';
// For React Native:
// import { View, Text, StyleSheet } from 'react-native';

function Card({ title, footer, children }) {
  // Implement your Card component
  // For web:
  const cardStyle = {
    border: '1px solid #ddd',
    borderRadius: '8px',
    overflow: 'hidden',
    margin: '16px 0',
  };
  
  const headerStyle = {
    backgroundColor: '#f8f9fa',
    padding: '12px 16px',
    borderBottom: '1px solid #ddd',
  };
  
  const contentStyle = {
    padding: '16px',
  };
  
  const footerStyle = {
    backgroundColor: '#f8f9fa',
    padding: '12px 16px',
    borderTop: '1px solid #ddd',
  };
  
  return (
    <div style={cardStyle}>
      {title && (
        <div style={headerStyle}>
          <h3 style={{ margin: 0 }}>{title}</h3>
        </div>
      )}
      <div style={contentStyle}>
        {children}
      </div>
      {footer && (
        <div style={footerStyle}>
          {footer}
        </div>
      )}
    </div>
  );
  
  // For React Native:
  /*
  return (
    <View style={styles.card}>
      {title && (
        <View style={styles.header}>
          <Text style={styles.title}>{title}</Text>
        </View>
      )}
      <View style={styles.content}>
        {children}
      </View>
      {footer && (
        <View style={styles.footer}>
          {footer}
        </View>
      )}
    </View>
  );
  */
}

Card.propTypes = {
  title: PropTypes.string,
  footer: PropTypes.node,
  children: PropTypes.node.isRequired,
};

// For React Native:
/*
const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    overflow: 'hidden',
    marginVertical: 16,
  },
  header: {
    backgroundColor: '#f8f9fa',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  content: {
    padding: 16,
  },
  footer: {
    backgroundColor: '#f8f9fa',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
});
*/
```

#### 3. Specialized Button Components

Create specialized button components using composition:

```jsx
function PrimaryButton({ children, ...props }) {
  return (
    <Button type="primary" {...props}>
      {children}
    </Button>
  );
}

function DangerButton({ children, ...props }) {
  return (
    <Button type="danger" {...props}>
      {children}
    </Button>
  );
}
```

#### 4. MedicationCard Component

Create a component that uses Card and Button components to display medication details:

```jsx
function MedicationCard({ medication, onTakeMedication, onRefill }) {
  // Implement your MedicationCard component
  // Should use the Card component and Button/specialized button components
  
  // Implement this component by composing the Card and Button components
  // Display medication details in the card content
  // Use buttons in the footer for actions
}

MedicationCard.propTypes = {
  medication: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    dosage: PropTypes.string.isRequired,
    schedule: PropTypes.string.isRequired,
    refillsRemaining: PropTypes.number,
  }).isRequired,
  onTakeMedication: PropTypes.func.isRequired,
  onRefill: PropTypes.func,
};
```

### Bonus Challenges

1. **Render Props Pattern**: Implement a component that uses the render props pattern to customize how medications are displayed
2. **Multiple Slots**: Enhance the Card component to support named slots (e.g., header, footer, actions)
3. **Higher-Order Component**: Create a withLoading HOC that wraps a component to show a loading indicator
4. **TypeScript**: Convert your components to use TypeScript instead of PropTypes

## Deliverables

1. Implement all the required components with appropriate props and validation
2. Create examples of component composition using your library
3. Test your components with different prop values to ensure they work correctly

## Evaluation Criteria

- Proper implementation of props passing
- Correct use of prop validation
- Effective component composition patterns
- Reusability of components
- Flexibility of component API

## Tips

- Focus on making your components reusable and generic where appropriate
- Use default prop values to make components easier to use
- Consider which props are required vs. optional
- Think about the component API from the user's perspective
- Follow the principle of "composition over inheritance" 