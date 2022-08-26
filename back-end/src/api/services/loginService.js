const md5 = require('md5');
const { User } = require('../../database/models');
const JWT = require('../utils/jwtTokenGenerator');

const login = async (email, pass) => {
  const loginUser = await User.findOne({ where: { email } });

  const comparePassword = md5(pass);
  if (!loginUser || loginUser.password !== comparePassword) {
    return 'Invalid fields';
  }

  const { password, ...userInfo } = loginUser.dataValues;
  const token = JWT.jwtTokenGenerator({ userInfo });
  console.log(token);
  const { id, ...newUserInfo } = userInfo;
  return { ...newUserInfo, token };
};

module.exports = {
  login,
};