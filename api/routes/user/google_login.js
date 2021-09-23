const express = require('express');
const router = express.Router();
const { USER_GOOGLE_ID, USER_GOOGLE_SECRET, GOOGLE_PUBLIC_KEY, JWT_SECRET, FRONT_URL, BACK_URL } = process.env;
const jwt = require('jsonwebtoken');
const { User } = require('../../models/models');
const { normalizeUsers } = require('../../controller/normalize');
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
        const tokenGet = await getTokens(code, USER_GOOGLE_ID, USER_GOOGLE_SECRET, `${BACK_URL}/auth/google`);
        const {given_name: name, family_name: surname, email, sub} = await jwt.decode(tokenGet.id_token, GOOGLE_PUBLIC_KEY, ['RS256']);
        
        let userFound = await User.findOne({email});
        if (!userFound){
            return res.redirect(`${FRONT_URL}/acount/login/${email}`);
        }
        const token = await jwt.sign({ sub: userFound._id }, JWT_SECRET, { expiresIn: "12h"});        

        userFound = normalizeUsers(userFound);
        return res.redirect(`${FRONT_URL}/acount/google/`+token+'/'+JSON.stringify(userFound)); 
    } catch (error) {
        res.redirect(`${FRONT_URL}/`);
        return next(error);
    }
});

router.get('/register/google', async (req,res,next) => {
    const code = req.query.code;

    try {
        const tokenGet = await getTokens(code, USER_GOOGLE_ID, USER_GOOGLE_SECRET, `${BACK_URL}/register/google`);
        const {given_name: name, family_name: surname, email, sub} = await jwt.decode(tokenGet.id_token, GOOGLE_PUBLIC_KEY, ['RS256']);
        
        let userFound = await User.findOne({email});
        if (userFound){
            return res.redirect(`${FRONT_URL}/acount/register/${email}`);
        }

        const registerUser = { name, surname, email, sub }

        return res.redirect(`${FRONT_URL}/checkout/`+JSON.stringify(registerUser)); 
        
    } catch (error) {
        res.redirect(`${FRONT_URL}/`);
        return next(error);
    }
});

module.exports = router;