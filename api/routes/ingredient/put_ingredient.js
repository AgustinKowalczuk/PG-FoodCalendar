const express = require("express");
const router = express.Router()

router.put('/ingredients',(req,res)=>{
    res.send('Ingredientes esta conectado (put)')
})

module.exports = router