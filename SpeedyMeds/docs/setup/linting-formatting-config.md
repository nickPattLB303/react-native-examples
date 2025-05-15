# Code Style Checkup: ESLint & Prettier Setup

This document explains how we set up **ESLint** (for finding potential code issues) and **Prettier** (for automatic code formatting) in the SpeedyMeds project. Think of them as helpful assistants that keep our code clean, consistent, and less prone to bugs!

**Why use these?**
- **ESLint:** Catches common mistakes (like unused variables) and potential logic errors.
- **Prettier:** Automatically formats your code to follow consistent style rules (indentation, spacing, quotes, etc.). No more debates about code style!
- **Together:** They ensure everyone's code looks similar and is easier to read and review.

## Tools & Packages (Already Installed!)

The project comes pre-configured with the necessary tools:

- **`eslint`**: The main code checker.
- **`eslint-config-expo`**: Expo's recommended rules for React Native apps.
- **`prettier`**: The automatic code formatter.
- **`eslint-config-prettier`**: Turns off ESLint rules that would fight with Prettier over formatting.
- **`eslint-plugin-prettier`**: Makes Prettier's formatting rules part of ESLint's checks.

## How It's Configured

### 1. ESLint Configuration (`.eslintrc.js`)

This file tells ESLint which rules to use.

```javascript
// .eslintrc.js
module.exports = {
  // Inherit rules from Expo's config and the Prettier compatibility config
  extends: ["expo", "prettier"],
  // Use the Prettier plugin
  plugins: ["prettier"],
  // Rules configuration
  rules: {
    // Make formatting differences found by Prettier show up as ESLint errors
    "prettier/prettier": "error",
    // You could add other specific rules here if needed
  },
  // Tells ESLint to recognize common variables available in Jest tests
  env: {
    jest: true,
  },
};
```

**Key Points:**
- `extends: ["expo", "prettier"]`: Starts with Expo's rules, then `prettier` disables conflicting style rules.
- `plugins: ["prettier"]`: Includes the Prettier plugin.
- `rules: { "prettier/prettier": "error" }`: This is important! It makes ESLint run Prettier and report any code that doesn't match the Prettier style as an error.

### 2. Prettier Configuration (`.prettierrc.js`)

This file defines our specific code style preferences for Prettier to enforce.

```javascript
// .prettierrc.js
module.exports = {
  semi: true,            // Add semicolons
  singleQuote: true,     // Use single quotes for strings
  jsxSingleQuote: false, // Use double quotes for JSX attributes
  trailingComma: "es5",  // Add trailing commas where valid in ES5
  tabWidth: 2,           // Indent with 2 spaces
  printWidth: 80,        // Wrap lines longer than 80 characters
  arrowParens: "always", // Always put parentheses around arrow function parameters
};
```

### 3. Ignore Files (`.eslintignore`, `.prettierignore`)

These files tell ESLint and Prettier to skip checking certain files and folders, like `node_modules`, build outputs, etc., which we don't need to worry about.

## How to Use Them

### 1. Editor Integration (VS Code Recommended)

The best way to use these is right in your editor!

- **Install Extensions:** Make sure you have the `ESLint` (dbaeumer.vscode-eslint) and `Prettier - Code formatter` (esbenp.prettier-vscode) extensions installed in VS Code.
- **Format on Save:** The project includes a `.vscode/settings.json` file that tells VS Code to automatically format your code using Prettier every time you save a file. Magic! ✨
- **See Errors:** ESLint errors and warnings (including formatting issues flagged by Prettier) will be highlighted directly in your code with squiggly underlines.

### 2. Manual Checks (Terminal)

You can also run checks manually for the whole project:

- **Check for ESLint/Prettier Errors:**
  ```bash
  npm run lint
  # or use: npx expo lint
  ```
- **Automatically Fix Formatting:**
  ```bash
  npm run format
  ```
  This command asks Prettier to rewrite files to match the style guide.

## Quick Tips

- **Format Often:** Use format-on-save or run `npm run format` before committing.
- **Fix Lint Warnings:** Pay attention to the squiggles ESLint shows you in the editor!

This setup helps keep the SpeedyMeds codebase consistent and easier to work with. Happy coding!
