import useAxios from '.';
import config from '../../config';

const useAsset = () => {
  const axios = useAxios();

  const addDeposit = (request) => axios.post(`${config.baseURL}/api/deposit/v1`, request);

  const getAsset = (id) => axios.get(`${config.baseURL}/api/asset/v1/${id}`);

  return {
    addDeposit,
    getAsset,
  };
};

export default useAsset;
