import CONSTANT from 'constant';

export const formatCurrency = (value) => {
  const formatter = new Intl.NumberFormat('hi-IN', { style: 'currency', currency: 'INR' });
  return formatter.format(value);
};

export const unformatCurrency = (value) => {
  const withoutSymbol = value.replace(CONSTANT.APP_LITERAL.RUPEE_SYMBOL, '');
  const currency = withoutSymbol.replace(/,/g, '');
  return parseFloat(currency);
};

export const formatUrlParams = (data) => Object.keys(data).map((key) => (
  `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`
)).join('&');
