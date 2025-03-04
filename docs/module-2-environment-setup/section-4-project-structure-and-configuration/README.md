# Section 4: Project Structure and Configuration

## Learning Objectives
After completing this section, you will be able to:
- Understand the core files and directories in React Native projects
- Configure your application using app.json and package.json
- Implement advanced configuration options in Expo projects
- Optimize your development workflow with environment configuration
- Create a scalable project structure for large applications

**Prerequisite Knowledge**: Sections 1-3 completion
**Estimated Time**: 30-45 minutes

## Introduction to React Native Project Structure

Understanding the project structure of a React Native application is essential for efficient development. In this section, we'll explore the default structure of Expo projects and how to configure them for different scenarios.

> 🔄 **For Web Developers**: While this structure shares some similarities with React web applications, there are several mobile-specific files and configurations.

> 🔄 **For iOS Developers**: You'll notice that much of the native iOS configuration is abstracted away by Expo, though we'll discuss how to access and modify it when needed.

> 🔄 **For Android Developers**: Similar to iOS, Expo manages most of the Android configuration, but we'll cover how to customize Android-specific behavior.

## Core Project Structure

Let's examine the core project structure created by Expo (using the 'expo-router' template):

```
MyPharmacyApp/
├── .expo/               # Expo configuration and metadata
├── .vscode/             # VS Code specific configuration
├── app/                 # Main application directory (expo-router)
│   ├── _layout.tsx      # Root layout component
│   ├── index.tsx        # Main entry point screen
│   └── [...missing].tsx # Fallback route 
├── assets/              # Static assets like images, fonts, etc.
├── babel.config.js      # Babel transpiler configuration
├── app.json             # Expo configuration file
├── package.json         # NPM package and script definitions
├── tsconfig.json        # TypeScript configuration
└── node_modules/        # Third-party dependencies
```

### Deep Dive: Key Files and Directories

#### app/ Directory

This is where your application code lives when using Expo Router. Each file in this directory becomes a route in your application.

```tsx
// app/index.tsx - Main entry point
import { View, Text, StyleSheet } from 'react-native';

export default function HomePage() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to MyPharmacyApp</Text>
      <Text style={styles.subtitle}>Your digital pharmacy solution</Text>
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

#### assets/ Directory

The assets folder contains static resources such as:
- Images
- Fonts
- JSON data files
- Sound files

These are bundled with your application and can be accessed via imports or the `require` function:

```jsx
// Importing an image
import logo from '../assets/logo.png';

// Using require
const logo = require('../assets/logo.png');
```

> 💡 **Deep Dive**: When you build your app, the Metro bundler processes these assets and includes them in the application bundle. For web developers, this is similar to how webpack handles assets, but Metro is optimized for React Native.

#### app.json

This file contains the configuration for your Expo project. It defines how your app behaves, looks, and is built. Let's explore the key configurations:

```json
{
  "expo": {
    "name": "MyPharmacyApp",
    "slug": "mypharmacyapp",
    "version": "1.0.0",
    "orientation": "portrait",
    "icon": "./assets/icon.png",
    "userInterfaceStyle": "light",
    "splash": {
      "image": "./assets/splash.png",
      "resizeMode": "contain",
      "backgroundColor": "#ffffff"
    },
    "assetBundlePatterns": [
      "**/*"
    ],
    "ios": {
      "supportsTablet": true
    },
    "android": {
      "adaptiveIcon": {
        "foregroundImage": "./assets/adaptive-icon.png",
        "backgroundColor": "#ffffff"
      }
    },
    "web": {
      "favicon": "./assets/favicon.png"
    },
    "plugins": [
      "expo-router"
    ]
  }
}
```

Key fields include:
- **name**: The user-facing name of your app
- **slug**: A URL-friendly name for your project
- **version**: The version of your app
- **orientation**: Supported device orientations
- **icon**: The app icon image
- **splash**: Configuration for the splash screen
- **ios/android/web**: Platform-specific configurations

> 🔄 **For iOS Developers**: The `ios` section is where you can specify iOS-specific configuration like bundle identifier, buildNumber, and more.

> 🔄 **For Android Developers**: The `android` section allows you to configure Android-specific settings like package name, versionCode, and permissions.

#### package.json

This file defines your project's dependencies and scripts:

```json
{
  "name": "mypharmacyapp",
  "version": "1.0.0",
  "main": "expo-router/entry",
  "scripts": {
    "start": "expo start",
    "android": "expo start --android",
    "ios": "expo start --ios",
    "web": "expo start --web"
  },
  "dependencies": {
    "expo": "~49.0.13",
    "expo-status-bar": "~1.6.0",
    "react": "18.2.0",
    "react-native": "0.72.5",
    "expo-router": "^2.0.0",
    "react-native-safe-area-context": "4.6.3",
    "react-native-screens": "~3.22.0",
    "expo-linking": "~5.0.2",
    "expo-constants": "~14.4.2"
  },
  "devDependencies": {
    "@babel/core": "^7.20.0",
    "@types/react": "~18.2.14",
    "typescript": "^5.1.3"
  },
  "private": true
}
```

Key sections include:
- **name/version**: Project identifiers
- **main**: The entry point for your application
- **scripts**: NPM scripts for common tasks
- **dependencies**: Production dependencies
- **devDependencies**: Development-only dependencies

## Configuring Your Application

Let's explore how to configure your application for different environments and requirements.

### Environment Configuration

For managing environment-specific variables (development, staging, production), you can use different approaches:

#### Using environment files with dotenv

1. Install required packages:
```bash
npx expo install react-native-dotenv
```

2. Create `.env` files for different environments:
```
# .env.development
API_URL=https://dev-api.pharmacyapp.com
DEBUG_MODE=true

# .env.production
API_URL=https://api.pharmacyapp.com
DEBUG_MODE=false
```

3. Configure babel to use these files:
```jsx
// babel.config.js
module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      ["module:react-native-dotenv", {
        "envName": "APP_ENV",
        "moduleName": "@env",
        "path": ".env",
        "blocklist": null,
        "allowlist": null,
        "safe": false,
        "allowUndefined": true,
        "verbose": false
      }]
    ]
  };
};
```

4. Use environment variables in your code:
```jsx
import { API_URL, DEBUG_MODE } from '@env';

console.log(`API URL: ${API_URL}`);
console.log(`Debug Mode: ${DEBUG_MODE}`);
```

> 💡 **Deep Dive**: Unlike web applications where environment variables are processed at build time, React Native needs to bundle these variables directly into your JavaScript code. This is why we use the babel plugin approach.

### App Configuration with app.json and app.config.js

For more dynamic configuration, you can use app.config.js instead of app.json:

```jsx
// app.config.js
export default {
  name: "MyPharmacyApp",
  slug: "mypharmacyapp",
  version: "1.0.0",
  orientation: "portrait",
  // Dynamic configuration based on environment
  extra: {
    apiUrl: process.env.API_URL || "https://api.pharmacyapp.com",
    debugMode: process.env.DEBUG_MODE === "true"
  },
  // Rest of your configuration...
};
```

Access this configuration in your app using Expo's Constants:

```jsx
import Constants from 'expo-constants';

const { apiUrl, debugMode } = Constants.expoConfig.extra;
console.log(`API URL: ${apiUrl}`);
console.log(`Debug Mode: ${debugMode}`);
```

### Platform-Specific Configuration

You can configure different behavior for iOS and Android:

```jsx
// app.config.js
export default {
  // Common configuration...
  ios: {
    bundleIdentifier: "com.yourcompany.pharmacyapp",
    buildNumber: "1.0.0",
    infoPlist: {
      NSCameraUsageDescription: "This app uses the camera to scan prescriptions."
    }
  },
  android: {
    package: "com.yourcompany.pharmacyapp",
    versionCode: 1,
    permissions: ["CAMERA", "ACCESS_FINE_LOCATION"]
  }
};
```

> 🔄 **For iOS Developers**: The `infoPlist` section directly modifies your app's Info.plist file, allowing you to set permission strings and other iOS-specific configurations.

> 🔄 **For Android Developers**: The `permissions` array adds these permissions to your AndroidManifest.xml file, and the package name becomes your app's identifier.

## Advanced Configuration

### Plugins System

Expo 42+ introduced a powerful plugins system that allows for native code configuration without ejecting:

```jsx
// app.json or app.config.js
{
  "expo": {
    // Other configuration...
    "plugins": [
      [
        "expo-camera",
        {
          "cameraPermission": "Allow MyPharmacyApp to access your camera to scan prescriptions."
        }
      ],
      [
        "expo-location",
        {
          "locationWhenInUsePermission": "Allow MyPharmacyApp to use your location to find nearby pharmacies."
        }
      ]
    ]
  }
}
```

### Custom Build Configuration

For advanced scenarios, you can customize the native build process:

```jsx
// app.config.js
export default {
  // Other configuration...
  ios: {
    // Other iOS config...
    buildSettings: {
      CODE_SIGNING_ALLOWED: "NO"
    }
  },
  android: {
    // Other Android config...
    googleServicesFile: "./google-services.json",
    adaptiveIcon: {
      foregroundImage: "./assets/adaptive-icon.png",
      backgroundColor: "#FFFFFF"
    }
  }
};
```

## Recommended Project Structure for Production Apps

As your application grows, you'll need a more structured organization. Here's a recommended structure for larger applications:

```
MyPharmacyApp/
├── app/                     # Expo Router screens
│   ├── (tabs)/              # Tab-based navigation
│   ├── (auth)/              # Authentication screens
│   ├── (modals)/            # Modal screens
│   ├── _layout.tsx          # Root layout
│   └── index.tsx            # Home screen
├── src/                     # Source code
│   ├── components/          # Reusable components
│   │   ├── common/          # Shared UI components
│   │   └── features/        # Feature-specific components
│   ├── hooks/               # Custom React hooks
│   ├── services/            # API and service integrations
│   │   ├── api/             # API clients
│   │   └── storage/         # Local storage utilities
│   ├── store/               # State management
│   ├── utils/               # Utility functions
│   └── types/               # TypeScript type definitions
├── assets/                  # Static assets
│   ├── images/              # Image files
│   ├── fonts/               # Custom fonts
│   └── animations/          # Lottie animations
├── config/                  # Configuration files
│   ├── env/                 # Environment-specific configs
│   └── constants.ts         # App constants
└── docs/                    # Documentation
```

### Benefits of This Structure

This structured approach offers several advantages:

1. **Separation of Concerns**: Each directory has a clear purpose
2. **Scalability**: Easy to add new features without disrupting existing code
3. **Developer Experience**: Clear organization helps new team members understand the codebase
4. **Maintainability**: Isolates changes to specific areas of the application
5. **Testability**: Components and services are modular and easier to test

## Configuring TypeScript

TypeScript provides type safety for your React Native application. Here's how to configure it optimally:

```jsx
// tsconfig.json
{
  "extends": "expo/tsconfig.base",
  "compilerOptions": {
    "strict": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"],
      "@components/*": ["src/components/*"],
      "@hooks/*": ["src/hooks/*"],
      "@services/*": ["src/services/*"],
      "@utils/*": ["src/utils/*"],
      "@assets/*": ["assets/*"]
    }
  },
  "include": [
    "**/*.ts",
    "**/*.tsx",
    ".expo/types/**/*.ts",
    "expo-env.d.ts"
  ]
}
```

With this configuration, you can use path aliases for cleaner imports:

```tsx
// Instead of this
import { Button } from '../../../../components/common/Button';

// You can write this
import { Button } from '@components/common/Button';
```

To make these path aliases work with Babel, add the following to your babel.config.js:

```jsx
// babel.config.js
module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      // Other plugins...
      [
        'module-resolver',
        {
          root: ['./'],
          alias: {
            '@': './src',
            '@components': './src/components',
            '@hooks': './src/hooks',
            '@services': './src/services',
            '@utils': './src/utils',
            '@assets': './assets'
          }
        }
      ]
    ]
  };
};
```

> 🔄 **For Web Developers**: This path aliasing works similarly to webpack aliases in web development.

## Optimizing Configurations for Development Workflow

Here are some additional configurations to enhance your development workflow:

### Metro Configuration

Metro is React Native's JavaScript bundler. You can customize it for better performance:

```jsx
// metro.config.js
const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Add any custom configuration here
config.resolver.assetExts.push('cjs');

module.exports = config;
```

### ESLint Configuration

Set up ESLint for consistent code quality:

```jsx
// .eslintrc.js
module.exports = {
  root: true,
  extends: [
    'universe/native',
    'universe/shared/typescript-analysis'
  ],
  overrides: [
    {
      files: ['*.ts', '*.tsx', '*.d.ts'],
      parserOptions: {
        project: './tsconfig.json'
      }
    }
  ]
};
```

### Git Configuration

Create a comprehensive .gitignore file:

```
# .gitignore
node_modules/
.expo/
dist/
npm-debug.*
*.jks
*.p8
*.p12
*.key
*.mobileprovision
*.orig.*
web-build/
.env*
!.env.example

# macOS
.DS_Store

# VSCode
.vscode/*
!.vscode/extensions.json
!.vscode/settings.json

# Temporary files
*.log
```

## Summary

In this section, you've learned about:

1. The core structure of a React Native project using Expo
2. How to configure your application using app.json and app.config.js
3. Environment-specific configuration with dotenv
4. Platform-specific settings for iOS and Android
5. Advanced configuration using Expo's plugins system
6. A recommended project structure for larger applications
7. TypeScript configuration with path aliases
8. Additional configurations to optimize your development workflow

Understanding the project structure and configuration options is essential for creating maintainable, scalable React Native applications. This knowledge forms the foundation for effectively organizing your code and configuring your application for different environments and platforms.

Now that you've completed all four sections of Module 2, you're ready to take on the module challenge and apply what you've learned in a real-world scenario.

## Section 4 Exercise: Project Structure Documentation

**Objective**: Document and organize a React Native project structure for a pharmacy application.

**Tasks**:
1. Create a new default Expo project and examine its structure:
   ```bash
   npx create-expo-app ProjectStructureDemo
   cd ProjectStructureDemo
   ls -la
   ```

2. Create a comprehensive documentation file called `project-structure.md` that:
   - Lists all directories and files in the default project
   - Explains the purpose of each directory and key files
   - Documents what should and should not be committed to version control
   - Explains how the project structure supports the development workflow

3. Create an improved directory structure (empty directories are fine) for a pharmacy application with folders for:
   - Assets (images, fonts, etc.)
   - Configuration files
   - Documentation
   - Environment-specific settings

4. In your documentation, explain:
   - The rationale behind your structure choices
   - How the structure would support a pharmacy application's needs
   - Best practices for maintaining an organized project
   - Guidelines for where to place new files as the project grows

**Expected Output**:
- A documentation file describing the default and improved project structures
- An organized directory structure for a pharmacy application
- Guidelines for maintaining the project structure

**Hints**:
- Use tools like `find` or `ls -R` to explore the project structure
- Consider organizing by feature vs. organizing by file type
- Think about how the structure impacts developer workflow
- Consider scalability as the application grows

## Section 4 Exercise: Environment Management Setup

**Objective**: Configure environment management for a React Native Expo project.

**Tasks**:
1. In your Expo project, create an environment management setup:
   - Create a `.env.example` file with placeholder values for environment variables
   - Document the process for developers to set up their local environment
   - Create a simple README explaining how to use environment variables safely

2. Document different approaches to environment management in a file called `environment-management.md`:
   - Describe the pros and cons of using .env files
   - Explain how to handle sensitive information like API keys
   - Document how to switch between development, staging, and production environments
   - Explain the role of app.json and app.config.js in environment configuration

3. Create a developer onboarding guide called `developer-setup.md` that explains:
   - How to set up the development environment
   - How to configure environment variables
   - How to verify the environment is correctly set up
   - Common issues and their solutions

**Expected Output**:
- Environment configuration examples (.env.example)
- Environment management documentation
- Developer onboarding guide

**Hints**:
- Never commit actual .env files to version control
- Use .env.example to show which variables are needed
- Consider how environment variables differ from app configuration
- Think about how to make the setup process developer-friendly