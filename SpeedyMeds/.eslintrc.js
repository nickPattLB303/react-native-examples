/**
 * ESLint Configuration for SpeedyMeds App
 *
 * This file configures ESLint (ECMAScript Linting tool) for the project.
 * ESLint helps identify and fix problems in JavaScript/TypeScript code, enforce
 * coding standards, and improve code quality.
 *
 * Configuration Breakdown:
 *   - `extends`: Inherits recommended rule sets from other configurations.
 *   - `plugins`: Adds plugins that provide additional rules or functionality.
 *   - `rules`: Allows overriding or customizing specific rules from the extended configs/plugins.
 *
 * Integration with Prettier:
 * This configuration is set up to work seamlessly with Prettier (code formatter):
 *   - `extends: ["expo", "prettier"]`: Includes Expo's recommended rules and then
 *     `prettier`, which disables ESLint rules that conflict with Prettier's formatting.
 *     Prettier handles the formatting, ESLint handles code quality/potential errors.
 *   - `plugins: ["prettier"]`: Enables the `eslint-plugin-prettier`.
 *   - `rules: { "prettier/prettier": "error" }`: Runs Prettier as an ESLint rule. Any code
 *     that doesn't match Prettier's formatting rules will be reported as an ESLint error.
 *
 * @see https://eslint.org/docs/latest/user-guide/configuring/configuration-files - ESLint Configuration Files
 * @see https://docs.expo.dev/guides/using-eslint/ - Expo ESLint Guide
 * @see https://github.com/prettier/eslint-config-prettier - `eslint-config-prettier` (disables conflicting rules)
 * @see https://github.com/prettier/eslint-plugin-prettier - `eslint-plugin-prettier` (runs Prettier as a rule)
 */
module.exports = {
  /**
   * Specifies the base configurations to extend. Rules are inherited sequentially.
   * - `expo`: Provides Expo's recommended ESLint settings for React Native projects,
   *   including rules for React, React Hooks, and TypeScript.
   * - `prettier`: Disables ESLint's stylistic rules that might conflict with Prettier,
   *   letting Prettier handle all code formatting concerns. Must come *after* other configs.
   */
  extends: ["expo", "prettier"],

  /**
   * Lists ESLint plugins to use. Plugins can provide custom rules, processors, etc.
   * - `prettier`: Integrates Prettier checks into the ESLint workflow.
   */
  plugins: ["prettier"],

  /**
   * Defines specific rule configurations, overriding defaults from `extends`.
   */
  rules: {
    /**
     * Rule from `eslint-plugin-prettier`. Reports differences between Prettier's formatting
     * and the current code as ESLint errors. This ensures code formatting consistency.
     * Setting it to "warn" instead of "error" would show warnings instead of errors for formatting issues.
     */
    "prettier/prettier": "error",

    // --- Custom Rule Examples (Optional) ---
    // You can add project-specific rules or overrides here. Examples:
    // 'no-unused-vars': ['warn', { 'argsIgnorePattern': '^_' }], // Warn about unused vars, but allow vars starting with _
    // 'react/prop-types': 'off', // Disable prop-types rule if using TypeScript
    // 'react/react-in-jsx-scope': 'off', // Not needed with modern React/JSX transform
    // '@typescript-eslint/explicit-function-return-type': 'warn', // Encourage explicit return types
  },
  /**
   * Defines predefined global variables for specific environments.
   * - `jest: true`: Adds Jest global variables (like `jest`, `describe`, `it`, `expect`)
   *   to prevent 'no-undef' errors in test files.
   */
  env: {
    jest: true,
  },

  // --- Optional Settings ---
  // You might add other ESLint configurations here if needed, such as:
  // `parserOptions`: To configure the JavaScript/TypeScript parser.
  // `env`: To define global variables available in specific environments (e.g., `node`, `jest`).
  // `globals`: To define custom global variables.
  // `settings`: To configure settings for specific plugins (e.g., `react`).
  // `overrides`: To apply different configurations to specific file patterns.
};
