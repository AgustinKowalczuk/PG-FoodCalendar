const express = require("express");
const router = express.Router();
const { Review, Recipe } = require("../../models/models");
const { auth } = require('../../controller/auth');
const { postReviewValidation } = require("../../controller/router_validate/review_route_validate");
const { normalizeReview } = require("../../controller/normalize");

//Review de un usuario
router.post('/review/:id', auth, async (req, res, next) => {
    const { like, comment } = req.body;
    const { id: recipeId } = req.params;
    const { userId } = req;

    try {
        postReviewValidation( like, comment, recipeId );

        const existentRecipe = await Recipe.findById(recipeId);       
        if(!existentRecipe) return res.status(404).send("La receta con el id proporcionado no existe.");

        await Review.create({ recipe: recipeId, owner: userId, like, comment });
        const posted = await Review.find({owner: userId});
        return res.json(normalizeReview(posted));
    } catch (error) {
        next(error);
    }
});

module.exports = router;