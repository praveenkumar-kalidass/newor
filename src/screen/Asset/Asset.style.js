import styled from 'styled-components/native';
import { Box, HStack, Text } from 'native-base';

import COLOR from 'constant/color';

export const Container = styled(Box).attrs(() => ({
  p: 5,
}))``;

export const AssetCard = styled(Box).attrs(() => ({
  bg: COLOR.LIGHT_BACKGROUND_100,
  height: 200,
  rounded: 10,
  elevation: 1,
  shadowColor: COLOR.LIGHT_BACKGROUND_0,
  shadowOffset: { width: 0, height: 1 },
  shadowOpacity: 0.8,
  shadowRadius: 1,
}))``;

export const AssetListCard = styled(HStack).attrs(({ theme }) => ({
  bg: theme.color.MODAL,
  rounded: 10,
  p: 4,
  space: 5,
  alignItems: 'center',
}))``;

export const AssetValue = styled(Text).attrs(() => ({
  color: COLOR.DARK_BACKGROUND_100,
  fontSize: 24,
  bold: true,
}))``;
