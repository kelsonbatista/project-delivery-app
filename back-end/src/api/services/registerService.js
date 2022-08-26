const md5 = require('md5');
const { User } = require('../../database/models');
const JWT = require('../utils/jwtTokenGenerator');

const createUser = (user) => {
  const { password, ...userInfo } = user.dataValues;
    const token = JWT.jwtTokenGenerator({ userInfo });
    const { id, ...newUserInfo } = userInfo;
  return { ...newUserInfo, token };
};

const createUserAdmin = (user) => {
  const { ...userInfo } = user.dataValues;
    // const token = JWT.jwtTokenGenerator({ userInfo });
    // const { id, ...newUserInfo } = userInfo;
  // console.log(userInfo);
  return userInfo;
};

const create = async (payLoad) => {
  const { name, email, password, role } = payLoad;
  const criptPasswd = md5(password);
  const verifyUser = await User.findOne({
    where: { email, password: criptPasswd },
  });

  if (!verifyUser) {
    const user = await User.create({
      name,
      email,
      password: criptPasswd,
      role,
    });
    return createUser(user);
  }
  return { message: 'Usuário já cadastrado' };
};

const createAdmin = async ({ payLoad, admin }) => {
  const { name, email, password, role } = payLoad;
  const criptPasswd = md5(password);
  const verifyUserEmail = await User.findOne({ where: { email } });
  const verifyUserName = await User.findOne({ where: { name } });

  if ((!verifyUserEmail && !verifyUserName) && admin.role === 'administrator') {
    const user = await User.create({
      name,
      email,
      password: criptPasswd,
      role,
    });

    return createUserAdmin(user);
  }
  return { message: 'Usuário já cadastrado' };
};

module.exports = {
  create,
  createAdmin,
};
