const express = require("express");
const { ingredientValidation } = require("../../controller/router_validate/ingredient_route_validate");
const router = express.Router();
const models = require('../../models/models');
const { Ingredient } = models; 

router.post('/ingredients', async (req, res, next) => {
    const { name } = req.body;
    try {
        ingredientValidation(name);
        const posted = await Ingredient.create({ name });
        return res.json(posted);
    } catch (error) {
        next(error);
    }
});



module.exports = router;