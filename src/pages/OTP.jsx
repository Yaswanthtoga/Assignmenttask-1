import React, { useState } from 'react';
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardHeader,
  MDBBtn
} from 'mdb-react-ui-kit';
import OTPInput, { ResendOTP } from "otp-input-react";
import axios from 'axios';
import { useNavigate } from "react-router-dom"


export default function App() {
  const [OTP, setOTP] = useState("");
  const [error,setError] = useState(false);
  const navigate = useNavigate();
  
  // Handle the mobile verification
  const handleClick = async ()=>{
    try{
      const res = await axios.post('http://localhost:8000/api/auth/validate-otp',{otp:OTP});
      navigate('/login');
    }catch(err){
      console.log(err);
    }
  }

  // Handle Resend
  const handleResend = async ()=>{
    try {
      await axios.get('http://localhost:8000/api/auth/send-otp-to-mobile');
      setOTP("");
      setError(false);
    } catch (error) {
      setError(true);
    }
  }

  return (
    <MDBCard alignment='center' style={{width:'40%',height:"40%",position:'absolute',margin:'auto',left:0,right:0,top:'4%',bottom:"10%"}}>
      <MDBCardHeader>One Time Password</MDBCardHeader>
      <MDBCardBody style={{textAlign:'center'}}>
        <MDBCardTitle style={{marginBottom:'20px'}}>Please verify your mobile number</MDBCardTitle>
        <OTPInput style={{ maxWidth:'30%',marginLeft:'33%',marginBottom:'30px' }} value={OTP} onChange={setOTP} autoFocus OTPLength={4} otpType="number" disabled={false} secure />
        <div>
          <MDBBtn onClick={handleClick}>Verify OTP</MDBBtn>
          <ResendOTP onResendClick={handleResend} />
        </div>
        { error&&<p style={{color:'red',textAlign:'center',fontSize:'15px'}}>Invalid OTP</p> }
      </MDBCardBody>
    </MDBCard>
  );
}