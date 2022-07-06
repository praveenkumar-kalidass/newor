module.exports = {
  preset: 'react-native',
  setupFiles: ['./config/jestSetup.js'],
  transformIgnorePatterns: [],
  coveragePathIgnorePatterns: ['/navigation/'],
};
