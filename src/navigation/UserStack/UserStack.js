import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { IconButton } from 'native-base';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import useTheme from 'theme/useTheme';
import ROUTE from 'constant/route';
import COLOR from 'constant/color';
import useDrawer from 'provider/Drawer/useDrawer';
import Dashboard from 'screen/Dashboard';

const Stack = createStackNavigator();

const UserStack = () => {
  const theme = useTheme();
  const drawer = useDrawer();

  return (
    <Stack.Navigator
      initialRouteName={ROUTE.DASHBOARD}
      screenOptions={{
        cardStyle: {
          backgroundColor: theme.color.BACKGROUND_100,
        },
      }}
    >
      <Stack.Screen
        name={ROUTE.DASHBOARD}
        component={Dashboard}
        options={{
          headerStyle: {
            backgroundColor: theme.color.SECONDARY_100,
            shadowColor: theme.color.SECONDARY_100,
          },
          headerTitle: '',
          // eslint-disable-next-line react/no-unstable-nested-components
          headerLeft: () => (
            <IconButton
              variant="ghost"
              ml={2}
              icon={<FontAwesome size={24} name="align-justify" />}
              _icon={{ color: COLOR.LIGHT_BACKGROUND_100 }}
              onPress={drawer.open}
            />
          ),
        }}
      />
    </Stack.Navigator>
  );
};

export default UserStack;
