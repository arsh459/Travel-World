const jwt=require('jsonwebtoken')
require('dotenv').config();


const Authmiddleware=(req, res, next)=>{
    const token=req.headers.authorization?.split(" ")[1]
    if(!token){
        return res.send("please pass the token")
    }
    jwt.verify(token, process.env.MYSECRET, (err, decoded)=>{
        const {userID}=decoded
        req.body.userID=userID
        if(decoded){
            next()
        }else{
            res.send("login with write creadential")
        }
    })
}


module.exports-{Authmiddleware}