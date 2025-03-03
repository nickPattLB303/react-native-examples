# Module 2 Challenge: Environment Setup and Workflow Mastery - Complete

## Part 1: Project Configuration

### Task 1: Project Structure
```bash
# Create the project
npx create-expo-app@latest PharmacyApp --template blank-typescript

# Navigate to project directory
cd PharmacyApp

# Install additional dependencies
npx expo install @react-navigation/native @react-navigation/stack expo-camera expo-notifications @react-native-async-storage/async-storage
```

Configuration in `app.json`:
```json
{
  "expo": {
    "name": "Pharmacy Management",
    "slug": "pharmacy-management",
    "version": "1.0.0",
    "orientation": "portrait",
    "icon": "./assets/icon.png",
    "userInterfaceStyle": "light",
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
      "bundleIdentifier": "com.yourcompany.pharmacymanagement",
      "infoPlist": {
        "NSCameraUsageDescription": "This app uses the camera to scan prescription barcodes",
        "NSPhotoLibraryUsageDescription": "This app needs access to photos for prescription images",
        "NSLocationWhenInUseUsageDescription": "This app uses your location to find nearby pharmacies"
      }
    },
    "android": {
      "adaptiveIcon": {
        "foregroundImage": "./assets/adaptive-icon.png",
        "backgroundColor": "#FFFFFF"
      },
      "package": "com.yourcompany.pharmacymanagement",
      "permissions": [
        "CAMERA",
        "ACCESS_FINE_LOCATION",
        "VIBRATE"
      ]
    }
  }
}
```

### Task 2: Custom Scripts
```json
{
  "scripts": {
    "start": "expo start",
    "android": "expo start --android",
    "ios": "expo start --ios",
    "web": "expo start --web",
    "test": "jest",
    "lint": "eslint .",
    "type-check": "tsc",
    "clean": "rm -rf node_modules && npm install",
    "clean:cache": "expo start --clear",
    "doctor": "expo doctor",
    "build:ios": "expo build:ios",
    "build:android": "expo build:android",
    "env:dev": "NODE_ENV=development expo start",
    "env:prod": "NODE_ENV=production expo start"
  }
}
```

## Part 2: Environment Troubleshooting Guide

```markdown
# Environment Troubleshooting Guide

## Issue 1: Metro Bundler Port Conflict
### Symptoms:
- Error: "Port 8081 already in use"
- Metro bundler fails to start
### Diagnosis:
```bash
# Check what's using port 8081
lsof -i :8081
# or on Windows
netstat -ano | findstr :8081
```
### Resolution:
1. Kill existing process:
   ```bash
   kill -9 <PID>
   ```
2. Use different port:
   ```bash
   npx expo start --port 8082
   ```

## Issue 2: iOS Simulator Launch Failure
### Symptoms:
- "Simulator not found" error
- Xcode build fails
### Diagnosis:
```bash
xcrun simctl list devices
xcode-select -p
```
### Resolution:
1. Reset Xcode tools:
   ```bash
   sudo xcode-select --reset
   ```
2. Reinstall Command Line Tools:
   ```bash
   xcode-select --install
   ```

## Issue 3: Expo Go Network Connection
### Symptoms:
- QR code scan fails
- "Unable to connect to development server"
### Diagnosis:
1. Check network connection
2. Verify same WiFi network
3. Check firewall settings
### Resolution:
1. Use tunnel connection:
   ```bash
   npx expo start --tunnel
   ```
2. Try direct URL input in Expo Go
3. Connect via USB and enable ADB

## Issue 4: Node Dependencies
### Symptoms:
- npm install fails
- Peer dependency conflicts
### Diagnosis:
```bash
npm ls
npm audit
```
### Resolution:
1. Clear npm cache:
   ```bash
   npm cache clean --force
   ```
2. Delete node_modules:
   ```bash
   rm -rf node_modules
   npm install
   ```
3. Use correct Node version:
   ```bash
   nvm use 16
   ```

## Issue 5: Android ADB
### Symptoms:
- "Command not found: adb"
- Android device not detected
### Diagnosis:
```bash
echo $ANDROID_HOME
which adb
```
### Resolution:
1. Set environment variables:
   ```bash
   export ANDROID_HOME=$HOME/Library/Android/sdk
   export PATH=$PATH:$ANDROID_HOME/platform-tools
   ```
2. Install platform-tools:
   ```bash
   sdkmanager "platform-tools"
   ```
```

## Part 3: Development Workflow

### Task 1: Development Tools Setup

```markdown
# Development Tools Setup

## React Native DevTools
1. Installation:
   ```bash
   npm install -g react-devtools
   ```
2. Configuration:
   - Add to package.json:
     ```json
     {
       "scripts": {
         "devtools": "react-devtools"
       }
     }
     ```
3. Usage:
   - Start DevTools: `npm run devtools`
   - Connect to running app
   - Use Component Inspector
   - Monitor Performance

## Debugging Configuration
1. Setup:
   - Enable Remote Debugging in Expo Go
   - Configure Chrome DevTools
   - Set up VS Code debugging

2. Configuration:
   ```json
   // .vscode/launch.json
   {
     "version": "0.2.0",
     "configurations": [
       {
         "name": "Debug React Native",
         "request": "launch",
         "type": "reactnative",
         "cwd": "${workspaceFolder}",
         "platform": "ios"
       }
     ]
   }
   ```

## Environment Configuration
1. Development:
   ```typescript
   // config/env.ts
   const ENV = {
     dev: {
       apiUrl: 'http://localhost:3000',
       enableLogging: true,
     },
     prod: {
       apiUrl: 'https://api.pharmacy.com',
       enableLogging: false,
     }
   };
   ```

2. Production:
   - Use environment variables
   - Configure build settings
   - Set up CI/CD pipeline
```

### Task 2: Developer Workflow Checklist

```markdown
# Developer Workflow Checklist

## Environment Setup
- [ ] Node.js v16+ installed
- [ ] npm v8+ installed
- [ ] Expo CLI installed globally
- [ ] Xcode 13+ (macOS)
- [ ] Android Studio (with SDK)
- [ ] JDK 11
- [ ] Git configured
- [ ] VS Code extensions installed
- [ ] Environment variables configured

## Project Setup
- [ ] Create new project with template
- [ ] Configure app.json
- [ ] Set up environment variables
- [ ] Install dependencies
- [ ] Configure TypeScript
- [ ] Set up linting and formatting
- [ ] Initialize Git repository
- [ ] Configure VS Code settings
- [ ] Set up testing framework

## Running Applications
- [ ] iOS simulator configured
- [ ] Android emulator created
- [ ] Physical iOS device setup
- [ ] Physical Android device setup
- [ ] Metro bundler working
- [ ] Hot reload functioning
- [ ] Debugging tools connected
- [ ] Network access configured

## Development Process
- [ ] Source control workflow
- [ ] Code review process
- [ ] Testing procedures
- [ ] Build process
- [ ] Deployment workflow
- [ ] Documentation updates
- [ ] Performance monitoring
- [ ] Error tracking
```

## Part 4: Project Structure Analysis

```markdown
# Project Structure Analysis

## Directory Structure
```
PharmacyApp/
├── app/                      # Expo Router app directory
│   ├── (auth)/              # Authentication routes
│   │   ├── login.tsx
│   │   └── register.tsx
│   ├── (tabs)/              # Main tab navigation
│   │   ├── home.tsx
│   │   ├── prescriptions.tsx
│   │   └── profile.tsx
│   ├── _layout.tsx          # Root layout
│   └── index.tsx            # Entry point
├── src/
│   ├── components/          # React components
│   │   ├── common/          # Shared components
│   │   └── features/        # Feature-specific components
│   ├── hooks/               # Custom React hooks
│   ├── services/           # API and external services
│   │   ├── api/           # API clients
│   │   └── storage/       # Local storage
│   ├── utils/             # Utility functions
│   └── types/             # TypeScript types
├── assets/                 # Static assets
│   ├── images/
│   ├── fonts/
│   └── icons/
├── config/                # Configuration files
│   ├── env.ts
│   └── constants.ts
├── app.json              # Expo configuration
├── babel.config.js       # Babel configuration
├── tsconfig.json         # TypeScript configuration
└── package.json          # Dependencies and scripts
```

## Entry Point Analysis
1. `app/index.tsx`:
   - Root component
   - Initial route
   - Global providers

2. `app/_layout.tsx`:
   - Navigation container
   - Theme provider
   - Authentication flow

3. Configuration Files:
   - app.json → Expo configuration
   - babel.config.js → Transpilation
   - tsconfig.json → TypeScript settings

## Build Process
1. Development Build:
   - Metro bundler starts
   - TypeScript compilation
   - Asset bundling
   - Hot reload enabled

2. Production Build:
   - Environment variables set
   - Code optimization
   - Asset optimization
   - Native build process

3. Platform Differences:
   - iOS: Xcode build process
   - Android: Gradle build process
   - Web: Webpack configuration
```

## Part 5: Setup Documentation

```markdown
# Development Environment Setup Guide

## Prerequisites
- macOS 12.0+ (for iOS development)
- Xcode 13.0+
- Android Studio Arctic Fox+
- Node.js 16.0+
- npm 8.0+
- Git 2.0+

## Installation Steps
1. Node.js and npm:
   ```bash
   brew install node
   ```

2. Xcode:
   - Install from App Store
   - Install Command Line Tools:
     ```bash
     xcode-select --install
     ```

3. Android Studio:
   - Download and install
   - Install SDK components:
     - Android SDK
     - SDK Platform
     - SDK Tools
     - Emulator

4. Environment Variables:
   ```bash
   # Add to ~/.zshrc or ~/.bash_profile
   export ANDROID_HOME=$HOME/Library/Android/sdk
   export PATH=$PATH:$ANDROID_HOME/platform-tools
   export PATH=$PATH:$ANDROID_HOME/tools
   ```

5. Expo CLI:
   ```bash
   npm install -g expo-cli
   ```

## Environment Variables
```bash
# Development
export API_URL=http://localhost:3000
export ENABLE_LOGGING=true

# Production
export API_URL=https://api.pharmacy.com
export ENABLE_LOGGING=false
```

## Pharmacy-Specific Configuration

1. Camera Configuration
   ```json
   // app.json
   {
     "expo": {
       "plugins": [
         [
           "expo-camera",
           {
             "cameraPermission": "Allow $(PRODUCT_NAME) to access your camera for prescription scanning"
           }
         ]
       ]
     }
   }
   ```

2. Push Notifications
   ```typescript
   // src/services/notifications.ts
   import * as Notifications from 'expo-notifications';

   Notifications.setNotificationHandler({
     handleNotification: async () => ({
       shouldShowAlert: true,
       shouldPlaySound: true,
       shouldSetBadge: true,
     }),
   });
   ```

3. Secure Storage
   ```typescript
   // src/services/storage.ts
   import * as SecureStore from 'expo-secure-store';

   export async function saveSecureData(key: string, value: string) {
     await SecureStore.setItemAsync(key, value);
   }

   export async function getSecureData(key: string) {
     return await SecureStore.getItemAsync(key);
   }
   ```
```

## Additional Security Considerations

1. Data Encryption:
   - Use encryption for sensitive data
   - Implement secure communication
   - Handle authentication tokens securely

2. Compliance:
   - HIPAA compliance measures
   - Data privacy regulations
   - Security audit procedures

3. Error Handling:
   - Graceful error recovery
   - User data protection
   - Secure error logging

## Testing and Verification

1. Environment Tests:
   ```bash
   # Verify installations
   node --version
   npm --version
   expo --version
   
   # Test simulators
   xcrun simctl list devices
   emulator -list-avds
   ```

2. Application Tests:
   ```bash
   # Run type checking
   npm run type-check
   
   # Run tests
   npm test
   
   # Run linting
   npm run lint
   ```

3. Security Tests:
   - Run security audit
   - Test secure storage
   - Verify permissions
``` 