const express = require('express');
const router = express.Router();
const querystring = require('query-string');
const axios = require('axios');
const { USER_GOOGLE_ID, USER_GOOGLE_SECRET, GOOGLE_PUBLIC_KEY, JWT_SECRET } = process.env;
const jwt = require('jsonwebtoken');
const argon = require('argon2');
const { User } = require('../../models/models');
const { normalizeUsers } = require('../../controller/normalize');
const { htmlReplacer, transportEmail } = require('../../controller/emailUtils');
const fs = require('fs');

function getGoogleAuthUrl () {
    const rootUrl = 'https://accounts.google.com/o/oauth2/v2/auth';
    const options = {
        redirect_uri: 'http://localhost:3001/auth/google',
        client_id: `${USER_GOOGLE_ID}`,
        access_type: 'offline',
        response_type: 'code',
        prompt: 'consent',
        scope: [
            'https://www.googleapis.com/auth/userinfo.profile',
            'https://www.googleapis.com/auth/userinfo.email'                       
        ].join(' ')
    }
    return `${rootUrl}?${querystring.stringify(options)}`
}

router.get('/auth/google/url', async (req, res, next) => {
    try {
        return res.send(getGoogleAuthUrl());
    } catch (error) {
        next(error);
    }
});

const getTokens = async (code, client_id, client_secret, redirect_uri) => {
    const url = 'https://oauth2.googleapis.com/token';
    const values = {
        code,
        client_id,
        client_secret,
        redirect_uri,
        grant_type: 'authorization_code'
    };
    try {
        const response = await axios.post(url, querystring.stringify(values), { headers: { 'Content-Type': 'application/x-www-form-urlencoded' }});
        return response.data;
    } catch (error) {
        throw error;
    }
   
}

router.get('/auth/google', async (req,res,next) => {
    const code = req.query.code;
    const path = '/emailUsersMessages/register_message.html';

    try {
        const tokenGet = await getTokens(code, USER_GOOGLE_ID, USER_GOOGLE_SECRET, 'http://localhost:3001/auth/google');
        const {given_name: name, family_name: surname, email, sub} = await jwt.decode(tokenGet.id_token, GOOGLE_PUBLIC_KEY, ['RS256']);
        
        let userFound = await User.findOne({email});
        if (userFound){
            const token = await jwt.sign({ sub: userFound._id }, JWT_SECRET, { expiresIn: "12h"});
            userFound = normalizeUsers(userFound);
            return res.json({ token,  user: userFound }); 
        }
        
        const password = await argon.hash(sub);
        const category = 'User';

        let userCreated = await User.create({ name, surname, email, password, category }); 
        
        const oldText = ['{name}', '{surname}'];
        const newText = [name, surname];
        const [re, obj] = htmlReplacer(oldText, newText);
        const html = await fs.readFileSync(__dirname + path, 'utf8')
            .replace(re, (match)=>obj[match]);
        await transportEmail(email, html);
        
        const token = await jwt.sign({ sub: userCreated._id }, JWT_SECRET, { expiresIn: "12h"});
        userCreated = normalizeUsers(userCreated);
        return res.json({ token,  user: userCreated }); 
    } catch (error) {
        next(error);
    }
})

module.exports = router;