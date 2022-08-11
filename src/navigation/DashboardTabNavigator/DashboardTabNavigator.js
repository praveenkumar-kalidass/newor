import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import ROUTE from 'constant/route';
import TabBar from 'component/TabBar';
import UserStack from 'navigation/UserStack';

const Tab = createBottomTabNavigator();

const DashboardTabNavigator = () => (
  <Tab.Navigator
    // eslint-disable-next-line react/jsx-props-no-spreading, react/no-unstable-nested-components
    tabBar={(props) => <TabBar {...props} />}
    initialRouteName={ROUTE.USER_STACK}
  >
    <Tab.Screen name={ROUTE.USER_STACK} component={UserStack} options={{ headerShown: false }} />
  </Tab.Navigator>
);

export default DashboardTabNavigator;
