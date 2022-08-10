/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import PropTypes from 'prop-types';
import { render } from '@testing-library/react-native';
import { NavigationContainer } from '@react-navigation/native';
import { NativeBaseProvider } from 'native-base';

import ThemeProvider from 'theme/ThemeProvider';
import Provider from 'provider';

const AllTheProviders = ({ children }) => {
  const inset = {
    frame: {
      x: 0, y: 0, width: 0, height: 0,
    },
    insets: {
      top: 0, left: 0, right: 0, bottom: 0,
    },
  };

  return (
    <NavigationContainer>
      <NativeBaseProvider initialWindowMetrics={inset}>
        <ThemeProvider>
          <Provider>
            {children}
          </Provider>
        </ThemeProvider>
      </NativeBaseProvider>
    </NavigationContainer>
  );
};

AllTheProviders.propTypes = {
  children: PropTypes.node.isRequired,
};

const customRender = (ui, options) => render(ui, {
  wrapper: AllTheProviders,
  ...options,
});

// re-export everything
export * from '@testing-library/react-native';

// override render method
export { customRender as render };
