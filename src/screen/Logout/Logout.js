import React, { useCallback, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import {
  Flex, Text, Center, Image,
} from 'native-base';
import AsyncStorage from '@react-native-async-storage/async-storage';

import CONSTANT from 'constant';
import ROUTE from 'constant/route';
import NEWOR_VERIFY from 'asset/image/newor.png';
import Translation from 'translation/Translation';
import AppButton from 'component/AppButton';
import useUserApi from 'api/useUser';
import useUser from 'provider/User/useUser';
import useError from 'hook/useError';
import { Container } from './Logout.style';

const Logout = () => {
  const [isSubmit, setIsSubmit] = useState(false);
  const navigation = useNavigation();
  const { logout } = useUserApi();
  const { setUser, setIsAuthorized } = useUser();
  const { toast } = useError();

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
      toast(error);
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
