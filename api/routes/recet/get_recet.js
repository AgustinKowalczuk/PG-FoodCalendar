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

module.exports = router