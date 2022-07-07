import styled from 'styled-components/native';
import { Flex, Box } from 'native-base';

export const BarContainer = styled(Flex).attrs(() => ({
  direction: 'row',
  mb: '5',
}))``;

export const Bar = styled(Box).attrs(({ color }) => ({
  bg: color,
  mr: '2',
  pr: '2',
}))``;
