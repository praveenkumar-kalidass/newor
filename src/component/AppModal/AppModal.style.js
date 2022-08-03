import styled from 'styled-components/native';
import { Box, Flex, IconButton } from 'native-base';

export const ModalOverlay = styled(Flex).attrs(({ theme }) => ({
  flex: 1,
  direction: 'row',
  p: '5',
  justifyContent: 'center',
  bg: `${theme.color.BACKGROUND_0}:alpha.50`,
}))``;

export const ModalContainer = styled(Box).attrs(({ theme }) => ({
  borderRadius: 20,
  flex: 1,
  alignSelf: 'center',
  p: 5,
  bg: theme.color.MODAL,
  elevation: 1,
  shadowColor: theme.color.BACKGROUND_0,
}))``;

export const CloseButton = styled(IconButton).attrs(({ theme }) => ({
  variant: 'ghost',
  _icon: {
    color: theme.color.SECONDARY_100,
  },
  _pressed: {
    bg: `${theme.color.SECONDARY_100}:alpha.10`,
  },
}))``;
