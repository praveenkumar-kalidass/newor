/* eslint-disable react/no-unstable-nested-components */
import React from 'react';

import ROUTE from 'constant/route';
import COLOR from 'constant/color';
import useTheme from 'theme/useTheme';
import useTranslation from 'translation/useTranslation';
import HeaderButton from 'component/HeaderButton';
import AssetType from 'screen/AssetType';
import AddDeposit from 'screen/AddDeposit';

const AssetStack = (Stack) => {
  const theme = useTheme();
  const { translate } = useTranslation();

  return (
    <>
      <Stack.Screen
        name={ROUTE.ASSET_TYPE}
        component={AssetType}
        options={{
          headerTitle: translate('SELECT_ASSET'),
          headerTitleStyle: {
            color: COLOR.LIGHT_BACKGROUND_100,
          },
          headerStyle: {
            backgroundColor: theme.color.PRIMARY_100,
          },
          headerLeft: () => <HeaderButton type="left" />,
        }}
      />
      <Stack.Screen
        name={ROUTE.ADD_DEPOSIT}
        component={AddDeposit}
        options={{
          headerTitle: translate('ADD_DEPOSIT'),
          headerTitleStyle: {
            color: COLOR.LIGHT_BACKGROUND_100,
          },
          headerStyle: {
            backgroundColor: theme.color.PRIMARY_100,
          },
          headerLeft: () => <HeaderButton type="left" />,
          headerRight: () => <HeaderButton type="right" target={ROUTE.DASHBOARD_TAB} targetParams={{ screen: ROUTE.ASSET }} />,
        }}
      />
    </>
  );
};

export default AssetStack;
