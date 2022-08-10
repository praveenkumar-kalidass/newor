import React from 'react';
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Box, CircleIcon, Text } from 'native-base';

import CONSTANT from 'constant';
import ROUTE from 'constant/route';
import AppButton from 'component/AppButton';
import {
  TabContainer,
  TabNavigations,
  TabBackgroundContainer,
  TabCenterIconContainer,
  TabCenterIconBackground,
} from './TabBar.style';

const TabBar = () => {
  const navigation = useNavigation();

  return (
    <TabContainer>
      <TabNavigations>
        <TabCenterIconContainer>
          <TabCenterIconBackground />
        </TabCenterIconContainer>
        <TabBackgroundContainer />
        <Box flex={1} mb={1} alignItems="center" opacity={0}>
          <TouchableOpacity>
            <CircleIcon size={10} />
          </TouchableOpacity>
          <Text>Liabilities</Text>
        </Box>
        <Box flex={1} mb={1} alignItems="center">
          <AppButton
            variant="primary"
            rounded="full"
            onPress={() => navigation.navigate(ROUTE.DASHBOARD)}
            size={16}
            _text={{ fontSize: 36 }}
          >
            {CONSTANT.APP_LITERAL.RUPEE_SYMBOL}
          </AppButton>
          <Text>&nbsp;</Text>
        </Box>
        <Box flex={1} mb={1} alignItems="center" opacity={0}>
          <TouchableOpacity>
            <CircleIcon size={10} />
          </TouchableOpacity>
          <Text>Assets</Text>
        </Box>
      </TabNavigations>
    </TabContainer>
  );
};

export default TabBar;
