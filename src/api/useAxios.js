import axios from 'axios';

import useLoader from 'provider/Loader/useLoader';
import config from '../../config/config';

const useAxios = () => {
  const { addLoader, removeLoader } = useLoader();

  const instance = axios.create({
    baseURL: config.baseURL,
    timeout: 1000,
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
    removeLoader();
    return response;
  }, (error) => {
    removeLoader();
    return Promise.reject(error);
  });

  return instance;
};

export default useAxios;
