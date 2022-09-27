import styled from 'styled-components/native';
import { Box } from 'native-base';

export const MenuContainer = styled(Box).attrs(({ theme }) => ({
  bg: theme.color.MODAL,
  flex: 1,
  justifyContent: 'space-between',
  pt: 20,
  pb: 20,
}))``;

export const MenuItem = styled(Box).attrs(({ theme }) => ({
  borderBottomWidth: 1,
  borderColor: theme.color.BACKGROUND_50,
  pl: 4,
  pr: 5,
  py: 3,
}))``;
