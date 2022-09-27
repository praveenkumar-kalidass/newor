import { renderHook, waitFor, act } from '@testing-library/react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import UserProvider from './UserProvider';
import useUser from './useUser';

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
jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
}));
const mockUseUserApi = {
  authorize: jest.fn(),
};
jest.mock('api/useUser', () => () => mockUseUserApi);

describe('useUser', () => {
  it('should return isAuthorized as true on successful authorization', async () => {
    AsyncStorage.getItem.mockResolvedValueOnce(JSON.stringify({
      accessToken: 'test_access_token',
      refreshToken: 'test_refresh_token',
    }));
    mockUseUserApi.authorize.mockResolvedValueOnce({
      data: {
        accessToken: 'test_access_token',
        refreshToken: 'test_refresh_token',
        user: { id: 'test_user_id' },
      },
    });

    const { result } = await renderHook(() => useUser(), {
      wrapper: UserProvider,
    });
    await waitFor(() => expect(AsyncStorage.setItem).toHaveBeenCalledTimes(1));

    expect(result.current.isAuthorized).toStrictEqual(true);
  });

  it('should return isAuthorized as false on failed authorization', async () => {
    AsyncStorage.getItem.mockResolvedValueOnce(JSON.stringify({
      accessToken: 'test_access_token',
      refreshToken: 'test_refresh_token',
    }));
    mockUseUserApi.authorize.mockRejectedValueOnce();

    const { result } = await renderHook(() => useUser(), {
      wrapper: UserProvider,
    });
    await waitFor(() => expect(AsyncStorage.setItem).toHaveBeenCalledTimes(1));

    expect(result.current.isAuthorized).toStrictEqual(false);
  });

  it('should initialise worth', async () => {
    const { result } = await renderHook(() => useUser(), {
      wrapper: UserProvider,
    });

    act(() => result.current.initialiseWorth({
      value: 1234512345.12,
      asset: {
        id: 'test_asset_id',
        value: 12345.12,
      },
      liability: {
        id: 'test_liability_id',
        value: 12345.12,
      },
    }));

    expect(result.current.worth).toStrictEqual({
      label: '₹1,23,45,12,345.12',
      value: 1234512345.12,
    });
    expect(result.current.asset).toStrictEqual({
      id: 'test_asset_id',
      value: 12345.12,
      label: '₹12,345.12',
    });
    expect(result.current.liability).toStrictEqual({
      id: 'test_liability_id',
      value: 12345.12,
      label: '₹12,345.12',
    });
  });

  it('should load asset', async () => {
    const { result } = await renderHook(() => useUser(), {
      wrapper: UserProvider,
    });

    act(() => result.current.loadAsset({
      id: 'test_asset_id',
      value: 12345.12,
    }));

    expect(result.current.asset).toStrictEqual({
      id: 'test_asset_id',
      value: 12345.12,
      label: '₹12,345.12',
    });
  });

  it('should load liability', async () => {
    const { result } = await renderHook(() => useUser(), {
      wrapper: UserProvider,
    });

    act(() => result.current.loadLiability({
      id: 'test_liability_id',
      value: 12345.12,
    }));

    expect(result.current.liability).toStrictEqual({
      id: 'test_liability_id',
      value: 12345.12,
      label: '₹12,345.12',
    });
  });
});
