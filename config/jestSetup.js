import 'react-native-gesture-handler/jestSetup';

import mockAsyncStorage from '@react-native-async-storage/async-storage/jest/async-storage-mock';

jest.mock('@react-native-async-storage/async-storage', () => mockAsyncStorage);

jest.mock('translation/useTranslation', () => () => ({
  translate: jest.fn((key) => key),
}));

jest.mock('./config', () => {
  const config = jest.requireActual('./config.test.json');
  return config;
});
