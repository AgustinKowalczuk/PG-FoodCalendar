const express = require("express");
const router = express.Router();
const { Recipe } = require('../../models/models');

router.get('/recipe', async (req,res,next)=>{
    try{
        const recipeBrought = await Recipe.find();
        const recipeNormalized = recipeBrought.map(e => ({
            id: e._id,
            name: e.name,
            difficulty: e.difficulty,
            rating: e.rating,
            preparation: e.preparation,
            img: e.img,
            ingredients: e.ingredients.map(i => ({
                id: i._id,
                name: i.name,
                unit: i.unit
            }))
        }));
        return res.json(recipeNormalized);
    }catch(e){
        next(e);
    }
})

router.get('/recipe/details/:id', async (req,res,next)=>{
    const {id} = req.params;
    try{
        const recipeMatch = await Recipe.findById(id);
        //console.log(recipeMatch)
        if (!recipeMatch) { return res.status(404).json({error:`la receta con el id ingresado no existe`}) }
        const detailRecipe = {
            id: recipeMatch._id,
            name: recipeMatch.name,
            difficulty: recipeMatch.difficulty,
            rating: recipeMatch.rating,
            preparation: recipeMatch.preparation,
            img: recipeMatch.img,
            ingredients: recipeMatch.ingredients.map(i => ({
                id: i._id,
                name: i.name,
                unit: i.unit
            })),
            category: recipeMatch.category
        }
        return res.json(detailRecipe);
    }catch(e){
        next(e);
    }
})

module.exports = router