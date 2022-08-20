import React from 'react';
import PropTypes from 'prop-types';
import { useNavigation } from '@react-navigation/native';
import { IconButton } from 'native-base';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import COLOR from 'constant/color';

const HeaderButton = ({ type, target }) => {
  const navigation = useNavigation();

  const icon = {
    left: <FontAwesome color={COLOR.LIGHT_BACKGROUND_100} size={24} name="chevron-left" />,
    right: <FontAwesome color={COLOR.LIGHT_BACKGROUND_100} size={24} name="close" />,
  };

  const action = {
    left: navigation.goBack,
    right: navigation.navigate,
  };

  const margin = {
    left: { ml: 3 },
    right: { mr: 3 },
  };

  return (
    <IconButton
      testID="header-button"
      variant="ghost"
      icon={icon[type]}
      onPress={() => action[type](target)}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...margin[type]}
    />
  );
};

HeaderButton.propTypes = {
  type: PropTypes.string.isRequired,
  target: PropTypes.string,
};

HeaderButton.defaultProps = {
  target: '',
};

export default HeaderButton;
