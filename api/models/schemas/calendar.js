const { Schema } = require('mongoose');

const calendar = new Schema({
    owner: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
    name: { type: String, default: 'Calendar', required: true, validate: {
        validator: function (value) {
            const re = /^[^<>&~^`@]*$/g;
            if (!re.test(value)) {
                return false;
            }
            return true;
        }
    } },
    calendar: {
        type: [{
            firstRecipe: { type: Schema.Types.ObjectId, ref: 'Recipe' },
            secondRecipe: { type: Schema.Types.ObjectId, ref: 'Recipe' }
        }],
        required: true,
        validate: {
            validator: function (value) {
                if (value.length !== 7) {
                    return false;
                }
                return true;
            }
        }
    },
    date: { type: Date, default: Date.now }
});

module.exports = calendar;