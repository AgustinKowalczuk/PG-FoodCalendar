const express = require("express");
const { putRecipeValidation } = require("../../controller/router_validate/recet_route_validate");
const { Recipe, Ingredient, Unit } = require("../../models/models");
const router = express.Router()

router.put('/recipe/:id', async (req, res, next)=>{
    const { id } = req.params; 
    const { name, difficulty, rating, preparation, img, category } = req.body;
    let { ingredients } = req.body;
    try {
        putRecipeValidation(id, name, difficulty, rating, preparation, img, category, ingredients);
        const elem = await Recipe.findById(id);
        if (!elem) { return res.status(404).send(`La receta con el nombre id ingresado no existe`) }
        if(!ingredients){
            await Recipe.findByIdAndUpdate(elem._id, { name, difficulty, rating, preparation, img, category });
            const update = await Recipe.findById(id);
            return res.json(update);
        }
        for (let i = 0 ; i< ingredients.length; i++){
            ingredients[i].ingredient = await Ingredient.findOne({name:ingredients[i].ingredient});
            ingredients[i].unit = await Unit.findOne({name:ingredients[i].unit});

            if (!ingredients[i].unit || !ingredients[i].ingredient){
                throw new Error('Los ingredientes no cumplen con los campos esperados');
            }
        }
        await Recipe.findByIdAndUpdate(elem._id, { name, difficulty, rating, preparation, img, category, ingredients });
        const update = await Recipe.findById(id);
        return res.json(update);
        
    } catch (error) {
        next(error);
    }
});

module.exports = router;