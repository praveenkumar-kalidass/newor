import React from 'react';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import COLOR from './color';

const AUTH_LITERAL = {
  PASSWORD: 'password',
  CODE: 'code',
  REFRESH_TOKEN: 'refresh_token',
  AUTHORIZATION: 'Authorization',
  IDENTIFICATION: 'Identification',
  BEARER: 'Bearer',
};

const THEME = {
  LIGHT: 'light',
  DARK: 'dark',
};

const LANGUAGE = {
  ENGLISH: 'en',
  TAMIL: 'ta',
};

const STORAGE_KEY = {
  TOKEN: 'NEWOR_AUTH_TOKEN',
};

const APP_LITERAL = {
  RUPEE_SYMBOL: '₹',
};

const DEPOSIT_TYPE = {
  SAVINGS: 'SAVINGS',
  CURRENT: 'CURRENT',
  FIXED_DEPOSIT: 'FIXED_DEPOSIT',
  RECURRING_DEPOSIT: 'RECURRING_DEPOSIT',
  PUBLIC_PROVIDENT_FUND: 'PUBLIC_PROVIDENT_FUND',
};

const LOAN_TYPE = {
  HOME: 'HOME',
  PERSONAL: 'PERSONAL',
  EDUCATION: 'EDUCATION',
  VEHICLE: 'VEHICLE',
  BUSINESS: 'BUSINESS',
};

const ASSET_ICON = {
  DEPOSIT: <FontAwesome5 color={COLOR.LIGHT_BACKGROUND_100} size={20} name="piggy-bank" />,
};

const LIABILITY_ICON = {
  LOAN: <FontAwesome5 color={COLOR.LIGHT_BACKGROUND_100} size={20} name="hand-holding-usd" />,
};

const constant = {
  APP_NAME: 'newor',
  AUTH_LITERAL,
  THEME,
  LANGUAGE,
  STORAGE_KEY,
  APP_LITERAL,
  DEPOSIT_TYPE,
  LOAN_TYPE,
  ASSET_ICON,
  LIABILITY_ICON,
};

export default constant;
