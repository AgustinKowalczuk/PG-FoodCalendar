const nodemailer = require('nodemailer');

const { env: { USER_MAIL, PASSWORD_MAIL } } = process;

const transportEmail = async (email, html, subject) => {
    // const transport = nodemailer.createTransport({
    //     host: 'smtp.mailtrap.io',
    //     port: 2525,
    //     auth: {
    //         user: '0533c2835ff75f',
    //         pass: '4db962f25944ba'
    //     }
    // });
    const transport = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        auth: {
           user: USER_MAIL,
           pass: PASSWORD_MAIL
        }
    });
    const message = {
        from: USER_MAIL, // Sender address
        to: email, // List of recipients
        subject: `Recipes Calendar - ${subject}`, // Subject line
        html: html // html head and body
    };
    await transport.sendMail(message, function(err, info) {
        if (err) {
            console.log(err);
            throw err;
        } else {
            console.log(info);
        }
    });
}

const htmlReplacer = (oldText, newText) => {
    const obj = {}
    oldText.forEach((e, i) => obj[e] = newText[i]);
    const re = new RegExp(Object.keys(obj).join("|"),"gi");
    return [re, obj];
}

module.exports = {
    transportEmail,
    htmlReplacer
};