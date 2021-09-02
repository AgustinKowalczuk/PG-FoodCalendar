const mongoose = require('mongoose');

const ingredient = require('./schemas/ingredient');
const recipe = require('./schemas/receta');

const model = mongoose.model.bind(mongoose);

module.exports = { 
    Ingredient: model('Ingredient', ingredient),
    Recipe: model('Recipe', recipe)
}