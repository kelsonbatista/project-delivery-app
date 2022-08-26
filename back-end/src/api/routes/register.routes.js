const routes = require('express').Router();
const rescue = require('express-rescue');
const registerController = require('../controllers/registerController');

routes.post('/', rescue(registerController.registerUser));
routes.post('/admin', rescue(registerController.registerUserAdmin));

module.exports = routes;