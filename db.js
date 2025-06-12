const mongoose = require('mongoose');

const mongoURL = 'mongodb://localhost:27017/hotels';

mongoose.connect(mongoURL,{

    // useNewUrlParser : true,
    // useUnifiedTopology: true

})


const db = mongoose.connection;

db.on('connected', () => {
    console.log("Database connected successfully");
})

db.on('error', (err) => {
    console.log("Error while connecting database", err);
})

db.on('disconnected',  () => {
    console.log("Database disconnected");
})

module.exports = db;
