const express = require("express");
const router = express.Router();
const { Like, Recipe } = require("../../models/models");
const { auth } = require('../../controller/auth');
const { postLikeValidation } = require('../../controller/router_validate/like_route_validate.js');
const { normalizeLike } = require("../../controller/normalize");

//Like de un usuario
router.post('/like/:id', auth, async (req, res, next) => {
    //const { like } = req.body;
    const { id: recipeId } = req.params;
    const { userId } = req;

    try {
        postLikeValidation( recipeId );

        const existentRecipe = await Recipe.findById(recipeId);       
        if (!existentRecipe) return res.status(404).send("La receta con el id proporcionado no existe.");

        const existentLike = await Like.findOne({owner: userId, recipe: recipeId });       
        if (!! existentLike) {
            await Like.findByIdAndUpdate(existentLike._id, { like: !existentLike.like });
            const posted = await Like.findById(existentLike._id)
            return res.status(200).json(normalizeLike(posted));
        }
        const newLike = await Like.create({  owner: userId, recipe: recipeId, like: true });
        return res.json(normalizeLike(newLike));
    } catch (error) {
        next(error);
    }
});

module.exports = router;