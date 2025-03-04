# React Native Environment Setup: Cheat Sheet

This cheat sheet provides quick reference information for the React Native environment setup process.

## Node.js and npm

| Command | Description |
|---------|-------------|
| `node -v` | Check Node.js version |
| `npm -v` | Check npm version |
| `nvm install 16` | Install Node.js v16 with nvm |
| `nvm use 16` | Switch to Node.js v16 |
| `npm install -g npm@latest` | Update npm to latest version |
| `npm cache clean --force` | Clear npm cache |

## Expo CLI

| Command | Description |
|---------|-------------|
| `npx create-expo-app@latest MyApp` | Create a new Expo app |
| `npx create-expo-app@latest MyApp --template blank` | Create a new Expo app with blank template |
| `npx create-expo-app@latest MyApp --template blank-typescript` | Create a new Expo app with TypeScript |
| `npx expo start` | Start the development server |
| `npx expo start --clear` | Start with cleared cache |
| `npx expo start --ios` | Start and open in iOS Simulator |
| `npx expo start --android` | Start and open in Android Emulator |
| `npx expo start --web` | Start and open in web browser |
| `npx expo start --tunnel` | Start with tunnel connection |
| `npx expo doctor` | Run diagnostics on project |
| `npx expo upgrade` | Upgrade Expo SDK version |
| `npx expo install [package]` | Install compatible package version |

## iOS Development

| Command | Description |
|---------|-------------|
| `xcode-select --install` | Install Xcode Command Line Tools |
| `sudo xcode-select --reset` | Reset Xcode path |
| `xcrun simctl list devices` | List available iOS simulators |
| `xcrun simctl boot "iPhone 14"` | Boot specific iOS simulator |
| `open -a Simulator` | Open iOS Simulator directly |
| `xcrun simctl shutdown all` | Shut down all simulators |
| `xcrun simctl erase all` | Reset all simulators |

## Android Development

| Command | Description |
|---------|-------------|
| `adb devices` | List connected Android devices |
| `adb start-server` | Start ADB server |
| `adb kill-server` | Kill ADB server |
| `adb logcat` | View Android device logs |
| `adb logcat *:E` | View only error logs |
| `adb reverse tcp:8081 tcp:8081` | Forward ports for device connection |
| `adb install app.apk` | Install APK on connected device |
| `emulator -list-avds` | List available Android emulators |
| `emulator -avd <avd_name>` | Start specific Android emulator |

## Environment Variables

### macOS/Linux

```bash
# Node.js
export NODE_OPTIONS=--max_old_space_size=4096

# Android SDK
export ANDROID_HOME=$HOME/Library/Android/sdk
export PATH=$PATH:$ANDROID_HOME/emulator
export PATH=$PATH:$ANDROID_HOME/tools
export PATH=$PATH:$ANDROID_HOME/tools/bin
export PATH=$PATH:$ANDROID_HOME/platform-tools
```

### Windows

```bash
# Node.js
set NODE_OPTIONS=--max_old_space_size=4096

# Android SDK
set ANDROID_HOME=%USERPROFILE%\AppData\Local\Android\Sdk
set PATH=%PATH%;%ANDROID_HOME%\emulator
set PATH=%PATH%;%ANDROID_HOME%\tools
set PATH=%PATH%;%ANDROID_HOME%\tools\bin
set PATH=%PATH%;%ANDROID_HOME%\platform-tools
```

## App Configuration

### Essential app.json Fields

```json
{
  "expo": {
    "name": "My App",
    "slug": "my-app",
    "version": "1.0.0",
    "orientation": "portrait",
    "icon": "./assets/icon.png",
    "splash": {
      "image": "./assets/splash.png",
      "resizeMode": "contain",
      "backgroundColor": "#ffffff"
    },
    "updates": {
      "fallbackToCacheTimeout": 0
    },
    "assetBundlePatterns": [
      "**/*"
    ],
    "ios": {
      "supportsTablet": true,
      "bundleIdentifier": "com.yourcompany.myapp"
    },
    "android": {
      "adaptiveIcon": {
        "foregroundImage": "./assets/adaptive-icon.png",
        "backgroundColor": "#FFFFFF"
      },
      "package": "com.yourcompany.myapp"
    }
  }
}
```

### Dynamic app.config.js

```jsx
export default ({config}) => {
  return {
    ...config,
    name: process.env.APP_ENV === 'production' ? 'MyApp' : 'MyApp (Dev)',
    extra: {
      apiUrl: process.env.API_URL || 'https://api.default.com',
      enableAnalytics: process.env.ENABLE_ANALYTICS === 'true'
    }
  };
};
```

## Environment Files

### .env Example

```
# .env.development
API_URL=https://dev-api.example.com
DEBUG_MODE=true

# .env.production
API_URL=https://api.example.com
DEBUG_MODE=false
```

### babel.config.js for Environment Variables

```jsx
module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      ["module:react-native-dotenv", {
        "envName": "APP_ENV",
        "moduleName": "@env",
        "path": ".env"
      }]
    ]
  };
};
```

## Project Structure Guide

```
MyApp/
├── app/                     # Expo Router screens
│   ├── _layout.tsx          # Root layout
│   └── index.tsx            # Home screen
├── src/                     # Source code
│   ├── components/          # Reusable components
│   ├── hooks/               # Custom React hooks
│   ├── services/            # API services
│   └── utils/               # Utility functions
├── assets/                  # Static assets
├── app.json                 # Expo configuration
└── package.json             # Dependencies
```

## Development Workflow

### Setup Script (setup.sh)

```bash
#!/bin/bash
# Install dependencies
npm install

# Install global tools
npm install -g expo-cli

# Setup environment variables
cp .env.example .env.development

# Verify installation
npx expo doctor

echo "Setup completed successfully!"
```

### Clean Script (clean.sh)

```bash
#!/bin/bash
# Remove build artifacts and caches
rm -rf node_modules
rm -rf .expo
rm -rf web-build

# Clear npm cache
npm cache clean --force

# Reinstall dependencies
npm install

echo "Clean completed successfully!"
```

## Common Status/Error Codes

| Code | Description | Solution |
|------|-------------|----------|
| `E EADDRINUSE: address already in use ::8081` | Port 8081 is already in use | Kill the process or use a different port |
| `Unable to resolve module...` | Module not found | Check import path or install missing package |
| `Error: SDK location not found` | Android SDK path not set | Set ANDROID_HOME environment variable |
| `Error: spawn ./gradlew EACCES` | Gradle wrapper not executable | Run `chmod +x android/gradlew` |
| `Building JavaScript bundle: error` | JavaScript syntax error | Check console for details on the syntax error |
| `No bundle URL present` | Metro bundler not running or unreachable | Ensure Metro is running and device can connect |

## Recommended VS Code Extensions

| Extension | Purpose |
|-----------|---------|
| React Native Tools | IntelliSense and debugging |
| ES7+ React/Redux/React-Native snippets | Code snippets |
| ESLint | Code linting |
| Prettier | Code formatting |
| Color Highlight | Preview colors in code |
| Error Lens | Inline error display |
| Path Intellisense | Autocomplete filenames |
| Import Cost | Display import size |

## Debugging Tools

| Tool | Description |
|------|-------------|
| `console.log()` | Basic logging to Metro console |
| [Flipper](https://fbflipper.com/) | Desktop debugging platform |
| React DevTools | Component inspection |
| Chrome DevTools | JavaScript debugging |
| Expo DevTools | Expo-specific debugging |
| [React Native Debugger](https://github.com/jhen0409/react-native-debugger) | Standalone app with integrated DevTools |

## Example Alias Configuration

### Metro Config (metro.config.js)

```jsx
const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Add any custom configuration
config.resolver.sourceExts = ['jsx', 'js', 'ts', 'tsx', 'json'];

module.exports = config;
```

### TypeScript Config (tsconfig.json)

```jsx
{
  "extends": "expo/tsconfig.base",
  "compilerOptions": {
    "strict": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"],
      "@components/*": ["src/components/*"],
      "@hooks/*": ["src/hooks/*"],
      "@services/*": ["src/services/*"]
    }
  }
}
```

## Common Environment Issues by Platform

### macOS

- Xcode Command Line Tools not installed
- Watchman not installed
- Permissions issues with npm global packages

### Windows

- Long path issues with node_modules
- PowerShell execution policy restrictions
- Android SDK environment variables not set

### Linux

- Missing build dependencies
- File watching limits too low
- Incorrect permissions on Android SDK files

## Useful Troubleshooting Commands

```bash
# Check network connections
lsof -i :8081
netstat -ano | findstr :8081

# Check for file changes not being detected
echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf
sudo sysctl -p

# Verify global npm packages
npm list -g --depth=0

# Check React Native environment info
npx react-native info

# Test network connectivity
curl -I https://api.example.com
``` 