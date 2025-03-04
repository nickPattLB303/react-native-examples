# Section 2: Expo Router

## Overview

Expo Router is a file-based routing system for React Native applications, built on top of React Navigation. It brings web-like routing to mobile development, making navigation more intuitive and easier to maintain. This section covers how to implement and use Expo Router in your React Native applications.

## Learning Objectives

By the end of this section, you will be able to:

- Set up Expo Router in a React Native project
- Create a file-based navigation structure
- Implement various navigation patterns using Expo Router
- Handle route parameters and dynamic routes
- Configure deep linking
- Implement type-safe navigation with TypeScript

## Introduction to Expo Router

Expo Router is a relatively new addition to the Expo ecosystem that simplifies navigation in React Native apps. It uses a file-based approach similar to Next.js, where the file structure of your project directly maps to the navigation structure of your app.

### Key Features

- **File-based routing**: Navigation structure is defined by your file structure
- **Automatic route generation**: Routes are automatically generated based on your file structure
- **URL pattern matching**: Support for dynamic routes and parameters
- **Deep linking**: Built-in support for deep linking to any screen
- **TypeScript support**: Full TypeScript support for type-safe navigation

## Setting Up Expo Router

### Installation

To add Expo Router to an existing Expo project:

```bash
npx expo install expo-router react-native-safe-area-context react-native-screens expo-linking expo-constants expo-status-bar
```

### Configuration

1. Update your `package.json` to use the Expo Router entry point:

```json
{
  "main": "expo-router/entry"
}
```

2. Create an `app` directory at the root of your project. This is where all your route files will live.

3. Create an initial route file at `app/index.tsx`:

```tsx
import { View, Text, StyleSheet } from 'react-native';

export default function Home() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to MedTrack</Text>
      <Text style={styles.subtitle}>Your medication tracking app</Text>
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
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18,
    color: '#666',
  },
});
```

4. Create a root layout file at `app/_layout.tsx`:

```tsx
import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: 'Home' }} />
    </Stack>
  );
}
```

## File Structure and Routing

Expo Router uses a convention-based file structure to define routes:

- Files in the `app` directory become routes
- The file name determines the route path
- Nested directories create nested routes
- Special file names have specific meanings

### Basic Route Structure

```
app/
├── _layout.tsx      # Root layout
├── index.tsx        # Home screen (/)
├── medications/
│   ├── _layout.tsx  # Medications layout
│   ├── index.tsx    # Medications list (/medications)
│   └── [id].tsx     # Medication detail (/medications/123)
├── prescriptions/
│   ├── index.tsx    # Prescriptions list (/prescriptions)
│   └── [id].tsx     # Prescription detail (/prescriptions/456)
└── profile.tsx      # Profile screen (/profile)
```

### Special Files

- `_layout.tsx`: Defines the layout for the current directory and its children
- `index.tsx`: The default route for a directory
- `[param].tsx`: Dynamic route with a parameter (e.g., `[id].tsx` matches `/medications/123`)
- `[...rest].tsx`: Catch-all route that matches any remaining segments

## Implementing Navigation Patterns

### Stack Navigation

Stack navigation is implemented using the `Stack` component from Expo Router:

```tsx
// app/_layout.tsx
import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen 
        name="index" 
        options={{ 
          title: 'Home',
          headerStyle: { backgroundColor: '#f4511e' },
          headerTintColor: '#fff',
        }} 
      />
      <Stack.Screen 
        name="medications/index" 
        options={{ title: 'Medications' }} 
      />
      <Stack.Screen 
        name="medications/[id]" 
        options={({ route }) => ({ 
          title: `Medication ${route.params.id}` 
        })} 
      />
    </Stack>
  );
}
```

### Tab Navigation

Tab navigation is implemented using the `Tabs` component:

```tsx
// app/(tabs)/_layout.tsx
import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function TabsLayout() {
  return (
    <Tabs>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => (
            <Ionicons name="home" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="medications"
        options={{
          title: 'Medications',
          tabBarIcon: ({ color }) => (
            <Ionicons name="medical" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color }) => (
            <Ionicons name="person" size={24} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
```

### Drawer Navigation

Drawer navigation is implemented using the `Drawer` component:

```tsx
// app/_layout.tsx
import { Drawer } from 'expo-router/drawer';
import { Ionicons } from '@expo/vector-icons';

export default function DrawerLayout() {
  return (
    <Drawer>
      <Drawer.Screen
        name="index"
        options={{
          title: 'Home',
          drawerIcon: ({ color }) => (
            <Ionicons name="home" size={24} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="medications"
        options={{
          title: 'Medications',
          drawerIcon: ({ color }) => (
            <Ionicons name="medical" size={24} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="profile"
        options={{
          title: 'Profile',
          drawerIcon: ({ color }) => (
            <Ionicons name="person" size={24} color={color} />
          ),
        }}
      />
    </Drawer>
  );
}
```

### Modal Navigation

Modal screens can be implemented using the `(modal)` directory convention:

```tsx
// app/(modal)/add-medication.tsx
import { View, Text, Button, StyleSheet } from 'react-native';
import { router } from 'expo-router';

export default function AddMedicationModal() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add New Medication</Text>
      <Button title="Close" onPress={() => router.back()} />
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
```

## Navigation and Routing

### Navigating Between Screens

Expo Router provides the `router` object for programmatic navigation:

```tsx
import { router } from 'expo-router';

// Navigate to a specific route
router.push('/medications');

// Navigate to a dynamic route with parameters
router.push({
  pathname: '/medications/[id]',
  params: { id: '123' }
});

// Replace the current screen
router.replace('/medications');

// Go back to the previous screen
router.back();
```

### Using Links

For declarative navigation, use the `Link` component:

```tsx
import { Link } from 'expo-router';
import { View, Text, StyleSheet } from 'react-native';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Home Screen</Text>
      
      <Link href="/medications" style={styles.link}>
        View Medications
      </Link>
      
      <Link 
        href={{
          pathname: '/medications/[id]',
          params: { id: '123' }
        }} 
        style={styles.link}
      >
        View Specific Medication
      </Link>
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
  link: {
    color: 'blue',
    fontSize: 16,
    marginVertical: 8,
  },
});
```

### Accessing Route Parameters

Route parameters can be accessed using the `useLocalSearchParams` hook:

```tsx
// app/medications/[id].tsx
import { View, Text, StyleSheet } from 'react-native';
import { useLocalSearchParams } from 'expo-router';

export default function MedicationDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Medication Details</Text>
      <Text style={styles.detail}>Medication ID: {id}</Text>
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
```

## Deep Linking

Expo Router provides built-in support for deep linking, allowing users to open your app directly to a specific screen.

### Configuring Deep Links

1. Update your `app.json` to include the scheme:

```json
{
  "expo": {
    "scheme": "medtrack",
    "ios": {
      "bundleIdentifier": "com.yourcompany.medtrack"
    },
    "android": {
      "package": "com.yourcompany.medtrack"
    }
  }
}
```

2. Define URL patterns in your `app.json`:

```json
{
  "expo": {
    "scheme": "medtrack",
    "plugins": [
      [
        "expo-router",
        {
          "origin": "https://medtrack.example.com"
        }
      ]
    ]
  }
}
```

### Testing Deep Links

You can test deep links using the following formats:

- `medtrack://medications/123` (Custom scheme)
- `https://medtrack.example.com/medications/123` (Universal link)

## Type-Safe Navigation with TypeScript

### Defining Route Types

Create a type definition file for your routes:

```tsx
// app/types.ts
export type AppRoutes = {
  '/': undefined;
  '/medications': undefined;
  '/medications/[id]': { id: string };
  '/prescriptions': undefined;
  '/prescriptions/[id]': { id: string };
  '/profile': undefined;
};
```

### Type-Safe Navigation

Use the route types with the router:

```tsx
import { router } from 'expo-router';
import type { AppRoutes } from './types';

// Type-safe navigation
function navigateToMedication(id: string) {
  router.push<keyof AppRoutes>({
    pathname: '/medications/[id]',
    params: { id }
  });
}
```

### Type-Safe Parameters

Use the route types with the `useLocalSearchParams` hook:

```tsx
import { useLocalSearchParams } from 'expo-router';
import type { AppRoutes } from './types';

function MedicationDetailScreen() {
  // Type-safe parameters
  const { id } = useLocalSearchParams<AppRoutes['/medications/[id]']>();
  
  return (
    // ...
  );
}
```

## Best Practices for Expo Router

1. **Organize routes logically**: Group related routes in directories
2. **Use descriptive file names**: Make file names clear and meaningful
3. **Keep components focused**: Each route file should focus on a single screen
4. **Extract shared layouts**: Use layout files to avoid duplication
5. **Implement proper error handling**: Add error boundaries and fallback screens
6. **Use TypeScript**: Define route types for type safety
7. **Test deep links**: Ensure deep links work correctly
8. **Consider performance**: Lazy load screens when possible

## Exercise: Building a Medication App with Expo Router

Create a simple medication tracking app with the following routes:

1. Home screen (`/`)
2. Medications list (`/medications`)
3. Medication detail (`/medications/[id]`)
4. Add medication modal (`/add-medication`)
5. Profile screen (`/profile`)

Implement:
- Tab navigation for main screens
- Stack navigation within tabs
- A modal for adding medications
- Type-safe navigation with TypeScript

## Next Steps

In the next section, we'll explore React Navigation, an alternative approach to navigation in React Native applications.

## Additional Resources

- [Expo Router Documentation](https://docs.expo.dev/router/introduction/)
- [Expo Router GitHub Repository](https://github.com/expo/router)
- [File-based Routing in React Native](https://blog.expo.dev/file-based-routing-in-react-native-with-expo-router-f02274c59176)
- [Deep Linking with Expo Router](https://docs.expo.dev/router/reference/deep-linking/)
