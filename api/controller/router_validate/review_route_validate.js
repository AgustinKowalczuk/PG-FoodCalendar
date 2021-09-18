const { 
    argumentsValidate, 
    preparationValidate, 
    idMongodb,
    likeValidate} = require("../validate")

const reviewRouteValidate={
    postReviewValidation(comment, recipeId) {
        argumentsValidate([
            { keyName: 'comment', value: comment, type: 'string', notEmpty: true },
            { keyName: 'recipeId', value: recipeId, type: 'string', notEmpty: true}
        ]);
        preparationValidate(comment);
        idMongodb(recipeId);
    },
    putReviewValidation(id, comment) {
        idMongodb(id);

        if (comment !== undefined) {
            argumentsValidate([
                { keyName: 'comment', value: comment, type: 'string', notEmpty: true },
            ]);
            preparationValidate(comment);
        };
    }
}

module.exports = reviewRouteValidate;