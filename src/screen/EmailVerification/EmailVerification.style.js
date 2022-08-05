import styled from 'styled-components/native';
import { Box, Text } from 'native-base';

export const Container = styled(Box).attrs(({ theme }) => ({
  borderRadius: 20,
  flex: 1,
  alignSelf: 'center',
  p: 5,
  bg: theme.color.MODAL,
  elevation: 1,
  shadowColor: theme.color.BACKGROUND_0,
}))``;

export const Title = styled(Text).attrs(() => ({
  bold: true,
  fontSize: 20,
}))``;
