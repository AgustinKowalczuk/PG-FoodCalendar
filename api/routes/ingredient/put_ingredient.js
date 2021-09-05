const express = require("express");
const router = express.Router();
const { Ingredient } = require("../../models/models");
const validate = require("../../controller/validate");
const { ingredientValidation } = require("../../controller/router_validate/ingredient_route_validate");
const { normalizeIngredients } = require("../../controller/normalize");

router.put('/ingredients/:id', async (req, res, next) => {
    const { id } = req.params;
    const { name } = req.body;

    try {
        validate.idMongodb(id);
        ingredientValidation(name);

        const elem = await Ingredient.findById(id);
        if (!elem) return res.status(404).send("El ingrediente con el id ingresado no existe");

        const existentName = await Ingredient.findOne({name});       
        if(existentName && !!Object.keys(existentName).length) return res.status(404).send("El ingrediente ya existe en la base de datos.");
        
        await Ingredient.findByIdAndUpdate(elem._id, { name });

        const update = await Ingredient.findById(id);
        return res.json(normalizeIngredients(update));
    } catch (error) {
        next(error);
    }
});

module.exports = router;