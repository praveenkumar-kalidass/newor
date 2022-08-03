import React from 'react';
import { Modal } from 'react-native';
import PropTypes from 'prop-types';

import { ModalContainer, ModalOverlay } from './AppModal.style';

const AppModal = ({
  visible,
  children,
  ...others
}) => (
  <Modal
    animationType="slide"
    transparent
    visible={visible}
    // eslint-disable-next-line react/jsx-props-no-spreading
    {...others}
  >
    <ModalOverlay>
      <ModalContainer>
        {children}
      </ModalContainer>
    </ModalOverlay>
  </Modal>
);

AppModal.propTypes = {
  visible: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
};

export default AppModal;
