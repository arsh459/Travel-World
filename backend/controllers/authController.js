import User from "../models/User.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// User Registration
export const Registration =async(req, res)=>{
    const {userName,email,password}= req.body;
    // console.log(req.body)
    try {
        const salt= bcrypt.genSaltSync(10)
        const hash= bcrypt.hashSync(password, salt)
        const newUser= new User({
            username:userName,email,password:hash
        })
        // console.log(newUser)
        await newUser.save()
        res.status(200).json({success:true, message:'Successfully Created'})
        
    } catch (err) {
        res.status(500).json({success:false, message:'failed to Create. Try again'})
    }
}
// User Login
export const Login =async(req, res)=>{
    const {email}=req.body;
    try {
        const user=await User.findOne({email})
        // if user is not exist
        if(!user){
            return res.status(404).json({success:false, message:"User not found"})
        }
        // if user is found then check the passeord
        const comparePassword=await bcrypt.compare(req.body.password, user.password)
        
        // if password is incorrect
        if(!comparePassword){
            return res.status(401).json({success:false, message:"Incorrect email and password"})
        }
        const {password, role, ...rest}=user._doc
        const token=jwt.sign({id:user._id, role:user.role}, process.env.JWT_SECRET_KEY, {expiresIn:'15d'})

        res.cookie('accessToken', token, {
            httpOnly:true,
            expires:token.expiresIn
        }).status(200).json({
            success:true,
            message:"successfully Login",
            token,
            data:{...rest},
            role
        })

    } catch (err) {
        res.status(500).json({success:false, message:'failed to Login'})
    }
}


