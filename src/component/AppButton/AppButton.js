import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'native-base';

import useTheme from '../../theme/useTheme';

const AppButton = ({ variant, ...other }) => {
  const theme = useTheme();
  const bg = useMemo(() => theme.color[`${variant.toUpperCase()}_100`], [variant]);
  const pressedBG = useMemo(() => theme.color[`${variant.toUpperCase()}_20`], [variant]);

  return (
    <Button
      bg={bg}
      _pressed={{ bg: pressedBG }}
      _text={{ fontWeight: 'bold' }}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...other}
    />
  );
};

AppButton.propTypes = {
  variant: PropTypes.oneOf(['primary', 'secondary']).isRequired,
};

export default AppButton;
