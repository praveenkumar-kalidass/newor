import React from 'react';

import { login } from '../../api/user';
import { act, render, fireEvent } from '../../test/util';
import Login from './Login';

const mockToast = { show: jest.fn() };
jest.mock('native-base', () => {
  const nativeBase = jest.requireActual('native-base');
  return {
    ...nativeBase,
    useToast: () => mockToast,
  };
});
jest.mock('../../api/user', () => ({
  login: jest.fn(),
}));

describe('Login', () => {
  it('should match snapshot', async () => {
    const container = await render(<Login />);
    const { getByTestId } = container;
    await act(async () => {
      fireEvent(getByTestId('login-logo-container'), 'onLayout', {
        nativeEvent: {
          layout: {
            height: 300,
            width: 300,
          },
        },
      });
    });

    expect(container).toMatchSnapshot();
  });

  it('should show toast when login fails', async () => {
    login.mockRejectedValueOnce({ response: { data: { code: 'NEWOR_INTERNAL_SERVER_ERROR' } } });

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
});
