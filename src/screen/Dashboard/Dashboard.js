import React from 'react';
import { Text } from 'native-base';

import usePreventBack from 'hook/usePreventBack';

const Dashboard = () => {
  usePreventBack();

  return <Text>Dashboard</Text>;
};

export default Dashboard;
