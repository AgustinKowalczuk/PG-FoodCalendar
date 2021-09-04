const { Schema } = require('mongoose');

const unit = new Schema({
    name: { type: String, required: true, unique: true }
})

module.exports = unit; 