# Section 3: Props and Component Composition

## Learning Objectives
After completing this section, you will be able to:
- Understand the role of props in React components
- Pass and receive props between components
- Implement prop type validation for component safety
- Apply component composition patterns
- Use React's children prop for flexible component design

**Prerequisite Knowledge**: Components and JSX (Section 2)
**Estimated Time**: 1.5 hours

## Understanding Props

Props (short for "properties") are the primary way to pass data between React components. They are read-only and flow downward from parent to child components, creating a one-way data flow that makes applications easier to understand and debug.

### The Role of Props

Props serve several crucial purposes in React applications:

1. **Data Passing**: They allow parent components to pass data to child components
2. **Configuration**: They enable customization of components for different use cases
3. **Behavior Definition**: They can include callback functions to define how a component should behave
4. **Children Content**: They provide a way to include child elements within a component

### Passing Props to Components

Props are passed to components as attributes in JSX:

```jsx
// Passing props to a component
<MedicationItem 
  name="Lisinopril" 
  dosage="10mg" 
  schedule="Once daily" 
  isActive={true} 
  onPress={() => console.log('Pressed')} 
/>
```

### Receiving Props in Components

In functional components, props are received as the first parameter, typically destructured for convenience:

```jsx
// Receiving props in a functional component
function MedicationItem({ name, dosage, schedule, isActive, onPress }) {
  return (
    <TouchableOpacity 
      style={[styles.container, isActive ? styles.active : styles.inactive]} 
      onPress={onPress}
    >
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.dosage}>{dosage}</Text>
      <Text style={styles.schedule}>{schedule}</Text>
    </TouchableOpacity>
  );
}
```

> 💡 **Deep Dive**: Props in React are immutable by design. A component should never modify its own props. This restriction helps enforce the one-way data flow that makes React applications predictable and easier to debug. If a component needs to modify data, it should use state instead.

### Default Props

You can define default values for props to handle cases where a prop isn't provided:

```jsx
function MedicationItem({ name, dosage, schedule, isActive = true, onPress }) {
  // Default value for isActive is true
  return (
    // Component implementation
  );
}

// Alternative approach using defaultProps (older pattern)
MedicationItem.defaultProps = {
  isActive: true,
};
```

In TypeScript, you can combine default values with type definitions:

```tsx
type MedicationItemProps = {
  name: string;
  dosage: string;
  schedule: string;
  isActive?: boolean; // Optional prop
  onPress: () => void;
};

function MedicationItem({ 
  name, 
  dosage, 
  schedule, 
  isActive = true, 
  onPress 
}: MedicationItemProps) {
  // Component implementation
}
```

### Prop Type Validation

React provides a way to validate props at runtime using PropTypes:

```jsx
import PropTypes from 'prop-types';

function MedicationItem({ name, dosage, schedule, isActive, onPress }) {
  // Component implementation
}

MedicationItem.propTypes = {
  name: PropTypes.string.isRequired,
  dosage: PropTypes.string.isRequired,
  schedule: PropTypes.string.isRequired,
  isActive: PropTypes.bool,
  onPress: PropTypes.func.isRequired,
};
```

> 🔍 **Instructor Note**: In modern React projects, especially those using TypeScript, PropTypes are less common as TypeScript provides compile-time type checking. However, understanding PropTypes is still valuable for projects using JavaScript.

## The "children" Prop

One special prop in React is `children`, which allows components to receive and render nested JSX elements:

```jsx
// Card component that accepts children
function Card({ title, children }) {
  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>{title}</Text>
      <View style={styles.cardContent}>
        {children}
      </View>
    </View>
  );
}

// Using the Card component with children
function MedicationDetail() {
  return (
    <Card title="Medication Details">
      <Text>Name: Lisinopril</Text>
      <Text>Dosage: 10mg</Text>
      <Text>Schedule: Once daily</Text>
      <Button title="Refill Prescription" onPress={() => {}} />
    </Card>
  );
}
```

The `children` prop allows for flexible component composition, enabling you to create wrapper components that can contain any content.

> 💡 **Deep Dive**: The children prop is actually part of the props object passed to your component. When you write `<Card>Content</Card>`, React passes `"Content"` as the `children` prop to the Card component. When you write `<Card><Text>A</Text><Text>B</Text></Card>`, the `children` prop becomes an array of React elements.

## Advanced Component Composition Patterns

While basic component composition is powerful, React offers several advanced patterns for more complex scenarios:

### 1. Specialization (Specific Components)

Create specialized versions of more generic components:

```jsx
// Generic Button component
function Button({ onPress, style, textStyle, children }) {
  return (
    <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
      <Text style={[styles.buttonText, textStyle]}>{children}</Text>
    </TouchableOpacity>
  );
}

// Specialized PrimaryButton component
function PrimaryButton({ onPress, children }) {
  return (
    <Button 
      onPress={onPress} 
      style={styles.primaryButton} 
      textStyle={styles.primaryButtonText}
    >
      {children}
    </Button>
  );
}

// Specialized DangerButton component
function DangerButton({ onPress, children }) {
  return (
    <Button 
      onPress={onPress} 
      style={styles.dangerButton} 
      textStyle={styles.dangerButtonText}
    >
      {children}
    </Button>
  );
}
```

### 2. Containment with Multiple Slots

For components that need multiple distinct "slots" for content:

```jsx
function ProfileCard({ header, footer, children }) {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        {header}
      </View>
      <View style={styles.content}>
        {children}
      </View>
      <View style={styles.footer}>
        {footer}
      </View>
    </View>
  );
}

// Usage
function UserProfile() {
  return (
    <ProfileCard
      header={<ProfileHeader user={user} />}
      footer={<ProfileActions user={user} />}
    >
      <UserDetails user={user} />
    </ProfileCard>
  );
}
```

### 3. Render Props

A technique for sharing code between components using a prop whose value is a function:

```jsx
function Toggler({ render }) {
  const [isOn, setIsOn] = useState(false);
  const toggle = () => setIsOn(!isOn);
  
  return render(isOn, toggle);
}

// Usage
function App() {
  return (
    <Toggler
      render={(isOn, toggle) => (
        <View>
          <Text>The switch is {isOn ? 'ON' : 'OFF'}</Text>
          <Button title="Toggle" onPress={toggle} />
        </View>
      )}
    />
  );
}
```

An alternative and more common syntax uses children as a function:

```jsx
function Toggler({ children }) {
  const [isOn, setIsOn] = useState(false);
  const toggle = () => setIsOn(!isOn);
  
  return children(isOn, toggle);
}

// Usage
function App() {
  return (
    <Toggler>
      {(isOn, toggle) => (
        <View>
          <Text>The switch is {isOn ? 'ON' : 'OFF'}</Text>
          <Button title="Toggle" onPress={toggle} />
        </View>
      )}
    </Toggler>
  );
}
```

> 💡 **Deep Dive**: The render props pattern emerged as a way to share stateful logic between components before hooks were introduced. While hooks have replaced many use cases for render props, this pattern is still valuable for certain scenarios, particularly when the rendering logic needs to be highly customizable.

### 4. Higher-Order Components (HOCs)

HOCs are functions that take a component and return a new, enhanced component:

```jsx
// HOC that adds loading capability to a component
function withLoading(WrappedComponent) {
  return function WithLoading({ isLoading, ...props }) {
    if (isLoading) {
      return <ActivityIndicator size="large" />;
    }
    return <WrappedComponent {...props} />;
  };
}

// Basic component
function UserProfile({ user }) {
  return (
    <View>
      <Text>{user.name}</Text>
      <Text>{user.email}</Text>
    </View>
  );
}

// Enhanced component with loading capability
const UserProfileWithLoading = withLoading(UserProfile);

// Usage
function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);
  
  // Fetch user data...
  
  return <UserProfileWithLoading isLoading={isLoading} user={user} />;
}
```

> 🔍 **Instructor Note**: Higher-Order Components were a common pattern before hooks, but are less frequently seen in modern React codebases. Understanding them is still valuable for working with existing libraries and codebases.

## Props vs. State

A common source of confusion for new React developers is understanding when to use props versus state:

| Props | State |
|-------|-------|
| Received from parent component | Defined within the component |
| Immutable (read-only) | Mutable (can be updated) |
| Used for configuration | Used for internal component data |
| Flow downward from parent to child | Contained within a component or lifted to parent |
| Updated by parent component | Updated by the component itself |

Props are like function parameters, while state is like variables declared within the function.

## Best Practices for Props

1. **Keep prop lists manageable**:
   - If a component has too many props, it may be doing too much and should be split
   - Consider grouping related props into a single object

2. **Use descriptive prop names**:
   - Prefer longer, descriptive names over short, ambiguous ones
   - Consider the component's public API—these names will be used by other developers

3. **Provide sensible defaults**:
   - When appropriate, define default values for optional props
   - This makes components more resilient and easier to use

4. **Validate props**:
   - Use PropTypes or TypeScript to ensure props are of the expected type
   - Document required props and their expected types

5. **Keep components pure with respect to props**:
   - Components should always render the same output for the same props
   - Avoid side effects based on props inside the render phase

> 🚀 **Self-Led Learners**: Review existing components in React Native apps and identify how they use props and component composition. Consider how you might refactor complex components into smaller, more composable pieces.

## Props in React Native vs. Web React

The concept of props is identical between React for the web and React Native, with the main difference being the available component types and their specific props. Common props in React Native include:

- `style`: Used for styling components (similar to `className` in web React)
- `onPress`: For handling press events (similar to `onClick` in web React)
- Platform-specific props like `activeOpacity` for TouchableOpacity

> 🔄 **For Web Developers**: Most of your knowledge about props in web React transfers directly to React Native. The main adjustments are learning the new component types and their specific props.

> 🔄 **For Android/iOS Developers**: Props in React are conceptually similar to:
> - Android: XML attributes for views, or parameters passed to custom views
> - iOS: Properties and initializer parameters for UIViews or SwiftUI views

In the next section, we'll build on our understanding of props by exploring state and hooks, which allow components to manage their own data and respond to user interactions. 

## Practice Exercise: Building a Component Library

### Objective
Create a set of reusable components for a medication tracking app, focusing on proper props usage and component composition patterns.

### Duration
25-30 minutes

### Exercise Description

In this exercise, you'll build a small component library for a medication tracking application. You'll practice passing props between components, implementing prop validation, and using different component composition patterns.

#### Requirements

You'll create the following components:

1. **Button**: A reusable button component with different variants
2. **Card**: A container component that uses the children prop

#### Implementation Steps

##### 1. Button Component

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
}

Button.propTypes = {
  type: PropTypes.oneOf(['primary', 'secondary', 'danger']),
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  onPress: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};
```

##### 2. Card Component

Create a Card component that:
- Accepts `title`, `footer`, and `children` props
- Renders a card with a header (title), content (children), and optional footer
- Uses composition to create a flexible container

```jsx
import PropTypes from 'prop-types';

function Card({ title, footer, children }) {
  // Implement your Card component
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
}

Card.propTypes = {
  title: PropTypes.string,
  footer: PropTypes.node,
  children: PropTypes.node.isRequired,
};
```

### Deliverables

1. Implement the Button and Card components with appropriate props and validation
2. Create examples of component composition using your library

### Bonus Challenges

If you finish early, try implementing these additional components:

1. **Specialized Button Components**: Create PrimaryButton and DangerButton components using composition
2. **MedicationCard**: A specialized component built from Card and Button components to display medication details
3. **Render Props Pattern**: Implement a component that uses the render props pattern

### Tips

- Focus on making your components reusable and generic where appropriate
- Use default prop values to make components easier to use
- Consider which props are required vs. optional
- Think about the component API from the user's perspective
- Follow the principle of "composition over inheritance" 