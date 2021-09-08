const express = require("express");
const { normalizeCategories } = require("../../controller/normalize");
const router = express.Router();
const models = require('../../models/models');
const { Category } = models;

router.get('/category', async (req, res, next) => {
    try {
        const categories = await Category.find().lean();
        return res.json(normalizeCategories(categories));
    } catch (error) {
        next(error);
    }
});

module.exports = router;