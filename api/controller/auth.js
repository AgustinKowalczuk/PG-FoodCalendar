const jwt = require('jsonwebtoken');
const { User } = require('../models/models');
const { env: { JWT_SECRET } } = process;

const auth = async (req, res, next) => {
    const { authorization } = req.headers;

    try {
        if (!authorization) throw new Error("authorization inválido.");
        
        const token = authorization.slice(7);
        const { sub } = await jwt.verify(token, JWT_SECRET);

        const userFound = await User.findById(sub);
        if (!userFound) throw new Error("El usuario no fue encontrado.");

        req.userId = sub;
        req.userCategory = userFound.category;

        next();
    } catch (error) {
        next(error);

    }
};

const authAdmin = async (req, res, next) => {
    const { userCategory } = req;

    try {
        if (userCategory !== "Admin") throw new Error("Usuario no autorizado.");

        next();
    } catch (error) {
        next(error);
        
    }
};

module.exports = {auth, authAdmin};