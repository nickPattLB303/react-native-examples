# ESLint & Prettier Configuration

This document outlines the setup for ESLint (code linting) and Prettier (code formatting) in the SpeedyMeds project. Consistent code style and early error detection are crucial for collaboration and maintainability, especially in a training environment.

## Goals

*   **Enforce Code Quality:** Catch common JavaScript/TypeScript errors and potential bugs.
*   **Maintain Consistent Style:** Ensure all code follows the same formatting rules, reducing cognitive load and simplifying code reviews.
*   **Automate Formatting:** Allow developers to automatically format code on save or via a command.
*   **Integrate Tools:** Make ESLint and Prettier work together seamlessly.

## Tools & Packages

We will install the following development dependencies:

*   **`eslint`**: The core linting tool.
*   **`prettier`**: The core code formatter.
*   **`@typescript-eslint/parser`**: Allows ESLint to understand TypeScript syntax.
*   **`@typescript-eslint/eslint-plugin`**: Provides TypeScript-specific linting rules.
*   **`eslint-plugin-react`**: Provides React-specific linting rules.
*   **`eslint-plugin-react-hooks`**: Enforces Rules of Hooks.
*   **`eslint-config-prettier`**: Disables ESLint rules that conflict with Prettier.
*   **`eslint-plugin-prettier`**: Runs Prettier as an ESLint rule and reports differences as ESLint issues.

Command (to be run in Code mode):
```bash
npx expo install --save-dev eslint prettier @typescript-eslint/parser @typescript-eslint/eslint-plugin eslint-plugin-react eslint-plugin-react-hooks eslint-config-prettier eslint-plugin-prettier
```
*(Note: `npx expo install` is used even for dev dependencies to ensure compatibility within the Expo ecosystem where possible, although `npm install --save-dev` would also work.)*

## Configuration Files

### 1. ESLint (`.eslintrc.js`)

This file configures ESLint rules and plugins.

```javascript
// Planned .eslintrc.js
module.exports = {
  root: true, // Prevent ESLint from looking further up the directory tree
  extends: [
    'eslint:recommended', // Base ESLint recommended rules
    'plugin:@typescript-eslint/recommended', // TypeScript recommended rules
    'plugin:react/recommended', // React recommended rules
    'plugin:react-hooks/recommended', // Rules of Hooks
    'plugin:prettier/recommended', // Enables eslint-plugin-prettier and eslint-config-prettier
  ],
  parser: '@typescript-eslint/parser', // Specifies the ESLint parser for TypeScript
  plugins: [
    '@typescript-eslint', // Loads the TypeScript plugin
    'react', // Loads the React plugin
    'react-hooks', // Loads the React Hooks plugin
  ],
  parserOptions: {
    ecmaVersion: 2020, // Allows for the parsing of modern ECMAScript features
    sourceType: 'module', // Allows for the use of imports
    ecmaFeatures: {
      jsx: true, // Allows for the parsing of JSX
    },
  },
  settings: {
    react: {
      version: 'detect', // Automatically detect the React version
    },
  },
  env: {
    node: true, // Enables Node.js global variables and Node.js scoping.
    es6: true, // Enables ES6 globals (Promise, etc.)
    jest: true, // Enables Jest global variables.
  },
  rules: {
    // Add custom rules or overrides here if needed later
    'react/react-in-jsx-scope': 'off', // Not needed with modern React/JSX transform
    '@typescript-eslint/no-unused-vars': ['warn', { 'argsIgnorePattern': '^_' }], // Warn about unused vars, allow underscore prefix
    // Add other specific rules as the team/instructor sees fit
  },
  ignorePatterns: ['node_modules/', 'build/', '.expo/', '*.config.js'], // Ignore specific files/dirs
};
```

### 2. Prettier (`.prettierrc.js`)

This file defines the code formatting style.

```javascript
// Planned .prettierrc.js
module.exports = {
  semi: true, // Add semicolons at the end of statements
  singleQuote: true, // Use single quotes instead of double quotes
  jsxSingleQuote: false, // Use double quotes in JSX
  trailingComma: 'es5', // Add trailing commas where valid in ES5 (objects, arrays, etc.)
  tabWidth: 2, // Number of spaces per indentation-level
  printWidth: 80, // Specify the line length that the printer will wrap on
  arrowParens: 'always', // Include parentheses around a sole arrow function parameter
};
```

### 3. Prettier Ignore (`.prettierignore`)

Specifies files/directories that Prettier should not format.

```
# Planned .prettierignore
node_modules
build
dist
.expo
coverage
*.lock
# Add any other generated files or directories to ignore
```

## `package.json` Scripts

Add scripts for easy linting and formatting:

```json
// Additions to "scripts" in package.json
"scripts": {
  // ... existing scripts
  "lint": "eslint . --ext .js,.jsx,.ts,.tsx",
  "format": "prettier --write \"**/*.{js,jsx,ts,tsx,json,md}\""
},
```

## VS Code Integration

To get the most benefit, integrate these tools with VS Code:

1.  **Install Extensions:** Ensure you have installed the recommended extensions mentioned in `SETUP.md`:
    *   `dbaeumer.vscode-eslint`
    *   `esbenp.prettier-vscode`
2.  **Configure Settings (`.vscode/settings.json`):** Create a `.vscode` folder in the `SpeedyMeds` root and add a `settings.json` file with the following content. This enables format-on-save using Prettier and ESLint auto-fixing.
    ```json
    // .vscode/settings.json
    {
      "editor.formatOnSave": true,
      "editor.defaultFormatter": "esbenp.prettier-vscode",
      "editor.codeActionsOnSave": {
        "source.fixAll.eslint": "explicit"
      },
      "[javascript]": {
        "editor.defaultFormatter": "esbenp.prettier-vscode"
      },
      "[javascriptreact]": {
        "editor.defaultFormatter": "esbenp.prettier-vscode"
      },
      "[typescript]": {
        "editor.defaultFormatter": "esbenp.prettier-vscode"
      },
      "[typescriptreact]": {
        "editor.defaultFormatter": "esbenp.prettier-vscode"
      }
    }
    ```
3.  **Reload VS Code:** Restart or reload the VS Code window to ensure settings and extensions are loaded correctly.

## Conclusion

This setup provides a robust linting and formatting foundation using industry-standard tools. It helps maintain code quality and consistency, which is highly beneficial for the collaborative learning environment of this training project.