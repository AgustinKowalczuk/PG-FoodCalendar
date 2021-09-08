const express = require("express");
const { normalizeUsers } = require("../../controller/normalize");
const validate = require("../../controller/validate");
const router = express.Router();
const models = require('../../models/models');
const { User } = models;

router.delete('/user/:id', async (req, res, next) => {
    const { id } = req.params;

    try {
        validate.idMongodb(id);

        const elem = await User.findById(id);
        if (!elem) return res.status(404).send("El usuario con el id ingresado no existe");

        const remove = await User.findByIdAndRemove(elem._id);
        return res.json(normalizeUsers(remove));
    } catch (error) {
        next(error);
    }
});

module.exports = router