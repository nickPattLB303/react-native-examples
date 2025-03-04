# Section 2b: Styled Components in React Native

## Learning Objectives

- Understand the concept of CSS-in-JS and its benefits in React Native
- Implement styled-components in React Native applications
- Create reusable, component-based styling systems
- Implement dynamic styling based on props and themes
- Apply styled-components best practices in pharmaceutical applications

## Introduction to Styled Components

Styled Components is a popular CSS-in-JS library that enables you to write actual CSS in your JavaScript to style your components. It's particularly useful in React Native because it offers a more intuitive styling approach that directly ties styles to components.

### What is Styled Components?

Styled Components is a library that uses tagged template literals to attach styles to React/React Native components. Instead of using the `StyleSheet.create()` API, it leverages template literals (backticks) to create components with styles attached to them.

### Installation

```bash
npm install styled-components
# or
yarn add styled-components
```

### Basic Usage

When working with React Native, you'll import from 'styled-components/native' to ensure you're styling React Native components:

```jsx
import styled from 'styled-components/native';

// Create a styled View component
const Container = styled.View`
  flex: 1;
  padding: 16px;
  background-color: #f8f8f8;
`;

// Create a styled Text component
const Title = styled.Text`
  font-size: 24px;
  font-weight: bold;
  color: #333;
  margin-bottom: 16px;
`;

// Use your styled components
const MedicationScreen = () => {
  return (
    <Container>
      <Title>My Medications</Title>
      {/* Other components */}
    </Container>
  );
};
```

## Benefits of Styled Components in React Native

1. **Component-Centric**: Style and component logic stay together in one place, making components more self-contained and reusable.

2. **Dynamic Styling**: Makes it easy to create styles that adapt based on props, which is particularly useful for status indicators and state-based UI in healthcare apps.

3. **Theming Support**: Robust theming capabilities for maintaining consistent colors and styles throughout an app.

4. **Better Organization**: Reduces style object bloat by attaching styles directly to components.

5. **Familiar Syntax**: CSS-like syntax is more familiar for developers transitioning from web development.

## Basic Syntax and Usage

### Creating Styled Components

You can create styled versions of any React Native component:

```jsx
import styled from 'styled-components/native';

// Basic styling for a card
const Card = styled.View`
  background-color: white;
  border-radius: 8px;
  padding: 16px;
  margin-vertical: 8px;
  shadow-color: #000;
  shadow-opacity: 0.1;
  shadow-radius: 4px;
  shadow-offset: 0px 2px;
  elevation: 2;
`;

// Components work together
const MedicationItem = styled.View`
  flex-direction: row;
  align-items: center;
`;

const MedicationImage = styled.Image`
  width: 40px;
  height: 40px;
  border-radius: 20px;
  margin-right: 12px;
`;

const MedicationInfo = styled.View`
  flex: 1;
`;
```

### Available Component Types

You can style any React Native component:

```jsx
const StyledView = styled.View``;
const StyledText = styled.Text``;
const StyledImage = styled.Image``;
const StyledTouchableOpacity = styled.TouchableOpacity``;
const StyledScrollView = styled.ScrollView``;
const StyledTextInput = styled.TextInput``;
const StyledFlatList = styled.FlatList``;
const StyledSafeAreaView = styled.SafeAreaView``;
// etc.
```

## Dynamic Styling with Props

One of the most powerful features of styled-components is the ability to use props to control styling.

### Props-Based Styling

```jsx
// Status indicator that changes color based on status prop
const StatusIndicator = styled.View`
  width: 12px;
  height: 12px;
  border-radius: 6px;
  background-color: ${props => 
    props.status === 'active' ? '#4cd964' :
    props.status === 'inactive' ? '#8e8e93' :
    props.status === 'warning' ? '#ffcc00' : 
    '#ff3b30'
  };
`;

// Usage
<StatusIndicator status="active" />
<StatusIndicator status="warning" />
```

### Extending Styles

You can extend existing styled components to create variations:

```jsx
// Base Button
const Button = styled.TouchableOpacity`
  padding: 12px 16px;
  border-radius: 8px;
  align-items: center;
  justify-content: center;
`;

// Primary Button extends Base Button
const PrimaryButton = styled(Button)`
  background-color: #3498db;
`;

// Secondary Button extends Base Button
const SecondaryButton = styled(Button)`
  background-color: transparent;
  border-width: 1px;
  border-color: #3498db;
`;
```

### Complex Conditional Styling

For pharmaceutical applications, you might need complex styling logic based on medication properties:

```jsx
const MedicationCard = styled.View`
  padding: ${props => props.compact ? '8px' : '16px'};
  background-color: white;
  border-radius: 8px;
  border-left-width: 4px;
  border-left-color: ${props => {
    switch(props.category) {
      case 'painkillers':
        return '#e74c3c';
      case 'antibiotics':
        return '#3498db';
      case 'vitamins':
        return '#2ecc71';
      case 'heart':
        return '#9b59b6';
      default:
        return '#95a5a6';
    }
  }};
  opacity: ${props => props.isExpired ? 0.6 : 1};
  margin-bottom: 12px;
`;

// Usage
<MedicationCard 
  category="antibiotics"
  compact={false}
  isExpired={false}
>
  {/* Card content */}
</MedicationCard>
```

### Helper Functions

Extract complex styling logic into helper functions for better organization:

```jsx
// Helper for medication status colors
const getStatusColor = (status) => {
  const colors = {
    active: '#4cd964',
    inactive: '#8e8e93',
    warning: '#ffcc00',
    error: '#ff3b30',
    refill: '#5ac8fa'
  };
  return colors[status] || colors.inactive;
};

const StatusBadge = styled.View`
  background-color: ${props => getStatusColor(props.status)};
  padding: 4px 8px;
  border-radius: 4px;
`;
```

## Theming with Styled Components

Styled Components provides a powerful theming solution through the ThemeProvider component.

### Theme Provider Setup

```jsx
// App.js
import { ThemeProvider } from 'styled-components/native';

// Define theme object
const theme = {
  colors: {
    primary: '#3498db',
    secondary: '#2ecc71',
    danger: '#e74c3c',
    warning: '#f39c12',
    text: {
      primary: '#333333',
      secondary: '#666666',
      light: '#999999',
    },
    background: {
      main: '#f9f9f9',
      card: '#ffffff',
    }
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
  },
  typography: {
    fontSize: {
      small: 12,
      body: 14,
      subheading: 16,
      heading: 20,
      title: 24,
    },
    fontWeight: {
      regular: 'normal',
      medium: '500',
      bold: 'bold',
    }
  },
  borderRadius: {
    small: 4,
    medium: 8,
    large: 16,
  }
};

// Wrap app with ThemeProvider
export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <AppContent />
    </ThemeProvider>
  );
}
```

### Using Theme in Components

```jsx
// Accessing theme in styled components
const Card = styled.View`
  background-color: ${props => props.theme.colors.background.card};
  padding: ${props => props.theme.spacing.md}px;
  border-radius: ${props => props.theme.borderRadius.medium}px;
  margin-bottom: ${props => props.theme.spacing.md}px;
`;

const Title = styled.Text`
  font-size: ${props => props.theme.typography.fontSize.heading}px;
  font-weight: ${props => props.theme.typography.fontWeight.bold};
  color: ${props => props.theme.colors.text.primary};
  margin-bottom: ${props => props.theme.spacing.sm}px;
`;

const Button = styled.TouchableOpacity`
  background-color: ${props => 
    props.variant === 'secondary' 
      ? props.theme.colors.secondary 
      : props.theme.colors.primary
  };
  padding: ${props => props.theme.spacing.sm}px ${props => props.theme.spacing.md}px;
  border-radius: ${props => props.theme.borderRadius.small}px;
`;
```

## Advanced Techniques

### Styling Existing Components

You can apply styled-components to both third-party components and your own components:

```jsx
// Import a third-party component
import { Calendar } from 'react-native-calendars';

// Style a third-party component
const StyledCalendar = styled(Calendar)`
  border-radius: 8px;
  overflow: hidden;
  margin-vertical: 16px;
`;

// Style your own component
const DosageCounter = ({ count, onIncrement, onDecrement }) => (
  <View>
    <Button onPress={onDecrement}>-</Button>
    <Text>{count}</Text>
    <Button onPress={onIncrement}>+</Button>
  </View>
);

const StyledDosageCounter = styled(DosageCounter)`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 120px;
`;
```

### The attrs Method

Use `attrs` to set default props for your styled components:

```jsx
// Setting default props with attrs
const Input = styled.TextInput.attrs(props => ({
  placeholderTextColor: props.theme.colors.text.light,
  autoCapitalize: 'none',
  autoCorrect: false,
}))`
  height: 48px;
  border-width: 1px;
  border-color: ${props => props.theme.colors.text.light};
  border-radius: ${props => props.theme.borderRadius.medium}px;
  padding-horizontal: ${props => props.theme.spacing.md}px;
  font-size: ${props => props.theme.typography.fontSize.body}px;
  color: ${props => props.theme.colors.text.primary};
`;
```

### Global Style Components

Create reusable style components for typography and other common elements:

```jsx
// Creating global style components
export const Typography = {
  Title: styled.Text`
    font-size: ${props => props.theme.typography.fontSize.title}px;
    font-weight: ${props => props.theme.typography.fontWeight.bold};
    color: ${props => props.theme.colors.text.primary};
  `,
  Heading: styled.Text`
    font-size: ${props => props.theme.typography.fontSize.heading}px;
    font-weight: ${props => props.theme.typography.fontWeight.bold};
    color: ${props => props.theme.colors.text.primary};
  `,
  Subheading: styled.Text`
    font-size: ${props => props.theme.typography.fontSize.subheading}px;
    font-weight: ${props => props.theme.typography.fontWeight.medium};
    color: ${props => props.theme.colors.text.primary};
  `,
  Body: styled.Text`
    font-size: ${props => props.theme.typography.fontSize.body}px;
    color: ${props => props.theme.colors.text.primary};
  `,
  Caption: styled.Text`
    font-size: ${props => props.theme.typography.fontSize.small}px;
    color: ${props => props.theme.colors.text.secondary};
  `,
};

// Usage
const MedicationDetail = () => (
  <Container>
    <Typography.Title>Lisinopril</Typography.Title>
    <Typography.Subheading>10mg Tablet</Typography.Subheading>
    <Typography.Body>
      Take one tablet daily with or without food.
    </Typography.Body>
    <Typography.Caption>
      Last refilled: June 15, 2023
    </Typography.Caption>
  </Container>
);
```

## Styled Components vs StyleSheet API

### Styled Components Advantages

- **Component Focus**: Styles tied directly to components
- **CSS-like Syntax**: More familiar for web developers
- **Theming**: Powerful theming with context
- **Dynamic Styling**: Easier prop-based styling
- **Organization**: Better separation of styled components
- **Composition**: Easy to extend existing components

### StyleSheet API Advantages

- **Built-in**: No additional dependencies
- **Performance**: Potentially better for simpler apps
- **TypeScript Support**: Better type checking for styles
- **Community Examples**: More documentation examples
- **Simplicity**: Less abstraction for beginners

### When to Choose Styled Components

- Working with a team familiar with CSS-in-JS
- Building larger applications with complex UI
- Need for robust theming capabilities
- Heavy use of dynamic, prop-based styling
- Preference for component-based architecture

### When to Choose StyleSheet API

- Simple applications with basic styling needs
- Concern about bundle size and dependencies
- Maximum performance is a priority
- Strong preference for TypeScript style definitions
- Following official React Native documentation closely

> **Note**: Many teams use a hybrid approach: StyleSheet API for simple components and styled-components for more complex UI elements with dynamic styling needs.

## Best Practices

### Code Organization

- **File Structure**: Create separate files for complex styled components
- **Component Position**: Define styled components after main component or in separate files
- **Theme Organization**: Keep theme definitions in a central file
- **Naming Convention**: Use clear, descriptive component names

### Performance

- **Component Definition**: Keep styled components outside render functions
- **Props**: Avoid unnecessary prop computations
- **Memoization**: Use React.memo for pure styled components
- **Theme Access**: Avoid deep theme object access in hot paths

### Component Design

- **Granularity**: Create small, reusable components
- **Composition**: Favor composition over complex styling logic
- **Inheritance**: Use styled(Component) for component variations
- **Abstraction**: Create abstract components for consistent UI

### For Pharmaceutical Apps

- **Consistency**: Use ThemeProvider for consistent medical styling
- **Accessibility**: Include proper contrast in theme colors
- **Color Coding**: Use consistent medication status colors
- **Information Hierarchy**: Style critical info prominently
- **Error States**: Clear visual feedback for warnings

## Complete Example: Medication Detail Screen

Here's a comprehensive example showcasing styled-components in a pharmaceutical application:

```jsx
import React from 'react';
import styled from 'styled-components/native';
import { ThemeProvider } from 'styled-components/native';

// Theme definition
const theme = {
  colors: {
    primary: '#3498db',
    background: '#f9f9f9',
    card: '#ffffff',
    text: '#333333',
    textSecondary: '#666666',
    border: '#e1e1e1',
    success: '#2ecc71',
    danger: '#e74c3c',
    warning: '#f39c12',
  },
  spacing: {
    sm: 8,
    md: 16,
    lg: 24,
  },
};

// Styled components
const Container = styled.SafeAreaView`
  flex: 1;
  background-color: ${props => props.theme.colors.background};
`;

const ScrollContainer = styled.ScrollView`
  flex: 1;
  padding: ${props => props.theme.spacing.md}px;
`;

const Card = styled.View`
  background-color: ${props => props.theme.colors.card};
  border-radius: 12px;
  padding: ${props => props.theme.spacing.md}px;
  margin-bottom: ${props => props.theme.spacing.md}px;
  shadow-color: #000;
  shadow-opacity: 0.1;
  shadow-radius: 4px;
  shadow-offset: 0px 2px;
  elevation: 2;
`;

const Header = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: ${props => props.theme.spacing.md}px;
`;

const MedicationImage = styled.Image`
  width: 60px;
  height: 60px;
  border-radius: 30px;
  margin-right: ${props => props.theme.spacing.md}px;
`;

const HeaderContent = styled.View`
  flex: 1;
`;

const Title = styled.Text`
  font-size: 20px;
  font-weight: bold;
  color: ${props => props.theme.colors.text};
  margin-bottom: 4px;
`;

const Subtitle = styled.Text`
  font-size: 16px;
  color: ${props => props.theme.colors.textSecondary};
`;

const InfoRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  border-bottom-width: 1px;
  border-bottom-color: ${props => props.theme.colors.border};
  padding-vertical: ${props => props.theme.spacing.sm}px;
`;

const InfoLabel = styled.Text`
  font-size: 14px;
  color: ${props => props.theme.colors.textSecondary};
  font-weight: 500;
`;

const InfoValue = styled.Text`
  font-size: 14px;
  color: ${props => props.theme.colors.text};
`;

const Button = styled.TouchableOpacity`
  background-color: ${props => props.variant === 'danger' 
    ? props.theme.colors.danger 
    : props.theme.colors.primary
  };
  padding: ${props => props.theme.spacing.md}px;
  border-radius: 8px;
  align-items: center;
  margin-top: ${props => props.theme.spacing.md}px;
`;

const ButtonText = styled.Text`
  color: white;
  font-size: 16px;
  font-weight: 500;
`;

const StatusBadge = styled.View`
  background-color: ${props => 
    props.status === 'active' ? props.theme.colors.success :
    props.status === 'refill' ? props.theme.colors.warning :
    props.theme.colors.danger
  };
  padding: 4px 8px;
  border-radius: 4px;
  align-self: flex-start;
`;

const StatusText = styled.Text`
  color: white;
  font-size: 12px;
  font-weight: 500;
`;

// Main component
const MedicationDetailScreen = ({ medication }) => {
  // Example medication data
  const med = medication || {
    name: 'Metformin',
    dosage: '500mg',
    type: 'Tablet',
    schedule: 'Twice daily with meals',
    refills: 3,
    status: 'active',
    prescriber: 'Dr. Sarah Johnson',
    pharmacy: 'MedPlus Pharmacy',
    expiry: '12/31/2023',
    image: 'https://example.com/medication-image.jpg',
  };

  return (
    <ThemeProvider theme={theme}>
      <Container>
        <ScrollContainer>
          <Card>
            <Header>
              <MedicationImage 
                source={{ uri: med.image }}
                defaultSource={require('./assets/pill-placeholder.png')}
              />
              <HeaderContent>
                <Title>{med.name}</Title>
                <Subtitle>{med.dosage} {med.type}</Subtitle>
                <StatusBadge status={med.status}>
                  <StatusText>
                    {med.status === 'active' ? 'Active' : 
                     med.status === 'refill' ? 'Needs Refill' : 
                     'Expired'}
                  </StatusText>
                </StatusBadge>
              </HeaderContent>
            </Header>
            
            <InfoRow>
              <InfoLabel>Schedule</InfoLabel>
              <InfoValue>{med.schedule}</InfoValue>
            </InfoRow>
            
            <InfoRow>
              <InfoLabel>Refills Remaining</InfoLabel>
              <InfoValue>{med.refills}</InfoValue>
            </InfoRow>
            
            <InfoRow>
              <InfoLabel>Prescriber</InfoLabel>
              <InfoValue>{med.prescriber}</InfoValue>
            </InfoRow>
            
            <InfoRow>
              <InfoLabel>Pharmacy</InfoLabel>
              <InfoValue>{med.pharmacy}</InfoValue>
            </InfoRow>
            
            <InfoRow>
              <InfoLabel>Expiration</InfoLabel>
              <InfoValue>{med.expiry}</InfoValue>
            </InfoRow>
            
            <Button>
              <ButtonText>Take Medication</ButtonText>
            </Button>
            
            <Button variant="danger">
              <ButtonText>Request Refill</ButtonText>
            </Button>
          </Card>
        </ScrollContainer>
      </Container>
    </ThemeProvider>
  );
};

export default MedicationDetailScreen;
```

## Exercise: Medication UI with Styled Components

In this exercise, you'll build a medication tracking UI using styled-components.

### Requirements:

1. Set up a React Native project with styled-components
2. Create a theme with appropriate colors for a pharmaceutical app
3. Build a medication card component using styled-components
4. Implement dynamic styling based on medication status
5. Create a medication list with proper spacing and layout

### Getting Started:

1. Create a new React Native project using Expo or React Native CLI
2. Install styled-components:
   ```bash
   npm install styled-components
   ```
3. Create your theme file with medication-related colors
4. Implement the components using the techniques learned in this section

## Further Resources

- [Styled Components Official Documentation](https://styled-components.com/)
- [Styled Components with React Native](https://styled-components.com/docs/basics#react-native)
- [Theming with Styled Components](https://styled-components.com/docs/advanced#theming)
- [TypeScript with Styled Components](https://styled-components.com/docs/api#typescript)

---

This section provided an overview of styled-components in React Native, focusing on its application in pharmaceutical interfaces where dynamic styling and visual hierarchy are particularly important. In the next section, we'll explore how to create flexible layouts using Flexbox. 