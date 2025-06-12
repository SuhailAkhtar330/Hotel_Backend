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


// const MenuItem = require('./models/menu')


const db = require('./db');

// body parser
const bodyParser = require('body-parser');
app.use(bodyParser.json());

const port = 4000;

// import routes file
const personRoutes = require('./routes/personRoutes');
const menuItemRoutes = require('./routes/menuRoutes');

//use routes 
app.use('/person',personRoutes);
app.use('/menu', menuItemRoutes);


app.get("/", (req,res) => {
    res.send("<h1>Welcome to Apna Kotha 😂</h1>");
})

// app.get("/user", (req,res) => {
//     const json = {
//         "name": "Sohail", 
//         "age": 19, 
//         "city": "London"
//     };
//     // res.send("Hey What's up?...");
//     res.send(json);
// })


app.listen(port, (err) => { 
    if(err) {
        console.log("Error server is not running");
    } else {
        console.log(`Server is running on port ${port}`)
    }

})



