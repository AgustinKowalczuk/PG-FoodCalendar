const express = require("express");
const { calendarValidation } = require("../../controller/router_validate/calendar_route_validate");
const { Calendar, Recipe, User } = require("../../models/models");
const router = express.Router();

router.post('/calendar', async (req, res, next) => {
    const { owner, name, calendar } = req.body;

    try {
        calendarValidation(owner, name, calendar);

        const ownerID = await User.findById(owner);
        if (!ownerID) throw new Error(`El user con el id ${owner} no existe.`)

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
        const posted = await Calendar.create({ owner, name, calendar:temp });
        return res.json(posted);
    } catch (error) {
        next(error);
    }
});

module.exports = router;