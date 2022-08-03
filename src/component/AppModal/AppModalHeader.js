import React from 'react';
import PropTypes from 'prop-types';
import { Flex, CloseIcon, Divider } from 'native-base';

import { CloseButton } from './AppModal.style';

const AppModalHeader = ({ children, showClose, onClose }) => (
  <>
    <Flex direction="row" justify="space-between" align="center">
      {children}
      <If condition={showClose}>
        <CloseButton icon={<CloseIcon />} onPress={onClose} />
      </If>
    </Flex>
    <Divider my="2" />
  </>
);

AppModalHeader.propTypes = {
  children: PropTypes.node.isRequired,
  showClose: PropTypes.bool,
  onClose: PropTypes.func,
};

AppModalHeader.defaultProps = {
  showClose: true,
  onClose: () => {},
};

export default AppModalHeader;
