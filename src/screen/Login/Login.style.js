import styled from 'styled-components/native';
import {
  Box,
  Button,
  Input,
  Text,
} from 'native-base';

export const FormContainer = styled(Box).attrs(({ theme }) => ({
  borderRadius: 20,
  flex: 1,
  p: 5,
  bg: theme.color.MODAL,
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

export const SubmitButton = styled(Button).attrs(({ theme }) => ({
  bg: theme.color.PRIMARY_100,
  _pressed: { bg: theme.color.PRIMARY_20 },
  _text: { fontWeight: 'bold' },
}))``;

export const Title = styled(Text).attrs(() => ({
  bold: true,
  fontSize: 20,
}))`
  text-transform: capitalize;
`;

export const ToastBox = styled(Box).attrs(({ theme }) => ({
  _text: { color: theme.color.BACKGROUND_100 },
  bg: theme.color.ERROR,
  p: 5,
  rounded: 5,
}))``;
