import { useContext } from 'react';

import UserContext from './UserContext';

const useUser = () => {
  const {
    user, setUser, isAuthorized, setIsAuthorized,
  } = useContext(UserContext);

  return {
    user,
    setUser,
    isAuthorized,
    setIsAuthorized,
  };
};

export default useUser;
