const express = require("express");
const { normalizeIngredients } = require("../../controller/normalize");
const { ingredientValidation } = require("../../controller/router_validate/ingredient_route_validate");
const router = express.Router();
const { Ingredient } = require("../../models/models");
const { auth } = require('../../controller/auth');

router.post('/ingredients', auth, async (req, res, next) => {
    const { name } = req.body;

    try {
        ingredientValidation(name);

        const existentName = await Ingredient.findOne({name});       
        if(existentName && !!Object.keys(existentName).length) return res.status(404).send("El ingrediente ya existe en la base de datos.");
        
        await Ingredient.create({ name });
        const posted = await Ingredient.findOne({name});
        return res.json(normalizeIngredients(posted));
    } catch (error) {
        next(error);
    }
});

module.exports = router;