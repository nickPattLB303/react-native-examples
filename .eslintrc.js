/**
 * @fileoverview ESLint configuration for React Native Training Course
 * @author React Native Training Course
 */

// Import custom pharmacy theme plugin
const pharmacyThemePlugin = require('./scripts/eslint-plugin-pharmacy-theme');

module.exports = {
  root: true,
  extends: [
    '@react-native',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:jsdoc/recommended',
  ],
  plugins: [
    'react',
    'react-native',
    'jsdoc',
    'pharmacy-theme',
  ],
  env: {
    'react-native/react-native': true,
    'es6': true,
    'node': true,
  },
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  settings: {
    react: {
      version: 'detect',
    },
    jsdoc: {
      tagNamePreference: {
        returns: 'returns',
        fileoverview: 'fileoverview',
      },
    },
  },
  rules: {
    // JSDoc rules
    'jsdoc/require-description': 'error',
    'jsdoc/require-param-description': 'error',
    'jsdoc/require-returns-description': 'error',
    
    // React/React Native rules
    'react-native/no-unused-styles': 'error',
    'react-native/no-inline-styles': 'warn',
    'react-native/no-color-literals': 'warn',
    
    // Pharmacy theme rules
    'pharmacy-theme/use-medication-terminology': 'error',
    'pharmacy-theme/consistent-domain-terms': 'warn',
    
    // Articulate compatibility rules - warnings only
    'pharmacy-theme/articulate-compatibility': 'warn',
  },
  // Ignore certain files
  ignorePatterns: [
    'node_modules/**',
    'dist/**',
    'build/**',
    'coverage/**',
  ],
  // Register the custom plugin
  plugins: {
    'pharmacy-theme': pharmacyThemePlugin
  }
} 