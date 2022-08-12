import { renderHook, act } from '@testing-library/react-native';
import mockAxios from 'jest-mock-axios';

import useAxios from './useAxios';

const mockUseLoader = {
  addLoader: jest.fn(),
  removeLoader: jest.fn(),
};
jest.mock('provider/Loader/useLoader', () => () => mockUseLoader);

describe('useAxios', () => {
  afterEach(() => {
    mockAxios.reset();
  });

  it('should', async () => {
    const { result } = renderHook(() => useAxios());

    result.current.get('/', { loader: true });
    await act(async () => {});
    expect(mockAxios.get).rejects.toHaveBeenCalledTimes(1);
    expect(
      result.current.interceptors.request.handlers[0].fulfilled({
        test: 'Hello World',
      }),
    ).toStrictEqual({
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
});
