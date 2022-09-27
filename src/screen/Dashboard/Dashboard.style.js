import styled from 'styled-components/native';
import { Text } from 'native-base';

import COLOR from 'constant/color';

// eslint-disable-next-line import/prefer-default-export
export const WorthValue = styled(Text).attrs(() => ({
  color: COLOR.DARK_BACKGROUND_100,
  fontSize: 32,
  bold: true,
}))``;
