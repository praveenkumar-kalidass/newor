import React from 'react';
import { TouchableOpacity } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {
  Divider, HStack, VStack, Avatar, Text, Box,
} from 'native-base';

import COLOR from 'constant/color';
import withBackground from 'helper/withBackground';
import useTranslation from 'translation/useTranslation';
import Translation from 'translation/Translation';
import { Background3 } from 'component/Background';
import useUser from 'provider/User/useUser';
import { Container, AssetCard, AssetValue } from './Asset.style';

const Asset = () => {
  const { asset } = useUser();
  const { translate } = useTranslation();

  return (
    <Container>
      <AssetCard>
        <VStack justifyContent="space-around" flex={1}>
          <VStack my={3} px={3}>
            <HStack justifyContent="flex-start">
              <Text color={COLOR.LIGHT_BACKGROUND_0}>
                {translate('TOTAL_ASSET_VALUE')}
                ,
              </Text>
            </HStack>
            <HStack justifyContent="center">
              <AssetValue>{asset.label}</AssetValue>
            </HStack>
          </VStack>
          <Divider />
          <HStack flex={1} px={5} alignItems="center" justifyContent="space-around">
            <VStack space={1} alignItems="center" opacity={0}>
              <Text mt={1} fontSize={36} color={COLOR.LIGHT_SUCCESS_100}>2.50%</Text>
              <Text color={COLOR.LIGHT_BACKGROUND_0}>Secured Growth Rate</Text>
            </VStack>
            <TouchableOpacity>
              <VStack space={1} alignItems="center">
                <Box borderWidth={1} p={1} rounded="full" borderColor={COLOR.PURPLE}>
                  <Avatar bg={COLOR.PURPLE}>
                    <FontAwesome5 color={COLOR.LIGHT_BACKGROUND_100} size={20} name="file-invoice-dollar" />
                  </Avatar>
                </Box>
                <Translation tkey="ADD_ASSET" as={Text} color={COLOR.LIGHT_BACKGROUND_0} />
              </VStack>
            </TouchableOpacity>
          </HStack>
        </VStack>
      </AssetCard>
    </Container>
  );
};

export default withBackground({ Component: Asset, Background: Background3 });
