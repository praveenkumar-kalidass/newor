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
import { LiabilityCard } from './LiabilityType.style';

const LiabilityType = () => {
  const navigation = useNavigation();
  const { translate } = useTranslation();
  const theme = useTheme();
  const liabilityTypes = useMemo(() => [
    {
      label: translate('LOAN'),
      list: Object.values(CONSTANT.LOAN_TYPE).map((value, index) => ({
        label: translate(`CONSTANT.LOAN_TYPE.${value}`),
        color: COLOR.RANDOM[index],
      })),
      onPress: () => navigation.goBack(),
    },
  ], []);

  return (
    <ScrollView>
      <VStack p={5}>
        <For each="liabilityType" index="index" of={liabilityTypes}>
          <TouchableOpacity
            key={`liability-type-${index}`}
            testID={`liability-type-${liabilityType.label}`}
            onPress={liabilityType.onPress}
          >
            <LiabilityCard>
              <VStack flex={1}>
                <Text fontSize={16} bold>{liabilityType.label}</Text>
                <Divider my={3} />
                <HStack flexWrap="wrap">
                  <For each="item" index="itemIndex" of={liabilityType.list}>
                    <Badge
                      key={`liability-type-${index}-item-${itemIndex}`}
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
            </LiabilityCard>
          </TouchableOpacity>
        </For>
      </VStack>
    </ScrollView>
  );
};

export default LiabilityType;
