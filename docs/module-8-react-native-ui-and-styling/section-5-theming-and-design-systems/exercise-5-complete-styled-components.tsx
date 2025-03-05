/**
 * @fileoverview Exercise 5: Theming and Design Systems Complete with Styled Components
 * @author React Native Training Course
 * @created 2023-05-01
 */

import React, { createContext, useContext, useState } from 'react';
import { 
  ScrollView, 
  StatusBar,
  useColorScheme,
  TouchableOpacity
} from 'react-native';
import styled, { ThemeProvider as StyledThemeProvider } from 'styled-components/native';

// Define theme types
type ThemeType = 'light' | 'dark' | 'high-contrast';

// Define colors for each theme
interface ThemeColors {
  primary: string;
  secondary: string;
  background: string;
  card: string;
  text: {
    primary: string;
    secondary: string;
    accent: string;
    warning: string;
  };
  border: string;
}

// Define typography for the theme
interface ThemeTypography {
  fontSizes: {
    small: number;
    medium: number;
    large: number;
    xlarge: number;
  };
  fontWeights: {
    regular: string;
    medium: string;
    bold: string;
  };
  lineHeights: {
    small: number;
    medium: number;
    large: number;
  };
}

// Define spacing for the theme
interface ThemeSpacing {
  xs: number;
  s: number;
  m: number;
  l: number;
  xl: number;
}

// Complete theme interface
interface Theme {
  type: ThemeType;
  colors: ThemeColors;
  typography: ThemeTypography;
  spacing: ThemeSpacing;
}

// Define themes
const lightTheme: Theme = {
  type: 'light',
  colors: {
    primary: '#4A90E2',
    secondary: '#5AC8FA',
    background: '#F7F7F7',
    card: '#FFFFFF',
    text: {
      primary: '#333333',
      secondary: '#666666',
      accent: '#4A90E2',
      warning: '#E53935',
    },
    border: '#EEEEEE',
  },
  typography: {
    fontSizes: {
      small: 14,
      medium: 16,
      large: 20,
      xlarge: 24,
    },
    fontWeights: {
      regular: 'normal',
      medium: '500',
      bold: 'bold',
    },
    lineHeights: {
      small: 20,
      medium: 24,
      large: 28,
    },
  },
  spacing: {
    xs: 4,
    s: 8,
    m: 16,
    l: 24,
    xl: 32,
  },
};

const darkTheme: Theme = {
  type: 'dark',
  colors: {
    primary: '#5AC8FA',
    secondary: '#4A90E2',
    background: '#121212',
    card: '#1E1E1E',
    text: {
      primary: '#FFFFFF',
      secondary: '#AAAAAA',
      accent: '#5AC8FA',
      warning: '#FF6B6B',
    },
    border: '#333333',
  },
  typography: {
    fontSizes: {
      small: 14,
      medium: 16,
      large: 20,
      xlarge: 24,
    },
    fontWeights: {
      regular: 'normal',
      medium: '500',
      bold: 'bold',
    },
    lineHeights: {
      small: 20,
      medium: 24,
      large: 28,
    },
  },
  spacing: {
    xs: 4,
    s: 8,
    m: 16,
    l: 24,
    xl: 32,
  },
};

const highContrastTheme: Theme = {
  type: 'high-contrast',
  colors: {
    primary: '#FFD700', // Gold
    secondary: '#FFFFFF',
    background: '#000000',
    card: '#121212',
    text: {
      primary: '#FFFFFF',
      secondary: '#FFFFFF',
      accent: '#FFD700', // Gold
      warning: '#FF0000', // Pure Red
    },
    border: '#FFFFFF',
  },
  typography: {
    fontSizes: {
      small: 16, // Slightly larger for readability
      medium: 18,
      large: 22,
      xlarge: 26,
    },
    fontWeights: {
      regular: 'normal',
      medium: '500',
      bold: 'bold',
    },
    lineHeights: {
      small: 24,
      medium: 28,
      large: 32,
    },
  },
  spacing: {
    xs: 4,
    s: 8,
    m: 16,
    l: 24,
    xl: 32,
  },
};

// Create the theme context
interface ThemeContextType {
  theme: Theme;
  setTheme: (type: ThemeType) => void;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: lightTheme,
  setTheme: () => {},
});

// Create a theme provider component
const AppThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const deviceTheme = useColorScheme();
  const [themeType, setThemeType] = useState<ThemeType>(
    deviceTheme === 'dark' ? 'dark' : 'light'
  );

  // Get the active theme based on the selected theme type
  const getTheme = (): Theme => {
    switch (themeType) {
      case 'dark':
        return darkTheme;
      case 'high-contrast':
        return highContrastTheme;
      default:
        return lightTheme;
    }
  };

  const theme = getTheme();

  // Function to change theme
  const setTheme = (type: ThemeType) => {
    setThemeType(type);
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <StyledThemeProvider theme={theme}>
        {children}
      </StyledThemeProvider>
    </ThemeContext.Provider>
  );
};

// Create a hook to access the theme
const useAppTheme = () => useContext(ThemeContext);

// Styled components
const Container = styled.SafeAreaView`
  flex: 1;
  background-color: ${props => props.theme.colors.background};
  padding-top: ${StatusBar.currentHeight || 0}px;
`;

const Header = styled.View`
  background-color: ${props => props.theme.colors.primary};
  padding: ${props => props.theme.spacing.m}px;
  padding-top: 60px;
`;

const Title = styled.Text`
  color: ${props => props.theme.type === 'high-contrast' ? props.theme.colors.background : 'white'};
  font-size: ${props => props.theme.typography.fontSizes.xlarge}px;
  font-weight: ${props => props.theme.typography.fontWeights.bold};
`;

const Content = styled.ScrollView`
  flex: 1;
  padding: ${props => props.theme.spacing.m}px;
`;

const Card = styled.View`
  background-color: ${props => props.theme.colors.card};
  padding: ${props => props.theme.spacing.m}px;
  margin-bottom: ${props => props.theme.spacing.m}px;
  border-radius: ${props => props.theme.spacing.s}px;
  shadow-color: ${props => props.theme.type === 'dark' ? '#000' : '#888'};
  shadow-offset: 0px 2px;
  shadow-opacity: 0.1;
  shadow-radius: 4px;
  elevation: 2;
  border-width: ${props => props.theme.type === 'high-contrast' ? 1 : 0}px;
  border-color: ${props => props.theme.colors.border};
`;

const CardTitle = styled.Text`
  font-size: ${props => props.theme.typography.fontSizes.large}px;
  font-weight: ${props => props.theme.typography.fontWeights.bold};
  color: ${props => props.theme.colors.text.primary};
  margin-bottom: ${props => props.theme.spacing.s}px;
`;

const CardSubtitle = styled.Text`
  font-size: ${props => props.theme.typography.fontSizes.medium}px;
  color: ${props => props.theme.colors.text.secondary};
  margin-bottom: ${props => props.theme.spacing.m}px;
`;

const Label = styled.Text`
  font-size: ${props => props.theme.typography.fontSizes.medium}px;
  font-weight: ${props => props.theme.typography.fontWeights.bold};
  color: ${props => props.theme.colors.text.primary};
  margin-top: ${props => props.theme.spacing.s}px;
  margin-bottom: ${props => props.theme.spacing.xs}px;
`;

const Text = styled.Text`
  font-size: ${props => props.theme.typography.fontSizes.small}px;
  line-height: ${props => props.theme.typography.lineHeights.small}px;
  color: ${props => props.theme.colors.text.secondary};
  margin-bottom: ${props => props.theme.spacing.xs}px;
`;

const WarningText = styled.Text`
  font-size: ${props => props.theme.typography.fontSizes.small}px;
  line-height: ${props => props.theme.typography.lineHeights.small}px;
  color: ${props => props.theme.colors.text.warning};
  margin-bottom: ${props => props.theme.spacing.s}px;
`;

const ScheduleItem = styled.View`
  flex-direction: row;
  padding-bottom: ${props => props.theme.spacing.s}px;
  margin-top: ${props => props.theme.spacing.s}px;
  border-bottom-width: ${props => props.isLast ? 0 : 1}px;
  border-bottom-color: ${props => props.theme.colors.border};
`;

const ScheduleTime = styled.Text`
  font-size: ${props => props.theme.typography.fontSizes.small}px;
  font-weight: ${props => props.theme.typography.fontWeights.bold};
  width: 80px;
  color: ${props => props.theme.colors.text.accent};
`;

const ScheduleText = styled.Text`
  font-size: ${props => props.theme.typography.fontSizes.small}px;
  flex: 1;
  color: ${props => props.theme.colors.text.secondary};
`;

const Button = styled.TouchableOpacity`
  background-color: ${props => props.theme.colors.primary};
  padding: ${props => props.theme.spacing.m}px;
  border-radius: ${props => props.theme.spacing.xs}px;
  align-items: center;
  margin-top: ${props => props.theme.spacing.s}px;
`;

const ButtonText = styled.Text`
  color: ${props => props.theme.type === 'high-contrast' ? props.theme.colors.background : 'white'};
  font-weight: ${props => props.theme.typography.fontWeights.bold};
  font-size: ${props => props.theme.typography.fontSizes.medium}px;
`;

const ThemeButtonRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

const ThemeButton = styled.TouchableOpacity<{ isActive: boolean }>`
  background-color: ${props => props.isActive ? props.theme.colors.primary : '#CCCCCC'};
  padding: ${props => props.theme.spacing.s}px;
  border-radius: ${props => props.theme.spacing.xs}px;
  flex: 1;
  margin-right: ${props => props.isLast ? 0 : props.theme.spacing.s}px;
  align-items: center;
`;

const ThemeButtonText = styled.Text`
  color: white;
  font-weight: ${props => props.theme.typography.fontWeights.bold};
`;

/**
 * Medication detail screen with theming using styled-components
 * @returns {React.ReactElement} Medication detail component
 */
function MedicationDetail() {
  const { theme, setTheme } = useAppTheme();
  
  return (
    <Container>
      <StatusBar 
        barStyle={theme.type === 'light' ? 'dark-content' : 'light-content'} 
        backgroundColor={theme.colors.primary} 
      />
      
      <Header>
        <Title>Medication Details</Title>
      </Header>
      
      <Content>
        <Card>
          <CardTitle>Amoxicillin</CardTitle>
          <CardSubtitle>500mg tablet</CardSubtitle>
          <Label>Description:</Label>
          <Text>
            Amoxicillin is a penicillin antibiotic that fights bacteria. It is used to treat many different types of infection.
          </Text>
          
          <Label>Dosage:</Label>
          <Text>Take 1 tablet (500mg) 3 times a day for 10 days.</Text>
          
          <Label>Side Effects:</Label>
          <Text>
            - Diarrhea
            - Rash
            - Nausea
            - Vomiting
          </Text>
        </Card>
        
        <Card>
          <CardTitle>Schedule</CardTitle>
          <ScheduleItem>
            <ScheduleTime>8:00 AM</ScheduleTime>
            <ScheduleText>Take 1 tablet with breakfast</ScheduleText>
          </ScheduleItem>
          <ScheduleItem>
            <ScheduleTime>4:00 PM</ScheduleTime>
            <ScheduleText>Take 1 tablet in the afternoon</ScheduleText>
          </ScheduleItem>
          <ScheduleItem isLast>
            <ScheduleTime>12:00 AM</ScheduleTime>
            <ScheduleText>Take 1 tablet before bed</ScheduleText>
          </ScheduleItem>
        </Card>
        
        <Card>
          <CardTitle>Refill Information</CardTitle>
          <Text>Prescription #: RX7281904</Text>
          <Text>Refills Remaining: 2</Text>
          <Text>Pharmacy: MedPlus Pharmacy</Text>
          <Text>Phone: (555) 123-4567</Text>
          
          <Button>
            <ButtonText>Request Refill</ButtonText>
          </Button>
        </Card>
        
        <Card>
          <CardTitle>Warnings</CardTitle>
          <WarningText>
            Do not use this medication if you are allergic to penicillin antibiotics.
          </WarningText>
          <WarningText>
            Tell your doctor if you have kidney disease or a history of diarrhea.
          </WarningText>
        </Card>
        
        {/* Theme Switcher */}
        <Card>
          <CardTitle>Theme Settings</CardTitle>
          
          <ThemeButtonRow>
            <ThemeButton 
              isActive={theme.type === 'light'} 
              onPress={() => setTheme('light')}
            >
              <ThemeButtonText>Light</ThemeButtonText>
            </ThemeButton>
            
            <ThemeButton 
              isActive={theme.type === 'dark'} 
              onPress={() => setTheme('dark')}
            >
              <ThemeButtonText>Dark</ThemeButtonText>
            </ThemeButton>
            
            <ThemeButton 
              isActive={theme.type === 'high-contrast'} 
              onPress={() => setTheme('high-contrast')}
              isLast
            >
              <ThemeButtonText>High Contrast</ThemeButtonText>
            </ThemeButton>
          </ThemeButtonRow>
        </Card>
      </Content>
    </Container>
  );
}

/**
 * App component that wraps MedicationDetail with ThemeProvider
 * @returns {React.ReactElement} App component
 */
export function App() {
  return (
    <AppThemeProvider>
      <MedicationDetail />
    </AppThemeProvider>
  );
} 