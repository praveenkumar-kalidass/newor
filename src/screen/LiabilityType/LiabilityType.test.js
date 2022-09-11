import React from 'react';

import { render, fireEvent } from 'test/util';
import LiabilityType from './LiabilityType';

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

describe('LiabilityType', () => {
  it('should match snapshot', () => {
    const container = render(<LiabilityType />);

    expect(container).toMatchSnapshot();
  });

  it('should navigate to add loan screen', () => {
    const { getByTestId } = render(<LiabilityType />);

    fireEvent.press(getByTestId('liability-type-LOAN'));

    expect(mockNavigation.navigate).toHaveBeenCalledWith('ADD_LOAN');
  });
});
