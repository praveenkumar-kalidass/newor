import React, { useMemo } from 'react';
import { TouchableOpacity } from 'react-native';
import {
  ScrollView, VStack, Text, Divider, Box,
} from 'native-base';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import useTranslation from 'translation/useTranslation';
import CONSTANT from 'constant';
import { AssetCard } from './AssetType.style';

const AssetType = () => {
  const { translate } = useTranslation();
  const assetTypes = useMemo(() => [
    {
      label: translate('DEPOSIT'),
      value: CONSTANT.ASSET_TYPE.DEPOSIT,
    },
  ], []);

  return (
    <ScrollView>
      <VStack p={5}>
        <For each="assetType" index="index" of={assetTypes}>
          <TouchableOpacity>
            <AssetCard alignItems="center">
              <VStack flex>
                <Text fontSize={16}>{assetType.label}</Text>
                <Divider my={3} />
              </VStack>
              <Box pl={5}>
                <FontAwesome size={20} name="chevron-right" />
              </Box>
            </AssetCard>
          </TouchableOpacity>
        </For>
      </VStack>
    </ScrollView>
  );
};

export default AssetType;
