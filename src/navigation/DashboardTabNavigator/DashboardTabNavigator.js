import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { IconButton } from 'native-base';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import ROUTE from 'constant/route';
import COLOR from 'constant/color';
import useTheme from 'theme/useTheme';
import useTranslation from 'translation/useTranslation';
import useDrawer from 'provider/Drawer/useDrawer';
import TabBar from 'component/TabBar';
import Dashboard from 'screen/Dashboard';
import Asset from 'screen/Asset';

const Tab = createBottomTabNavigator();

const DashboardTabNavigator = () => {
  const theme = useTheme();
  const { translate } = useTranslation();
  const drawer = useDrawer();

  return (
    <Tab.Navigator
      // eslint-disable-next-line react/jsx-props-no-spreading, react/no-unstable-nested-components
      tabBar={(props) => <TabBar {...props} />}
      initialRouteName={ROUTE.DASHBOARD}
      sceneContainerStyle={{
        backgroundColor: theme.color.BACKGROUND_100,
      }}
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
              icon={<FontAwesome color={COLOR.LIGHT_BACKGROUND_100} size={24} name="align-justify" />}
              onPress={drawer.open}
            />
          ),
        }}
      />
      <Tab.Screen
        name={ROUTE.ASSET}
        component={Asset}
        options={{
          headerStyle: {
            backgroundColor: theme.color.SECONDARY_100,
            shadowColor: theme.color.SECONDARY_100,
          },
          headerTitle: translate('ASSETS'),
          // eslint-disable-next-line react/no-unstable-nested-components
          headerLeft: () => (
            <IconButton
              variant="ghost"
              ml={4}
              icon={<FontAwesome color={COLOR.LIGHT_BACKGROUND_100} size={24} name="align-justify" />}
              onPress={drawer.open}
            />
          ),
          headerTitleStyle: {
            color: COLOR.LIGHT_BACKGROUND_100,
            fontSize: 20,
          },
        }}
      />
    </Tab.Navigator>
  );
};

export default DashboardTabNavigator;
