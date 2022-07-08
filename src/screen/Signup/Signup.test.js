import React from 'react';

import { signup } from '../../api/user';
import { act, render, fireEvent } from '../../test/util';
import Signup from './Signup';

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
jest.mock('../../api/user', () => ({
  signup: jest.fn(),
}));

describe('Signup', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should match snapshot', async () => {
    const container = await render(<Signup />);

    expect(container).toMatchSnapshot();
  });

  it('should show toast when signup fails', async () => {
    signup.mockRejectedValueOnce({ response: { data: { code: 'NEWOR_INTERNAL_SERVER_ERROR' } } });

    const { getByTestId } = await render(<Signup />);

    await act(async () => {
      await fireEvent.changeText(getByTestId('signup-input-firstName'), 'Test');
      await fireEvent(getByTestId('signup-input-firstName'), 'onBlur');
      await fireEvent.changeText(getByTestId('signup-input-lastName'), 'Newor');
      await fireEvent(getByTestId('signup-input-lastName'), 'onBlur');
      await fireEvent.changeText(getByTestId('signup-input-email'), 'test@newor.com');
      await fireEvent(getByTestId('signup-input-email'), 'onBlur');
      await fireEvent.changeText(getByTestId('signup-input-password'), '123456');
      await fireEvent(getByTestId('signup-input-password'), 'onBlur');
    });

    await act(async () => {
      await fireEvent.press(getByTestId('signup-submit'));
    });

    expect(mockToast.show).toHaveBeenCalledTimes(1);
  });

  it('should show toast and navigate when signup is success', async () => {
    signup.mockResolvedValueOnce();

    const { getByTestId } = await render(<Signup />);

    await act(async () => {
      await fireEvent.changeText(getByTestId('signup-input-firstName'), 'Test');
      await fireEvent(getByTestId('signup-input-firstName'), 'onBlur');
      await fireEvent.changeText(getByTestId('signup-input-lastName'), 'Newor');
      await fireEvent(getByTestId('signup-input-lastName'), 'onBlur');
      await fireEvent.changeText(getByTestId('signup-input-email'), 'test@newor.com');
      await fireEvent(getByTestId('signup-input-email'), 'onBlur');
      await fireEvent.changeText(getByTestId('signup-input-password'), '123456');
      await fireEvent(getByTestId('signup-input-password'), 'onBlur');
    });

    await act(async () => {
      await fireEvent.press(getByTestId('signup-submit'));
    });

    expect(mockToast.show).toHaveBeenCalledTimes(1);

    await act(() => {
      mockToast.show.mock.calls[0][0].onCloseComplete();
    });

    expect(mockNavigation.navigate).toHaveBeenCalledTimes(1);
    expect(mockNavigation.navigate).toHaveBeenCalledWith('LOGIN');
  });
});
