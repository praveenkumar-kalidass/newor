import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import ROUTE from 'constant/route';
import Dashboard from '../Dashboard';

const Tab = createBottomTabNavigator();

// eslint-disable-next-line arrow-body-style
const DashboardTabNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name={ROUTE.DASHBOARD} component={Dashboard} />
    </Tab.Navigator>
  );
};

export default DashboardTabNavigator;
