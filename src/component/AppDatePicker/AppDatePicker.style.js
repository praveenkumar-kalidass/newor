import styled from 'styled-components/native';
import { Input, Flex, VStack } from 'native-base';

export const InputField = styled(Input).attrs(({ theme }) => ({
  _focus: {
    bg: theme.color.BACKGROUND_100,
    borderColor: theme.color.SECONDARY_100,
  },
  mb: 3,
  fontSize: 14,
}))``;

export const ModalOverlay = styled(Flex).attrs(({ theme }) => ({
  flex: 1,
  direction: 'row',
  p: '5',
  justifyContent: 'center',
  bg: `${theme.color.BACKGROUND_0}:alpha.50`,
}))``;

export const ModalContainer = styled(VStack).attrs(({ theme }) => ({
  borderRadius: 20,
  flex: 1,
  alignSelf: 'center',
  p: 5,
  bg: theme.color.MODAL,
  elevation: 1,
  shadowColor: theme.color.BACKGROUND_0,
}))``;
