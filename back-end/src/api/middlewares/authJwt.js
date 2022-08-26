const jwt = require('jsonwebtoken');
const fs = require('fs');
const error = require('../utils/throwError');
const { User } = require('../../database/models');
const { invalidToken } = require('../utils/errors');

const secret = fs.readFileSync('jwt.evaluation.key', 'utf8');

const checkJwt = async (req, res, next) => {
  const token = req.headers.authorization;
  console.log(token, '<<< token check');
  try {
    if (!token) throw error(401, invalidToken);
    const decoded = jwt.verify(token, secret);
    const { role, email } = decoded.userInfo;
    const user = await User.findAll({ where: { email } });
    if (!user[0]) throw error(401, invalidToken);
    req.headers.role = role;
    req.headers.email = email;
    return next();
  } catch (e) {
    throw error(401, invalidToken);
  }
};

module.exports = checkJwt;
