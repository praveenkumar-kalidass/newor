import React from 'react';

import { render, fireEvent } from 'test/util';
import TabBar from './TabBar';

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

describe('AppModal', () => {
  it('should match snapshot', () => {
    const container = render(<TabBar />);

    expect(container).toMatchSnapshot();
  });

  it('should navigate to Asset screen', () => {
    const { getByTestId } = render(<TabBar />);

    fireEvent.press(getByTestId('tab-asset'));

    expect(mockNavigation.navigate).toHaveBeenCalledWith('ASSET');
  });

  it('should navigate to Liability screen', () => {
    const { getByTestId } = render(<TabBar />);

    fireEvent.press(getByTestId('tab-liability'));

    expect(mockNavigation.navigate).toHaveBeenCalledWith('LIABILITY');
  });
});
