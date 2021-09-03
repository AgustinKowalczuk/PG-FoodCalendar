const express = require("express");
const { Recipe } = require("../../models/models");
const router = express.Router()

router.delete('/recipe/:id', async (req, res, next)=>{
    const { id } = req.params;
    try {
        const elem = await Recipe.findById( id );
        if (!elem) { return res.status(404).send(`La receta con el id ingresado no existe`) }
        const remove = await Recipe.findByIdAndRemove(elem._id);
        return res.json(remove);
    } catch (error) {
        next(error);
    }
})

module.exports = router;