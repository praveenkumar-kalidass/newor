import styled from 'styled-components/native';
import {
  Box, Button, Input, Text,
} from 'native-base';

import COLOR from '../../constant/color';

export const FormContainer = styled(Box).attrs(() => ({
  borderRadius: 20,
  flex: 1,
  alignSelf: 'center',
  p: 5,
  bg: COLOR.LIGHT_100,
}))``;

export const InputField = styled(Input).attrs(({ isInvalid }) => ({
  _focus: {
    bg: COLOR.LIGHT_100,
    borderColor: COLOR.LIGHT_SECONDARY_100,
  },
  mb: isInvalid ? 0 : 5,
}))`
  font-size: 14px;
`;

export const SubmitButton = styled(Button).attrs(() => ({
  bg: COLOR.LIGHT_PRIMARY_100,
  _pressed: { bg: COLOR.LIGHT_PRIMARY_20 },
  _text: { fontWeight: 'bold' },
  mb: 5,
}))``;

export const Title = styled(Text).attrs(() => ({
  bold: true,
  fontSize: 20,
}))`
  text-transform: capitalize;
`;

export const ToastBox = styled(Box).attrs(({ isError }) => ({
  _text: { color: COLOR.LIGHT_100 },
  bg: isError ? COLOR.LIGHT_ERROR : COLOR.LIGHT_SUCCESS,
  p: 5,
  rounded: 5,
}))``;

export const LoginLink = styled(Text).attrs(({ link }) => ({
  fontSize: 'md',
  underline: link,
  color: link && COLOR.LIGHT_LINK,
}))``;
