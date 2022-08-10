import { useContext } from 'react';

import UserContext from './UserContext';

const useUser = () => {
  const { user, setUser } = useContext(UserContext);

  return {
    user,
    setUser,
  };
};

export default useUser;
