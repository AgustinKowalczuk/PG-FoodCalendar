const express = require("express");
const { normalizeRecipes } = require("../../controller/normalize");
const validate = require("../../controller/validate");
const { Recipe, Review } = require("../../models/models");
const router = express.Router()
const { auth, authAdmin } = require('../../controller/auth');

router.delete('/recipe/:id', auth, authAdmin, async (req, res, next) => {
    const { id } = req.params;

    try {
        validate.idMongodb(id);

        const elem = await Recipe.findById(id);
        if (!elem) return res.status(404).send("La receta con el id ingresado no existe");

        if (elem.disabled) return res.status(404).send("La receta con el id ingresado existe en un calendario");

        await Review.deleteMany({recipe:id});

        const remove = await Recipe.findByIdAndRemove(elem._id);
        return res.json(normalizeRecipes(remove));
    } catch (error) {
        next(error);
    }
})

module.exports = router;