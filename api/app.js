const express = require ('express');
const bodyParser = require('body-parser')
const app = express();

const routes = require ('./routes/index.js')

//settings
app.set('port', process.env.PORT || 3000);


//middlewares
app.use((req,res,next)=>{
    console.log(`${req.url} - ${req.method}`);
    next();
})
app.use(bodyParser,json());

// routes
app.use(routes)


//start the server
app.listen(app.get('port'),()=> {
    console.log('Server on port',port)
});