const {
    argumentsValidate,
    idMongodb,
    nameValidate,
} = require('../validate');

const calendarRouteValidate = {
    calendarValidation(owner, name, calendar) {
        argumentsValidate([
            { keyName: 'owner', value: owner, type: 'string', notEmpty: true },
            { keyName: 'name', value: name, type: 'string', notEmpty: true },
            { keyName: 'calendar', value: calendar, type: 'array', notEmpty: true }
        ]);
        idMongodb(owner);
        nameValidate(name);
        if (calendar.length !== 14){
            throw new Error(`El número de recetas es diferente a 14`)
        }
        for (const el of calendar) {
            idMongodb(el);
        }
    }
}

module.exports = calendarRouteValidate;