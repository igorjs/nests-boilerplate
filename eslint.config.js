const globals = require('globals');
const eslint = require('@eslint/js');
const tslint = require('typescript-eslint');
const jestlint = require('eslint-plugin-jest');

module.exports = [
  eslint.configs.recommended,
  ...tslint.configs.recommended,
  jestlint.configs['flat/recommended'],
  {
    rules: {
      '@typescript-eslint/interface-name-prefix': 'off',
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
    },
  },
  {
    files: ['**/*.spec.ts', '**/*.test.ts'],
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-non-null-assertion': 'off',
    },
  },
  {
    files: ['**/*.{js,mjs,cjs,ts}'],
    languageOptions: {
      globals: globals.node,
      parserOptions: {
        sourceType: 'module',
        warnOnUnsupportedTypeScriptVersion: false,
      },
    },
  },
  {
    ignores: ['**/dist/**', '**/node_modules/**', '**/*.config.*'],
  },
];
