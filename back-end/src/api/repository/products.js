const { Product } = require('../../database/models');

async function getProduct() {
    const allProducts = await Product.findAll();
  return allProducts;
}

module.exports = {
  getProduct,
};