const express = require("express");
const argon = require('argon2');
const jwt = require('jsonwebtoken');
const { normalizeUsers } = require("../../controller/normalize");
const { userRegisterValidation, userLoginValidation } = require("../../controller/router_validate/user_route_validate");
const router = express.Router();
const { User, Payments } = require("../../models/models");
const { env: { JWT_SECRET } } = process;
const fs = require('fs');
const { transportEmail, htmlReplacer } = require("../../controller/emailUtils");

router.post('/user/register', async (req, res, next) => {
    const { name, surname, email, sub, status, payment_id, merchant_order_id } = req.body;
    let { password } = req.body;
    if (!!sub && !password && typeof sub === 'string') {
        const mayusculas = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const minusculas = 'abcdefghijklmnopqrstuvwxyz';
        password = mayusculas[Math.floor(Math.random()*mayusculas.length)] + minusculas[Math.floor(Math.random()*minusculas.length)] + Math.floor(Math.random()*10) + Math.random().toString(36).slice(-5);
    }

    const path = '/emailUsersMessages/register_message.html';
    try {
        userRegisterValidation(name, surname, email, password);
        if (!status) {
            const userRegister = { name, surname, email, password }
            return res.json({userRegister, registered: false, user: null, token: null});
        }

        const existentUser = await User.findOne({ email });
        if (existentUser && !!Object.keys(existentUser).length) return res.status(404).send("El User ya existe en la base de datos.");

        const hash = await argon.hash(password);

        const category = "User";

        await User.create({ name, surname, email, password: hash, category });
        const posted = await User.findOne({ email });
        if (status === 'approved') {
            await Payments.create({ owner: posted._id, status, payment: payment_id, merchantOrder: merchant_order_id });
        }

        const oldText = ['{name}', '{surname}'];
        const newText = [name, surname];
        const [re, obj] = htmlReplacer(oldText, newText);
        const html = await fs.readFileSync(__dirname + path, 'utf8')
            .replace(re, (match)=>obj[match]);
        await transportEmail(email, html, 'Registro exitoso');
        
        const token = await jwt.sign({ sub: posted._id }, JWT_SECRET, { expiresIn: "12h"});

        return res.json({user: normalizeUsers(posted), registered: true, userRegister: {}, token});
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