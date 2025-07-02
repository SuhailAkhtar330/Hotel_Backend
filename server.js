
const express = require("express");
const app = express();
const prompt = require('prompt-sync')();

const db = require('./db');
const Person = require('./models/person');

require('dotenv').config();


const port =  3000 || process.env.PORT ;


const passport = require('./auth');



// body parser
const bodyParser = require('body-parser');
app.use(bodyParser.json());



// import routes file
const personRoutes = require('./routes/personRoutes');
const menuItemRoutes = require('./routes/menuRoutes');



//middleware function

const logRequest = (req, res, next) => {
    console.log(`${new Date().toLocaleDateString()} Request Mode to : ${req.originalUrl}`);
    next(); //move to the next phase 
}

app.use(logRequest);





app.use(passport.initialize());
const localAuthMiddleware = passport.authenticate('local', {session: false});

app.get("/",   (req,res) => {

    res.send("<h1>Welcome to Our Hotel</h1>");
})

//use routes 
app.use('/person',personRoutes);
app.use('/menu', menuItemRoutes);

app.listen(port, () => { 

    console.log(`Server is running on port ${port}`)

})



