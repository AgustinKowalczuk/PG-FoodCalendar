const { Schema } = require('mongoose');

const unit = new Schema({
    name: { type: String, required: true }
})

module.exports = unit; 