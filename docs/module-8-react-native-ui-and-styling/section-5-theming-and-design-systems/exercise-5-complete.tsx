/**
 * @fileoverview Exercise 5: Theming and Design Systems Complete
 * @author React Native Training Course
 * @created 2023-05-01
 */

import React, { createContext, useContext, useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  SafeAreaView,
  StatusBar,
  useColorScheme
} from 'react-native';

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
const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
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
      {children}
    </ThemeContext.Provider>
  );
};

// Create a hook to access the theme
const useTheme = () => useContext(ThemeContext);

/**
 * Medication detail screen with theming
 * @returns {React.ReactElement} Medication detail component
 */
function MedicationDetail() {
  const { theme, setTheme } = useTheme();
  
  return (
    <SafeAreaView style={{ 
      flex: 1, 
      backgroundColor: theme.colors.background,
      paddingTop: StatusBar.currentHeight,
    }}>
      <StatusBar 
        barStyle={theme.type === 'light' ? 'dark-content' : 'light-content'} 
        backgroundColor={theme.colors.primary} 
      />
      
      <View style={[
        styles.header, 
        { backgroundColor: theme.colors.primary, padding: theme.spacing.m }
      ]}>
        <Text style={[
          styles.title, 
          { 
            color: theme.type === 'high-contrast' ? theme.colors.background : 'white',
            fontSize: theme.typography.fontSizes.xlarge,
            fontWeight: theme.typography.fontWeights.bold,
          }
        ]}>
          Medication Details
        </Text>
      </View>
      
      <ScrollView style={[styles.content, { padding: theme.spacing.m }]}>
        <View style={[
          styles.card, 
          { 
            backgroundColor: theme.colors.card, 
            padding: theme.spacing.m,
            marginBottom: theme.spacing.m,
            borderRadius: theme.spacing.s,
            shadowColor: theme.type === 'dark' ? '#000' : '#888',
            borderWidth: theme.type === 'high-contrast' ? 1 : 0,
            borderColor: theme.colors.border
          }
        ]}>
          <Text style={{ 
            fontSize: theme.typography.fontSizes.large,
            fontWeight: theme.typography.fontWeights.bold,
            color: theme.colors.text.primary,
            marginBottom: theme.spacing.s,
          }}>
            Amoxicillin
          </Text>
          <Text style={{ 
            fontSize: theme.typography.fontSizes.medium,
            color: theme.colors.text.secondary,
            marginBottom: theme.spacing.m,
          }}>
            500mg tablet
          </Text>
          <Text style={{ 
            fontSize: theme.typography.fontSizes.medium,
            fontWeight: theme.typography.fontWeights.bold,
            color: theme.colors.text.primary,
            marginTop: theme.spacing.s,
            marginBottom: theme.spacing.xs,
          }}>
            Description:
          </Text>
          <Text style={{ 
            fontSize: theme.typography.fontSizes.small,
            lineHeight: theme.typography.lineHeights.small,
            color: theme.colors.text.secondary,
            marginBottom: theme.spacing.xs,
          }}>
            Amoxicillin is a penicillin antibiotic that fights bacteria. It is used to treat many different types of infection.
          </Text>
          
          <Text style={{ 
            fontSize: theme.typography.fontSizes.medium,
            fontWeight: theme.typography.fontWeights.bold,
            color: theme.colors.text.primary,
            marginTop: theme.spacing.s,
            marginBottom: theme.spacing.xs,
          }}>
            Dosage:
          </Text>
          <Text style={{ 
            fontSize: theme.typography.fontSizes.small,
            lineHeight: theme.typography.lineHeights.small,
            color: theme.colors.text.secondary,
            marginBottom: theme.spacing.xs,
          }}>
            Take 1 tablet (500mg) 3 times a day for 10 days.
          </Text>
          
          <Text style={{ 
            fontSize: theme.typography.fontSizes.medium,
            fontWeight: theme.typography.fontWeights.bold,
            color: theme.colors.text.primary,
            marginTop: theme.spacing.s,
            marginBottom: theme.spacing.xs,
          }}>
            Side Effects:
          </Text>
          <Text style={{ 
            fontSize: theme.typography.fontSizes.small,
            lineHeight: theme.typography.lineHeights.small,
            color: theme.colors.text.secondary,
            marginBottom: theme.spacing.xs,
          }}>
            - Diarrhea
            - Rash
            - Nausea
            - Vomiting
          </Text>
        </View>
        
        <View style={[
          styles.card, 
          { 
            backgroundColor: theme.colors.card, 
            padding: theme.spacing.m,
            marginBottom: theme.spacing.m,
            borderRadius: theme.spacing.s,
            shadowColor: theme.type === 'dark' ? '#000' : '#888',
            borderWidth: theme.type === 'high-contrast' ? 1 : 0,
            borderColor: theme.colors.border
          }
        ]}>
          <Text style={{ 
            fontSize: theme.typography.fontSizes.large,
            fontWeight: theme.typography.fontWeights.bold,
            color: theme.colors.text.primary,
            marginBottom: theme.spacing.s,
          }}>
            Schedule
          </Text>
          <View style={[
            styles.scheduleItem, 
            { 
              borderBottomWidth: 1, 
              borderBottomColor: theme.colors.border,
              paddingBottom: theme.spacing.s,
              marginTop: theme.spacing.s, 
            }
          ]}>
            <Text style={{ 
              fontSize: theme.typography.fontSizes.small,
              fontWeight: theme.typography.fontWeights.bold,
              width: 80,
              color: theme.colors.text.accent,
            }}>
              8:00 AM
            </Text>
            <Text style={{ 
              fontSize: theme.typography.fontSizes.small,
              flex: 1,
              color: theme.colors.text.secondary,
            }}>
              Take 1 tablet with breakfast
            </Text>
          </View>
          <View style={[
            styles.scheduleItem, 
            { 
              borderBottomWidth: 1, 
              borderBottomColor: theme.colors.border,
              paddingBottom: theme.spacing.s,
              marginTop: theme.spacing.s, 
            }
          ]}>
            <Text style={{ 
              fontSize: theme.typography.fontSizes.small,
              fontWeight: theme.typography.fontWeights.bold,
              width: 80,
              color: theme.colors.text.accent,
            }}>
              4:00 PM
            </Text>
            <Text style={{ 
              fontSize: theme.typography.fontSizes.small,
              flex: 1,
              color: theme.colors.text.secondary,
            }}>
              Take 1 tablet in the afternoon
            </Text>
          </View>
          <View style={[
            styles.scheduleItem, 
            { 
              paddingBottom: theme.spacing.s,
              marginTop: theme.spacing.s, 
            }
          ]}>
            <Text style={{ 
              fontSize: theme.typography.fontSizes.small,
              fontWeight: theme.typography.fontWeights.bold,
              width: 80,
              color: theme.colors.text.accent,
            }}>
              12:00 AM
            </Text>
            <Text style={{ 
              fontSize: theme.typography.fontSizes.small,
              flex: 1,
              color: theme.colors.text.secondary,
            }}>
              Take 1 tablet before bed
            </Text>
          </View>
        </View>
        
        <View style={[
          styles.card, 
          { 
            backgroundColor: theme.colors.card, 
            padding: theme.spacing.m,
            marginBottom: theme.spacing.m,
            borderRadius: theme.spacing.s,
            shadowColor: theme.type === 'dark' ? '#000' : '#888',
            borderWidth: theme.type === 'high-contrast' ? 1 : 0,
            borderColor: theme.colors.border
          }
        ]}>
          <Text style={{ 
            fontSize: theme.typography.fontSizes.large,
            fontWeight: theme.typography.fontWeights.bold,
            color: theme.colors.text.primary,
            marginBottom: theme.spacing.s,
          }}>
            Refill Information
          </Text>
          <Text style={{ 
            fontSize: theme.typography.fontSizes.small,
            color: theme.colors.text.secondary,
            marginBottom: theme.spacing.xs,
          }}>
            Prescription #: RX7281904
          </Text>
          <Text style={{ 
            fontSize: theme.typography.fontSizes.small,
            color: theme.colors.text.secondary,
            marginBottom: theme.spacing.xs,
          }}>
            Refills Remaining: 2
          </Text>
          <Text style={{ 
            fontSize: theme.typography.fontSizes.small,
            color: theme.colors.text.secondary,
            marginBottom: theme.spacing.xs,
          }}>
            Pharmacy: MedPlus Pharmacy
          </Text>
          <Text style={{ 
            fontSize: theme.typography.fontSizes.small,
            color: theme.colors.text.secondary,
            marginBottom: theme.spacing.m,
          }}>
            Phone: (555) 123-4567
          </Text>
          
          <TouchableOpacity 
            style={{ 
              backgroundColor: theme.colors.primary,
              padding: theme.spacing.m,
              borderRadius: theme.spacing.xs,
              alignItems: 'center',
              marginTop: theme.spacing.s,
            }}
          >
            <Text style={{ 
              color: theme.type === 'high-contrast' ? theme.colors.background : 'white',
              fontWeight: theme.typography.fontWeights.bold,
              fontSize: theme.typography.fontSizes.medium,
            }}>
              Request Refill
            </Text>
          </TouchableOpacity>
        </View>
        
        <View style={[
          styles.card, 
          { 
            backgroundColor: theme.colors.card, 
            padding: theme.spacing.m,
            marginBottom: theme.spacing.m,
            borderRadius: theme.spacing.s,
            shadowColor: theme.type === 'dark' ? '#000' : '#888',
            borderWidth: theme.type === 'high-contrast' ? 1 : 0,
            borderColor: theme.colors.border
          }
        ]}>
          <Text style={{ 
            fontSize: theme.typography.fontSizes.large,
            fontWeight: theme.typography.fontWeights.bold,
            color: theme.colors.text.primary,
            marginBottom: theme.spacing.s,
          }}>
            Warnings
          </Text>
          <Text style={{ 
            fontSize: theme.typography.fontSizes.small,
            color: theme.colors.text.warning,
            marginBottom: theme.spacing.s,
            lineHeight: theme.typography.lineHeights.small,
          }}>
            Do not use this medication if you are allergic to penicillin antibiotics.
          </Text>
          <Text style={{ 
            fontSize: theme.typography.fontSizes.small,
            color: theme.colors.text.warning,
            marginBottom: theme.spacing.s,
            lineHeight: theme.typography.lineHeights.small,
          }}>
            Tell your doctor if you have kidney disease or a history of diarrhea.
          </Text>
        </View>
        
        {/* Theme Switcher */}
        <View style={[
          styles.card, 
          { 
            backgroundColor: theme.colors.card, 
            padding: theme.spacing.m,
            marginBottom: theme.spacing.m,
            borderRadius: theme.spacing.s,
            shadowColor: theme.type === 'dark' ? '#000' : '#888',
            borderWidth: theme.type === 'high-contrast' ? 1 : 0,
            borderColor: theme.colors.border
          }
        ]}>
          <Text style={{ 
            fontSize: theme.typography.fontSizes.large,
            fontWeight: theme.typography.fontWeights.bold,
            color: theme.colors.text.primary,
            marginBottom: theme.spacing.s,
          }}>
            Theme Settings
          </Text>
          
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <TouchableOpacity 
              style={{ 
                backgroundColor: theme.type === 'light' ? theme.colors.primary : '#CCCCCC',
                padding: theme.spacing.s,
                borderRadius: theme.spacing.xs,
                flex: 1,
                marginRight: theme.spacing.s,
                alignItems: 'center',
              }}
              onPress={() => setTheme('light')}
            >
              <Text style={{ 
                color: 'white',
                fontWeight: theme.typography.fontWeights.bold,
              }}>
                Light
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={{ 
                backgroundColor: theme.type === 'dark' ? theme.colors.primary : '#CCCCCC',
                padding: theme.spacing.s,
                borderRadius: theme.spacing.xs,
                flex: 1,
                marginRight: theme.spacing.s,
                alignItems: 'center',
              }}
              onPress={() => setTheme('dark')}
            >
              <Text style={{ 
                color: 'white',
                fontWeight: theme.typography.fontWeights.bold,
              }}>
                Dark
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={{ 
                backgroundColor: theme.type === 'high-contrast' ? theme.colors.primary : '#CCCCCC',
                padding: theme.spacing.s,
                borderRadius: theme.spacing.xs,
                flex: 1,
                alignItems: 'center',
              }}
              onPress={() => setTheme('high-contrast')}
            >
              <Text style={{ 
                color: 'white',
                fontWeight: theme.typography.fontWeights.bold,
              }}>
                High Contrast
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

/**
 * App component that wraps MedicationDetail with ThemeProvider
 * @returns {React.ReactElement} App component
 */
export function App() {
  return (
    <ThemeProvider>
      <MedicationDetail />
    </ThemeProvider>
  );
}

// Minimal base styles that will be overridden by theme
const styles = StyleSheet.create({
  header: {
    paddingTop: 60,
  },
  title: {
    // Base styles only - the rest comes from theme
  },
  content: {
    flex: 1,
  },
  card: {
    // Base styles only - the rest comes from theme
  },
  scheduleItem: {
    flexDirection: 'row',
  },
}); 