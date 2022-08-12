import { useContext, useCallback } from 'react';

import DrawerContext from './DrawerContext';

const useDrawer = () => {
  const { isOpen, setIsOpen } = useContext(DrawerContext);

  const open = useCallback(() => setIsOpen(true), [setIsOpen]);

  const close = useCallback(() => setIsOpen(false), [setIsOpen]);

  return {
    isActive: isOpen,
    open,
    close,
  };
};

export default useDrawer;
