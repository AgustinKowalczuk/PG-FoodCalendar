const express = require("express");
const router = express.Router()
const models = require('../../models/models');
const { Ingredient } = models;

router.get('/ingredients', async (req,res)=>{
    try {
        const ingredients = await Ingredient.find();
        return res.json(ingredients);
    } catch (error) {
        console.log(error);
        return res.status(404).send('Hay un error en esta ruta');
    }
})

module.exports = router