require('dotenv').config();
const express = require ('express');
const package = require('./package.json');
const routes = require ('./routes/index.js')
const mongoose = require('mongoose');

//settings
const { env: { PORT, MONGO_URL: url }, argv: [, , port = PORT || 3001], } = process;
const app = express();
const cors = (req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Authorization, Content-Type');
    next();
}

(async () => {
    await mongoose.connect(url, { useNewUrlParser: true })
 
    // express
    app.set('port', PORT || 3001);
    app.use(cors);
    app.use(express.json());
 
    // routes
    app.use(routes);

    app.use(function (req, res, next) {
        res.status(404).json({ error: 'Not found.' })
    })

    app.listen(port, () => console.log(`${package.name} ${package.version} up on port ${port}`))
})()







//start the server
// app.listen(app.get('port'),()=> {
//     console.log('Server on port',app.get('port'))
// });