const { sign, verify } = require('jsonwebtoken');
const fs = require('fs');

const jwtConfig = {
  expiresIn: '3d',
};
const SECRET = fs.readFileSync('jwt.evaluation.key', 'utf8');

const jwtTokenGenerator = (payload = {}) => sign(payload, SECRET, jwtConfig);

const jwtTokenVerify = (payload) => verify(payload, SECRET);

module.exports = {
  jwtTokenGenerator,
  jwtTokenVerify,
};
