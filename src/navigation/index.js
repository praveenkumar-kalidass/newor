import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import ROUTE from 'constant/route';
import useTheme from 'theme/useTheme';
import Login from 'screen/Login';
import Signup from 'screen/Signup';

const Stack = createStackNavigator();

export default () => {
  const theme = useTheme();

  return (
    <Stack.Navigator
      initialRouteName={ROUTE.LOGIN}
      screenOptions={{
        cardStyle: {
          backgroundColor: theme.color.BACKGROUND_100,
        },
      }}
    >
      <Stack.Screen name={ROUTE.LOGIN} component={Login} options={{ headerShown: false }} />
      <Stack.Screen name={ROUTE.SIGNUP} component={Signup} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
};
