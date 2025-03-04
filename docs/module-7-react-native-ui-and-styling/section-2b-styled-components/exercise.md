# Exercise: Building a Medication Tracker with Styled Components

## Overview

In this exercise, you'll practice implementing styled-components in a React Native application by building a medication tracking interface. You'll create a theme for a pharmaceutical app, implement dynamically styled components, and apply best practices for component composition.

## Learning Objectives

By completing this exercise, you will be able to:
- Set up and configure styled-components in a React Native project
- Create and implement a theme for consistent styling
- Build reusable, prop-based dynamic components
- Apply styled-components best practices in a pharmaceutical application

## Duration
30 minutes for main challenge, additional time for bonus tasks

## Requirements

### MAIN CHALLENGE (30 minutes)

#### Part 1: Project Setup

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

#### Part 2: Create a Theme

Create a theme file in `/src/styles/theme.js` with the following structure:

```jsx
export const theme = {
  colors: {
    // Primary colors
    primary: '#3498db',
    secondary: '#2ecc71',
    danger: '#e74c3c',
    
    // Text
    text: {
      primary: '#333333',
      secondary: '#666666',
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
    }
  },
  
  spacing: {
    sm: 8,
    md: 16,
    lg: 24,
  },
  
  typography: {
    fontSize: {
      body: 14,
      heading: 20,
    },
    fontWeight: {
      regular: 'normal',
      bold: 'bold',
    }
  },
  
  borderRadius: {
    small: 4,
    medium: 8,
  },
};
```

#### Part 3: Create Base Components

1. Create a `/src/components/styled` directory for your styled components
2. Implement the following base components:

##### Text Components (`/src/components/styled/Typography.js`)

Create a set of text components with different styles:

```jsx
import styled from 'styled-components/native';

export const Typography = {
  Heading: styled.Text`
    font-size: ${props => props.theme.typography.fontSize.heading}px;
    font-weight: ${props => props.theme.typography.fontWeight.bold};
    color: ${props => props.theme.colors.text.primary};
  `,
  
  Body: styled.Text`
    font-size: ${props => props.theme.typography.fontSize.body}px;
    color: ${props => props.theme.colors.text.primary};
  `,
};
```

##### Button Component (`/src/components/styled/Buttons.js`)

Create a basic button:

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
  font-weight: ${props => props.theme.typography.fontWeight.bold};
`;
```

#### Part 4: Create a Simple Medication Card

Create a basic medication card component (`/src/components/MedicationCard.js`):

```jsx
import React from 'react';
import styled from 'styled-components/native';
import { Typography } from './styled/Typography';
import { Button, ButtonText } from './styled/Buttons';

const Card = styled.View`
  background-color: ${props => props.theme.colors.background.card};
  border-radius: ${props => props.theme.borderRadius.medium}px;
  padding: ${props => props.theme.spacing.md}px;
  margin-bottom: ${props => props.theme.spacing.md}px;
`;

const MedicationCard = ({ medication }) => {
  return (
    <Card>
      <Typography.Heading>{medication.name}</Typography.Heading>
      <Typography.Body>{medication.dosage}</Typography.Body>
      <Typography.Body>{medication.schedule}</Typography.Body>
      
      <Button style={{ marginTop: 16 }}>
        <ButtonText>Take Medication</ButtonText>
      </Button>
    </Card>
  );
};

export default MedicationCard;
```

#### Part 5: Create a Simple Home Screen

Create a home screen to display a list of medications (`/src/screens/HomeScreen.js`):

```jsx
import React from 'react';
import { FlatList, SafeAreaView } from 'react-native';
import styled from 'styled-components/native';
import MedicationCard from '../components/MedicationCard';
import { Typography } from '../components/styled/Typography';

const Container = styled.SafeAreaView`
  flex: 1;
  background-color: ${props => props.theme.colors.background.main};
  padding: ${props => props.theme.spacing.md}px;
`;

const Header = styled.View`
  margin-bottom: ${props => props.theme.spacing.lg}px;
`;

const medications = [
  {
    id: '1',
    name: 'Lisinopril',
    dosage: '10mg',
    schedule: 'Once daily',
    status: 'active',
  },
  {
    id: '2',
    name: 'Metformin',
    dosage: '500mg',
    schedule: 'Twice daily',
    status: 'active',
  },
];

const HomeScreen = () => {
  return (
    <Container>
      <Header>
        <Typography.Heading>My Medications</Typography.Heading>
      </Header>
      <FlatList
        data={medications}
        keyExtractor={item => item.id}
        renderItem={({ item }) => <MedicationCard medication={item} />}
      />
    </Container>
  );
};

export default HomeScreen;
```

#### Part 6: Set Up ThemeProvider

Finally, wrap your application with the ThemeProvider in your main App.js file:

```jsx
import React from 'react';
import { ThemeProvider } from 'styled-components/native';
import { theme } from './src/styles/theme';
import HomeScreen from './src/screens/HomeScreen';

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <HomeScreen />
    </ThemeProvider>
  );
};

export default App;
```

### BONUS CHALLENGES (if you finish early)

#### Part 1: Enhanced Theme

Expand your theme with additional properties:

```jsx
export const theme = {
  // ... existing theme properties
  
  // Add the following:
  colors: {
    // ... existing colors
    
    // Medication categories
    painkillers: '#e74c3c',
    antibiotics: '#3498db',
    vitamins: '#2ecc71',
    heart: '#9b59b6',
    allergy: '#f39c12',
    
    // Additional status colors
    status: {
      // ... existing status colors
      warning: '#ffcc00',
      error: '#ff3b30',
      refill: '#5ac8fa',
    }
  },
  
  spacing: {
    // ... existing spacing
    xs: 4,
    xl: 32,
    xxl: 48,
  },
  
  typography: {
    // ... existing typography
    fontSize: {
      // ... existing font sizes
      small: 12,
      subheading: 16,
      title: 24,
    },
    fontWeight: {
      // ... existing font weights
      medium: '500',
    }
  },
  
  borderRadius: {
    // ... existing border radius
    large: 16,
    pill: 999,
  },
};
```

#### Part 2: Enhanced Typography Components

Add more text components:

```jsx
export const Typography = {
  // ... existing components
  
  Title: styled.Text`
    font-size: ${props => props.theme.typography.fontSize.title}px;
    font-weight: ${props => props.theme.typography.fontWeight.bold};
    color: ${props => props.theme.colors.text.primary};
  `,
  
  Subheading: styled.Text`
    font-size: ${props => props.theme.typography.fontSize.subheading}px;
    font-weight: ${props => props.theme.typography.fontWeight.medium};
    color: ${props => props.theme.colors.text.primary};
  `,
  
  Caption: styled.Text`
    font-size: ${props => props.theme.typography.fontSize.small}px;
    color: ${props => props.theme.colors.text.secondary};
  `,
};
```

#### Part 3: Button Variations

Create different button variations:

```jsx
// Primary Button (already defined)
export const PrimaryButton = styled(Button)`
  background-color: ${props => props.theme.colors.primary};
`;

// Secondary Button
export const SecondaryButton = styled(Button)`
  background-color: ${props => props.theme.colors.secondary};
`;

// Danger Button
export const DangerButton = styled(Button)`
  background-color: ${props => props.theme.colors.danger};
`;

// Outline Button
export const OutlineButton = styled(Button)`
  background-color: transparent;
  border: 1px solid ${props => props.theme.colors.primary};
`;

export const OutlineButtonText = styled(ButtonText)`
  color: ${props => props.theme.colors.primary};
`;
```

#### Part 4: Enhanced MedicationCard with StatusBadge

Create a StatusBadge component:

```jsx
// StatusBadge.js
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
  const getStatusText = () => {
    switch(status) {
      case 'active': return 'Active';
      case 'inactive': return 'Inactive';
      case 'warning': return 'Warning';
      case 'refill': return 'Refill Needed';
      default: return 'Unknown';
    }
  };
  
  return (
    <Badge status={status}>
      <BadgeText>{getStatusText()}</BadgeText>
    </Badge>
  );
};

export default StatusBadge;
```

Then enhance the MedicationCard to use it and add category styling:

```jsx
// Enhanced MedicationCard.js
import React from 'react';
import styled from 'styled-components/native';
import { Typography } from './styled/Typography';
import { Button, ButtonText } from './styled/Buttons';
import StatusBadge from './StatusBadge';

const Card = styled.View`
  background-color: ${props => props.theme.colors.background.card};
  border-radius: ${props => props.theme.borderRadius.medium}px;
  padding: ${props => props.theme.spacing.md}px;
  margin-bottom: ${props => props.theme.spacing.md}px;
  
  /* Category styling */
  border-left-width: 4px;
  border-left-color: ${props => {
    switch(props.category) {
      case 'heart': return props.theme.colors.heart;
      case 'painkillers': return props.theme.colors.painkillers;
      case 'antibiotics': return props.theme.colors.antibiotics;
      case 'vitamins': return props.theme.colors.vitamins;
      case 'allergy': return props.theme.colors.allergy;
      default: return props.theme.colors.primary;
    }
  }};
`;

const Header = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${props => props.theme.spacing.sm}px;
`;

const InfoContainer = styled.View`
  margin-bottom: ${props => props.theme.spacing.md}px;
`;

const ActionContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const MedicationCard = ({ medication }) => {
  return (
    <Card category={medication.category}>
      <Header>
        <Typography.Heading>{medication.name}</Typography.Heading>
        <StatusBadge status={medication.status} />
      </Header>
      
      <InfoContainer>
        <Typography.Body>Dosage: {medication.dosage}</Typography.Body>
        <Typography.Body>Schedule: {medication.schedule}</Typography.Body>
      </InfoContainer>
      
      <ActionContainer>
        <Button>
          <ButtonText>Take Medication</ButtonText>
        </Button>
      </ActionContainer>
    </Card>
  );
};

export default MedicationCard;
```

## Final Result

When complete, you should have a styled medication tracker application that:
1. Uses a consistent theme throughout
2. Has reusable styled components
3. Displays a list of medications with proper styling
4. Demonstrates the power of styled-components for creating maintainable UI code

## Submission

Take screenshots of your application showing the styled components in action. Include:
1. The home screen with the medication list
2. (If completed) The different button variations
3. (If completed) The enhanced medication card with status badge

## Helpful Resources

- [styled-components Documentation](https://styled-components.com/docs)
- [styled-components for React Native](https://styled-components.com/docs/basics#react-native)
- [ThemeProvider Documentation](https://styled-components.com/docs/api#themeprovider) 