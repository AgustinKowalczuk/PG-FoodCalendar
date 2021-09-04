const express = require("express");
const { Unit } = require("../../models/models");
const router = express.Router();

router.post('/unit', async (req, res, next) => {
    const { name } = req.body;
    try {
        const posted = await Unit.create({ name });
        return res.json(posted);
    } catch (error) {
        next(error);
    }
});

module.exports = router;