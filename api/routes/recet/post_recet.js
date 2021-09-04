const express = require("express");
const { Recipe , Ingredient , Unit } = require("../../models/models");
const ingredient = require("../../models/schemas/ingredient");
const router = express.Router()

router.post('/recipe', async (req, res, next) => {
    const { name, difficulty, rating, preparation, img, category } = req.body;
    let {ingredients} = req.body;
    try {

        for (let i = 0 ; i< ingredients.length; i++){
            ingredients[i].ingredient = await Ingredient.findOne({name:ingredients[i].ingredient});
            ingredients[i].unit = await Unit.findOne({name:ingredients[i].unit});

            if (!ingredients[i].unit || !ingredients[i].ingredient){
                throw new Error('Los ingredientes no cumplen con los campos esperados');
            }
        }

        const recipeCreated = await Recipe.create({ name, difficulty, rating, preparation, img, ingredients, category });//receta creada
        return res.json(recipeCreated);
    } catch (error) {
        next(error);
    }
})

module.exports = router