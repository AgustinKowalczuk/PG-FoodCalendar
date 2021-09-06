const validate = {

    argumentsValidate(args) {
        args.forEach(({ keyName, value, type, notEmpty, optional }) => {
            if (value != undefined) {
                if (type === 'array') {
                    if (!Array.isArray(value)) throw new Error (`${keyName} ${value} no es tipo ${type}`);
                }
                if (typeof value !== type && type !== 'array') {
                    throw new Error(`${keyName} ${value} no es tipo ${type}`);
                }
                if (notEmpty) {
                    if (type === 'string') {
                        if (!value.trim().length) throw new Error(`${keyName} está vacío`);
                    } else if (type === 'object') {
                        if (!Object.keys(value).length) throw new Error(`${keyName} está vacío`);
                    } else if (type === 'array') {
                        if (value.length === 0) throw new Error(`${keyName} está vacío`);
                    }
                }      
            } else if (!optional) throw new Error(`${keyName} no es opcional`);
        })
    },

    idMongodb(id) {
        if(id.length !== 24 ) throw new Error(`${id} no es un id válido`)
    },

    nameValidate(name) {
        const re = /^[^{}<>#$%&~^`/*+¿?¡!@]*$/g
        if (!re.test(String(name))) throw new Error(`${name} no es un nombre válido`)
    },

    difficultyValidate(difficulty) {
        const difficulties = ["Fácil", "Moderado", "Difícil"];
        if(difficulties.indexOf(difficulty) < 0) throw new Error(`${difficulty} no es un valor válido para dificultad`);
    },

    ratingValidate(rating) {
        if (rating > 10) throw new Error(`${rating} supera el valor máximo (10)`);
        if (rating < 0) throw new Error(`${rating} está por debajo del valor minimo (0)`);
    },

    preparationValidate(preparation) {
        const re = /^[^<>#%&~^`/@]*$/g;
        if (!re.test(String(preparation))) throw new Error(`${preparation} no es un texto válido`);
    },
    
    urlValidate(url) {
        const re = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
        if (!re.test(String(url))) throw new Error(`${url} no es un url`);
    },

    amountValidate(amount) {
        if (amount < 0) throw new Error(`${amount} está por debajo del valor minimo (0)`);
    }
}

module.exports = validate;