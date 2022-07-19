import React, { useMemo } from 'react';
import { useWindowDimensions } from 'react-native';
import Svg, { Path } from 'react-native-svg';

import COLOR from '../../constant/color';
import BackgroundContainer from './Background.style';

const Background2 = () => {
  const { height, width } = useWindowDimensions();

  const primaryDataPoint = useMemo(
    () => `M0 0 L0 ${height / 2} L${width / 2} 0 L0 0 Z`,
    [],
  );

  const secondaryDataPoint = useMemo(
    () => `M${width} ${height} L${width / 2} ${height} L${width} ${height / 2} L${width} ${height} Z`,
    [],
  );

  return (
    <BackgroundContainer>
      <Svg height={height} width={width}>
        <Path d={primaryDataPoint} fill={COLOR.LIGHT_PRIMARY_100} />
        <Path d={secondaryDataPoint} fill={COLOR.LIGHT_SECONDARY_100} />
      </Svg>
    </BackgroundContainer>
  );
};

export default Background2;
