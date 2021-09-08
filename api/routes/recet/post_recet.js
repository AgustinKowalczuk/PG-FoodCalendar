const express = require("express");
const { normalizeRecipes } = require("../../controller/normalize");
const { postRecipeValidation } = require("../../controller/router_validate/recet_route_validate");
const { Recipe, Ingredient, Unit, Category } = require("../../models/models");
const router = express.Router()

router.post('/recipe', async (req, res, next) => {
    const { name, difficulty, rating, preparation, img, category, premium, availability } = req.body;
    let { ingredients } = req.body;

    try {
        postRecipeValidation(name, difficulty, rating, preparation, img, category, premium, availability, ingredients);

        let ingredientNameArray = ingredients.map(e => e.ingredient);
        for (let i = 0; i < ingredientNameArray.length; i++) {
            let ingredientNameArrayFiltered = ingredientNameArray.filter(e => e === ingredientNameArray[i]);
            if (ingredientNameArrayFiltered.length > 1) {
                throw new Error(`No se puede agregar receta porque el ingrediente ${ingredientNameArray[i]} se encuentra repetido ${ingredientNameArrayFiltered.length} veces`);
            }
        }
        for (let i = 0; i < ingredients.length; i++) {
            ingredients[i].ingredient = await Ingredient.findOne({ name: ingredients[i].ingredient });
            ingredients[i].unit = await Unit.findOne({ name: ingredients[i].unit });

            if (!ingredients[i].unit || !ingredients[i].ingredient) {
                throw new Error(`El ingrediente ${ingredients[i].ingredient} o la unidad ${ingredients[i].unit} no se encuentran en la DB.`);
            }
        }

        let categoryNameArray = category;
        for (let i = 0; i < categoryNameArray.length; i++) {
            let categoryNameArrayFiltered = categoryNameArray.filter(e => e === categoryNameArray[i]);
            if (categoryNameArrayFiltered.length > 1) {
                throw new Error(`No se puede agregar receta porque la categoría ${categoryNameArray[i]} se encuentra repetido ${categoryNameArrayFiltered.length} veces`);
            }
        }
        for (let i = 0; i < category.length; i++) {
            category[i] = await Category.findOne({ name: category[i] });

            if (!category[i]) {
                throw new Error(`La categoría ${category[i]} no se encuentra en la DB.`);
            }
        }

        const recipeCreated = await Recipe.create({ name, difficulty, rating, preparation, img, ingredients, category, premium, availability });
        return res.json(normalizeRecipes(recipeCreated));
    } catch (error) {
        next(error);
    }
})

module.exports = router