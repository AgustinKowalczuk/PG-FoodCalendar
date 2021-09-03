const express = require("express");
const router = express.Router();
const models = require('../../models/models');
const { Ingredient } = models;

router.put('/ingredients/:name', async (req, res, next) => {
    const { name } = req.params;
    const body = req.body;
    try {
        const elem = await Ingredient.findOne({ name });
        if (!elem) { return res.status(404).send(`el ingrediente con el nombre ingresado no existe`) }
        const update = await Ingredient.findByIdAndUpdate(elem._id, body);
        return res.json(update);
    } catch (error) {
        next(error)
    }
})

module.exports = router