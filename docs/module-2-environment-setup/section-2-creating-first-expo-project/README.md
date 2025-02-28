# Section 2: Creating Your First Expo Project

## Learning Objectives
After completing this section, you will be able to:
- Create a new React Native project using Expo
- Understand the options and templates available when creating projects
- Navigate and understand the project structure
- Make basic modifications to the default project
- Use Expo CLI commands to manage your project

**Prerequisite Knowledge**: Basic command line familiarity, Section 1 completion
**Estimated Time**: 20-30 minutes

## Introduction to Expo Projects

Expo provides a streamlined way to create, develop, and deploy React Native applications. In this section, we'll create a new Expo project and explore its structure and capabilities.

> 🔄 **For Web Developers**: Expo projects are similar to Create React App for web development, but with additional mobile-specific tools and configurations.

> 🔄 **For iOS/Android Developers**: Expo abstracts away much of the native configuration you're used to, allowing you to focus on the application logic rather than build configurations.

## Creating a New Expo Project

### Using `create-expo-app`

The recommended way to create a new Expo project is using the `create-expo-app` command-line tool. This tool sets up a new React Native project with the Expo framework pre-configured.

Open your terminal and run the following command:

```bash
npx create-expo-app@latest MyPharmacyApp
```

This command does several things:
1. Downloads and executes the latest version of `create-expo-app`
2. Creates a new directory called `MyPharmacyApp`
3. Initializes a new React Native project with Expo configuration
4. Installs all necessary dependencies

> 💡 **Deep Dive**: The `npx` command is part of npm (Node Package Manager) and allows you to run Node.js packages without installing them globally. When you run `npx create-expo-app`, it downloads the latest version of the package, runs it, and then removes it from your system. This ensures you always use the most recent version.

### Exploring Available Templates

Expo provides several templates that you can use as a starting point for your project. To see the available templates, you can run:

```bash
npx create-expo-app@latest --template
```

This will display a list of available templates. Some common templates include:

- **blank**: A minimal app with just the essentials
- **blank (TypeScript)**: Same as blank but with TypeScript configuration
- **tabs**: A tab-based navigation template
- **navigation**: A starter with React Navigation pre-configured

To create a project with a specific template, you can use:

```bash
npx create-expo-app@latest MyPharmacyApp --template blank
```

For this course, we'll use the default template, which is a good starting point for most applications.

## Navigating to Your Project

Once the project is created, navigate to the project directory:

```bash
cd MyPharmacyApp
```

## Understanding Project Structure

Let's explore the structure of the newly created Expo project:

```
MyPharmacyApp/
├── .expo/                  # Expo configuration files
├── .expo-shared/           # Expo shared configuration
├── assets/                 # Static assets like images, fonts, etc.
├── node_modules/           # External dependencies (npm packages)
├── app/                    # Main application code
│   ├── index.tsx           # Entry point of your app
│   ├── _layout.tsx         # Layout component for your app
├── .gitignore              # Git ignore file
├── app.json                # Expo configuration
├── babel.config.js         # Babel transpiler configuration
├── package.json            # Project metadata and dependencies
├── tsconfig.json           # TypeScript configuration (if using TypeScript)
└── README.md               # Project documentation
```

Let's examine the key files and directories:

### `app/` Directory

This is where your application code lives. The main components and screens of your application will be placed here.

#### `index.tsx`

This is the entry point of your application. It defines the main screen or component that is displayed when your app starts.

```jsx
import { StyleSheet, Text, View } from 'react-native';

export default function Index() {
  return (
    <View style={styles.container}>
      <Text>Hello world!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
```

> 💡 **Deep Dive**: React Native uses a component-based architecture similar to React for web, but with native components instead of DOM elements. When you define a `View` component in your code, it's rendered as a `UIView` on iOS and as an `android.view` on Android.

#### `_layout.tsx`

This file defines the layout for your application, including navigation elements.

### `assets/` Directory

This directory contains static assets used by your application, such as:
- Images
- Fonts
- Audio files
- Other static resources

### `app.json`

This file contains configuration for your Expo project, including:
- App name and version
- Splash screen configuration
- Icon settings
- Platform-specific settings
- Build configuration

Here's an example `app.json` file:

```json
{
  "expo": {
    "name": "MyPharmacyApp",
    "slug": "MyPharmacyApp",
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
    }
  }
}
```

> 💡 **Deep Dive**: The `app.json` file is used by Expo's build service to configure your app for different platforms. When you build your app for iOS, Android, or web, Expo reads this file to generate the appropriate native configuration files.

### `package.json`

This file contains metadata about your project and lists all dependencies. It also defines scripts for running and building your application.

```json
{
  "name": "MyPharmacyApp",
  "version": "1.0.0",
  "main": "index.js",
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
    "react-dom": "18.2.0",
    "react-native-web": "~0.19.6"
  },
  "devDependencies": {
    "@babel/core": "^7.20.0",
    "@types/react": "~18.2.14",
    "typescript": "^5.1.3"
  },
  "private": true
}
```

## Making Basic Modifications

Let's make some basic modifications to the default project to understand how to customize it.

### Changing the App Name and Display

1. Open `app.json` and update the name field:

```json
{
  "expo": {
    "name": "Pharmacy Management",
    "slug": "MyPharmacyApp",
    ...
  }
}
```

### Modifying the Default Screen

1. Open `app/index.tsx` and update the content:

```jsx
import { StyleSheet, Text, View } from 'react-native';

export default function Index() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pharmacy Management</Text>
      <Text style={styles.subtitle}>Welcome to your medication tracker</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#555',
  },
});
```

## Using Expo CLI Commands

Expo CLI provides several commands for managing your project:

### Starting Your Project

```bash
npx expo start
```

This command starts the Metro bundler and displays a QR code that you can scan with the Expo Go app on your mobile device.

> 💡 **Deep Dive**: When you run `npx expo start`, the Metro bundler creates a development server that:
> 1. Watches your files for changes
> 2. Bundles your JavaScript code
> 3. Serves the bundled code to your device or simulator
> 4. Enables features like Hot Reloading and debugging

### Platform-Specific Commands

To start your project on a specific platform:

```bash
npx expo start --ios     # Start on iOS simulator
npx expo start --android # Start on Android emulator
npx expo start --web     # Start in web browser
```

### Additional Useful Commands

```bash
npx expo doctor          # Check your project for issues
npx expo upgrade         # Upgrade to the latest Expo SDK
npx expo install         # Install Expo-compatible versions of packages
```

> 💡 **Tip**: Always use `npx expo install` instead of `npm install` when adding packages to your Expo project. This ensures that you get versions compatible with your Expo SDK version.

## Summary

In this section, you've learned how to create a new React Native project using Expo, understand its structure, make basic modifications, and use Expo CLI commands to manage your project.

The Expo framework provides a powerful set of tools and configurations that simplify React Native development, allowing you to focus on building your application rather than dealing with complex native configurations.

In the next section, we'll explore how to run your application on simulators and physical devices.

## Section 2 Exercise: Expo Project Configuration

**Objective**: Explore and document Expo project configuration options.

**Tasks**:
1. Create a new blank Expo project named "MedicineTracker":
   ```bash
   npx create-expo-app@latest MedicineTracker
   ```

2. Examine and document the default configuration in app.json. Create a documentation file called `default-configuration.md` that lists:
   - Each major section in app.json
   - The purpose of each configuration option
   - Which settings are platform-specific vs general

3. Modify the app.json file to include:
   - A custom app name and description
   - Support for both portrait and landscape orientations
   - Custom splash screen configuration
   - iOS configuration for tablet support
   - Android configuration with custom adaptive icon settings

4. Create a documentation file called `project-configuration.md` explaining:
   - Each configuration setting you modified
   - What each setting controls
   - Why you chose these specific configurations for a pharmacy app
   - How these settings affect the app behavior on different platforms

**Expected Output**:
- A properly configured Expo project
- Two documentation files (default-configuration.md and project-configuration.md)

**Hints**:
- For orientation, set `"orientation": "default"` in app.json to support both portrait and landscape
- For splash screen, you can modify the existing configuration:
  ```json
  "splash": {
    "image": "./assets/splash.png",
    "resizeMode": "contain",
    "backgroundColor": "#ffffff"
  }
  ```
- Read the Expo documentation on app.json configuration for additional options 