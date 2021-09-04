const express = require("express");
const { Recipe } = require("../../models/models");
const router = express.Router()

router.put('/recipe/:id', async (req, res, next)=>{
    const { id } = req.params;
    const body = req.body;
    try {
        const elem = await Recipe.findById(id);
        if (!elem) { return res.status(404).send(`La receta con el nombre id ingresado no existe`) }
        await Recipe.findByIdAndUpdate(elem._id, body);
        const update = await Recipe.findById(id);
        return res.json(update);
    } catch (error) {
        next(error);
    }
});

module.exports = router;