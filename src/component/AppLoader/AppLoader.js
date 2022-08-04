import React, { useEffect, useState } from 'react';
import { useWindowDimensions } from 'react-native';
import { Svg, Image, Path } from 'react-native-svg';

import NEWOR_LOGO from 'asset/image/newor-logo.png';
import useTheme from 'theme/useTheme';

const AppLoader = () => {
  const [rotation, setRotation] = useState(0);
  const [pause, setPause] = useState(false);
  const { height, width } = useWindowDimensions();
  const { color } = useTheme();

  useEffect(() => {
    if (pause) {
      setTimeout(() => {
        setRotation(rotation === 360 ? 0 : rotation + 10);
        setPause(false);
      }, 1000);
    }
  }, [pause]);

  useEffect(() => {
    setTimeout(() => {
      if (pause) return;
      if (rotation === 360 || rotation === 180) {
        setPause(true);
        return;
      }
      if (!pause) {
        setRotation(rotation + 10);
      }
    }, 1);
  }, [rotation, pause]);

  return (
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
  );
};

export default AppLoader;
