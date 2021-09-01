const express = require("express");
const router = express.Router()

router.post('/recipe',(req,res)=>{
    res.send('Recetas esta conectado (post)')
})

module.exports = router