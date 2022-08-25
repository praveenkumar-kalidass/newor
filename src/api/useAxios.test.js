import { renderHook, act } from '@testing-library/react-native';
import mockAxios from 'jest-mock-axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

import useAxios from './useAxios';

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
  setItem: jest.fn(),
  getItem: jest.fn(),
  removeItem: jest.fn(),
}));
const mockUseLoader = {
  addLoader: jest.fn(),
  removeLoader: jest.fn(),
};
jest.mock('provider/Loader/useLoader', () => () => mockUseLoader);
jest.mock('provider/User/useUser', () => () => ({
  setIsAuthorized: jest.fn(),
}));

describe('useAxios', () => {
  afterEach(() => {
    mockAxios.reset();
  });

  it('should use interceptors', async () => {
    const { result } = renderHook(() => useAxios());

    result.current.get('/', { loader: true });
    await act(async () => {});
    expect(mockAxios.get).rejects.toHaveBeenCalledTimes(1);
    expect(
      result.current.interceptors.request.handlers[0].fulfilled({
        test: 'Hello World',
      }),
    ).resolves.toStrictEqual({
      test: 'Hello World',
    });
    expect(mockUseLoader.addLoader).toHaveBeenCalledTimes(1);

    expect(
      result.current.interceptors.response.handlers[0].rejected({
        config: { loader: true },
      }),
    ).rejects.not.toBeNull();
    expect(mockUseLoader.removeLoader).toHaveBeenCalledTimes(1);

    expect(
      result.current.interceptors.response.handlers[0].fulfilled({
        config: {},
      }),
    ).not.toBeNull();
    expect(
      result.current.interceptors.response.handlers[0].rejected({
        config: {},
      }),
    ).rejects.toBeNull();
  });

  it('should navigate back to login on authorization failure', async () => {
    AsyncStorage.getItem.mockResolvedValueOnce(JSON.stringify({
      accessToken: 'test_access_token',
      refreshToken: 'test_refresh_token',
      idToken: 'test_id_token',
    }));

    const { result } = renderHook(() => useAxios());

    result.current.get('/');

    await expect(
      result.current.interceptors.response.handlers[0].rejected({
        config: { loader: true },
        response: { data: { code: 'NEWOR_UNAUTHENTICATED' } },
      }),
    ).rejects.toStrictEqual({ logout: true });

    expect(mockNavigation.navigate).toHaveBeenCalledWith('LOGIN');
  });
});
