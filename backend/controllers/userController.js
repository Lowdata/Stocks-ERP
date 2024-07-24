import { errorHandler } from "../middleware/errorMiddleware.js";
import asyncHandler from 'express-async-handler'
import User from "../model/userModel.js";


export const userRegister = asyncHandler( async(req, res) => {
    
    const {name, email, password} = req.body;

    //validate 
    if(!name || !email || !password){
        res.status(400);
        throw new Error("All fields are required");
    }
    if(password.length<6){
        res.status(400);
        throw new Error("Password must be at least 6 characters long");
    }
    const userExist = await User.findOne({email});
    if(userExist){
        res.status(400);
        throw new Error("User already exists with the same email");
    }

    //create a new user
    const user = await User.create({
    name,     
    email,
    password});
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

