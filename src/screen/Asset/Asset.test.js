import React from 'react';
import { act } from 'react-test-renderer';

import { render, fireEvent, waitFor } from 'test/util';
import Asset from './Asset';

jest.mock('provider/User/useUser', () => () => ({
  user: {},
  asset: {
    id: 'test_asset_id',
    value: 12345.12,
    label: '₹12,345.12',
  },
}));
const mockUseAsset = {
  getAsset: jest.fn(),
};
jest.mock('api/useAsset', () => () => mockUseAsset);
const mockNavigation = {
  navigate: jest.fn(),
};
jest.mock('@react-navigation/native', () => {
  const reactNavigation = jest.requireActual('@react-navigation/native');
  return {
    ...reactNavigation,
    useNavigation: () => mockNavigation,
    useIsFocused: () => true,
  };
});

describe('Asset', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should match snapshot', () => {
    mockUseAsset.getAsset.mockResolvedValueOnce({
      id: 'test_asset_id',
      value: 12345.12,
      list: [{
        type: 'SAVINGS',
        value: 12345.12,
        depositoryName: 'Test',
      }],
    });

    const container = render(<Asset />);

    expect(container).toMatchSnapshot();
  });

  it('should show error image when get asset fails', async () => {
    mockUseAsset.getAsset.mockRejectedValueOnce();

    const { queryByTestId, getByTestId } = await render(<Asset />);

    await waitFor(() => getByTestId('asset-failed-image'));

    expect(queryByTestId('asset-failed-image')).not.toBeNull();

    await act(async () => {
      await fireEvent.press(getByTestId('asset-reload'));
    });

    expect(mockUseAsset.getAsset).toHaveBeenCalledTimes(2);
  });

  it('should navigate to Asset Type screen', () => {
    const { getByTestId } = render(<Asset />);

    fireEvent.press(getByTestId('asset-add'));

    expect(mockNavigation.navigate).toHaveBeenCalledWith('ASSET_TYPE');
  });
});
