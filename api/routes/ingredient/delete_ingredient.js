const express = require("express");
const router = express.Router();
const models = require('../../models/models');
const { Ingredient } = models;

router.delete('/ingredients/:name', async (req, res, next) => {
    const { name } = req.params;
    try {
        const elem = await Ingredient.findOne({ name });
        if (!elem) { return res.status(404).send(`el ingrediente con el nombre ingresado no existe`) }
        const remove = await Ingredient.findByIdAndRemove(elem._id);
        return res.json(remove);
    } catch (error) {
        next(error)
    }
})

module.exports = router