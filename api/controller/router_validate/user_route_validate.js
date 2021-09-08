const {
    argumentsValidate,
    nameValidate,
    emailValidate,
    passwordValidate,
    userCategoryValidate,
    idMongodb
} = require('../validate');

const userRouteValidate = {
    userValidation(name, surname, email, password, category) {
        argumentsValidate([
            { keyName: 'name', value: name, type: 'string', notEmpty: true },
            { keyName: 'surname', value: surname, type: 'string', notEmpty: true },
            { keyName: 'email', value: email, type: 'string', notEmpty: true },
            { keyName: 'password', value: password, type: 'string', notEmpty: true },
            { keyName: 'category', value: category, type: 'string', notEmpty: true }
        ]);
        nameValidate(name);
        nameValidate(surname);
        emailValidate(email);
        passwordValidate(password);
        userCategoryValidate(category);
    },
    userPutValidation(id, name, surname, email, password, category) {
        idMongodb(id);
        if (name !== undefined){
            argumentsValidate([{ keyName: 'name', value: name, type: 'string', notEmpty: true }]);
            nameValidate(name);
        }
        if (surname !== undefined){
            argumentsValidate([{ keyName: 'surname', value: surname, type: 'string', notEmpty: true }]);
            nameValidate(surname);
        }
        if (email !== undefined){
            argumentsValidate([{ keyName: 'email', value: email, type: 'string', notEmpty: true }]);
            emailValidate(email);
        }
        if (password !== undefined){
            argumentsValidate([{ keyName: 'password', value: password, type: 'string', notEmpty: true }]);
            passwordValidate(password);
        }
        if (category !== undefined){
            argumentsValidate([{ keyName: 'category', value: category, type: 'string', notEmpty: true }]);
            userCategoryValidate(category);
        }
    }
}

module.exports = userRouteValidate;