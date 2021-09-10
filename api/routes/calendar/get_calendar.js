const express = require("express");
const { normalizeCalendar } = require("../../controller/normalize");
const { idMongodb } = require('../../controller/validate');
const router = express.Router();
const models = require('../../models/models');
const { Calendar } = models;

router.get('/calendar', async (req, res, next) => {
    try {
        const calendar = await Calendar.find()
        .populate({path:'calendar', populate:{path:'firstRecipe', select:['name','difficulty','rating','preparation','img','category','ingredients','premium','availability']}})
        .populate({path:'calendar', populate:{path:'secondRecipe', select:['name','difficulty','rating','preparation','img','category','ingredients','premium','availability']}})
        .lean();
        
        return res.json(normalizeCalendar(calendar));
    } catch (error) {
        next(error);
    }
});

router.get('/calendar/user/:id', async (req, res, next) => {
    const { id } = req.params;

    try {
        idMongodb(id);

        const calendar = await Calendar.find({owner: id})
        .populate({path:'calendar', populate:{path:'firstRecipe', select:['name','difficulty','rating','preparation','img','category','ingredients','premium','availability']}})
        .populate({path:'calendar', populate:{path:'secondRecipe', select:['name','difficulty','rating','preparation','img','category','ingredients','premium','availability']}})
        .lean();

        return res.json(normalizeCalendar(calendar));
    } catch (error) {
        next(error);
    }
});

router.get('/calendar/:id', async (req, res, next) => {
    const { id } = req.params;

    try {
        idMongodb(id);

        const calendar = await Calendar.find({ _id: id}).populate({path:'owner', select:['name','surname','email','category']})
        .populate({path:'calendar', populate:{path:'firstRecipe', select:['name','difficulty','rating','preparation','img','category','ingredients','premium','availability']}})
        .populate({path:'calendar', populate:{path:'secondRecipe', select:['name','difficulty','rating','preparation','img','category','ingredients','premium','availability']}})
        .lean();
        
        return res.json(normalizeCalendar(calendar));
    } catch (error) {
        next(error);
    }
});

module.exports = router;