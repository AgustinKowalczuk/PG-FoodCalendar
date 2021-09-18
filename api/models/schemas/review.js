const { Schema } = require('mongoose');

const review = new Schema({
    recipe: { type: Schema.Types.ObjectId, required: true, ref: 'Recipe' },
    owner: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
    date: { type: Date, default: Date.now },
    comment: {
        type: String, default: '', required: true, validate: {
            validator: function (value) {
                const re = /^[^<>&~^`@]*$/g;
                if (!re.test(value)) {
                    return false;
                }
                return true;
            }
        }
    }
});

module.exports = review;