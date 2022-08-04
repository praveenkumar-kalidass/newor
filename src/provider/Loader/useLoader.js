import { useContext, useCallback } from 'react';

import LoaderContext from './LoaderContext';

const useLoader = () => {
  const { loading, count, setCount } = useContext(LoaderContext);

  const addLoader = useCallback(() => setCount(count + 1), [count, setCount]);

  const removeLoader = useCallback(() => setCount(count - 1), [count, setCount]);

  return {
    loading,
    addLoader,
    removeLoader,
  };
};

export default useLoader;
