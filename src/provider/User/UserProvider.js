import React, { useEffect, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

import CONSTANT from 'constant';
import ROUTE from 'constant/route';
import useUser from 'api/useUser';
import UserContext from './UserContext';

const UserProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [isAuthorized, setIsAuthorized] = useState(null);
  const navigation = useNavigation();
  const { authorize } = useUser();

  const checkAuthorization = useCallback(async () => {
    try {
      const token = await AsyncStorage.getItem(CONSTANT.STORAGE_KEY.TOKEN);
      if (token) {
        await AsyncStorage.removeItem(CONSTANT.STORAGE_KEY.TOKEN);
        const { refreshToken } = JSON.parse(token);
        const { data } = await authorize(refreshToken);
        setUser(data.user);
        await AsyncStorage.setItem(CONSTANT.STORAGE_KEY.TOKEN, JSON.stringify({
          accessToken: data.accessToken,
          refreshToken: data.refreshToken,
        }));
        setIsAuthorized(true);
        navigation.navigate(ROUTE.DASHBOARD_TAB);
        return;
      }
      setIsAuthorized(false);
    // eslint-disable-next-line no-empty
    } catch (error) {
      setIsAuthorized(false);
    }
  }, [navigation]);

  useEffect(() => {
    checkAuthorization();
  }, []);

  return (
    <UserContext.Provider
      // eslint-disable-next-line react/jsx-no-constructed-context-values
      value={{
        user,
        setUser,
        isAuthorized,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

UserProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default UserProvider;
