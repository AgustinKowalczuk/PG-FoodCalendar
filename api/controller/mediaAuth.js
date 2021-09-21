const { env: { USER_GOOGLE_ID } } = process;
const querystring = require('query-string');
const axios = require('axios');

const getGoogleAuthUrl = () => {
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

module.exports = {
    getGoogleAuthUrl,
    getTokens
};
