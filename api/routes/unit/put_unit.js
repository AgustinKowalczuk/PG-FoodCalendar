const express = require("express");
const { unitValidation } = require("../../controller/router_validate/unit_route_validate");
const validate = require("../../controller/validate");
const { Unit } = require("../../models/models");
const router = express.Router();

router.put('/unit/:id', async (req, res, next) => {
    const { id } = req.params;
    const { name } = req.body;
    try {
        validate.idMongodb(id);
        unitValidation(name);
        const elem = await Unit.findById(id);
        if (!elem) { return res.status(404).send(`La unidad con el nombre ingresado no existe`) }
        await Unit.findByIdAndUpdate(elem._id, { name });
        const update = await Unit.findById(id);
        return res.json(update);
    } catch (error) {
        next(error);
    }
});

module.exports = router;