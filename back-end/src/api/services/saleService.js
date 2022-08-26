const { Sale, SaleProduct, User, Product } = require('../../database/models');
const error = require('../utils/throwError');

const linkingSaleProducts = async (products, saleId) => {
  await Promise.all(products.map(async (product) => {
      await SaleProduct.create({
        productId: product.id,
        saleId,
        quantity: product.quantity,  
      });
  }));
};

const create = async (payLoad, email) => {
  const user = await User.findOne({ where: { email } });
  const userId = user.id;
  const { sellerId, totalPrice, products, deliveryNumber, deliveryAddress } = payLoad;
    const sale = await Sale.create({
      userId,
      sellerId,
      totalPrice,
      deliveryNumber,
      deliveryAddress,
      saleDate: new Date(),
      status: 'Pendente',
    });

    await linkingSaleProducts(products, sale.id);
    return sale;
};

const sellerChecking = (status, role) => {
  if ((status === 'Preparando' || status === 'Em Trânsito') && role !== 'seller') {
    throw error(401, 'unauthorized user');
  }
};

const customerChecking = (status, role) => {
  if (status === 'Entregue' && role !== 'customer') {
    throw error(401, 'unauthorized user');
  }
};

const changingStatus = async (status, email, id) => {
  const user = await User.findOne({ where: { email } });
  sellerChecking(status, user.role);
  customerChecking(status, user.role);
  if (user.role === 'customer') {
    Sale.update({ status }, { where: { userId: user.id, id } });
  } else {
    Sale.update({ status }, { where: { sellerId: user.id, id } });
  }
  return status;
};

async function getSalesProductId(id) {
  const sale = await Sale.findOne({ 
    where: { id }, 
    include: [{ 
      model: Product, as: 'products', through: { attributes: ['quantity'] }, 
    }, 
    { 
      model: User, as: 'seller', attributes: { exclude: 'password' },
    }, 
    { 
      model: User, as: 'customer', attributes: { exclude: 'password' }, 
    },
  ],
    });
  return sale;
}

const getCustomerOrders = async (id) => {
  const costumer = await Sale.findAll(
    { where: { userId: id } },
    );
  if (costumer.length === 0) throw error(404, 'Object not found');
  return costumer;
};

const getSellerOrders = async (id) => {
  const costumer = await Sale.findAll(
    { where: { sellerId: id } },
    );
  if (costumer.length === 0) throw error(404, 'Object not found');
  return costumer;
};

module.exports = {
  create,
  changingStatus,
  getSalesProductId,
  getCustomerOrders,
  getSellerOrders,
};
