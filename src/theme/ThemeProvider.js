import React, { useEffect, useState } from 'react';
import { Appearance } from 'react-native';
import PropTypes from 'prop-types';
import { ThemeProvider as StyledThemeProvider } from 'styled-components/native';
import { useColorMode } from 'native-base';

import * as themeColor from 'constant/color';
import constant from 'constant';
import ThemeContext from './ThemeContext';

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(constant.THEME.LIGHT);
  const [color, setColor] = useState(themeColor.light);
  const { setColorMode } = useColorMode();

  useEffect(() => {
    setColor(themeColor[theme]);
    setColorMode(theme);
  }, [theme]);

  useEffect(() => {
    setTheme(Appearance.getColorScheme());
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
