import axios from 'axios';
import { getStorage } from '../helpers/localStorage';

const BASE_URL = 'http://localhost:3001';

const postSales = async (payLoad) => {
  const user = getStorage('user') || [];
  console.log(user);
  const URL = `${BASE_URL}/sales`;
  // console.log('passou user service front');
  const response = await axios
    .post(
      URL,
      { ...payLoad },
      { headers: { authorization: user.token } },
    ).then((result) => result.data);
  return response;
};

const getOrderDetails = (id) => {
  const user = getStorage('user') || [];
  const URL = `${BASE_URL}/sales/${id}`;
  const response = axios
    .get(
      URL,
      null,
      { headers: { authorization: user.token } },
    ).then((result) => result.data);
  return response;
};

const getUserOrders = async (role, id) => {
  const user = getStorage('user') || [];
  const URL = `${BASE_URL}/sales/${role}/${id}`;
  // console.log(URL, 'URL');
  const response = await axios
    .get(
      URL,
      null,
      { headers: { authorization: user.token } },
    ).then((result) => result.data);

  console.log(response, ' <<<<<< response');
  return response;
};

const setOrderStatus = (status, id) => {
  const user = getStorage('user') || [];
  const URL = `${BASE_URL}/sales/${id}`;
  const response = axios
    .patch(
      URL,
      { status },
      { headers: { authorization: user.token } },
    ).then((result) => result.data);
  return response;
};

export { postSales, getOrderDetails, getUserOrders, setOrderStatus };
