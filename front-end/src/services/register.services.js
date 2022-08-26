import axios from 'axios';
import { getStorage } from '../helpers/localStorage';

const BASE_URL = 'http://localhost:3001';

const registration = (payLoad) => {
  const URL = `${BASE_URL}/register`;
  return axios
    .post(URL, payLoad)
    .then((result) => result.data);
};

const registrationAdmin = (payLoad, admin) => {
  const user = getStorage('user') || [];
  const URL = `${BASE_URL}/register/admin`;
  return axios
    .post(URL, { payLoad, admin }, { headers: { authorization: user.token } })
    .then((result) => result.data);
};

export { registration, registrationAdmin };
