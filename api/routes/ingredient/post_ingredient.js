const express = require("express");
const router = express.Router()

router.post('/ingredients',(req,res)=>{
    res.send('Ingredientes esta conectado (post)')
})

module.exports = router