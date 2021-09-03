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
});

router.get('/recipe/filterByIngredient/:name', async (req, res, next) => {
    const { name } = req.params;
    try {
        const filteredRecipes = await Recipe.find({
            ingredients: {
                $elemMatch: {
                    name: {
                        $regex: new RegExp(name, "i")
                    }
                }
            }
        });
        if (!filteredRecipes.length > 0) { 
            return res.status(404).json([`No se encontraron recetas con el ingrediente indicado`]);
         }
         return res.json(filteredRecipes);
    } catch (error) {
        next(error);
    }
});

module.exports = router