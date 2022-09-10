import useAxios from '.';
import config from '../../config';

const useLiability = () => {
  const axios = useAxios();

  const getLiability = (id) => axios.get(`${config.baseURL}/api/liability/v1/${id}`);

  return {
    getLiability,
  };
};

export default useLiability;
