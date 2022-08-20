import React from 'react';

import { render, fireEvent } from 'test/util';
import Asset from './Asset';

jest.mock('provider/User/useUser', () => () => ({
  asset: {
    id: 'test_asset_id',
    value: 12345.12,
    label: '₹12,345.12',
  },
}));
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

describe('Asset', () => {
  it('should match snapshot', () => {
    const container = render(<Asset />);

    expect(container).toMatchSnapshot();
  });

  it('should navigate to Asset Type screen', () => {
    const { getByTestId } = render(<Asset />);

    fireEvent.press(getByTestId('asset-add'));

    expect(mockNavigation.navigate).toHaveBeenCalledWith('ASSET_TYPE');
  });
});
