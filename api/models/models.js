const mongoose = require('mongoose');

const ingredient = require('./schemas/ingredient');
const recipe = require('./schemas/receta');
const unit = require('./schemas/unit.js');
const category = require('./schemas/category.js'); 
const model = mongoose.model.bind(mongoose);

module.exports = { 
    Ingredient: model('Ingredient', ingredient),
    Recipe: model('Recipe', recipe),
    Unit: model('Unit', unit),
    Category: model('Category', category)
}
