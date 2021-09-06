const express = require("express");
const { normalizeRecipes } = require("../../controller/normalize");
const validate = require("../../controller/validate");
const router = express.Router();
const { Recipe } = require('../../models/models');



router.get('/recipe', async (req, res, next) => {
    try {
        const recipeBrought = await Recipe.find();
        const recipeNormalized = normalizeRecipes(recipeBrought);
        return res.json(recipeNormalized);
    } catch (error) {
        next(error);
    }
});

router.get('/recipe/search/:name', async (req,res,next) => {
    const {name} = req.params;
    try{
        const recipeFound = await Recipe.find({name: {$regex: new RegExp(name, "i") }});
        if(recipeFound.length === 0){
            return res.status(404).json(["No hay recetas con el nombre ingresado."]);
        }
        const recipeFoundNormalized = normalizeRecipes(recipeFound);
        return res.json(recipeFoundNormalized);
    } catch (error) {
        next(error);
    }
});

router.get('/recipe/details/:id', async (req, res, next) => {
    const { id } = req.params;
    try {
        validate.idMongodb(id);
        const recipeMatch = await Recipe.findById(id);
        if (!recipeMatch) { return res.status(404).json({ error: "La receta con el id ingresado no existe" }) }
        const detailRecipe = normalizeRecipes(recipeMatch);
        return res.json(detailRecipe);
    } catch (e) {
        next(e);
    }
});

router.get('/recipe/filterByIngredient/:name', async (req, res, next) => {
    const { name } = req.params;
    try {
        const allRecipes = await Recipe.find();
        if (allRecipes.length === 0) {
            return res.status(404).json(["La base de datos está vacía"]);
        }
        const filteredRecipes = allRecipes.filter(e => e.ingredients.some(ele => ele.ingredient.name.toUpperCase() === name.toUpperCase()));
        if (!filteredRecipes.length > 0) {
            return res.status(404).json(["No se encontraron recetas con el ingrediente indicado"]);
        }
        const recipeFilteredNormalized = normalizeRecipes(filteredRecipes);
        return res.json(recipeFilteredNormalized);
    } catch (error) {
        next(error);
    }
});

module.exports = router;
