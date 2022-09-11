/* eslint-disable react/no-unstable-nested-components */
import React from 'react';

import ROUTE from 'constant/route';
import COLOR from 'constant/color';
import useTheme from 'theme/useTheme';
import useTranslation from 'translation/useTranslation';
import HeaderButton from 'component/HeaderButton';
import LiabilityType from 'screen/LiabilityType';
import AddLoan from 'screen/AddLoan';

const AssetStack = (Stack) => {
  const theme = useTheme();
  const { translate } = useTranslation();

  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>
      <Stack.Screen
        name={ROUTE.LIABILITY_TYPE}
        component={LiabilityType}
        options={{
          headerTitle: translate('SELECT_LIABILITY'),
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
        name={ROUTE.ADD_LOAN}
        component={AddLoan}
        options={{
          headerTitle: translate('ADD_LOAN'),
          headerTitleStyle: {
            color: COLOR.LIGHT_BACKGROUND_100,
          },
          headerStyle: {
            backgroundColor: theme.color.PRIMARY_100,
          },
          headerLeft: () => <HeaderButton type="left" />,
          headerRight: () => <HeaderButton type="right" target={ROUTE.DASHBOARD_TAB} targetParams={{ screen: ROUTE.LIABILITY }} />,
        }}
      />
    </>
  );
};

export default AssetStack;
