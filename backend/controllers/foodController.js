import foodModel from "../models/foodModel.js";
import fs from 'fs'    //file system which is pre build in node.js


// add food item

const addFood = async (req, res) => {
    //logic to store data in database
    let image_filename = `${req.file.filename}`;
    const food = new foodModel({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        category: req.body.category,
        image: image_filename
    })

    try {
        await food.save();
        res.json({ success: true, message: "Food Added" })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: "Error" })
    }
}


//all food list
const listFood = async (req, res) => {
    try {
        const foods = await foodModel.find({});
        res.json({ success: true, data: foods })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: "Error" })
    }
}


//remove food items

const removeFood = async (req, res) => {
    try {
        const food = await foodModel.findById(req.body.id);  //Id created automatically and by id it finds the product
        fs.unlink(`uploads/${food.image}`, () => { }) //delete image from upload folder

        await foodModel.findByIdAndDelete(req.body.id);   //delete in database
        res.json({ success: true, message: "Food Removed" })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" })

    }
}

export { addFood, listFood, removeFood }