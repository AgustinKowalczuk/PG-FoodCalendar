const express = require("express");
const router = express.Router()

router.get('/recipe',(req,res)=>{
    res.send('Recetas esta conectado (Get)')
})

module.exports = router