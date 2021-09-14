const express = require("express");
const { normalizeUnits } = require("../../controller/normalize");
const { unitValidation } = require("../../controller/router_validate/unit_route_validate");
const { Unit } = require("../../models/models");
const router = express.Router();
const { auth, authAdmin } = require('../../controller/auth');

router.post('/unit', auth, authAdmin, async (req, res, next) => {
    const { name } = req.body;

    try {
        unitValidation(name);

        const existentName = await Unit.findOne({ name });
        if (existentName) return res.status(404).send("La unidad ya existe en la base de datos.");

        const posted = await Unit.create({ name });
        return res.json(normalizeUnits(posted));
    } catch (error) {
        next(error);
    }
});

module.exports = router;