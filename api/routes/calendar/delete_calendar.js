const express = require("express");
const { normalizeCalendar } = require("../../controller/normalize");
const { idMongodb } = require('../../controller/validate');
const router = express.Router();
const { auth } = require('../../controller/auth');
const models = require('../../models/models');
const { Calendar } = models;

router.delete('/calendar/:id', auth, async (req, res, next) => {
    const { id } = req.params;

    try {
        idMongodb(id);

        const elem = await Calendar.findById(id);
        if (!elem) return res.status(404).send("El calendario con el id ingresado no existe");

        const remove = await Calendar.findByIdAndRemove(elem._id);
        return res.json(normalizeCalendar(remove));
    } catch (error) {
        next(error);
    }

})

module.exports = router;