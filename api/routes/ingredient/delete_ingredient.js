const express = require("express");
const router = express.Router()

router.delete('/ingredients',(req,res)=>{
    res.send('Ingredientes esta conectado (delet)')
})

module.exports = router