const express = require('express');
const router = express.Router();

const Person = require('./../models/person')

router.post('/', async  (req,res) => {
    
    try {

        const data = req.body; //data arha hai client se
    
        //create new person model using mongoose model(Person)
        const newPerson = new Person(data);

        //save data in database
        const savedPerson = await newPerson.save();

        console.log('Data Saved');
        console.log("Data Saved Successfully");
        res.status(200).json(savedPerson);

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