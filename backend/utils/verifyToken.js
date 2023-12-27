import jwt from 'jsonwebtoken'


export const verifyTokent=(req, res, next)=>{
    const token= req.cookies.accessToken
    console.log(req.headers)
    if(!token){
        return res.status(401).json({
            success:false,
            message:"You're not authorize"
        })
    }
    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user)=>{
        if(err){
            return res.status(401).json({
                success:false,
                message:"token is Invaild"
            })
        }
        req.user=user
        next()
    })
}




export const verifyUser=(req, res,next)=>{
    verifyTokent(req, res, next, ()=>{
        if(req.user.id===req.params.id || req.user.role==='admin'){
            next()
        }else{
            return res.status(401).json({
                success:false,
                message:"you're not authenticated"
            })
        }
    })
}
export const verifyAdmin=(req, res,next)=>{
    verifyTokent(req, res, next, ()=>{
        if(req.user.role==='admin'){
            next()
        }else{
            return res.status(401).json({
                success:false,
                message:"you're not authorized"
            })
        }
    })
}


