const { Schema } = require('mongoose');

const like = new Schema({
    owner: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
    recipe: { type: Schema.Types.ObjectId, ref: 'Recipe' },
    like: { type: Boolean, default: false, required: true }
});

module.exports = like;