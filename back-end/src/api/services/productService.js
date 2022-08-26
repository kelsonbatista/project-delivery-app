const { Product } = require('../../database/models');

async function getProduct() {
  const allProducts = await Product.findAll();
  return allProducts;
}

async function getProductId(id) {
  const productsId = await Product.findByPk(id);
  return productsId;
}

module.exports = {
  getProduct,
  getProductId,
  };
