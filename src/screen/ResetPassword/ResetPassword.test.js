import React from 'react';

import { act, render, fireEvent } from 'test/util';
import ResetPassword from './ResetPassword';

const mockNavigation = {
  navigate: jest.fn(),
};
jest.mock('@react-navigation/native', () => {
  const reactNavigation = jest.requireActual('@react-navigation/native');
  return {
    ...reactNavigation,
    useNavigation: () => mockNavigation,
    useRoute: () => ({ params: 'testtoken123' }),
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
  resetPassword: jest.fn(),
};
jest.mock('api/useUser', () => () => mockUseUser);

describe('ResetPassword', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should match snapshot', async () => {
    const container = await render(<ResetPassword />);

    expect(container).toMatchSnapshot();
  });

  it('should show toast when reset password fails', async () => {
    mockUseUser.resetPassword.mockRejectedValueOnce({ response: { data: { code: 'NEWOR_INTERNAL_SERVER_ERROR' } } });

    const { getByTestId } = await render(<ResetPassword />);

    await act(async () => {
      await fireEvent.changeText(getByTestId('reset-password-input-password'), 'test1234');
      await fireEvent(getByTestId('reset-password-input-password'), 'onBlur');
      await fireEvent.changeText(getByTestId('reset-password-input-confirmPassword'), 'test1234');
      await fireEvent(getByTestId('reset-password-input-confirmPassword'), 'onBlur');
    });

    await act(async () => {
      await fireEvent.press(getByTestId('reset-password-submit'));
    });

    expect(mockToast.show).toHaveBeenCalledTimes(1);
  });

  it('should show modal and navigate when reset password is success', async () => {
    mockUseUser.resetPassword.mockResolvedValueOnce();

    const { getByTestId, queryByTestId } = await render(<ResetPassword />);

    await act(async () => {
      await fireEvent.changeText(getByTestId('reset-password-input-password'), 'test1234');
      await fireEvent(getByTestId('reset-password-input-password'), 'onBlur');
      await fireEvent.changeText(getByTestId('reset-password-input-confirmPassword'), 'test1234');
      await fireEvent(getByTestId('reset-password-input-confirmPassword'), 'onBlur');
    });

    await act(async () => {
      await fireEvent.press(getByTestId('reset-password-submit'));
    });

    expect(queryByTestId('reset-password-success-modal')).not.toBeNull();

    await act(async () => {
      await fireEvent.press(getByTestId('reset-password-success-login'));
    });

    expect(mockNavigation.navigate).toHaveBeenCalledTimes(1);
    expect(mockNavigation.navigate).toHaveBeenCalledWith('LOGIN');
  });
});
