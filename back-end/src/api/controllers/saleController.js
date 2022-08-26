const SaleService = require('../services/saleService');

const create = async (req, res) => {
    const { email } = req.headers;
    const costumer = await SaleService.create(req.body, email);
    res.status(201).json(costumer);
};

const changingStatus = async (req, res) => {
  const { id } = req.params;
  const { email } = req.headers;
  const { status } = req.body;
  const statusChangedTo = await SaleService.changingStatus(status, email, id);
  res.status(200).json({ statusChangedTo });
};

const getAllById = async (req, res, _next) => {
  const { id } = req.params;
  const response = await SaleService.getSalesProductId(Number(id));
  return res.status(200).json(response);
};

const getCustomerOrders = async (req, res, _next) => {
  const { id } = req.params;
  const response = await SaleService.getCustomerOrders(Number(id));
  return res.status(200).json(response);
};

const getSellerOrders = async (req, res, _next) => {
  const { id } = req.params;
  const response = await SaleService.getSellerOrders(Number(id));
  return res.status(200).json(response);
};

module.exports = {
  create,
  changingStatus,
  getAllById,
  getCustomerOrders,
  getSellerOrders,
};
