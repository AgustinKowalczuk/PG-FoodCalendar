const mongoose = require('mongoose');

const ingredient = require('./schemas/ingredient');

const model = mongoose.model.bind(mongoose);

module.exports = { 
    Ingredient: model('Ingredient', ingredient)
}