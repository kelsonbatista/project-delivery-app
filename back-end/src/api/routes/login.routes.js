const routes = require('express').Router();
const rescue = require('express-rescue');
const loginController = require('../controllers/loginController');

routes.post('/', rescue(loginController.loginUser));

module.exports = routes;