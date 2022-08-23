import React, { useEffect, useState } from 'react';
import { useWindowDimensions } from 'react-native';
import { Svg, Image, Path } from 'react-native-svg';

import NEWOR_LOGO from 'asset/image/newor-logo.png';
import useTheme from 'theme/useTheme';
import LoaderContainer from './AppLoader.style';

const AppLoader = () => {
  const [rotation, setRotation] = useState(0);
  const { height, width } = useWindowDimensions();
  const { color } = useTheme();

  useEffect(() => {
    setTimeout(() => {
      setRotation(rotation + 10);
    }, 1);
  }, [rotation]);

  return (
    <LoaderContainer>
      <Svg height={height} width={width}>
        <Image
          x={(width / 2) - 50}
          y={(height / 2) - 50}
          href={NEWOR_LOGO}
          height={100}
          width={100}
        />
        <Path
          d={`M ${(width / 2) + 40} ${(height / 2) - 35} A 25 40 0 0 1 ${(width / 2) + 40} ${(height / 2) + 35} A 25 40 0 0 0 ${(width / 2) + 40} ${(height / 2) - 35} Z`}
          stroke={color.PRIMARY_100}
          strokeWidth={10}
          transform={{ rotation, originX: width / 2, originY: height / 2 }}
        />
        <Path
          d={`M ${(width / 2) - 40} ${(height / 2) - 35} A 25 40 0 0 0 ${(width / 2) - 40} ${(height / 2) + 35} A 25 40 0 0 1 ${(width / 2) - 40} ${(height / 2) - 35} Z`}
          stroke={color.SECONDARY_100}
          strokeWidth={10}
          transform={{ rotation, originX: width / 2, originY: height / 2 }}
        />
      </Svg>
    </LoaderContainer>
  );
};

export default AppLoader;
