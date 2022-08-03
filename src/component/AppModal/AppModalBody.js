import React from 'react';
import PropTypes from 'prop-types';
import { Flex } from 'native-base';

const AppModalBody = ({ children }) => (
  <Flex justify="center" align="center">
    {children}
  </Flex>
);

AppModalBody.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppModalBody;
