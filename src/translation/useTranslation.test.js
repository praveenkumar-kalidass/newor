import { act, renderHook } from '@testing-library/react-native';

import TranslationProvider from './TranslationProvider';
import useTranslation from './useTranslation';

jest.mock('./useTranslation', () => {
  const actual = jest.requireActual('./useTranslation');
  return actual;
});

describe('useTranslation', () => {
  it('should match snapshot for default translation', () => {
    const { result } = renderHook(() => useTranslation(), {
      wrapper: TranslationProvider,
    });

    expect(result.current.translation).toMatchSnapshot();
  });

  it('should match snapshot for updated translation', () => {
    const { result } = renderHook(() => useTranslation(), {
      wrapper: TranslationProvider,
    });

    act(() => result.current.changeTranslation('ta'));

    expect(result.current.translation).toMatchSnapshot();
  });

  it('should get translated text', () => {
    const { result } = renderHook(() => useTranslation(), {
      wrapper: TranslationProvider,
    });

    expect(result.current.translate('LOGIN')).toStrictEqual('Login');
    expect(result.current.translate('NAN')).toStrictEqual('NAN');
  });
});
