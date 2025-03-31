# ESLint & Prettier Configuration

This document outlines the setup for ESLint (code linting) and Prettier (code formatting) in the SpeedyMeds project. Consistent code style and early error detection are crucial for collaboration and maintainability, especially in a training environment.

## Goals

- **Enforce Code Quality:** Catch common JavaScript/TypeScript errors and potential bugs.
- **Maintain Consistent Style:** Ensure all code follows the same formatting rules, reducing cognitive load and simplifying code reviews.
- **Automate Formatting:** Allow developers to automatically format code on save or via a command.
- **Integrate Tools:** Make ESLint and Prettier work together seamlessly.

## Tools & Packages

We will install the following development dependencies:

- **`eslint`**: The core linting tool.
- **`prettier`**: The core code formatter.
- **`@typescript-eslint/parser`**: Allows ESLint to understand TypeScript syntax.
- **`@typescript-eslint/eslint-plugin`**: Provides TypeScript-specific linting rules.
- **`eslint-plugin-react`**: Provides React-specific linting rules.
- **`eslint-plugin-react-hooks`**: Enforces Rules of Hooks.
- **`eslint-config-prettier`**: Disables ESLint rules that conflict with Prettier.
- **`eslint-plugin-prettier`**: Runs Prettier as an ESLint rule and reports differences as ESLint issues.

Command:

```bash
npx expo install eslint prettier @typescript-eslint/parser @typescript-eslint/eslint-plugin eslint-plugin-react eslint-plugin-react-hooks eslint-config-prettier eslint-plugin-prettier -- --save-dev
```

_(Note: `npx expo install` is used even for dev dependencies to ensure compatibility within the Expo ecosystem where possible, although `npm install --save-dev` would also work.)_

## Configuration Files

### 1. ESLint (`eslint.config.mjs`)

This project uses ESLint's newer "flat config" format, configured in `eslint.config.mjs`. This format uses modern ES modules and provides a more explicit way to define configurations.

```javascript
// Current eslint.config.mjs (simplified representation)
import { defineConfig, globalIgnores } from 'eslint/config';
import { fixupConfigRules, fixupPluginRules } from '@eslint/compat';
// ... other imports (plugins, parser, globals)

export default defineConfig([
  // 1. Global Ignores: Define files/patterns ESLint should ignore
  globalIgnores([
    '**/node_modules/',
    '**/build/',
    '**/.expo/',
    // ... other ignores
  ]),
  // 2. Main Configuration Object(s): An array of config objects
  {
    // Extends base recommended rulesets using compatibility tools
    extends: fixupConfigRules(
      compat.extends(
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:react/recommended',
        'plugin:react-hooks/recommended',
        'plugin:prettier/recommended' // Integrates Prettier rules
      )
    ),
    // Defines plugins used
    plugins: {
      '@typescript-eslint': fixupPluginRules(typescriptEslint),
      react: fixupPluginRules(react),
      'react-hooks': fixupPluginRules(reactHooks),
    },
    // Language Options: Configure parser, globals, etc.
    languageOptions: {
      globals: { ...globals.node, ...globals.jest },
      parser: tsParser, // Use TypeScript parser
      parserOptions: {
        ecmaFeatures: { jsx: true },
      },
      // ... other options
    },
    // Settings for plugins (e.g., React version detection)
    settings: {
      react: { version: 'detect' },
    },
    // Specific Rule Overrides
    rules: {
      'react/react-in-jsx-scope': 'off',
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
      // ... other rules
    },
  },
  // ... potentially more config objects for specific file types/overrides
]);
```
*(Note: The actual file uses compatibility helpers (`fixupConfigRules`, `fixupPluginRules`, `FlatCompat`) to bridge older eslintrc-style plugins/configs with the new flat config format.)*

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

## Running Linters and Formatters Manually

While VS Code integration provides real-time feedback and format-on-save, you can also run these tools manually across the entire project from your terminal. This is useful for checking everything before committing or as part of CI/CD checks later.

Navigate to the `SpeedyMeds` directory in your terminal and use the scripts defined in `package.json`:

- **Check for Lint Errors:**

  ```bash
  npm run lint
  # or yarn lint
  ```

  This command runs ESLint and reports any errors or warnings found based on the `eslint.config.mjs` configuration.

- **Automatically Format Code:**
  ```bash
  npm run format
  # or yarn format
  ```
  This command runs Prettier and modifies files in place to match the formatting rules defined in `.prettierrc.js`.

_(Note: We use `npm run` or `yarn` here because these are custom scripts defined in `package.json`, not direct Expo commands.)_

## VS Code Integration

To get the most benefit, integrate these tools with VS Code:

1.  **Install Extensions:** Ensure you have installed the recommended extensions mentioned in `SETUP.md`:
    - `dbaeumer.vscode-eslint`
    - `esbenp.prettier-vscode`
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
