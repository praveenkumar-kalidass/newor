const color = {};

export const light = {
  BACKGROUND_100: '#ffffff',
  BACKGROUND_50: '#7f7f7f',
  BACKGROUND_0: '#000000',
  SUCCESS_100: '#2e7d32',
  ERROR_100: '#d50f0f',
  SUCCESS_0: '#BBF7D0',
  ERROR_0: '#fecaca',
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
  MODAL: '#eeeeee',
};
Object.keys(light).forEach((code) => {
  color[`LIGHT_${code}`] = light[code];
});

export const dark = {
  BACKGROUND_100: '#000000',
  BACKGROUND_50: '#7f7f7f',
  BACKGROUND_0: '#ffffff',
  SUCCESS_100: '#2e7d32',
  ERROR_100: '#d50f0f',
  SUCCESS_0: '#BBF7D0',
  ERROR_0: '#fecaca',
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
  MODAL: '#111111',
};
Object.keys(dark).forEach((code) => {
  color[`DARK_${code}`] = dark[code];
});

color.PURPLE = '#8E44AD';
color.BROWN = '#BA4A00';
color.RANDOM = [
  '#EC7063', '#AF7AC5', '#5DADE2', '#48C9B0', '#58D68D', '#F4D03F', '#EB984E', '#CACFD2',
];

export default color;
