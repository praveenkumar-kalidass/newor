import useAxios from '.';
import config from '../../config';

const useLiability = () => {
  const axios = useAxios();

  const getLiability = (id) => axios.get(`${config.baseURL}/api/liability/v1/${id}`);

  const addLoan = (request) => axios.post(`${config.baseURL}/api/loan/v1`, request);

  return {
    getLiability,
    addLoan,
  };
};

export default useLiability;
