import 'react-native-gesture-handler/jestSetup';

jest.mock('translation/useTranslation', () => () => ({
  translate: jest.fn((key) => key),
}));
