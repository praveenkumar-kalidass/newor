import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import ROUTE from '../constant/route';
import Login from '../screen/Login';
import Signup from '../screen/Signup';

const Stack = createStackNavigator();

export default () => (
  <Stack.Navigator initialRouteName={ROUTE.LOGIN}>
    <Stack.Screen name={ROUTE.LOGIN} component={Login} options={{ headerShown: false }} />
    <Stack.Screen name={ROUTE.SIGNUP} component={Signup} options={{ headerShown: false }} />
  </Stack.Navigator>
);
