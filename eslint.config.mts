import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import pluginReact from 'eslint-plugin-react';
import { defineConfig } from 'eslint/config';
import prettierPlugin from 'eslint-plugin-prettier';
import prettierConfig from 'eslint-config-prettier';

export default defineConfig([
  {
    files: ['src/**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    plugins: { js, prettier: prettierPlugin },
    extends: [
      'js/recommended',
      tseslint.configs.recommended,
      pluginReact.configs.flat.recommended,
      prettierConfig,
    ],
    // 기본 규칙
    rules: {
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
      'implicit-arrow-linebreak': ['warn', 'beside'],
      'object-shorthand': ['warn', 'always'],
      'lines-between-class-members': ['warn', 'always', { exceptAfterSingleLine: true }],
      'keyword-spacing': 'warn',
      'array-bracket-newline': ['warn', { multiline: true, minItems: 2 }],
      'array-element-newline': ['warn', { multiline: true, minItems: 2 }],
      'object-property-newline': ['warn', { allowAllPropertiesOnSameLine: false }],
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
