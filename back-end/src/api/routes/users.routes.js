const routes = require('express').Router();
const rescue = require('express-rescue');
const UserController = require('../controllers/userController');

routes.get('/customer/:id', rescue(UserController.getCustomerById));
routes.get('/seller/:id', rescue(UserController.getSellersById));
routes.get('/', rescue(UserController.findAll));
routes.get('/sellers', rescue(UserController.findAllSellers));
routes.delete('/', rescue(UserController.destroy));

module.exports = routes;