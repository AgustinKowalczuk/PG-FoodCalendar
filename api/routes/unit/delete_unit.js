const express = require("express");
const validate = require("../../controller/validate");
const router = express.Router();
const models = require('../../models/models');
const { Unit } = models;

router.delete('/unit/:id', async (req, res, next) => {
    const { id } = req.params;
    try {
        validate.idMongodb(id);
        const elem = await Unit.findById( id );
        if (!elem) { return res.status(404).send(`La unidad con el id ingresado no existe`) }
        const remove = await Unit.findByIdAndRemove(elem._id);
        return res.json(remove);
    } catch (error) {
        next(error);
    }
});

module.exports = router