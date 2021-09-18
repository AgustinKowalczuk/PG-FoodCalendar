const { 
    argumentsValidate,
    idMongodb} = require("../validate")

const likeRouteValidate={
    postLikeValidation( recipeId) {
        argumentsValidate([
            { keyName: 'recipeId', value: recipeId, type: 'string', notEmpty: true},
        ]);
        idMongodb(recipeId);
    }
}

module.exports = likeRouteValidate;