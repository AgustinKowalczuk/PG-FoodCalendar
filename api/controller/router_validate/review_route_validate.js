const { 
    argumentsValidate, 
    ratingValidate, 
    preparationValidate, 
    idMongodb} = require("../validate")

const reviewRouteValidate={
    postReviewValidation(rating, comment, recipeId) {
        argumentsValidate([
            { keyName: 'rating', value: rating, type: 'number', notEmpty: true },
            { keyName: 'comment', value: comment, type: 'string', notEmpty: true },
            { keyName: 'recipeId', value: recipeId, type: 'string', notEmpty: true}
        ]);
        ratingValidate(rating);
        preparationValidate(comment);
        idMongodb(recipeId);
    },
    putReviewValidation(id, rating, comment) {
        idMongodb(id);
        if (rating !== undefined) {
            argumentsValidate([
                { keyName: 'rating', value: rating, type: 'number', notEmpty: true }
            ]);
            ratingValidate(rating);
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