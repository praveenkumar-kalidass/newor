import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

import CONSTANT from 'constant';
import useLoader from 'provider/Loader/useLoader';
import config from '../../config';

const useAxios = () => {
  const { addLoader, removeLoader } = useLoader();

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

  const instance = axios.create({
    baseURL: config.baseURL,
    timeout: 10000,
  });
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
    return Promise.reject(error);
  });

  return instance;
};

export default useAxios;
