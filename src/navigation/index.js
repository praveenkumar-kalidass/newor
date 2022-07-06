import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import ROUTE from '../constant/route';
import Login from '../screen/Login';

const Stack = createStackNavigator();

export default () => (
  <Stack.Navigator initialRouteName={ROUTE.LOGIN}>
    <Stack.Screen name={ROUTE.LOGIN} component={Login} options={{ headerShown: false }} />
  </Stack.Navigator>
);
