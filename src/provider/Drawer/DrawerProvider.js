import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Drawer from 'react-native-drawer';

import Menu from 'component/Menu';
import DrawerContext from './DrawerContext';

const DrawerProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <DrawerContext.Provider
      // eslint-disable-next-line react/jsx-no-constructed-context-values
      value={{
        isOpen,
        setIsOpen,
      }}
    >
      <Drawer
        open={isOpen}
        type="overlay"
        tapToClose
        openDrawerOffset={0.2}
        content={<Menu />}
        onClose={() => setIsOpen(false)}
      >
        {children}
      </Drawer>
    </DrawerContext.Provider>
  );
};

DrawerProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default DrawerProvider;
