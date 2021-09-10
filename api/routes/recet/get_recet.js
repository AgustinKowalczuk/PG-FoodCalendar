const express = require("express");
const { normalizeRecipes } = require("../../controller/normalize");
const validate = require("../../controller/validate");
const router = express.Router();
const { Recipe } = require('../../models/models');



router.get('/recipe', async (req, res, next) => {
    try {
        const recipeBrought = await Recipe.find()
        .populate({path:'category', select:['name','_id']})
        .populate({path:'ingredients', populate:{path: 'ingredient', select:['name','_id']}})
        .populate({path:'ingredients', populate:{path: 'unit', select:['name','_id']}})
        .lean();       

        return res.json(normalizeRecipes(recipeBrought));
    } catch (error) {
        next(error);
    }
});

router.get('/recipe/search/:name', async (req,res,next) => {
    const {name} = req.params;

    try{
        const recipeFound = await Recipe.find({name: {$regex: new RegExp(name, "i") }})
        .populate({path:'category', select:['name','_id']})
        .populate({path:'ingredients', populate:{path: 'ingredient', select:['name','_id']}})
        .populate({path:'ingredients', populate:{path: 'unit', select:['name','_id']}})
        .lean();   

        if(recipeFound.length === 0){
            return res.status(404).json(["No hay recetas con el nombre ingresado."]);
        }

        return res.json(normalizeRecipes(recipeFound));
    } catch (error) {
        next(error);
    }
});

router.get('/recipe/details/:id', async (req, res, next) => {
    const { id } = req.params;

    try {
        validate.idMongodb(id);

        const recipeMatch = await Recipe.findById(id)
        .populate({path:'category', select:['name','_id']})
        .populate({path:'ingredients', populate:{path: 'ingredient', select:['name','_id']}})
        .populate({path:'ingredients', populate:{path: 'unit', select:['name','_id']}})
        .lean();

        if (!recipeMatch) { return res.status(404).json({ error: "La receta con el id ingresado no existe" }) }
        
        return res.json(normalizeRecipes(recipeMatch));
    } catch (e) {
        next(e);
    }
});

router.get('/recipe/filterByIngredient/:name', async (req, res, next) => {
    const { name } = req.params;

    try {
        const allRecipes = await Recipe.find()
        .populate({path:'category', select:['name','_id']})
        .populate({path:'ingredients', populate:{path: 'ingredient', select:['name','_id']}})
        .populate({path:'ingredients', populate:{path: 'unit', select:['name','_id']}})
        .lean();

        if (allRecipes.length === 0) {
            return res.status(404).json(["La base de datos está vacía"]);
        }

        const filteredRecipes = allRecipes.filter(e => e.ingredients.some(ele => ele.ingredient.name.toUpperCase() === name.toUpperCase()));
        if (filteredRecipes.length === 0) {
            return res.status(404).json(["No se encontraron recetas con el ingrediente indicado"]);
        }

        return res.json(normalizeRecipes(filteredRecipes));
    } catch (error) {
        next(error);
    }
});

router.get('/recipe/filterByCategory/:name', async (req, res, next) => {
    const { name } = req.params;

    try {
        const allRecipes = await Recipe.find()
        .populate({path:'category', select:['name','_id']})
        .populate({path:'ingredients', populate:{path: 'ingredient', select:['name','_id']}})
        .populate({path:'ingredients', populate:{path: 'unit', select:['name','_id']}})
        .lean();

        if (allRecipes.length === 0) {
            return res.status(404).json(["La base de datos está vacía"]);
        }

        const filteredRecipes = allRecipes.filter(e => e.category.some(ele => ele.name.toUpperCase() === name.toUpperCase()));
        if (filteredRecipes.length === 0) {
            return res.status(404).json(["No se encontraron recetas con la categoría indicada"]);
        }
        
        return res.json(normalizeRecipes(filteredRecipes));
    } catch (error) {
        next(error);
    }
});

router.get('/recipe/filterByDifficulty/:name', async (req, res, next) => {
    const { name } = req.params;

    try {
        const allRecipes = await Recipe.find()
        .populate({path:'category', select:['name','_id']})
        .populate({path:'ingredients', populate:{path: 'ingredient', select:['name','_id']}})
        .populate({path:'ingredients', populate:{path: 'unit', select:['name','_id']}})
        .lean();

        if (allRecipes.length === 0) {
            return res.status(404).json(["La base de datos está vacía"]);
        }

        const filteredRecipes = allRecipes.filter(e => e.difficulty === name);
        if (filteredRecipes.length === 0) {
            return res.status(404).json(["No se encontraron recetas con la dificultad indicada"]);
        }
        
        return res.json(normalizeRecipes(filteredRecipes));
    } catch (error) {
        next(error);
    }
});

module.exports = router;
