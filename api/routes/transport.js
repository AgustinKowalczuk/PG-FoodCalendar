const nodemailer = require('nodemailer');

const { env: { USER_MAIL, PASSWORD_MAIL } } = process;

const transportEmail = async (email, html) => {
    const transport = nodemailer.createTransport({
        host: 'smtp.mailtrap.io',
        port: 2525,
        auth: {
            user: '0533c2835ff75f',
            pass: '4db962f25944ba'
        }
    });
    // const transport = nodemailer.createTransport({
    //     host: 'smtp.gmail.com',
    //     port: 465,
    //     auth: {
    //        user: USER_MAIL,
    //        pass: PASSWORD_MAIL
    //     }
    // });
    const message = {
        from: USER_MAIL, // Sender address
        to: email, // List of recipients
        subject: 'Recipes Calendar - Registro exitoso', // Subject line
        html: html // Plain text body
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

module.exports = { transportEmail };