const { 
    argumentsValidate, 
    preparationValidate, 
    idMongodb,
    likeValidate} = require("../validate")

const reviewRouteValidate={
    postReviewValidation(like, comment, recipeId) {
        argumentsValidate([
            { keyName: 'like', value: like, type: 'boolean', notEmpty: true },
            { keyName: 'comment', value: comment, type: 'string', notEmpty: true },
            { keyName: 'recipeId', value: recipeId, type: 'string', notEmpty: true}
        ]);
        likeValidate(like);
        preparationValidate(comment);
        idMongodb(recipeId);
    },
    putReviewValidation(id, like, comment) {
        idMongodb(id);
        if (like !== undefined) {
            argumentsValidate([
                { keyName: 'like', value: like, type: 'boolean', notEmpty: true }
            ]);
            likeValidate(like);
        };

        if (comment !== undefined) {
            argumentsValidate([
                { keyName: 'comment', value: comment, type: 'string', notEmpty: true },
            ]);
            preparationValidate(comment);
        };
    }
}

module.exports = reviewRouteValidate;