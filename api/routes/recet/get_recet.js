const express = require("express");
const router = express.Router();
const { Recipe } = require('../../models/models');

router.get('/recipe', async (req, res, next) => {
    try {
        const recipeBrought = await Recipe.find();
        const recipeNormalized = recipeBrought.map(e => ({
            id: e._id,
            name: e.name,
            difficulty: e.difficulty,
            rating: e.rating,
            preparation: e.preparation,
            img: e.img,
            ingredients: e.ingredients.map(i => ({
                ingredient: { id: i.ingredient._id, name: i.ingredient.name },
                amount: i.amount,
                unit: { id: i.unit._id, name: i.unit.name }
            })),
            category: e.category
        }));
        return res.json(recipeNormalized);
    } catch (error) {
        next(error);
    }
});

router.get('/recipe/search/:name', async (req, res, next) => {
    const { name } = req.params;
    try {
        const recipeFound = await Recipe.find({ name: { $regex: new RegExp(name, "i") } });
        if (recipeFound.length === 0) {
            return res.status(404).json(["No hay recetas con el nombre ingresado."]);
        }
        const recipeFoundNormalized = recipeFound.map(e => ({
            id: e._id,
            name: e.name,
            difficulty: e.difficulty,
            rating: e.rating,
            preparation: e.preparation,
            img: e.img,
            ingredients: e.ingredients.map(i => ({
                ingredient: { id: i.ingredient._id, name: i.ingredient.name },
                amount: i.amount,
                unit: { id: i.unit._id, name: i.unit.name }
            })),
            category: e.category
        }));
        return res.json(recipeFoundNormalized);
    } catch (error) {
        next(error);
    }
});

router.get('/recipe/details/:id', async (req, res, next) => {
    const { id } = req.params;
    try {
        const recipeMatch = await Recipe.findById(id);
        if (!recipeMatch) { return res.status(404).json({ error: "La receta con el id ingresado no existe" }) }
        const detailRecipe = {
            id: recipeMatch._id,
            name: recipeMatch.name,
            difficulty: recipeMatch.difficulty,
            rating: recipeMatch.rating,
            preparation: recipeMatch.preparation,
            img: recipeMatch.img,
            ingredients: recipeMatch.ingredients.map(i => ({
                ingredient: { id: i.ingredient._id, name: i.ingredient.name },
                amount: i.amount,
                unit: { id: i.unit._id, name: i.unit.name }
            })),
            category: recipeMatch.category
        }
        return res.json(detailRecipe);
    } catch (e) {
        next(e);
    }
});

router.get('/recipe/filterByIngredient/:name', async (req, res, next) => {
    const { name } = req.params;
    try {
        const filteredRecipes = await Recipe.find({
            ingredients: {
                ingredient: {
                    $elemMatch: {
                        name: {
                            $regex: new RegExp(name, "i")
                        }
                    }
                }
            }
        });
        if (!filteredRecipes.length > 0) {
            return res.status(404).json(["No se encontraron recetas con el ingrediente indicado"]);
        }
        return res.json(filteredRecipes);
    } catch (error) {
        next(error);
    }
});

module.exports = router;
