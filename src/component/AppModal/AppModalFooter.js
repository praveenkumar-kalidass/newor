import React from 'react';
import PropTypes from 'prop-types';
import { Divider, Flex } from 'native-base';

const AppModalFooter = ({ children }) => (
  <>
    <Divider my="5" />
    <Flex direction="row" justify="flex-end" align="center">
      {children}
    </Flex>
  </>
);

AppModalFooter.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppModalFooter;
