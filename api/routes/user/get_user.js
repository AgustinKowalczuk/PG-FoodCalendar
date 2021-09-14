const express = require("express");
const { normalizeUsers } = require("../../controller/normalize");
const router = express.Router();
const { auth, authAdmin } = require('../../controller/auth');
const models = require('../../models/models');
const { User } = models;

router.get('/user', auth, authAdmin, async (req, res, next) => {
    const { userId, userCategory } = req;
    
    try {
        const user = await User.find().lean();
        return res.json(normalizeUsers(user));
    } catch (error) {
        next(error);
    }
});

module.exports = router;