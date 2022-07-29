import React from 'react';
import PropTypes from 'prop-types';
import { useWindowDimensions } from 'react-native';
import {
  Alert, Box, Flex, Spacer, Text, HStack,
} from 'native-base';

import COLOR from 'constant/color';

const ToastAlert = ({ status, message, description }) => {
  const { width } = useWindowDimensions();
  const toastWidth = width - 40;

  return (
    <Alert variant="left-accent" status={status} w={`${toastWidth}px`}>
      <Flex direction="column">
        <HStack space={2} alignItems="center" justifyContent="space-between">
          <Alert.Icon />
          <Spacer />
          <Text fontSize="md" fontWeight="medium" color={COLOR.DARK_BACKGROUND_100}>
            {message}
          </Text>
        </HStack>
        <If condition={description}>
          <Box>{description}</Box>
        </If>
      </Flex>
    </Alert>
  );
};

ToastAlert.propTypes = {
  status: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  description: PropTypes.string,
};

ToastAlert.defaultProps = {
  description: '',
};

export default ToastAlert;
