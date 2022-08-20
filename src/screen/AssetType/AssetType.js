import React, { useMemo } from 'react';
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {
  ScrollView, VStack, Text, Divider, Box, Badge, HStack,
} from 'native-base';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import useTranslation from 'translation/useTranslation';
import useTheme from 'theme/useTheme';
import CONSTANT from 'constant';
import COLOR from 'constant/color';
import ROUTE from 'constant/route';
import { AssetCard } from './AssetType.style';

const AssetType = () => {
  const navigation = useNavigation();
  const { translate } = useTranslation();
  const theme = useTheme();
  const assetTypes = useMemo(() => [
    {
      label: translate('DEPOSIT'),
      list: Object.values(CONSTANT.DEPOSIT_TYPE).map((value, index) => ({
        label: translate(value),
        color: COLOR.RANDOM[index],
      })),
      onPress: () => navigation.navigate(ROUTE.ADD_DEPOSIT),
    },
  ], []);

  return (
    <ScrollView>
      <VStack p={5}>
        <For each="assetType" index="index" of={assetTypes}>
          <TouchableOpacity
            key={`asset-type-${index}`}
            testID={`asset-type-${assetType.label}`}
            onPress={assetType.onPress}
          >
            <AssetCard>
              <VStack flex>
                <Text fontSize={16} bold>{assetType.label}</Text>
                <Divider my={3} />
                <HStack flexWrap>
                  <For each="item" index="itemIndex" of={assetType.list}>
                    <Badge
                      key={`asset-type-${index}-item-${itemIndex}`}
                      bg={item.color}
                      m={1}
                    >
                      {item.label}
                    </Badge>
                  </For>
                </HStack>
              </VStack>
              <Box pl={5} py={1}>
                <FontAwesome color={theme.color.BACKGROUND_0} size={20} name="chevron-right" />
              </Box>
            </AssetCard>
          </TouchableOpacity>
        </For>
      </VStack>
    </ScrollView>
  );
};

export default AssetType;
