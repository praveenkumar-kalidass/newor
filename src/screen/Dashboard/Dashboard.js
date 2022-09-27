import React, { useCallback, useEffect } from 'react';
import { TouchableOpacity } from 'react-native';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import {
  Box, Avatar, HStack, Text, VStack,
} from 'native-base';
import Fontawesome from 'react-native-vector-icons/FontAwesome';

import COLOR from 'constant/color';
import ROUTE from 'constant/route';
import usePreventBack from 'hook/usePreventBack';
import withBackground from 'helper/withBackground';
import { Background3 } from 'component/Background';
import Card from 'component/Card';
import useUser from 'provider/User/useUser';
import useUserApi from 'api/useUser';
import useError from 'hook/useError';
import useTranslation from 'translation/useTranslation';
import { WorthValue } from './Dashboard.style';

const Dashboard = () => {
  const { user, worth, initialiseWorth } = useUser();
  const navigation = useNavigation();
  const { getWorth } = useUserApi();
  const isFocused = useIsFocused();
  const { toast } = useError();
  const { translate } = useTranslation();
  usePreventBack();

  const doGetWorth = useCallback(async () => {
    try {
      const { data } = await getWorth();
      initialiseWorth(data);
    } catch (error) {
      toast(error);
    }
  }, []);

  useEffect(() => {
    if (isFocused) {
      doGetWorth();
    }
  }, [isFocused]);

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
      <VStack px={5}>
        <Card>
          <VStack my={5} px={5}>
            <Text fontSize={18} color={COLOR.LIGHT_BACKGROUND_0}>
              {translate('TOTAL_NET_WORTH')}
              ,
            </Text>
            <WorthValue>{worth.label}</WorthValue>
          </VStack>
        </Card>
      </VStack>
    </Box>
  );
};

export default withBackground({ Component: Dashboard, Background: Background3 });
