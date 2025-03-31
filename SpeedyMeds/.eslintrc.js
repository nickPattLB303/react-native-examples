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
  ignorePatterns: ['node_modules/', 'build/', '.expo/', '*.config.js', '*.config.ts'], // Ignore specific files/dirs
};