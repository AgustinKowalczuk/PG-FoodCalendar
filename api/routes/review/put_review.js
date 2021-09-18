const express = require("express");
const router = express.Router();
const { Review } = require("../../models/models");
const { auth } = require('../../controller/auth');
const { normalizeReview } = require("../../controller/normalize");
const { putReviewValidation } = require("../../controller/router_validate/review_route_validate");

router.put('/review/:id', auth, async (req, res, next) => {
    const { id } = req.params;
    const {  comment } = req.body;
    const { userId } = req;

    try {
        putReviewValidation(id, comment);

        const elem = await Review.findById(id);
        if (!elem) return res.status(404).send("La review con el id ingresado no existe");

        const reviewUser = await Review.find({owner: userId, _id: id});
        if (!reviewUser.length) return res.status(404).send('La review no corresponde al usuario que lo quiere editar');
        
        await Review.findByIdAndUpdate(elem._id, {comment, date: new Date });

        const update = await Review.findById(id);
        return res.json(normalizeReview(update));
    } catch (error) {
        next(error);
    }
});

module.exports = router;