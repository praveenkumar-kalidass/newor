import React, { useCallback, useEffect, useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {
  ScrollView, Divider, HStack, VStack, Avatar, Text, Box, Skeleton, Image,
} from 'native-base';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import COLOR from 'constant/color';
import CONSTANT from 'constant';
import ROUTE from 'constant/route';
import NEWOR_FAILURE from 'asset/image/newor-failure.png';
import withBackground from 'helper/withBackground';
import useTranslation from 'translation/useTranslation';
import Translation from 'translation/Translation';
import useTheme from 'theme/useTheme';
import { Background3 } from 'component/Background';
import AppButton from 'component/AppButton';
import useUser from 'provider/User/useUser';
import useLiability from 'api/useLiability';
import { formatCurrency } from 'helper/util';
import {
  Container, LiabilityCard, LiabilityValue, LiabilityListCard,
} from './Liability.style';

const Liability = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorCode, setErrorCode] = useState('');
  const [liabilities, setLiabilities] = useState([]);
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const { liability, loadLiability } = useUser();
  const { translate } = useTranslation();
  const theme = useTheme();
  const { getLiability } = useLiability();

  const doGetLiability = useCallback(async () => {
    try {
      setErrorCode('');
      setIsLoading(true);
      const { data } = await getLiability(liability.id);
      setLiabilities(data.list);
      loadLiability({
        id: data.id,
        value: data.value,
      });
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setErrorCode(error?.response?.data?.code || 'NEWOR_INTERNAL_SERVER_ERROR');
    }
  }, [liability]);

  useEffect(() => {
    if (isFocused) {
      doGetLiability(liability.id);
      return;
    }
    setLiabilities([]);
    setErrorCode('');
  }, [isFocused]);

  return (
    <Container>
      <LiabilityCard>
        <VStack justifyContent="space-around" flex={1}>
          <VStack my={3} px={3}>
            <HStack justifyContent="flex-start">
              <Text color={COLOR.LIGHT_BACKGROUND_0}>
                {translate('TOTAL_LIABILITY_VALUE')}
                ,
              </Text>
            </HStack>
            <HStack justifyContent="center">
              <LiabilityValue>{liability.label}</LiabilityValue>
            </HStack>
          </VStack>
          <Divider />
          <HStack flex={1} px={5} alignItems="center" justifyContent="space-around">
            <VStack space={1} alignItems="center" opacity={0}>
              <Text mt={1} fontSize={36} color={COLOR.LIGHT_SUCCESS_100}>2.50%</Text>
              <Text color={COLOR.LIGHT_BACKGROUND_0}>Secured Growth Rate</Text>
            </VStack>
            <TouchableOpacity testID="liability-add" onPress={() => navigation.navigate(ROUTE.LIABILITY_TYPE)}>
              <VStack space={1} alignItems="center">
                <Box borderWidth={1} p={1} rounded="full" borderColor={COLOR.GREEN_BLUE}>
                  <Avatar bg={COLOR.GREEN_BLUE}>
                    <FontAwesome5 color={COLOR.LIGHT_BACKGROUND_100} size={20} name="file-invoice-dollar" />
                  </Avatar>
                </Box>
                <Translation tkey="ADD_LIABILITY" as={Text} color={COLOR.LIGHT_BACKGROUND_0} />
              </VStack>
            </TouchableOpacity>
          </HStack>
        </VStack>
      </LiabilityCard>
      <ScrollView>
        <VStack mt={isLoading ? 16 : 4} mb={200} space={4}>
          <If condition={isLoading}>
            <For each="loader" of={[1, 2, 3]}>
              <LiabilityListCard key={`liability-loader-${loader}`}>
                <Skeleton size={12} rounded="full" startColor={theme.color.BACKGROUND_50} />
                <Skeleton.Text flex={1.5} startColor={theme.color.BACKGROUND_50} />
                <Skeleton size={3} flex={1} rounded="full" startColor={theme.color.BACKGROUND_50} />
              </LiabilityListCard>
            </For>
          </If>
          <If condition={!isLoading}>
            <For each="liability" index="index" of={liabilities}>
              <LiabilityListCard key={`liability-${index}`}>
                <Avatar
                  bg={COLOR.RANDOM[index % COLOR.RANDOM.length]}
                >
                  {CONSTANT.APP_LITERAL.RUPEE_SYMBOL}
                </Avatar>
                <VStack flex={1}>
                  <Translation tkey={liability.type} as={Text} bold />
                  <Translation tkey={liability.lenderName} as={Text} />
                </VStack>
                <HStack flex={1} justifyContent="flex-end">
                  <Text bold>{formatCurrency(liability.value)}</Text>
                </HStack>
              </LiabilityListCard>
            </For>
          </If>
          <If condition={errorCode}>
            <LiabilityListCard justifyContent="center">
              <VStack alignItems="center">
                <Image
                  testID="liability-failed-image"
                  alt={translate('ERROR_CODE.NEWOR_INTERNAL_SERVER_ERROR')}
                  source={NEWOR_FAILURE}
                  size="2xl"
                />
                <Translation tkey={`ERROR_CODE.${errorCode}`} as={Text} />
                <Translation
                  mt={4}
                  variant="secondary"
                  tkey="RELOAD"
                  as={AppButton}
                  endIcon={<FontAwesome size={20} color={COLOR.LIGHT_BACKGROUND_100} name="undo" />}
                  onPress={doGetLiability}
                  testID="liability-reload"
                />
              </VStack>
            </LiabilityListCard>
          </If>
          <If condition={!isLoading && !errorCode && !liabilities.length}>
            <LiabilityListCard justifyContent="center">
              <Translation tkey="NO_LIABILITY_FOUND" as={Text} />
            </LiabilityListCard>
          </If>
        </VStack>
      </ScrollView>
    </Container>
  );
};

export default withBackground({ Component: Liability, Background: Background3 });
