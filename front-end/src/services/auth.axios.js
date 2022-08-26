import axios from 'axios';

const user = localStorage.getItem('user');
const token = user && JSON.parse(user).token;
console.log(token, '<<< token axios front');

const authAxios = axios.create({
  baseURL: '',
  headers: {
    Authorization: `${token}`,
  },
});

export default authAxios;
