const express = require("express");
const { normalizeUnits } = require("../../controller/normalize");
const { unitValidation } = require("../../controller/router_validate/unit_route_validate");
const validate = require("../../controller/validate");
const { Unit } = require("../../models/models");
const router = express.Router();
const { auth, authAdmin } = require('../../controller/auth');

router.put('/unit/:id', auth, authAdmin, async (req, res, next) => {
    const { id } = req.params;
    const { name } = req.body;

    try {
        validate.idMongodb(id);
        unitValidation(name);

        const elem = await Unit.findById(id);
        if (!elem) return res.status(404).send("La unidad con el id ingresado no existe");

        const existentName = await Unit.findOne({ name });
        if (existentName && !!Object.keys(existentName).length) return res.status(404).send("La unidad ya existe en la base de datos.");

        await Unit.findByIdAndUpdate(elem._id, { name });
        const update = await Unit.findById(id);
        return res.json(normalizeUnits(update));
    } catch (error) {
        next(error);
    }
});

module.exports = router;