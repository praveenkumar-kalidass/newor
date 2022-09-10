import { useContext } from 'react';

import { formatCurrency } from 'helper/util';
import UserContext from './UserContext';

const useUser = () => {
  const {
    user, setUser, isAuthorized, setIsAuthorized, asset, setAsset, liability, setLiability,
  } = useContext(UserContext);

  const initialiseWorth = (data) => {
    setAsset({
      ...data.asset,
      label: formatCurrency(data.asset.value),
    });
    setLiability({
      ...data.liability,
      label: formatCurrency(data.liability.value),
    });
  };

  const loadAsset = (data) => {
    setAsset({
      ...data,
      label: formatCurrency(data.value),
    });
  };

  const loadLiability = (data) => {
    setLiability({
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
    liability,
    initialiseWorth,
    loadAsset,
    loadLiability,
  };
};

export default useUser;
