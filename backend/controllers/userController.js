import userModel from '../models/userModel.js';
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import validator from "validator"


//login user
const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await userModel.findOne({ email });  //search whether the user exist or not
        if (!user) {
            return res.json({ success: false, message: "user doesn't exist" })
        }

        const isMatch = await bcrypt.compare(password, user.password);    //if the email is matched then it compares the password entered by the user and the password stored in the database.

        if (!isMatch) {
            return res.json({ success: false, message: "Invalid credentials" })  //if the entered data and data stored in the database don't match, this if block gets executed.
        }

        const token = createToken(user._id);
        res.json({ success: true, token })

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" })
    }

}


const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET)
}

//register user
const registerUser = async (req, res) => {
    const { name, password, email } = req.body;        //here, our details will be stored
    try {
        const exists = await userModel.findOne({ email });                   //checks if this email id exists or not
        if (exists) {
            return res.json({ success: false, message: "User already exists" })       //false because we haven't created the id, it was present in the database
        }
        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Please enter valid email" })       //validating the email format
        }

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new userModel({
            name: name,
            email: email,
            password: hashedPassword
        })

        const user = await newUser.save()    //user will be saved in the database
        const token = createToken(user._id)
        res.json({ success: true, token });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" })
    }
}



export { loginUser, registerUser }
