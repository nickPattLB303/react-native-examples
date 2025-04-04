/**
 * ESLint Configuration for SpeedyMeds App
 *
 * @file This file configures ESLint, a tool for identifying and reporting on patterns
 * found in ECMAScript/JavaScript/TypeScript code. It helps maintain code quality,
 * enforce coding standards, and prevent potential errors.
 * @module .eslintrc.js
 *
 * @purpose To define the linting rules and environment settings for the project,
 * ensuring consistent code style and catching common issues early.
 *
 * @key_concepts ESLint:
 *   - **Rules:** Specific checks ESLint performs (e.g., `no-unused-vars`, `prettier/prettier`).
 *   - **Plugins:** Provide additional rules or functionality (e.g., `eslint-plugin-prettier`).
 *   - **Extends:** Allows inheriting rule sets from shared configurations (e.g., `eslint-config-expo`, `eslint-config-prettier`).
 *   - **Environments (`env`):** Define predefined global variables available in specific contexts (e.g., `jest`, `node`).
 *
 * @integration_with_prettier:
 *   This setup ensures ESLint focuses on code quality/logic errors, while Prettier handles
 *   all code formatting.
 *   - `extends: ["expo", "prettier"]`: Inherits Expo's rules, then `prettier` disables any
 *     ESLint formatting rules that would conflict with Prettier.
 *   - `plugins: ["prettier"]`: Enables the plugin that integrates Prettier.
 *   - `rules: { "prettier/prettier": "error" }`: Runs Prettier as an ESLint rule. Code
 *     that doesn't conform to Prettier's style will cause an ESLint error.
 *
 * @see {@link https://eslint.org/docs/latest/user-guide/configuring/configuration-files | ESLint Configuration Files Guide}
 * @see {@link https://docs.expo.dev/guides/using-eslint/ | Expo ESLint Guide}
 * @see {@link https://github.com/prettier/eslint-config-prettier | eslint-config-prettier} (Disables conflicting ESLint rules)
 * @see {@link https://github.com/prettier/eslint-plugin-prettier | eslint-plugin-prettier} (Runs Prettier as an ESLint rule)
 * @see {@link https://jestjs.io/docs/en/getting-started | Jest Testing Framework}
 */
module.exports = {
  /**
   * Specifies the base configurations to extend. Rules are inherited sequentially,
   * with later configurations potentially overriding earlier ones.
   *
   * - `expo`: Provides Expo's recommended ESLint settings for React Native projects.
   *   Includes rules for React, React Hooks, TypeScript, and accessibility.
   * - `prettier`: Disables ESLint's stylistic rules that might conflict with Prettier.
   *   This lets Prettier handle all code formatting concerns. **Must come last** in the
   *   `extends` array to correctly override other configs.
   */
  extends: ["expo", "prettier"],

  /**
   * Lists ESLint plugins to use. Plugins can provide custom rules, processors, etc.
   *
   * - `prettier`: Integrates Prettier checks into the ESLint workflow via the `prettier/prettier` rule.
   */
  plugins: ["prettier"],

  /**
   * Defines specific rule configurations, overriding defaults from `extends`.
   * Rules are typically set to "off" (0), "warn" (1), or "error" (2).
   */
  rules: {
    /**
     * Rule from `eslint-plugin-prettier`.
     * Reports differences between Prettier's expected formatting and the current code
     * as ESLint errors. This enforces code formatting consistency defined in `.prettierrc.js`.
     * Setting it to "warn" would show warnings instead of errors for formatting issues.
     */
    "prettier/prettier": "error",

    // --- Custom Rule Examples (Optional) ---
    // You can add project-specific rules or overrides here if needed.
    // Examples:
    // 'no-console': 'warn', // Warn about console.log statements
    // 'no-unused-vars': ['warn', { 'argsIgnorePattern': '^_' }], // Warn about unused vars, but allow if starting with _
    // 'react/prop-types': 'off', // Often disabled when using TypeScript for prop types
    // 'react/react-in-jsx-scope': 'off', // Not needed with modern React JSX transform (React 17+)
    // '@typescript-eslint/explicit-function-return-type': 'warn', // Encourage defining function return types
  },

  /**
   * Defines predefined global variables available in specific execution environments.
   * This prevents ESLint from flagging these globals as undefined (`no-undef` error).
   *
   * - `jest: true`: Adds all Jest global variables (like `jest`, `describe`, `it`, `expect`,
   *   `beforeEach`, `afterAll`, etc.) to the recognized globals. This is essential for
   *   writing test files (`*.test.ts` or `*.test.tsx`) without getting `no-undef` errors.
   *
   * @see {@link https://eslint.org/docs/latest/user-guide/configuring/language-options#specifying-environments | ESLint Environments}
   */
  env: {
    jest: true, // Recognize Jest global variables
    // node: true, // Uncomment if you have Node.js specific scripts (outside React Native)
    // browser: true, // Uncomment if you have code intended for web browsers
  },

  // --- Optional Settings ---
  // You might add other ESLint configurations here if needed:
  // `parserOptions`: To configure the JavaScript/TypeScript parser (e.g., ECMA version).
  // `globals`: To define custom global variables not covered by `env`.
  // `settings`: To configure settings for specific plugins (e.g., `react` version).
  // `overrides`: To apply different configurations to specific file patterns (e.g., different rules for tests vs. source code).
  /* Example Override:
  overrides: [
    {
      files: ["**\/*.test.ts", "**\/*.test.tsx"], // Target only test files
      rules: {
        '@typescript-eslint/no-explicit-any': 'off', // Allow 'any' type in tests if needed
      }
    }
  ]
  */
};
