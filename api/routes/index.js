const express = require("express");
const router = express.Router()

router.get('/inicio',(req,res)=>{
    res.send('<h1> Que comience el juego </h1>');
})

module.exports = router