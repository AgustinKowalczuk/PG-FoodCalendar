const express = require("express");
const router = express.Router();
const nodemailer = require('nodemailer');
const fs = require('fs');

let counter = 0;
const interval = setInterval(()=> {
    counter++
}, 60000);

router.get('/interval', async (req, res, next) => {
    try {
        res.json({ counter });
    } catch (error) {
        next(error);
    }
});

module.exports = router;
