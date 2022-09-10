import { renderHook } from '@testing-library/react-native';

import useLiability from './useLiability';

const mockAxios = {
  get: jest.fn(),
};
jest.mock('./useAxios', () => () => mockAxios);

describe('useLiability', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('getLiability', () => {
    const { result } = renderHook(() => useLiability());

    result.current.getLiability('test_liability_id');

    expect(mockAxios.get).toHaveBeenCalledWith('http://localhost:3000/api/liability/v1/test_liability_id');
  });
});
