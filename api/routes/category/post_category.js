const express = require("express");
const { normalizeCategories } = require("../../controller/normalize");
const { categoryValidation } = require("../../controller/router_validate/category_route_validate");
const router = express.Router();
const { Category } = require("../../models/models");

router.post('/category', async (req, res, next) => {
    const { name } = req.body;

    try {
        categoryValidation(name);

        const existentName = await Category.findOne({name});       
        if(existentName && !!Object.keys(existentName).length) return res.status(404).send("La categoría ya existe en la base de datos.");
        
        await Category.create({ name });
        const posted = await Category.findOne({name});
        return res.json(normalizeCategories(posted));
    } catch (error) {
        next(error);
    }
});

module.exports = router;