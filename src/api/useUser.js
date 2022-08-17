import CONSTANT from 'constant';
import useAxios from '.';
import config from '../../config';

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
      authorization: false,
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
      authorization: false,
    });
  };

  const signup = (request) => axios.post(`${config.baseURL}/api/user/v1/signup`, request, {
    authorization: false,
  });

  const forgotPassword = (request) => axios.post(`${config.baseURL}/api/user/v1/forgot-password`, request, {
    authorization: false,
  });

  const verify = (request) => axios.put(`${config.baseURL}/api/user/v1/verify`, request, {
    loader: true,
    authorization: false,
  });

  const resetPassword = (request) => axios.put(`${config.baseURL}/api/user/v1/reset-password`, request, {
    authorization: false,
  });

  const logout = () => axios.delete(`${config.baseURL}/api/user/v1/logout`);

  const updatePicture = (picture) => {
    const request = new FormData();
    request.append('picture', {
      name: picture.fileName,
      type: picture.type,
      uri: picture.uri,
    });
    return axios.put(`${config.baseURL}/api/user/v1/picture`, request);
  };

  return {
    login,
    authorize,
    signup,
    forgotPassword,
    verify,
    resetPassword,
    logout,
    updatePicture,
  };
};

export default useUser;
