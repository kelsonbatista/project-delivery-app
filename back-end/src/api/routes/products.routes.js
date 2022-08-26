const routes = require('express').Router();
const ProductController = require('../controllers/productController');

routes.get('/', ProductController.findAll);
routes.get('/:id', ProductController.getAllById);
module.exports = routes;