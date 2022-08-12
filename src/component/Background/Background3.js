import React, { useMemo } from 'react';
import { useWindowDimensions } from 'react-native';
import { Path, Svg } from 'react-native-svg';

import useTheme from 'theme/useTheme';
import BackgroundContainer from './Background.style';

const Background3 = () => {
  const { height, width } = useWindowDimensions();
  const theme = useTheme();

  const dataPoint = useMemo(
    () => `M 0,0
      L 0,${height / 5}
      C 50 ${(height / 5) + 50}, ${width - 50} ${(height / 5) + 50}, ${width} ${height / 5}
      L ${width},0
      Z`,
    [],
  );

  return (
    <BackgroundContainer>
      <Svg height={height} width={width}>
        <Path d={dataPoint} fill={theme.color.SECONDARY_100} />
      </Svg>
    </BackgroundContainer>
  );
};

export default Background3;
