const express = require("express");
const { Review } = require("../../models/models");
const router = express.Router()
const { auth, authAdmin } = require('../../controller/auth');
const { normalizeReview } = require("../../controller/normalize");
const { idMongodb } = require("../../controller/validate");

//El usuario puede eliminar su review (id de review).
router.delete('/review/user/:id', auth, async (req, res, next) => {
    const { id } = req.params;
    const { userId } = req;

    try {
        idMongodb(id);

        const elem = await Review.findById(id);
        if (!elem) return res.status(404).send("La review con el id ingresado no existe");

        const reviewUser = await Review.find({owner: userId, _id: id});
        if (!reviewUser.length) return res.status(404).send('La review no corresponde al usuario que lo quiere eliminar');
        
        const remove = await Review.findByIdAndRemove(elem._id);
        return res.json(normalizeReview(remove));
    } catch (error) {
        next(error);
    }
});


router.delete('/review/admin/:id', auth, authAdmin, async (req, res, next) => {
    const { id } = req.params;

    try {
        idMongodb(id);

        const elem = await Review.findById(id);
        if (!elem) return res.status(404).send("La review con el id ingresado no existe");

        const remove = await Review.findByIdAndRemove(elem._id);
        return res.json(normalizeReview(remove));
    } catch (error) {
        next(error);
    }
});

module.exports = router;