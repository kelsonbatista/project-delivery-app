const { User } = require('../../database/models');

async function registerUser() {
  const user = await User.create({
    email: 'test@email.com',
    name: 'Test User',
    password: 'password',
  });

  return user;
}

module.exports = {
  registerUser,
};