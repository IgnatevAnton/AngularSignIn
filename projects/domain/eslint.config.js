// @ts-check
const tseslint = require('typescript-eslint');
const rootConfig = require('../../eslint.config.js');

module.exports = tseslint.config(
  ...rootConfig,
  {
    files: ['**/*.ts'],
    rules: {
      '@angular-eslint/directive-selector': [
        'error',
        {
          type: 'attribute',
          prefix: 'lib',
          style: 'camelCase',
        },
      ],
      '@angular-eslint/component-selector': [
        'error',
        {
          type: 'element',
          prefix: 'lib',
          style: 'kebab-case',
        },
      ],
      'no-restricted-imports': [
        'error',
        {
          paths: [
            {
              name: '#domain',
              message: `Importing from #domain is not allowed.`,
            },
            {
              name: '#application',
              message: `Importing from #application is not allowed.`,
            },
            {
              name: '#infrastructure',
              message: `Importing from #infrastructure is not allowed.`,
            },
          ],
        },
      ],
    },
  },
  {
    files: ['**/*.html'],
    rules: {},
  }
);
