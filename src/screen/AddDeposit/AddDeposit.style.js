import styled from 'styled-components/native';
import { Select, Input } from 'native-base';

export const SelectField = styled(Select).attrs(({ theme }) => ({
  mb: 3,
  fontSize: 14,
  bg: theme.color.BACKGROUND_100,
}))``;

export const InputField = styled(Input).attrs(({ isInvalid, theme }) => ({
  _focus: {
    bg: theme.color.BACKGROUND_100,
    borderColor: theme.color.SECONDARY_100,
  },
  bg: theme.color.BACKGROUND_100,
  mb: isInvalid ? 0 : 5,
  fontSize: 14,
}))``;
