import React from 'react';
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {
  Box, Avatar, HStack, Text, VStack,
} from 'native-base';
import Fontawesome from 'react-native-vector-icons/FontAwesome';

import COLOR from 'constant/color';
import ROUTE from 'constant/route';
import usePreventBack from 'hook/usePreventBack';
import withBackground from 'helper/withBackground';
import { Background3 } from 'component/Background';
import useUser from 'provider/User/useUser';

const Dashboard = () => {
  const { user } = useUser();
  const navigation = useNavigation();
  usePreventBack();

  return (
    <Box>
      <TouchableOpacity onPress={() => navigation.navigate(ROUTE.PROFILE)}>
        <HStack space={5} p={6}>
          <Avatar size="lg" source={{ uri: user.picture }}>
            <Fontawesome size={40} name="user-secret" />
          </Avatar>
          <VStack justifyContent="center">
            <Text color={COLOR.LIGHT_BACKGROUND_100} fontSize={18}>
              {`${user.firstName} ${user.lastName}`}
            </Text>
            <Text color={COLOR.LIGHT_BACKGROUND_100} fontSize={14} italic>
              {user.email}
            </Text>
          </VStack>
        </HStack>
      </TouchableOpacity>
    </Box>
  );
};

export default withBackground({ Component: Dashboard, Background: Background3 });
