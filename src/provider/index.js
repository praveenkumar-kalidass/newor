import React from 'react';
import PropTypes from 'prop-types';

import LoaderProvider from './Loader';

const Provider = ({ children }) => (
  <LoaderProvider>
    {children}
  </LoaderProvider>
);

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;
