import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import ROUTE from 'constant/route';
import useTheme from 'theme/useTheme';
import Login from 'screen/Login';
import Signup from 'screen/Signup';
import ResetPassword from 'screen/ResetPassword';
import ForgotPassword from 'screen/ForgotPassword';
import EmailVerification from 'screen/EmailVerification';
import DashboardTabNavigator from 'navigation/DashboardTabNavigator';

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
      <Stack.Screen
        name={ROUTE.RESET_PASSWORD}
        component={ResetPassword}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={ROUTE.FORGOT_PASSWORD}
        component={ForgotPassword}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={ROUTE.EMAIL_VERIFICATION}
        component={EmailVerification}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={ROUTE.DASHBOARD_TAB}
        component={DashboardTabNavigator}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};
