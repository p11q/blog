import eslint from '@eslint/js';
import stylistic from '@stylistic/eslint-plugin';
import eslintConfigPrettier from 'eslint-config-prettier';
import perfectionist from 'eslint-plugin-perfectionist';
import { defineConfig } from 'eslint/config';
import tseslint from 'typescript-eslint';

export function createConfig(tsconfigRootDir) {
  return defineConfig(
    {
      languageOptions: {
        parserOptions: {
          projectService: true,
          tsconfigRootDir,
        },
      },
    },

    {
      plugins: {
        ['@stylistic']: stylistic,
      },
    },

    eslint.configs.recommended,
    tseslint.configs.strictTypeChecked,
    tseslint.configs.stylisticTypeChecked,
    perfectionist.configs['recommended-natural'],
    eslintConfigPrettier,

    {
      rules: {
        '@stylistic/padding-line-between-statements': [
          'error',
          {
            blankLine: 'always',
            next: ['continue', 'return', 'throw'],
            prev: '*',
          },
          { blankLine: 'always', next: '*', prev: 'block-like' },
        ],
        '@typescript-eslint/explicit-function-return-type': [
          'error',
          { allowExpressions: true },
        ],
        '@typescript-eslint/no-extraneous-class': [
          'error',
          { allowWithDecorator: true },
        ],
        '@typescript-eslint/no-unused-vars': [
          'error',
          {
            args: 'all',
            argsIgnorePattern: '^_',
            caughtErrors: 'all',
            caughtErrorsIgnorePattern: '^_',
            destructuredArrayIgnorePattern: '^_',
            ignoreRestSiblings: false,
            varsIgnorePattern: '^_',
          },
        ],
        '@typescript-eslint/restrict-template-expressions': [
          'error',
          { allowNumber: true },
        ],
        '@typescript-eslint/unbound-method': 'off',
        'arrow-body-style': ['error', 'as-needed'],
        curly: 'error',
        'no-else-return': 'error',
        'perfectionist/sort-classes': [
          'error',
          {
            groups: [
              'index-signature',

              'static-block',

              'static-property',
              'public-property',
              'protected-property',
              'private-property',

              'static-method',

              'constructor',

              'public-method',
              'protected-method',
              'private-method',

              'unknown',
            ],
          },
        ],
        'perfectionist/sort-decorators': 'off',
        'perfectionist/sort-enums': [
          'error',
          {
            sortByValue: 'ifNumericEnum',
          },
        ],
        'perfectionist/sort-imports': 'off',
        'perfectionist/sort-named-imports': 'off',
      },
    },

    {
      extends: [tseslint.configs.disableTypeChecked],
      files: ['**/*.js', '**/*.mjs'],
    },

    {
      ignores: ['dist/'],
    },
  );
}
