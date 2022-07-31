import React from 'react';
import PropTypes from 'prop-types';
import { useWindowDimensions } from 'react-native';
import {
  Alert, Box, Text, HStack, VStack,
} from 'native-base';

import COLOR from 'constant/color';

const ToastAlert = ({ status, message, description }) => {
  const { width } = useWindowDimensions();
  const toastWidth = width - 40;

  return (
    <Alert variant="left-accent" status={status} w={`${toastWidth}px`}>
      <VStack space={2} flexShrink={1} w={`${toastWidth - 45}px`}>
        <HStack flexShrink={1} space={2} alignItems="center" justifyContent="space-between">
          <HStack space={2} flexShrink={1} alignItems="center">
            <Alert.Icon />
            <Text fontSize="md" fontWeight="medium" color={COLOR.DARK_BACKGROUND_100}>
              {message}
            </Text>
          </HStack>
        </HStack>
        <If condition={description}>
          <Box
            pl={6}
            _text={{
              color: COLOR.DARK_BACKGROUND_50,
            }}
          >
            {description}
          </Box>
        </If>
      </VStack>
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
