import axios from 'axios';

const BASE_URL = 'http://localhost:3001';

const getProducts = async () => {
  const URL = `${BASE_URL}/products`;
  const products = await axios.get(URL).then((result) => result.data);
  return products;
};

const getProductsById = async (id) => {
  const URL = `${BASE_URL}/products/${id}`;
  const product = await axios.get(URL).then((result) => result.data);
  return product;
};

export { getProducts, getProductsById };
