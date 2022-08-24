import { useContext } from 'react';

import { formatCurrency } from 'helper/util';
import UserContext from './UserContext';

const useUser = () => {
  const {
    user, setUser, isAuthorized, setIsAuthorized, asset, setAsset,
  } = useContext(UserContext);

  const initialiseWorth = (data) => {
    setAsset({
      ...data.asset,
      label: formatCurrency(data.asset.value),
    });
  };

  const loadAsset = (data) => {
    setAsset({
      ...data,
      label: formatCurrency(data.value),
    });
  };

  return {
    user,
    setUser,
    isAuthorized,
    setIsAuthorized,
    asset,
    initialiseWorth,
    loadAsset,
  };
};

export default useUser;
