import React from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { useToast } from 'native-base';

import CONSTANT from 'constant';
import ROUTE from 'constant/route';
import ToastAlert from 'component/ToastAlert';
import useLoader from 'provider/Loader/useLoader';
import useUser from 'provider/User/useUser';
import useTranslation from 'translation/useTranslation';
import { formatUrlParams } from 'helper/util';
import config from '../../config';

const useAxios = () => {
  const { addLoader, removeLoader } = useLoader();
  const navigation = useNavigation();
  const { setUser, setIsAuthorized } = useUser();
  const toast = useToast();
  const { translate } = useTranslation();

  const instance = axios.create({
    baseURL: config.baseURL,
    timeout: 10000,
  });

  const handleAuthorization = async (options) => {
    if (options.authorization === false) {
      return options;
    }
    const { AUTH_LITERAL } = CONSTANT;
    const result = await AsyncStorage.getItem(CONSTANT.STORAGE_KEY.TOKEN);
    if (result) {
      const { accessToken, idToken } = JSON.parse(result);
      // eslint-disable-next-line no-param-reassign
      options.headers[AUTH_LITERAL.AUTHORIZATION] = `${AUTH_LITERAL.BEARER} ${accessToken}`;
      // eslint-disable-next-line no-param-reassign
      options.headers[AUTH_LITERAL.IDENTIFICATION] = idToken;
    }
    return options;
  };

  const handleAuthorizationError = async (authError) => {
    try {
      const authInstance = axios.create({
        baseURL: config.baseURL,
        timeout: 10000,
      });
      const token = await AsyncStorage.getItem(CONSTANT.STORAGE_KEY.TOKEN);
      await AsyncStorage.removeItem(CONSTANT.STORAGE_KEY.TOKEN);
      const { refreshToken } = JSON.parse(token);
      const { data } = await authInstance.post('/api/user/v1/authorize', formatUrlParams({
        refreshToken,
        clientId: config.clientId,
        clientSecret: config.clientSecret,
        grantType: CONSTANT.AUTH_LITERAL.REFRESH_TOKEN,
      }), {
        'Content-Type': 'application/x-www-form-urlencoded',
      });
      setUser(data.user);
      await AsyncStorage.setItem(CONSTANT.STORAGE_KEY.TOKEN, JSON.stringify({
        accessToken: data.accessToken,
        refreshToken: data.refreshToken,
        idToken: data.user.idToken,
      }));
      return instance.request(authError.config);
    } catch (error) {
      setIsAuthorized(false);
      navigation.navigate(ROUTE.LOGIN);
      toast.show({
        render: () => <ToastAlert status="error" message={translate('SESSION_TIMEOUT')} />,
        placement: 'top',
      });
      // eslint-disable-next-line prefer-promise-reject-errors
      return Promise.reject({ logout: true });
    }
  };

  instance.interceptors.request.use(async (options) => {
    await handleAuthorization(options);
    if (options.loader) {
      addLoader();
    }
    return options;
  }, (error) => (
    Promise.reject(error)
  ));
  instance.interceptors.response.use((response) => {
    if (response.config.loader) {
      removeLoader();
    }
    return response;
  }, (error) => {
    if (error.config.loader) {
      removeLoader();
    }
    if (error?.response?.data?.code === 'NEWOR_UNAUTHENTICATED') {
      return handleAuthorizationError(error);
    }
    return Promise.reject(error);
  });

  return instance;
};

export default useAxios;
