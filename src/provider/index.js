import React from 'react';
import PropTypes from 'prop-types';

import LoaderProvider from './Loader';
import UserProvider from './User';

const Provider = ({ children }) => (
  <LoaderProvider>
    <UserProvider>
      {children}
    </UserProvider>
  </LoaderProvider>
);

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;
