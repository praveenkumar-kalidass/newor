module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    'jsx-control-statements',
    [
      'module-resolver',
      {
        root: './src',
        alias: {
          api: './src/api',
          asset: './src/asset',
          component: './src/component',
          constant: './src/constant',
          helper: './src/helper',
          navigation: './src/navigation',
          provider: './src/provider',
          screen: './src/screen',
          test: './src/test',
          theme: './src/theme',
          translation: './src/translation',
        },
        transformFunctions: ['jest.mock'],
      },
    ],
  ],
};
