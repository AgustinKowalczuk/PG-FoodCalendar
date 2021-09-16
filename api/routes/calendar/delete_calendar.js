const express = require("express");
const { normalizeCalendar } = require("../../controller/normalize");
const { idMongodb } = require('../../controller/validate');
const router = express.Router();
const { auth } = require('../../controller/auth');
const models = require('../../models/models');
const { Recipe } = require("../../models/models");
const { Calendar } = models;

router.delete('/calendar/:id', auth, async (req, res, next) => {
    const { id } = req.params;

    try {
        idMongodb(id);

        const elem = await Calendar.findById(id);
        if (!elem) return res.status(404).send("El calendario con el id ingresado no existe");

        let arrayFirstRecipe = elem.calendar.map(e => e.firstRecipe);
        let arraySecondRecipe = elem.calendar.map(e => e.secondRecipe);
        let arrayRecipe = arrayFirstRecipe.concat(arraySecondRecipe);

        for (let i = 0; i < arrayRecipe.length; i++) {
            let resultFirst = await Calendar.find({$or: [
                {'calendar':{"$elemMatch":{'firstRecipe': arrayRecipe[i]}}}, 
                {'calendar':{"$elemMatch":{'secondRecipe': arrayRecipe[i]}}}
                ] });
            if(resultFirst.length === 1){
               await Recipe.findByIdAndUpdate(arrayRecipe[i], {disabled: false});
            }
        }

        const remove = await Calendar.findByIdAndRemove(elem._id);
        return res.json(remove);
    } catch (error) {
        next(error);
    }

})

module.exports = router;