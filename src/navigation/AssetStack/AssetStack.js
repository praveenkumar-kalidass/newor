/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { IconButton } from 'native-base';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import ROUTE from 'constant/route';
import COLOR from 'constant/color';
import useTheme from 'theme/useTheme';
import useTranslation from 'translation/useTranslation';
import AssetType from 'screen/AssetType';

const AssetStack = (Stack) => {
  const navigation = useNavigation();
  const theme = useTheme();
  const { translate } = useTranslation();

  return (
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
        headerLeft: () => (
          <IconButton
            variant="ghost"
            ml={3}
            icon={<FontAwesome color={COLOR.LIGHT_BACKGROUND_100} size={24} name="chevron-left" />}
            onPress={navigation.goBack}
          />
        ),
      }}
    />
  );
};

export default AssetStack;
