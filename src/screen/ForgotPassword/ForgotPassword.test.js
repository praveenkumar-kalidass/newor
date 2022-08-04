import React from 'react';

import { act, render, fireEvent } from 'test/util';
import ForgotPassword from './ForgotPassword';

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
  forgotPassword: jest.fn(),
};
jest.mock('api/useUser', () => () => mockUseUser);

describe('ForgotPassword', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should match snapshot', async () => {
    const container = await render(<ForgotPassword />);

    expect(container).toMatchSnapshot();
  });

  it('should show toast when forgot password api fails', async () => {
    mockUseUser.forgotPassword.mockRejectedValueOnce({ response: { data: { code: 'NEWOR_INTERNAL_SERVER_ERROR' } } });

    const { getByTestId } = await render(<ForgotPassword />);

    await act(async () => {
      await fireEvent.changeText(getByTestId('forgot-password-input-email'), 'test@newor.com');
      await fireEvent(getByTestId('forgot-password-input-email'), 'onBlur');
    });

    await act(async () => {
      await fireEvent.press(getByTestId('forgot-password-submit'));
    });

    expect(mockToast.show).toHaveBeenCalledTimes(1);
  });

  it('should show modal and navigate when forgot password is success', async () => {
    mockUseUser.forgotPassword.mockResolvedValueOnce();

    const { getByTestId, queryByTestId } = await render(<ForgotPassword />);

    await act(async () => {
      await fireEvent.changeText(getByTestId('forgot-password-input-email'), 'test@newor.com');
      await fireEvent(getByTestId('forgot-password-input-email'), 'onBlur');
    });

    await act(async () => {
      await fireEvent.press(getByTestId('forgot-password-submit'));
    });

    expect(queryByTestId('forgot-password-success-modal')).not.toBeNull();

    await act(async () => {
      await fireEvent.press(getByTestId('forgot-password-success-login'));
    });

    expect(mockNavigation.navigate).toHaveBeenCalledTimes(1);
    expect(mockNavigation.navigate).toHaveBeenCalledWith('LOGIN');
  });
});
