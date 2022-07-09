import CONSTANT from '.';

const color = {};

export const light = {
  BACKGROUND_100: '#ffffff',
  BACKGROUND_50: '#7f7f7f',
  BACKGROUND_0: '#000000',
  SUCCESS: '#2e7d32',
  ERROR: '#d32f2f',
  PRIMARY_100: '#ad0000',
  PRIMARY_80: '#ad1414',
  PRIMARY_60: '#ad2828',
  PRIMARY_40: '#ad3c3c',
  PRIMARY_20: '#ad5050',
  SECONDARY_100: '#00238a',
  SECONDARY_80: '#00238a',
  SECONDARY_60: '#00238a',
  SECONDARY_40: '#00238a',
  SECONDARY_20: '#00238a',
  LINK: '#3498db',
};
Object.keys(light).forEach((code) => {
  color[`${CONSTANT.THEME.LIGHT.toUpperCase()}_${code}`] = light[code];
});

export const dark = {};
Object.keys(dark).forEach((code) => {
  color[`${CONSTANT.THEME.LIGHT.toUpperCase()}_${code}`] = light[code];
});

export default color;
