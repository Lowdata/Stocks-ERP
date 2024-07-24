import { errorHandler } from "../middleware/errorMiddleware.js";
import asyncHandler from 'express-async-handler'
import User from "../model/userModel.js";
import bcrypt from "bcryptjs";

export const userRegister = asyncHandler( async(req, res) => {
    
    const {name, email, password} = req.body;

    //validate 
    if(!name || !email || !password){
        res.status(400);
        throw new Error("All fields are required");
    }
    if(password.length<5){
        res.status(400);
        throw new Error("Password must be at least 5 characters long");
    }
    const userExist = await User.findOne({email});
    if(userExist){
        res.status(400);
        throw new Error("User already exists with the same email");
    }

    //password encryption
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    //create a new user
    const user = await User.create({
    name,     
    email,
    password: hashedPassword
});
    if(user){
        const {_id, name, email , photo, phone, bio} = user
        res
          .status(201)
          .json({
            message: "User registered successfully",
            _id,
            name,
            email,
            photo,
            phone,
            bio,
          });
    }else{
        res.status(400);
        throw new Error("Failed to register user");
    }
});

