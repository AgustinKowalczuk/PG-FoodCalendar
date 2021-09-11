const express = require("express");
const router = express.Router();
const { Category } = require("../../models/models");
const validate = require("../../controller/validate");
const { categoryValidation } = require("../../controller/router_validate/category_route_validate");
const { normalizeCategories } = require("../../controller/normalize");
const { auth, authAdmin } = require('../../controller/auth');

router.put('/category/:id', auth, authAdmin, async (req, res, next) => {
    const { id } = req.params;
    const { name } = req.body;

    try {
        validate.idMongodb(id);
        categoryValidation(name);

        const elem = await Category.findById(id);
        if (!elem) return res.status(404).send("La categoría con el id ingresado no existe");

        const existentName = await Category.findOne({name});       
        if(existentName && !!Object.keys(existentName).length) return res.status(404).send("La categoría ya existe en la base de datos.");
        
        await Category.findByIdAndUpdate(elem._id, { name });

        const update = await Category.findById(id);
        return res.json(normalizeCategories(update));
    } catch (error) {
        next(error);
    }
});

module.exports = router;