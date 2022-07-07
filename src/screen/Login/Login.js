import React from 'react';
import { Flex } from 'native-base';

import TitleBar from '../../component/TitleBar/TitleBar';
import CONSTANT from '../../constant';
import COLOR from '../../constant/color';
import TRANSLATION from '../../translation/en.json';
import {
  FormContainer,
  InputField,
  SubmitButton,
  Title,
} from './Login.style';

const Login = () => (
  <Flex flex={1}>
    <Flex flex={1.5} />
    <Flex flex={1}>
      <FormContainer>
        <TitleBar color={COLOR.LIGHT_SECONDARY_100}>
          <Title>{CONSTANT.APP_NAME}</Title>
        </TitleBar>
        <InputField placeholder={TRANSLATION.EMAIL} />
        <InputField placeholder={TRANSLATION.PASSWORD} type="password" />
        <SubmitButton>{TRANSLATION.LOGIN}</SubmitButton>
      </FormContainer>
    </Flex>
  </Flex>
);

export default Login;
