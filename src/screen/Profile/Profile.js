import React from 'react';
import { KeyboardAvoidingView, Platform } from 'react-native';
import { Center, Avatar, Flex } from 'native-base';
import Fontawesome from 'react-native-vector-icons/FontAwesome';

import useUser from 'provider/User/useUser';
import { Container } from './Profile.style';

const Profile = () => {
  const { user } = useUser();

  return (
    <KeyboardAvoidingView flex={1} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <Flex flex={1} direction="row" p="5" justify="center">
        <Container>
          <Center>
            <Avatar size="xl" source={{ uri: user.picture }}>
              <Fontawesome size={40} name="user-secret" />
            </Avatar>
          </Center>
        </Container>
      </Flex>
    </KeyboardAvoidingView>
  );
};

export default Profile;
