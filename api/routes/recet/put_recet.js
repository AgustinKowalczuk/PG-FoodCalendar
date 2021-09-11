const express = require("express");
const { normalizeRecipes } = require("../../controller/normalize");
const { putRecipeValidation } = require("../../controller/router_validate/recet_route_validate");
const { Recipe, Ingredient, Unit, Category } = require("../../models/models");
const router = express.Router()
const { auth, authAdmin } = require('../../controller/auth');

router.put('/recipe/:id', auth, authAdmin, async (req, res, next) => {
    const { id } = req.params;
    const { name, difficulty, rating, preparation, img, premium, availability } = req.body;
    let { category, ingredients } = req.body;

    try {
        putRecipeValidation(id, name, difficulty, rating, preparation, img, category, premium, availability, ingredients);

        const elem = await Recipe.findById(id);
        if (!elem) return res.status(404).send("La receta con el id ingresado no existe");

        if (!ingredients && !category) {
            await Recipe.findByIdAndUpdate(elem._id, { name, difficulty, rating, preparation, img });
            const update = await Recipe.findById(id);
            return res.json(normalizeRecipes(update));
        }

        if (!ingredients) {
            await Recipe.findByIdAndUpdate(elem._id, { name, difficulty, rating, preparation, img, category });
            const update = await Recipe.findById(id);
            return res.json(normalizeRecipes(update));
        }

        if (!category) {
            await Recipe.findByIdAndUpdate(elem._id, { name, difficulty, rating, preparation, img, ingredients });
            const update = await Recipe.findById(id);
            return res.json(normalizeRecipes(update));
        }

        let ingredientNameArray = ingredients.map(e => e.ingredient);
        for (let i = 0; i < ingredientNameArray.length; i++) {
            let ingredientNameArrayFiltered = ingredientNameArray.filter(e => e === ingredientNameArray[i]);
            if (ingredientNameArrayFiltered.length > 1) {
                throw new Error(`No se puede actualizar la receta porque el ingrediente ${ingredientNameArray[i]} se encuentra repetido ${ingredientNameArrayFiltered.length} veces`);
            }
        }
        for (let i = 0; i < ingredients.length; i++) {
            ingredients[i].ingredient = await Ingredient.findOne({ name: ingredients[i].ingredient });
            ingredients[i].unit = await Unit.findOne({ name: ingredients[i].unit });

            if (!ingredients[i].unit || !ingredients[i].ingredient) {
                throw new Error(`El ingrediente ${ingredients[i].ingredient} o la unidad ${ingredients[i].unit} no se encuentran en la DB.`);
            }

            ingredients[i].ingredient = ingredients[i].ingredient._id;
            ingredients[i].unit = ingredients[i].unit._id;
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

            category[i] = category[i]._id;
        }

        await Recipe.findByIdAndUpdate(elem._id, { name, difficulty, rating, preparation, img, category, premium, availability, ingredients });
        const update = await Recipe.findById(id);
        return res.json(normalizeRecipes(update));
    } catch (error) {
        next(error);
    }
});

module.exports = router;