import React, { useCallback, useEffect, useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {
  ScrollView, HStack, VStack, Avatar, Text, Box, Skeleton, Image,
} from 'native-base';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import COLOR from 'constant/color';
import ROUTE from 'constant/route';
import CONSTANT from 'constant';
import NEWOR_FAILURE from 'asset/image/newor-failure.png';
import withBackground from 'helper/withBackground';
import useTranslation from 'translation/useTranslation';
import Translation from 'translation/Translation';
import useTheme from 'theme/useTheme';
import { Background3 } from 'component/Background';
import AppButton from 'component/AppButton';
import Card from 'component/Card';
import useUser from 'provider/User/useUser';
import useAsset from 'api/useAsset';
import { formatCurrency } from 'helper/util';
import {
  Container, AssetValue, AssetListCard,
} from './Asset.style';

const Asset = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorCode, setErrorCode] = useState('');
  const [assets, setAssets] = useState([]);
  const { asset, loadAsset } = useUser();
  const { translate } = useTranslation();
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const { getAsset } = useAsset();
  const theme = useTheme();

  const doGetAsset = useCallback(async () => {
    try {
      setErrorCode('');
      setIsLoading(true);
      const { data } = await getAsset(asset.id);
      setAssets(data.list);
      loadAsset({
        id: data.id,
        value: data.value,
      });
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setErrorCode(error?.response?.data?.code || 'NEWOR_INTERNAL_SERVER_ERROR');
    }
  }, [asset]);

  useEffect(() => {
    if (isFocused) {
      doGetAsset(asset.id);
      return;
    }
    setAssets([]);
    setErrorCode('');
  }, [isFocused]);

  return (
    <Container>
      <Card>
        <VStack justifyContent="space-around" flex={1}>
          <VStack mt={5} px={5}>
            <Text fontSize={18} color={COLOR.LIGHT_BACKGROUND_0}>
              {translate('TOTAL_ASSET_VALUE')}
              ,
            </Text>
            <AssetValue>{asset.label}</AssetValue>
          </VStack>
          <HStack flex={1} px={5} alignItems="center" justifyContent="space-around">
            <VStack space={1} alignItems="center" opacity={0}>
              <Text mt={1} fontSize={36} color={COLOR.LIGHT_SUCCESS_100}>2.50%</Text>
              <Text color={COLOR.LIGHT_BACKGROUND_0}>Secured Growth Rate</Text>
            </VStack>
            <TouchableOpacity testID="asset-add" onPress={() => navigation.navigate(ROUTE.ASSET_TYPE)}>
              <VStack space={1} alignItems="center">
                <Box borderWidth={1} p={1} rounded="full" borderColoROr={COLOR.PURPLE}>
                  <Avatar bg={COLOR.PURPLE}>
                    <FontAwesome5 color={COLOR.LIGHT_BACKGROUND_100} size={20} name="file-invoice-dollar" />
                  </Avatar>
                </Box>
                <Translation tkey="ADD_ASSET" as={Text} color={COLOR.LIGHT_BACKGROUND_0} />
              </VStack>
            </TouchableOpacity>
          </HStack>
        </VStack>
      </Card>
      <ScrollView>
        <VStack mt={isLoading ? 16 : 4} mb={200} space={4}>
          <If condition={isLoading}>
            <For each="loader" of={[1, 2, 3]}>
              <AssetListCard key={`asset-loader-${loader}`}>
                <Skeleton size={12} rounded="full" startColor={theme.color.BACKGROUND_50} />
                <Skeleton.Text flex={1.5} startColor={theme.color.BACKGROUND_50} />
                <Skeleton size={3} flex={1} rounded="full" startColor={theme.color.BACKGROUND_50} />
              </AssetListCard>
            </For>
          </If>
          <If condition={!isLoading}>
            <For each="asset" index="index" of={assets}>
              <AssetListCard key={`asset-${index}`}>
                <Avatar
                  bg={COLOR.RANDOM[index % COLOR.RANDOM.length]}
                >
                  {CONSTANT.ASSET_ICON[asset.assetType]}
                </Avatar>
                <VStack flex={1}>
                  <Translation tkey={`CONSTANT.${asset.assetType}_TYPE.${asset.type}`} as={Text} bold />
                  <Translation tkey={asset.depositoryName} as={Text} />
                </VStack>
                <HStack flex={1} justifyContent="flex-end">
                  <Text bold>{formatCurrency(asset.value)}</Text>
                </HStack>
              </AssetListCard>
            </For>
          </If>
          <If condition={errorCode}>
            <AssetListCard justifyContent="center">
              <VStack alignItems="center">
                <Image
                  testID="asset-failed-image"
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
                  onPress={doGetAsset}
                  testID="asset-reload"
                />
              </VStack>
            </AssetListCard>
          </If>
          <If condition={!isLoading && !errorCode && !assets.length}>
            <AssetListCard justifyContent="center">
              <Translation tkey="NO_ASSET_FOUND" as={Text} />
            </AssetListCard>
          </If>
        </VStack>
      </ScrollView>
    </Container>
  );
};

export default withBackground({ Component: Asset, Background: Background3 });
