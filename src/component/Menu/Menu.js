import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {
  FlatList, HStack, VStack, Text, Avatar,
} from 'native-base';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import useTranslation from 'translation/useTranslation';
import useTheme from 'theme/useTheme';
import ROUTE from 'constant/route';
import useUser from 'provider/User/useUser';
import { MenuContainer, MenuItem } from './Menu.style';

const Menu = ({ handleClose }) => {
  const theme = useTheme();
  const { translate } = useTranslation();
  const navigation = useNavigation();
  const { user } = useUser();

  const list = useMemo(
    () => [{
      id: 'LOGOUT',
      label: translate('LOGOUT'),
      icon: <FontAwesome color={theme.color.BACKGROUND_0} size={24} name="power-off" />,
      onPress: () => {
        navigation.navigate(ROUTE.LOGOUT);
        handleClose();
      },
    }],
    [theme],
  );

  return (
    <MenuContainer>
      <MenuItem>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate(ROUTE.PROFILE);
            handleClose();
          }}
        >
          <VStack alignItems="center">
            <Avatar size="xl" source={{ uri: user.picture }}>
              <FontAwesome size={40} name="user-secret" />
            </Avatar>
            <Text fontSize={18} my={2}>
              {`${user.firstName} ${user.lastName}`}
            </Text>
          </VStack>
        </TouchableOpacity>
      </MenuItem>
      <FlatList
        data={list}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={item.onPress}>
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

Menu.propTypes = {
  handleClose: PropTypes.func.isRequired,
};

export default Menu;
