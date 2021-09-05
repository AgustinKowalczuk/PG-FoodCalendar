const express = require("express");
const { ingredientValidation } = require("../../controller/router_validate/ingredient_route_validate");
const router = express.Router();
const { Ingredient } = require("../../models/models");

router.post('/ingredients', async (req, res, next) => {
    const { name } = req.body;

    try {
        ingredientValidation(name);

        const existentName = await Ingredient.findOne({name});       
        if(existentName && !!Object.keys(existentName).length) return res.status(404).send("El ingrediente ya existe en la base de datos.");
        
        const posted = await Ingredient.create({ name });
        return res.json(posted);
    } catch (error) {
        next(error);
    }
});

module.exports = router;