import styled from 'styled-components/native';
import { HStack } from 'native-base';

// eslint-disable-next-line import/prefer-default-export
export const AssetCard = styled(HStack).attrs(({ theme }) => ({
  bg: theme.color.MODAL,
  p: 5,
  rounded: 10,
}))``;
