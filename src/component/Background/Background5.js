import React from 'react';
import { useWindowDimensions } from 'react-native';
import { Svg, ForeignObject } from 'react-native-svg';
import { Text } from 'native-base';

import CONSTANT from 'constant';
import useTheme from 'theme/useTheme';
import BackgroundContainer from './Background.style';

const Background5 = () => {
  const { height, width } = useWindowDimensions();
  const theme = useTheme();

  return (
    <BackgroundContainer>
      <Svg height={height} width={width}>
        <ForeignObject x={0} y={height - 350}>
          <Text color={theme.color.PRIMARY_100} fontSize={200}>
            {CONSTANT.APP_LITERAL.RUPEE_SYMBOL}
          </Text>
        </ForeignObject>
        <ForeignObject x={width - 225} y={-100}>
          <Text color={theme.color.SECONDARY_100} fontSize={400}>
            {CONSTANT.APP_LITERAL.RUPEE_SYMBOL}
          </Text>
        </ForeignObject>
      </Svg>
    </BackgroundContainer>
  );
};

export default Background5;
