const express = require("express");
const { normalizeCalendar } = require("../../controller/normalize");
const { idMongodb } = require('../../controller/validate');
const router = express.Router();
const { auth, authAdmin } = require('../../controller/auth');
const models = require('../../models/models');
const { Calendar } = models;

//El Admin tiene acceso a todos los calendarios
router.get('/calendar', auth, authAdmin, async (req, res, next) => {
    try {
        const calendar = await Calendar.find()
        .populate({path:'owner', select:['name','surname','email','category']})
        .populate({path:'calendar', populate:{path:'firstRecipe', select:['name','difficulty','rating','preparation','img','category','ingredients','premium','availability']}})
        .populate({path:'calendar', populate:{path:'secondRecipe', select:['name','difficulty','rating','preparation','img','category','ingredients','premium','availability']}})
        .lean();
        
        return res.json(normalizeCalendar(calendar));
    } catch (error) {
        next(error);
    }
});

//El usuario podrá ver todos sus calendarios
router.get('/calendar/user', auth, async (req, res, next) => {
    const { userId } = req;

    try {
        idMongodb(userId);

        const calendar = await Calendar.find({owner: userId})
        .populate({path:'calendar', populate:{path:'firstRecipe', select:['name','difficulty','rating','preparation','img','category','ingredients','premium','availability']}})
        .populate({path:'calendar', populate:{path:'secondRecipe', select:['name','difficulty','rating','preparation','img','category','ingredients','premium','availability']}})
        .lean();

        return res.json(normalizeCalendar(calendar));
    } catch (error) {
        next(error);
    }
});

//El Admin puede ver los calendarios de un usuario.
router.get('/calendar/user/:id', auth, authAdmin, async (req, res, next) => {
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

//El usuario puede acceder a los detalles de un calendario
router.get('/calendar/:id', auth, async (req, res, next) => {
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