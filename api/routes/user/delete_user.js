const express = require("express");
const { normalizeUsers } = require("../../controller/normalize");
const validate = require("../../controller/validate");
const router = express.Router();
const models = require('../../models/models');
const { User } = models;
const { auth, authAdmin } = require('../../controller/auth');
const { Calendar, Review, Like } = require("../../models/models");

//Admin que elimina un usuario.
router.delete('/user/admin/:id', auth, authAdmin, async (req, res, next) => {
    const { id } = req.params;

    try {
        validate.idMongodb(id);

        const elem = await User.findById(id);
        if (!elem) return res.status(404).send("El usuario con el id ingresado no existe");

        await Calendar.deleteMany({owner: elem._id});

        await Review.deleteMany({owner: elem._id});

        await Like.deleteMany({owner: elem._id});

        const remove = await User.findByIdAndRemove(elem._id);
        return res.json(normalizeUsers(remove));
    } catch (error) {
        next(error);
    }
});

//El usuario elimina su cuenta.
router.delete('/user/delete', auth, async (req, res, next) => {
    const { userId } = req;

    try {
        validate.idMongodb(userId);

        const elem = await User.findById(userId);
        if (!elem) return res.status(404).send("El usuario con el id ingresado no existe");

        await Calendar.deleteMany({owner: elem._id});

        await Review.deleteMany({owner: elem._id});

        await Like.deleteMany({owner: elem._id});

        const remove = await User.findByIdAndRemove(elem._id);
        return res.json(normalizeUsers(remove));
    } catch (error) {
        next(error);
    }
});

module.exports = router