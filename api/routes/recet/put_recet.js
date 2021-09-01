const express = require("express");
const router = express.Router()

router.put('/recipe',(req,res)=>{
    res.send('Recetas esta conectado (put)')
})

module.exports = router