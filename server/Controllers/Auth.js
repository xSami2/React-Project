import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import User from "../models/User.js"

/*  Register User  */
export const register = async (req  , res) => {
    try
    {
        const
        {
            firstName ,
            lastName ,
            email,
            password ,
            picturePath ,
            friends ,
            location ,
            occupation
        } = req.body // Reactive the Request from the front-end
        const salt = await bcrypt.genSalt(); // Create Random salt
        const passwordHash = await bcrypt.hash(password , salt) // Add random salt to the password then hash it
        const newUser = new User ({ // assign the var to database
            firstName ,
            lastName ,
            email,
            password : passwordHash,
            picturePath ,
            friends ,
            location ,
            occupation ,
            ViewedProfile : Math.floor(Math.random() * 10000) ,
            impressions : Math.floor(Math.random() * 10000) ,
        })
        const savedUser = await newUser.save(); // create the User in the database
        res.status(201).json(savedUser) // Send Responses to the User
    }catch (err){
        res.status(500).json({error : err.message})
    }
}
/* Login */
export const login = async (req  , res) => {
    try {
        const { email , password } = req.body ;
        const user = await user.findOne({email : email})   // Find the user based on the email in the database

        if(!user)  { return  res.status(400).json({msg : "User does not exist"}); }

        const isMatch = await bcrypt.compare(password , user.password)
        if(!isMatch)  { return  res.status(400).json({msg : "Wrong Password"}); }

        const token = jwt.sign( {id : user._id } , process.env.JWT_SECRET);
        delete user.password
        res.status(200).json({token , user })
    }
    catch (err)
    {
        res.status(500).json({error : err.message})
    }
}
