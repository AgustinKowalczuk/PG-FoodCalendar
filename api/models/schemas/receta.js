const { Schema } = require('mongoose');
const ingredient = require('./ingredient.js');
const unit = require('./unit.js');
const category = require('./category.js');

const recipe = new Schema({
    name: {
        type: String, required: true, validate: {
            validator: function (value) {
                const re = /^[^{}<>#$%&~^`/*+¿?¡!@]*$/g;
                if (!re.test(value)) {
                    return false;
                }
                return true;
            }
        }
    },
    difficulty: { type: String, enum: ["Fácil", "Moderado", "Difícil"], default: "Moderado", required: true },
    rating: { type: Number, min: 0, max: 10, required: true },
    preparation: {
        type: String, required: true, validate: {
            validator: function (value) {
                const re = /^[^<>&~^`@]*$/g;
                if (!re.test(value)) {
                    return false;
                }
                return true;
            }
        }
    },
    img: {
        type: String, required: true, validate: {
            validator: function (value) {
                const re = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
                if (!re.test(value)) {
                    return false;
                }
                return true;
            }
        }
    },
    category: { 
        type: [ { type: Schema.Types.ObjectId, required: true, ref: 'Category' } ], required: true 
    },
    ingredients: {
        type: [
            {
                ingredient: { type: Schema.Types.ObjectId, required: true, ref: 'Ingredient' },
                amount: { type: Number, min: 0, required: true },
                unit: { type: Schema.Types.ObjectId, required: true, ref: 'Unit' }
            }
        ], required: true
    },
    premium: { type: Boolean, required: true },
    availability: { type: Boolean, required: true },
    disabled: { type: Boolean, required: true }
})

module.exports = recipe;
