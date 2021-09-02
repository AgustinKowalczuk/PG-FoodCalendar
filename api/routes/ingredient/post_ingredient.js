const express = require("express");
const router = express.Router();
const models = require('../../models/models');
const { Ingredient } = models;

router.post('/ingredients', async (req,res)=>{
    const { name, unit } = req.body;
    try {
        const posted = await Ingredient.create({ name, unit });
        return res.json(posted);
    } catch (error) {
        console.log(error);
        return res.status(404).send('Hay un error en esta ruta');
    }
})

module.exports = router