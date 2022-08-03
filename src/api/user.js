import CONSTANT from 'constant';
import axios from './index';
import config from '../../config/config';

export const login = ({ email, password }) => axios.post(`${config.baseURL}/api/user/v1/login`, {
  email,
  password,
  clientId: config.clientId,
  clientSecret: config.clientSecret,
  grantType: CONSTANT.AUTH_LITERAL.PASSWORD,
  responseType: CONSTANT.AUTH_LITERAL.CODE,
});

export const signup = (request) => axios.post(`${config.baseURL}/api/user/v1/signup`, request);

export const forgotPassword = (request) => axios.post(`${config.baseURL}/api/user/v1/forgot-password`, request);
