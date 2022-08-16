import { renderHook } from '@testing-library/react-native';

import useUser from './useUser';

const mockAxios = {
  post: jest.fn(),
  put: jest.fn(),
};
jest.mock('./useAxios', () => () => mockAxios);

describe('useUser', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('login', () => {
    const { result } = renderHook(() => useUser());

    result.current.login({
      email: 'hello_world@test.com',
      password: '123456',
    });

    expect(mockAxios.post).toHaveBeenCalledWith(
      'http://localhost:3000/api/user/v1/login',
      'email=hello_world%40test.com&password=123456&clientId=qwerty-1234567890&clientSecret=test123&grantType=password&responseType=code',
      {
        'Content-Type': 'application/x-www-form-urlencoded',
        authorization: false,
      },
    );
  });

  it('authorize', () => {
    const { result } = renderHook(() => useUser());

    result.current.authorize('test_refresh_token');

    expect(mockAxios.post).toHaveBeenCalledWith(
      'http://localhost:3000/api/user/v1/authorize',
      'refreshToken=test_refresh_token&clientId=qwerty-1234567890&clientSecret=test123&grantType=refresh_token',
      {
        'Content-Type': 'application/x-www-form-urlencoded',
        loader: true,
        authorization: false,
      },
    );
  });

  it('signup', () => {
    const { result } = renderHook(() => useUser());

    result.current.signup({ test: 'hello world' });

    expect(mockAxios.post).toHaveBeenCalledWith(
      'http://localhost:3000/api/user/v1/signup',
      { test: 'hello world' },
      { authorization: false },
    );
  });

  it('forgotPassword', () => {
    const { result } = renderHook(() => useUser());

    result.current.forgotPassword({ test: 'hello world' });

    expect(mockAxios.post).toHaveBeenCalledWith(
      'http://localhost:3000/api/user/v1/forgot-password',
      { test: 'hello world' },
      { authorization: false },
    );
  });

  it('verify', () => {
    const { result } = renderHook(() => useUser());

    result.current.verify({ test: 'hello world' });

    expect(mockAxios.put).toHaveBeenCalledWith(
      'http://localhost:3000/api/user/v1/verify',
      { test: 'hello world' },
      {
        loader: true,
        authorization: false,
      },
    );
  });

  it('resetPassword', () => {
    const { result } = renderHook(() => useUser());

    result.current.resetPassword({ test: 'hello world' });

    expect(mockAxios.put).toHaveBeenCalledWith(
      'http://localhost:3000/api/user/v1/reset-password',
      { test: 'hello world' },
      { authorization: false },
    );
  });
});
