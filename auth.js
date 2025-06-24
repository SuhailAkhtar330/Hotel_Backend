const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const Person = require('./models/person');


passport.use(new LocalStrategy(async (USERNAME, password, done) => {

    //authentication logic

    try {
        
        console.log("Received credentials:", USERNAME, password);

        const user = await Person.findOne({username : USERNAME});

        if(!user) {
            return done(null, false, {message: "Incorrect username."});
        }

        const isPasswordMatched = await user.comparePassword(password);


        if(isPasswordMatched) {
            return done(null, user);
        } else {
            return done(null, false, {message: "Incorrect password."});
        }

    } 
    catch (err) {
        return done(err);
    }
    //done is a type of call back function
}))


module.exports = passport;