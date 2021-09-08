const express = require("express");
//const { normalizeCalendars } = require("../../controller/normalize");
const { calendarValidation } = require("../../controller/router_validate/calendar_route_validate");
const { Calendar, Recipe } = require("../../models/models");
const router = express.Router();

router.post('/calendar', async (req, res, next) => {
    const { owner, calendar } = req.body;

    try {
        calendarValidation(owner, calendar);

        for (let i = 0; i < calendar.length; i++) {
            let rec = await Recipe.findById(calendar[i]);
            if (!rec){
                throw new Error(`El id en la posicion ${i} no se encuentra en DB de recetas`)
            }
        }
        const temp = [];
        let e = 0;
        while(calendar.length > 0){
            temp[e] = {firstRecipe : calendar.shift(), secondRecipe : calendar.shift()};
            e++;
        }
        const posted = await Calendar.create({ owner, calendar:temp });
        return res.json(posted);
    } catch (error) {
        next(error);
    }
});

module.exports = router;