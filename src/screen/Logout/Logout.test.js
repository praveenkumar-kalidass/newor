import React from 'react';

import { render, fireEvent, act } from 'test/util';
import Logout from './Logout';

const mockNavigation = {
  navigate: jest.fn(),
  goBack: jest.fn(),
};
jest.mock('@react-navigation/native', () => {
  const reactNavigation = jest.requireActual('@react-navigation/native');
  return {
    ...reactNavigation,
    useNavigation: () => mockNavigation,
  };
});
const mockUseUser = {
  logout: jest.fn(),
};
jest.mock('api/useUser', () => () => mockUseUser);
const mockToast = { show: jest.fn() };
jest.mock('native-base', () => {
  const nativeBase = jest.requireActual('native-base');
  return {
    ...nativeBase,
    useToast: () => mockToast,
  };
});

describe('Logout', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should match snapshot', () => {
    const container = render(<Logout />);

    expect(container).toMatchSnapshot();
  });

  it('should go back on declining logout', () => {
    const { getByTestId } = render(<Logout />);

    fireEvent.press(getByTestId('logout-no'));

    expect(mockNavigation.goBack).toHaveBeenCalledTimes(1);
  });

  it('should go to login on approving logout', async () => {
    mockUseUser.logout.mockResolvedValueOnce();

    const { getByTestId } = render(<Logout />);

    await act(async () => {
      await fireEvent.press(getByTestId('logout-yes'));
    });

    expect(mockNavigation.navigate).toHaveBeenCalledWith('LOGIN');
  });

  it('should show toast on failed logout', async () => {
    mockUseUser.logout.mockRejectedValueOnce();

    const { getByTestId } = render(<Logout />);

    await act(async () => {
      await fireEvent.press(getByTestId('logout-yes'));
    });

    expect(mockToast.show).toHaveBeenCalledTimes(1);
  });
});
