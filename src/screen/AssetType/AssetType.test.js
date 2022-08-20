import React from 'react';

import { render, fireEvent } from 'test/util';
import AssetType from './AssetType';

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

describe('AssetType', () => {
  it('should match snapshot', () => {
    const container = render(<AssetType />);

    expect(container).toMatchSnapshot();
  });

  it('should navigate to add deposit screen', () => {
    const { getByTestId } = render(<AssetType />);

    fireEvent.press(getByTestId('asset-type-DEPOSIT'));

    expect(mockNavigation.navigate).toHaveBeenCalledWith('ADD_DEPOSIT');
  });
});
