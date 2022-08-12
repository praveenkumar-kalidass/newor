import styled from 'styled-components/native';
import { Box, HStack } from 'native-base';

export const TabContainer = styled(Box).attrs(({ theme }) => ({
  bg: theme.color.PRIMARY_100,
  p: 6,
}))``;

export const TabNavigations = styled(HStack).attrs(() => ({
  bg: 'transparent',
  justifyContent: 'space-around',
  alignItems: 'flex-end',
}))``;

export const TabBackgroundContainer = styled(Box).attrs(({ theme }) => ({
  position: 'absolute',
  bg: theme.color.MODAL,
  w: '100%',
  p: 10,
  rounded: 10,
  elevation: 1,
  shadowColor: theme.color.BACKGROUND_0,
  shadowOffset: { width: 0, height: 1 },
  shadowOpacity: 0.8,
  shadowRadius: 1,
}))``;

export const TabCenterIconContainer = styled(Box).attrs(({ theme }) => ({
  alignItems: 'center',
  position: 'absolute',
  bg: 'transparent',
  w: '100%',
  elevation: 1,
  shadowColor: theme.color.BACKGROUND_0,
  shadowOffset: { width: 0, height: 1 },
  shadowOpacity: 0.8,
  shadowRadius: 1,
}))``;

export const TabCenterIconBackground = styled(Box).attrs(({ theme }) => ({
  bg: theme.color.MODAL,
  w: 24,
  h: 24,
  mb: 3,
  rounded: 'full',
}))``;
