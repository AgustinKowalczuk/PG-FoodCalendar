const express = require("express");
const router = express.Router();
const fs = require('fs');
const { transportEmail, htmlReplacer } = require("../../controller/emailUtils");


// let counter = 0;
// const interval = setInterval(()=> {
//     counter++
// }, 60000);

// router.get('/interval', async (req, res, next) => {
//     try {
//         res.json({ counter });
//     } catch (error) {
//         next(error);
//     }
// });

router.get('/mail', async (req, res, next) => {
    try {
        const email = 'test-routes@mail.com';
        const path = '/emailUsersMessages/register_message.html'
        // form 1
        // let html = await fs.readFileSync(__dirname + path, 'utf8');
        // html = html.replace('{name}', 'Don');
        // html = html.replace('{surname}', 'Jocho');

        // form 2
        // const obj = {
        //     '{name}': 'Penélope',
        //     '{surname}': 'Glamour'
        // }
        // const html = await fs.readFileSync(__dirname + path, 'utf8')
        //     .replace(/{name}|{surname}/gi, (match)=>obj[match]);

        // Form 3
        // const re = /{name}|{surname}/gi;
        // const obj = {
        //     '{name}': 'Agu',
        //     '{surname}': 'Kowalski'
        // }
        // const html = await fs.readFileSync(__dirname + path, 'utf8')
        //     .replace(re, (match)=>obj[match]);

        // Form 4
        // const obj = {
        //         '{name}': 'Carlos',
        //         '{surname}': 'Runner'
        //     }
        // const re = new RegExp(Object.keys(obj).join("|"),"gi");
        // const html = await fs.readFileSync(__dirname + path, 'utf8')
        //     .replace(re, (match)=>obj[match]);
        
        // Form 5
        // const oldText = ['{name}', '{surname}'];
        // const newText = ['Pablo', 'Mármol'],
        // obj = (() => {
        //     const obj = {}
        //     oldText.forEach((e, i) => obj[e] = newText[i]);
        //     return obj
        // })();
        // const re = new RegExp(Object.keys(obj).join("|"),"gi");
        // const html = await fs.readFileSync(__dirname + path, 'utf8')
        //     .replace(re, (match)=>obj[match]);

        // Form 6
        const oldText = ['{name}', '{surname}'];
        const newText = ['Pepito', 'Grillo'];
        const [re, obj] = htmlReplacer(oldText, newText);
        const html = await fs.readFileSync(__dirname + path, 'utf8')
            .replace(re, (match)=>obj[match]);

        await transportEmail(email, html);

        res.sendStatus(200);
    } catch (error) {
        next(error);
    }
});

module.exports = router;
