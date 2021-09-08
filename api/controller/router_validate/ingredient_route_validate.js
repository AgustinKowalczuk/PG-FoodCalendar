const {
    argumentsValidate,
    nameValidate
} = require('../validate');

const ingredientRouteValidate = {
    ingredientValidation(name) {
        argumentsValidate([
            { keyName: 'name', value: name, type: 'string', notEmpty: true }
        ]);
        nameValidate(name);
    }
}

module.exports = ingredientRouteValidate;