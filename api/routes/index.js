const express = require("express");
const router = express.Router()

//Requerir las rutas
//get 
const get_recet = require('./recet/get_recet.js');
const get_ingredients =require('./ingredient/get_ingredient.js');
const get_unit = require('./unit/get_unit.js');
const get_category = require('./category/get_category.js');
//put
const put_recet = require('./recet/put_recet.js');
const put_ingredients= require('./ingredient/put_ingredient.js');
const put_unit = require('./unit/put_unit.js');
const put_category = require('./category/put_category.js');
//delete
const delete_recet = require('./recet/delete_recet.js');
const delete_ingredients= require('./ingredient/delete_ingredient.js');
const delete_unit= require('./unit/delete_unit.js');
const delete_category = require('./category/delete_category.js');
//post
const post_recet = require('./recet/post_recet.js');
const post_ingredients= require('./ingredient/post_ingredient.js');
const post_unit = require('./unit/post_unit.js');
const post_category = require('./category/post_category.js');

//get
router.use(get_recet);
router.use(get_ingredients);
router.use(get_unit);
router.use(get_category);
//put
router.use(put_recet);
router.use(put_ingredients);
router.use(put_unit);
router.use(put_category);
//delete
router.use(delete_recet);
router.use(delete_ingredients);
router.use(delete_unit);
router.use(delete_category);
//post
router.use(post_recet);
router.use(post_ingredients);
router.use(post_unit);
router.use(post_category);

module.exports = router