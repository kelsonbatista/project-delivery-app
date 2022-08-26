import axios from 'axios';

const BASE_URL = 'http://localhost:3001';

const login = (email, password) => {
  const URL = `${BASE_URL}/login`;
  return axios
    .post(URL, { email, password })
    .then((result) => result.data);
};

const logout = async () => {
  const URL = `${BASE_URL}/logout`;
  await axios
    .post(URL)
    .then(() => localStorage.removeItem('user'))
    .catch((err) => `Error: ${err.message}`);
};

export { login, logout };
