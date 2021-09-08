const { Schema } = require('mongoose');

const user = new Schema({
    name: {
        type: String, required: true, validate: {
            validator: function (value) {
                const re = /^[^{}<>#$%&~^`/*+¿?¡!@0-9]*$/g;
                if (!re.test(value)) {
                    return false;
                }
                return true;
            }
        }
    },
    surname: {
        type: String, required: true, validate: {
            validator: function (value) {
                const re = /^[^{}<>#$%&~^`/*+¿?¡!@0-9]*$/g;
                if (!re.test(value)) {
                    return false;
                }
                return true;
            }
        }
    },
    email: {
        type: String, required: true, unique: true, validate: {
            validator: function (value) {
                const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
                if (!re.test(value)) {
                    return false;
                }
                return true;
            }
        }
    },
    password: {
        type: String, required: true
    },
    category: { type: String, enum: ["Admin", "User"], required: true, default: "User" }
});

module.exports = user;

