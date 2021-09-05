const { 
    argumentsValidate,
    nameValidate
 } = require('../validate');

const unitRouteValidate = {
    unitValidation(name) {
        argumentsValidate([
            { keyName: 'name', value: name, type: 'string', notEmpty: true }
        ]);
        nameValidate(name);
    }
}

module.exports = unitRouteValidate;