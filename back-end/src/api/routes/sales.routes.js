const routes = require('express').Router();
const rescue = require('express-rescue');
const SaleController = require('../controllers/saleController');
const checkJwt = require('../middlewares/authJwt');

routes.get('/:id', SaleController.getAllById);
routes.post('/', rescue(checkJwt), rescue(SaleController.create));
routes.patch('/:id', rescue(checkJwt), rescue(SaleController.changingStatus));
routes.get('/customer/:id', rescue(SaleController.getCustomerOrders));
routes.get('/seller/:id', rescue(SaleController.getSellerOrders));

module.exports = routes;