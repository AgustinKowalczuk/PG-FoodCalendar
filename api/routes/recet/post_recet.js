const express = require("express");
const { Recipe } = require("../../models/models");
const router = express.Router()

router.post('/recipe', async (req, res, next) => {
    const { name, difficulty, rating, preparation, img, ingredients } = req.body;
    try {
        const recipeCreated = await Recipe.create({ name, difficulty, rating, preparation, img, ingredients });//receta creada
        return res.json(recipeCreated);
    } catch (error) {
        next(error);
    }
})

module.exports = router