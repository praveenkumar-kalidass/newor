import React, { useMemo, useState } from 'react';
import { KeyboardAvoidingView, Platform, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {
  Center, Avatar, Flex, VStack, FlatList, Text, Box, Divider, Spinner,
} from 'native-base';
import Fontawesome from 'react-native-vector-icons/FontAwesome';
import { launchImageLibrary } from 'react-native-image-picker';

import COLOR from 'constant/color';
import useTranslation from 'translation/useTranslation';
import Translation from 'translation/Translation';
import useTheme from 'theme/useTheme';
import useUserApi from 'api/useUser';
import useUser from 'provider/User/useUser';
import ToastAlert from 'component/ToastAlert';
import TitleBar from 'component/TitleBar/TitleBar';
import withBackground from 'helper/withBackground';
import { Background4 } from 'component/Background';
import useError from 'hook/useError';
import { Container, EditBadge } from './Profile.style';

const Profile = () => {
  const [isSubmit, setIsSubmit] = useState(false);
  const { user, setUser } = useUser();
  const { updatePicture } = useUserApi();
  const { translate } = useTranslation();
  const theme = useTheme();
  const list = useMemo(() => [
    {
      label: translate('FIRST_NAME'),
      key: 'firstName',
    },
    {
      label: translate('LAST_NAME'),
      key: 'lastName',
    },
    {
      label: translate('EMAIL'),
      key: 'email',
    },
    {
      label: translate('MOBILE_NUMBER'),
      key: 'mobileNumber',
    },
  ], []);
  const { toast } = useError();
  const navigation = useNavigation();

  const changePicture = async () => {
    try {
      setIsSubmit(true);
      const result = await launchImageLibrary();
      if (result.didCancel) {
        setIsSubmit(false);
        return;
      }
      const { data } = await updatePicture(result.assets[0]);
      setUser((previous) => ({ ...previous, picture: data.picture }));
      setIsSubmit(false);
      toast.show({
        render: () => <ToastAlert status="success" message={translate('PICTURE_UPDATED')} />,
        placement: 'top',
      });
    } catch (error) {
      setIsSubmit(false);
      toast(error);
    }
  };

  return (
    <KeyboardAvoidingView flex={1} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <Flex flex={1} direction="row" p="5" justify="center">
        <Container>
          <Box flexDirection="row" alignItems="center" mb={10} w="100%" justifyContent="space-between">
            <TitleBar color={theme.color.SECONDARY_100}>
              <Translation tkey="PROFILE" as={Text} bold fontSize={20} />
            </TitleBar>
            <TouchableOpacity onPress={navigation.goBack}>
              <Fontawesome color={theme.color.BACKGROUND_0} size={24} name="close" />
            </TouchableOpacity>
          </Box>
          <Center>
            <TouchableOpacity onPress={changePicture} testID="profile-update-picture">
              <EditBadge>
                <Fontawesome color={COLOR.LIGHT_BACKGROUND_100} size={20} name="pencil" />
              </EditBadge>
              <If condition={isSubmit}>
                <Avatar bg={COLOR.LIGHT_BACKGROUND_100} size="xl">
                  <Spinner color={COLOR.LIGHT_BACKGROUND_0} />
                </Avatar>
              </If>
              <If condition={!isSubmit}>
                <Avatar bg={COLOR.LIGHT_BACKGROUND_100} size="xl" source={{ uri: user.picture }}>
                  <Fontawesome size={40} name="user-secret" />
                </Avatar>
              </If>
            </TouchableOpacity>
          </Center>
          <Box my={5}>
            <FlatList
              data={list}
              renderItem={({ item }) => (
                <VStack>
                  <Text bold mb={1}>{item.label}</Text>
                  <Text fontSize={16}>{user[item.key]}</Text>
                  <Divider my={2} />
                </VStack>
              )}
              keyExtractor={(item) => item.key}
            />
          </Box>
        </Container>
      </Flex>
    </KeyboardAvoidingView>
  );
};

export default withBackground({ Component: Profile, Background: Background4 });
