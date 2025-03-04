# Exercise: Building a Medication Tracker with Styled Components

## Overview

In this exercise, you'll practice implementing styled-components in a React Native application by building a medication tracking interface. You'll create a theme for a pharmaceutical app, implement dynamically styled components, and apply best practices for component composition.

## Learning Objectives

By completing this exercise, you will be able to:
- Set up and configure styled-components in a React Native project
- Create and implement a theme for consistent styling
- Build reusable, prop-based dynamic components
- Apply styled-components best practices in a pharmaceutical application

## Requirements

### Part 1: Project Setup

1. Create a new React Native project using Expo or React Native CLI
2. Install styled-components:
   ```bash
   npm install styled-components
   # or with yarn
   yarn add styled-components
   ```
3. Create a basic directory structure for your components:
   ```
   /src
     /components
     /styles
     /screens
   ```

### Part 2: Create a Theme

Create a theme file in `/src/styles/theme.js` with the following structure:

```jsx
export const theme = {
  colors: {
    // Primary colors
    primary: '#3498db',
    secondary: '#2ecc71',
    danger: '#e74c3c',
    warning: '#f39c12',
    
    // Medication categories
    painkillers: '#e74c3c',
    antibiotics: '#3498db',
    vitamins: '#2ecc71',
    heart: '#9b59b6',
    allergy: '#f39c12',
    
    // Text
    text: {
      primary: '#333333',
      secondary: '#666666',
      light: '#999999',
    },
    
    // Backgrounds
    background: {
      main: '#f9f9f9',
      card: '#ffffff',
    },
    
    // Status colors
    status: {
      active: '#4cd964',
      inactive: '#8e8e93',
      warning: '#ffcc00',
      error: '#ff3b30',
      refill: '#5ac8fa',
    }
  },
  
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48,
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
    pill: 999,
  },
  
  // Add any other theme properties you think would be useful
};
```

### Part 3: Create Base Components

1. Create a `/src/components/styled` directory for your styled components
2. Implement the following base components:

#### Text Components (`/src/components/styled/Typography.js`)

Create a set of text components with different styles:

```jsx
import styled from 'styled-components/native';

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
```

#### Button Components (`/src/components/styled/Buttons.js`)

Create different types of buttons:

```jsx
import styled from 'styled-components/native';

// Base Button
export const Button = styled.TouchableOpacity`
  padding: ${props => props.theme.spacing.md}px;
  border-radius: ${props => props.theme.borderRadius.medium}px;
  align-items: center;
  justify-content: center;
  background-color: ${props => props.theme.colors.primary};
`;

export const ButtonText = styled.Text`
  color: white;
  font-size: ${props => props.theme.typography.fontSize.body}px;
  font-weight: ${props => props.theme.typography.fontWeight.medium};
`;

// Implement variations of Button (PrimaryButton, SecondaryButton, DangerButton)
// and add any other button styles you think would be useful
```

### Part 4: Build Medication Components

Create the following medication-related components:

#### Status Badge Component (`/src/components/StatusBadge.js`)

```jsx
import React from 'react';
import styled from 'styled-components/native';

const Badge = styled.View`
  background-color: ${props => 
    props.status === 'active' ? props.theme.colors.status.active :
    props.status === 'inactive' ? props.theme.colors.status.inactive :
    props.status === 'warning' ? props.theme.colors.status.warning :
    props.status === 'refill' ? props.theme.colors.status.refill :
    props.theme.colors.status.error
  };
  padding: ${props => props.theme.spacing.xs}px ${props => props.theme.spacing.sm}px;
  border-radius: ${props => props.theme.borderRadius.pill}px;
  align-self: flex-start;
`;

const BadgeText = styled.Text`
  color: white;
  font-size: ${props => props.theme.typography.fontSize.small}px;
  font-weight: ${props => props.theme.typography.fontWeight.medium};
`;

const StatusBadge = ({ status }) => {
  // Implement a component that displays different text based on status
  // For example: "Active", "Inactive", "Refill Needed", etc.
  return (
    <Badge status={status}>
      <BadgeText>
        {/* Add code to display appropriate text based on status */}
      </BadgeText>
    </Badge>
  );
};

export default StatusBadge;
```

#### Medication Card Component (`/src/components/MedicationCard.js`)

```jsx
import React from 'react';
import styled from 'styled-components/native';
import { Typography } from './styled/Typography';
import StatusBadge from './StatusBadge';

// Implement a styled medication card component 
// It should:
// 1. Accept props for medication name, dosage, category, status, etc.
// 2. Use conditional styling based on the medication category
// 3. Include the StatusBadge component
// 4. Have a take/skip medication button

// Example styled components you might need:
const Card = styled.View`
  background-color: ${props => props.theme.colors.background.card};
  border-radius: ${props => props.theme.borderRadius.medium}px;
  padding: ${props => props.theme.spacing.md}px;
  margin-bottom: ${props => props.theme.spacing.md}px;
  
  /* Add conditional styling based on category, e.g., a colored left border */
  border-left-width: 4px;
  border-left-color: ${props => {
    // Implement color selection based on the category prop
  }};
  
  /* Add shadows for iOS and elevation for Android */
  shadow-color: #000;
  shadow-opacity: 0.1;
  shadow-radius: 4px;
  shadow-offset: 0px 2px;
  elevation: 2;
`;

// Implement the rest of the component with proper structure
```

### Part 5: Create a Medication List Screen

Create a screen that displays a list of medications using your styled components:

```jsx
import React from 'react';
import { FlatList } from 'react-native';
import styled from 'styled-components/native';
import { ThemeProvider } from 'styled-components/native';
import { theme } from '../styles/theme';
import MedicationCard from '../components/MedicationCard';
import { Typography } from '../components/styled/Typography';

// Create styled components for the screen
const Container = styled.SafeAreaView`
  flex: 1;
  background-color: ${props => props.theme.colors.background.main};
`;

const Header = styled.View`
  padding: ${props => props.theme.spacing.md}px;
  border-bottom-width: 1px;
  border-bottom-color: #eee;
`;

const Content = styled.View`
  flex: 1;
  padding: ${props => props.theme.spacing.md}px;
`;

// Sample medication data
const medications = [
  {
    id: '1',
    name: 'Lisinopril',
    dosage: '10mg',
    category: 'heart',
    status: 'active',
    schedule: 'Once daily',
    timeOfDay: 'Morning',
  },
  {
    id: '2',
    name: 'Ibuprofen',
    dosage: '400mg',
    category: 'painkillers',
    status: 'inactive',
    schedule: 'As needed',
    timeOfDay: 'Any',
  },
  {
    id: '3',
    name: 'Amoxicillin',
    dosage: '500mg',
    category: 'antibiotics',
    status: 'active',
    schedule: 'Three times daily',
    timeOfDay: 'Morning, Afternoon, Evening',
  },
  {
    id: '4',
    name: 'Vitamin D',
    dosage: '1000 IU',
    category: 'vitamins',
    status: 'refill',
    schedule: 'Once daily',
    timeOfDay: 'Morning',
  },
  // Add more medications if you wish
];

const MedicationsScreen = () => {
  return (
    <ThemeProvider theme={theme}>
      <Container>
        <Header>
          <Typography.Title>My Medications</Typography.Title>
        </Header>
        <Content>
          <FlatList
            data={medications}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
              <MedicationCard 
                name={item.name}
                dosage={item.dosage}
                category={item.category}
                status={item.status}
                schedule={item.schedule}
                timeOfDay={item.timeOfDay}
                onPress={() => console.log(`Pressed ${item.name}`)}
                onTakeMedication={() => console.log(`Take ${item.name}`)}
              />
            )}
          />
        </Content>
      </Container>
    </ThemeProvider>
  );
};

export default MedicationsScreen;
```

### Part 6: Bonus Challenges

If you complete the above requirements, try implementing some bonus features:

1. **Theme Switching**: Add light and dark themes and a toggle to switch between them
2. **Responsive Sizing**: Make your components adjust their size based on screen dimensions
3. **Animation**: Add a simple animation (e.g., scale) to cards when pressed using the Animated API
4. **Improved MedicationCard**: Add more functionality to the MedicationCard (e.g., expandable details, time indicators)
5. **Filter Controls**: Create styled filter buttons to filter medications by category or status

## Submission Guidelines

1. Make sure your code is well-organized and follows best practices
2. Test your application on both iOS and Android simulators if possible
3. Take screenshots of your completed UI
4. Submit your code along with the screenshots

## Evaluation Criteria

Your solution will be evaluated based on:
1. Correct implementation of styled-components
2. Proper use of theming
3. Implementation of dynamic styling based on props
4. Code organization and best practices
5. UI design and attention to detail

## Resources

- [Styled Components Documentation](https://styled-components.com/docs)
- [React Native Style Guide](https://github.com/airbnb/javascript/tree/master/react)
- [React Native Layout Props](https://reactnative.dev/docs/layout-props)

Good luck with your styled-components implementation! 