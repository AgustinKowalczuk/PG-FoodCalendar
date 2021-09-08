const express = require("express");
const { normalizeCalendar } = require("../../controller/normalize");
const router = express.Router();
const models = require('../../models/models');
const { Calendar } = models;

router.get('/calendar', async (req, res, next) => {
    try {
        const calendar = await Calendar.find().populate({path:'calendar', populate:{path:'firstRecipe', select:'name'}}).populate({path:'calendar', populate:{path:'secondRecipe', select:'name'}}).lean();
        return res.json(calendar);
    } catch (error) {
        next(error);
    }
});

module.exports = router;