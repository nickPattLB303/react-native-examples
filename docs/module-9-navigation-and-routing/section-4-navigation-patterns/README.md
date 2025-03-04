# Section 4: Navigation Patterns

## Overview

This section explores common navigation patterns in mobile applications and how to implement them in React Native. We'll discuss best practices for designing navigation structures, combining different navigation types, and creating intuitive user experiences.

## Learning Objectives

By the end of this section, you will be able to:

- Identify and implement common navigation patterns in React Native
- Combine different navigation types to create complex navigation structures
- Apply best practices for navigation design
- Implement authentication flows with protected routes
- Create custom transitions and animations
- Optimize navigation performance
- Design accessible navigation experiences

## Common Navigation Patterns

### Tab-Based Navigation

Tab-based navigation is one of the most common patterns in mobile apps, allowing users to quickly switch between main sections of an app.

**When to use:**
- For top-level navigation between main app sections
- When users need to frequently switch between different features
- For parallel navigation flows that don't have a hierarchical relationship

**Implementation:**

```tsx
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import HomeScreen from './screens/HomeScreen';
import MedicationsScreen from './screens/MedicationsScreen';
import PrescriptionsScreen from './screens/PrescriptionsScreen';
import ProfileScreen from './screens/ProfileScreen';

const Tab = createBottomTabNavigator();

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          
          switch (route.name) {
            case 'Home':
              iconName = focused ? 'home' : 'home-outline';
              break;
            case 'Medications':
              iconName = focused ? 'medical' : 'medical-outline';
              break;
            case 'Prescriptions':
              iconName = focused ? 'document-text' : 'document-text-outline';
              break;
            case 'Profile':
              iconName = focused ? 'person' : 'person-outline';
              break;
          }
          
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Medications" component={MedicationsScreen} />
      <Tab.Screen name="Prescriptions" component={PrescriptionsScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}
```

**Best practices:**
- Limit to 3-5 tabs for better usability
- Use clear, recognizable icons
- Provide visual feedback for the active tab
- Keep tab labels short and descriptive

### Stack Navigation

Stack navigation creates a hierarchy of screens where users can navigate deeper into content and back out.

**When to use:**
- For hierarchical navigation flows
- When users need to drill down into details
- For sequential processes like forms or wizards

**Implementation:**

```tsx
import { createStackNavigator } from '@react-navigation/stack';
import MedicationsListScreen from './screens/MedicationsListScreen';
import MedicationDetailScreen from './screens/MedicationDetailScreen';
import MedicationInfoScreen from './screens/MedicationInfoScreen';

const Stack = createStackNavigator();

function MedicationsStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="MedicationsList" component={MedicationsListScreen} />
      <Stack.Screen name="MedicationDetail" component={MedicationDetailScreen} />
      <Stack.Screen name="MedicationInfo" component={MedicationInfoScreen} />
    </Stack.Navigator>
  );
}
```

**Best practices:**
- Provide clear back navigation
- Use descriptive screen titles
- Limit stack depth (avoid deep nesting)
- Consider using breadcrumbs for deep hierarchies

### Drawer Navigation

Drawer navigation provides a side menu that can be pulled out from the edge of the screen.

**When to use:**
- For apps with many top-level destinations
- When screen space is limited
- For less frequently used features or settings

**Implementation:**

```tsx
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Ionicons } from '@expo/vector-icons';
import HomeScreen from './screens/HomeScreen';
import SettingsScreen from './screens/SettingsScreen';
import HelpScreen from './screens/HelpScreen';
import AboutScreen from './screens/AboutScreen';

const Drawer = createDrawerNavigator();

function AppDrawer() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen 
        name="Home" 
        component={HomeScreen} 
        options={{
          drawerIcon: ({ color }) => (
            <Ionicons name="home-outline" size={24} color={color} />
          ),
        }}
      />
      <Drawer.Screen 
        name="Settings" 
        component={SettingsScreen} 
        options={{
          drawerIcon: ({ color }) => (
            <Ionicons name="settings-outline" size={24} color={color} />
          ),
        }}
      />
      <Drawer.Screen 
        name="Help" 
        component={HelpScreen} 
        options={{
          drawerIcon: ({ color }) => (
            <Ionicons name="help-circle-outline" size={24} color={color} />
          ),
        }}
      />
      <Drawer.Screen 
        name="About" 
        component={AboutScreen} 
        options={{
          drawerIcon: ({ color }) => (
            <Ionicons name="information-circle-outline" size={24} color={color} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
}
```

**Best practices:**
- Provide a clear drawer toggle icon
- Group related items together
- Use icons to improve recognition
- Consider a header in the drawer for user information

### Modal Navigation

Modal navigation presents screens that overlay the current screen, often used for focused tasks.

**When to use:**
- For self-contained tasks that require focus
- For forms or data entry
- For confirmation dialogs
- For temporary information display

**Implementation:**

```tsx
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import AddMedicationScreen from './screens/AddMedicationScreen';

const RootStack = createStackNavigator();

function RootNavigator() {
  return (
    <RootStack.Navigator>
      <RootStack.Group>
        <RootStack.Screen name="Home" component={HomeScreen} />
      </RootStack.Group>
      <RootStack.Group screenOptions={{ presentation: 'modal' }}>
        <RootStack.Screen name="AddMedication" component={AddMedicationScreen} />
      </RootStack.Group>
    </RootStack.Navigator>
  );
}
```

**Best practices:**
- Provide a clear way to dismiss the modal
- Keep modal content focused on a single task
- Use appropriate animations for modal presentation
- Consider using a transparent background for context

## Combining Navigation Patterns

### Nested Navigation

Complex apps often require combining multiple navigation patterns. Here's how to nest navigators effectively:

```tsx
// App.tsx
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';

// Import screens and components...

// Stack navigators for each tab
const HomeStack = createStackNavigator();
const MedicationsStack = createStackNavigator();
const PrescriptionsStack = createStackNavigator();
const ProfileStack = createStackNavigator();

// Tab navigator
const Tab = createBottomTabNavigator();

// Drawer navigator
const Drawer = createDrawerNavigator();

// Root stack for modals
const RootStack = createStackNavigator();

// Define stack navigators for each tab
function HomeNavigator() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="HomeScreen" component={HomeScreen} />
      <HomeStack.Screen name="Notifications" component={NotificationsScreen} />
    </HomeStack.Navigator>
  );
}

// Define other stack navigators...

// Define tab navigator
function MainTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeNavigator} options={{ headerShown: false }} />
      <Tab.Screen name="Medications" component={MedicationsNavigator} options={{ headerShown: false }} />
      <Tab.Screen name="Prescriptions" component={PrescriptionsNavigator} options={{ headerShown: false }} />
      <Tab.Screen name="Profile" component={ProfileNavigator} options={{ headerShown: false }} />
    </Tab.Navigator>
  );
}

// Define drawer navigator
function MainDrawer() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Main" component={MainTabs} options={{ headerShown: false }} />
      <Drawer.Screen name="Settings" component={SettingsScreen} />
      <Drawer.Screen name="Help" component={HelpScreen} />
      <Drawer.Screen name="About" component={AboutScreen} />
    </Drawer.Navigator>
  );
}

// Define root stack for modals
function RootNavigator() {
  return (
    <RootStack.Navigator>
      <RootStack.Group>
        <RootStack.Screen name="Main" component={MainDrawer} options={{ headerShown: false }} />
      </RootStack.Group>
      <RootStack.Group screenOptions={{ presentation: 'modal' }}>
        <RootStack.Screen name="AddMedication" component={AddMedicationScreen} />
        <RootStack.Screen name="AddPrescription" component={AddPrescriptionScreen} />
      </RootStack.Group>
    </RootStack.Navigator>
  );
}

// App container
export default function App() {
  return (
    <NavigationContainer>
      <RootNavigator />
    </NavigationContainer>
  );
}
```

**Best practices for nested navigation:**
- Keep nesting depth reasonable (avoid deep nesting)
- Maintain consistent navigation patterns
- Consider performance implications
- Ensure type safety with TypeScript
- Test navigation thoroughly on different devices

### Common Nesting Patterns

1. **Tabs with Stacks**: Each tab contains its own stack navigator
   ```
   NavigationContainer
   └── Tab Navigator
       ├── Stack Navigator (Tab 1)
       ├── Stack Navigator (Tab 2)
       └── Stack Navigator (Tab 3)
   ```

2. **Drawer with Tabs**: Drawer contains a tab navigator and additional screens
   ```
   NavigationContainer
   └── Drawer Navigator
       ├── Tab Navigator
       │   ├── Stack Navigator (Tab 1)
       │   ├── Stack Navigator (Tab 2)
       │   └── Stack Navigator (Tab 3)
       ├── Settings Screen
       └── Help Screen
   ```

3. **Root Stack with Modals**: Root stack contains main navigation and modal screens
   ```
   NavigationContainer
   └── Stack Navigator (Root)
       ├── Tab/Drawer Navigator (Main)
       └── Modal Screens
   ```

## Advanced Navigation Patterns

### Authentication Flow

Implementing a secure authentication flow with protected routes:

```tsx
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Import screens
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import ForgotPasswordScreen from './screens/ForgotPasswordScreen';
import MainApp from './navigation/MainApp'; // Your main app navigation
import SplashScreen from './screens/SplashScreen';

const Stack = createStackNavigator();

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [userToken, setUserToken] = useState(null);

  // Check if user is logged in
  useEffect(() => {
    const bootstrapAsync = async () => {
      let token;
      try {
        token = await AsyncStorage.getItem('userToken');
      } catch (e) {
        // Error retrieving token
      }
      setUserToken(token);
      setIsLoading(false);
    };

    bootstrapAsync();
  }, []);

  if (isLoading) {
    return <SplashScreen />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {userToken == null ? (
          // Auth screens
          <Stack.Group>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
            <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
          </Stack.Group>
        ) : (
          // App screens
          <Stack.Screen 
            name="Main" 
            component={MainApp} 
            options={{ headerShown: false }} 
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
```

### Onboarding Flow

Implementing an onboarding flow for first-time users:

```tsx
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Import screens
import OnboardingScreen from './screens/OnboardingScreen';
import MainApp from './navigation/MainApp'; // Your main app navigation

const Stack = createStackNavigator();

export default function App() {
  const [isFirstLaunch, setIsFirstLaunch] = useState(null);

  useEffect(() => {
    const checkIfFirstLaunch = async () => {
      try {
        const hasLaunched = await AsyncStorage.getItem('hasLaunched');
        if (hasLaunched === null) {
          setIsFirstLaunch(true);
          AsyncStorage.setItem('hasLaunched', 'true');
        } else {
          setIsFirstLaunch(false);
        }
      } catch (e) {
        setIsFirstLaunch(false);
      }
    };

    checkIfFirstLaunch();
  }, []);

  if (isFirstLaunch === null) {
    return null; // Still loading
  }

  return (
    <NavigationContainer>
      <Stack.Navigator headerMode="none">
        {isFirstLaunch ? (
          <Stack.Screen name="Onboarding" component={OnboardingScreen} />
        ) : (
          <Stack.Screen name="Main" component={MainApp} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
```

### Deep Linking

Implementing deep linking to allow users to open specific screens from external links:

```tsx
import { NavigationContainer } from '@react-navigation/native';
import { linking } from './linking';

// Define linking configuration
const linking = {
  prefixes: ['medtrack://', 'https://medtrack.example.com'],
  config: {
    screens: {
      Login: 'login',
      Register: 'register',
      Main: {
        screens: {
          Home: 'home',
          Medications: {
            screens: {
              MedicationsList: 'medications',
              MedicationDetail: 'medications/:id',
            },
          },
          Prescriptions: {
            screens: {
              PrescriptionsList: 'prescriptions',
              PrescriptionDetail: 'prescriptions/:id',
            },
          },
          Profile: 'profile',
        },
      },
      NotFound: '*',
    },
  },
};

export default function App() {
  return (
    <NavigationContainer linking={linking} fallback={<LoadingScreen />}>
      {/* Navigation structure */}
    </NavigationContainer>
  );
}
```

## Navigation Design Best Practices

### User Experience Considerations

1. **Consistency**: Use consistent navigation patterns throughout your app
2. **Predictability**: Make navigation behavior predictable for users
3. **Feedback**: Provide clear visual feedback for navigation actions
4. **Efficiency**: Minimize the number of taps to reach important features
5. **Context**: Maintain context when navigating between screens
6. **Accessibility**: Ensure navigation elements are accessible to all users

### Performance Optimization

1. **Lazy Loading**: Use lazy loading for screens to improve initial load time

```tsx
import { createStackNavigator } from '@react-navigation/stack';
import { lazy, Suspense } from 'react';

const HomeScreen = lazy(() => import('./screens/HomeScreen'));
const SettingsScreen = lazy(() => import('./screens/SettingsScreen'));

const Stack = createStackNavigator();

function AppNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home">
        {props => (
          <Suspense fallback={<LoadingScreen />}>
            <HomeScreen {...props} />
          </Suspense>
        )}
      </Stack.Screen>
      <Stack.Screen name="Settings">
        {props => (
          <Suspense fallback={<LoadingScreen />}>
            <SettingsScreen {...props} />
          </Suspense>
        )}
      </Stack.Screen>
    </Stack.Navigator>
  );
}
```

2. **Minimize Re-renders**: Use memoization to prevent unnecessary re-renders

```tsx
import React, { useMemo } from 'react';
import { NavigationContainer } from '@react-navigation/native';

function App() {
  const navigationTheme = useMemo(() => ({
    dark: false,
    colors: {
      primary: '#f4511e',
      background: '#ffffff',
      card: '#ffffff',
      text: '#000000',
      border: '#cccccc',
      notification: '#ff0000',
    },
  }), []);

  return (
    <NavigationContainer theme={navigationTheme}>
      {/* Navigation structure */}
    </NavigationContainer>
  );
}
```

3. **Screen Options**: Define screen options at the navigator level when possible

```tsx
<Stack.Navigator
  screenOptions={{
    headerStyle: {
      backgroundColor: '#f4511e',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  }}
>
  {/* Screen definitions */}
</Stack.Navigator>
```

### Accessibility

1. **Screen Reader Support**: Ensure navigation elements work with screen readers

```tsx
<TouchableOpacity
  accessible={true}
  accessibilityLabel="Go to home screen"
  accessibilityHint="Navigates to the home screen"
  onPress={() => navigation.navigate('Home')}
>
  <Text>Home</Text>
</TouchableOpacity>
```

2. **Focus Management**: Manage focus when navigating between screens

```tsx
function ScreenWithFocus() {
  const ref = useRef(null);
  
  useEffect(() => {
    // Set focus when screen is focused
    const unsubscribe = navigation.addListener('focus', () => {
      if (ref.current) {
        ref.current.focus();
      }
    });
    
    return unsubscribe;
  }, [navigation]);
  
  return (
    <View>
      <TextInput ref={ref} />
    </View>
  );
}
```

## Custom Navigation Components

### Custom Tab Bar

Creating a custom tab bar component:

```tsx
import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import styled from 'styled-components/native';

// Styled components
const TabBarContainer = styled.View`
  flex-direction: row;
  height: 60px;
  background-color: #ffffff;
  border-top-width: 1px;
  border-top-color: #e0e0e0;
`;

const TabButton = styled.TouchableOpacity<{ focused: boolean }>`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${props => props.focused ? '#f0f0f0' : 'transparent'};
  border-radius: 10px;
  margin: 5px;
`;

const TabLabel = styled.Text<{ focused: boolean }>`
  font-size: 12px;
  margin-top: 2px;
  color: ${props => props.focused ? '#f4511e' : '#888888'};
`;

function CustomTabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  return (
    <TabBarContainer>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label = options.tabBarLabel || options.title || route.name;
        const isFocused = state.index === index;
        
        // Get icon name based on route
        let iconName;
        if (route.name === 'Home') {
          iconName = isFocused ? 'home' : 'home-outline';
        } else if (route.name === 'Medications') {
          iconName = isFocused ? 'medical' : 'medical-outline';
        } else if (route.name === 'Prescriptions') {
          iconName = isFocused ? 'document-text' : 'document-text-outline';
        } else if (route.name === 'Profile') {
          iconName = isFocused ? 'person' : 'person-outline';
        }
        
        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });
          
          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };
        
        return (
          <TabButton
            key={index}
            focused={isFocused}
            onPress={onPress}
            accessibilityRole="button"
            accessibilityLabel={options.tabBarAccessibilityLabel}
            accessibilityState={isFocused ? { selected: true } : {}}
          >
            <Ionicons
              name={iconName}
              size={24}
              color={isFocused ? '#f4511e' : '#888888'}
            />
            <TabLabel focused={isFocused}>{label}</TabLabel>
          </TabButton>
        );
      })}
    </TabBarContainer>
  );
}

export default CustomTabBar;
```

### Custom Header

Creating a custom header component:

```tsx
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { StackHeaderProps } from '@react-navigation/stack';
import styled from 'styled-components/native';

// Styled components
const HeaderContainer = styled.View`
  flex-direction: row;
  height: 60px;
  align-items: center;
  background-color: #f4511e;
  padding-horizontal: 10px;
`;

const HeaderTitle = styled.Text`
  flex: 1;
  color: #ffffff;
  font-size: 18px;
  font-weight: bold;
  text-align: center;
`;

const HeaderButton = styled.TouchableOpacity`
  padding: 10px;
`;

function CustomHeader({ scene, previous, navigation }: StackHeaderProps) {
  const { options } = scene.descriptor;
  const title = options.headerTitle || options.title || scene.route.name;
  
  return (
    <HeaderContainer>
      {previous ? (
        <HeaderButton onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#ffffff" />
        </HeaderButton>
      ) : (
        <HeaderButton>
          <Ionicons name="menu" size={24} color="#ffffff" />
        </HeaderButton>
      )}
      
      <HeaderTitle>{title}</HeaderTitle>
      
      <HeaderButton>
        <Ionicons name="notifications-outline" size={24} color="#ffffff" />
      </HeaderButton>
    </HeaderContainer>
  );
}

export default CustomHeader;
```

## Exercise: Implementing Complex Navigation

Create a medication tracking app with the following navigation structure:

1. Authentication flow (login, register, forgot password)
2. Onboarding flow for first-time users
3. Main app with tab navigation (Home, Medications, Prescriptions, Profile)
4. Stack navigation within each tab
5. Modal screens for adding new items
6. Drawer navigation for settings and help
7. Deep linking support
8. Custom tab bar and header components

## Next Steps

In the next module, we'll explore state management in React Native applications, focusing on how to manage application state effectively using various state management solutions.

## Additional Resources

- [Navigation Patterns in Mobile UX Design](https://www.nngroup.com/articles/mobile-navigation-patterns/)
- [React Navigation Best Practices](https://reactnavigation.org/docs/navigating/)
- [Deep Linking with React Navigation](https://reactnavigation.org/docs/deep-linking/)
- [Accessibility in React Native](https://reactnative.dev/docs/accessibility)
- [Performance Optimization in React Navigation](https://reactnavigation.org/docs/performance/)
