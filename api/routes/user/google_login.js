const express = require('express');
const router = express.Router();
const { USER_GOOGLE_ID, USER_GOOGLE_SECRET, GOOGLE_PUBLIC_KEY, JWT_SECRET } = process.env;
const jwt = require('jsonwebtoken');
const argon = require('argon2');
const { User } = require('../../models/models');
const { normalizeUsers } = require('../../controller/normalize');
const { htmlReplacer, transportEmail } = require('../../controller/emailUtils');
const fs = require('fs');
const { getGoogleAuthUrl, getTokens } = require('../../controller/mediaAuth');

router.get('/auth/google/url/:type', async (req, res, next) => {
    const { type } = req.params;
    try {
         if ( type !== 'auth' &&  type !== 'register') throw new Error("Type debe ser 'auth' o 'register' ");
        return res.send(getGoogleAuthUrl(type));
    } catch (error) {
        next(error);
    }
});

router.get('/auth/google', async (req,res,next) => {
    const code = req.query.code;
    const path = '/emailUsersMessages/register_message.html';

    try {
        const tokenGet = await getTokens(code, USER_GOOGLE_ID, USER_GOOGLE_SECRET, 'http://localhost:3001/auth/google');
        const {given_name: name, family_name: surname, email, sub} = await jwt.decode(tokenGet.id_token, GOOGLE_PUBLIC_KEY, ['RS256']);
        
        let userFound = await User.findOne({email});
        if (!userFound){
            return res.redirect(`http://localhost:3000/acount/login/${email}`);
        }
        const token = await jwt.sign({ sub: userFound._id }, JWT_SECRET, { expiresIn: "12h"});        

        userFound = normalizeUsers(userFound);
        return res.redirect('http://localhost:3000/acount/google/'+token+'/'+JSON.stringify(userFound)); 
    } catch (error) {
        res.redirect('http://localhost:3000/');
        return next(error);
    }
});

router.get('/register/google', async (req,res,next) => {
    const code = req.query.code;
    const path = '/emailUsersMessages/register_message.html';

    try {
        const tokenGet = await getTokens(code, USER_GOOGLE_ID, USER_GOOGLE_SECRET, 'http://localhost:3001/register/google');
        const {given_name: name, family_name: surname, email, sub} = await jwt.decode(tokenGet.id_token, GOOGLE_PUBLIC_KEY, ['RS256']);
        
        let userFound = await User.findOne({email});
        if (userFound){
            return res.redirect(`http://localhost:3000/acount/register/${email}`);
        }
        
        const category = 'User';
        const hash = await argon.hash(sub);

        let userCreated = await User.create({ name, surname, email, password: hash, category }); 
        
        const oldText = ['{name}', '{surname}'];
        const newText = [name, surname];
        const [re, obj] = htmlReplacer(oldText, newText);
        const html = await fs.readFileSync(__dirname + path, 'utf8')
            .replace(re, (match)=>obj[match]);
        await transportEmail(email, html, 'Registro exitoso');
        
        const token = await jwt.sign({ sub: userCreated._id }, JWT_SECRET, { expiresIn: "12h"});

        userCreated = normalizeUsers(userCreated);
        return res.redirect('http://localhost:3000/acount/google/'+token+'/'+JSON.stringify(userCreated)); 
    } catch (error) {
        res.redirect('http://localhost:3000/');
        return next(error);
    }
});

module.exports = router;