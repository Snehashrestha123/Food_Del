import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken"    //user authentication
import bcrypt from "bycrypt"
import validator from "validator"


//Login user
const loginUser = async (req, res) => {

}





//Register user
const registerUser = async (req, res) => {
    const {name,password,email} = req.body;
    try{                                       // here we are checking  if the email id is already used
        const exists = await userModel.findOne({email});
        if(exists){
            return res.json({success:false,message:"User already exists"})
        }
    }catch (error){

    }
}



export { loginUser, registerUser } 