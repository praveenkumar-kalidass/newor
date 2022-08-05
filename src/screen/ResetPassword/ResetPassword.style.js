import styled from 'styled-components/native';
import { Box, Text, Input } from 'native-base';

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

export const InputField = styled(Input).attrs(({ isInvalid, theme }) => ({
  _focus: {
    bg: theme.color.BACKGROUND_100,
    borderColor: theme.color.SECONDARY_100,
  },
  mb: isInvalid ? 0 : 5,
}))`
  font-size: 14px;
`;
