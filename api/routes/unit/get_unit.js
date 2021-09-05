const express = require("express");
const { normalizeUnits } = require("../../controller/normalize");
const router = express.Router();
const models = require('../../models/models');
const { Unit } = models;

router.get('/unit', async (req, res, next) => {
    try {
        const units = await Unit.find().lean();
        return res.json(normalizeUnits(units));
    } catch (error) {
        next(error);
    }
});

module.exports = router;