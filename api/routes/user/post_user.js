const express = require("express");
const argon = require('argon2');
const { normalizeUsers } = require("../../controller/normalize");
const { userValidation } = require("../../controller/router_validate/user_route_validate");
const router = express.Router();
const { User } = require("../../models/models");

router.post('/user', async (req, res, next) => {
    const { name, surname, email, password } = req.body;

    try {
        userValidation(name, surname, email, password);

        const existentUser = await User.findOne({ email });
        if (existentUser && !!Object.keys(existentUser).length) return res.status(404).send("El User ya existe en la base de datos.");

        const hash = await argon.hash(password);

        const category = "User";

        await User.create({ name, surname, email, password: hash, category });
        const posted = await User.findOne({ email });
        return res.json(normalizeUsers(posted));
    } catch (error) {
        next(error);
    }
});

module.exports = router;