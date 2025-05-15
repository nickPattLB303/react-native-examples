# Section 3: React Navigation

## Overview

React Navigation is a standalone library that provides a comprehensive navigation solution for React Native applications. It offers a component-based approach to navigation, with extensive customization options and support for all common navigation patterns. This section covers how to implement and use React Navigation in your React Native applications.

## Learning Objectives

By the end of this section, you will be able to:

- Set up React Navigation in a React Native project
- Implement various navigation patterns using React Navigation
- Customize navigation appearance and behavior
- Handle navigation events and lifecycle
- Pass parameters between screens
- Configure deep linking
- Implement type-safe navigation with TypeScript

## Introduction to React Navigation

React Navigation is the most widely used navigation library for React Native. It provides a flexible, component-based API for building navigation structures of any complexity.

### Key Features

- **Component-based API**: Navigation is defined using React components
- **Multiple navigation patterns**: Support for stack, tab, drawer, and other navigation types
- **Extensive customization**: Highly customizable appearance and behavior
- **Native-feeling transitions**: Smooth, platform-specific animations
- **Deep linking support**: Built-in support for deep linking
- **TypeScript support**: Full TypeScript support for type-safe navigation

## Setting Up React Navigation

### Installation

To add React Navigation to a React Native project:

```bash
npx expo install @react-navigation/native

# Install dependencies
npx expo install react-native-screens react-native-safe-area-context

# For stack navigation
npx expo install @react-navigation/stack
npx expo install react-native-gesture-handler

# For tab navigation
npx expo install @react-navigation/bottom-tabs

# For drawer navigation
npx expo install @react-navigation/drawer
npx expo install react-native-gesture-handler react-native-reanimated
```

### Basic Setup

1. Wrap your app with the `NavigationContainer`:

```tsx
// App.tsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

export default function App() {
  return (
    <NavigationContainer>
      {/* Your navigation structure goes here */}
    </NavigationContainer>
  );
}
```

2. Set up a basic stack navigator:

```tsx
// App.tsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import DetailsScreen from './screens/DetailsScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen 
          name="Home" 
          component={HomeScreen} 
          options={{ title: 'Home' }} 
        />
        <Stack.Screen 
          name="Details" 
          component={DetailsScreen} 
          options={{ title: 'Details' }} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
```

## Navigation Patterns

### Stack Navigation

Stack navigation is the most basic form of navigation, where screens are stacked on top of each other.

```tsx
import { createStackNavigator } from '@react-navigation/stack';
import MedicationsListScreen from './screens/MedicationsListScreen';
import MedicationDetailScreen from './screens/MedicationDetailScreen';

const Stack = createStackNavigator();

function MedicationsNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="MedicationsList"
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
      <Stack.Screen 
        name="MedicationsList" 
        component={MedicationsListScreen} 
        options={{ title: 'Medications' }} 
      />
      <Stack.Screen 
        name="MedicationDetail" 
        component={MedicationDetailScreen} 
        options={({ route }) => ({ 
          title: `Medication ${route.params.id}` 
        })} 
      />
    </Stack.Navigator>
  );
}
```

### Tab Navigation

Tab navigation allows users to switch between different sections of an app using tabs.

```tsx
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import HomeScreen from './screens/HomeScreen';
import MedicationsNavigator from './navigators/MedicationsNavigator';
import ProfileScreen from './screens/ProfileScreen';

const Tab = createBottomTabNavigator();

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Medications') {
            iconName = focused ? 'medical' : 'medical-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: '#f4511e',
        inactiveTintColor: 'gray',
      }}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Medications" component={MedicationsNavigator} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}
```

### Drawer Navigation

Drawer navigation provides a side menu that can be pulled out from the edge of the screen.

```tsx
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Ionicons } from '@expo/vector-icons';
import HomeScreen from './screens/HomeScreen';
import MedicationsNavigator from './navigators/MedicationsNavigator';
import SettingsScreen from './screens/SettingsScreen';

const Drawer = createDrawerNavigator();

function AppDrawer() {
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      screenOptions={{
        drawerActiveTintColor: '#f4511e',
        drawerInactiveTintColor: 'gray',
      }}
    >
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
        name="Medications" 
        component={MedicationsNavigator} 
        options={{
          drawerIcon: ({ color }) => (
            <Ionicons name="medical-outline" size={24} color={color} />
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
    </Drawer.Navigator>
  );
}
```

### Modal Navigation

Modal screens can be implemented using a separate stack navigator with a modal presentation style.

```tsx
import { createStackNavigator } from '@react-navigation/stack';
import MainTabs from './navigators/MainTabs';
import AddMedicationScreen from './screens/AddMedicationScreen';

const RootStack = createStackNavigator();

function RootNavigator() {
  return (
    <RootStack.Navigator mode="modal">
      <RootStack.Screen 
        name="Main" 
        component={MainTabs} 
        options={{ headerShown: false }} 
      />
      <RootStack.Screen 
        name="AddMedication" 
        component={AddMedicationScreen} 
        options={{ 
          title: 'Add Medication',
          presentation: 'modal',
        }} 
      />
    </RootStack.Navigator>
  );
}
```

### Nested Navigation

React Navigation allows for nesting navigators to create complex navigation structures.

```tsx
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

// Screens
import HomeScreen from './screens/HomeScreen';
import MedicationsListScreen from './screens/MedicationsListScreen';
import MedicationDetailScreen from './screens/MedicationDetailScreen';
import PrescriptionsListScreen from './screens/PrescriptionsListScreen';
import PrescriptionDetailScreen from './screens/PrescriptionDetailScreen';
import ProfileScreen from './screens/ProfileScreen';
import AddMedicationScreen from './screens/AddMedicationScreen';

// Stack navigators for each tab
const HomeStack = createStackNavigator();
function HomeNavigator() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="Home" component={HomeScreen} />
    </HomeStack.Navigator>
  );
}

const MedicationsStack = createStackNavigator();
function MedicationsNavigator() {
  return (
    <MedicationsStack.Navigator>
      <MedicationsStack.Screen name="MedicationsList" component={MedicationsListScreen} />
      <MedicationsStack.Screen name="MedicationDetail" component={MedicationDetailScreen} />
    </MedicationsStack.Navigator>
  );
}

const PrescriptionsStack = createStackNavigator();
function PrescriptionsNavigator() {
  return (
    <PrescriptionsStack.Navigator>
      <PrescriptionsStack.Screen name="PrescriptionsList" component={PrescriptionsListScreen} />
      <PrescriptionsStack.Screen name="PrescriptionDetail" component={PrescriptionDetailScreen} />
    </PrescriptionsStack.Navigator>
  );
}

const ProfileStack = createStackNavigator();
function ProfileNavigator() {
  return (
    <ProfileStack.Navigator>
      <ProfileStack.Screen name="Profile" component={ProfileScreen} />
    </ProfileStack.Navigator>
  );
}

// Tab navigator
const Tab = createBottomTabNavigator();
function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'HomeTab') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'MedicationsTab') {
            iconName = focused ? 'medical' : 'medical-outline';
          } else if (route.name === 'PrescriptionsTab') {
            iconName = focused ? 'document-text' : 'document-text-outline';
          } else if (route.name === 'ProfileTab') {
            iconName = focused ? 'person' : 'person-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen 
        name="HomeTab" 
        component={HomeNavigator} 
        options={{ title: 'Home', headerShown: false }} 
      />
      <Tab.Screen 
        name="MedicationsTab" 
        component={MedicationsNavigator} 
        options={{ title: 'Medications', headerShown: false }} 
      />
      <Tab.Screen 
        name="PrescriptionsTab" 
        component={PrescriptionsNavigator} 
        options={{ title: 'Prescriptions', headerShown: false }} 
      />
      <Tab.Screen 
        name="ProfileTab" 
        component={ProfileNavigator} 
        options={{ title: 'Profile', headerShown: false }} 
      />
    </Tab.Navigator>
  );
}

// Root stack navigator for modals
const RootStack = createStackNavigator();
function RootNavigator() {
  return (
    <RootStack.Navigator mode="modal">
      <RootStack.Screen 
        name="Main" 
        component={MainTabs} 
        options={{ headerShown: false }} 
      />
      <RootStack.Screen 
        name="AddMedication" 
        component={AddMedicationScreen} 
        options={{ presentation: 'modal' }} 
      />
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

## Navigation and Routing

### Navigating Between Screens

React Navigation provides the `navigation` prop to all screen components, which can be used for programmatic navigation:

```tsx
import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Home Screen</Text>
      
      <Button
        title="Go to Medications"
        onPress={() => navigation.navigate('MedicationsTab')}
      />
      
      <Button
        title="View Medication Details"
        onPress={() => 
          navigation.navigate('MedicationsTab', {
            screen: 'MedicationDetail',
            params: { id: '123' },
          })
        }
      />
      
      <Button
        title="Add Medication"
        onPress={() => navigation.navigate('AddMedication')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});

export default HomeScreen;
```

### Navigation Methods

React Navigation provides several methods for navigation:

- `navigate(name, params)`: Navigate to a route in the current navigator
- `push(name, params)`: Push a new route onto the stack
- `goBack()`: Go back to the previous screen
- `popToTop()`: Go back to the first screen in the stack
- `replace(name, params)`: Replace the current screen with a new one
- `reset(state)`: Reset the navigation state
- `setParams(params)`: Update the parameters for the current route

### Accessing Route Parameters

Route parameters can be accessed using the `route` prop:

```tsx
import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

function MedicationDetailScreen({ route, navigation }) {
  // Get the parameters
  const { id } = route.params;
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Medication Details</Text>
      <Text style={styles.detail}>Medication ID: {id}</Text>
      
      <Button
        title="Go Back"
        onPress={() => navigation.goBack()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  detail: {
    fontSize: 18,
    marginVertical: 8,
  },
});

export default MedicationDetailScreen;
```

## Customizing Navigation

### Header Customization

React Navigation allows for extensive header customization:

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
    headerRight: () => (
      <Button
        onPress={() => alert('This is a button!')}
        title="Info"
        color="#fff"
      />
    ),
  }}
>
  {/* Screen definitions */}
</Stack.Navigator>
```

### Custom Components

You can create custom components for navigation elements:

```tsx
import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

function CustomTabBar({ state, descriptors, navigation }) {
  return (
    <View style={styles.tabBar}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label = options.tabBarLabel || options.title || route.name;
        const isFocused = state.index === index;

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
          <TouchableOpacity
            key={index}
            onPress={onPress}
            style={styles.tabItem}
          >
            <Ionicons
              name={isFocused ? 'home' : 'home-outline'}
              size={24}
              color={isFocused ? '#f4511e' : 'gray'}
            />
            <Text style={{ color: isFocused ? '#f4511e' : 'gray' }}>
              {label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: 'row',
    height: 60,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

// Usage
<Tab.Navigator tabBar={props => <CustomTabBar {...props} />}>
  {/* Screen definitions */}
</Tab.Navigator>
```

## Navigation Lifecycle and Events

React Navigation provides lifecycle events that you can subscribe to:

```tsx
import React, { useEffect } from 'react';
import { View, Text } from 'react-native';

function ProfileScreen({ navigation }) {
  useEffect(() => {
    // Subscribe to focus events
    const unsubscribeFocus = navigation.addListener('focus', () => {
      console.log('Profile screen is focused');
      // Fetch user data or perform other actions when screen is focused
    });

    // Subscribe to blur events
    const unsubscribeBlur = navigation.addListener('blur', () => {
      console.log('Profile screen is blurred');
      // Clean up resources when screen is unfocused
    });

    // Clean up subscriptions
    return () => {
      unsubscribeFocus();
      unsubscribeBlur();
    };
  }, [navigation]);

  return (
    <View>
      <Text>Profile Screen</Text>
    </View>
  );
}
```

## Deep Linking

React Navigation provides built-in support for deep linking:

```tsx
import { NavigationContainer } from '@react-navigation/native';
import { linking } from './linking';

// Define linking configuration
const linking = {
  prefixes: ['medtrack://', 'https://medtrack.example.com'],
  config: {
    screens: {
      Main: {
        screens: {
          MedicationsTab: {
            screens: {
              MedicationsList: 'medications',
              MedicationDetail: 'medications/:id',
            },
          },
          PrescriptionsTab: {
            screens: {
              PrescriptionsList: 'prescriptions',
              PrescriptionDetail: 'prescriptions/:id',
            },
          },
          ProfileTab: 'profile',
        },
      },
      AddMedication: 'add-medication',
    },
  },
};

// Use linking configuration
function App() {
  return (
    <NavigationContainer linking={linking}>
      {/* Navigation structure */}
    </NavigationContainer>
  );
}
```

## Type-Safe Navigation with TypeScript

### Defining Navigation Types

Create a type definition file for your navigation structure:

```tsx
// navigation/types.ts
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

// Define the parameter list for each route
export type RootStackParamList = {
  Main: undefined;
  AddMedication: undefined;
};

export type MainTabParamList = {
  HomeTab: undefined;
  MedicationsTab: undefined;
  PrescriptionsTab: undefined;
  ProfileTab: undefined;
};

export type MedicationsStackParamList = {
  MedicationsList: undefined;
  MedicationDetail: { id: string };
};

export type PrescriptionsStackParamList = {
  PrescriptionsList: undefined;
  PrescriptionDetail: { id: string };
};

// Define navigation prop types
export type MedicationDetailNavigationProp = StackNavigationProp<
  MedicationsStackParamList,
  'MedicationDetail'
>;

export type MedicationDetailRouteProp = RouteProp<
  MedicationsStackParamList,
  'MedicationDetail'
>;

// Define screen props
export type MedicationDetailScreenProps = {
  navigation: MedicationDetailNavigationProp;
  route: MedicationDetailRouteProp;
};
```

### Using Navigation Types

Use the defined types in your screen components:

```tsx
import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { MedicationDetailScreenProps } from '../navigation/types';

function MedicationDetailScreen({ route, navigation }: MedicationDetailScreenProps) {
  // Type-safe parameter access
  const { id } = route.params;
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Medication Details</Text>
      <Text style={styles.detail}>Medication ID: {id}</Text>
      
      <Button
        title="Go Back"
        onPress={() => navigation.goBack()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  detail: {
    fontSize: 18,
    marginVertical: 8,
  },
});

export default MedicationDetailScreen;
```

### Type-Safe Navigation Actions

Use the defined types for navigation actions:

```tsx
import { useNavigation } from '@react-navigation/native';
import { MedicationDetailNavigationProp } from '../navigation/types';

function useMedicationNavigation() {
  // Type-safe navigation hook
  const navigation = useNavigation<MedicationDetailNavigationProp>();
  
  const navigateToMedicationDetail = (id: string) => {
    // Type-safe navigation action
    navigation.navigate('MedicationDetail', { id });
  };
  
  return { navigateToMedicationDetail };
}
```

## Best Practices for React Navigation

1. **Organize navigators in separate files**: Keep your navigation structure clean and maintainable
2. **Use consistent naming conventions**: Name your screens and navigators consistently
3. **Implement proper type safety**: Use TypeScript to ensure type-safe navigation
4. **Minimize nesting depth**: Avoid deeply nested navigators for better performance
5. **Optimize header configuration**: Configure headers at the navigator level when possible
6. **Handle navigation events properly**: Subscribe to and unsubscribe from navigation events
7. **Test deep links thoroughly**: Ensure deep links work correctly in all scenarios
8. **Consider accessibility**: Make navigation elements accessible to all users

## Exercise: Building a Medication App with React Navigation

Create a medication tracking app with the following features:

1. Tab navigation with Home, Medications, Prescriptions, and Profile tabs
2. Stack navigation within each tab
3. A modal screen for adding new medications
4. Type-safe navigation with TypeScript
5. Custom header components
6. Deep linking support

## Next Steps

In the next section, we'll explore common navigation patterns and best practices for implementing navigation in React Native applications.

## Additional Resources

- [React Navigation Documentation](https://reactnavigation.org/docs/getting-started)
- [TypeScript and React Navigation](https://reactnavigation.org/docs/typescript/)
- [Deep Linking with React Navigation](https://reactnavigation.org/docs/deep-linking)
- [Navigation Lifecycle](https://reactnavigation.org/docs/navigation-lifecycle)
