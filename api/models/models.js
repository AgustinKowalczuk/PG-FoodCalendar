const mongoose = require('mongoose');

const ingredient = require('./schemas/ingredient');
const recipe = require('./schemas/receta');
const unit = require('./schemas/unit.js');
const category = require('./schemas/category.js');
const user = require('./schemas/user.js');
const calendar = require('./schemas/calendar.js');
const review = require('./schemas/review.js');
const like = require('./schemas/like');
const model = mongoose.model.bind(mongoose);

module.exports = {
    Ingredient: model('Ingredient', ingredient),
    Recipe: model('Recipe', recipe),
    Unit: model('Unit', unit),
    Category: model('Category', category),
    User: model('User', user),
    Calendar: model('Calendar', calendar),
    Review: model('Review', review),
    Like: model('Like', like)
}
