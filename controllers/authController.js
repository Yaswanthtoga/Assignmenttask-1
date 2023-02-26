import User from "../models/user.js";
import twilio from 'twilio'
import speakeasy from 'speakeasy'
import bcrypt from 'bcrypt';
import sgMail from '@sendgrid/mail';


// Verify the user Details
export const verifyUserDetails = async (req,res,next)=>{
    try {
        const { email,username,phoneNumber } = req.body;

        // User Existence with respect to username
        const user1 = await User.findOne({username});
    
        // User Existence with respect to email
        const user2 = await User.findOne({email});
    
        // User Existence with respect to phoneNumber
        const user3 = await User.findOne({phoneNumber});
    
        // Check the User Exitence
        if(user1 || user2 || user3){
            return res.status(401).json({message:"Existed Credentials"});
        }
        
        next();
    } catch (error) {
        return res.status(500).json({message:"something went wrong"});
    }
}


// validation Otp
export const validateOTP = async (req,res)=>{
    try{
        if(!req.session.otp){
            return res.status(404).json({message:"OTP SESSION EXPIRED"});
        }

        if((req.session.otp).toString() === (req.body.otp).toString()){
            const { username,password,phoneNumber,email } = req.session.user;

            // Encrypt the Password
            const hashedPassword = bcrypt.hashSync(password,bcrypt.genSaltSync(10));

            const newUser =  new User({
                username,password:hashedPassword,phoneNumber,email
            });

            const savedUser = await newUser.save();

            return res.status(200).json(savedUser._doc);
        }else{
            return res.status(401).json({message:"Invalid OTP"})
        }
    }catch(err){
        console.log(err)
        return res.status(500).json({message:"Internal Server Error"});
    }
}

// Sent OTP to Mobile
export const sentOTPMobile = (req,res)=>{

    // Twilio Credentials
    const accountSid = process.env.TWILIO_SID;
    const authToken = process.env.TWILIO_API_KEY;
    const client = twilio(accountSid, authToken);

    // Generate OTP
    const otp = speakeasy.totp({
        secret: process.env.MY_SECRET_KEY,
        digits: 4,
        window: 1
    });

    try{
        // Send to the client
        client.messages.create({
            body: `Your OTP code is ${otp}`,
            from: '+12762861498',
            to: '+919392553989',  // Please get an account for Twilio to verify your mobile number
                                  // After that replace it with ----->  { req.user.phoneNumber }
        }).then();
        

        // Add OTP to session header variable
        if(!req.session.otp)req.session.otp = otp;

        return res.status(200).json({message:"OTP Sent"});

    }catch(err){
        return res.status(500).json({message:"Something went wrong"})
    }
}


// Login the user
export const checkUserDetailsExistence = async (req,res)=>{
    const { email,password } = req.body;

    try{
        const user = await User.findOne({email});

        // User Not Found
        if(!user){
            return res.status(404).json({message:"Invalid Credentials"});
        }

        // Check for user password
        const bool = bcrypt.compareSync(password,user.password);
        if(bool){
            return res.status(200).json({user:user});
        }

    }catch(err){
        return res.status(500).json({message:'Internal Server Error'});
    }
}

// Sent OTP to Email
export const sentOTPEmail = (req,res,next)=>{
    try {
        sgMail.setApiKey(process.env.SENDGRID_API_KEY);

        // Generate OTP
        const otp = speakeasy.totp({
            secret: process.env.MY_SECRET_KEY,
            digits: 4,
            window: 1
        });
        const msg = {
            to: 'yaswanthkumartogarapu@gmail.com', // Change to your recipient { req.body.email }
            from: 'yaswa779@gmail.com', // Change to your verified sender
            subject: 'Reset Password',
            text: 'Please verify your email and reset your password',
            html: `Your OTP is <strong>${otp}</strong>`,
        }

        sgMail
        .send(msg)
        .then(() => {
        console.log('Email sent')
        })
        .catch((error) => {
            return res.status(500).json({message:"Internal Server Error"});
        })
            
        req.body.otp = otp;

        next();
    } catch (error) {
        return res.status(500).json({message:"Internal Server Error"});
    }
}

// Verify the Email
export const verifyOTPEmail = (req,res,next)=>{
    const { userOTP,otp } = req.body;
    try {
        if(!userOTP || !otp){
            return res.status(404).json({message:"OTP missing"});
        }
        
        if((otp).toString() === (userOTP).toString()){
            next();
        }else{
            return res.status(401).json({message:"Invalid OTP"});
        }
    } catch (error) {
        return res.status(500).json({message:"Internal Server Error"});
    }
}

// Update the Password
export const updatePassword = async (req,res)=>{
    const { phoneNumber,password } = req.body;

    try {
        const user = await User.findOne({phoneNumber});
        if(!user){
            return res.status(404).json({message:"User Not Found"});
        }

        // Update the Password
        await User.updateOne({phoneNumber},{$set:{password}});
        return res.status(200).json({message:"Updated Successfully"});

    } catch (error) {
        return res.status(500).json({message:"Internal Server Error"});
    }
}

