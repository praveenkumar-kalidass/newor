import React, { useCallback, useEffect, useState } from 'react';
import { useRoute, useNavigation } from '@react-navigation/native';
import {
  Flex, Center, Image, Text,
} from 'native-base';

import CONSTANT from 'constant';
import ROUTE from 'constant/route';
import useTheme from 'theme/useTheme';
import useTranslation from 'translation/useTranslation';
import useUser from 'api/useUser';
import withBackground from 'helper/withBackground';
import { Background1 } from 'component/Background';
import TitleBar from 'component/TitleBar/TitleBar';
import AppButton from 'component/AppButton';
import Translation from 'translation/Translation';
import NEWOR_SUCCESS from 'asset/image/newor-success.png';
import NEWOR_FAILURE from 'asset/image/newor-failure.png';
import { Container, Title } from './EmailVerification.style';

const EmailVerification = () => {
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const { params } = useRoute();
  const { color } = useTheme();
  const navigation = useNavigation();
  const { translate } = useTranslation();
  const { verify } = useUser();

  const doVerifyUser = useCallback(async () => {
    try {
      await verify({ token: params?.token });
      setIsSuccess(true);
    } catch (error) {
      setIsError(true);
    }
  }, []);

  useEffect(() => {
    doVerifyUser();
  }, []);

  return (
    <Flex flex={1}>
      <Flex flex={1} direction="row" p="5" justify="center">
        <If condition={isSuccess || isError}>
          <Container testID="email-verification">
            <TitleBar color={color.SECONDARY_100} styleProps={{ mb: 5 }}>
              <Title>
                {isSuccess && translate('SUCCESS')}
                {isError && translate('ERROR')}
                !
              </Title>
            </TitleBar>
            <Center>
              <If condition={isSuccess}>
                <Image alt={CONSTANT.APP_NAME} source={NEWOR_SUCCESS} size={250} />
              </If>
              <If condition={isError}>
                <Image alt={CONSTANT.APP_NAME} source={NEWOR_FAILURE} size={250} />
              </If>
            </Center>
            <If condition={isSuccess}>
              <Translation tkey="EMAIL_VERIFICATION_SUCCESS" as={Text} mb={5} />
              <Translation
                tkey="LOGIN"
                as={AppButton}
                variant="primary"
                mb={5}
                testID="login-submit"
                onPress={() => navigation.navigate(ROUTE.LOGIN)}
              />
            </If>
            <If condition={isError}>
              <Translation tkey="EMAIL_VERIFICATION_FAILURE" as={Text} mb={5} />
            </If>
          </Container>
        </If>
      </Flex>
    </Flex>
  );
};

export default withBackground({ Component: EmailVerification, Background: Background1 });
