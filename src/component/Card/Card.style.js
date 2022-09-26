import styled from 'styled-components/native';
import { Box, Text } from 'native-base';

import COLOR from 'constant/color';

export const CardContainer = styled(Box).attrs(() => ({
  bg: COLOR.LIGHT_BACKGROUND_100,
  height: 200,
  rounded: 10,
  elevation: 1,
  shadowColor: COLOR.LIGHT_BACKGROUND_0,
  shadowOffset: { width: 0, height: 1 },
  shadowOpacity: 0.8,
  shadowRadius: 1,
}))``;

export const CardBackground = styled(Text).attrs(() => ({
  color: COLOR.LIGHT_BACKGROUND_50,
  fontSize: 250,
  position: 'absolute',
  top: 0,
  right: 0,
  lineHeight: 250,
  opacity: 0.25,
}))``;
