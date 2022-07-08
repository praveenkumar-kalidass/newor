import axios from './index';
import config from '../../config/config';
import CONSTANT from '../constant';

// eslint-disable-next-line import/prefer-default-export
export const login = ({ email, password }) => axios.post(`${config.baseURL}/api/user/v1/login`, {
  email,
  password,
  clientId: config.clientId,
  clientSecret: config.clientSecret,
  grantType: CONSTANT.AUTH_LITERAL.PASSWORD,
  responseType: CONSTANT.AUTH_LITERAL.CODE,
});
