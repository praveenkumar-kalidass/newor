import axios from 'axios';

import useLoader from 'provider/Loader/useLoader';
import config from '../../config';

const useAxios = () => {
  const { addLoader, removeLoader } = useLoader();

  const instance = axios.create({
    baseURL: config.baseURL,
    timeout: 10000,
  });
  instance.interceptors.request.use((options) => {
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
