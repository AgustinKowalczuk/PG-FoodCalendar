const express = require("express");
const router = express.Router();
const models = require('../../models/models');
const { Ingredient } = models;

router.get('/ingredients', async (req, res, next) => {
    try {
        const ingredients = await Ingredient.find().lean();
        const mapeado = ingredients.map(e => ({
            id: e._id,
            name: e.name
        }));
        return res.json(mapeado);
    } catch (error) {
        next(error);
    }
});

module.exports = router;