import React from 'react';
import { Platform } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';

import { render, act, fireEvent } from 'test/util';
import Profile from './Profile';

jest.mock('provider/User/useUser', () => () => ({
  user: {
    firstName: 'Hello',
    lastName: 'World',
    email: 'helloworld@test.com',
    mobileNumber: '9876543210',
  },
  setUser: jest.fn(),
}));
jest.mock('react-native-image-picker', () => ({
  launchImageLibrary: jest.fn(),
}));
const mockUseUserApi = {
  updatePicture: jest.fn(),
};
jest.mock('api/useUser', () => () => mockUseUserApi);
const mockToast = { show: jest.fn() };
jest.mock('native-base', () => {
  const nativeBase = jest.requireActual('native-base');
  return {
    ...nativeBase,
    useToast: () => mockToast,
  };
});

describe('Profile', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should match snapshot', () => {
    const container = render(<Profile />);

    expect(container).toMatchSnapshot();
  });

  it('should update profile picture successfully', async () => {
    Platform.OS = 'ios';
    launchImageLibrary.mockResolvedValueOnce({ assets: [] });
    mockUseUserApi.updatePicture.mockResolvedValueOnce({ data: { picture: 'test.png' } });

    const { getByTestId } = render(<Profile />);

    await act(async () => {
      await fireEvent.press(getByTestId('profile-update-picture'));
    });

    expect(mockToast.show).toHaveBeenCalledTimes(1);
  });

  it('should not update profile picture', async () => {
    Platform.OS = 'android';
    launchImageLibrary.mockResolvedValueOnce({ didCancel: true });

    const { getByTestId } = render(<Profile />);

    await act(async () => {
      await fireEvent.press(getByTestId('profile-update-picture'));
    });

    expect(mockToast.show).toHaveBeenCalledTimes(0);
  });

  it('should show error toast when update profile picture failed', async () => {
    launchImageLibrary.mockRejectedValueOnce();

    const { getByTestId } = render(<Profile />);

    await act(async () => {
      await fireEvent.press(getByTestId('profile-update-picture'));
    });

    expect(mockToast.show).toHaveBeenCalledTimes(1);
  });
});
