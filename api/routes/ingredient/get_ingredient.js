const express = require("express");
const router = express.Router()

router.get('/ingredients',(req,res)=>{
    res.send('Ingredientes esta conectado (Get)')
})

module.exports = router