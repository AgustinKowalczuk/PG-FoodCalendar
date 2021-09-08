const { Schema } = require('mongoose');

const calendar = new Schema({
    owner: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
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
    }
});

module.exports = calendar;