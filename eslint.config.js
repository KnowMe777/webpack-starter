import { defineConfig } from 'eslint/config';
import js from '@eslint/js';
import prettierConfig from 'eslint-config-prettier';
import prettierPlugin from 'eslint-plugin-prettier';

export default defineConfig([
  js.configs.recommended,
  prettierConfig, // disables ESLint rules that conflict with Prettier
  {
    files: ['**/*.js'],
    plugins: {
      prettier: prettierPlugin,
    },
    rules: {
      'no-unused-vars': 'warn',
      'no-undef': 'warn',
      semi: ['error', 'always'],
      quotes: ['error', 'single'], // enforce single quotes in ESLint itself

      // Prettier formatting rules
      'prettier/prettier': [
        'error',
        {
          singleQuote: true,
          semi: true,
        },
      ],
    },
  },
]);
