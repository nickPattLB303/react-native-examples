# Project Structure and Configuration Exercise

## Instructions for Instructors
This file contains the instructions and evaluation criteria for setting up a scalable project structure and configuration for a React Native pharmacy application.

## Exercise Overview

### Scenario
You are architecting a new pharmacy application and need to establish a scalable project structure with proper configuration for different environments. Create a comprehensive project setup that will support the application's growth.

### Time Allocation
- Project Structure: 20 minutes
- Configuration Setup: 20 minutes
- Documentation: 20 minutes

## Part 1: Project Structure

### Task 1: Create Base Structure
Set up a project structure that follows best practices:

```
PharmacyApp/
├── app/                      # Expo Router app directory
│   ├── (auth)/              # Authentication routes
│   ├── (tabs)/              # Main tab navigation
│   ├── (modals)/            # Modal screens
│   ├── _layout.tsx          # Root layout
│   └── index.tsx            # Entry point
├── src/                     # Source code
│   ├── components/          # React components
│   │   ├── common/          # Shared components
│   │   └── features/        # Feature-specific components
│   ├── hooks/               # Custom React hooks
│   ├── services/            # API and external services
│   │   ├── api/            # API clients
│   │   └── storage/        # Local storage
│   ├── utils/              # Utility functions
│   └── types/              # TypeScript types
├── assets/                  # Static assets
│   ├── images/             # Image files
│   ├── fonts/              # Custom fonts
│   └── icons/              # Icon assets
└── config/                 # Configuration files
    ├── env/               # Environment configs
    └── constants.ts       # App constants
```

### Task 2: Component Organization
Create template files for key components:

```tsx
// src/components/common/Button.tsx
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary';
}

export function Button({ title, onPress, variant = 'primary' }: ButtonProps) {
  return (
    <TouchableOpacity
      style={[styles.button, styles[variant]]}
      onPress={onPress}
    >
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  primary: {
    backgroundColor: '#007AFF',
  },
  secondary: {
    backgroundColor: '#8E8E93',
  },
  text: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});
```

## Part 2: Configuration Setup

### Task 1: Environment Configuration
Create environment configuration files:

```tsx
// config/env/index.ts
import Constants from 'expo-constants';

const ENV = {
  dev: {
    apiUrl: 'https://dev-api.pharmacy.com',
    enableLogging: true,
  },
  staging: {
    apiUrl: 'https://staging-api.pharmacy.com',
    enableLogging: true,
  },
  prod: {
    apiUrl: 'https://api.pharmacy.com',
    enableLogging: false,
  },
};

export default function getEnvironment() {
  const environment = Constants.expoConfig?.extra?.environment || 'dev';
  return ENV[environment];
}
```

### Task 2: App Configuration
Set up app.config.js for dynamic configuration:

```jsx
// app.config.js
export default ({ config }) => {
  return {
    ...config,
    name: 'Pharmacy App',
    slug: 'pharmacy-app',
    version: '1.0.0',
    orientation: 'portrait',
    extra: {
      environment: process.env.APP_ENV || 'dev',
    },
    ios: {
      bundleIdentifier: 'com.yourcompany.pharmacyapp',
      buildNumber: '1',
    },
    android: {
      package: 'com.yourcompany.pharmacyapp',
      versionCode: 1,
    },
    plugins: [
      [
        'expo-camera',
        {
          cameraPermission: 'Allow $(PRODUCT_NAME) to access your camera for prescription scanning.'
        }
      ]
    ]
  };
};
```

## Part 3: Type Definitions

### Task 1: Create Base Types
Set up core type definitions:

```tsx
// src/types/index.ts

// API Response Types
export interface ApiResponse<T> {
  data: T;
  status: number;
  message: string;
}

// Model Types
export interface Medication {
  id: string;
  name: string;
  dosage: string;
  instructions: string;
  refillable: boolean;
}

export interface Prescription {
  id: string;
  medicationId: string;
  patientId: string;
  dosage: string;
  frequency: string;
  startDate: string;
  endDate: string;
}

// Component Props Types
export interface CardProps {
  title: string;
  children: React.ReactNode;
  onPress?: () => void;
}
```

### Task 2: Environment Types
Create type definitions for environment configuration:

```tsx
// src/types/environment.ts
export interface Environment {
  apiUrl: string;
  enableLogging: boolean;
}

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      APP_ENV: 'dev' | 'staging' | 'prod';
      API_URL: string;
    }
  }
}
```

## Part 4: Documentation

Create a project documentation file named `PROJECT_STRUCTURE.md`:

```markdown
# Pharmacy App Project Structure

## Directory Organization

### App Directory (`app/`)
- Contains all route-based components
- Follows Expo Router file-based routing
- Organized by feature/route type

### Source Directory (`src/`)
- Contains reusable code
- Organized by functionality
- Follows separation of concerns

### Configuration (`config/`)
- Environment-specific settings
- Constants and shared configuration
- Build and deployment settings

## Development Guidelines

### Component Creation
1. Determine if component is common or feature-specific
2. Create in appropriate directory
3. Include types and documentation
4. Add unit tests if necessary

### Configuration Management
1. Use environment variables for sensitive data
2. Keep configuration DRY
3. Document all configuration options
4. Version control safe defaults

### Type Safety
1. Define types for all data structures
2. Use TypeScript strict mode
3. Document complex types
4. Maintain type consistency

## Build and Deployment

### Environment Setup
1. Configure environment variables
2. Set up development environment
3. Configure staging environment
4. Set up production environment

### Testing Strategy
1. Unit tests for utilities
2. Component tests
3. Integration tests
4. E2E tests for critical flows
```

## Evaluation Criteria

### Project Structure (30%)
- Logical organization
- Separation of concerns
- Scalability considerations
- File naming conventions

### Configuration Setup (30%)
- Environment handling
- Type safety
- Security considerations
- Build configuration

### Code Quality (20%)
- TypeScript usage
- Documentation
- Error handling
- Best practices

### Documentation (20%)
- Structure explanation
- Setup instructions
- Guidelines
- Maintenance notes

### Strong submissions should:
- Follow React Native best practices
- Implement proper typing
- Include comprehensive documentation
- Consider scalability

### Weak submissions typically:
- Have poor organization
- Lack proper configuration
- Miss type definitions
- Have inadequate documentation

## Additional Notes for Instructors

When evaluating:
- Check directory structure
- Verify configuration setup
- Review type definitions
- Assess documentation quality

## Submission Requirements
- Complete project structure
- Configuration files
- Type definitions
- Project documentation
- README with setup instructions 