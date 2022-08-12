import { renderHook, act } from '@testing-library/react-native';

import LoaderProvider from './LoaderProvider';
import useLoader from './useLoader';

jest.mock('component/AppLoader', () => () => null);

describe('useLoader', () => {
  it('should show and hide loader', () => {
    const { result } = renderHook(() => useLoader(), {
      wrapper: LoaderProvider,
    });

    act(() => result.current.addLoader());

    expect(result.current.loading).toStrictEqual(true);

    act(() => result.current.removeLoader());

    expect(result.current.loading).toStrictEqual(false);
  });
});
