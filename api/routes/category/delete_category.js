const express = require("express");
const { normalizeCategories } = require("../../controller/normalize");
const validate = require("../../controller/validate");
const router = express.Router();
const models = require('../../models/models');
const { Category } = models;
const { auth, authAdmin } = require('../../controller/auth');

router.delete('/category/:id', auth, authAdmin, async (req, res, next) => {
    const { id } = req.params;

    try {
        validate.idMongodb(id);

        const elem = await Category.findById( id );
        if (!elem) return res.status(404).send("La categoría con el id ingresado no existe");
        
        const remove = await Category.findByIdAndRemove(elem._id);
        return res.json(normalizeCategories(remove));
    } catch (error) {
        next(error);
    }
});

module.exports = router;