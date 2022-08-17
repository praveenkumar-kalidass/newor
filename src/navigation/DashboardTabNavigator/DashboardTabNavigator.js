import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { IconButton } from 'native-base';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import ROUTE from 'constant/route';
import COLOR from 'constant/color';
import useTheme from 'theme/useTheme';
import useDrawer from 'provider/Drawer/useDrawer';
import TabBar from 'component/TabBar';
import Dashboard from 'screen/Dashboard';

const Tab = createBottomTabNavigator();

const DashboardTabNavigator = () => {
  const theme = useTheme();
  const drawer = useDrawer();

  return (
    <Tab.Navigator
      // eslint-disable-next-line react/jsx-props-no-spreading, react/no-unstable-nested-components
      tabBar={(props) => <TabBar {...props} />}
      initialRouteName={ROUTE.DASHBOARD}
    >
      <Tab.Screen
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
              ml={4}
              icon={<FontAwesome size={24} name="align-justify" />}
              _icon={{ color: COLOR.LIGHT_BACKGROUND_100 }}
              onPress={drawer.open}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default DashboardTabNavigator;
