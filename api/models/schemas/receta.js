const { Schema } = require('mongoose');
const ingredient = require('./ingredient.js');
const unit = require('./unit.js')

const recipe = new Schema({
    name: { type: String, required: true, validate: {
        validator: function (value) {
            const re = /^[^{}<>#$%&~^`/*+¿?¡!@]*$/g;
                if (!re.test(value)) {
                    return false;
                }
                return true;
        }
    }},
    difficulty: { type: String, enum: ["Fácil", "Moderado", "Difícil"], default: "Moderado", required: true },
    rating: { type: Number, min: 0, max: 10, required: true },
    preparation: { type: String, required: true, validate: {
        validator: function (value) {
            const re = /^[^<>&~^`@]*$/g;
                if (!re.test(value)) {
                    return false;
                }
                return true;
        }
    } },
    img: { type: String, required: true, validate: {
        validator: function (value) {
            const re = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
                if (!re.test(value)) {
                    return false;
                }
                return true;
        }
    } },
    category: { type: [String], required: true, validate: {
        validator: function (value) {
            for (let i = 0; i < value.length; i++) {
                const re = /^[^{}<>#$%&~^`/*+¿?¡!@]*$/g;
                if (!re.test(value[i])) return false;               
            }
            return true;
        }
    } },
    ingredients: { type: [
        {
            ingredient,
            amount : { type: Number, min: 0, required: true },
            unit
        }
    ], required: true}
})

module.exports = recipe;
