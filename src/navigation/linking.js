import ROUTE from 'constant/route';

const linking = {
  prefixes: ['newor://'],
  config: {
    screens: {
      [ROUTE.RESET_PASSWORD]: 'reset-password/:token',
    },
  },
};

export default linking;
