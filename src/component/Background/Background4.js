import React from 'react';
import { useWindowDimensions } from 'react-native';
import { Circle, Svg } from 'react-native-svg';

import useTheme from 'theme/useTheme';
import BackgroundContainer from './Background.style';

const Background4 = () => {
  const { height, width } = useWindowDimensions();
  const theme = useTheme();

  return (
    <BackgroundContainer>
      <Svg height={height} width={width}>
        <Circle
          cx={0}
          cy={height}
          r={250}
          stroke={theme.color.SECONDARY_100}
          strokeWidth={25}
          fill={theme.color.BACKGROUND_100}
        />
        <Circle
          cx={0}
          cy={height}
          r={150}
          stroke={theme.color.SECONDARY_100}
          strokeWidth={25}
          fill={theme.color.BACKGROUND_100}
        />
        <Circle
          cx={width}
          cy={0}
          r={250}
          stroke={theme.color.PRIMARY_100}
          strokeWidth={25}
          fill={theme.color.BACKGROUND_100}
        />
        <Circle
          cx={width}
          cy={0}
          r={150}
          stroke={theme.color.PRIMARY_100}
          strokeWidth={25}
          fill={theme.color.BACKGROUND_100}
        />
      </Svg>
    </BackgroundContainer>
  );
};

export default Background4;
