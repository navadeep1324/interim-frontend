module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:jsx-a11y/recommended',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['react', 'jsx-a11y'],
  rules: {
    'no-unused-vars': 'warn', // Treat unused variables as warnings
    'no-extra-semi': 'off', // Turn off extra semicolon errors
    'react/react-in-jsx-scope': 'off', // No need to import React in scope
    'jsx-a11y/anchor-is-valid': 'off', // Disable anchor-is-valid accessibility rule
    'jsx-a11y/click-events-have-key-events': 'off', // Disable requirement for key events with click handlers
    'jsx-a11y/no-static-element-interactions': 'off', // Allow click handlers on non-interactive elements
    'jsx-a11y/no-noninteractive-element-interactions': 'off', // Disable rule for non-interactive elements having interactions
    'jsx-a11y/label-has-associated-control': 'off', // Ignore label must have control rule
    'react/prop-types': 'off', // Disable prop-types validation
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
};


