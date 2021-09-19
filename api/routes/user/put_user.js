const express = require("express");
const argon = require('argon2');
const { normalizeUsers } = require("../../controller/normalize");
const { userPutValidation } = require("../../controller/router_validate/user_route_validate");
const { User } = require("../../models/models");
const router = express.Router();
const { auth, authAdmin } = require('../../controller/auth');
const { htmlReplacer, transportEmail } = require("../../controller/emailUtils");
const fs = require('fs');
const { emailValidate } = require("../../controller/validate");

//El usuario puede modificar sus características.
router.put('/user/noAdmin', auth, async (req, res, next) => {
    const { userId } = req;
    const { name, surname, email, password} = req.body;
    const path = '/emailUsersMessages/update_password.html';

    try {
        userPutValidation(userId, name, surname, email, password);

        const elem = await User.findById(userId);
        if (!elem) return res.status(404).send("El usuario con el id ingresado no existe");

        const existentName = await User.findOne({ email });
        if (existentName) return res.status(404).send("El email del usuario ya existe en la base de datos.");

        if(!password){
            await User.findByIdAndUpdate(elem._id, { name, surname, email });
            const update = await User.findById(id);
            return res.json(normalizeUsers(update));
        }
        
        const hash = await argon.hash(password);
       
        await User.findByIdAndUpdate(elem._id, { name, surname, email, password: hash });

        const oldText = ['{name}', '{surname}'];
        const newText = [elem.name, elem.surname];
        const [re, obj] = htmlReplacer(oldText, newText);
        const html = await fs.readFileSync(__dirname + path, 'utf8')
            .replace(re, (match)=>obj[match]);
        await transportEmail(elem.email, html);                
        
        const update = await User.findById(elem._id);
        return res.json(normalizeUsers(update));
    } catch (error) {
        next(error);
    }
});

//El Admin modifica características de un usuario.
router.put('/user/admin/:id', auth, authAdmin, async (req, res, next) => {
    const { id } = req.params;
    const { name, surname, email, password, category } = req.body;

    try {
        userPutValidation(id, name, surname, email, password, category);

        const elem = await User.findById(id);
        if (!elem) return res.status(404).send("El usuario con el id ingresado no existe");

        const existentName = await User.findOne({ email });
        if (existentName) return res.status(404).send("El email del usuario ya existe en la base de datos.");

        if(!password){
            await User.findByIdAndUpdate(elem._id, { name, surname, email, category });
        const update = await User.findById(id);
        return res.json(normalizeUsers(update));
        }
        
        const hash = await argon.hash(password);
                
        await User.findByIdAndUpdate(elem._id, { name, surname, email, password: hash, category });
        const update = await User.findById(id);
        return res.json(normalizeUsers(update));
    } catch (error) {
        next(error);
    }
});

//Recuperación de contraseña
router.put('/guest/passwordForm', async (req, res, next) => {
    const { email } = req.body;
    const path = '/emailUsersMessages/recover_password.html';

    try {
        emailValidate(email);

        const elem = await User.findOne({email});
        if (!elem) return res.status(404).send("El usuario con el email ingresado no existe");

        const mayusculas = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const minusculas = 'abcdefghijklmnopqrstuvwxyz';

        let recuperada = '';
        recuperada = recuperada + mayusculas[Math.floor(Math.random()*mayusculas.length)] + minusculas[Math.floor(Math.random()*minusculas.length)] + Math.floor(Math.random()*10) + Math.random().toString(36).slice(-5);
        
        const hash = await argon.hash(recuperada);

        const oldText = ['{name}', '{surname}','{password}'];
        const newText = [elem.name, elem.surname, recuperada];
        const [re, obj] = htmlReplacer(oldText, newText);
        const html = await fs.readFileSync(__dirname + path, 'utf8')
            .replace(re, (match)=>obj[match]);
        await transportEmail(email, html);
                
        await User.findByIdAndUpdate(elem._id, { password: hash });
        const update = await User.findById(elem._id);
        return res.json(normalizeUsers(update));
    } catch (error) {
        next(error);
    }
});


module.exports = router;