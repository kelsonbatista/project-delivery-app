const { User, Sale } = require('../../database/models'); 
const error = require('../utils/throwError');

const getCustomerById = async (id) => {
  const costumer = await User.findAll(
    { where: { id },
     include: { model: Sale, as: 'sales' }, 
    },
    );
  if (costumer.length === 0) throw error(404, 'Object not found');
  return costumer;
};

const getSellersById = async (id) => {
  const costumer = await User.findAll(
    { where: { id },
     include: { model: Sale, as: 'sellerSales' }, 
    },
    );
  if (costumer.length === 0) throw error(404, 'Object not found');
  return costumer;
};

const findAll = async () => {
  const users = User.findAll({ where: { role: ['customer', 'seller'] } });
  return users;
};

const findAllSellers = async () => {
  const users = User.findAll({ where: { role: ['seller'] } });
  return users;
};

const destroy = async (id) => {
  const users = User.destroy({ where: { id } });
  return users;
};

module.exports = {
  getCustomerById,
  getSellersById,
  findAll,
  findAllSellers,
  destroy,
};