const express = require('express');

const router = express.Router();

const MenuItem = require('./../models/menu')

router.post('/', async (req,res) => {

   try {
        //fetch the data
        const data = req.body;
        const newMenu = MenuItem(data);
        const savedMenu = await newMenu.save();
        console.log('New menu Saved');
        res.status(200).json(savedMenu);
    } 

    catch (err) {

        console.log(err);
        res.status(500).json({error: 'Server error while creating MenuItems'});
    }
    
})

router.get('/', async (req,res) => {

    try {
        
        const data = await MenuItem.find();

        console.log('MenuItems fetched Successfully');

        res.status(200).json(data);

    } 

    catch (err) {
        console.log(err);
        res.status(500).json({error: 'Failed to fetch MenuItems'});
    }
})

//parametrized route

// router.get('/:menuType', async (req,res) => {

//     try {
//         //
//     } 

//     catch (err) {

//         console.log(err);
//         res.status(500).json({error: 'Internal server error(menu type)'});

//     }
// })

router.put('/:id', async (req,res) => {
    try {
        //menu id
        const menuId = req.params.id;

        //update menu 
        const updatedMenuItems = req.body;

        const result = MenuItem.findByIdAndUpdate(menuId, updatedMenuItems, {
            new: true,
            runValidators: true
        })

        if(!result) {
            return res.status(404).json({error: 'Unable to fetch menu item'});
        }

        console.log('Menu item updated successfully');
        res.status(200).json(result);

    } 
    catch (err) {
        
        console.log(err);
        res.status(500).json({
            error: 'Unable to load menu items'
        })

    }

})

router.delete('/:id', async (req,res) => {

    try {
        
        const menuId = req.params.id;

        const result = await MenuItem.findByIdAndDelete(menuId);

        if(!result) {
            return res.status(404).json({
                error: 'Menu item does not exist'
            })
        }

        console.log("Menu item deleted");
        res.status(200).json({
            error: 'Menu Item Deleted Successfully'
        })

    } 

    catch (err) {

        console.log(err);
        res.status(500).json({
            error: 'Unable to find and delete menu item'
        });

    }
})

module.exports = router;
