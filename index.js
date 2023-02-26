import express from 'express'
import dotenv from 'dotenv'
import session from 'express-session';
import cors from 'cors';
dotenv.config();
import morgan from 'morgan'
import mongoose from 'mongoose';
import authRoute from './routes/authRoute.js'

// Connecting to the Mongodb server
mongoose.set('strictQuery', true);
mongoose.connect(process.env.MONGO_URL)
   .then(()=>console.log("Connected to mongodb"))
   .catch((err)=>console.log(err))


const app = express();

// Middlewares
app.use(morgan('common'));
app.use(express.json());
app.use(cors({
    origin:'http://localhost:3000',
    credentials:true,
}))

// Session Starts
app.use(session({
    secret: process.env.SESSION_SECRET_KEY,
    resave: false,
    saveUninitialized: false
}))

// Routers
app.use('/api/auth',authRoute);


app.listen(8000,()=>{
    console.log("Server Started at 8000");
})