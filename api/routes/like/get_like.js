const express = require("express");
const { auth } = require("../../controller/auth");
const { normalizeLike } = require("../../controller/normalize");
const router = express.Router();
const models = require('../../models/models');
const { Like } = models;

router.get('/like/user', auth, async (req, res, next) => {
    const {userId} = req;
    try {

        const likes = await Like.find({owner: userId});
        return res.json(normalizeLike(likes));
    } catch (error) {
        next(error);
    }
});
module.exports = router;