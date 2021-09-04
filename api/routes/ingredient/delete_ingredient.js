const express = require("express");
const router = express.Router();
const models = require('../../models/models');
const { Ingredient } = models;

router.delete('/ingredients/:id', async (req, res, next) => {
    const { id } = req.params;
    try {
        const elem = await Ingredient.findById( id );
        if (!elem) { return res.status(404).send(`El ingrediente con el id ingresado no existe`) }
        const remove = await Ingredient.findByIdAndRemove(elem._id);
        return res.json(remove);
    } catch (error) {
        next(error);
    }
});

module.exports = router