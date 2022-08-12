import React, { useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { IconButton, Text } from 'native-base';
import Drawer from 'react-native-drawer';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import useTheme from 'theme/useTheme';
import ROUTE from 'constant/route';
import COLOR from 'constant/color';
import Dashboard from 'screen/Dashboard';

const Stack = createStackNavigator();

const UserStack = () => {
  const theme = useTheme();
  const [isDrawer, setIsDrawer] = useState(false);

  return (
    <Drawer
      open={isDrawer}
      type="overlay"
      tapToClose
      openDrawerOffset={0.2}
      content={<Text>Drawer</Text>}
      onClose={() => setIsDrawer(false)}
    >
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
                onPress={() => setIsDrawer(true)}
              />
            ),
          }}
        />
      </Stack.Navigator>
    </Drawer>
  );
};

export default UserStack;
