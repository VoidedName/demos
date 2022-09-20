module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
  ],
  overrides: [
    {
      extends: [
        'plugin:react/recommended',
        'airbnb',
        'airbnb-typescript',
      ],
      files: ['*.ts', '*.tsx'],
      parserOptions: {
        project: ['./tsconfig.json'],
      },
      rules: {
        '@typescript-eslint/no-loop-func': 'off',
        'import/prefer-default-export': 'off',
        'react/require-default-props': 'off',
        'jsx-a11y/label-has-associated-control': 'off',
        'react/no-unused-prop-types': 'warn',
        '@typescript-eslint/no-unused-vars': 'warn',
        'max-len': 'off',
        'react/jsx-props-no-spreading': 'off',
        '@typescript-eslint/no-redeclare': 'off',
        'import/no-named-as-default': 'off',
      },
    },
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: [
    'react',
  ],
  rules: {
  },
};
