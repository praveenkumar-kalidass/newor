import React from 'react';
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Box, CircleIcon, Text } from 'native-base';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

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
        <Box flex={1} mb={1} ml={4} alignItems="center" opacity={0}>
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
        <Box flex={1} mb={2} mr={4}>
          <TouchableOpacity onPress={() => navigation.navigate(ROUTE.ASSET)}>
            <Box alignItems="center">
              <Box flexDirection="row" alignItems="flex-end" p={1} borderRadius={5}>
                <FontAwesome color={theme.color.BACKGROUND_0} name="home" size={30} />
                <FontAwesome color={theme.color.BACKGROUND_0} name="car" size={20} />
                <FontAwesome color={theme.color.BACKGROUND_0} name="rupee" size={30} />
              </Box>
              <Translation tkey="ASSETS" as={Text} bold fontSize={16} />
            </Box>
          </TouchableOpacity>
        </Box>
      </TabNavigations>
    </TabContainer>
  );
};

export default TabBar;
