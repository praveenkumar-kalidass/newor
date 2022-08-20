// eslint-disable-next-line import/prefer-default-export
export const formatCurrency = (value) => {
  const formatter = new Intl.NumberFormat('hi-IN', { style: 'currency', currency: 'INR' });
  return formatter.format(value);
};
