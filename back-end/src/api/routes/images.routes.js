const routes = require('express').Router();
const path = require('path');
// const rescue = require('express-rescue');
// const ProductController = require('../controllers/ProductController');
const publica = path.join(__dirname, '..', '..', '..', 'public');

routes.get('/:id', (req, res) => {
  const { id } = req.params;
  res.sendFile(path.join(publica, id));
});

module.exports = routes;