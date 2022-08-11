import { useContext } from 'react';

import UserContext from './UserContext';

const useUser = () => {
  const { user, setUser, isAuthorized } = useContext(UserContext);

  return {
    user,
    setUser,
    isAuthorized,
  };
};

export default useUser;
