// const { Router } = require('express');
// const { User } = require('../../database/models');
// const loginService = require('../services/loginService');

// Router.post('/register', async (req, res) => {
//   const { name, password } = req.body;
//   const newUser = await User.create()

//   res.status(200).json({message: 'Usuário criado com sucesso'});
// })
// const loginService = require('../services/loginService');

// const loginUser = async (req, res) => {
//   const { email } = req.body;

//   if (token === 'Incorrect email or password') {
//     return res.status(404).json({ message: 'Not Found' });
//   }
//   return res.status(200).json({ token });
// }

// module.exports = {
//   loginUser,
// }

const loginService = require('../services/loginService');

const loginUser = async (req, res) => {
    const { email, password } = req.body;
    const user = await loginService.login(email, password);
    if (user === 'Invalid fields' || user === undefined) {
      return res.status(404).json({ message: 'não encontrado' });
    }
    return res.status(200).json(user);
};

module.exports = {
  loginUser,
};