import useAxios from '.';
import config from '../../config';

const useAsset = () => {
  const axios = useAxios();

  const addDeposit = (request) => axios.post(`${config.baseURL}/api/deposit/v1`, request);

  return {
    addDeposit,
  };
};

export default useAsset;
