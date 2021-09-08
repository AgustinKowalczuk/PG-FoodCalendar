const { 
    argumentsValidate,
    nameValidate
 } = require('../validate');

const categoryRouteValidate = {
    categoryValidation(name) {
        argumentsValidate([
            { keyName: 'name', value: name, type: 'string', notEmpty: true }
        ]);
        nameValidate(name);
    }
}

module.exports = categoryRouteValidate;