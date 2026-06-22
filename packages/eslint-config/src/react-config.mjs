import reactHooks from 'eslint-plugin-react-hooks';
import { defineConfig } from 'eslint/config';
import globals from 'globals';
import { createConfig } from './config.mjs';

export function createReactConfig(tsconfigRootDir) {
  return defineConfig(
    createConfig(tsconfigRootDir),

    {
      languageOptions: {
        globals: {
          ...globals.serviceworker,
          ...globals.browser,
        },
      },
    },
    reactHooks.configs.flat.recommended,

    {
      rules: {
        '@typescript-eslint/no-misused-promises': [
          'error',
          {
            checksVoidReturn: {
              attributes: false,
            },
          },
        ],
        'perfectionist/sort-jsx-props': [
          'error',
          {
            customGroups: [
              {
                elementNamePattern: '^on.+',
                groupName: 'callback',
              },
              {
                elementNamePattern: 'className',
                groupName: 'className',
              },
              {
                elementNamePattern: 'key',
                groupName: 'key',
              },
              {
                elementNamePattern: 'style',
                groupName: 'style',
              },
            ],
            groups: [
              'key',
              'className',
              'style',
              'prop',
              'shorthand-prop',
              'callback',
            ],
          },
        ],
      },
    },
  );
}
