import { renderHook, act } from '@testing-library/react-native';

import usePreventBack from './usePreventBack';

const mockNavigation = {
  addListener: jest.fn(),
  removeListener: jest.fn(),
};
jest.mock('@react-navigation/native', () => {
  const reactNavigation = jest.requireActual('@react-navigation/native');
  return {
    ...reactNavigation,
    useNavigation: () => mockNavigation,
  };
});

describe('usePreventBack', () => {
  it('should add and remove listener for "beforeRemove"', () => {
    const { result, unmount } = renderHook(() => usePreventBack());

    expect(mockNavigation.addListener).toHaveBeenCalledWith('beforeRemove', expect.any(Function));
    expect(result.current).toBeNull();

    act(() => unmount());

    expect(mockNavigation.removeListener).toHaveBeenCalledWith('beforeRemove');
  });
});
