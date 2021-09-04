const express = require("express");
const router = express.Router();
const models = require('../../models/models');
const { Unit } = models;

router.get('/unit', async (req, res, next) => {
    try {
        const units = await Unit.find().lean();
        const mapeado = units.map(e => ({
            id: e._id,
            name: e.name
        }));
        return res.json(mapeado);
    } catch (error) {
        next(error);
    }
});

module.exports = router;