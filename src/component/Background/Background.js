import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { Polygon, Svg } from 'react-native-svg';

import COLOR from '../../constant/color';
import BackgroundContainer from './Background.style';

const Background = ({ height, width }) => {
  const primaryBackground = useMemo(
    () => `0,0 0,${height} ${width},${height} 30,${height - 30} 0,0`,
    [height, width],
  );
  const secondaryBackground = useMemo(
    () => `0,0 ${width},0 ${width},${height} ${width - 30},30 0,0`,
    [height, width],
  );

  return (
    <BackgroundContainer>
      <Svg height={height} width={width}>
        <Polygon fill={COLOR.LIGHT_PRIMARY_100} points={primaryBackground} />
        <Polygon fill={COLOR.LIGHT_SECONDARY_100} points={secondaryBackground} />
      </Svg>
    </BackgroundContainer>
  );
};

Background.propTypes = {
  height: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
};

export default Background;
