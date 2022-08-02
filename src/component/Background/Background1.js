import React, { useMemo } from 'react';
import { useWindowDimensions } from 'react-native';
import { Path, Svg } from 'react-native-svg';

import useTheme from 'theme/useTheme';
import BackgroundContainer from './Background.style';

const Background1 = () => {
  const { height, width } = useWindowDimensions();
  const theme = useTheme();

  const primaryDataPoint1 = useMemo(
    () => `M0 200 L0 300 L${width} 200 L${width} 100 L0 200 Z`,
    [],
  );
  const primaryDataPoint2 = useMemo(
    () => `M0 350 L0 370 L${width} 270 L${width} 250 L0 350 Z`,
    [],
  );

  const secondaryDataPoint1 = useMemo(
    () => `M0 ${height - 250} L0 ${height - 230} L${width} ${height - 330} L${width} ${height - 350} L0 ${height - 250} Z`,
    [],
  );
  const secondaryDataPoint2 = useMemo(
    () => `M0 ${height - 180} L0 ${height - 80} L${width} ${height - 180} L${width} ${height - 280} L0 ${height - 180} Z`,
    [],
  );

  return (
    <BackgroundContainer>
      <Svg height={height} width={width}>
        <Path d={primaryDataPoint1} fill={theme.color.PRIMARY_100} />
        <Path d={primaryDataPoint2} fill={theme.color.PRIMARY_100} />
        <Path d={secondaryDataPoint1} fill={theme.color.SECONDARY_100} />
        <Path d={secondaryDataPoint2} fill={theme.color.SECONDARY_100} />
      </Svg>
    </BackgroundContainer>
  );
};

export default Background1;
