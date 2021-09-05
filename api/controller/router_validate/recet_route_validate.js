const { 
    amountValidate,
    argumentsValidate,
    idMongodb,
    difficultyValidate,
    nameValidate,
    preparationValidate,
    ratingValidate,
    urlValidate
 } = require('../validate');

const recipeRouteValidate = {
    postRecipeValidation(name, difficulty, rating, preparation, img, category, ingredients) {
        argumentsValidate([
            { keyName: 'name', value: name, type: 'string', notEmpty: true },
            { keyName: 'difficulty', value: difficulty, type: 'string', notEmpty: true },
            { keyName: 'rating', value: rating, type: 'number', notEmpty: true },
            { keyName: 'preparation', value: preparation, type: 'string', notEmpty: true },
            { keyName: 'img', value: img, type: 'string', notEmpty: true },
            { keyName: 'category', value: category, type: 'array', notEmpty: true },
            { keyName: 'ingredients', value: ingredients, type: 'array', notEmpty: true },
        ]);
        nameValidate(name);
        difficultyValidate(difficulty);
        ratingValidate(rating);
        preparationValidate(preparation);
        urlValidate(img);
        for (const e of category) {
            argumentsValidate([
                { keyName: 'category value', value: e, type: 'string', notEmpty: true }
            ]);
            nameValidate(e);
        }
        for (const e of ingredients) {
            argumentsValidate([
                { keyName: 'ingredients.ingredient value', value: e.ingredient, type: 'string', notEmpty: true },
                { keyName: 'ingredients.amount value', value: e.amount, type: 'number', notEmpty: true },
                { keyName: 'ingredients.unit value', value: e.unit, type: 'string', notEmpty: true }
            ]);
            nameValidate(e.ingredient);
            amountValidate(e.amount);
            nameValidate(e.unit);
        }
    },

    putRecipeValidation(id, name, difficulty, rating, preparation, img, category, ingredients) {
        idMongodb(id);
        if (name !== undefined) {
            argumentsValidate([
                { keyName: 'name', value: name, type: 'string', notEmpty: true }
            ]);
            nameValidate(name);
        }
        if (difficulty !== undefined) {
            argumentsValidate([
                { keyName: 'difficulty', value: difficulty, type: 'string', notEmpty: true },
            ]);
            difficultyValidate(difficulty);
        }

        if (rating !== undefined) {
            argumentsValidate([
                { keyName: 'rating', value: rating, type: 'number', notEmpty: true }
            ]);
            ratingValidate(rating);
        }

        if (preparation !== undefined) {
            argumentsValidate([
                { keyName: 'preparation', value: preparation, type: 'string', notEmpty: true },
            ]);
            preparationValidate(preparation);
        }

        if (img !== undefined) {
            argumentsValidate([
                { keyName: 'img', value: img, type: 'string', notEmpty: true }
            ]);
            urlValidate(img);
        }

        if (category !== undefined) {
            argumentsValidate([
                { keyName: 'category', value: category, type: 'array', notEmpty: true }
            ]);
            for (const e of category) {
                argumentsValidate([
                    { keyName: 'category value', value: e, type: 'string', notEmpty: true }
                ]);
                nameValidate(e);
            }
        }

        if (ingredients !== undefined) {
            argumentsValidate([
                { keyName: 'ingredients', value: ingredients, type: 'array', notEmpty: true },
            ]);
            for (const e of ingredients) {
                argumentsValidate([
                    { keyName: 'ingredients.ingredient value', value: e.ingredient, type: 'string', notEmpty: true },
                    { keyName: 'ingredients.amount value', value: e.amount, type: 'number', notEmpty: true },
                    { keyName: 'ingredients.unit value', value: e.unit, type: 'string', notEmpty: true }
                ]);
                nameValidate(e.ingredient);
                amountValidate(e.amount);
                nameValidate(e.unit);
            }
        }
    }
}

module.exports = recipeRouteValidate;