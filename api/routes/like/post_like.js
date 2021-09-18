const express = require("express");
const router = express.Router();
const { Like, Recipe } = require("../../models/models");
const { auth } = require('../../controller/auth');
const { postLikeValidation } = require('../../controller/router_validate/like_route_validate.js');
const { normalizeLike, normalizeRecipes } = require("../../controller/normalize");

//Like de un usuario
router.post('/like/:id', auth, async (req, res, next) => {

    const { id: recipeId } = req.params;
    const { userId } = req;

    try {
        postLikeValidation(recipeId);

        const existentRecipe = await Recipe.findById(recipeId);
        if (!existentRecipe) return res.status(404).send("La receta con el id proporcionado no existe.");

        const existentLike = await Like.findOne({ owner: userId, recipe: recipeId });
        if (!!existentLike) {
            await Like.findByIdAndUpdate(existentLike._id, { like: !existentLike.like });

            const newObject = {};
            const likes = await Like.find({ recipe: recipeId, like: true });
            newObject.likes = likes.length;

            const likeFound = await Like.findOne({ recipe: recipeId, owner: userId });
            !!likeFound ? newObject.like = likeFound.like : newObject.like = false;

            return res.json(newObject);
        }
        await Like.create({ owner: userId, recipe: recipeId, like: true });

        const newObject = {};
        const likes = await Like.find({ recipe: recipeId, like: true });
        newObject.likes = likes.length;

        const likeFound = await Like.findOne({ recipe: recipeId, owner: userId });
        !!likeFound ? newObject.like = likeFound.like : newObject.like = false;

        return res.json(newObject);
    } catch (error) {
        next(error);
    }
});

module.exports = router;