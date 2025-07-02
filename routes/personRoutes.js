const express = require('express');
const router = express.Router();

const Person = require('./../models/person')
const {jwtAuthMiddleware, generateToken} = require('./../jwt');

router.post('/signup', async  (req,res) => {
    
    try {

        const data = req.body; //data arha hai client se
    
        //create new person model using mongoose model(Person)
        const newPerson = new Person(data);

        //save data in database
        const savedPerson = await newPerson.save();

        console.log('Data Saved');
        console.log("Data Saved Successfully");
        
        const payload = {
            id : response.id,
            username : response.username
        }
        const token = generateToken(response.username);
        console.log('Token is : ', token);


        res.status(200).json({response : response, token : token});

    } 
    
    catch(err) {
        
        console.log("Internal Server Error")
        res.status(500).json({
            success: false,
            message: err.message,
            error: "Internal Server Error",
        })
    }

})

//login rout
router.post('/login', async (req, res) => {
    try {
        //extract username and password from request body
        const {username, password} = req.body;

        //find the user by username
        const user = await Person.findOne({username : username});

        //if user does not exist or password do not match
        if(!user || !(await user.comparePassword(password))) {
            return res.status(401).json({error : 'Invalid username or password'});
        }
        
        //generate token
        const payload = {
            id : user.id,
            username : user.username
        }

        const token = generateToken(payload);

        res.json({token});

    } catch (err) {
        console.log(err);
        res.status(500).json({error : 'Internal server error'});
    }
})


//profile route
router.get('/profile', jwtAuthMiddleware, async (req, res) => {

    try {

        const userData = req.user;
        console.log('User Data', userData);

        const userId = userData.id;
        const user = await Person.findById(userId);

        res.status(200).json({user});

    } catch (err) {

        console.log(err);
        res.status(500).json({error : 'Internal server error'});

    }
    
})

router.get('/', async (req,res) => {

    try {
        
        const data = await Person.find();

        console.log('Data Fetched Successfully');
        res.status(200).json(data);

    } 

    catch (err) {
        
        console.log(err)
        res.status(500).json({
            success: false,
            message: err.message,
            error: "Internal Server Error",
        })

    }

})

//parametrized API

router.get('/:workType', async (req, res) => {

    try {
        
        //fetch data from req body
        const workType = req.params.workType;

        if(workType == 'chef' || workType == 'manager' || workType == 'waiter') {

            const response = await Person.find({work : workType});

            console.log('Response fetched');

            res.status(200).json(response);

        } else {
            res.status(404).json({error: "Invalid Work Type"});
        }
    } 

    catch (err) {
        
        console.log(err);
        res.status(500).json({
            success: false,
            error: 'Internal Server Error / Invalid WorkType'
        })
    }
})


router.put('/:id', async (req, res) => {

    try {

        //extract id from the url parameter
        const personId = req.params.id;

        //update data for person
        const updatedPersonData = req.body;

        const response = await Person.findByIdAndUpdate(personId, updatedPersonData, {

            new: true,//Return the updated document
            runValidators: true, //Run mongoose validation

        })

        if(!response) {
            return res.status(404).json({error: 'Person not found'});
        }

        console.log('Data Updated');
        res.status(200).json(response);

    }  catch (err) {

        console.log(err);
        res.status(500).json({error: 'Failed to update Person Data'});
    }

})

router.delete('/:id', async (req, res) => {
    try {
        
        //extract id from the url parameter
        const personId = req.params.id;

        // find the person by it and remove
        const result = await Person.findByIdAndDelete(personId);

        if(!result) {
            return res.status(404).json({error: 'Person not Found'});
        }

        console.log('Data Deleted Successfully');
        res.status(200).json({error: 'Person Deleted Successfully'});


    } 
    catch (err) {

        console.log(err);
        res.status(500).json({error: 'Failed to find person'});

    }
})

module.exports = router;