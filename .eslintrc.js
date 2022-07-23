module.exports = {
  env: {
    browser: true,
    es2021: true,
    jest: true,
    'jsx-control-statements/jsx-control-statements': true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
    'plugin:jsx-control-statements/recommended',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: [
    'react',
    'jsx-control-statements',
  ],
  rules: {
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
    'react/function-component-definition': [0, { namedComponents: 'function-declaration' }],
    'react/jsx-no-undef': [2, { allowGlobals: true }],
  },
  settings: {
    'import/resolver': {
      'babel-module': {},
    },
  },
};
