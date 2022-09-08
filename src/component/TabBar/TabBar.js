import React from 'react';
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Box, HStack, Text } from 'native-base';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import CONSTANT from 'constant';
import ROUTE from 'constant/route';
import AppButton from 'component/AppButton';
import useTheme from 'theme/useTheme';
import Translation from 'translation/Translation';
import {
  TabContainer,
  TabNavigations,
  TabBackgroundContainer,
  TabCenterIconContainer,
  TabCenterIconBackground,
} from './TabBar.style';

const TabBar = () => {
  const navigation = useNavigation();
  const theme = useTheme();

  return (
    <TabContainer>
      <TabNavigations>
        <TabCenterIconContainer>
          <TabCenterIconBackground />
        </TabCenterIconContainer>
        <TabBackgroundContainer />
        <Box flex={1} mb={2} ml={4}>
          <TouchableOpacity testID="tab-liability" onPress={() => navigation.navigate(ROUTE.LIABILITY)}>
            <Box alignItems="center">
              <HStack alignItems="center" p={1} borderRadius={5} space={1}>
                <FontAwesome color={theme.color.BACKGROUND_0} name="rupee" size={30} />
                <FontAwesome color={theme.color.BACKGROUND_0} name="handshake-o" size={20} />
                <FontAwesome5 color={theme.color.BACKGROUND_0} name="file-contract" size={30} />
              </HStack>
              <Translation tkey="LIABILITIES" as={Text} bold fontSize={16} />
            </Box>
          </TouchableOpacity>
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
        <Box flex={1} mb={2} mr={4}>
          <TouchableOpacity testID="tab-asset" onPress={() => navigation.navigate(ROUTE.ASSET)}>
            <Box alignItems="center">
              <HStack alignItems="center" p={1} borderRadius={5} space={1}>
                <FontAwesome color={theme.color.BACKGROUND_0} name="home" size={30} />
                <FontAwesome color={theme.color.BACKGROUND_0} name="car" size={20} />
                <FontAwesome color={theme.color.BACKGROUND_0} name="rupee" size={30} />
              </HStack>
              <Translation tkey="ASSETS" as={Text} bold fontSize={16} />
            </Box>
          </TouchableOpacity>
        </Box>
      </TabNavigations>
    </TabContainer>
  );
};

export default TabBar;
