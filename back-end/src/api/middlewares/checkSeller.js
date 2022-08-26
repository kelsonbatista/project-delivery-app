const error = require('../utils/throwError');
const { unauthorizedUser } = require('../utils/errors');

module.exports = (req, res, next) => {
  const { role } = req.headers;
  if (role !== 'seller') throw error(401, unauthorizedUser);
  return next();
};