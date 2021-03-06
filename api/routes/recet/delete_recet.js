const express = require("express");
const { normalizeRecipes } = require("../../controller/normalize");
const validate = require("../../controller/validate");
const { Recipe } = require("../../models/models");
const router = express.Router()

router.delete('/recipe/:id', async (req, res, next)=>{
    const { id } = req.params;

    try {
        validate.idMongodb(id);

        const elem = await Recipe.findById( id );
        if (!elem) return res.status(404).send("La receta con el id ingresado no existe");
        
        const remove = await Recipe.findByIdAndRemove(elem._id);
        return res.json(normalizeRecipes(remove));
    } catch (error) {
        next(error);
    }
})

module.exports = router;