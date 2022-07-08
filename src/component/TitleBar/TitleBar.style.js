import styled from 'styled-components/native';
import { Flex, Box } from 'native-base';

export const BarContainer = styled(Flex).attrs(({ styleProps }) => ({
  direction: 'row',
  ...styleProps,
}))``;

export const Bar = styled(Box).attrs(({ color }) => ({
  bg: color,
  mr: '2',
  pr: '2',
}))``;
