import express from 'express'
import dotenv from 'dotenv'
import mongoose  from 'mongoose'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import tourRouter from './routes/tours.js'
import userRouter from './routes/users.js'
import authRouter from './routes/auth.js'
import reviewsRouter from './routes/reviews.js'
import bookingRouter from './routes/bookings.js'

dotenv.config()
const app =express()
const port =process.env.PORT || 8000;


const coreOptions={
    origin:true,
    credentials:true,
}



// database coonection
mongoose.set("strictQuery", false)
const connect= async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URI,{
            useNewUrlParser:true,
            useUnifiedTopology:true
        })
        console.log('MongoDB database connected')
    } catch (err) {
        console.log('MongoDb database connection failed')
    }
}



// for testing
app.get('/', (req, res)=>{
    res.send("api is working")
})

// middleware
app.use(express.json())
app.use(cors({
    origin: true,
    credentials: true,
  }))
app.use(cookieParser())
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/review', reviewsRouter)
app.use('/api/v1/booking', bookingRouter)



app.listen(port ,()=>{
    connect()
    console.log("server listening on port", port)
})