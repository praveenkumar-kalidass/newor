/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import PropTypes from 'prop-types';
import { render } from '@testing-library/react-native';
import { NativeBaseProvider } from 'native-base';

const AllTheProviders = ({ children }) => (
  <NativeBaseProvider>
    {children}
  </NativeBaseProvider>
);

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
