module.exports = {
  preset: 'react-native',
  setupFiles: ['./config/jestSetup.js'],
  transformIgnorePatterns: [],
  coveragePathIgnorePatterns: ['/navigation/'],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
};
