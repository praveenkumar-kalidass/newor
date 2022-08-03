import ROUTE from 'constant/route';

const linking = {
  prefixes: ['newor://'],
  config: {
    screens: {
      [ROUTE.RESET_PASSWORD]: 'reset-password/:token',
      [ROUTE.EMAIL_VERIFICATION]: 'email-verification/:token',
    },
  },
};

export default linking;
