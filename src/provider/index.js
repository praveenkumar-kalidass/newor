import React from 'react';
import PropTypes from 'prop-types';

import DrawerProvider from './Drawer';
import LoaderProvider from './Loader';
import UserProvider from './User';

const Provider = ({ children }) => (
  <LoaderProvider>
    <UserProvider>
      <DrawerProvider>
        {children}
      </DrawerProvider>
    </UserProvider>
  </LoaderProvider>
);

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;
