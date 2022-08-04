import CONSTANT from 'constant';
import useAxios from '.';
import config from '../../config/config';

const useUser = () => {
  const axios = useAxios();

  const login = ({ email, password }) => axios.post(`${config.baseURL}/api/user/v1/login`, {
    email,
    password,
    clientId: config.clientId,
    clientSecret: config.clientSecret,
    grantType: CONSTANT.AUTH_LITERAL.PASSWORD,
    responseType: CONSTANT.AUTH_LITERAL.CODE,
  });

  const signup = (request) => axios.post(`${config.baseURL}/api/user/v1/signup`, request);

  const forgotPassword = (request) => axios.post(`${config.baseURL}/api/user/v1/forgot-password`, request);

  const verify = (request) => axios.put(`${config.baseURL}/api/user/v1/verify`, request, { loader: true });

  return {
    login,
    signup,
    forgotPassword,
    verify,
  };
};

export default useUser;
