import React, { useMemo } from 'react';
import { TouchableOpacity } from 'react-native';
import {
  FlatList, HStack, VStack, Text,
} from 'native-base';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import useTranslation from 'translation/useTranslation';
import useTheme from 'theme/useTheme';
import { MenuContainer, MenuItem } from './Menu.style';

const Menu = () => {
  const theme = useTheme();
  const { translate } = useTranslation();
  const list = useMemo(
    () => [{
      id: 'LOGOUT',
      action: 'press',
      label: translate('LOGOUT'),
      icon: <FontAwesome color={theme.color.BACKGROUND_0} size={24} name="power-off" />,
    }],
    [theme],
  );

  return (
    <MenuContainer>
      <FlatList
        data={list}
        renderItem={({ item }) => (
          <TouchableOpacity>
            <MenuItem>
              <HStack space={3}>
                {item.icon}
                <VStack justifyContent="center">
                  <Text bold>
                    {item.label}
                  </Text>
                </VStack>
              </HStack>
            </MenuItem>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id}
      />
    </MenuContainer>
  );
};

export default Menu;
