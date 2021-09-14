const express = require("express");
const { calendarValidation } = require("../../controller/router_validate/calendar_route_validate");
const { Calendar, Recipe, User } = require("../../models/models");
const { auth } = require('../../controller/auth');
const { normalizeCalendar } = require("../../controller/normalize");
const router = express.Router();

router.post('/calendar', auth, async (req, res, next) => {
    const { name, calendar } = req.body;
    const { userId } = req;

    try {
        calendarValidation(userId, name, calendar);

        const owner = await User.findById(userId);
        if (!owner) throw new Error(`El user con el id ${userId} no existe.`)

        for (let i = 0; i < calendar.length; i++) {
            let recipe = await Recipe.findById(calendar[i]);
            if (!recipe){
                throw new Error(`El id en la posicion ${i} no se encuentra en DB de recetas`)
            }
        }
        const temp = [];
        let e = 0;
        while(calendar.length > 0){
            temp[e] = {firstRecipe : calendar.shift(), secondRecipe : calendar.shift()};
            e++;
        }
        const posted = await Calendar.create({ owner: userId, name, calendar:temp });
        return res.json(posted);
    } catch (error) {
        next(error);
    }
});

module.exports = router;