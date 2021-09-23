const express = require("express");
const { normalizeUsers } = require("../../controller/normalize");
const router = express.Router();
const { auth, authAdmin } = require('../../controller/auth');
const models = require('../../models/models');
const { Payments } = require("../../models/models");
const { User } = models;

//Obtener todos los usuarios.
router.get('/user', auth, authAdmin, async (req, res, next) => {
    
    try {
        let users = await User.find().lean();
        users = normalizeUsers(users);
        for (let i = 0; i < users.length; i++) {
            const payments = await Payments.find({ owner: users[i].id }).select('status payment date -_id').lean();
            users[i].payments = payments;
        }
        return res.json(users);
    } catch (error) {
        next(error);
    }
});

module.exports = router;