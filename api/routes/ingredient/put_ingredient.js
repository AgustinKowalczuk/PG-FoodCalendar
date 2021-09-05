const express = require("express");
const router = express.Router();
const models = require('../../models/models');
const { Ingredient } = models;
const validate = require("../../controller/validate");
const { ingredientValidation } = require("../../controller/router_validate/ingredient_route_validate");

router.put('/ingredients/:id', async (req, res, next) => {
    const { id } = req.params;
    const { name } = req.body;
    try {
        validate.idMongodb(id);
        ingredientValidation(name);
        const elem = await Ingredient.findById(id);
        if (!elem) { return res.status(404).send(`el ingrediente con el nombre ingresado no existe`) }
        await Ingredient.findByIdAndUpdate(elem._id, { name });
        const update = await Ingredient.findById(id);
        return res.json(update);
    } catch (error) {
        next(error);
    }
});

module.exports = router;