// console.log("Server file is running....")
// console.log("Hello")


// var result = (a,b) => {
//     return a+b;
// }

// console.log(result(2,3))

// var os = require('os');

// var user = os.userInfo();
// console.log(user);

// var fs = require('fs')

// fs.writeFile('greet.txt', "Hello Sohail", (err) => {

    //         console.log("Error while wrriting file");
//     }

//     console.log("file written successfully");
// })


// json to object
// const json = '{"name": "Sohail", "age": 19, "city": "London"}';
// const obj = JSON.parse(json);
// console.log("JSON to object conversion")
// console.log(obj);

// //object to json
// console.log("Object  to JSON conversion")
// const object = JSON.stringify(obj);
// console.log(object)

const express = require("express");
const app = express();
const prompt = require('prompt-sync')();

const db = require('./db');
const Person = require('./models/person');

require('dotenv').config();


const port =  3000 || process.env.PORT ;


const passport = require('passport');



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



