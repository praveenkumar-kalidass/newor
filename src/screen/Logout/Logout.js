import React, { useCallback, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import {
  Flex, Text, Center, Image, useToast,
} from 'native-base';
import AsyncStorage from '@react-native-async-storage/async-storage';

import CONSTANT from 'constant';
import ROUTE from 'constant/route';
import NEWOR_VERIFY from 'asset/image/newor.png';
import Translation from 'translation/Translation';
import AppButton from 'component/AppButton';
import ToastAlert from 'component/ToastAlert';
import useUserApi from 'api/useUser';
import useUser from 'provider/User/useUser';
import useTranslation from 'translation/useTranslation';
import { Container } from './Logout.style';

const Logout = () => {
  const [isSubmit, setIsSubmit] = useState(false);
  const navigation = useNavigation();
  const { logout } = useUserApi();
  const { setUser, setIsAuthorized } = useUser();
  const { translate } = useTranslation();
  const toast = useToast();

  const doLogout = useCallback(async () => {
    try {
      setIsSubmit(true);
      await logout();
      setUser({});
      await AsyncStorage.removeItem(CONSTANT.STORAGE_KEY.TOKEN);
      setIsAuthorized(false);
      navigation.navigate(ROUTE.LOGIN);
      setIsSubmit(false);
    } catch (error) {
      setIsSubmit(false);
      let errorMessage = translate('ERROR_CODE.NEWOR_INTERNAL_SERVER_ERROR');
      const errorCode = error?.response?.data?.code;
      if (errorCode) {
        errorMessage = translate(`ERROR_CODE.${errorCode}`);
      }
      toast.show({
        render: () => <ToastAlert status="error" message={errorMessage} />,
        placement: 'bottom',
      });
    }
  }, [navigation]);

  return (
    <Flex flex={1} direction="row" p="5" justify="center">
      <Container spacing={5}>
        <Center><Image alt={CONSTANT.APP_NAME} source={NEWOR_VERIFY} size="2xl" /></Center>
        <Translation tkey="SURE_TO_LOGOUT" as={Text} textAlign="center" fontSize="lg" />
        <Translation
          tkey="YES"
          as={AppButton}
          variant="primary"
          onPress={doLogout}
          isLoading={isSubmit}
          testID="logout-yes"
        />
        <Translation
          tkey="NO"
          as={AppButton}
          variant="secondary"
          onPress={navigation.goBack}
          isDisabled={isSubmit}
          testID="logout-no"
        />
      </Container>
    </Flex>
  );
};

export default Logout;
