import React from 'react';

import { render, fireEvent } from 'test/util';
import HeaderButton from './HeaderButton';

const mockNavigation = {
  navigate: jest.fn(),
  goBack: jest.fn(),
};
jest.mock('@react-navigation/native', () => {
  const reactNavigation = jest.requireActual('@react-navigation/native');
  return {
    ...reactNavigation,
    useNavigation: () => mockNavigation,
  };
});

describe('HeaderButton', () => {
  it('should render header left button', () => {
    const container = render(<HeaderButton type="left" />);

    expect(container).toMatchSnapshot();

    fireEvent.press(container.getByTestId('header-button'));

    expect(mockNavigation.goBack).toHaveBeenCalledTimes(1);
  });

  it('should render header right button', () => {
    const container = render(<HeaderButton type="right" target="TEST" />);

    expect(container).toMatchSnapshot();

    fireEvent.press(container.getByTestId('header-button'));

    expect(mockNavigation.navigate).toHaveBeenCalledWith('TEST');
  });
});
