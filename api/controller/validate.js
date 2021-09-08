const validate = {

    argumentsValidate(args) {
        args.forEach(({ keyName, value, type, notEmpty, optional }) => {
            if (value != undefined) {
                if (type === 'array') {
                    if (!Array.isArray(value)) throw new Error(`${keyName} ${value} no es tipo ${type}`);
                }
                if (typeof value !== type && type !== 'array') {
                    if (keyName === "password") throw new Error(`la contraseña proporcionada no en tipo ${type}`)
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
        if (id.length !== 24) throw new Error(`${id} no es un id válido`)
    },

    nameValidate(name) {
        const re = /^[^{}<>#$%&~^`/*+¿?¡!@]*$/g;
        if (!re.test(String(name))) throw new Error(`${name} no es un nombre válido`)
    },

    difficultyValidate(difficulty) {
        const difficulties = ["Fácil", "Moderado", "Difícil"];
        if (difficulties.indexOf(difficulty) < 0) throw new Error(`${difficulty} no es un valor válido para dificultad`);
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

    premiumValidate(premium) {
        const access = [true, false];
        if (access.indexOf(premium) < 0) throw new Error(`${premium} no es un valor válido para premium`);
    },

    availabilityValidate(availability) {
        const available = [true, false];
        if (available.indexOf(availability) < 0) throw new Error(`${availability} no es un valor válido para availability`);
    },

    amountValidate(amount) {
        if (amount < 0) throw new Error(`${amount} está por debajo del valor minimo (0)`);
    },
    emailValidate(email) {
        const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
        ;
        if (!re.test(String(email))) throw new Error(`${email} no es un email válido`)
    },
    passwordValidate(password) {
        const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
        if (!re.test(String(password))) throw new Error(`${password} no es una contaseña válida`)
    },
    userCategoryValidate(userCategory) {
        const difficulties = ["Admin", "User"];
        if (difficulties.indexOf(userCategory) < 0) throw new Error(`${userCategory} no es un valor válido para la categoria de usuario`);
    },
    noNumberValidate(name) {
        const re = /^[^(0-9)]*$/g;
        if (!re.test(String(name))) throw new Error(`${name} no es un nombre válido`)
    }
}

module.exports = validate;