import { renderHook } from '@testing-library/react-native';

import useAsset from './useAsset';

const mockAxios = {
  post: jest.fn(),
};
jest.mock('./useAxios', () => () => mockAxios);

describe('useAsset', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('addDeposit', () => {
    const { result } = renderHook(() => useAsset());

    result.current.addDeposit({
      assetId: 'test_asset_id',
      value: 12345,
    });

    expect(mockAxios.post).toHaveBeenCalledWith(
      'http://localhost:3000/api/deposit/v1',
      {
        assetId: 'test_asset_id',
        value: 12345,
      },
    );
  });
});
