const registerService = require('../services/registerService');

const registerUser = async (req, res, next) => {
    try {
        const newUser = await registerService.create(req.body);

        if (newUser.message) {
            return res.status(409).json({ message: 'Usuário já cadastrado' });
        }

        return res.status(201).json(newUser);
    } catch (erro) {
        next(erro);
    }
};

const registerUserAdmin = async (req, res, next) => {
    try {
        const newUser = await registerService.createAdmin(req.body);

        if (newUser.message) {
            return res.status(409).json({ message: 'Usuário já cadastrado' });
        }

        return res.status(201).json(newUser);
    } catch (erro) {
        next(erro);
    }
};

module.exports = {
    registerUser,
    registerUserAdmin,
};