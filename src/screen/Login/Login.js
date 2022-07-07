import React, { useState } from 'react';
import { Flex, Image, Center } from 'native-base';

import TitleBar from '../../component/TitleBar/TitleBar';
import Background from '../../component/Background/Background';
import CONSTANT from '../../constant';
import COLOR from '../../constant/color';
import TRANSLATION from '../../translation/en.json';
import NEWOR from '../../asset/newor.png';
import {
  FormContainer,
  InputField,
  SubmitButton,
  Title,
} from './Login.style';

const Login = () => {
  const [background, setBackground] = useState({});

  return (
    <Flex flex={1}>
      <Flex
        flex={1.5}
        onLayout={(event) => {
          const { width, height } = event.nativeEvent.layout;
          setBackground({ width, height });
        }}
        justifyContent="center"
        testID="login-logo-container"
      >
        <If condition={background.height && background.width}>
          <Background height={background.height} width={background.width} />
          <Center>
            <Image testID="login-logo" alt={CONSTANT.APP_NAME} size={background.width * 0.8} source={NEWOR} />
          </Center>
        </If>
      </Flex>
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
};

export default Login;
