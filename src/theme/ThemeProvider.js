import React, { useEffect, useState } from 'react';
import { Appearance } from 'react-native';
import PropTypes from 'prop-types';
import { ThemeProvider as StyledThemeProvider } from 'styled-components/native';

import ThemeContext from './ThemeContext';

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');
  const [color] = useState({});

  useEffect(() => {
    const appearanceListener = Appearance.addChangeListener(({ colorScheme }) => {
      setTheme(colorScheme);
    });
    return () => {
      appearanceListener.remove();
    };
  }, []);

  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <ThemeContext.Provider value={{ theme, color }}>
      <StyledThemeProvider theme={{ theme, color }}>
        {children}
      </StyledThemeProvider>
    </ThemeContext.Provider>
  );
};

ThemeProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ThemeProvider;
