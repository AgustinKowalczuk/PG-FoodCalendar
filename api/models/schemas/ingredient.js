const { Schema } = require('mongoose');

const ingredient = new Schema({
    name: { type: String, required: true, unique: true, validate: {
        validator: function (value) {
            const re = /^[^{}<>#$%&~^`/*+¿?¡!@]*$/g;
            if (!re.test(value)) {
                return false;
            }
            return true;
        }
    } }
});

module.exports = ingredient; 