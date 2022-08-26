const UserService = require('../services/userService');

const getCustomerById = async (req, res) => {
  const { id } = req.params;
  const costumer = await UserService.getCustomerById(id);
  res.status(200).json(costumer);
};

const getSellersById = async (req, res) => {
  const { id } = req.params;
  const costumer = await UserService.getSellersById(id);
  res.status(200).json(costumer);
};

const findAll = async (req, res) => {
  const users = await UserService.findAll();
  res.status(200).json(users);
};

const findAllSellers = async (req, res) => {
  const users = await UserService.findAllSellers();
  res.status(200).json(users);
};

const destroy = async (req, res) => {
  const { id } = req.params;
  await UserService.destroy(id);
  res.status(204).end();
};

module.exports = {
  getCustomerById,
  getSellersById,
  findAll,
  findAllSellers,
  destroy,
};
