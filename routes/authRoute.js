import express from 'express';
import { checkUserDetailsExistence, sentOTPEmail, sentOTPMobile, updatePassword, validateOTP, verifyOTPEmail, verifyUserDetails } from '../controllers/authController.js'

const router = express.Router();


// Validate the OTP
router.post('/validate-otp',validateOTP);


// Sent OTP to Mobile Number
router.get("/send-otp-to-mobile",sentOTPMobile);


// Register
router.post('/register',verifyUserDetails,(req,res)=>{
    const { email,password,profilePicture,phoneNumber,username } = req.body;

    const user = { email,password,profilePicture,phoneNumber,username };

    // Store in the Session-Variable
    req.session.user = user;

    res.redirect('send-otp-to-mobile');
})


// Login
router.post('/login',checkUserDetailsExistence)

// Password Updation
router.post('forgot-password',sentOTPEmail,verifyOTPEmail,updatePassword)

export default router;