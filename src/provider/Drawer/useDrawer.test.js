import { renderHook, act } from '@testing-library/react-native';

import DrawerProvider from './DrawerProvider';
import useDrawer from './useDrawer';

jest.mock('theme/useTheme', () => () => ({
  color: {},
}));
jest.mock('component/Menu', () => () => null);

describe('useDrawer', () => {
  it('should open and close drawer', () => {
    const { result } = renderHook(() => useDrawer(), {
      wrapper: DrawerProvider,
    });

    act(() => result.current.open());

    expect(result.current.isActive).toStrictEqual(true);

    act(() => result.current.close());

    expect(result.current.isActive).toStrictEqual(false);
  });
});
