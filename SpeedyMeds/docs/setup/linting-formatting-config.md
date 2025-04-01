# ESLint & Prettier Configuration

This document outlines the setup for ESLint (code linting) and Prettier (code formatting) in the SpeedyMeds project, following the standard practices recommended by Expo. Consistent code style and early error detection are crucial for collaboration and maintainability.

## Goals

- **Enforce Code Quality:** Catch common JavaScript/TypeScript errors and potential bugs.
- **Maintain Consistent Style:** Ensure all code follows the same formatting rules, reducing cognitive load and simplifying code reviews.
- **Automate Formatting:** Allow developers to automatically format code on save or via a command.
- **Integrate Tools:** Make ESLint and Prettier work together seamlessly.

## Tools & Packages

The setup primarily relies on the following development dependencies, managed largely by Expo tooling:

- **`eslint`**: The core linting tool. (Installed via `npx expo lint`)
- **`eslint-config-expo`**: Expo's base ESLint configuration, providing recommended rules for React Native/Expo projects. (Installed via `npx expo lint`)
- **`prettier`**: The core code formatter.
- **`eslint-config-prettier`**: Disables ESLint rules that conflict with Prettier, allowing Prettier to handle formatting.
- **`eslint-plugin-prettier`**: Runs Prettier as an ESLint rule and reports differences as ESLint issues, integrating formatting checks into the linting process.

_(Note: `eslint-config-expo` includes configurations for TypeScript, React, and React Hooks, so explicit installation of `@typescript-eslint/parser`, `@typescript-eslint/eslint-plugin`, `eslint-plugin-react`, `eslint-plugin-react-hooks` is often not needed when using the Expo preset.)_

## Setup Steps

### 1. Initialize ESLint with Expo Configuration

Expo CLI provides a convenient command to install and configure ESLint with the recommended base settings. Run this in the `SpeedyMeds` project root:

```bash
npx expo lint
```

This command:

- Installs `eslint` and `eslint-config-expo` if not already present.
- Creates a `.eslintrc.js` file at the project root with the basic Expo configuration:
  ```javascript
  // .eslintrc.js (Initial setup)
  module.exports = {
    extends: "expo",
  };
  ```
- May prompt you to add a `lint` script to your `package.json` if one doesn't exist.

### 2. Install Prettier and ESLint Integration Packages

Add Prettier and the necessary ESLint plugins to integrate it:

```bash
# Use "--" --dev on Windows if needed
npx expo install prettier eslint-config-prettier eslint-plugin-prettier --dev
```

### 3. Configure ESLint for Prettier Integration

Update the `.eslintrc.js` file generated in Step 1 to include Prettier configuration. This ensures ESLint uses Prettier for formatting rules and doesn't report conflicting style issues.

```javascript
// .eslintrc.js (Updated for Prettier)
module.exports = {
  extends: ["expo", "prettier"], // Add 'prettier' to the end
  plugins: ["prettier"], // Add 'prettier' plugin
  rules: {
    "prettier/prettier": "error", // Report Prettier differences as ESLint errors
    // Add any other project-specific rule overrides here
  },
};
```

_(Note: You can use `'prettier/prettier': 'warn'` if you prefer formatting issues to be warnings.)_

### 4. Configure Prettier (Optional)

Create a `.prettierrc.js` file (or `.prettierrc`) in the project root to customize Prettier's formatting rules.

```javascript
// Example .prettierrc.js
module.exports = {
  semi: true,
  singleQuote: true,
  jsxSingleQuote: false,
  trailingComma: "es5",
  tabWidth: 2,
  printWidth: 80,
  arrowParens: "always",
};
```

### 5. Create Ignore Files

- **`.eslintignore`**: Tell ESLint which files/directories to ignore. Create this file in the root if it doesn't exist.
  ```
  # .eslintignore
  node_modules
  .expo
  dist
  build
  coverage
  *.lock
  ```
- **`.prettierignore`**: Tell Prettier which files/directories to ignore (often similar to `.eslintignore`).
  ```
  # .prettierignore
  node_modules
  .expo
  dist
  build
  coverage
  *.lock
  package-lock.json
  yarn.lock
  ```

## `package.json` Scripts

Ensure you have scripts for linting and formatting in your `package.json`:

```json
// Ensure these exist in "scripts" in package.json
"scripts": {
  // ... existing scripts
  "lint": "expo lint", // Recommended for SDK 51+
  // or "lint": "eslint . --ext .js,.jsx,.ts,.tsx", // Alternative/fallback
  "format": "prettier --write \"**/*.{js,jsx,ts,tsx,json,md}\""
},
```

## Running Linters and Formatters Manually

While VS Code integration provides real-time feedback and format-on-save, you can also run these tools manually across the entire project from your terminal. This is useful for checking everything before committing or as part of CI/CD checks later.

Navigate to the `SpeedyMeds` directory in your terminal and use the scripts defined in `package.json`:

- **Check for Lint Errors (and Prettier consistency):**

  ```bash
  npx expo lint
  # or npm run lint / yarn lint (depending on your script)
  ```

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

This setup aligns the SpeedyMeds project with the standard Expo configuration for ESLint and Prettier, providing a robust linting and formatting foundation. It helps maintain code quality and consistency using integrated, industry-standard tools.

_(Primary Reference: [Expo Using ESLint Guide](https://docs.expo.dev/guides/using-eslint/))_
