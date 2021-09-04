const express = require("express");
const router = express.Router()

//requerir las rutas 
const get_recet = require('./recet/get_recet.js');
const get_ingredients =require('./ingredient/get_ingredient.js');
const get_unit = require('./unit/get_unit.js');
const put_recet = require('./recet/put_recet.js');
const put_ingredients= require('./ingredient/put_ingredient.js');
const delete_recet = require('./recet/delete_recet.js');
const delete_ingredients= require('./ingredient/delete_ingredient.js');
const post_recet = require('./recet/post_recet.js');
const post_ingredients= require('./ingredient/post_ingredient.js');
const post_unit = require('./unit/post_unit.js');

//get
router.use(get_recet);
router.use(get_ingredients);
router.use(get_unit);
//put
router.use(put_recet);
router.use(put_ingredients);
//delete
router.use(delete_recet);
router.use(delete_ingredients);
//post
router.use(post_recet);
router.use(post_ingredients);
router.use(post_unit);

module.exports = router