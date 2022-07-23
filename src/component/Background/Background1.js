import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { Polygon, Svg } from 'react-native-svg';

import useTheme from 'theme/useTheme';
import BackgroundContainer from './Background.style';

const Background1 = ({ height, width }) => {
  const theme = useTheme();
  const primaryBackground = useMemo(
    () => `0,0 0,${height} ${width},${height} 30,${height - 30} 0,0`,
    [],
  );
  const secondaryBackground = useMemo(
    () => `0,0 ${width},0 ${width},${height} ${width - 30},30 0,0`,
    [],
  );

  return (
    <BackgroundContainer>
      <Svg height={height} width={width}>
        <Polygon fill={theme.color.PRIMARY_100} points={primaryBackground} />
        <Polygon fill={theme.color.SECONDARY_100} points={secondaryBackground} />
      </Svg>
    </BackgroundContainer>
  );
};

Background1.propTypes = {
  height: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
};

export default Background1;
