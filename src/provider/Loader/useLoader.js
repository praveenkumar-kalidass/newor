import { useContext, useCallback } from 'react';

import LoaderContext from './LoaderContext';

const useLoader = () => {
  const { loading, setCount } = useContext(LoaderContext);

  const addLoader = useCallback(() => setCount((c) => c + 1), [setCount]);

  const removeLoader = useCallback(() => setCount((c) => c - 1), [setCount]);

  return {
    loading,
    addLoader,
    removeLoader,
  };
};

export default useLoader;
