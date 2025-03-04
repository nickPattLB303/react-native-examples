# First Expo Project Setup Exercise

## Instructions for Instructors
This file contains the instructions and evaluation criteria for creating and configuring a first Expo project. Students will create a new project and modify its configuration for a pharmacy application.

## Exercise Overview

### Scenario
You are starting development of a new pharmacy application using Expo. Create and configure a new project with the necessary settings and structure for a pharmacy management system.

### Time Allocation
- Project Creation: 15 minutes
- Configuration: 15 minutes
- Documentation: 15 minutes

## Part 1: Project Creation and Structure

### Task 1: Create New Project
Create a new Expo project with TypeScript support:

```bash
# Create new project
npx create-expo-app@latest PharmacyManager --template blank-typescript

# Navigate to project directory
cd PharmacyManager

# Initialize git repository
git init
```

### Task 2: Project Structure
Create the following directory structure:

```
PharmacyManager/
├── app/
│   ├── (auth)/
│   │   ├── login.tsx
│   │   └── register.tsx
│   ├── (tabs)/
│   │   ├── home.tsx
│   │   ├── inventory.tsx
│   │   └── prescriptions.tsx
│   └── _layout.tsx
├── assets/
│   ├── images/
│   │   ├── logo.png
│   │   └── icons/
│   └── fonts/
└── src/
    ├── components/
    │   ├── common/
    │   └── features/
    ├── services/
    ├── utils/
    └── types/
```

## Part 2: Configuration

### Task 1: Update app.json
Modify the app.json configuration for a pharmacy application:

```json
{
  "expo": {
    "name": "Pharmacy Manager",
    "slug": "pharmacy-manager",
    "version": "1.0.0",
    "orientation": "portrait",
    "icon": "./assets/images/icon.png",
    "userInterfaceStyle": "light",
    "splash": {
      "image": "./assets/images/splash.png",
      "resizeMode": "contain",
      "backgroundColor": "#ffffff"
    },
    "assetBundlePatterns": [
      "**/*"
    ],
    "ios": {
      "supportsTablet": true,
      "bundleIdentifier": "com.yourcompany.pharmacymanager"
    },
    "android": {
      "adaptiveIcon": {
        "foregroundImage": "./assets/images/adaptive-icon.png",
        "backgroundColor": "#ffffff"
      },
      "package": "com.yourcompany.pharmacymanager"
    }
  }
}
```

### Task 2: Configure TypeScript
Update tsconfig.json with appropriate settings:

```json
{
  "extends": "expo/tsconfig.base",
  "compilerOptions": {
    "strict": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"],
      "@components/*": ["src/components/*"],
      "@services/*": ["src/services/*"],
      "@utils/*": ["src/utils/*"],
      "@types/*": ["src/types/*"]
    }
  },
  "include": [
    "**/*.ts",
    "**/*.tsx",
    ".expo/types/**/*.ts",
    "expo-env.d.ts"
  ],
  "exclude": [
    "node_modules"
  ]
}
```

## Part 3: Initial Components

### Task 1: Create Layout Component
Create a basic layout component in `app/_layout.tsx`:

```tsx
import { Stack } from 'expo-router';
import { useColorScheme } from 'react-native';

export default function Layout() {
  const colorScheme = useColorScheme();

  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: colorScheme === 'dark' ? '#000' : '#fff',
        },
        headerTintColor: colorScheme === 'dark' ? '#fff' : '#000',
      }}
    />
  );
}
```

### Task 2: Create Home Screen
Create a basic home screen in `app/(tabs)/home.tsx`:

```tsx
import { View, Text, StyleSheet } from 'react-native';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pharmacy Manager</Text>
      <Text style={styles.subtitle}>Welcome to your digital pharmacy</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
  },
});
```

## Part 4: Documentation

Create a project documentation file named `PROJECT_SETUP.md`:

```markdown
# Pharmacy Manager Project Setup

## Project Structure
[Document your project structure and the purpose of each directory]

## Configuration
[Document your configuration choices and their purposes]

## Development Setup
[Document steps for other developers to set up the project]

## Available Scripts
[List and explain available npm scripts]

## Environment Setup
[Document any environment variables or settings needed]
```

## Evaluation Criteria

### Project Structure (30%)
- Proper directory organization
- Clear separation of concerns
- Logical file naming
- Appropriate component organization

### Configuration (30%)
- Complete app.json setup
- Proper TypeScript configuration
- Correct dependency management
- Environment configuration

### Code Quality (20%)
- TypeScript usage
- Component organization
- Code formatting
- Error handling

### Documentation (20%)
- Clear setup instructions
- Complete configuration documentation
- Well-organized structure
- Helpful examples

### Strong submissions should:
- Follow Expo best practices
- Include comprehensive documentation
- Have proper TypeScript configuration
- Demonstrate clear organization

### Weak submissions typically:
- Miss key configuration options
- Have poor directory structure
- Lack proper documentation
- Ignore TypeScript features

## Additional Notes for Instructors

When evaluating:
- Check project structure organization
- Verify TypeScript configuration
- Test build process
- Review documentation quality

## Submission Requirements
- Complete project structure
- Configuration files
- Initial components
- Project documentation
- Screenshots of running application 