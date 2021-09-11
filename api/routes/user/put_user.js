const express = require("express");
const argon = require('argon2');
const { normalizeUsers } = require("../../controller/normalize");
const { userPutValidation } = require("../../controller/router_validate/user_route_validate");
const { User } = require("../../models/models");
const router = express.Router();
const { auth, authAdmin } = require('../../controller/auth');

router.put('/user/noAdmin/:id', auth, async (req, res, next) => {
    const { id } = req.params;
    const { name, surname, email, password} = req.body;

    try {
        userPutValidation(id, name, surname, email, password);

        const elem = await User.findById(id);
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
        const update = await User.findById(id);
        return res.json(normalizeUsers(update));
    } catch (error) {
        next(error);
    }
});

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

module.exports = router;