const productService = require('../services/productService');

const findAll = async (_req, res, _next) => {
  const response = await productService.getProduct();
  return res.status(200).json(response);
};

const getAllById = async (req, res, _next) => {
  const { id } = req.params;
  const response = await productService.getProductId(id);
  return res.status(200).json(response);
};

module.exports = {
  findAll,
  getAllById,
};