const express = require("express");
const router = express.Router()

router.delete('/recipe',(req,res)=>{
    res.send('Recetas esta conectado (delete)')
})

module.exports = router