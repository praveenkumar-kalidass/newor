import CONSTANT from 'constant';
import useAxios from '.';
import config from '../../config/config';

const useUser = () => {
  const axios = useAxios();

  const login = ({ email, password }) => {
    const data = {
      email,
      password,
      clientId: config.clientId,
      clientSecret: config.clientSecret,
      grantType: CONSTANT.AUTH_LITERAL.PASSWORD,
      responseType: CONSTANT.AUTH_LITERAL.CODE,
    };
    const request = Object.keys(data).map((key) => (
      `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`
    )).join('&');
    return axios.post(`${config.baseURL}/api/user/v1/login`, request, {
      'Content-Type': 'application/x-www-form-urlencoded',
    });
  };

  const authorize = (refreshToken) => {
    const data = {
      refreshToken,
      clientId: config.clientId,
      clientSecret: config.clientSecret,
      grantType: CONSTANT.AUTH_LITERAL.REFRESH_TOKEN,
    };
    const request = Object.keys(data).map((key) => (
      `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`
    )).join('&');
    return axios.post(`${config.baseURL}/api/user/v1/authorize`, request, {
      'Content-Type': 'application/x-www-form-urlencoded',
      loader: true,
    });
  };

  const signup = (request) => axios.post(`${config.baseURL}/api/user/v1/signup`, request);

  const forgotPassword = (request) => axios.post(`${config.baseURL}/api/user/v1/forgot-password`, request);

  const verify = (request) => axios.put(`${config.baseURL}/api/user/v1/verify`, request, { loader: true });

  const resetPassword = (request) => axios.put(`${config.baseURL}/api/user/v1/reset-password`, request);

  return {
    login,
    authorize,
    signup,
    forgotPassword,
    verify,
    resetPassword,
  };
};

export default useUser;
