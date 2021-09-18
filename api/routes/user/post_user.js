const express = require("express");
const argon = require('argon2');
const jwt = require('jsonwebtoken');
const { normalizeUsers } = require("../../controller/normalize");
const { userRegisterValidation, userLoginValidation } = require("../../controller/router_validate/user_route_validate");
const router = express.Router();
const { User } = require("../../models/models");
const { env: { JWT_SECRET } } = process;
const fs = require('fs');
const { transportEmail } = require("../transport");

router.post('/user/register', async (req, res, next) => {
    const { name, surname, email, password } = req.body;

    try {
        userRegisterValidation(name, surname, email, password);

        const existentUser = await User.findOne({ email });
        if (existentUser && !!Object.keys(existentUser).length) return res.status(404).send("El User ya existe en la base de datos.");

        const hash = await argon.hash(password);

        const category = "User";

        await User.create({ name, surname, email, password: hash, category });
        const posted = await User.findOne({ email });

        const html = await fs.readFileSync(__dirname + '/emailUsersMessages/register_message.html');        
        await transportEmail(email, html);
        
        return res.json(normalizeUsers(posted));
    } catch (error) {
        next(error);
    }
});

router.post('/user/login', async (req, res, next) => {
    const { email, password } = req.body;
    
    try {
        userLoginValidation(email, password);

        let userFound = await User.findOne({email});
        if (!userFound) throw new Error (`El usuario con el email ${email} no se encuentra registrado.`);
        
        if (! await argon.verify(userFound.password, password)) throw new Error ("La constraseña ingresada es incorrecta.");
        
        const token = await jwt.sign({ sub: userFound._id }, JWT_SECRET, { expiresIn: "12h"});
        userFound = normalizeUsers(userFound);
        return res.json({ token,  user: userFound });                
    } catch (error){
        next(error);
    }
})

module.exports = router;