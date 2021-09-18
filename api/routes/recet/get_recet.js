const express = require("express");
const { normalizeRecipes } = require("../../controller/normalize");
const validate = require("../../controller/validate");
const router = express.Router();
const { Recipe, Like } = require('../../models/models');
const { auth, authAdmin } = require('../../controller/auth');

//Todas las recetas solo para usuarios pagos
router.get('/recipe/user', auth, async (req, res, next) => {
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

//Recetas para usuarios sin registrar
router.get('/recipe/guest', async (req, res, next) => {
    try {
        const recipeBrought = await Recipe.find({premium: false})
        .populate({path:'category', select:['name','_id']})
        .populate({path:'ingredients', populate:{path: 'ingredient', select:['name','_id']}})
        .populate({path:'ingredients', populate:{path: 'unit', select:['name','_id']}})
        .lean();       

        return res.json(normalizeRecipes(recipeBrought));
    } catch (error) {
        next(error);
    }
});

//Todas las recetas que contengan en su nombre "name"
router.get('/recipe/search/user/:name', auth, async (req,res,next) => {
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

//Ruta creada para todo tipo de usuario
router.get('/recipe/search/guest/:name', async (req,res,next) => {
    const {name} = req.params;

    try{
        const recipeFound = await Recipe.find({name: {$regex: new RegExp(name, "i") }, premium: false})
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

//Detalles de la receta por "id"
router.get('/recipe/details/user/:id', auth, async (req, res, next) => {
    const { id } = req.params;
    const {userId} = req;

    try {
        validate.idMongodb(id);

        const recipeMatch = await Recipe.findById(id)
        .populate({path:'category', select:['name','_id']})
        .populate({path:'ingredients', populate:{path: 'ingredient', select:['name','_id']}})
        .populate({path:'ingredients', populate:{path: 'unit', select:['name','_id']}})
        .lean();
        if (!recipeMatch) { return res.status(404).json({ error: "La receta con el id ingresado no existe" })};

        const newObject = normalizeRecipes(recipeMatch);
        const likes = await Like.find({recipe: id, like:true});
        newObject.likes = likes.length;

        const likeFound = await Like.findOne({recipe: id, owner: userId});
        !!likeFound ? newObject.like = likeFound.like : newObject.like = false;
        
        return res.json(newObject);
    } catch (e) {
        next(e);
    }
});

router.get('/recipe/details/guest/:id', async (req, res, next) => {
    const { id } = req.params;

    try {
        validate.idMongodb(id);

        const recipeMatch = await Recipe.findById(id)
        .populate({path:'category', select:['name','_id']})
        .populate({path:'ingredients', populate:{path: 'ingredient', select:['name','_id']}})
        .populate({path:'ingredients', populate:{path: 'unit', select:['name','_id']}})
        .lean();

        if (!recipeMatch) { return res.status(404).json({ error: "La receta con el id ingresado no existe" })};

        if (recipeMatch.premium !== false) throw new Error("No deberías estar viendo esta receta.")
        
        return res.json(normalizeRecipes(recipeMatch));
    } catch (e) {
        next(e);
    }
});

//Todas las recetas que contengan los ingredientes que contienen "name" (usuario)
router.get('/recipe/filterByIngredient/user/:name', auth, async (req, res, next) => {
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

//Todas las recetas que contengan los ingredientes que contienen "name" (visitante)
router.get('/recipe/filterByIngredient/guest/:name', async (req, res, next) => {
    const { name } = req.params;

    try {
        const allRecipes = await Recipe.find({premium: false})
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


//Todas las recetas que contengan la categoria que contienen "name" (usuario)
router.get('/recipe/filterByCategory/user/:name', auth, async (req, res, next) => {
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

//Todas las recetas que contengan la categoria que contienen "name" (visitante)
router.get('/recipe/filterByCategory/guest/:name', async (req, res, next) => {
    const { name } = req.params;

    try {
        const allRecipes = await Recipe.find({premium: false})
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


//Todas las recetas que sean de dificultad "name" ( usuario )
router.get('/recipe/filterByDifficulty/user/:name', auth, async (req, res, next) => {
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

//Todas las recetas que sean de dificultad "name" ( visitante )
router.get('/recipe/filterByDifficulty/guest/:name', async (req, res, next) => {
    const { name } = req.params;

    try {
        const allRecipes = await Recipe.find({premium: false})
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
