import styled from 'styled-components/native';
import { Badge, Box } from 'native-base';

export const Container = styled(Box).attrs(({ theme }) => ({
  borderRadius: 20,
  flex: 1,
  alignSelf: 'center',
  p: 5,
  bg: theme.color.MODAL,
  elevation: 1,
  shadowColor: theme.color.BACKGROUND_0,
  shadowOffset: { width: 0, height: 1 },
  shadowOpacity: 0.8,
  shadowRadius: 1,
}))``;

export const EditBadge = styled(Badge).attrs(({ theme }) => ({
  bg: theme.color.PRIMARY_100,
  rounded: 'full',
  mb: '-5',
  mr: '-5',
  zIndex: 1,
  variant: 'solid',
  alignSelf: 'flex-end',
}))``;
