import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import AppLoader from 'component/AppLoader';
import LoaderContext from './LoaderContext';

const LoaderProvider = ({ children }) => {
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(Boolean(count));
  }, [count]);

  return (
    <LoaderContext.Provider
      // eslint-disable-next-line react/jsx-no-constructed-context-values
      value={{
        count,
        setCount,
        loading,
        setLoading,
      }}
    >
      <If condition={loading}>
        <AppLoader />
      </If>
      {children}
    </LoaderContext.Provider>
  );
};

LoaderProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default LoaderProvider;
