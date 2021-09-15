const express = require("express");
const { auth, authAdmin } = require("../../controller/auth");
const { normalizeReview } = require("../../controller/normalize");
const { idMongodb } = require("../../controller/validate");
const { Review } = require("../../models/models");
const router = express.Router();

//Obtenemos todos los comentarios de una receta (id  de recipe).
router.get('/reviews/recipe/:id', async (req, res, next) => {
    const { id } = req.params;

    try {
        idMongodb(id);

        const reviews = await Review.find({recipe: id})
        .populate({path:'owner', select:['name','surname']})
        .lean();
        return res.json(normalizeReview(reviews));
    } catch (error) {
        next(error);
    }
});

//Obtenemos todos los comentarios de un usuario (id de usuario).
router.get('/reviews/user/:id', auth, async (req, res, next) => {
    const { id } = req.params;

    try {
        idMongodb(id);

        const reviews = await Review.find({owner: id})
        .populate({path:'recipe', select:'name'})
        .populate({path:'owner', select:['name','surname']})
        .lean();
        return res.json(normalizeReview(reviews));
    } catch (error) {
        next(error);
    }
});

module.exports = router;