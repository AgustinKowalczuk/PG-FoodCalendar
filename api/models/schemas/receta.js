const { Schema } = require('mongoose');
const ingredient = require('./ingredient.js');

const recipe = new Schema({
    name: { type: String, required: true },
    difficulty: { type: Number, min:1, max:100, required: true },
    rating: {type: Number, min:0, max:10, required: true},
    preparation: {type: String, required: true},
    img: {type: String, required: true},
    ingredients:[ingredient]
})

module.exports = recipe