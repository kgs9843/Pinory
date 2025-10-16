import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import pluginReact from 'eslint-plugin-react';
import importPlugin from 'eslint-plugin-import';
import reactHooks from 'eslint-plugin-react-hooks';
import { defineConfig } from 'eslint/config';
import prettierPlugin from 'eslint-plugin-prettier';
import prettierConfig from 'eslint-config-prettier';
import path from 'path';
import reactCompiler from 'eslint-plugin-react-compiler';

export default defineConfig([
  {
    files: ['src/**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    plugins: {
      js,
      import: importPlugin,
      prettier: prettierPlugin,
    },
    extends: [
      reactCompiler.configs.recommended,
      'js/recommended',
      tseslint.configs.recommended,
      pluginReact.configs.flat.recommended,
      reactHooks.configs['recommended-latest'],
      prettierConfig,
    ],
    settings: {
      'import/resolver': {
        typescript: {
          project: path.resolve(process.cwd(), 'tsconfig.json'),
        },
      },
      react: {
        version: 'detect',
      },
    },
    // NOTE: 기본 규칙 + fsd
    rules: {
      // NOTE: React
      ...pluginReact.configs.recommended.rules,
      'react/react-in-jsx-scope': 'off',
      'react/jsx-uses-react': 'off',
      'react/jsx-filename-extension': ['warn', { extensions: ['.tsx', '.jsx'] }],
      // NOTE: React Hooks
      ...reactHooks.configs.recommended.rules,
      'react-hooks/rules-of-hooks': 'warn',
      'react-hooks/exhaustive-deps': 'warn',

      // NOTE: react compiler
      'react-compiler/react-compiler': 'warn',

      // NOTE: fsd
      'import/order': [
        'error',
        {
          groups: [
            'builtin',
            'external',
            'internal',
            ['parent', 'sibling', 'index'],
            'object',
            'type',
          ],
          pathGroups: [
            { pattern: '@/**', group: 'internal', position: 'before' },
            { pattern: '@app/**', group: 'internal', position: 'after' },
            { pattern: '@pages/**', group: 'internal', position: 'after' },
            { pattern: '@widgets/**', group: 'internal', position: 'after' },
            { pattern: '@features/**', group: 'internal', position: 'after' },
            { pattern: '@entities/**', group: 'internal', position: 'after' },
            { pattern: '@shared/**', group: 'internal', position: 'after' },
          ],
          pathGroupsExcludedImportTypes: ['builtin'],
          alphabetize: { order: 'asc', caseInsensitive: true },
          'newlines-between': 'always',
        },
      ],
      // NOTE: 기본규칙
      semi: ['warn', 'always'],
      quotes: ['warn', 'single'],
      eqeqeq: ['warn', 'always'],
      'no-var': 'warn',
      'prefer-const': 'warn',
      'no-self-assign': 'warn',
      'no-new-func': 'warn',
      'no-inner-declarations': ['warn', 'functions'],
      'prefer-template': 'warn',
      'prefer-arrow-callback': 'warn',
      'arrow-parens': ['warn', 'as-needed'],
      'object-shorthand': ['warn', 'always'],
      'lines-between-class-members': ['warn', 'always', { exceptAfterSingleLine: true }],
      'keyword-spacing': 'warn',
    },
    languageOptions: { globals: globals.browser },
  },
  // NOTE: Node 전용 파일 규칙 제외
  {
    files: ['metro.config.js', 'tailwind.config.js'],
    languageOptions: {
      globals: { ...globals.node },
    },
    rules: {
      '@typescript-eslint/no-require-imports': 'off',
      'no-undef': 'off',
    },
  },
]);
