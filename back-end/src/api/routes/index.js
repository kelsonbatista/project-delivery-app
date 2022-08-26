const login = require('./login.routes');
const sales = require('./sales.routes');
const products = require('./products.routes');
const users = require('./users.routes');
const images = require('./images.routes');
const register = require('./register.routes');

module.exports = {
  images,
  login,
  sales,
  products,
  users,
  register,
};
