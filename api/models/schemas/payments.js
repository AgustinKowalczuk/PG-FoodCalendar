const { Schema } = require('mongoose');

const payments = new Schema({
    owner: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
    status: { type: String, required: true },
    payment: { type: String, required: true },
    merchantOrder: { type: String, required: true },
    date: { type: Date, default: Date.now }
});

module.exports = payments;