import { useContext } from 'react';

import ThemeContext from './ThemeContext';

const useTheme = () => {
  const { theme, color } = useContext(ThemeContext);

  return { theme, color };
};

export default useTheme;
