const express = require("express");
const { postRecipeValidation } = require("../../controller/router_validate/recet_route_validate");
const { Recipe , Ingredient , Unit } = require("../../models/models");
const router = express.Router()

router.post('/recipe', async (req, res, next) => {
    const { name, difficulty, rating, preparation, img, category } = req.body;
    let {ingredients} = req.body;

    try {
        postRecipeValidation(name, difficulty, rating, preparation, img, category, ingredients);

        let ingredientNameArray = ingredients.map(e => e.ingredient);
        for(let i=0 ; i < ingredientNameArray.length ; i++){
            let ingredientNameArrayFiltered = ingredientNameArray.filter(e => e === ingredientNameArray[i]);
            if(ingredientNameArrayFiltered.length > 1) {
                throw new Error(`No se puede agregar receta porque el ingrediente ${ingredientNameArray[i]} se encuentra repetido ${ingredientNameArrayFiltered.length} veces`);
            }
        }

        for (let i = 0 ; i< ingredients.length; i++){
            ingredients[i].ingredient = await Ingredient.findOne({name:ingredients[i].ingredient});
            ingredients[i].unit = await Unit.findOne({name:ingredients[i].unit});

            if (!ingredients[i].unit || !ingredients[i].ingredient){
                throw new Error('Los ingredientes no cumplen con los campos esperados');
            }
        }

        const recipeCreated = await Recipe.create({ name, difficulty, rating, preparation, img, ingredients, category });//receta creada
        return res.json(recipeCreated);
    } catch (error) {
        next(error);
    }
})

module.exports = router