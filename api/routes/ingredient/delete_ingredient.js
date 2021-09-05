const express = require("express");
const validate = require("../../controller/validate");
const router = express.Router();
const models = require('../../models/models');
const { Ingredient } = models;

router.delete('/ingredients/:id', async (req, res, next) => {
    const { id } = req.params;

    try {
        validate.idMongodb(id);

        const elem = await Ingredient.findById( id );
        if (!elem) return res.status(404).send("El ingrediente con el id ingresado no existe");
        
        const remove = await Ingredient.findByIdAndRemove(elem._id);
        return res.json(remove);
    } catch (error) {
        next(error);
    }
});

module.exports = router