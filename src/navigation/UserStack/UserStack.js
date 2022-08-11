import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import useTheme from 'theme/useTheme';
import ROUTE from 'constant/route';
import Dashboard from 'screen/Dashboard';

const Stack = createStackNavigator();

const UserStack = () => {
  const theme = useTheme();

  return (
    <Stack.Navigator
      initialRouteName={ROUTE.DASHBOARD}
      screenOptions={{
        cardStyle: {
          backgroundColor: theme.color.BACKGROUND_100,
        },
      }}
    >
      <Stack.Screen name={ROUTE.DASHBOARD} component={Dashboard} />
    </Stack.Navigator>
  );
};

export default UserStack;
