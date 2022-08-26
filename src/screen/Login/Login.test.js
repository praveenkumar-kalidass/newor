import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { act, render, fireEvent } from 'test/util';
import Login from './Login';

const mockNavigation = {
  navigate: jest.fn(),
};
jest.mock('@react-navigation/native', () => {
  const reactNavigation = jest.requireActual('@react-navigation/native');
  return {
    ...reactNavigation,
    useNavigation: () => mockNavigation,
  };
});
const mockToast = { show: jest.fn() };
jest.mock('native-base', () => {
  const nativeBase = jest.requireActual('native-base');
  return {
    ...nativeBase,
    useToast: () => mockToast,
  };
});
const mockUseUser = {
  login: jest.fn(),
};
jest.mock('api/useUser', () => () => mockUseUser);
jest.mock('@react-native-async-storage/async-storage', () => ({
  setItem: jest.fn(),
}));
jest.mock('hook/usePreventBack');
jest.mock('provider/User/useUser', () => () => ({
  user: {},
  isAuthorized: false,
  setUser: jest.fn(),
}));

describe('Login', () => {
  it('should match snapshot', async () => {
    const container = await render(<Login />);

    expect(container).toMatchSnapshot();
  });

  it('should show toast when login fails', async () => {
    mockUseUser.login.mockRejectedValueOnce({ response: { data: { code: 'NEWOR_INTERNAL_SERVER_ERROR' } } });

    const { getByTestId } = await render(<Login />);

    await act(async () => {
      await fireEvent.changeText(getByTestId('login-input-email'), 'test@newor.com');
      await fireEvent(getByTestId('login-input-email'), 'onBlur');
      await fireEvent.changeText(getByTestId('login-input-password'), '123456');
      await fireEvent(getByTestId('login-input-password'), 'onBlur');
    });

    await act(async () => {
      await fireEvent.press(getByTestId('login-submit'));
    });

    expect(mockToast.show).toHaveBeenCalledTimes(1);
  });

  it('should set auth token and navigation to Dashboard on login', async () => {
    mockUseUser.login.mockResolvedValueOnce({
      data: {
        accessToken: 'testaccesstoken123',
        refreshToken: 'testrefreshtoken123',
        user: {
          idToken: 'testidtoken123',
        },
      },
    });

    const { getByTestId } = await render(<Login />);

    await act(async () => {
      await fireEvent.changeText(getByTestId('login-input-email'), 'test@newor.com');
      await fireEvent(getByTestId('login-input-email'), 'onBlur');
      await fireEvent.changeText(getByTestId('login-input-password'), '123456');
      await fireEvent(getByTestId('login-input-password'), 'onBlur');
    });

    await act(async () => {
      await fireEvent.press(getByTestId('login-submit'));
    });

    expect(AsyncStorage.setItem).toHaveBeenCalledWith('NEWOR_AUTH_TOKEN', JSON.stringify({
      accessToken: 'testaccesstoken123',
      refreshToken: 'testrefreshtoken123',
      idToken: 'testidtoken123',
    }));
    expect(mockNavigation.navigate).toHaveBeenCalledWith('DASHBOARD_TAB');
  });
});
