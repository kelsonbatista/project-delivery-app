import axios from 'axios';
import { getStorage } from '../helpers/localStorage';

const BASE_URL = 'http://localhost:3001';
const user = getStorage('user') || [];

const getSellers = async () => {
  const URL = `${BASE_URL}/users/sellers`;
  const response = await axios
    .get(
      URL,
      null,
      { headers: { authorization: user.token } },
    ).then((result) => result.data);
  return response;
};

const getAllUsers = async () => {
  const URL = `${BASE_URL}/users`;
  const response = await axios
    .get(
      URL,
      null,
      { headers: { authorization: user.token } },
    ).then((result) => result.data);
  return response;
};

export { getSellers, getAllUsers };
