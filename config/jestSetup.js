import React from 'react';
import 'react-native-gesture-handler/jestSetup';
import '@react-native-community/datetimepicker/jest/setup';

import mockAsyncStorage from '@react-native-async-storage/async-storage/jest/async-storage-mock';

jest.mock('@react-native-async-storage/async-storage', () => mockAsyncStorage);

jest.mock('@react-navigation/elements', () => ({
  useHeaderHeight: jest.fn(() => 0),
}));

jest.mock('@react-native-google-signin/google-signin', () => {
  const { Button } = jest.requireActual('react-native');
  const { Component } = jest.requireActual('react');
  // eslint-disable-next-line react/jsx-props-no-spreading
  class GoogleSigninButton extends Component {
    static Size = {
      Wide: 1,
    };

    static Color = {
      Dark: 0,
      Light: 1,
    };

    // eslint-disable-next-line react/jsx-props-no-spreading
    render() { return (<Button title="button" {...this.props} />); }
  }
  return { GoogleSigninButton };
});

jest.mock('translation/useTranslation', () => () => ({
  translate: jest.fn((key) => key),
}));

jest.mock('./config', () => {
  const config = jest.requireActual('./config.test.json');
  return config;
});
