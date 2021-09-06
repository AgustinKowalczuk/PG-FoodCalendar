const express = require("express");
const { normalizeIngredients } = require("../../controller/normalize");
const router = express.Router();
const models = require('../../models/models');
const { Ingredient } = models;

router.get('/ingredients', async (req, res, next) => {
    try {
        const ingredients = await Ingredient.find().lean();
        return res.json(normalizeIngredients(ingredients));
    } catch (error) {
        next(error);
    }
});

module.exports = router;